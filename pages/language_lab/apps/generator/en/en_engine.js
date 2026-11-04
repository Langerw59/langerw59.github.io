// =============================================================
// en_engine.js – Englischer Satzgenerator (Satzlabor EN)
// RU: Движок английского генератора предложений
// -------------------------------------------------------------
// window.EN_ENGINE.bauen(cfg) → { text, segmente, tense, hinweise, alarme, … }
// 12 Zeitformen + "going to", Aussage / Frage / W-Frage, Verneinung,
// do/does/did, Stellung von always/never, Reihenfolge S-V-O-M-P-T.
// Version 1 (2026-11-02)
// =============================================================

(() => {
  "use strict";

  const g = (n) => (typeof window !== "undefined" ? window[n] : undefined);
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  // ------------------------------------------------------------
  // Zeitformen
  // ------------------------------------------------------------
  const TENSES = {
    pres_simple:    { en: "Present Simple", ru: "настоящее простое", de: "Präsens (regelmäßig, immer)", gruppe: "Present" },
    pres_prog:      { en: "Present Progressive", ru: "настоящее длительное (прямо сейчас)", de: "Präsens + „gerade“", gruppe: "Present" },
    pres_perf:      { en: "Present Perfect", ru: "настоящее совершённое (результат сейчас)", de: "≈ Perfekt (aber nie mit „gestern“!)", gruppe: "Present" },
    pres_perf_prog: { en: "Present Perfect Progressive", ru: "длится до сих пор", de: "Präsens + „seit“", gruppe: "Present" },
    past_simple:    { en: "Past Simple", ru: "прошедшее простое", de: "Präteritum / Perfekt", gruppe: "Past" },
    past_prog:      { en: "Past Progressive", ru: "прошедшее длительное (в тот момент)", de: "Präteritum + „gerade“", gruppe: "Past" },
    past_perf:      { en: "Past Perfect", ru: "предпрошедшее", de: "Plusquamperfekt", gruppe: "Past" },
    past_perf_prog: { en: "Past Perfect Progressive", ru: "длилось до момента в прошлом", de: "Plusquamperfekt + „seit“", gruppe: "Past" },
    fut_simple:     { en: "Future Simple (will)", ru: "будущее простое", de: "Futur I", gruppe: "Future" },
    going_to:       { en: "Future: going to", ru: "собираюсь (план, намерение)", de: "„ich habe vor …“", gruppe: "Future" },
    fut_prog:       { en: "Future Progressive", ru: "будущее длительное (в тот момент)", de: "Futur I + „gerade“", gruppe: "Future" },
    fut_perf:       { en: "Future Perfect", ru: "будущее совершённое (к моменту)", de: "Futur II", gruppe: "Future" },
    fut_perf_prog:  { en: "Future Perfect Progressive", ru: "будет длиться к моменту", de: "Futur II + „seit“", gruppe: "Future" },
  };
  const PROG = new Set(["pres_prog", "past_prog", "fut_prog", "pres_perf_prog", "past_perf_prog", "fut_perf_prog"]);
  const PERFEKT_GEGENWART = new Set(["pres_perf", "pres_perf_prog"]);
  const VERGANGEN = new Set(["past_simple", "past_prog", "past_perf", "past_perf_prog"]);
  const ZUKUNFT = new Set(["fut_simple", "going_to", "fut_prog", "fut_perf", "fut_perf_prog"]);
  const STATIV = new Set(["know", "like", "love", "need", "want", "see", "hear", "have"]);

  // ------------------------------------------------------------
  // Pronomen
  // key: i | you | 3sg | pl   (für Verbformen)
  // ------------------------------------------------------------
  const PRONOMEN = [
    { id: "I", form: "I", key: "i", ru: "я", obj: "me" },
    { id: "you", form: "you", key: "you", ru: "ты", obj: "you" },
    { id: "he", form: "he", key: "3sg", ru: "он", obj: "him" },
    { id: "she", form: "she", key: "3sg", ru: "она", obj: "her" },
    { id: "it", form: "it", key: "3sg", ru: "оно (вещь, животное)", obj: "it" },
    { id: "we", form: "we", key: "pl", ru: "мы", obj: "us" },
    { id: "you_pl", form: "you", key: "pl", ru: "вы", obj: "you" },
    { id: "they", form: "they", key: "pl", ru: "они", obj: "them" },
  ];
  const OBJ_PRON = [
    { form: "me", ru: "мне / меня", person: true }, { form: "you", ru: "тебе / тебя", person: true },
    { form: "him", ru: "ему / его", person: true }, { form: "her", ru: "ей / её", person: true },
    { form: "it", ru: "это / его (вещь)", person: false }, { form: "us", ru: "нам / нас", person: true },
    { form: "them", ru: "им / их", person: true },
  ];

  // ------------------------------------------------------------
  // Verbformen
  // ------------------------------------------------------------
  const VOKAL = /[aeiou]/;
  function sForm(v) {
    if (v.s) return v.s;
    const b = v.base;
    if (/(s|sh|ch|x|z|o)$/.test(b)) return b + "es";
    if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + "ies";
    return b + "s";
  }
  function ingForm(v) {
    if (v.ing) return v.ing;
    const b = v.base;
    if (b.endsWith("ie")) return b.slice(0, -2) + "ying";
    if (b.endsWith("e") && !b.endsWith("ee") && b !== "be") return b.slice(0, -1) + "ing";
    return b + "ing";
  }
  function pastReg(v) {
    if (v.pastReg) return v.pastReg;
    const b = v.base;
    if (b.endsWith("e")) return b + "d";
    if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + "ied";
    return b + "ed";
  }
  function formen(v) {
    const unreg = !!(v.past || v.pp);
    const past = v.past || pastReg(v);
    const pp = v.pp || past;
    return { base: v.base, s: sForm(v), past, pp, ing: ingForm(v), unregelmaessig: unreg && !(v.past === pastReg(v) && v.pp === pastReg(v)) };
  }

  const BE = { praes: { i: "am", you: "are", "3sg": "is", pl: "are" }, past: { i: "was", you: "were", "3sg": "was", pl: "were" } };
  const HAVE = { praes: { i: "have", you: "have", "3sg": "has", pl: "have" }, past: "had" };
  const DO = { praes: { i: "do", you: "do", "3sg": "does", pl: "do" }, past: "did" };

  // Verbkette: Liste von Teilen [{text, typ: aux|main, name}]
  function verbKette(v, tense, key, brauchtDo) {
    const f = formen(v);
    const T = (text, typ, name) => ({ text, typ, name });
    switch (tense) {
      case "pres_simple":
        return brauchtDo ? [T(DO.praes[key], "aux", "do/does"), T(f.base, "main", "base form (V1)")] : [T(key === "3sg" ? f.s : f.base, "main", key === "3sg" ? "V1 + -s (he/she/it)" : "base form (V1)")];
      case "past_simple":
        return brauchtDo ? [T(DO.past, "aux", "did"), T(f.base, "main", "base form (V1)")] : [T(f.past, "main", "past form (V2)")];
      case "pres_prog": return [T(BE.praes[key], "aux", "be"), T(f.ing, "main", "-ing form")];
      case "past_prog": return [T(BE.past[key], "aux", "be (past)"), T(f.ing, "main", "-ing form")];
      case "pres_perf": return [T(HAVE.praes[key], "aux", "have/has"), T(f.pp, "main", "past participle (V3)")];
      case "pres_perf_prog": return [T(HAVE.praes[key], "aux", "have/has"), T("been", "aux", "been"), T(f.ing, "main", "-ing form")];
      case "past_perf": return [T(HAVE.past, "aux", "had"), T(f.pp, "main", "past participle (V3)")];
      case "past_perf_prog": return [T(HAVE.past, "aux", "had"), T("been", "aux", "been"), T(f.ing, "main", "-ing form")];
      case "fut_simple": return [T("will", "aux", "will"), T(f.base, "main", "base form (V1)")];
      case "going_to": return [T(BE.praes[key], "aux", "be"), T("going to", "aux", "going to"), T(f.base, "main", "base form (V1)")];
      case "fut_prog": return [T("will", "aux", "will"), T("be", "aux", "be"), T(f.ing, "main", "-ing form")];
      case "fut_perf": return [T("will", "aux", "will"), T("have", "aux", "have"), T(f.pp, "main", "past participle (V3)")];
      case "fut_perf_prog": return [T("will", "aux", "will"), T("have", "aux", "have"), T("been", "aux", "been"), T(f.ing, "main", "-ing form")];
    }
    return [T(f.base, "main", "")];
  }

  // ------------------------------------------------------------
  // Nomengruppe
  // np = { pron } | { noun, det, adj, plural }
  // ------------------------------------------------------------
  function anLaut(wort, noun) {
    if (noun && noun.an && wort === noun.sg) return true;
    if (/^(uni|use|usu|eu|one)/i.test(wort)) return false;
    if (/^hour|^honest/i.test(wort)) return true;
    return /^[aeio]/i.test(wort) || /^u/i.test(wort);
  }
  function nomenGruppe(np, hinweise) {
    if (!np) return "";
    if (np.pron) return np.pron.form || np.pron;
    const n = np.noun;
    const plural = !!np.plural || n.nurPl;
    const wort = plural ? (n.pl || n.sg) : n.sg;
    const adj = np.adj || "";
    let det = np.det || "the";
    let detWort = "";
    if (n.noArt && det !== "none" && ["the", "a", "this"].includes(det)) {
      if (hinweise) hinweise.push(`„${n.sg}“ (${n.ru}) обычно употребляется без артикля: play football, learn English, have dinner.`);
      det = "none";
    }
    switch (det) {
      case "the": detWort = "the"; break;
      case "a":
        if (plural) { if (hinweise) hinweise.push(`„a/an“ только с единственным числом. Во множественном — без артикля: ${wort}.`); detWort = ""; }
        else if (n.unc) { if (hinweise) hinweise.push(`„${n.sg}“ — неисчисляемое (uncountable): нельзя сказать „a ${n.sg}“. Без артикля или „some ${n.sg}“.`); detWort = ""; }
        else detWort = anLaut(adj || wort, adj ? null : n) ? "an" : "a";
        break;
      case "this": detWort = plural ? "these" : "this"; break;
      case "none": detWort = ""; break;
      default: detWort = det;
    }
    return [detWort, adj, wort].filter(Boolean).join(" ");
  }
  function subjektKey(subj) {
    if (subj.pron) return subj.pron.key;
    return subj.plural || subj.noun.nurPl ? "pl" : "3sg";
  }

  // Kurzformen
  const NEG_KURZ = { do: "don't", does: "doesn't", did: "didn't", is: "isn't", are: "aren't", was: "wasn't", were: "weren't", have: "haven't", has: "hasn't", had: "hadn't", will: "won't", am: "am" };
  const PRON_KURZ = { "i am": "I'm", "you are": "you're", "he is": "he's", "she is": "she's", "it is": "it's", "we are": "we're", "they are": "they're",
    "i have": "I've", "you have": "you've", "we have": "we've", "they have": "they've", "he has": "he's", "she has": "she's", "it has": "it's",
    "i will": "I'll", "you will": "you'll", "he will": "he'll", "she will": "she'll", "it will": "it'll", "we will": "we'll", "they will": "they'll",
    "i had": "I'd", "he had": "he'd", "she had": "she'd", "we had": "we'd", "they had": "they'd", "you had": "you'd" };
  // segs: [{text, info}] – Hilfsverb-Info verhindert „He's a car“ (has = Vollverb)
  function kurzform(segs) {
    const w = segs.map((x) => (typeof x === "string" ? x : x.text));
    const aux = segs.map((x) => typeof x === "string" || /helping|be \(|^be$/.test(x.info || "") || /^(am|is|are)$/.test(x.text));
    for (let i = 0; i < w.length - 1; i++) {
      // Verneinung: does not → doesn't
      if (w[i + 1] === "not" && NEG_KURZ[w[i]] && w[i] !== "am") { w[i] = NEG_KURZ[w[i]]; w.splice(i + 1, 1); aux.splice(i + 1, 1); }
    }
    for (let i = 0; i < w.length - 1; i++) {
      const k = PRON_KURZ[(w[i] + " " + w[i + 1]).toLowerCase()];
      // nicht kürzen, wenn danach „not“ schon gekürzt (he isn't) – dann bleibt he isn't
      if (k && !/n't$/.test(w[i + 1]) && aux[i + 1]) { w[i] = k; w.splice(i + 1, 1); aux.splice(i + 1, 1); }
    }
    return w.join(" ");
  }

  // ------------------------------------------------------------
  // HAUPTFUNKTION
  // cfg = { satzart: aussage|frage|wfrage, neg, tense, subj, verb,
  //         io, obj, art, ort, zeit, freq, fragNach }
  // ------------------------------------------------------------
  function bauen(cfg) {
    const hinweise = [], alarme = [];
    if (!cfg.subj) return { fehler: "Please choose a subject (Who?). / Выбери подлежащее." };
    if (!cfg.verb) return { fehler: "Please choose a verb. / Выбери глагол." };
    const v = cfg.verb;
    const f = formen(v);
    const wfrage = cfg.satzart === "wfrage";
    const fragNach = wfrage ? cfg.fragNach : null;
    if (wfrage && !fragNach) return { fehler: "What do you ask about? / О чём вопрос?" };

    // Subjektfrage: Who goes …? – ohne do, Verb in 3. Person
    const subjFrage = fragNach === "subj";
    const key = subjFrage ? "3sg" : subjektKey(cfg.subj);
    const einfach = cfg.tense === "pres_simple" || cfg.tense === "past_simple";
    const frageMitInversion = cfg.satzart === "frage" || (wfrage && !subjFrage);
    const brauchtDo = einfach && (cfg.neg || frageMitInversion);

    let kette = verbKette(v, cfg.tense, key, brauchtDo);

    // Segmente
    const seg = (text, rolle, info) => ({ text, rolle, info: info || "" });
    const S = {};
    S.subj = seg(nomenGruppe(cfg.subj, hinweise), "subj", cfg.subj.pron ? "personal pronoun · личное местоимение" : "noun group · существительное");
    if (cfg.io) S.dat = seg(nomenGruppe(cfg.io, hinweise), "dat", "indirect object (кому?) — без предлога, перед прямым дополнением");
    if (cfg.obj) S.akk = seg(nomenGruppe(cfg.obj, hinweise), "akk", "direct object (кого? что?)");
    if (cfg.art) S.art = seg(cfg.art.text, "art", "manner — как?");
    if (cfg.ort) S.ort = seg(cfg.ort.text, "ort", "place — " + (cfg.ort.frage || "Where?"));
    if (cfg.zeit) S.zeit = seg(cfg.zeit.text, "zeit", "time — когда?");
    const freq = cfg.freq ? seg(cfg.freq.text, "zeit", "frequency — как часто? (стоит перед смысловым глаголом)") : null;

    // Fragewort
    let fw = null;
    if (wfrage) {
      const W = {
        subj: () => (cfg.subj.pron ? (cfg.subj.pron.key === "3sg" && cfg.subj.pron.id === "it" ? "what" : "who") : cfg.subj.noun.person ? "who" : "what"),
        akk: () => (cfg.obj && (cfg.obj.pron ? cfg.obj.pron.person : cfg.obj.noun.person) ? "who" : "what"),
        ort: () => (cfg.ort && /^from/.test(cfg.ort.text) ? "where … from" : "where"),
        zeit: () => "when",
        freq: () => "how often",
        art: () => "how",
      };
      if (!W[fragNach]) return { fehler: "Unknown question. / Неизвестный вопрос." };
      const quelle = fragNach === "freq" ? freq : S[fragNach];
      if (!quelle) return { fehler: "This part is not chosen. / Эта часть предложения не выбрана." };
      let w = W[fragNach]();
      if (w === "where … from") { w = "where"; S.ortFrom = seg("from", "ort", "предлог остаётся в конце: Where … from?"); }
      fw = seg(w, fragNach === "freq" ? "zeit" : fragNach, "question word · вопросительное слово");
      if (fragNach !== "freq") delete S[fragNach];
    }
    const freqSeg = fragNach === "freq" ? null : freq;

    // Verbteile als Segmente; not + Häufigkeit einsetzen
    const vSeg = kette.map((k) => seg(k.text, "pred", (k.typ === "aux" ? "helping verb · вспомогательный: " : "main verb · смысловой: ") + k.name));
    const notSeg = cfg.neg ? seg("not", "neg", "отрицание — после первого вспомогательного глагола") : null;
    // Positionen: erstes Hilfsverb (Operator) | not | freq | Rest
    let operator = null, rest = vSeg.slice();
    if (kette[0].typ === "aux") { operator = rest.shift(); }
    const mitte = [];
    if (notSeg) mitte.push(notSeg);
    if (freqSeg) mitte.push(freqSeg);

    // Reihenfolge
    let teile = [];
    const hinten = [S.dat, S.akk, S.art, S.ort, S.zeit, S.ortFrom].filter(Boolean);
    if (cfg.satzart === "aussage" || subjFrage) {
      const erstes = subjFrage ? fw : S.subj;
      if (operator) teile = [erstes, operator, ...mitte, ...rest, ...hinten];
      else teile = [erstes, ...mitte, ...rest, ...hinten];
    } else {
      // Frage: Operator vor das Subjekt
      const vorne = wfrage ? [fw] : [];
      teile = [...vorne, operator, S.subj, ...mitte, ...rest, ...hinten];
    }
    teile = teile.filter(Boolean);

    // ---- Verneinte Frage: Kurzform ist normal (Didn't he go?) ----
    if (cfg.neg && frageMitInversion && operator && NEG_KURZ[operator.text]) {
      operator.text = NEG_KURZ[operator.text];
      operator.info += " + not → краткая форма (в вопросе с отрицанием почти всегда так)";
      teile = teile.filter((x) => x !== notSeg);
    }

    // ---- Satzzeichen, Text ----
    let text = teile.map((s) => s.text).join(" ");
    text = capFirst(text) + (cfg.satzart === "aussage" ? "." : "?");

    // ---- Warnungen (Alarme) ----
    const z = cfg.zeit;
    const T = cfg.tense;
    if (z && z.bezug === "past" && PERFEKT_GEGENWART.has(T)) alarme.push(`⚠ Present Perfect нельзя употреблять с „${z.text}“ (конкретный момент в прошлом)! Правильно — Past Simple: „${capFirst(nomenGruppe(cfg.subj))} ${f.past} … ${z.text}“. В немецком «Ich bin gestern gegangen» — нормально, в английском «I have gone yesterday» — ошибка.`);
    if (z && z.bezug === "past" && ZUKUNFT.has(T)) alarme.push(`⚠ „${z.text}“ — это прошлое, а время будущее (${TENSES[T].en}). Выбери Past Simple.`);
    if (z && z.bezug === "future" && (VERGANGEN.has(T) || PERFEKT_GEGENWART.has(T))) alarme.push(`⚠ „${z.text}“ — это будущее, а выбрано прошедшее время. Выбери will / going to (или Present Progressive для договорённостей).`);
    if (z && z.text.startsWith("since") && !/perf/.test(T)) alarme.push(`⚠ „since …“ (с какого-то момента) требует Perfect: „I have lived here since 2020“, а не „I live here since 2020“ (типичная ошибка немцев и русских!).`);
    if (z && z.text === "now" && T === "pres_simple") hinweise.push(`С „now“ обычно Present Progressive: „He is going home now.“`);
    if (cfg.neg && cfg.freq && cfg.freq.text === "never") alarme.push(`⚠ Двойное отрицание: „never“ уже означает «никогда». По-английски нельзя „not … never“ (как по-русски «никогда не»). Правильно: „He never goes“ или „He does not ever go“.`);
    if (PROG.has(T) && STATIV.has(v.base)) alarme.push(`⚠ „${v.base}“ — глагол состояния (stative verb). Обычно он НЕ стоит в -ing форме: „I ${v.base} …“, а не „I am ${f.ing} …“.`);
    if (PROG.has(T) && cfg.freq && ["always", "usually", "often", "sometimes", "rarely", "never"].includes(cfg.freq.text) && T === "pres_prog") hinweise.push(`„${cfg.freq.text}“ (как часто) — сигнал для Present Simple, а не Progressive.`);
    if (cfg.ort && /^to /.test(cfg.ort.text) && v.ort === "wo") hinweise.push(`„${v.base}“ обычно отвечает на «где?» (at / in), а не «куда?» (to).`);
    if (cfg.ort && cfg.ort.text === "home" && !v.motion) hinweise.push(`„home“ без предлога = «домой» (куда?). Для «дома» (где?) — „at home“.`);
    if (v.obj === "pflicht" && !cfg.obj) hinweise.push(`„${v.base}“ обычно требует дополнения: что? / кого? (${v.base} a book, ${v.base} my son …).`);
    if (cfg.io && !cfg.obj) hinweise.push(`Косвенное дополнение (кому?) обычно идёт вместе с прямым: „give my son a book“.`);
    if (cfg.io && !v.io) hinweise.push(`„${v.base}“ обычно не имеет косвенного дополнения (кому?).`);

    // Kurzform für die gesprochene Sprache (he's, doesn't, I'm …)
    const kurz = kurzform(teile);
    const textKurz = capFirst(kurz) + (cfg.satzart === "aussage" ? "." : "?");

    return {
      text,
      textKurz: textKurz !== text ? textKurz : null,
      segmente: teile,
      tense: T,
      tenseInfo: TENSES[T],
      zeitform: TENSES[T] ? TENSES[T].en : T,
      key,
      formen: f,
      brauchtDo,
      kette,
      hinweise,
      alarme,
    };
  }

  if (typeof window !== "undefined") window.EN_ENGINE = { bauen, kurzform, NEG_KURZ, formen, verbKette, nomenGruppe, subjektKey, TENSES, PRONOMEN, OBJ_PRON, BE, HAVE, DO, PROG, STATIV };
  if (typeof module !== "undefined") module.exports = { bauen, formen, verbKette, nomenGruppe, TENSES, PRONOMEN, OBJ_PRON };
})();
