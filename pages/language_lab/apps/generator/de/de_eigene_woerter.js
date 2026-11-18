// =============================================================
// de_eigene_woerter.js – Satzlabor Deutsch: eigene Wörter eingeben
// für: das Verb (Was tut …?), das Adjektiv, Wann?/Wie oft?, Wie?, Wo?/Wohin?/Woher?
// (die Nomen – Wer?/Wem?/Wen-Was? – macht de_eigene_nomen.js)
// -------------------------------------------------------------
// Version 1 (2026-11-18)
// Ablauf: Wort eingeben → 🔍 prüfen (Wiktionary: Rechtschreibung + Wortart,
// beim Verb auch die Formen) → ✔ übernehmen → steht sofort im Auswahlfeld
// unter „Meine Wörter“ und wird im Browser gespeichert (pro Gerät).
// Für die gemeinsame Datenbank: „📋 für die Datenbank kopieren“ → an Claude.
// =============================================================

(() => {
  "use strict";
  const EW = window.EIGENE_WOERTER;
  if (!EW) return;
  const KEY = "quantura_de_eigene_woerter";
  const arr = (x) => (Array.isArray(x) ? x : []);
  const g = (n) => window[n];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const klein = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  const gross = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const idVon = (s) => "eigen_" + String(s).toLowerCase().replace(/[^a-zäöüß0-9]+/g, "_");

  function daten() {
    const d = EW.laden(KEY);
    ["verben", "adjektive", "zeit", "wie", "orte"].forEach((k) => (d[k] = arr(d[k])));
    return d;
  }
  function sichern(d) { EW.speichern(KEY, d); }

  // ------------------------------------------------------------
  // Verbformen bilden
  // ------------------------------------------------------------
  const UNTRENNBAR = /^(be|ge|er|ver|zer|ent|emp|miss)/;
  function stammVon(inf) {
    if (/[^e]n$/.test(inf) && /(el|er)n$/.test(inf)) return inf.slice(0, -1); // wandern → wander
    return inf.replace(/e?n$/, "");
  }
  const brauchtE = (stamm) => /([td]|ch[mn]|[^aeiouäöülrhmn][mn])$/.test(stamm); // arbeit-et, rechn-et
  function praesensRegel(inf) {
    const st = stammVon(inf);
    const e = brauchtE(st) ? "e" : "";
    const zisch = /(s|ß|z|x)$/.test(st);
    return { ich: /(el|er)n$/.test(inf) ? (inf.endsWith("eln") ? st.slice(0, -2) + "le" : st + "e") : st + "e", du: st + (zisch ? "t" : e + "st"), er: st + e + "t" };
  }
  function praesensVoll(inf, p) {
    const st = stammVon(inf);
    const ihr = p.er && p.er.startsWith(st) ? p.er : st + (brauchtE(st) ? "et" : "t");
    return { ich: p.ich, du: p.du, er: p.er, wir: inf, ihr, sie: inf };
  }
  function praeteritumVoll(ich) {
    const aufE = /e$/.test(ich);
    const td = /[td]$/.test(ich);
    const zisch = /(s|ß|z)$/.test(ich);
    return {
      ich,
      du: ich + (aufE ? "st" : td || zisch ? "est" : "st"),
      er: ich,
      wir: ich + (aufE ? "n" : "en"),
      ihr: ich + (aufE ? "t" : td ? "et" : "t"),
      sie: ich + (aufE ? "n" : "en"),
    };
  }
  function konjugationsArt(inf, prt, part) {
    const st = stammVon(inf);
    if (/en$/.test(part)) return "stark";
    if (prt === st + "te" || prt === st + "ete") return "schwach";
    return "gemischt";
  }
  function regelVerb(inf) {
    const st = stammVon(inf);
    const e = brauchtE(st) ? "e" : "";
    const prt = st + e + "te";
    const ohneGe = UNTRENNBAR.test(inf) || /ieren$/.test(inf);
    return { pr: praesensRegel(inf), prt, part: (ohneGe ? "" : "ge") + st + e + "t" };
  }
  function verbEintrag(inf, pr, prt, part, aux) {
    const v = {
      inf, infinitiv: inf, voll: true, eigen: true,
      presens: praesensVoll(inf, pr),
      praeteritum: praeteritumVoll(prt),
      partizip: part, partizip2: part,
      perfektAux: aux, aux, usesSein: aux === "sein",
      trennbar: false, prefix: "", modal: false, reflexiv: false,
      konjugation: konjugationsArt(inf, prt, part),
    };
    v.praesens = v.presens;
    const m = inf.match(UNTRENNBAR);
    if (m && !part.startsWith("ge")) v.untrennbar = m[1];
    v.vokalwechsel = !!pr.du && !pr.du.startsWith(stammVon(inf));
    return v;
  }

  // ------------------------------------------------------------
  // Prüfen (Wiktionary)
  // ------------------------------------------------------------
  async function wikiDe(titel) {
    const s = await EW.seiten([...new Set(titel)]);
    const aus = {};
    Object.entries(s).forEach(([t, text]) => { const sec = EW.sektion(text, "Deutsch"); if (sec) aus[t] = sec; });
    return aus;
  }
  const lokaleWoerter = () => arr(g("DE_VERBS_MAIN")).map((v) => v.inf).concat(arr(g("DE_ADJECTIVES")).map((a) => a.base), arr(g("DE_ADVERBS")).map((a) => a.base));

  async function pruefeVerb(text) {
    let inf = klein(text.trim());
    if (/^sich\s/.test(inf)) return { fehler: "Reflexive Verben (sich freuen, sich waschen) kann das Satzlabor noch nicht – kommt später." };
    if (/\s/.test(inf)) return { fehler: "Bitte nur ein Verb im Infinitiv eingeben (z. B. arbeiten, schwimmen)." };
    if (!/n$/.test(inf)) return { fehler: "Bitte den Infinitiv eingeben – er endet auf -en oder -n (z. B. arbeiten, wandern)." };
    const schon = arr(g("DE_VERBS_MAIN")).find((v) => v.inf === inf);
    if (schon) return { fehler: `„${inf}“ steht schon in der Liste – bitte dort auswählen.` };
    let sec = null, offline = false;
    try { sec = (await wikiDe([inf]))[inf] || null; } catch (e) { offline = true; }
    const html = [];
    let pr, prt, part, aux = null, geprueft = false;
    if (sec) {
      const wa = EW.wortarten(sec);
      if (!wa.includes("Verb")) return { fehler: `„${inf}“ steht im Wörterbuch, ist aber kein Verb (die Wortart: ${wa.join(", ") || "?"}).` };
      const er = EW.feld(sec, "Präsens_er, sie, es");
      if (/\s/.test(er)) return { fehler: `„${inf}“ ist ein trennbares Verb (er ${er}). Trennbare Verben kann das Satzlabor noch nicht – kommt später.` };
      pr = { ich: EW.feld(sec, "Präsens_ich"), du: EW.feld(sec, "Präsens_du"), er };
      prt = EW.feld(sec, "Präteritum_ich");
      part = EW.feld(sec, "Partizip II");
      const h = (EW.feld(sec, "Hilfsverb") || "").toLowerCase();
      aux = h.includes("sein") && !h.includes("haben") ? "sein" : h.includes("haben") ? "haben" : null;
      geprueft = !!(pr.ich && pr.du && pr.er && prt && part);
      if (!geprueft) html.push(`<div class="ew-warn">⚠ Nicht alle Formen im Wörterbuch gefunden – fehlende nach der Regel (schwaches Verb) gebildet. Bitte prüfen!</div>`);
    }
    const r = regelVerb(inf);
    pr = pr || {};
    pr = { ich: pr.ich || r.pr.ich, du: pr.du || r.pr.du, er: pr.er || r.pr.er };
    prt = prt || r.prt;
    part = part || r.part;
    const v = verbEintrag(inf, pr, prt, part, aux || "haben");
    const KA = { stark: "das starke Verb", schwach: "das schwache Verb", gemischt: "das gemischte Verb" };
    html.push(`<div class="ew-formen"><b>${esc(inf)} – ${esc(prt)} – ${esc(part)}</b> (${KA[v.konjugation]})<br>` +
      `Präsens: ich ${esc(pr.ich)}, du ${esc(pr.du)}, er ${esc(pr.er)}, wir ${esc(v.presens.wir)}, ihr ${esc(v.presens.ihr)}<br>` +
      `Präteritum: ich ${esc(prt)}, du ${esc(v.praeteritum.du)}, wir ${esc(v.praeteritum.wir)}</div>`);
    html.push(`<div class="ew-klein">Das Perfekt mit <b>haben</b> oder <b>sein</b>? ${aux ? "(laut Wörterbuch: " + aux + ")" : "Bitte wählen: Bewegung / Zustandsänderung → sein, sonst haben."}</div>`);
    const vor = sec || offline ? [] : await EW.vorschlaege(inf, lokaleWoerter());
    return { text: inf, geprueft: !!sec && geprueft, offline, eintrag: v, html: html.join(""), vorschlaege: vor, wahlVorschlag: aux };
  }

  async function pruefeEinzelwort(text, wortartTest, wortartName, schonListe) {
    const w = klein(text.trim());
    if (/\s/.test(w)) return { fehler: "Bitte nur ein Wort eingeben." };
    if (schonListe.includes(w)) return { fehler: `„${w}“ steht schon in der Liste – bitte dort auswählen.` };
    let sec = null, offline = false;
    try { sec = (await wikiDe([w]))[w] || null; } catch (e) { offline = true; }
    if (sec) {
      const wa = EW.wortarten(sec);
      if (!wa.some(wortartTest)) return { fehler: `„${w}“ steht im Wörterbuch, ist aber kein ${wortartName} (die Wortart: ${wa.join(", ") || "?"}).` };
      return { text: w, geprueft: true, eintrag: { base: w } };
    }
    const vor = offline ? [] : await EW.vorschlaege(w, lokaleWoerter());
    return { text: w, geprueft: false, offline, eintrag: { base: w }, vorschlaege: vor };
  }

  // Wortgruppe (am Morgen, in den Garten): jedes Wort muss im Wörterbuch stehen
  async function pruefeGruppe(text, einzelTest) {
    const t = text.trim().replace(/\s+/g, " ").replace(/[.,!?;:]+$/, "");
    const woerter = t.split(" ");
    if (woerter.length === 1) {
      const w = klein(t);
      let sec = null, offline = false;
      try { const s = await wikiDe([w, gross(w)]); sec = s[w] || s[gross(w)] || null; } catch (e) { offline = true; }
      if (sec) {
        const wa = EW.wortarten(sec);
        if (einzelTest && !wa.some(einzelTest)) return { fehler: `„${w}“ passt hier nicht (die Wortart: ${wa.join(", ") || "?"}). Hier ein Adverb oder eine Wortgruppe eingeben (z. B. „am Morgen“).` };
        return { text: w, geprueft: true, eintrag: { text: w } };
      }
      const vor = offline ? [] : await EW.vorschlaege(w, lokaleWoerter());
      return { text: w, geprueft: false, offline, eintrag: { text: w }, vorschlaege: vor };
    }
    const titel = [];
    woerter.forEach((w) => { titel.push(w, klein(w), gross(w)); });
    let s = {}, offline = false;
    try { s = await wikiDe(titel); } catch (e) { offline = true; }
    // großgeschriebene Wörter, die nicht gefunden werden, gelten als Name (Willich, Berlin)
    const fehlt = woerter.filter((w, i) => !(s[w] || s[klein(w)] || s[gross(w)]) && !(i > 0 && /^[A-ZÄÖÜ]/.test(w)));
    const html = fehlt.length && !offline ? `<div class="ew-rot">Nicht gefunden: ${fehlt.map(esc).join(", ")}</div>` : "";
    return { text: t, geprueft: !offline && !fehlt.length, offline, nichtGefunden: fehlt.length ? undefined : false, eintrag: { text: t }, html };
  }

  // ------------------------------------------------------------
  // In die Listen übernehmen (beim Laden und nach „übernehmen“)
  // ------------------------------------------------------------
  function verbInListe(v) {
    const L = g("DE_VERBS_MAIN");
    if (!Array.isArray(L)) return -1;
    let i = L.findIndex((x) => x.inf === v.inf);
    if (i < 0) { L.push(v); i = L.length - 1; }
    if (g("DE_VERBS")) g("DE_VERBS")[v.inf] = L[i];
    return i;
  }
  function adjInListe(base) {
    const L = g("DE_ADJECTIVES");
    if (Array.isArray(L) && !L.some((a) => a.base === base)) L.push({ id: idVon(base), base, eigen: true });
  }
  function advInListe(base, group) {
    const L = g("DE_ADVERBS");
    const id = idVon(group + "_" + base);
    if (Array.isArray(L) && !L.some((a) => a.id === id)) L.push({ id, base, group, eigen: true });
    return id;
  }
  function ortInListe(phrase, question) {
    const L = g("DE_PREP_PATTERNS");
    const id = idVon("ort_" + question + "_" + phrase);
    if (Array.isArray(L) && !L.some((p) => p.id === id)) L.push({ id, phrase, question, case: "", eigen: true });
    return id;
  }
  const d0 = daten();
  d0.verben.forEach(verbInListe);
  d0.adjektive.forEach((a) => adjInListe(a.base));
  d0.zeit.forEach((z) => advInListe(z.base, z.group));
  d0.wie.forEach((z) => advInListe(z.base, "manner"));
  d0.orte.forEach((o) => ortInListe(o.phrase, o.question));

  // ------------------------------------------------------------
  // Oberfläche (nach dem Aufbau der Auswahlfelder durch de_script.js)
  // ------------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const ADJ_SELS = ["sgSubjAdj", "sgDatAdj", "sgAkkAdj"];

  function kopierText() {
    const d = daten();
    const teile = [];
    const q = (x) => (x.ungeprueft ? " (?)" : "");
    if (d.verben.length) teile.push("Verben: " + d.verben.map((v) => `${v.inf} – ${v.praeteritum.ich} – ${v.partizip} (${v.perfektAux})${q(v)}`).join(", "));
    if (d.adjektive.length) teile.push("Adjektive: " + d.adjektive.map((a) => a.base + q(a)).join(", "));
    if (d.zeit.length) teile.push("Wann?/Wie oft?: " + d.zeit.map((a) => `${a.base} (${a.group === "frequency" ? "Wie oft?" : "Wann?"})${q(a)}`).join(", "));
    if (d.wie.length) teile.push("Wie?: " + d.wie.map((a) => a.base + q(a)).join(", "));
    if (d.orte.length) teile.push("Ort: " + d.orte.map((o) => `${o.phrase} (${o.question})${q(o)}`).join(", "));
    return "в базу (Satzlabor Deutsch): " + (teile.join("; ") || "–");
  }
  // Chips „Meine Wörter“ (alle Arten zusammen, damit man den Überblick hat)
  function meineListe() {
    const d = daten();
    const l = [];
    const loesche = (art, pred, sels, wert) => () => {
      const dd = daten();
      dd[art] = dd[art].filter((x) => !pred(x));
      sichern(dd);
      sels.forEach((id) => $(id) && EW.ausGruppe($(id), wert));
    };
    d.verben.forEach((v) => {
      const i = arr(g("DE_VERBS_MAIN")).findIndex((x) => x.inf === v.inf);
      l.push({ label: v.inf, q: v.ungeprueft, del: loesche("verben", (x) => x.inf === v.inf, ["sgVerb"], String(i)) });
    });
    d.adjektive.forEach((a) => l.push({ label: a.base, q: a.ungeprueft, del: loesche("adjektive", (x) => x.base === a.base, ADJ_SELS, a.base) }));
    d.zeit.forEach((a) => l.push({ label: a.base, q: a.ungeprueft, del: loesche("zeit", (x) => x.base === a.base && x.group === a.group, ["sgZeit"], idVon(a.group + "_" + a.base)) }));
    d.wie.forEach((a) => l.push({ label: a.base, q: a.ungeprueft, del: loesche("wie", (x) => x.base === a.base, ["sgWie"], idVon("manner_" + a.base)) }));
    d.orte.forEach((o) => l.push({ label: o.phrase, q: o.ungeprueft, del: loesche("orte", (x) => x.phrase === o.phrase && x.question === o.question, ["sgOrt"], "p:" + idVon("ort_" + o.question + "_" + o.phrase)) }));
    return l;
  }

  const TEXT = "✏️ eigenes Wort eingeben …";
  function aufbauen() {
    const verbs = arr(g("DE_VERBS_MAIN"));
    const adjs = arr(g("DE_ADJECTIVES"));
    const advs = arr(g("DE_ADVERBS"));
    const pats = arr(g("DE_PREP_PATTERNS"));

    // --- das Verb ---
    const sVerb = $("sgVerb");
    if (sVerb) {
      EW.vorbereiten(sVerb, "✏️ eigenes Verb eingeben … (Formen werden gesucht)", (o) => !!(verbs[Number(o.value)] && verbs[Number(o.value)].eigen && o.value !== ""));
      verbs.forEach((v, i) => { if (v.eigen) EW.inGruppe(sVerb, String(i), v.inf); });
      EW.box({
        sel: sVerb, titel: "Eigenes Verb (das Verb im Infinitiv, z. B. arbeiten, schwimmen)", placeholder: "z. B. schwimmen",
        hinweis: "Verb im Infinitiv eingeben – die Formen (Präsens, Präteritum, Partizip II) werden im Wörterbuch gesucht.",
        wahl: [{ key: "haben", label: "Perfekt mit haben" }, { key: "sein", label: "Perfekt mit sein" }], wahlText: "das Hilfsverb:",
        pruefen: (t) => pruefeVerb(t),
        onFertig: (v, ungeprueft, aux) => {
          v.perfektAux = v.aux = aux; v.usesSein = aux === "sein";
          if (ungeprueft) v.ungeprueft = true;
          const d = daten(); d.verben = d.verben.filter((x) => x.inf !== v.inf).concat([v]); sichern(d);
          const i = verbInListe(v);
          EW.inGruppe(sVerb, String(i), v.inf);
          sVerb.value = String(i);
          sVerb.dispatchEvent(new Event("change"));
        },
        meine: meineListe, kopierText,
      });
    }

    // --- das Adjektiv (3 Felder: Wer? / Wem? / Wen-Was?) ---
    ADJ_SELS.forEach((id) => {
      const sel = $(id);
      if (!sel) return;
      EW.vorbereiten(sel, "✏️ eigenes Adjektiv …", (o) => !!adjs.find((a) => a.base === o.value && a.eigen));
      adjs.forEach((a) => { if (a.eigen) EW.inGruppe(sel, a.base, a.base); });
      EW.box({
        sel, titel: "Eigenes Adjektiv (die Grundform, z. B. warm, freundlich)", placeholder: "z. B. freundlich",
        hinweis: "Adjektiv in der Grundform eingeben (ohne Endung): warm, nicht warme.",
        pruefen: (t) => pruefeEinzelwort(t, (w) => /adjektiv|partizip/i.test(w), "Adjektiv", adjs.map((a) => a.base)),
        onFertig: (e, ungeprueft) => {
          const d = daten(); d.adjektive = d.adjektive.filter((x) => x.base !== e.base).concat([{ base: e.base, ungeprueft: ungeprueft || undefined }]); sichern(d);
          adjInListe(e.base);
          ADJ_SELS.forEach((x) => $(x) && EW.inGruppe($(x), e.base, e.base));
          sel.value = e.base;
          sel.dispatchEvent(new Event("change"));
        },
        meine: meineListe, kopierText,
      });
    });

    // --- Wann? / Wie oft? ---
    const sZeit = $("sgZeit");
    if (sZeit) {
      EW.vorbereiten(sZeit, TEXT + " (z. B. morgens, am Montag)", (o) => !!advs.find((a) => a.id === o.value && a.eigen));
      advs.forEach((a) => { if (a.eigen && (a.group === "time" || a.group === "frequency")) EW.inGruppe(sZeit, a.id, `${a.base} (${a.group === "time" ? "Wann?" : "Wie oft?"})`); });
      EW.box({
        sel: sZeit, titel: "Eigene Zeitangabe (Wann? / Wie oft?)", placeholder: "z. B. morgens, am Montag, jeden Tag",
        hinweis: "Ein Adverb (morgens) oder eine Wortgruppe (am Montag, jeden Tag).",
        wahl: [{ key: "time", label: "Wann?" }, { key: "frequency", label: "Wie oft?" }], wahlText: "die Frage:",
        pruefen: (t) => pruefeGruppe(t, (w) => /adverb|adjektiv/i.test(w)),
        onFertig: (e, ungeprueft, grp) => {
          const d = daten(); d.zeit = d.zeit.filter((x) => !(x.base === e.text && x.group === grp)).concat([{ base: e.text, group: grp, ungeprueft: ungeprueft || undefined }]); sichern(d);
          const id = advInListe(e.text, grp);
          EW.inGruppe(sZeit, id, `${e.text} (${grp === "time" ? "Wann?" : "Wie oft?"})`);
          sZeit.value = id;
          sZeit.dispatchEvent(new Event("change"));
        },
        meine: meineListe, kopierText,
      });
    }

    // --- Wie? ---
    const sWie = $("sgWie");
    if (sWie) {
      EW.vorbereiten(sWie, TEXT + " (z. B. gemeinsam, mit dem Auto)", (o) => !!advs.find((a) => a.id === o.value && a.eigen));
      advs.forEach((a) => { if (a.eigen && a.group === "manner") EW.inGruppe(sWie, a.id, a.base); });
      EW.box({
        sel: sWie, titel: "Eigene Angabe: Wie? (die Art und Weise)", placeholder: "z. B. gemeinsam, mit dem Auto",
        hinweis: "Ein Adverb (gemeinsam) oder eine Wortgruppe (mit dem Auto, zu Fuß).",
        pruefen: (t) => pruefeGruppe(t, (w) => /adverb|adjektiv/i.test(w)),
        onFertig: (e, ungeprueft) => {
          const d = daten(); d.wie = d.wie.filter((x) => x.base !== e.text).concat([{ base: e.text, ungeprueft: ungeprueft || undefined }]); sichern(d);
          const id = advInListe(e.text, "manner");
          EW.inGruppe(sWie, id, e.text);
          sWie.value = id;
          sWie.dispatchEvent(new Event("change"));
        },
        meine: meineListe, kopierText,
      });
    }

    // --- Wo? / Wohin? / Woher? ---
    const sOrt = $("sgOrt");
    if (sOrt) {
      EW.vorbereiten(sOrt, TEXT + " (z. B. in den Garten, in Krefeld)", (o) => o.value.startsWith("p:") && !!pats.find((p) => "p:" + p.id === o.value && p.eigen));
      pats.forEach((p) => { if (p.eigen) EW.inGruppe(sOrt, "p:" + p.id, `${p.phrase}  (${p.question})`); });
      EW.box({
        sel: sOrt, titel: "Eigene Ortsangabe (Wo? / Wohin? / Woher?)", placeholder: "z. B. in den Garten, nach Krefeld",
        hinweis: "Eine Wortgruppe mit Präposition (in den Garten, im Garten, aus Krefeld) oder ein Adverb (draußen). Achtung: Wohin? → Akkusativ (in den Garten), Wo? → Dativ (im Garten).",
        wahl: [{ key: "Wo?", label: "Wo?" }, { key: "Wohin?", label: "Wohin?" }, { key: "Woher?", label: "Woher?" }], wahlText: "die Frage:",
        pruefen: async (t) => {
          const r = await pruefeGruppe(t, null);
          if (r.text && !r.fehler) {
            const w = r.text.split(" ")[0].toLowerCase();
            r.wahlVorschlag = /^(nach|zu|zum|zur|ins)$/.test(w) ? "Wohin?" : /^(aus|von|vom)$/.test(w) ? "Woher?" : /^(im|am|bei|beim)$/.test(w) ? "Wo?" : null;
          }
          return r;
        },
        onFertig: (e, ungeprueft, frage) => {
          const d = daten(); d.orte = d.orte.filter((x) => !(x.phrase === e.text && x.question === frage)).concat([{ phrase: e.text, question: frage, ungeprueft: ungeprueft || undefined }]); sichern(d);
          const id = ortInListe(e.text, frage);
          EW.inGruppe(sOrt, "p:" + id, `${e.text}  (${frage})`);
          sOrt.value = "p:" + id;
          sOrt.dispatchEvent(new Event("change"));
        },
        meine: meineListe, kopierText,
      });
    }

    const clr = $("deClearBtn");
    if (clr) clr.addEventListener("click", () => document.querySelectorAll(".ew-box").forEach((b) => (b.hidden = true)));
  }

  // nach de_script.js (dessen init läuft ebenfalls bei DOMContentLoaded, vorher registriert)
  document.addEventListener("DOMContentLoaded", () => setTimeout(aufbauen, 0));

  window.DE_EIGENE_WOERTER = { daten, pruefeVerb, verbEintrag, regelVerb, praeteritumVoll, praesensVoll };
})();
