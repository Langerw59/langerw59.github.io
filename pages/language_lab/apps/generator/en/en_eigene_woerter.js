// =============================================================
// en_eigene_woerter.js – Satzlabor English: eigene Wörter eingeben
// für alle Felder: who?/what? (Nomen), the verb, adjective, how?, where?, when?, how often?
// -------------------------------------------------------------
// Version 1 (2026-11-18) · Prüfung mit de.wiktionary.org (englische Wörter
// mit deutscher Bedeutung): Rechtschreibung, Wortart, unregelmäßige Formen.
// Gespeichert im Browser (pro Gerät) → „📋 für die Datenbank kopieren“ → an Claude.
// =============================================================

(() => {
  "use strict";
  const EW = window.EIGENE_WOERTER;
  if (!EW) return;
  const KEY = "quantura_en_eigene_woerter";
  const arr = (x) => (Array.isArray(x) ? x : []);
  const g = (n) => window[n];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const LISTEN = { nouns: "EN_SL_NOUNS", verbs: "EN_SL_VERBS", adjectives: "EN_SL_ADJECTIVES", manner: "EN_SL_MANNER", place: "EN_SL_PLACE", time: "EN_SL_TIME", freq: "EN_SL_FREQ" };

  function daten() {
    const d = EW.laden(KEY);
    Object.keys(LISTEN).forEach((k) => (d[k] = arr(d[k])));
    return d;
  }
  function sichern(d) { EW.speichern(KEY, d); }

  // ------------------------------------------------------------
  // Wiktionary: englischer Abschnitt
  // ------------------------------------------------------------
  async function wikiEn(titel) {
    const s = await EW.seiten([...new Set(titel)]);
    const aus = {};
    Object.entries(s).forEach(([t, text]) => { const sec = EW.sektion(text, "Englisch"); if (sec) aus[t] = sec; });
    return aus;
  }
  const lokal = () => arr(g("EN_SL_NOUNS")).map((n) => n.sg).concat(arr(g("EN_SL_VERBS")).map((v) => v.base), arr(g("EN_SL_ADJECTIVES")));

  function pluralRegel(sg) {
    if (/(s|x|z|ch|sh)$/.test(sg)) return sg + "es";
    if (/[^aeiou]y$/.test(sg)) return sg.slice(0, -1) + "ies";
    return sg + "s";
  }

  async function pruefeEinzel(text, test, name, schon) {
    const w = text.trim().toLowerCase();
    if (/\s/.test(w)) return { fehler: "Please enter one word only. / Bitte nur ein Wort." };
    if (schon.includes(w)) return { fehler: `„${w}“ is already in the list. / steht schon in der Liste.` };
    let sec = null, offline = false;
    try { sec = (await wikiEn([w]))[w] || null; } catch (e) { offline = true; }
    if (sec) {
      const wa = EW.wortarten(sec);
      if (!wa.some(test)) return { fehler: `„${w}“ ist kein ${name} (die Wortart: ${wa.join(", ") || "?"}).` };
      return { text: w, geprueft: true, sec, wa };
    }
    const vor = offline ? [] : await EW.vorschlaege(w, lokal());
    return { text: w, geprueft: false, offline, vorschlaege: vor };
  }

  async function pruefeNomen(text) {
    const w = text.trim().toLowerCase().replace(/^(the|a|an)\s+/, "");
    const r = await pruefeEinzel(w, (x) => x === "Substantiv", "Nomen (noun)", arr(g("EN_SL_NOUNS")).map((n) => n.sg));
    if (r.fehler) return r;
    const pl = (r.sec && EW.feld(r.sec, "Plural")) || pluralRegel(r.text);
    const de = r.sec ? EW.bedeutung(r.sec) : "";
    r.eintrag = { sg: r.text, pl, ru: de, de };
    r.html = `<div class="ew-formen"><b>${esc(r.text)}</b> – Plural: <b>${esc(pl)}</b>${de ? `<br>deutsch: ${esc(de)}` : ""}</div><div class="ew-klein">Person (who?) oder Ding (what?) – bitte wählen.</div>`;
    return r;
  }
  async function pruefeVerb(text) {
    const w = text.trim().toLowerCase().replace(/^to\s+/, "");
    const r = await pruefeEinzel(w, (x) => x === "Verb", "Verb", arr(g("EN_SL_VERBS")).map((v) => v.base));
    if (r.fehler) return r;
    const v = { base: r.text, obj: "optional", eigen: true };
    if (r.sec) {
      const past = EW.feld(r.sec, "past_simple_I") || EW.feld(r.sec, "Präteritum");
      const pp = EW.feld(r.sec, "past participle") || EW.feld(r.sec, "Partizip II");
      v.de = v.ru = EW.bedeutung(r.sec);
      const E = g("EN_ENGINE");
      const reg = E ? E.formen({ base: v.base }) : null;
      if (past && reg && past.split(/[,/ ]/)[0] !== reg.past) v.past = past.split(/[,/]/)[0].trim();
      if (pp && reg && pp.split(/[,/ ]/)[0] !== reg.pp) v.pp = pp.split(/[,/]/)[0].trim();
    }
    const f = g("EN_ENGINE") ? g("EN_ENGINE").formen(v) : { base: v.base, past: v.past || "?", pp: v.pp || "?" };
    r.eintrag = v;
    r.html = `<div class="ew-formen"><b>${esc(f.base)} – ${esc(f.past)} – ${esc(f.pp)}</b> · ${v.past || v.pp ? "irregular (unregelmäßig)" : "regular (regelmäßig: -ed)"}${v.de ? `<br>deutsch: ${esc(v.de)}` : ""}</div>`;
    return r;
  }
  async function pruefeAdj(text) {
    const r = await pruefeEinzel(text, (x) => x === "Adjektiv", "Adjektiv (adjective)", arr(g("EN_SL_ADJECTIVES")));
    if (r.fehler) return r;
    r.eintrag = { text: r.text };
    if (r.sec) { const de = EW.bedeutung(r.sec); if (de) r.html = `<div class="ew-klein">deutsch: ${esc(de)}</div>`; }
    return r;
  }
  // Wortgruppe: at the station, every Sunday, by train
  async function pruefeGruppe(text, liste) {
    const t = text.trim().replace(/\s+/g, " ").replace(/[.,!?;:]+$/, "");
    if (arr(g(LISTEN[liste])).some((x) => x.text === t)) return { fehler: `„${t}“ is already in the list. / steht schon in der Liste.` };
    const woerter = t.split(" ");
    const titel = [];
    woerter.forEach((w) => titel.push(w, w.toLowerCase()));
    let s = {}, offline = false;
    try { s = await wikiEn(titel); } catch (e) { offline = true; }
    // Namen (großgeschrieben, z. B. Willich, Monday) dürfen fehlen
    const fehlt = woerter.filter((w) => !(s[w] || s[w.toLowerCase()]) && !/^[A-Z]/.test(w) && !/^\d+$/.test(w));
    let html = fehlt.length && !offline ? `<div class="ew-rot">Nicht gefunden: ${fehlt.map(esc).join(", ")}</div>` : "";
    let vor = [];
    if (woerter.length === 1 && fehlt.length && !offline) vor = await EW.vorschlaege(t.toLowerCase(), []);
    if (woerter.length === 1 && s[t.toLowerCase()]) { const de = EW.bedeutung(s[t.toLowerCase()]); if (de) html += `<div class="ew-klein">deutsch: ${esc(de)}</div>`; }
    return { text: t, geprueft: !offline && !fehlt.length, offline, nichtGefunden: fehlt.length ? undefined : false, eintrag: { text: t }, html, vorschlaege: vor };
  }

  // ------------------------------------------------------------
  // In die Listen (beim Laden + nach „übernehmen“)
  // ------------------------------------------------------------
  function inListe(art, e) {
    const L = g(LISTEN[art]);
    if (!Array.isArray(L)) return -1;
    if (art === "adjectives") { if (!L.includes(e.text)) L.push(e.text); return L.indexOf(e.text); }
    const k = art === "nouns" ? "sg" : art === "verbs" ? "base" : "text";
    let i = L.findIndex((x) => x[k] === e[k]);
    if (i < 0) { L.push(Object.assign({ eigen: true }, e)); i = L.length - 1; }
    return i;
  }
  const d0 = daten();
  Object.keys(LISTEN).forEach((art) => d0[art].forEach((e) => inListe(art, e)));
  const eigeneAdj = () => daten().adjectives.map((a) => a.text);

  // ------------------------------------------------------------
  // Oberfläche
  // ------------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const NP = ["enSubj", "enIo", "enObj"];
  const ADJ = ["enSubjAdj", "enIoAdj", "enObjAdj"];
  const nounLabel = (n) => `${n.sg}${n.de ? " — " + n.de : ""} (${n.person ? "who?" : "what?"})`;
  const verbLabel = (v) => { const f = g("EN_ENGINE").formen(v); return `${f.base} – ${f.past} – ${f.pp}${v.de ? "  (" + v.de + ")" : ""}`; };
  const listLabel = (x) => `${x.text}${x.de ? " — " + x.de : ""}${x.frage ? "  (" + x.frage + ")" : ""}`;

  function kopierText() {
    const d = daten();
    const q = (x) => (x.ungeprueft ? " (?)" : "");
    const t = [];
    if (d.nouns.length) t.push("Nouns: " + d.nouns.map((n) => `${n.sg}/${n.pl} (${n.person ? "Person" : "Ding"})${q(n)}`).join(", "));
    if (d.verbs.length) t.push("Verbs: " + d.verbs.map((v) => `${verbLabel(v)}${q(v)}`).join(", "));
    if (d.adjectives.length) t.push("Adjectives: " + d.adjectives.map((a) => a.text + q(a)).join(", "));
    if (d.manner.length) t.push("How?: " + d.manner.map((a) => a.text + q(a)).join(", "));
    if (d.place.length) t.push("Where?: " + d.place.map((a) => `${a.text} (${a.frage})${q(a)}`).join(", "));
    if (d.time.length) t.push("When?: " + d.time.map((a) => a.text + q(a)).join(", "));
    if (d.freq.length) t.push("How often?: " + d.freq.map((a) => a.text + q(a)).join(", "));
    return "в базу (Satzlabor English): " + (t.join("; ") || "–");
  }
  function meineListe() {
    const d = daten();
    const l = [];
    const del = (art, pred, sels, wert) => () => {
      const dd = daten(); dd[art] = dd[art].filter((x) => !pred(x)); sichern(dd);
      sels.forEach((id) => $(id) && EW.ausGruppe($(id), wert));
    };
    d.nouns.forEach((n) => { const i = inListe("nouns", n); l.push({ label: n.sg, q: n.ungeprueft, del: del("nouns", (x) => x.sg === n.sg, NP, "n:" + i) }); });
    d.verbs.forEach((v) => { const i = inListe("verbs", v); l.push({ label: v.base, q: v.ungeprueft, del: del("verbs", (x) => x.base === v.base, ["enVerb"], String(i)) }); });
    d.adjectives.forEach((a) => l.push({ label: a.text, q: a.ungeprueft, del: del("adjectives", (x) => x.text === a.text, ADJ, a.text) }));
    [["manner", "enArt"], ["place", "enOrt"], ["time", "enZeit"], ["freq", "enFreq"]].forEach(([art, sel]) => {
      d[art].forEach((x) => { const i = inListe(art, x); l.push({ label: x.text, q: x.ungeprueft, del: del(art, (y) => y.text === x.text, [sel], String(i)) }); });
    });
    return l;
  }
  function speichereNeu(art, e, key) {
    const d = daten();
    d[art] = d[art].filter((x) => x[key] !== e[key]).concat([e]);
    sichern(d);
  }
  const waehle = (sel, value) => { sel.value = value; sel.dispatchEvent(new Event("change")); };

  function aufbauen() {
    const nouns = arr(g("EN_SL_NOUNS"));
    // --- Nomen: who? / what? (3 Felder) ---
    NP.forEach((id) => {
      const sel = $(id);
      if (!sel) return;
      EW.vorbereiten(sel, "✏️ eigenes Wort (noun) eingeben …", (o) => o.value.startsWith("n:") && !!(nouns[Number(o.value.slice(2))] || {}).eigen);
      nouns.forEach((n, i) => { if (n.eigen) EW.inGruppe(sel, "n:" + i, nounLabel(n)); });
      EW.box({
        sel, lang: "en", titel: "Own noun / eigenes Nomen (singular, z. B. garden, neighbour)", placeholder: "e.g. garden",
        hinweis: "Enter an English noun in the singular – spelling and plural are checked (Wiktionary).",
        wahl: [{ key: "person", label: "👤 Person (who?)" }, { key: "ding", label: "📦 Ding (what?)" }], wahlText: "",
        pruefen: pruefeNomen,
        onFertig: (e, ungeprueft, w) => {
          const n = Object.assign({}, e, { person: w === "person", ungeprueft: ungeprueft || undefined });
          speichereNeu("nouns", n, "sg");
          const i = inListe("nouns", n);
          nouns[i].person = n.person;
          NP.forEach((x) => $(x) && EW.inGruppe($(x), "n:" + i, nounLabel(n)));
          waehle(sel, "n:" + i);
        },
        meine: meineListe, kopierText,
      });
    });

    // --- the verb ---
    const sv = $("enVerb");
    const verbs = arr(g("EN_SL_VERBS"));
    if (sv) {
      EW.vorbereiten(sv, "✏️ eigenes Verb eingeben … (forms are checked)", (o) => o.value !== "" && !!(verbs[Number(o.value)] || {}).eigen);
      verbs.forEach((v, i) => { if (v.eigen) EW.inGruppe(sv, String(i), verbLabel(v)); });
      EW.box({
        sel: sv, lang: "en", titel: "Own verb / eigenes Verb (base form, z. B. swim, repair)", placeholder: "e.g. swim",
        hinweis: "Enter the base form (without to). Irregular forms (swim – swam – swum) are looked up.",
        pruefen: pruefeVerb,
        onFertig: (v, ungeprueft) => {
          if (ungeprueft) v.ungeprueft = true;
          speichereNeu("verbs", v, "base");
          const i = inListe("verbs", v);
          EW.inGruppe(sv, String(i), verbLabel(v));
          waehle(sv, String(i));
        },
        meine: meineListe, kopierText,
      });
    }

    // --- adjective (3 Felder) ---
    const adjs = arr(g("EN_SL_ADJECTIVES"));
    ADJ.forEach((id) => {
      const sel = $(id);
      if (!sel) return;
      EW.vorbereiten(sel, "✏️ eigenes Adjektiv …", (o) => eigeneAdj().includes(o.value));
      eigeneAdj().forEach((a) => EW.inGruppe(sel, a, a));
      EW.box({
        sel, lang: "en", titel: "Own adjective / eigenes Adjektiv (z. B. friendly, warm)", placeholder: "e.g. friendly",
        pruefen: (t) => pruefeAdj(t),
        onFertig: (e, ungeprueft) => {
          speichereNeu("adjectives", { text: e.text, ungeprueft: ungeprueft || undefined }, "text");
          inListe("adjectives", e);
          ADJ.forEach((x) => $(x) && EW.inGruppe($(x), e.text, e.text));
          waehle(sel, e.text);
        },
        meine: meineListe, kopierText,
      });
    });
    void adjs;

    // --- How? / Where? / When? / How often? ---
    const LISTEN_UI = [
      { art: "manner", sel: "enArt", titel: "Own: How? / Wie? (z. B. by train, happily)", ph: "e.g. by train" },
      { art: "place", sel: "enOrt", titel: "Own: Where? / Wo? Wohin? (z. B. at the station, to the park)", ph: "e.g. to the park",
        wahl: [{ key: "Where?", label: "Where? (wo?)" }, { key: "Where to?", label: "Where to? (wohin?)" }, { key: "Where from?", label: "Where from? (woher?)" }] },
      { art: "time", sel: "enZeit", titel: "Own: When? / Wann? (z. B. every Sunday, in the afternoon)", ph: "e.g. every Sunday",
        wahl: [{ key: "any", label: "any time" }, { key: "past", label: "past (yesterday …)" }, { key: "future", label: "future (tomorrow …)" }, { key: "present", label: "now" }] },
      { art: "freq", sel: "enFreq", titel: "Own: How often? / Wie oft? (z. B. hardly ever, once a week)", ph: "e.g. once a week" },
    ];
    LISTEN_UI.forEach((c) => {
      const sel = $(c.sel);
      const L = arr(g(LISTEN[c.art]));
      if (!sel) return;
      EW.vorbereiten(sel, "✏️ eigenes Wort / eigene Wortgruppe …", (o) => o.value !== "" && !!(L[Number(o.value)] || {}).eigen);
      L.forEach((x, i) => { if (x.eigen) EW.inGruppe(sel, String(i), listLabel(x)); });
      EW.box({
        sel, lang: "en", titel: c.titel, placeholder: c.ph, wahl: c.wahl, wahlText: c.wahl ? "the question / die Frage:" : "",
        hinweis: "One word or a word group – each word is checked in the dictionary.",
        pruefen: async (t) => {
          const r = await pruefeGruppe(t, c.art);
          if (c.art === "place" && r.text) {
            const w = r.text.split(" ")[0].toLowerCase();
            r.wahlVorschlag = /^(to|into|home)$/.test(w) ? "Where to?" : w === "from" ? "Where from?" : /^(at|in|on|here|there)$/.test(w) ? "Where?" : null;
          }
          if (c.art === "time" && r.text) r.wahlVorschlag = /^(last|yesterday|ago)|ago$/.test(r.text) ? "past" : /^(next|tomorrow|soon)/.test(r.text) ? "future" : "any";
          return r;
        },
        onFertig: (e, ungeprueft, w) => {
          const x = { text: e.text, ru: "", ungeprueft: ungeprueft || undefined };
          if (c.art === "place") x.frage = w;
          if (c.art === "time") x.bezug = w;
          speichereNeu(c.art, x, "text");
          const i = inListe(c.art, x);
          EW.inGruppe(sel, String(i), listLabel(x));
          waehle(sel, String(i));
        },
        meine: meineListe, kopierText,
      });
    });

    const clr = $("enClearBtn");
    if (clr) clr.addEventListener("click", () => document.querySelectorAll(".ew-box").forEach((b) => (b.hidden = true)));
  }

  document.addEventListener("DOMContentLoaded", () => setTimeout(aufbauen, 0));
  window.EN_EIGENE_WOERTER = { daten, pruefeVerb, pruefeNomen };
})();
