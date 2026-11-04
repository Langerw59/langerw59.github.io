// =============================================================
// de_script.js – Deutscher Satzgenerator nach Satzgliedern
// EN: German sentence generator built from sentence constituents
// RU: Немецкий генератор предложений по членам предложения
// -------------------------------------------------------------
// Version 2 (2026-11-02). Alte Version: _BACKUPS/generator_de_2026-11-02/
// Aufbau: Wer? → Was tut …? → Wem? → Wen/Was? → Wann? → Wie? → Wo/Wohin?
// Zeitformen: Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I, Futur II
// Satzarten: Aussagesatz, Ja/Nein-Frage, W-Frage (+ Verneinung)
// =============================================================

(() => {
  "use strict";

  // ------------------------------------------------------------
  // Hilfsverben – feste Tabellen
  // ------------------------------------------------------------
  const AUX = {
    sein: {
      praesens: { ich: "bin", du: "bist", er: "ist", wir: "sind", ihr: "seid", sie: "sind" },
      praeteritum: { ich: "war", du: "warst", er: "war", wir: "waren", ihr: "wart", sie: "waren" },
    },
    haben: {
      praesens: { ich: "habe", du: "hast", er: "hat", wir: "haben", ihr: "habt", sie: "haben" },
      praeteritum: { ich: "hatte", du: "hattest", er: "hatte", wir: "hatten", ihr: "hattet", sie: "hatten" },
    },
    werden: {
      praesens: { ich: "werde", du: "wirst", er: "wird", wir: "werden", ihr: "werdet", sie: "werden" },
    },
  };

  const ZEITFORMEN = {
    praesens: "Präsens",
    praeteritum: "Präteritum",
    perfekt: "Perfekt",
    plusquamperfekt: "Plusquamperfekt",
    futur1: "Futur I",
    futur2: "Futur II",
  };

  const BEWEGUNG = ["gehen", "fahren", "kommen", "laufen", "rennen", "steigen"];

  // ------------------------------------------------------------
  // Kleine Helfer
  // ------------------------------------------------------------
  const arr = (x) => (Array.isArray(x) ? x : []);
  const g = (name) => (typeof window !== "undefined" ? window[name] : undefined);
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  function verbInf(v) {
    return (v && (v.inf || v.infinitiv)) || "";
  }

  // Formen-Tabelle normalisieren: er_sie_es → er, sie_Sie → sie
  function formen(tab, key) {
    if (!tab) return "";
    if (tab[key]) return tab[key];
    if (key === "er") return tab.er_sie_es || tab.er || "";
    if (key === "sie") return tab.sie_Sie || tab.sie || "";
    return "";
  }

  // Personen-Schlüssel aus Pronomen-Objekt (ich, du, er, wir, ihr, sie)
  function personKeyPronomen(p) {
    if (!p) return "er";
    if (p.id === "sie_pl" || p.id === "Sie_formal") return "sie";
    if (p.id === "sie" || p.id === "es" || p.id === "er") return "er";
    return p.id;
  }

  // ------------------------------------------------------------
  // Prädikat bilden: finites Verb + Teile am Satzende
  // ------------------------------------------------------------
  function praedikat(verb, tense, key, auxWahl) {
    const inf = verbInf(verb);
    const part = verb.partizip2 || verb.partizip || "";
    const pres = verb.praesens || verb.presens;
    const auxInf = auxWahl; // "sein" | "haben"
    switch (tense) {
      case "praeteritum":
        return { finit: formen(verb.praeteritum, key), rechts: [], auxInf: null };
      case "perfekt":
        return { finit: AUX[auxInf].praesens[key], rechts: [part], auxInf };
      case "plusquamperfekt":
        return { finit: AUX[auxInf].praeteritum[key], rechts: [part], auxInf };
      case "futur1":
        return { finit: AUX.werden.praesens[key], rechts: [inf], auxInf: "werden" };
      case "futur2":
        return { finit: AUX.werden.praesens[key], rechts: [part, auxInf], auxInf };
      default:
        return { finit: formen(pres, key) || inf, rechts: [], auxInf: null };
    }
  }

  // Hilfsverb für Perfekt bestimmen (mit Begründung)
  function hilfsverbWahl(verb, hatAkk, override) {
    if (override === "sein" || override === "haben") {
      return { aux: override, grund: "von Hand gewählt" };
    }
    const inf = verbInf(verb);
    const base = verb.perfektAux || (verb.usesSein ? "sein" : "haben");
    if (base === "sein" && hatAkk && arr(g("DE_SEIN_ZU_HABEN_MIT_AKK")).includes(inf)) {
      return { aux: "haben", grund: `„${inf}“ mit Akkusativobjekt → haben (Ich habe das Auto gefahren.)` };
    }
    if (base === "sein") {
      return { aux: "sein", grund: `„${inf}“ ist Bewegung / Zustandsänderung → sein` };
    }
    return { aux: "haben", grund: "Standardregel → haben" };
  }

  // ------------------------------------------------------------
  // HAUPTFUNKTION: Satz aus Satzgliedern bauen
  // cfg = {
  //   satzart: "aussage" | "frage" | "wfrage", verneinung: bool, tense,
  //   subj: { pronomen } | { nomen, art, adj },
  //   verb, auxOverride,
  //   dat: { nomen, art, adj } | null,
  //   akk: { nomen, art, adj, istPerson } | null,
  //   zeit: { wort, gruppe } | null,
  //   art:  { wort } | null,
  //   ort:  { text, frage } | null,
  //   fragNach: "subj" | "dat" | "akk" | "zeit" | "art" | "ort"
  // }
  // Rückgabe: { text, segmente: [{text, rolle, info}], felder, aux, hinweise }
  // ------------------------------------------------------------
  function bauen(cfg) {
    const G = g("DE_GRAMMATIK");
    const hinweise = [];
    const verb = cfg.verb;
    if (!verb) return { fehler: "Bitte ein Verb wählen (Was tut …?)." };
    if (!cfg.subj) return { fehler: "Bitte ein Subjekt wählen (Wer?)." };

    const wfrage = cfg.satzart === "wfrage";
    const fragNach = wfrage ? cfg.fragNach : null;
    if (wfrage && !fragNach) return { fehler: "Bitte wählen: Wonach wird gefragt?" };

    // ---- Subjekt ----
    let subjText, key, subjInfo;
    if (cfg.subj.pronomen) {
      subjText = cfg.subj.pronomen.form;
      key = personKeyPronomen(cfg.subj.pronomen);
      subjInfo = "Personalpronomen, Nominativ";
    } else {
      subjText = G.nomengruppe(cfg.subj.nomen, cfg.subj.art, cfg.subj.adj, "nom");
      key = cfg.subj.nomen.gender === "pl" ? "sie" : "er";
      subjInfo = "Nomengruppe, Nominativ";
    }
    if (fragNach === "subj") key = "er"; // Wer geht …? (immer 3. Person Singular)

    // ---- Negation mit „kein“ statt „nicht“ ----
    let akk = cfg.akk;
    let kein = false;
    if (cfg.verneinung && akk && fragNach !== "akk") {
      const t = akk.art ? akk.art.typ : "none";
      const unbestimmt = t === "none" || (akk.art && akk.art.stamm === "ein");
      if (unbestimmt) {
        akk = Object.assign({}, akk, { art: { typ: "ein", stamm: "kein" } });
        kein = true;
      }
    }

    // ---- Prädikat ----
    const hv = hilfsverbWahl(verb, !!akk, cfg.auxOverride);
    const hvAuto = hilfsverbWahl(verb, !!akk, "");
    const zusammengesetzt = ["perfekt", "plusquamperfekt", "futur2"].includes(cfg.tense);
    if (zusammengesetzt && cfg.auxOverride && cfg.auxOverride !== hvAuto.aux) {
      const inf0 = verbInf(verb);
      const p2 = verb.partizip2 || verb.partizip || "";
      hv.falsch = hvAuto.aux;
      hinweise.push(hvAuto.aux === "sein"
        ? `⚠ Achtung: „${inf0}“ ist ein Bewegungsverb (Ortswechsel) → Perfekt mit „sein“: „ich bin ${p2}“, nicht „ich habe ${p2}“. / Внимание: «${inf0}» — глагол движения, поэтому вспомогательный глагол «sein»: «ich bin ${p2}». «Ich habe ${p2}» — ошибка (так говорят только в диалекте).`
        : `⚠ Achtung: „${inf0}“ bildet das Perfekt mit „haben“: „ich habe ${p2}“, nicht „ich bin ${p2}“. / Внимание: «${inf0}» — не глагол движения (или есть Akkusativobjekt), поэтому «haben»: «ich habe ${p2}».`);
    }
    const pr = praedikat(verb, cfg.tense, key, hv.aux);
    if (!pr.finit) return { fehler: "Für dieses Verb fehlt die Form in der Datenbank." };

    // ---- Satzglieder als Segmente ----
    const seg = (text, rolle, info) => ({ text, rolle, info: info || "" });
    const S = {};
    S.subj = seg(subjText, "subj", subjInfo);
    if (cfg.dat) S.dat = seg(G.nomengruppe(cfg.dat.nomen, cfg.dat.art, cfg.dat.adj, "dat"), "dat", "Dativ");
    if (akk) S.akk = seg(G.nomengruppe(akk.nomen, akk.art, akk.adj, "akk"), "akk", kein ? "Akkusativ · Verneinung mit „kein“" : "Akkusativ");
    if (cfg.zeit) S.zeit = seg(cfg.zeit.wort, "zeit", cfg.zeit.gruppe === "frequency" ? "Wie oft?" : "Wann?");
    if (cfg.art) S.art = seg(cfg.art.wort, "art", "Wie?");
    if (cfg.ort) S.ort = seg(cfg.ort.text, "ort", cfg.ort.frage);

    // ---- Fragewort ----
    let fragewort = null;
    if (wfrage) {
      if (!S[fragNach]) return { fehler: "Das Satzglied, nach dem gefragt wird, ist nicht ausgewählt." };
      let w;
      switch (fragNach) {
        case "subj": w = "wer"; break;
        case "dat": w = "wem"; break;
        case "akk": w = cfg.akk.istPerson ? "wen" : "was"; break;
        case "zeit": w = cfg.zeit.gruppe === "frequency" ? "wie oft" : "wann"; break;
        case "art": w = "wie"; break;
        case "ort": w = (cfg.ort.frage || "Wo?").replace("?", "").toLowerCase(); break;
      }
      fragewort = seg(w, fragNach, "Fragewort für " + g("DE_SATZGLIEDER")[fragNach].name);
      delete S[fragNach];
    }

    // ---- Mittelfeld: Zeit – Dativ – (bestimmtes Akk) – Art – (unbestimmtes Akk) – Ort ----
    const akkBestimmt = akk && akk.art && (akk.art.typ === "def" || (akk.art.typ === "ein" && akk.art.stamm !== "ein" && akk.art.stamm !== "kein"));
    const mittel = [];
    const negNicht = cfg.verneinung && !kein;
    const nicht = seg("nicht", "neg", "Negation");
    const freq = cfg.zeit && cfg.zeit.gruppe === "frequency";

    if (S.zeit) { if (negNicht && freq) mittel.push(nicht); mittel.push(S.zeit); }
    if (S.dat) mittel.push(S.dat);
    if (S.akk && akkBestimmt) mittel.push(S.akk);
    if (negNicht && !freq) mittel.push(nicht);
    if (S.art) mittel.push(S.art);
    if (S.akk && !akkBestimmt) mittel.push(S.akk);
    if (S.ort) mittel.push(S.ort);

    const finit = seg(pr.finit, "pred", "finites Verb (2. Stelle)");
    const rechts = pr.rechts.map((r, i) =>
      seg(r, "pred", pr.rechts.length === 2 && i === 1 ? "Hilfsverb im Infinitiv" : (r === verbInf(verb) ? "Infinitiv" : "Partizip II"))
    );

    // ---- Felder: Vorfeld | linke Klammer | Mittelfeld | rechte Klammer ----
    let vorfeld = [], mf = [];
    if (cfg.satzart === "frage") {
      vorfeld = [];
      mf = [S.subj, ...mittel];
      finit.info = "finites Verb (1. Stelle – Ja/Nein-Frage)";
    } else if (wfrage) {
      vorfeld = [fragewort];
      mf = (S.subj ? [S.subj] : []).concat(mittel);
    } else {
      vorfeld = [S.subj];
      mf = mittel;
    }
    const alle = [...vorfeld, finit, ...mf, ...rechts];
    let text = alle.map((s) => s.text).join(" ");
    text = capFirst(text) + (cfg.satzart === "aussage" ? "." : "?");

    // ---- Hinweise ----
    const inf = verbInf(verb);
    const val = (g("DE_VERB_VALENZ") || {})[inf] || {};
    if (BEWEGUNG.includes(inf) && !cfg.ort && fragNach !== "ort") {
      hinweise.push("Bewegungsverb ohne Ziel – mit „Wohin?“ (z. B. nach Hause) klingt der Satz vollständiger.");
    }
    if (val.dat === "pflicht" && !cfg.dat) hinweise.push(`„${inf}“ braucht normalerweise ein Dativobjekt (Wem?).`);
    if (val.akk === "pflicht" && !cfg.akk) hinweise.push(`„${inf}“ braucht normalerweise ein Akkusativobjekt (Wen/Was?).`);

    return {
      text,
      segmente: alle,
      felder: { vorfeld, links: [finit], mittel: mf, rechts },
      aux: (cfg.tense === "perfekt" || cfg.tense === "plusquamperfekt" || cfg.tense === "futur2") ? hv : null,
      hinweise,
      zeitform: ZEITFORMEN[cfg.tense] || cfg.tense,
      key,          // Person (ich, du, er, wir, ihr, sie) – für Erklärungen
      hv,           // Hilfsverb-Wahl (immer), für Erklärungen
      kein,         // Verneinung mit „kein“?
    };
  }

  // Für Tests / spätere Satzanalyse verfügbar machen
  if (typeof window !== "undefined") window.DE_SATZ_ENGINE = { bauen, praedikat, hilfsverbWahl, ZEITFORMEN, formen, verbInf };
  if (typeof module !== "undefined") module.exports = { bauen, praedikat, hilfsverbWahl, ZEITFORMEN, formen, verbInf };
  if (typeof document === "undefined") return;

  // =============================================================
  // OBERFLÄCHE / UI
  // =============================================================
  const $ = (id) => document.getElementById(id);

  function opt(sel, value, text) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = text;
    sel.appendChild(o);
    return o;
  }
  function group(sel, label) {
    const og = document.createElement("optgroup");
    og.label = label;
    sel.appendChild(og);
    return og;
  }
  function optIn(parent, value, text) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = text;
    parent.appendChild(o);
    return o;
  }

  function fillArtikel(sel, mitOhne) {
    sel.innerHTML = "";
    arr(g("DE_ARTIKEL_TYPEN")).forEach((a) => {
      if (!mitOhne && a.typ === "none") return;
      opt(sel, a.id, a.label);
    });
  }
  function fillAdjektiv(sel) {
    sel.innerHTML = "";
    opt(sel, "", "— (ohne Adjektiv) —");
    arr(g("DE_ADJECTIVES")).forEach((a) => opt(sel, a.base, a.base));
  }
  function artikelById(id) {
    return arr(g("DE_ARTIKEL_TYPEN")).find((a) => a.id === id) || null;
  }

  // Liste der Nomen für Akkusativ: Personen + Dinge
  let AKK_LISTE = [];
  function bauAkkListe() {
    const pers = arr(g("DE_PERSONEN")).map((p) => Object.assign({}, p, { istPerson: true }));
    const weak = g("DE_SCHWACHE_NOMEN") || {};
    const plural = g("DE_PLURAL_NOMEN") || {};
    const persLemmas = arr(g("DE_PERSONEN_LEMMAS"));
    const persSet = new Set(pers.map((p) => p.lemma + "|" + p.gender));
    const dinge = arr(g("DE_NOUNS"))
      .map((n) => {
        const o = { lemma: n.lemma, gender: n.gender, istPerson: persLemmas.includes(n.lemma) };
        if (weak[n.lemma]) o.weak = weak[n.lemma];
        if (plural[n.lemma]) { o.gender = "pl"; o.datPl = plural[n.lemma]; }
        return o;
      })
      .filter((n) => !persSet.has(n.lemma + "|" + n.gender));
    AKK_LISTE = pers.concat(dinge);
  }
  const genLabel = (n) => (n.gender === "pl" ? "Pl." : { m: "der", f: "die", n: "das" }[n.gender]);

  function fillNomenSelect(sel, liste, mitDingen) {
    sel.innerHTML = "";
    opt(sel, "", "— (keins) —");
    const gp = group(sel, "Personen");
    liste.forEach((n, i) => {
      if (n.istPerson) optIn(gp, String(i), `${n.label || n.lemma} (${genLabel(n)})`);
    });
    if (mitDingen) {
      const gd = group(sel, "Dinge");
      liste.forEach((n, i) => {
        if (n.istPerson === false) optIn(gd, String(i), `${n.lemma} (${genLabel(n)})`);
      });
    }
  }

  function readNomenGruppe(prefix, liste) {
    const v = $(prefix + "Nomen").value;
    if (v === "") return null;
    const nomen = liste[Number(v)];
    const art = artikelById($(prefix + "Art").value);
    return { nomen, art, adj: $(prefix + "Adj").value || "", istPerson: !!nomen.istPerson };
  }

  // Felder sperren, die zum Verb nicht passen
  function updateValenz() {
    const verbs = arr(g("DE_VERBS_MAIN"));
    const v = verbs[Number($("sgVerb").value)];
    const info = $("sgVerbInfo");
    const val = v ? (g("DE_VERB_VALENZ") || {})[verbInf(v)] : null;
    const setze = (prefix, wert) => {
      const box = $(prefix + "Box");
      const aus = val && wert === false;
      ["Nomen", "Art", "Adj"].forEach((s) => ($(prefix + s).disabled = aus));
      if (aus) $(prefix + "Nomen").value = "";
      box.classList.toggle("sg-off", !!aus);
      const tag = $(prefix + "Tag");
      tag.textContent = !val ? "" : wert === "pflicht" ? "nötig" : wert === "optional" ? "möglich" : "passt nicht";
    };
    setze("sgDat", val ? val.dat : undefined);
    setze("sgAkk", val ? val.akk : undefined);
    if (!v) { info.textContent = ""; return; }
    const teile = [];
    if (val) {
      if (val.dat) teile.push("Wem?" + (val.dat === "optional" ? " (optional)" : ""));
      if (val.akk) teile.push("Wen/Was?" + (val.akk === "optional" ? " (optional)" : ""));
      if (val.ort) teile.push(val.ort.charAt(0).toUpperCase() + val.ort.slice(1) + "?");
    }
    info.textContent = `${verbInf(v)} · Perfekt mit „${v.perfektAux || "haben"}“` + (teile.length ? " · fragt: " + teile.join(", ") : " · ohne Objekt");
    updateFragNach();
  }

  function updateSubjektArt() {
    const v = $("sgSubj").value;
    const istNomen = v.startsWith("n:");
    $("sgSubjExtra").style.display = istNomen ? "" : "none";
  }

  // W-Frage: Liste der möglichen Satzglieder
  function updateFragNach() {
    const sel = $("sgFragNach");
    const row = $("sgFragNachRow");
    const w = $("sgSatzart").value === "wfrage";
    row.style.display = w ? "" : "none";
    if (!w) return;
    const alt = sel.value;
    sel.innerHTML = "";
    const SG = g("DE_SATZGLIEDER");
    const da = {
      subj: !!$("sgSubj").value,
      dat: !!$("sgDatNomen").value,
      akk: !!$("sgAkkNomen").value,
      zeit: !!$("sgZeit").value,
      art: !!$("sgWie").value,
      ort: !!$("sgOrt").value,
    };
    Object.keys(da).forEach((k) => {
      if (da[k]) opt(sel, k, `${SG[k].frage} – ${SG[k].name}`);
    });
    if ([...sel.options].some((o) => o.value === alt)) sel.value = alt;
  }

  function readCfg() {
    const pronomen = arr(g("DE_PRONOUNS"));
    const personen = arr(g("DE_PERSONEN"));
    const verbs = arr(g("DE_VERBS_MAIN"));
    const adverbs = arr(g("DE_ADVERBS"));
    const patterns = arr(g("DE_PREP_PATTERNS"));

    let subj = null;
    const sv = $("sgSubj").value;
    if (sv.startsWith("p:")) subj = { pronomen: pronomen[Number(sv.slice(2))] };
    else if (sv.startsWith("n:")) {
      subj = { nomen: personen[Number(sv.slice(2))], art: artikelById($("sgSubjArt").value), adj: $("sgSubjAdj").value || "" };
    }

    const zv = $("sgZeit").value;
    const zeit = zv ? adverbs.find((a) => a.id === zv) : null;
    const wv = $("sgWie").value;
    const wie = wv ? adverbs.find((a) => a.id === wv) : null;

    const ov = $("sgOrt").value;
    let ort = null;
    if (ov.startsWith("p:")) {
      const p = patterns.find((x) => x.id === ov.slice(2));
      if (p) ort = { text: p.phrase, frage: p.question };
    } else if (ov.startsWith("a:")) {
      const a = adverbs.find((x) => x.id === ov.slice(2));
      if (a) ort = { text: a.base, frage: "Wo?" };
    }

    const datListe = personen.map((p) => Object.assign({}, p, { istPerson: true }));

    return {
      satzart: $("sgSatzart").value,
      verneinung: $("sgNeg").checked,
      tense: $("sgZeitform").value,
      subj,
      verb: verbs[Number($("sgVerb").value)] || null,
      auxOverride: $("sgAux").value,
      dat: readNomenGruppe("sgDat", datListe),
      akk: readNomenGruppe("sgAkk", AKK_LISTE),
      zeit: zeit ? { wort: zeit.base, gruppe: zeit.group } : null,
      art: wie ? { wort: wie.base } : null,
      ort,
      fragNach: $("sgFragNach").value,
    };
  }

  // ------------------------------------------------------------
  // Ausgabe: farbiger Satz + Satzklammer + Tabelle
  // ------------------------------------------------------------
  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function zeigeErgebnis(r, cfg) {
    const SG = g("DE_SATZGLIEDER");
    const out = $("deSentenceOutput");
    const ana = $("sgAnalyse");
    const msg = $("de_generator_message");

    if (r.fehler) {
      out.textContent = r.fehler;
      ana.innerHTML = "";
      msg.textContent = "";
      return;
    }
    out.textContent = r.text;

    const chip = (s, first) => {
      const t = first ? capFirst(s.text) : s.text;
      return `<span class="sg-chip" style="--c:${SG[s.rolle].farbe}" title="${esc(SG[s.rolle].name + (s.info ? " – " + s.info : ""))}">${esc(t)}</span>`;
    };

    // 0) Alarm (falsches Hilfsverb usw.) – gut sichtbar ganz oben
    const alarme = (r.hinweise || []).filter((h) => h.startsWith("⚠"));
    let html = alarme.map((a) => `<div class="sl-alarm">${esc(a)}</div>`).join("");
    // 1) farbiger Satz
    html += `<div class="sg-farbsatz">${r.segmente.map((s, i) => chip(s, i === 0)).join(" ")}<span class="sg-punkt">${r.text.slice(-1)}</span></div>`;

    // 2) Satzklammer
    const f = r.felder;
    const zelle = (titel, liste, klasse) =>
      `<div class="sg-feld ${klasse}"><div class="sg-feld-t">${titel}</div><div>${liste.length ? liste.map((s) => chip(s, false)).join(" ") : "<span class='sg-leer'>—</span>"}</div></div>`;
    html += `<div class="sg-klammer">
      ${zelle("Vorfeld<br><small>Pos. 1</small>", f.vorfeld, "")}
      ${zelle("Verb<br><small>Pos. 2 · linke Klammer</small>", f.links, "sg-k")}
      ${zelle("Mittelfeld", f.mittel, "sg-mf")}
      ${zelle("Satzende<br><small>rechte Klammer</small>", f.rechts, "sg-k")}
    </div>`;

    // 3) Tabelle
    const zeilen = r.segmente.map((s) => {
      const d = SG[s.rolle];
      return `<tr><td><span class="sg-dot" style="background:${d.farbe}"></span>${esc(d.name)}<br><small>${esc(d.ru)}</small></td><td>${esc(d.frage)}</td><td><b>${esc(s.text)}</b></td><td>${esc(s.info)}</td></tr>`;
    });
    html += `<table class="sg-tab"><thead><tr><th>Satzglied</th><th>Frage</th><th>Wörter</th><th>Info</th></tr></thead><tbody>${zeilen.join("")}</tbody></table>`;
    html += `<div class="sg-meta">Zeitform: <b>${esc(r.zeitform)}</b>${r.aux ? ` · Hilfsverb: <b>${esc(r.aux.aux)}</b> (${esc(r.aux.grund)})${r.aux.falsch ? ` · <b style="color:#d1242f">richtig wäre: ${esc(r.aux.falsch)}</b>` : ""}` : ""}</div>`;
    // 4) Ausführliche Erklärungen auf Russisch (de_erklaerung.js)
    if (typeof window.DE_ERKLAERUNG === "function") {
      try { html += window.DE_ERKLAERUNG(cfg, r); } catch (e) { console.warn("Erklärung:", e); }
    }
    ana.innerHTML = html;

    msg.innerHTML = r.hinweise.filter((h) => !h.startsWith("⚠")).map(esc).join("<br>");
  }

  function generieren(sprechen) {
    const cfg = readCfg();
    const r = bauen(cfg);
    zeigeErgebnis(r, cfg);
    const box = $("translationDeBox");
    if (box) box.textContent = r.text || "–";
    if (sprechen && r.text && typeof LG_TTS !== "undefined") LG_TTS.speak(r.text);
    return r;
  }

  // ------------------------------------------------------------
  // Modus „Satz eingeben“ – Analyse eines eigenen Satzes
  // RU: режим «ввести предложение» – разбор своего предложения
  // ------------------------------------------------------------
  const BEISPIELE = [
    "Er läuft heute nach Hause.",
    "Ich bin gestern nach Hause gegangen.",
    "Ich habe gelaufen.",
    "Mein Sohn hat seiner Oma einen Brief gebracht.",
    "Den Apfel isst der Mann.",
    "Gehst du morgen in die Stadt?",
    "Wohin fährt die Frau?",
    "Wir werden morgen Fußball spielen.",
    "Ich will heute nicht arbeiten.",
    "Das Kind ist sehr müde.",
    "Ich habe keinen Hunger.",
    "Als er nach Hause kam, schlief seine Frau schon.",
  ];

  function analysieren(sprechen) {
    const txt = $("slEingabe").value;
    if (typeof window.DE_SATZ_ANALYSE !== "function") {
      $("deSentenceOutput").textContent = "de_satz_analyse.js fehlt.";
      return;
    }
    const { cfg, r } = window.DE_SATZ_ANALYSE(txt);
    zeigeErgebnis(r, cfg);
    const box = $("translationDeBox");
    if (box) box.textContent = r.text || "–";
    if (sprechen && r.text && typeof LG_TTS !== "undefined") LG_TTS.speak(r.text);
  }

  function setzeModus(m) {
    document.querySelectorAll(".sl-tab").forEach((b) => b.classList.toggle("active", b.dataset.mode === m));
    $("slModeBauen").style.display = m === "bauen" ? "" : "none";
    $("slModeEingabe").style.display = m === "eingabe" ? "" : "none";
    try { localStorage.setItem("satzlabor_modus", m); } catch (e) { /* egal */ }
  }

  function initEingabe() {
    if (!$("slEingabe")) return;
    document.querySelectorAll(".sl-tab").forEach((b) => b.addEventListener("click", () => setzeModus(b.dataset.mode)));
    $("slAnalyseBtn").addEventListener("click", () => analysieren(false));
    $("slEingabeLeeren").addEventListener("click", () => { $("slEingabe").value = ""; $("slEingabe").focus(); });
    $("slEingabe").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); analysieren(false); } });
    const bx = $("slBeispiele");
    BEISPIELE.forEach((b) => {
      const k = document.createElement("button");
      k.type = "button";
      k.textContent = b;
      k.addEventListener("click", () => { $("slEingabe").value = b; analysieren(false); });
      bx.appendChild(k);
    });
    $("slUebernehmen").addEventListener("click", () => {
      const r = generieren(false);
      if (!r || !r.text) return;
      $("slEingabe").value = r.text;
      setzeModus("eingabe");
      analysieren(false);
    });
    let m = "bauen";
    try { m = localStorage.getItem("satzlabor_modus") || "bauen"; } catch (e) { /* egal */ }
    if (location.hash === "#eingabe") m = "eingabe";
    setzeModus(m);
  }

  // ------------------------------------------------------------
  // TTS (wie bisher)
  // ------------------------------------------------------------
  function initTts() {
    if (typeof LG_TTS === "undefined") return;
    LG_TTS.setLanguage("de-DE");
    const satz = () => ($("deSentenceOutput") || {}).textContent || "";
    const slider = $("ttsRateSlider");
    if (slider) {
      LG_TTS.setRate(parseFloat(slider.value) || 1);
      slider.addEventListener("input", () => LG_TTS.setRate(parseFloat(slider.value)));
    }
    const rate = (id, r) => {
      const b = $(id);
      if (b) b.addEventListener("click", () => { LG_TTS.setRate(r); if (slider) slider.value = String(r); LG_TTS.speak(satz()); });
    };
    rate("ttsSlowBtn", 0.7);
    rate("ttsNormalBtn", 1.0);
    rate("ttsFastBtn", 1.3);
    const sp = $("ttsSpeakBtn");
    if (sp) sp.addEventListener("click", () => LG_TTS.speak(satz()));
    const st = $("ttsStopBtn");
    if (st) st.addEventListener("click", () => LG_TTS.stop());
    const tb = $("translationSpeakDeBtn");
    if (tb) tb.addEventListener("click", () => LG_TTS.speakInLang($("translationDeBox").textContent || "", "de-DE"));
  }

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------
  function init() {
    bauAkkListe();

    // Subjekt: Pronomen + Personen
    const sSubj = $("sgSubj");
    opt(sSubj, "", "— bitte wählen —");
    const gp = group(sSubj, "Pronomen");
    arr(g("DE_PRONOUNS")).forEach((p, i) => {
      const lbl = p.id === "sie_pl" ? "sie (Plural)" : p.id === "Sie_formal" ? "Sie (Höflichkeit)" : p.id === "sie" ? "sie (Singular)" : p.form;
      optIn(gp, "p:" + i, lbl);
    });
    const gn = group(sSubj, "Personen");
    arr(g("DE_PERSONEN")).forEach((p, i) => optIn(gn, "n:" + i, `${p.label || p.lemma} (${genLabel(p)})`));

    // Verb
    const sVerb = $("sgVerb");
    opt(sVerb, "", "— bitte wählen —");
    arr(g("DE_VERBS_MAIN")).forEach((v, i) => opt(sVerb, String(i), verbInf(v)));

    // Artikel + Adjektiv
    fillArtikel($("sgSubjArt"), true);
    fillArtikel($("sgDatArt"), true);
    fillArtikel($("sgAkkArt"), true);
    $("sgAkkArt").value = "ein";
    $("sgDatArt").value = "mein";
    $("sgSubjArt").value = "mein";
    ["sgSubjAdj", "sgDatAdj", "sgAkkAdj"].forEach((id) => fillAdjektiv($(id)));

    // Dativ: nur Personen
    const datListe = arr(g("DE_PERSONEN")).map((p) => Object.assign({}, p, { istPerson: true }));
    fillNomenSelect($("sgDatNomen"), datListe, false);
    // Akkusativ: Personen + Dinge
    fillNomenSelect($("sgAkkNomen"), AKK_LISTE, true);

    // Zeit (Wann? / Wie oft?), Art (Wie?), Ort
    const adverbs = arr(g("DE_ADVERBS"));
    const sZeit = $("sgZeit");
    opt(sZeit, "", "— (keine) —");
    const gz = group(sZeit, "Wann?");
    const gh = group(sZeit, "Wie oft?");
    adverbs.forEach((a) => {
      if (a.group === "time") optIn(gz, a.id, a.base);
      if (a.group === "frequency") optIn(gh, a.id, a.base);
    });
    const sWie = $("sgWie");
    opt(sWie, "", "— (keine) —");
    adverbs.filter((a) => a.group === "manner").forEach((a) => opt(sWie, a.id, a.base));

    const sOrt = $("sgOrt");
    opt(sOrt, "", "— (keine) —");
    const pats = arr(g("DE_PREP_PATTERNS"));
    ["Wohin?", "Wo?", "Woher?"].forEach((q) => {
      const og = group(sOrt, q);
      pats.filter((p) => p.question === q).forEach((p) => optIn(og, "p:" + p.id, `${p.phrase}  (${p.case === "akk" ? "Akk." : "Dat."})`));
      if (q === "Wo?") adverbs.filter((a) => a.group === "place").forEach((a) => optIn(og, "a:" + a.id, `${a.base}  (Adverb)`));
    });

    // Events
    $("sgVerb").addEventListener("change", updateValenz);
    $("sgSubj").addEventListener("change", () => { updateSubjektArt(); updateFragNach(); });
    ["sgSatzart", "sgDatNomen", "sgAkkNomen", "sgZeit", "sgWie", "sgOrt"].forEach((id) => $(id).addEventListener("change", updateFragNach));
    $("deGenerateBtn").addEventListener("click", () => generieren(true));
    $("deClearBtn").addEventListener("click", () => {
      ["sgSubj", "sgVerb", "sgDatNomen", "sgAkkNomen", "sgZeit", "sgWie", "sgOrt", "sgAux", "sgSubjAdj", "sgDatAdj", "sgAkkAdj"].forEach((id) => ($(id).selectedIndex = 0));
      $("sgNeg").checked = false;
      $("deSentenceOutput").textContent = "Noch kein Satz erzeugt …";
      $("sgAnalyse").innerHTML = "";
      $("de_generator_message").textContent = "";
      updateValenz();
      updateSubjektArt();
      updateFragNach();
      if (typeof LG_TTS !== "undefined") LG_TTS.stop();
    });

    updateSubjektArt();
    updateValenz();
    updateFragNach();
    initTts();
    initEingabe();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
