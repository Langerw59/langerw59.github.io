// =============================================================
// en_analyse.js – Analyse eines EINGEGEBENEN englischen Satzes
// RU: Разбор английского предложения, которое ввёл пользователь
// window.EN_ANALYSE(text) → { cfg, r }  (gleiches Format wie EN_ENGINE.bauen)
// Erkennt auch typische Fehler: he go, does he goes, did he went,
// I have went, he are, have gone yesterday, not … never.
// Version 1 (2026-11-02)
// =============================================================

(() => {
  "use strict";
  const g = (n) => (typeof window !== "undefined" ? window[n] : undefined);
  const arr = (x) => (Array.isArray(x) ? x : []);
  const low = (s) => String(s || "").toLowerCase();
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const SUBJ_PRON = { i: "i", you: "you", he: "3sg", she: "3sg", it: "3sg", we: "pl", they: "pl", this: "3sg", that: "3sg", there: "3sg", everybody: "3sg", nobody: "3sg", somebody: "3sg", everyone: "3sg" };
  const OBJ_PRON = new Set(["me", "him", "her", "us", "them", "it", "you", "myself", "yourself", "himself", "herself", "something", "nothing", "everything", "anything"]);
  const DETS = new Set(["the", "a", "an", "my", "your", "his", "her", "its", "our", "their", "this", "that", "these", "those", "some", "any", "no", "every", "each", "many", "much", "two", "three", "four", "five", "ten", "all", "another"]);
  const PREPS = new Set(["to", "at", "in", "on", "from", "into", "with", "by", "for", "about", "of", "under", "over", "near", "after", "before", "since", "during", "without", "behind", "through", "around", "out"]);
  const W = { who: "subj", whom: "akk", what: "akk", where: "ort", when: "zeit", how: "art", why: "part", which: "akk", whose: "akk" };
  const MODALS = new Set(["can", "could", "must", "should", "may", "might", "would", "shall"]);
  const BE_F = { am: ["i"], is: ["3sg"], are: ["you", "pl"], was: ["i", "3sg"], were: ["you", "pl"] };
  const AUX = new Set(["do", "does", "did", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "will", "going", ...MODALS]);
  const FREQ = new Set(["always", "usually", "often", "sometimes", "rarely", "never", "seldom", "ever", "already", "just", "still", "also", "really", "probably"]);
  const PARTIKEL = new Set(["also", "really", "probably", "still", "too", "very", "only", "even", "please"]);
  const ZEITWORT = new Set(["today", "yesterday", "tomorrow", "now", "soon", "then", "later", "tonight", "ago", "yet", "already", "just", "recently", "lately", "early", "late"]);
  const ZEIT_NOMEN = new Set(["day", "days", "week", "weeks", "month", "months", "year", "years", "morning", "evening", "afternoon", "night", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "o'clock", "hour", "hours", "minute", "minutes", "weekend", "time", "summer", "winter", "spring", "autumn", "moment", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]);
  const VERGANGEN_ZEIT = /\b(yesterday|ago|last (week|month|year|night|monday|sunday)|in (19|20)\d\d)\b/;
  const ZUKUNFT_ZEIT = /\b(tomorrow|next (week|month|year|monday)|soon)\b/;
  const ORT_WORT = new Set(["here", "there", "home", "abroad", "upstairs", "downstairs", "outside", "inside", "everywhere", "away", "back"]);
  const ART_WORT = new Set(["well", "fast", "hard", "together", "alone", "slowly", "quickly", "carefully", "badly", "loudly", "quietly", "easily", "happily"]);
  const KONJ = new Set(["and", "but", "or", "so", "because", "when", "if", "that", "while", "although"]);

  let LEX = null;
  function lexikon() {
    if (LEX) return LEX;
    const E = g("EN_ENGINE");
    const form = new Map(); // wort → [{v, typ}]
    const add = (w, v, typ) => { const k = low(w); if (!form.has(k)) form.set(k, []); form.get(k).push({ v, typ }); };
    arr(g("EN_SL_VERBS")).forEach((v) => {
      const f = E.formen(v);
      add(f.base, v, "base"); add(f.s, v, "s"); add(f.past, v, "past"); add(f.pp, v, "pp"); add(f.ing, v, "ing");
    });
    const nomen = new Map();
    arr(g("EN_SL_NOUNS")).forEach((n) => { nomen.set(low(n.sg), { n, plural: !!n.nurPl }); if (n.pl) nomen.set(low(n.pl), { n, plural: true }); });
    const adj = new Set(arr(g("EN_SL_ADJECTIVES")).concat(["happy", "tired", "hungry", "late", "ready", "sick", "busy", "cold", "hot", "angry", "sad", "free", "right", "wrong", "fine", "great", "bad", "long", "short", "old", "important", "difficult", "easy", "nice", "good"]));
    LEX = { form, nomen, adj };
    return LEX;
  }
  const verbInfo = (w) => lexikon().form.get(low(w)) || null;
  const hatTyp = (w, typ) => (verbInfo(w) || []).some((x) => x.typ === typ);
  function rateTyp(w) {
    const l = low(w);
    if (verbInfo(l)) return verbInfo(l)[0].typ;
    if (/ing$/.test(l) && l.length > 4) return "ing";
    if (/ed$/.test(l) && l.length > 3) return "past";
    return null;
  }

  // Kurzformen auflösen
  function aufloesen(tokens) {
    const out = [];
    let geaendert = false;
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      const l = low(t);
      let m;
      if (l === "won't") { out.push(cap(t, "will"), "not"); geaendert = true; continue; }
      if (l === "can't" || l === "cannot") { out.push(cap(t, "can"), "not"); geaendert = true; continue; }
      if (l === "shan't") { out.push(cap(t, "shall"), "not"); geaendert = true; continue; }
      if ((m = l.match(/^(\w+)n't$/))) { out.push(cap(t, m[1]), "not"); geaendert = true; continue; }
      if ((m = t.match(/^(\w+)'(m|re|ve|ll|d|s)$/i))) {
        const basis = m[1];
        const rest = low(m[2]);
        const naechstes = low(tokens[i + 1] || "");
        let voll;
        if (rest === "m") voll = "am";
        else if (rest === "re") voll = "are";
        else if (rest === "ve") voll = "have";
        else if (rest === "ll") voll = "will";
        else if (rest === "d") voll = hatTyp(naechstes, "pp") && !hatTyp(naechstes, "base") || naechstes === "been" ? "had" : "would";
        else { // 's
          if (!SUBJ_PRON[low(basis)] && !/^(what|where|who|how|when|that|there|here)$/i.test(basis)) { out.push(t); continue; } // Besitz: John's car
          voll = naechstes === "been" || naechstes === "got" || (hatTyp(naechstes, "pp") && !hatTyp(naechstes, "past") && !hatTyp(naechstes, "ing")) ? "has" : "is";
          if (naechstes === "gone" || naechstes === "done" || naechstes === "seen" || naechstes === "written" || naechstes === "eaten") voll = "has";
        }
        out.push(basis, voll);
        geaendert = true;
        continue;
      }
      out.push(t);
    }
    return { tokens: out, geaendert };
  }
  function cap(orig, wort) { return /^[A-Z]/.test(orig) ? capFirst(wort) : wort; }

  // ------------------------------------------------------------
  // Nominalgruppe ab Position i
  // ------------------------------------------------------------
  function nomengruppe(ts, i) {
    const L = lexikon();
    const t = ts[i];
    if (t === undefined) return null;
    const l = low(t);
    if (SUBJ_PRON[l] !== undefined && l !== "there") return { text: t, von: i, bis: i, pron: true, key: SUBJ_PRON[l], subjForm: true };
    if (OBJ_PRON.has(l)) return { text: t, von: i, bis: i, pron: true, objForm: true, key: l === "us" || l === "them" ? "pl" : "3sg" };
    let j = i;
    let det = null;
    if (DETS.has(l)) { det = l; j++; }
    while (j < ts.length && (L.adj.has(low(ts[j])) || (/^[a-z]+(ful|ous|ive|al|ic|ing)$/.test(low(ts[j])) && !verbInfo(ts[j]) && j + 1 < ts.length && !AUX.has(low(ts[j + 1]))))) j++;
    const w = ts[j];
    if (w === undefined) return det ? { text: ts.slice(i, j).join(" "), von: i, bis: j - 1, key: "3sg" } : null;
    const lw = low(w);
    const nn = L.nomen.get(lw);
    const istVerbWort = verbInfo(lw) && !nn;
    const istName = /^[A-Z]/.test(w) && (j > 0 || nn || !verbInfo(lw));
    if (nn || istName || (det && !PREPS.has(lw) && !AUX.has(lw) && lw !== "not") || (!det && !istVerbWort && false)) {
      let bis = j;
      while (istName && !nn && bis + 1 < ts.length && /^[A-Z]/.test(ts[bis + 1])) bis++; // Anna Smith
      const plural = nn ? nn.plural : (!istName && /[^s]s$/.test(lw));
      return { text: ts.slice(i, bis + 1).join(" "), von: i, bis, nomen: nn ? nn.n : null, plural, key: plural ? "pl" : "3sg", det, person: nn ? !!nn.n.person : istName };
    }
    return null;
  }

  // ------------------------------------------------------------
  // HAUPTFUNKTION
  // ------------------------------------------------------------
  function analysiere(eingabe) {
    const E = g("EN_ENGINE");
    const hinweise = [], alarme = [];
    const original = String(eingabe || "").trim();
    if (!original) return { r: { fehler: "Please type a sentence. / Введи предложение." } };
    let roh = original.replace(/[’‘]/g, "'").replace(/[„“"»«]/g, "").match(/[A-Za-z0-9']+|[.,!?;:]/g) || [];
    const ende = roh.filter((t) => /^[.!?]$/.test(t)).pop() || ".";
    // nur der erste Teilsatz bei Komma / Konjunktion
    const teile = [];
    let cur = [];
    roh.forEach((t) => { if (/^[,;:]$/.test(t)) { if (cur.length) teile.push(cur); cur = []; } else if (!/^[.!?]$/.test(t)) cur.push(t); });
    if (cur.length) teile.push(cur);
    let ts0 = teile[0] || [];
    if (teile.length > 1) {
      const haupt = teile.find((x) => !KONJ.has(low(x[0]))) || teile[0];
      ts0 = haupt;
      hinweise.push(`Предложение из нескольких частей. Разбираю главную часть: «${haupt.join(" ")}». Остальное программа пока не разбирает.`);
    }
    const kIdx = ts0.findIndex((t, i) => i > 1 && KONJ.has(low(t)));
    if (kIdx > 0) { hinweise.push(`Разбираю часть до «${ts0[kIdx]}»: «${ts0.slice(0, kIdx).join(" ")}».`); ts0 = ts0.slice(0, kIdx); }
    const auf = aufloesen(ts0);
    const ts = auf.tokens;
    if (!ts.length) return { r: { fehler: "No sentence found." } };

    const seg = (text, rolle, info) => ({ text, rolle, info: info || "" });
    const segmente = [];
    let i = 0;
    let satzart = "aussage";
    let fw = null;

    // Fragewort
    const l0 = low(ts[0]);
    if (W[l0] !== undefined) {
      if (l0 === "how" && /^(often|much|many|long|old)$/.test(low(ts[1] || ""))) { fw = seg(ts[0] + " " + ts[1], low(ts[1]) === "often" || low(ts[1]) === "long" ? "zeit" : "akk", "question word"); i = 2; }
      else if (l0 === "where" ) { fw = seg(ts[0], "ort", "question word"); i = 1; }
      else { fw = seg(ts[0], W[l0], "question word · вопросительное слово"); i = 1; }
      satzart = "wfrage";
    }

    // Kette sammeln: Hilfsverben, not, Häufigkeit, Hauptverb
    const kette = []; // {text, typ: aux|main, wort}
    let subj = null;
    let neg = false;
    const zwischen = []; // Segmente zwischen Hilfsverben (not, always)

    function nimmKette(start, nurAux) {
      let j = start;
      while (j < ts.length) {
        const w = ts[j], l = low(w);
        if (l === "not") { neg = true; zwischen.push({ pos: kette.length, s: seg(w, "neg", "отрицание") }); j++; continue; }
        if (FREQ.has(l)) { zwischen.push({ pos: kette.length, s: seg(w, "zeit", l === "already" || l === "just" ? "time — уже / только что" : "frequency — как часто?") }); if (l === "never") neg = neg || false; j++; continue; }
        if (l === "going" && low(ts[j + 1]) === "to" && kette.length && /^(am|is|are|was|were)$/.test(low(kette[kette.length - 1].text))) { kette.push({ text: w + " " + ts[j + 1], typ: "aux", wort: "going to" }); j += 2; continue; }
        if (AUX.has(l) && !(l === "have" || l === "has" || l === "had" || l === "do" || l === "does" || l === "did") ) {
          kette.push({ text: w, typ: "aux", wort: l }); j++;
          if (nurAux) return j;
          continue;
        }
        if (l === "have" || l === "has" || l === "had" || l === "do" || l === "does" || l === "did") {
          // Hilfsverb, wenn danach (not/adv) ein Verb kommt; sonst Vollverb
          let k = j + 1;
          while (k < ts.length && (low(ts[k]) === "not" || FREQ.has(low(ts[k])))) k++;
          const nach = ts[k];
          const nachIstVerb = nach && ((verbInfo(nach) || rateTyp(nach)) && !lexikon().nomen.has(low(nach)) && !DETS.has(low(nach)) || /^(been|being|be|got)$/.test(low(nach)));
          if (nurAux || nachIstVerb || (l === "had" && low(nach) === "been")) { kette.push({ text: w, typ: "aux", wort: l }); j++; if (nurAux) return j; continue; }
          kette.push({ text: w, typ: "main", wort: l }); j++; return j;
        }
        // Adjektiv nach be → kein Verb (I'm tired)
        if (kette.length && /^(am|is|are|was|were|be|been)$/.test(kette[kette.length - 1].wort) && lexikon().adj.has(l)) return j;
        // Hauptverb?
        const vi = verbInfo(l);
        const geraten = !vi && kette.length ? rateTyp(l) : null;
        if (vi || geraten || (!kette.length && !DETS.has(l) && !PREPS.has(l) && !/^[A-Z]/.test(w))) {
          if (!vi && !kette.length && lexikon().nomen.has(l)) return j;
          kette.push({ text: w, typ: "main", wort: l, unbekannt: !vi });
          j++;
          return j;
        }
        return j;
      }
      return j;
    }

    const istAuxStart = (w) => AUX.has(low(w)) && low(w) !== "going" && low(w) !== "been" && low(w) !== "being";
    if (satzart === "wfrage") {
      if (istAuxStart(ts[i] || "") && low(ts[i]) !== "be") {
        // Where does he go?
        i = nimmKette(i, true);
        subj = nomengruppe(ts, i);
        if (subj) i = subj.bis + 1;
        i = nimmKette(i, false);
      } else {
        // Who goes home?  → Fragewort ist Subjekt
        subj = { text: fw.text, frageSubj: true, key: "3sg" };
        fw.rolle = "subj";
        i = nimmKette(i, false);
      }
    } else if (istAuxStart(ts[0]) && ts.length > 1) {
      satzart = ende === "?" || true ? "frage" : "aussage";
      i = nimmKette(0, true);
      subj = nomengruppe(ts, i);
      if (subj) i = subj.bis + 1;
      i = nimmKette(i, false);
    } else {
      // Aussage: Zeitangabe am Anfang?
      const vorZeit = [];
      while (i < ts.length && (ZEITWORT.has(low(ts[i])) || FREQ.has(low(ts[i])) && i === 0)) { vorZeit.push(seg(ts[i], "zeit", "time — когда?")); i++; }
      if (vorZeit.length) segmente.push(...vorZeit);
      subj = nomengruppe(ts, i);
      if (subj) i = subj.bis + 1;
      i = nimmKette(i, false);
      if (ende === "?") satzart = "frage";
    }
    if (ende === "!" && !subj && kette.length && kette[0].typ === "main") satzart = "imperativ";

    if (!kette.length) return { r: { fehler: "I can't find a verb. / Не нашёл глагол в этом предложении." } };
    const main = kette.filter((k) => k.typ === "main").pop() || null;
    const auxs = kette.filter((k) => k.typ === "aux").map((k) => k.wort);

    // ---- Rest: Objekte, Ort, Zeit, Art ----
    const rest = [];
    let j = i;
    const kopula = !main && auxs.length && /^(am|is|are|was|were|be|been)$/.test(auxs[auxs.length - 1]);
    while (j < ts.length) {
      const w = ts[j], l = low(w);
      // Zeitausdrücke
      if (/^(every|last|next|this)$/.test(l) && ts[j + 1] && ZEIT_NOMEN.has(low(ts[j + 1]))) { rest.push(seg(w + " " + ts[j + 1], "zeit", "time — когда?")); j += 2; continue; }
      if (/^\d+$|^(two|three|four|five|ten|a)$/.test(l) && ts[j + 1] && ZEIT_NOMEN.has(low(ts[j + 1])) && low(ts[j + 2]) === "ago") { rest.push(seg(ts.slice(j, j + 3).join(" "), "zeit", "time — когда? (… назад)")); j += 3; continue; }
      if (ZEITWORT.has(l)) { rest.push(seg(w, "zeit", "time — когда?")); j++; continue; }
      if (FREQ.has(l)) { rest.push(seg(w, "zeit", "frequency — как часто?")); j++; continue; }
      if (l === "not") { neg = true; rest.push(seg(w, "neg", "отрицание")); j++; continue; }
      if (ORT_WORT.has(l)) { rest.push(seg(w, "ort", l === "home" ? "place — куда? (home без to!)" : "place — где? куда?")); j++; continue; }
      if (ART_WORT.has(l) || (/ly$/.test(l) && l.length > 4 && !lexikon().nomen.has(l))) { rest.push(seg(w, "art", "manner — как?")); j++; continue; }
      // Präpositionalgruppe
      if (PREPS.has(l)) {
        if (l === "to" && ts[j + 1] && (verbInfo(ts[j + 1]) || []).some((x) => x.typ === "base") && !DETS.has(low(ts[j + 1]))) { rest.push(seg(w + " " + ts[j + 1], "akk", "to + V1 (инфинитив): want to go")); j += 2; continue; }
        let k = j + 1;
        let ng = nomengruppe(ts, k);
        if (!ng && /^\d+$/.test(ts[k] || "")) ng = { bis: low(ts[k + 1]) === "o'clock" ? k + 1 : k, text: ts[k] };
        const bis = ng ? ng.bis : (ts[k] && !AUX.has(low(ts[k])) ? k : j);
        const text = ts.slice(j, bis + 1).join(" ");
        const nomenWort = low(ts[bis]);
        let rolle = "ort", info = "place — где?";
        if (ZEIT_NOMEN.has(nomenWort) || /^\d{4}$/.test(nomenWort) || l === "since" || l === "during" || (l === "for" && /hours?|days?|years?|weeks?|minutes?|months?/.test(nomenWort)) || l === "after" || l === "before") { rolle = "zeit"; info = "time — когда? / как долго?"; }
        else if (l === "with" || l === "by" || l === "without") { rolle = "art"; info = "manner — как? / с кем? / на чём?"; }
        else if (l === "to" || l === "into") { rolle = "ort"; info = "place — куда? (to = направление)"; if (ng && ng.nomen && ng.nomen.person) { rolle = "dat"; info = "to + кому? (косвенное дополнение)"; } }
        else if (l === "from") info = "place — откуда?";
        else if (l === "for" || l === "about" || l === "of") { rolle = "part"; info = "prepositional phrase · предложная группа"; }
        rest.push(seg(text, rolle, info));
        j = bis + 1; continue;
      }
      // Nomengruppe / Objektpronomen
      const ng = nomengruppe(ts, j);
      if (ng) {
        rest.push(Object.assign(seg(ng.text, kopula ? "pkv" : "akk", kopula ? "complement после be" : ng.pron ? "object pronoun" : "noun group"), { ng }));
        j = ng.bis + 1; continue;
      }
      if (kopula && lexikon().adj.has(l)) { rest.push(seg(w, "pkv", "adjective после be — какой?")); j++; continue; }
      rest.push(seg(w, "unbek", "нет в базе"));
      j++;
    }
    // zwei Nomengruppen hintereinander → erste ist indirektes Objekt
    const objs = rest.filter((s) => s.rolle === "akk" && s.ng);
    if (objs.length >= 2) { objs[0].rolle = "dat"; objs[0].info = "indirect object — кому? (без предлога, перед «что?»)"; objs[1].info = "direct object — что?"; }

    // ---- Segmente zusammenbauen in Originalreihenfolge ----
    const vSegs = kette.map((k) => seg(k.text, "pred", k.typ === "aux" ? "helping verb · вспомогательный" : "main verb · смысловой" + (k.unbekannt ? " (нет в базе)" : "")));
    const zwischenNachPos = (p) => zwischen.filter((z) => z.pos === p).map((z) => z.s);
    const subjSeg = subj && !subj.frageSubj ? seg(subj.text, "subj", subj.pron ? "personal pronoun" : "noun group") : null;
    const kettenSegs = [];
    vSegs.forEach((s, idx) => { kettenSegs.push(...zwischenNachPos(idx)); kettenSegs.push(s); });
    kettenSegs.push(...zwischenNachPos(vSegs.length));
    let alle;
    if (satzart === "frage") alle = [kettenSegs[0], subjSeg, ...kettenSegs.slice(1), ...rest];
    else if (satzart === "wfrage" && !(subj && subj.frageSubj)) alle = [fw, kettenSegs[0], subjSeg, ...kettenSegs.slice(1), ...rest];
    else if (satzart === "wfrage") alle = [fw, ...kettenSegs, ...rest];
    else alle = [...segmente, subjSeg, ...kettenSegs, ...rest];
    alle = alle.filter(Boolean);
    // Reihenfolge prüfen: im Fragesatz ist zwischen[] evtl. vor Subjekt → hier vereinfachend
    if (satzart === "frage" || (satzart === "wfrage" && !(subj && subj.frageSubj))) {
      // „Does he not go?“ – not steht dann hinter dem Subjekt; ok
    }

    // ---- Zeitform bestimmen ----
    const key = subj ? subj.key || "3sg" : "you";
    const mTyp = main ? (verbInfo(main.wort) ? (verbInfo(main.wort).map((x) => x.typ)) : [rateTyp(main.wort)]) : [];
    const has = (t) => mTyp.includes(t);
    const A = auxs.join(" ");
    let tense = null, modal = null, passiv = false;
    const f1 = auxs[0];
    if (!auxs.length && main) {
      if (/^(am|is|are)$/.test(main.wort)) tense = "pres_simple";
      else if (/^(was|were)$/.test(main.wort)) tense = "past_simple";
      else if (has("past") && !has("base") && !has("s")) tense = "past_simple";
      else if (has("past") && has("base") && main.wort === "read") tense = "pres_simple";
      else if (has("s") || has("base")) tense = "pres_simple";
      else if (has("pp")) { tense = "past_simple"; alarme.push(`⚠ «${main.text}» — это V3 (past participle). Без have/has так нельзя. Нужно: «${verbInfo(main.wort)[0].v.past ? E.formen(verbInfo(main.wort)[0].v).past : main.text}» (Past Simple) или «have ${main.text}» (Present Perfect).`); }
      else if (has("ing")) { tense = "pres_prog"; alarme.push(`⚠ Не хватает вспомогательного глагола: «${main.text}» без am/is/are. Правильно: «${subj ? subj.text : "he"} ${key === "i" ? "am" : key === "3sg" ? "is" : "are"} ${main.text}».`); }
    } else if (kopula && !main) {
      tense = /^(was|were)$/.test(f1) ? "past_simple" : /^(am|is|are)$/.test(f1) ? "pres_simple" : f1 === "will" ? "fut_simple" : /^(have|has)$/.test(f1) ? "pres_perf" : "pres_simple";
    } else if (/^(do|does)$/.test(f1) && auxs.length === 1) tense = "pres_simple";
    else if (f1 === "did" && auxs.length === 1) tense = "past_simple";
    else if (/^(am|is|are)$/.test(f1) && auxs[1] === "going to") tense = "going_to";
    else if (/^(am|is|are)$/.test(f1) && auxs.length === 1 && has("ing")) tense = "pres_prog";
    else if (/^(was|were)$/.test(f1) && auxs.length === 1 && has("ing")) tense = "past_prog";
    else if (/^(am|is|are|was|were)$/.test(f1) && auxs.length === 1 && has("pp")) { passiv = true; tense = /^(was|were)$/.test(f1) ? "past_simple" : "pres_simple"; }
    else if (/^(have|has)$/.test(f1) && auxs[1] === "been" && has("ing")) tense = "pres_perf_prog";
    else if (/^(have|has)$/.test(f1) && auxs.length === 1) tense = "pres_perf";
    else if (f1 === "had" && auxs[1] === "been" && has("ing")) tense = "past_perf_prog";
    else if (f1 === "had" && auxs.length === 1) tense = "past_perf";
    else if (f1 === "will" && auxs.length === 1) tense = "fut_simple";
    else if (f1 === "will" && auxs[1] === "be" && has("ing")) tense = "fut_prog";
    else if (f1 === "will" && auxs[1] === "have" && auxs[2] === "been") tense = "fut_perf_prog";
    else if (f1 === "will" && auxs[1] === "have") tense = "fut_perf";
    else if (MODALS.has(f1)) { modal = f1; tense = null; }
    if (!tense && !modal && f1) tense = /^(was|were|did|had)$/.test(f1) ? "past_simple" : "pres_simple";

    // ---- Fehlerprüfungen ----
    const mainV = main && verbInfo(main.wort) ? verbInfo(main.wort)[0].v : null;
    const F = mainV ? E.formen(mainV) : null;
    const subjText = subj && !subj.frageSubj ? subj.text : "he";
    if (main && F) {
      if (/^(do|does|did)$/.test(f1) && main.wort !== F.base) alarme.push(`⚠ После «${f1}» смысловой глагол стоит в начальной форме (V1): «${f1} … ${F.base}», а не «${main.text}». ${f1 === "does" ? "Окончание -s уже «забрал» does." : f1 === "did" ? "Прошедшее время уже «забрал» did." : ""}`);
      if (!auxs.length && tense === "pres_simple" && !/^(am|is|are)$/.test(main.wort)) {
        if (key === "3sg" && main.wort === F.base && F.base !== F.s) alarme.push(`⚠ Подлежащее «${subjText}» — 3-е лицо единственного числа (he/she/it). В Present Simple нужно -s: «${subjText} ${F.s}», а не «${subjText} ${main.text}».`);
        if (key !== "3sg" && main.wort === F.s && F.base !== F.s && subj) alarme.push(`⚠ «-s» только для he/she/it. Для «${subjText}» — без -s: «${subjText} ${F.base}».`);
      }
      if (/^(have|has|had)$/.test(f1) && auxs.length === 1 && main.wort !== F.pp && main.wort === F.past) alarme.push(`⚠ После have/has/had нужна 3-я форма (V3): «${f1} ${F.pp}», а не «${f1} ${main.text}» (V2). Запомни: ${F.base} – ${F.past} – ${F.pp}.`);
      if (/^(will|can|could|must|should|may|might|would)$/.test(f1) && main.wort !== F.base) alarme.push(`⚠ После «${f1}» — начальная форма без -s и без to: «${f1} ${F.base}».`);
      if (/^(am|is|are|was|were)$/.test(f1) && auxs.length === 1 && main.wort === F.base && F.base !== F.pp) alarme.push(`⚠ «${f1} ${main.text}» — так нельзя. Нужно «${f1} ${F.ing}» (Progressive) или просто «${subjText} ${key === "3sg" ? F.s : F.base}» (Present Simple).`);
      if (E.PROG.has(tense) && E.STATIV.has(F.base) && F.base !== "have") alarme.push(`⚠ «${F.base}» — глагол состояния (stative verb), обычно не в -ing форме: «I ${F.base}», а не «I am ${F.ing}».`);
    }
    // be-Übereinstimmung
    const beForm = [f1, main && main.wort].find((x) => BE_F[x]);
    if (beForm && subj && !subj.frageSubj && !BE_F[beForm].includes(key)) {
      const richtig = /^(was|were)$/.test(beForm) ? (key === "i" || key === "3sg" ? "was" : "were") : key === "i" ? "am" : key === "3sg" ? "is" : "are";
      alarme.push(`⚠ «${subjText} ${beForm}» — неверная форма be. Правильно: «${subjText} ${richtig}». (I am · he/she/it is · you/we/they are; I/he was · you/we/they were)`);
    }
    if (/^(have|has)$/.test(f1) && subj && !subj.frageSubj) {
      const r2 = key === "3sg" ? "has" : "have";
      if (f1 !== r2) alarme.push(`⚠ «${subjText} ${f1}» → правильно «${subjText} ${r2}» (has только для he/she/it).`);
    }
    if (/^(do|does)$/.test(f1) && subj && !subj.frageSubj) {
      const r2 = key === "3sg" ? "does" : "do";
      if (f1 !== r2) alarme.push(`⚠ «${f1} ${subjText}» → правильно «${r2}» (does только для he/she/it).`);
    }
    const textKlein = " " + ts.join(" ").toLowerCase() + " ";
    if ((tense === "pres_perf" || tense === "pres_perf_prog") && VERGANGEN_ZEIT.test(textKlein)) alarme.push(`⚠ Present Perfect нельзя употреблять с конкретным прошлым временем (yesterday, last week, … ago, in 2020)! Нужен Past Simple${F ? ": «" + subjText + " " + F.past + " …»" : ""}. В немецком «Ich bin gestern gegangen» — нормально, в английском «I have gone yesterday» — ошибка.`);
    if (tense && /^past/.test(tense) && ZUKUNFT_ZEIT.test(textKlein)) alarme.push(`⚠ Время прошедшее, а слово времени указывает на будущее (tomorrow, next …).`);
    if (neg && /\b(never|nothing|nobody|no one)\b/.test(textKlein)) alarme.push(`⚠ Двойное отрицание! В английском нельзя «not … never / nothing / nobody» (как по-русски «никогда не», «ничего не»). Правильно: «I never go» или «I don't ever go»; «I see nothing» или «I don't see anything».`);
    if (/ to home /.test(textKlein)) alarme.push(`⚠ «to home» — ошибка. После go/come — просто «home»: «go home», «come home».`);
    if (/ since /.test(textKlein) && tense && !/perf/.test(tense)) alarme.push(`⚠ С «since» нужен Present Perfect: «I have lived here since 2020», а не «I live here since 2020».`);
    if (/ (in|at) (yesterday|tomorrow|today|last|next)\b/.test(textKlein)) alarme.push(`⚠ Перед yesterday / tomorrow / today / last … / next … предлог не нужен: «yesterday», а не «in yesterday».`);
    const unbek = alle.filter((s) => s.rolle === "unbek").map((s) => s.text);
    if (unbek.length) hinweise.push("Не распознано (серым): " + unbek.join(", ") + ". Этих слов пока нет в базе.");
    if (main && main.unbekannt) hinweise.push(`Глагол «${main.text}» есть не в базе — форма определена по окончанию (-ed, -ing), объяснения будут неполными.`);

    const text = capFirst(alle.map((s) => s.text).join(" ")) + ende;
    const formen = F;
    const ketteOut = kette.map((k) => ({ text: k.text, typ: k.typ, name: k.typ === "aux" ? "helping verb" : "main verb" }));
    const r = {
      text,
      segmente: alle,
      tense,
      tenseInfo: tense ? E.TENSES[tense] : null,
      zeitform: modal ? `Modal verb „${modal}“` : passiv ? "Passive (be + V3)" + (tense ? " · " + E.TENSES[tense].en : "") : tense ? E.TENSES[tense].en : "?",
      key,
      formen,
      brauchtDo: /^(do|does|did)$/.test(f1 || ""),
      kette: ketteOut,
      hinweise,
      alarme,
      analyse: true,
      modal,
      passiv,
      original,
      ausgeschrieben: auf.geaendert ? text : null,
    };
    const cfg = {
      satzart: satzart === "imperativ" ? "aussage" : satzart,
      neg,
      tense: modal || passiv ? null : tense,
      subj: subj && !subj.frageSubj ? (subj.pron ? { pron: { id: low(subj.text), form: subj.text, key } } : { noun: subj.nomen || { sg: subj.text }, plural: subj.plural }) : null,
      verb: mainV,
      verbUnbekannt: !mainV,
      fragNach: satzart === "wfrage" ? (subj && subj.frageSubj ? "subj" : fw ? fw.rolle : null) : null,
      analyse: true,
    };
    if (satzart === "imperativ") hinweise.push("Повелительное предложение (Imperative): глагол в начальной форме без подлежащего — «Come here!», «Don't go!».");
    return { cfg, r };
  }

  if (typeof window !== "undefined") window.EN_ANALYSE = analysiere;
  if (typeof module !== "undefined") module.exports = { analysiere };
})();
