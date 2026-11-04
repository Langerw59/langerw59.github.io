// =============================================================
// de_satz_analyse.js – Analyse eines EINGEGEBENEN deutschen Satzes
// RU: Разбор предложения, которое ввёл пользователь (из книги, текста…)
// -------------------------------------------------------------
// Ergebnis hat dasselbe Format wie DE_SATZ_ENGINE.bauen() →
// gleiche Anzeige (Farben, Satzklammer, Tabelle) + gleiche Erklärungen.
//   const { cfg, r } = window.DE_SATZ_ANALYSE("Er ist nach Hause gelaufen.");
// Braucht: Datenbanken (DE_VERBS_MAIN, DE_VERBS_MODALS, DE_VERBS_AUX,
//          DE_NOUNS, DE_ADVERBS, DE_ADJECTIVES, de_satzglieder.js)
// Grenzen: einfache Hauptsätze; bei Nebensätzen nur der Hauptsatz.
// Version 1 (2026-11-02)
// =============================================================

(() => {
  "use strict";

  const g = (name) => (typeof window !== "undefined" ? window[name] : undefined);
  const arr = (x) => (Array.isArray(x) ? x : []);
  const low = (s) => String(s || "").toLowerCase();
  const istGross = (t) => /^[A-ZÄÖÜ]/.test(t);

  // ------------------------------------------------------------
  // Zusätzliche Rollen für die Anzeige
  // ------------------------------------------------------------
  function rollenErgaenzen() {
    const SG = g("DE_SATZGLIEDER");
    if (!SG) return;
    if (!SG.pkv) SG.pkv = { name: "Prädikativ", frage: "Was? / Wie? (nach sein)", ru: "именная часть сказуемого", farbe: "#bf3989", kasus: "Nominativ" };
    if (!SG.part) SG.part = { name: "Partikel / Adverb", frage: "", ru: "частица / наречие (auch, sehr, nur …)", farbe: "#6e7781", kasus: "" };
    if (!SG.unbek) SG.unbek = { name: "nicht erkannt", frage: "?", ru: "не распознано (нет в базе)", farbe: "#afb8c1", kasus: "" };
    if (!SG.ns) SG.ns = { name: "Nebensatz", frage: "", ru: "придаточное предложение (на 1-м месте)", farbe: "#a475f9", kasus: "" };
    if (!SG.konj) SG.konj = { name: "Konjunktion", frage: "", ru: "союз (und, aber, oder …)", farbe: "#8c959f", kasus: "" };
  }

  // ------------------------------------------------------------
  // Wortlisten
  // ------------------------------------------------------------
  const AUX_FORMEN = {
    sein: { praesens: { ich: "bin", du: "bist", er: "ist", wir: "sind", ihr: "seid", sie: "sind" }, praeteritum: { ich: "war", du: "warst", er: "war", wir: "waren", ihr: "wart", sie: "waren" } },
    haben: { praesens: { ich: "habe", du: "hast", er: "hat", wir: "haben", ihr: "habt", sie: "haben" }, praeteritum: { ich: "hatte", du: "hattest", er: "hatte", wir: "hatten", ihr: "hattet", sie: "hatten" } },
    werden: { praesens: { ich: "werde", du: "wirst", er: "wird", wir: "werden", ihr: "werdet", sie: "werden" }, praeteritum: { ich: "wurde", du: "wurdest", er: "wurde", wir: "wurden", ihr: "wurdet", sie: "wurden" } },
  };
  const MODAL_PRAET = {
    können: "konnte", müssen: "musste", wollen: "wollte", dürfen: "durfte", sollen: "sollte", mögen: "mochte",
  };
  const PRAEP = new Set(["in", "im", "ins", "auf", "an", "am", "ans", "zu", "zum", "zur", "nach", "aus", "von", "vom", "mit", "bei", "beim", "für", "ohne", "durch", "gegen", "um", "über", "unter", "vor", "hinter", "neben", "zwischen", "seit", "bis", "wegen", "während", "trotz", "ab"]);
  const PRAEP_RICHTUNG = new Set(["nach", "zu", "zum", "zur", "ins", "ans"]);
  const PRAEP_HERKUNFT = new Set(["aus", "von", "vom", "ab"]);
  const PRAEP_ZEIT = new Set(["seit", "bis", "während"]);
  const PRAEP_ART = new Set(["mit", "ohne"]);
  const PRAEP_GRUND = new Set(["wegen", "trotz"]);
  const ZEIT_NOMEN = new Set(["Tag", "Tage", "Tagen", "Morgen", "Abend", "Mittag", "Nacht", "Woche", "Wochen", "Monat", "Monate", "Monaten", "Jahr", "Jahre", "Jahren", "Wochenende", "Mal", "Uhr", "Stunde", "Stunden", "Minute", "Minuten", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", "Sommer", "Winter", "Frühling", "Herbst", "Zeit", "Moment", "Vormittag", "Nachmittag", "Feierabend", "Urlaub", "Weihnachten", "Ostern"]);
  const ZEIT_WORT = new Set(["heute", "gestern", "morgen", "übermorgen", "vorgestern", "jetzt", "bald", "gleich", "sofort", "später", "früher", "damals", "dann", "danach", "zuerst", "zuletzt", "endlich", "schon", "noch", "abends", "morgens", "mittags", "nachts", "nachmittags", "vormittags", "montags", "sonntags", "neulich", "inzwischen", "nun", "eben"]);
  const HAEUFIG_WORT = new Set(["immer", "oft", "manchmal", "selten", "nie", "niemals", "wieder", "meistens", "täglich", "jeden"]);
  const ART_WORT = new Set(["gern", "gerne", "schnell", "langsam", "gut", "schlecht", "laut", "leise", "allein", "zusammen", "zu fuß", "lieber", "am liebsten", "genau", "richtig", "falsch", "sicher", "vielleicht", "wahrscheinlich", "leider", "gemeinsam", "pünktlich", "spät", "früh"]);
  const ORT_WORT = new Set(["hier", "da", "dort", "draußen", "drinnen", "oben", "unten", "links", "rechts", "überall", "nirgends", "dorthin", "hierher", "hin", "her", "weg", "zurück", "geradeaus", "vorne", "hinten", "zuhause"]);
  const PARTIKEL = new Set(["auch", "sehr", "nur", "ja", "doch", "mal", "denn", "aber", "eigentlich", "wirklich", "ganz", "etwas", "viel", "mehr", "wenig", "so", "zu", "fast", "gar", "bitte", "noch", "schon", "eben", "halt", "wohl"]);
  const KONJ = new Set(["und", "oder", "aber", "denn", "sondern"]);
  const NEBENSATZ = new Set(["weil", "dass", "wenn", "ob", "als", "obwohl", "damit", "nachdem", "bevor", "während", "seit", "seitdem", "sobald", "bis", "falls", "da", "wie", "wo", "was", "der", "die", "das"]);
  const TRENN_PRAEFIX = new Set(["ab", "an", "auf", "aus", "bei", "ein", "fest", "fort", "her", "hin", "los", "mit", "nach", "vor", "weg", "weiter", "zu", "zurück", "zusammen", "fern", "kennen", "spazieren", "statt", "teil", "um"]);
  const W_WORT = { wer: "subj", wen: "akk", wem: "dat", was: "akk", wann: "zeit", wo: "ort", wohin: "ort", woher: "ort", wie: "art", warum: "part", wieso: "part", weshalb: "part", womit: "art" };

  const PRON = {
    ich: { kasus: ["nom"], key: ["ich"] }, du: { kasus: ["nom"], key: ["du"] }, er: { kasus: ["nom"], key: ["er"] },
    sie: { kasus: ["nom", "akk"], key: ["er", "sie"] }, es: { kasus: ["nom", "akk"], key: ["er"] }, wir: { kasus: ["nom"], key: ["wir"] },
    ihr: { kasus: ["nom", "dat"], key: ["ihr"] }, Sie: { kasus: ["nom", "akk"], key: ["sie"] },
    mich: { kasus: ["akk"] }, dich: { kasus: ["akk"] }, ihn: { kasus: ["akk"] }, uns: { kasus: ["akk", "dat"] }, euch: { kasus: ["akk", "dat"] },
    mir: { kasus: ["dat"] }, dir: { kasus: ["dat"] }, ihm: { kasus: ["dat"] }, ihnen: { kasus: ["dat"] }, Ihnen: { kasus: ["dat"] },
    sich: { kasus: ["akk", "dat"], reflexiv: true },
    man: { kasus: ["nom"], key: ["er"] }, jemand: { kasus: ["nom", "akk"], key: ["er"] }, niemand: { kasus: ["nom", "akk"], key: ["er"] },
    alle: { kasus: ["nom", "akk"], key: ["sie"] }, nichts: { kasus: ["nom", "akk"], key: ["er"] }, etwas: { kasus: ["nom", "akk"], key: ["er"] },
  };

  // Artikelwörter → mögliche { kasus, gender }
  const DEF_ART = {
    der: [["nom", "m"], ["dat", "f"]], die: [["nom", "f"], ["akk", "f"], ["nom", "pl"], ["akk", "pl"]], das: [["nom", "n"], ["akk", "n"]],
    den: [["akk", "m"], ["dat", "pl"]], dem: [["dat", "m"], ["dat", "n"]],
  };
  const EIN_END = {
    "": [["nom", "m"], ["nom", "n"], ["akk", "n"]], e: [["nom", "f"], ["akk", "f"], ["nom", "pl"], ["akk", "pl"]],
    en: [["akk", "m"], ["dat", "pl"]], em: [["dat", "m"], ["dat", "n"]], er: [["dat", "f"]],
  };
  const DER_END = { er: [["nom", "m"], ["dat", "f"]], e: [["nom", "f"], ["akk", "f"], ["nom", "pl"], ["akk", "pl"]], es: [["nom", "n"], ["akk", "n"]], en: [["akk", "m"], ["dat", "pl"]], em: [["dat", "m"], ["dat", "n"]] };
  const EIN_STAEMME = ["kein", "mein", "dein", "sein", "ihr", "unser", "eur", "euer", "Ihr", "ein"];
  const DER_STAEMME = ["dies", "jed", "welch", "jen", "manch", "all", "letzt", "nächst"];

  function artikelInfo(wort) {
    const w = wort; const l = low(wort);
    if (DEF_ART[l]) return { typ: "def", stamm: l, opt: DEF_ART[l] };
    if (l === "zum" || l === "zur" || l === "im" || l === "ins" || l === "am" || l === "vom" || l === "beim") return null;
    for (const st of EIN_STAEMME) {
      const sl = low(st);
      if (l.startsWith(sl)) {
        const end = l.slice(sl.length);
        if (EIN_END[end] !== undefined) {
          if (sl === "ihr" && end === "" && w === "ihr") return null; // Pronomen „ihr“
          if (sl === "sein" && end === "") return { typ: "ein", stamm: "sein", opt: EIN_END[""], vielleichtVerb: true };
          return { typ: "ein", stamm: sl === "eur" ? "euer" : sl, opt: EIN_END[end], kein: sl === "kein" };
        }
      }
    }
    for (const st of DER_STAEMME) {
      if (l.startsWith(st) && DER_END[l.slice(st.length)]) return { typ: "def", stamm: st, opt: DER_END[l.slice(st.length)] };
    }
    return null;
  }

  // ------------------------------------------------------------
  // Lexikon aus den Datenbanken
  // ------------------------------------------------------------
  let LEX = null;
  function normKey(k) {
    if (k === "er_sie_es") return "er";
    if (k === "sie_Sie") return "sie";
    return k;
  }
  function lexikon() {
    if (LEX) return LEX;
    rollenErgaenzen();
    const finit = new Map(); // form → [{verb, inf, keys:[], tempus}]
    const partizip = new Map();
    const infinitiv = new Map();
    const add = (form, eintrag) => {
      const f = low(form);
      if (!f) return;
      if (!finit.has(f)) finit.set(f, []);
      const liste = finit.get(f);
      const vorh = liste.find((e) => e.inf === eintrag.inf && e.tempus === eintrag.tempus);
      if (vorh) vorh.keys.push(...eintrag.keys);
      else liste.push(eintrag);
    };
    const alleVerben = [].concat(arr(g("DE_VERBS_MAIN")).map((v) => ({ v, art: "voll" })), arr(g("DE_VERBS_MODALS")).map((v) => ({ v, art: "modal" })), arr(g("DE_VERBS_AUX")).map((v) => ({ v, art: "aux" })));
    alleVerben.forEach(({ v, art }) => {
      const inf = v.inf || v.infinitiv;
      if (!inf) return;
      infinitiv.set(low(inf), { verb: v, inf, art });
      const pres = v.praesens || v.presens || {};
      Object.entries(pres).forEach(([k, f]) => add(f, { verb: v, inf, keys: [normKey(k)], tempus: "praesens", art }));
      const praet = v.praeteritum || {};
      Object.entries(praet).forEach(([k, f]) => add(f, { verb: v, inf, keys: [normKey(k)], tempus: "praeteritum", art }));
      if (art === "modal" && MODAL_PRAET[inf] && !v.praeteritum) {
        const st = MODAL_PRAET[inf];
        const tab = { ich: st, du: st + "st", er: st, wir: st + "n", ihr: st + "t", sie: st + "n" };
        Object.entries(tab).forEach(([k, f]) => add(f, { verb: v, inf, keys: [k], tempus: "praeteritum", art }));
      }
      const p = v.partizip2 || v.partizip;
      if (p) partizip.set(low(p), { verb: v, inf, art });
    });
    Object.entries(AUX_FORMEN).forEach(([inf, t]) => {
      const vObj = (infinitiv.get(inf) || {}).verb || { inf, praesens: t.praesens, praeteritum: t.praeteritum, partizip2: inf === "sein" ? "gewesen" : inf === "haben" ? "gehabt" : "geworden" };
      if (!vObj.praeteritum) vObj.praeteritum = t.praeteritum;
      if (!infinitiv.has(inf)) infinitiv.set(inf, { verb: vObj, inf, art: "aux" });
      ["praesens", "praeteritum"].forEach((tp) => Object.entries(t[tp]).forEach(([k, f]) => add(f, { verb: vObj, inf, keys: [k], tempus: tp, art: "aux" })));
    });
    // Duplikate in keys entfernen
    finit.forEach((liste) => liste.forEach((e) => (e.keys = [...new Set(e.keys)])));

    const nomen = new Map();
    arr(g("DE_NOUNS")).forEach((n) => nomen.set(n.lemma, { lemma: n.lemma, gender: n.gender }));
    arr(g("DE_PERSONEN")).forEach((n) => { if (!nomen.has(n.lemma) || n.gender === "pl") nomen.set(n.lemma, { lemma: n.lemma, gender: n.gender, weak: n.weak, datPl: n.datPl }); if (n.weak) nomen.set(n.weak, { lemma: n.lemma, gender: n.gender, weak: n.weak, formWeak: true }); if (n.datPl) nomen.set(n.datPl, { lemma: n.lemma, gender: "pl", datPl: n.datPl }); });
    Object.entries(g("DE_PLURAL_NOMEN") || {}).forEach(([l, d]) => { nomen.set(l, { lemma: l, gender: "pl", datPl: d }); nomen.set(d, { lemma: l, gender: "pl", datPl: d }); });
    Object.entries(g("DE_SCHWACHE_NOMEN") || {}).forEach(([l, w]) => { const n = nomen.get(l); if (n) { n.weak = w; nomen.set(w, Object.assign({}, n, { formWeak: true })); } });

    const adverb = new Map();
    arr(g("DE_ADVERBS")).forEach((a) => adverb.set(low(a.base), a.group));
    const adjektiv = new Set(arr(g("DE_ADJECTIVES")).map((a) => low(a.base)));
    const personLemmas = new Set(arr(g("DE_PERSONEN_LEMMAS")).concat(arr(g("DE_PERSONEN")).map((p) => p.lemma)));
    LEX = { finit, partizip, infinitiv, nomen, adverb, adjektiv, personLemmas };
    return LEX;
  }

  function istAdjektiv(l) {
    const L = lexikon();
    if (L.adjektiv.has(l)) return true;
    const m = l.match(/^(.*?)(e|en|er|es|em)$/);
    return !!(m && (L.adjektiv.has(m[1]) || L.adjektiv.has(m[1] + "e")));
  }

  // ------------------------------------------------------------
  // Satz vorbereiten: Tokens, Hauptsatz wählen
  // ------------------------------------------------------------
  function tokens(text) {
    return text.replace(/[„“"»«]/g, "").match(/[A-Za-zÄÖÜäöüß0-9'’-]+|[.,!?;:]/g) || [];
  }

  function hauptsatz(alle, hinweise, info) {
    // in Teilsätze an Kommas trennen
    const teile = [];
    let cur = [];
    alle.forEach((t) => { if (t === "," || t === ";" || t === ":") { if (cur.length) teile.push(cur); cur = []; } else cur.push(t); });
    if (cur.length) teile.push(cur);
    const ohnePunkt = (ts) => ts.filter((t) => !/^[.!?]$/.test(t));
    let wahl = teile[0];
    if (teile.length > 1) {
      const kandidat = teile.find((ts) => !NEBENSATZ.has(low(ts[0])) || W_WORT[low(ts[0])] && ts === teile[0]);
      wahl = kandidat || teile[0];
      const iw = teile.indexOf(wahl);
      if (iw > 0 && NEBENSATZ.has(low(teile[iw - 1][0]))) {
        info.nebensatzVorne = ohnePunkt(teile[iw - 1]).join(" ");
      }
      hinweise.push("Предложение из нескольких частей (через запятую). Разбираю одну главную часть: «" + ohnePunkt(wahl).join(" ") + "». Остальные части (и придаточные с weil, dass, wenn…) программа пока не разбирает.");
    } else if (NEBENSATZ.has(low(teile[0][0])) && !W_WORT[low(teile[0][0])] && !DEF_ART[low(teile[0][0])]) {
      hinweise.push("Это похоже на придаточное предложение (начинается с «" + teile[0][0] + "») — в нём глагол стоит в конце. Программа пока разбирает только главные предложения.");
    }
    return ohnePunkt(wahl);
  }

  // ------------------------------------------------------------
  // Finites Verb suchen
  // ------------------------------------------------------------
  function findeFinit(ts) {
    const L = lexikon();
    for (let i = 0; i < ts.length; i++) {
      const t = ts[i];
      if (i > 0 && istGross(t) && t !== "Sie") continue; // Nomen überspringen
      if (PRON[t] || PRON[low(t)] && i === 0 && !L.finit.has(low(t))) continue;
      const hits = L.finit.get(low(t));
      if (!hits) continue;
      // „sein“ als Possessivartikel? (Sein Bruder …) – Infinitiv, kein finites Wort → schon ausgeschlossen
      return { index: i, token: t, hits };
    }
    return null;
  }

  // ------------------------------------------------------------
  // Satzglieder gruppieren
  // ------------------------------------------------------------
  function gruppiere(ts, start, ende, kontext) {
    const L = lexikon();
    const out = [];
    let i = start;
    while (i < ende) {
      const t = ts[i];
      const l = low(t);
      const satzAnfang = i === 0;

      // W-Fragewort
      if (satzAnfang && W_WORT[l] !== undefined) {
        if (l === "wie" && low(ts[i + 1]) === "oft") { out.push({ typ: "w", rolle: "zeit", text: t + " " + ts[i + 1], w: "wie oft", von: i, bis: i + 1 }); i += 2; continue; }
        out.push({ typ: "w", rolle: W_WORT[l], text: t, w: l, von: i, bis: i }); i++; continue;
      }
      if (l === "nicht") { out.push({ typ: "neg", rolle: "neg", text: t, von: i, bis: i }); i++; continue; }
      if (satzAnfang && NEBENSATZ.has(l) && !W_WORT[l] && !DEF_ART[l]) { out.push({ typ: "konj", rolle: "konj", text: t, von: i, bis: i, info: "Konjunktion (Nebensatz: Verb am Ende)" }); i++; continue; }
      if (KONJ.has(l) && satzAnfang) { out.push({ typ: "konj", rolle: "konj", text: t, von: i, bis: i }); i++; continue; }

      // Präpositionalgruppe
      if (PRAEP.has(l) && !(l === "zu" && i + 1 >= ende)) {
        let j = i + 1;
        let nomenWort = null;
        while (j < ende) {
          const tj = ts[j];
          const lj = low(tj);
          if (istGross(tj) || /^\d+$/.test(tj)) {
            if (/^\d+$/.test(tj)) { j++; continue; }
            nomenWort = tj; j++;
            // „um 8 Uhr“, Namen aus zwei Wörtern
            break;
          }
          if (artikelInfo(tj) || istAdjektiv(lj) || /^(zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|halb|viertel|einem?|einer)$/.test(lj)) { j++; continue; }
          break;
        }
        if (j === i + 1) { // Präposition allein → wohl trennbares Präfix o. Ä.
          out.push({ typ: "rest", rolle: "unbek", text: t, von: i, bis: i, info: "Präposition ohne Nomen" }); i++; continue;
        }
        const text = ts.slice(i, j).join(" ");
        const art0 = artikelInfo(ts[i + 1] || "");
        let rolle = "ort", frage = "Wo?";
        if (PRAEP_ZEIT.has(l) || (nomenWort && ZEIT_NOMEN.has(nomenWort)) || (l === "um" && /uhr/i.test(text))) { rolle = "zeit"; frage = "Wann?"; }
        else if (PRAEP_ART.has(l) || (l === "zu" && nomenWort === "Fuß")) { rolle = "art"; frage = "Wie? / Womit?"; }
        else if (PRAEP_GRUND.has(l)) { rolle = "part"; frage = "Warum?"; }
        else if (l === "für") { rolle = "part"; frage = "Für wen? / Wofür?"; }
        else if (l === "zu" && nomenWort === "Hause" || l === "zuhause") { rolle = "ort"; frage = "Wo?"; }
        else if (PRAEP_RICHTUNG.has(l)) { rolle = "ort"; frage = "Wohin?"; }
        else if (PRAEP_HERKUNFT.has(l)) { rolle = "ort"; frage = "Woher?"; }
        else if (["in", "auf", "an", "über", "unter", "vor", "hinter", "neben", "zwischen"].includes(l) && art0 && art0.opt.every(([k]) => k === "akk" || k === "nom")) { rolle = "ort"; frage = "Wohin?"; }
        const kasusInfo = (art0 && art0.opt.length) ? (frage === "Wohin?" && ["in", "auf", "an", "über", "unter", "vor", "hinter", "neben", "zwischen"].includes(l) ? "Akkusativ (Richtung → wohin?)" : ["in", "auf", "an", "über", "unter", "vor", "hinter", "neben", "zwischen"].includes(l) ? "Dativ (Ort → wo?)" : "") : "";
        out.push({ typ: "pg", rolle, text, frage, von: i, bis: j - 1, info: "Präpositionalgruppe" + (frage ? " · " + frage : "") + (kasusInfo ? " · " + kasusInfo : "") });
        i = j; continue;
      }

      // Personalpronomen
      const pKey = PRON[t] ? t : (PRON[l] && (t !== "Sie" || satzAnfang) ? l : null);
      if (pKey && !(satzAnfang && t === "Sie" && false)) {
        const p = PRON[pKey];
        let keys = (p.key || []).slice();
        if (t === "Sie" && satzAnfang) keys = ["er", "sie"]; // sie / Sie am Satzanfang nicht unterscheidbar
        out.push({ typ: "np", pron: true, text: t, kasus: p.kasus.slice(), keys, reflexiv: !!p.reflexiv, von: i, bis: i, gender: null });
        i++; continue;
      }

      // Nomengruppe mit Artikel
      const art = artikelInfo(t);
      if (art && !(art.vielleichtVerb && !istGross(ts[i + 1] || ""))) {
        let j = i + 1;
        while (j < ende && !istGross(ts[j]) && (istAdjektiv(low(ts[j])) || /^(sehr|ganz|neue?n?|alte?n?)$/.test(low(ts[j])))) j++;
        if (j < ende && istGross(ts[j])) {
          const nw = ts[j];
          const n = L.nomen.get(nw) || null;
          let opt = art.opt;
          if (n) {
            const gen = n.gender;
            const f = opt.filter(([, gd]) => gd === gen);
            if (f.length) opt = f;
          }
          const kasus = [...new Set(opt.map(([k]) => k))];
          const genders = [...new Set(opt.map(([, gd]) => gd))];
          const zeitNomen = ZEIT_NOMEN.has(nw) && /^(jed|letzt|nächst|dies|all)/.test(low(t));
          out.push({ typ: zeitNomen ? "zeitnp" : "np", rolle: zeitNomen ? "zeit" : undefined, text: ts.slice(i, j + 1).join(" "), kasus, gender: n ? n.gender : (genders.length === 1 ? genders[0] : null), nomen: n || { lemma: nw, gender: genders.length === 1 ? genders[0] : "m", unbekannt: true }, art, kein: !!art.kein, von: i, bis: j });
          i = j + 1; continue;
        }
        // Artikelwort allein (z. B. „das“ als Pronomen)
        out.push({ typ: "np", text: t, kasus: [...new Set(art.opt.map(([k]) => k))], keys: ["er"], von: i, bis: i });
        i++; continue;
      }

      // Adverbien
      const advGr = L.adverb.get(l);
      if (advGr || ZEIT_WORT.has(l) || HAEUFIG_WORT.has(l) || ART_WORT.has(l) || ORT_WORT.has(l)) {
        // „morgen“ klein = Zeitadverb
        let rolle = "part", info = "Adverb";
        if (advGr === "time" || ZEIT_WORT.has(l)) { rolle = "zeit"; info = "Zeitadverb · Wann?"; }
        else if (advGr === "frequency" || HAEUFIG_WORT.has(l)) { rolle = "zeit"; info = "Häufigkeit · Wie oft?"; }
        else if (advGr === "manner" || ART_WORT.has(l)) { rolle = "art"; info = "Art und Weise · Wie?"; }
        else if (advGr === "place" || ORT_WORT.has(l)) { rolle = "ort"; info = "Ortsadverb · Wo?"; }
        if (PARTIKEL.has(l) && (l === "schon" || l === "noch" || l === "eben")) { rolle = "zeit"; }
        // „jeden Tag“ ohne Großschreibung abgefangen oben
        out.push({ typ: "adv", rolle, text: t, von: i, bis: i, info });
        i++; continue;
      }
      if (PARTIKEL.has(l)) { out.push({ typ: "adv", rolle: "part", text: t, von: i, bis: i, info: "Partikel" }); i++; continue; }

      // Adjektiv allein (nach sein → Prädikativ, sonst Wie?)
      if (istAdjektiv(l) && !istGross(t)) {
        out.push({ typ: "adj", rolle: kontext.kopula ? "pkv" : "art", text: t, von: i, bis: i, info: kontext.kopula ? "Adjektiv nach „" + kontext.kopula + "“" : "Adjektiv als Adverb · Wie?" });
        i++; continue;
      }

      // Nomen / Name ohne Artikel
      if (istGross(t) || (satzAnfang && L.nomen.has(capFirst(t)))) {
        let j = i;
        while (j + 1 < ende && istGross(ts[j + 1]) && !L.nomen.has(ts[j]) && !PRON[ts[j + 1]]) j++; // „Anna Müller“
        const n = L.nomen.get(ts[j]) || null;
        const name = !n && !satzAnfang;
        const gen = n ? n.gender : null;
        out.push({ typ: "np", text: ts.slice(i, j + 1).join(" "), kasus: ["nom", "akk", "dat"], gender: gen, nomen: n || { lemma: ts[j], gender: gen || "m", unbekannt: true }, keys: gen === "pl" ? ["sie"] : gen ? ["er"] : ["er", "sie"], ohneArtikel: true, name, von: i, bis: j });
        i = j + 1; continue;
      }

      // Zahl
      if (/^\d+$/.test(t)) { out.push({ typ: "rest", rolle: "unbek", text: t, von: i, bis: i, info: "Zahl" }); i++; continue; }

      out.push({ typ: "rest", rolle: "unbek", text: t, von: i, bis: i, info: "Wort nicht in der Datenbank" });
      i++;
    }
    return out;
  }
  function capFirst(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  // ------------------------------------------------------------
  // Rechte Satzklammer (Partizip, Infinitiv, Präfix)
  // ------------------------------------------------------------
  function rechteKlammer(ts, fin, finEintrag) {
    const L = lexikon();
    const teile = [];
    let j = ts.length - 1;
    const darfInf = finEintrag && (finEintrag.art === "modal" || finEintrag.inf === "werden" || /^(lassen|gehen|bleiben|hören|sehen)$/.test(finEintrag.inf));
    while (j > fin && teile.length < 3) {
      const t = ts[j];
      const l = low(t);
      if (istGross(t)) break;
      if (L.partizip.has(l) || (/^ge.{2,}(t|en)$/.test(l) && !PRAEP.has(l) && !ZEIT_WORT.has(l) && !istAdjektiv(l)) || /^(ab|an|auf|aus|ein|mit|vor|zu|zurück|weg)ge.{2,}(t|en)$/.test(l) || /^(be|ver|er|ent|zer|über)\w+(t)$/.test(l) && teile.length === 0 && finEintrag && (finEintrag.inf === "haben" || finEintrag.inf === "sein") && !L.finit.has(l)) {
        teile.unshift({ text: t, typ: "part", eintrag: L.partizip.get(l) || null }); j--; continue;
      }
      if ((l === "haben" || l === "sein" || l === "werden") && teile.length === 0 && j - 1 > fin && (L.partizip.has(low(ts[j - 1])) || /^ge.{2,}(t|en)$/.test(low(ts[j - 1])))) {
        teile.unshift({ text: t, typ: "auxinf", eintrag: L.infinitiv.get(l) }); j--; continue;
      }
      if (darfInf && (L.infinitiv.has(l) || /[^aeiou](en|ern|eln)$/.test(l) && !istAdjektiv(l) && !ZEIT_WORT.has(l)) && !PRAEP.has(l)) {
        teile.unshift({ text: t, typ: "inf", eintrag: L.infinitiv.get(l) || null }); j--; continue;
      }
      if (teile.length === 0 && TRENN_PRAEFIX.has(l) && (!finEintrag || (finEintrag.art !== "aux" && finEintrag.art !== "modal")) && j === ts.length - 1) {
        teile.unshift({ text: t, typ: "praefix" }); j--; break;
      }
      break;
    }
    return { teile, ab: j + 1 };
  }

  // ------------------------------------------------------------
  // HAUPTFUNKTION
  // ------------------------------------------------------------
  function analysiere(eingabe) {
    const L = lexikon();
    const hinweise = [];
    const text0 = String(eingabe || "").trim();
    if (!text0) return { r: { fehler: "Bitte einen Satz eingeben. / Введи предложение." } };
    const alleTs = tokens(text0);
    const endZeichen = (alleTs.filter((t) => /^[.!?]$/.test(t)).pop()) || ".";
    const hsInfo = {};
    const ts = hauptsatz(alleTs, hinweise, hsInfo);
    if (!ts.length) return { r: { fehler: "Kein Satz erkannt." } };

    // --- finites Verb ---
    let fin = findeFinit(ts);
    let geraten = false;
    if ((!fin || fin.index > 0) && endZeichen === "!" && !PRON[low(ts[0])]) {
      const l0 = low(ts[0]);
      const ein = L.infinitiv.get(l0 + "en") || L.infinitiv.get(l0 + "n") || L.infinitiv.get(l0.replace(/e$/, "") + "en");
      if (ein) fin = { index: 0, token: ts[0], hits: [{ verb: ein.verb, inf: ein.inf, keys: ["du"], tempus: "praesens", art: ein.art }], imperativ: true };
    }
    if (!fin) {
      // nach V2-Regel raten: erstes Satzglied überspringen
      const vorlaeufig = gruppiere(ts, 0, ts.length, {});
      const erstes = vorlaeufig[0];
      const idx = erstes ? (W_WORT[low(ts[0])] !== undefined ? erstes.bis + 1 : (endZeichen === "?" ? 0 : erstes.bis + 1)) : 1;
      if (idx < ts.length) {
        fin = { index: idx, token: ts[idx], hits: [] };
        geraten = true;
        hinweise.push("Глагол «" + ts[idx] + "» не найден в базе. Я предположил, что он спрягаемый, по правилу «глагол на 2-м месте» (в вопросе — на 1-м). Объяснения по самому глаголу будут неполными.");
      } else {
        return { r: { fehler: "Ich finde kein Verb in diesem Satz. / Не нашёл глагол в этом предложении." } };
      }
    }

    // --- Lesart des finiten Verbs wählen (später mit Subjekt abgleichen) ---
    const hits = fin.hits;
    const bevorzugt = hits.find((h) => h.art === "aux") || hits.find((h) => h.art === "modal") || hits[0] || null;
    const kopulaInf = bevorzugt && ["sein", "werden", "bleiben"].includes(bevorzugt.inf) ? bevorzugt.inf : null;

    // --- rechte Klammer ---
    const rk = rechteKlammer(ts, fin.index, bevorzugt);
    const kopula = rk.teile.length ? null : kopulaInf;

    // --- Satzglieder ---
    const vor = gruppiere(ts, 0, fin.index, { kopula });
    const mitte = gruppiere(ts, fin.index + 1, rk.ab, { kopula });
    // Prädikativ: Nomengruppe im Nominativ nach „sein“
    const alleSG = vor.concat(mitte);

    // --- Satzart ---
    const erstes = vor[0];
    let satzart = "aussage";
    if (hsInfo.nebensatzVorne) satzart = endZeichen === "?" ? "frage" : "aussage";
    else if (fin.imperativ) satzart = "imperativ";
    else if (erstes && erstes.typ === "w") satzart = "wfrage";
    else if (fin.index === 0 || (vor.length === 1 && vor[0].typ === "konj")) satzart = endZeichen === "?" ? "frage" : "imperativ";
    else if (endZeichen === "?") satzart = "frage";

    // --- Subjekt bestimmen ---
    const nps = alleSG.filter((s) => s.typ === "np");
    let subj = null;
    const passtZuVerb = (s) => {
      if (!hits.length) return true;
      const keys = s.keys && s.keys.length ? s.keys : s.gender === "pl" ? ["sie"] : s.gender ? ["er"] : ["er", "sie"];
      return hits.some((h) => h.keys.some((k) => keys.includes(k)));
    };
    if (erstes && erstes.typ === "w" && erstes.rolle === "subj") subj = erstes;
    if (!subj) subj = nps.find((s) => s.pron && s.kasus.includes("nom") && passtZuVerb(s) && s.kasus.length === 1);
    if (!subj) subj = nps.find((s) => s.kasus.includes("nom") && passtZuVerb(s));
    if (!subj && satzart === "imperativ") hinweise.push("Подлежащего нет — похоже на повелительное предложение (Imperativ): «Komm!», «Geh nach Hause!».");

    // --- Objekte ---
    const valenzAll = g("DE_VERB_VALENZ") || {};
    nps.forEach((s) => {
      if (s === subj) { s.rolle = "subj"; return; }
      if (s.typ === "zeitnp") return;
      if (kopula && s.kasus.includes("nom")) { s.rolle = "pkv"; s.info = "Nominativ nach „" + kopula + "“ (Gleichsetzung)"; return; }
      const k = s.kasus.filter((x) => x !== "nom");
      if (k.length === 1) s.rolle = k[0];
      else if (k.includes("akk") && k.includes("dat")) s.rolle = "akk";
      else s.rolle = "akk";
    });
    // Zwei Akkusative, eines davon könnte Dativ sein (Ich gebe ihr das Buch)
    const akks = nps.filter((s) => s.rolle === "akk");
    if (akks.length >= 2 && akks[0].pron && akks[0].kasus.includes("dat")) akks[0].rolle = "dat";
    else if (akks.length >= 2 && akks[0].kasus && akks[0].kasus.includes("dat")) akks[0].rolle = "dat";
    if (akks.length >= 2 && low(akks[0].text) === "ihr") akks[0].rolle = "dat";
    nps.forEach((s) => {
      if (s.rolle === "subj" && !s.info) s.info = s.pron ? "Personalpronomen · Nominativ" : "Nomengruppe · Nominativ";
      if (s.rolle === "akk" && !s.info) s.info = (s.reflexiv ? "Reflexivpronomen (sich) · " : s.pron ? "Pronomen · " : "") + "Akkusativ" + (s.kein ? " · Verneinung mit „kein“" : "") + (s.kasus.length > 1 && !s.pron ? " (по артиклю мог бы быть и другим падежом)" : "");
      if (s.rolle === "dat" && !s.info) s.info = (s.reflexiv ? "Reflexivpronomen · " : s.pron ? "Pronomen · " : "") + "Dativ";
      if (s.ohneArtikel && !s.pron && s.rolle !== "subj") s.info = (s.info || "") + " · ohne Artikel – падеж определён по смыслу";
    });

    // --- Tempus ---
    const rTypen = rk.teile.map((x) => x.typ);
    const finInf = bevorzugt ? bevorzugt.inf : null;
    const finTemp = bevorzugt ? bevorzugt.tempus : "praesens";
    let tense = finTemp, zeitform = null, modal = null, passiv = false;
    if (finInf === "werden" && finTemp === "praesens" && rTypen.includes("part") && rTypen.includes("auxinf")) tense = "futur2";
    else if (finInf === "werden" && finTemp === "praesens" && rTypen.includes("inf")) tense = "futur1";
    else if ((finInf === "haben" || finInf === "sein") && rTypen.includes("part")) tense = finTemp === "praesens" ? "perfekt" : "plusquamperfekt";
    else if (finInf === "werden" && rTypen.includes("part")) { passiv = true; zeitform = (finTemp === "praesens" ? "Präsens" : "Präteritum") + " Passiv (werden + Partizip II)"; }
    if (bevorzugt && bevorzugt.art === "modal") { modal = finInf; zeitform = (finTemp === "praesens" ? "Präsens" : "Präteritum") + " mit Modalverb „" + finInf + "“"; }
    const ZF = (g("DE_SATZ_ENGINE") || {}).ZEITFORMEN || {};
    if (!zeitform) zeitform = ZF[tense] || tense;

    // --- Hauptverb (für Erklärungen) ---
    let haupt = null;
    const pTeil = rk.teile.find((x) => x.typ === "part");
    const iTeil = rk.teile.find((x) => x.typ === "inf");
    const praefix = rk.teile.find((x) => x.typ === "praefix");
    if (pTeil && pTeil.eintrag) haupt = pTeil.eintrag;
    else if (iTeil && iTeil.eintrag && !modal) haupt = iTeil.eintrag;
    else if (!pTeil && !iTeil && bevorzugt) haupt = bevorzugt;
    let verbUnbekannt = !haupt || geraten;
    if (praefix) {
      const stammGuess = bevorzugt ? bevorzugt.inf : low(fin.token).replace(/(e|st|t)$/, "") + "en";
      const zus = praefix.text + stammGuess;
      const ein = L.infinitiv.get(low(zus));
      if (ein) haupt = ein;
      else { verbUnbekannt = true; hinweise.push("«" + praefix.text + "» в конце — отделяемая приставка (trennbares Verb): глагол «" + zus + "». В базе его пока нет."); }
    }
    let cfgVerb = modal ? bevorzugt.verb : haupt ? haupt.verb : null;
    if (passiv && L.infinitiv.get("werden")) cfgVerb = L.infinitiv.get("werden").verb;
    if (!cfgVerb) {
      const infGuess = (pTeil ? pTeil.text.replace(/^ge/, "").replace(/(t|en)$/, "") + "en" : iTeil ? iTeil.text : (fin.token || "").toLowerCase());
      cfgVerb = { inf: infGuess, praesens: {}, praeteritum: {}, partizip2: pTeil ? pTeil.text : "" };
      verbUnbekannt = true;
    }

    // --- Person ---
    let key = "er";
    const kandKeys = bevorzugt ? hits.filter((h) => h.inf === bevorzugt.inf && h.tempus === bevorzugt.tempus).flatMap((h) => h.keys) : [];
    if (subj && subj.typ === "w") key = "er";
    else if (subj) {
      const sk = subj.keys && subj.keys.length ? subj.keys : subj.gender === "pl" ? ["sie"] : ["er"];
      key = sk.find((k) => kandKeys.includes(k)) || sk[0];
    } else if (kandKeys.length) key = kandKeys[0];

    // --- Hilfsverb haben/sein prüfen ---
    let hv = null;
    if (tense === "perfekt" || tense === "plusquamperfekt" || tense === "futur2") {
      const aux = tense === "futur2" ? low((rk.teile.find((x) => x.typ === "auxinf") || {}).text || "haben") : finInf;
      const hatAkk = nps.some((s) => s.rolle === "akk" && !s.reflexiv);
      const erwartet = haupt && haupt.verb ? (haupt.verb.perfektAux || (haupt.verb.usesSein ? "sein" : "haben")) : null;
      let soll = erwartet;
      if (erwartet === "sein" && hatAkk && arr(g("DE_SEIN_ZU_HABEN_MIT_AKK")).includes(haupt.inf)) soll = "haben";
      hv = { aux, grund: hatAkk && aux === "haben" ? "mit Akkusativobjekt → haben" : aux === "sein" ? "Bewegung / Zustandsänderung → sein" : "Standardregel → haben" };
      if (soll && soll !== aux) {
        hinweise.push(`⚠ В предложении «${aux === "haben" ? "haben" : "sein"}» + ${pTeil ? pTeil.text : ""}. В литературном языке у «${haupt.inf}» обычно «${soll}»: ` + (soll === "sein" ? `«ich bin ${pTeil ? pTeil.text : ""}». «Habe ${pTeil ? pTeil.text : ""}» — диалект или ошибка (если нет Akkusativobjekt).` : `«ich habe ${pTeil ? pTeil.text : ""}».`));
      }
    } else if (haupt && haupt.verb) {
      const a = haupt.verb.perfektAux || (haupt.verb.usesSein ? "sein" : "haben");
      hv = { aux: a, grund: a === "sein" ? "Bewegung / Zustandsänderung → sein" : "Standardregel → haben" };
    }

    // --- Segmente bauen ---
    const seg = (text, rolle, info) => ({ text, rolle, info: info || "" });
    const toSeg = (s) => {
      if (s.typ === "w") return seg(s.text, s.rolle === "part" ? "part" : s.rolle, "Fragewort");
      return seg(s.text, s.rolle || "unbek", s.info || (s.typ === "zeitnp" ? "Zeitangabe im Akkusativ (jeden Tag)" : ""));
    };
    const vorSeg = vor.map(toSeg);
    if (hsInfo.nebensatzVorne) {
      vorSeg.unshift(seg(hsInfo.nebensatzVorne + ",", "ns", "Nebensatz im Vorfeld – zählt als 1. Stelle, deshalb steht das Verb danach"));
      hinweise.push("Придаточное «" + hsInfo.nebensatzVorne + "» стоит на 1-м месте целиком — поэтому сразу после запятой идёт глагол «" + fin.token + "» (правило 2-го места).");
    }
    const mitteSeg = mitte.map(toSeg);
    const finitSeg = seg(fin.token, "pred", geraten ? "finites Verb (geraten – nicht in der Datenbank)" : satzart === "frage" || satzart === "imperativ" ? "finites Verb (1. Stelle)" : "finites Verb (2. Stelle)");
    const rechtsSeg = rk.teile.map((x) => seg(x.text, "pred", x.typ === "part" ? "Partizip II" : x.typ === "inf" ? "Infinitiv" : x.typ === "auxinf" ? "Hilfsverb im Infinitiv" : "abgetrennte Vorsilbe (trennbares Verb)"));

    // Satz-Anfang klein speichern wie im Generator (außer Nomen/Sie)
    [vorSeg[0] || finitSeg].filter((s) => s.rolle !== "ns").forEach((s) => {
      const w = s.text.split(" ")[0];
      if (!L.nomen.has(w) && w !== "Sie" && !(vor[0] && vor[0].name)) s.text = s.text.charAt(0).toLowerCase() + s.text.slice(1);
    });

    const alle = [...vorSeg, finitSeg, ...mitteSeg, ...rechtsSeg];
    const text = capFirst(alle.map((s) => s.text).join(" ")) + endZeichen;
    const unbek = alle.filter((s) => s.rolle === "unbek").map((s) => s.text);
    if (unbek.length) hinweise.push("Не распознано (серым): " + unbek.join(", ") + ". Таких слов пока нет в базе — разбор вокруг них может быть неточным.");

    const kein = nps.some((s) => s.kein);
    const verneinung = kein || alle.some((s) => s.rolle === "neg");

    const r = {
      text,
      segmente: alle,
      felder: { vorfeld: vorSeg, links: [finitSeg], mittel: mitteSeg, rechts: rechtsSeg },
      aux: (tense === "perfekt" || tense === "plusquamperfekt" || tense === "futur2") ? hv : null,
      hv: hv || { aux: "haben", grund: "Standardregel → haben" },
      hinweise,
      zeitform,
      key,
      kein,
      analyse: true,
      modal,
      passiv,
      original: text0,
    };

    const nomenVon = (s) => (s && s.nomen && !s.pron ? { lemma: s.nomen.lemma, gender: s.gender || s.nomen.gender, weak: s.nomen.weak } : null);
    const datS = nps.find((s) => s.rolle === "dat");
    const akkS = nps.find((s) => s.rolle === "akk");
    const cfg = {
      satzart: satzart === "imperativ" ? "imperativ" : satzart,
      verneinung,
      tense: passiv ? "praesens" : tense,
      subj: subj && subj.typ !== "w" ? (subj.pron ? { pronomen: { id: low(subj.text), form: subj.text } } : { nomen: nomenVon(subj) }) : null,
      verb: cfgVerb,
      verbUnbekannt,
      auxOverride: "",
      dat: datS ? { nomen: nomenVon(datS) } : null,
      akk: akkS ? { nomen: nomenVon(akkS), istPerson: false } : null,
      modal,
      passiv,
    };
    return { cfg, r };
  }

  if (typeof window !== "undefined") window.DE_SATZ_ANALYSE = analysiere;
  if (typeof module !== "undefined") module.exports = { analysiere, _reset: () => (LEX = null) };
})();
