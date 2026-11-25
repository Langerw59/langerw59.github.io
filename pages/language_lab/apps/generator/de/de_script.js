// =============================================================
// de_script.js – Deutscher Satzgenerator nach Satzgliedern
// EN: German sentence generator built from sentence constituents
// RU: Немецкий генератор предложений по членам предложения
// -------------------------------------------------------------
// Version 2 (2026-11-02). Alte Version: _BACKUPS/generator_de_2026-11-02/
// 2026-11-18: sein / werden als Kopulaverb + das Prädikativ (Er war Pilot) + das Genitivattribut (Wessen?)
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

  // 2026-11-18: die Kopulaverben (das Kopulaverb, лат. copula – «связка»): sein, werden, bleiben
  //   Danach kommt kein Objekt, sondern das Prädikativ im Nominativ: Er war Pilot.
  const KOPULA_INF = ["sein", "werden", "bleiben"];
  const KOPULA_VERBEN = [
    { inf: "sein", infinitiv: "sein", kopula: true, konjugation: "unregelmäßig", perfektAux: "sein", usesSein: true,
      praesens: { ich: "bin", du: "bist", er: "ist", wir: "sind", ihr: "seid", sie: "sind" },
      praeteritum: { ich: "war", du: "warst", er: "war", wir: "waren", ihr: "wart", sie: "waren" },
      partizip2: "gewesen" },
    { inf: "werden", infinitiv: "werden", kopula: true, konjugation: "stark", perfektAux: "sein", usesSein: true, vokalwechsel: true,
      praesens: { ich: "werde", du: "wirst", er: "wird", wir: "werden", ihr: "werdet", sie: "werden" },
      praeteritum: { ich: "wurde", du: "wurdest", er: "wurde", wir: "wurden", ihr: "wurdet", sie: "wurden" },
      partizip2: "geworden" },
  ];
  // alle Verben für die Auswahl: Datenbank + sein / werden (Wert = Nummer in dieser Liste)
  let VERBEN_CACHE = null;
  function alleVerben() {
    if (!VERBEN_CACHE) VERBEN_CACHE = arr(g("DE_VERBS_MAIN")).concat(KOPULA_VERBEN);
    return VERBEN_CACHE;
  }
  const istKopula = (v) => !!v && KOPULA_INF.includes(v.inf || v.infinitiv);

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
        // 2026-11-25: trennbares Verb → die Vorsilbe ans Satzende (nahm … teil)
        return { finit: formen(verb.praeteritum, key), rechts: verb.trennbar && verb.prefix ? [verb.prefix] : [], auxInf: null };
      case "perfekt":
        return { finit: AUX[auxInf].praesens[key], rechts: [part], auxInf };
      case "plusquamperfekt":
        return { finit: AUX[auxInf].praeteritum[key], rechts: [part], auxInf };
      case "futur1":
        return { finit: AUX.werden.praesens[key], rechts: [inf], auxInf: "werden" };
      case "futur2":
        return { finit: AUX.werden.praesens[key], rechts: [part, auxInf], auxInf };
      default:
        return { finit: formen(pres, key) || inf, rechts: verb.trennbar && verb.prefix ? [verb.prefix] : [], auxInf: null };
    }
  }

  // Hilfsverb für Perfekt bestimmen (mit Begründung)
  function hilfsverbWahl(verb, hatAkk, override) {
    if (override === "sein" || override === "haben") {
      return { aux: override, grund: "von Hand gewählt" };
    }
    const inf = verbInf(verb);
    if (["sein", "werden", "bleiben"].includes(inf)) {
      return { aux: "sein", grund: `„${inf}“ bildet das Perfekt immer mit „sein“ (ist gewesen, ist geworden, ist geblieben)` };
    }
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

    // 2026-11-25: das Reflexivpronomen (sich freuen → ich freue mich)
    const REFL = { ich: "mich", du: "dich", er: "sich", wir: "uns", ihr: "euch", sie: "sich" };
    const reflexiv = !!verb.reflexiv || !!(cfg.pobj && cfg.pobj.reflexiv);
    if (reflexiv) S.refl = seg(REFL[key] || "sich", "refl", `Reflexivpronomen im Akkusativ (sich ${verbInf(verb)}: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch, sie/Sie → sich) · das reflexive Verb`);

    // 2026-11-25: das Präpositionalobjekt – die Kette das Verb → die Präposition → der Kasus → der Artikel
    if (cfg.pobj && cfg.pobj.nomen) {
      const po = cfg.pobj;
      let ng = G.nomengruppe(po.nomen, po.art, po.adj, po.k);
      let text = po.p + " " + ng;
      const VERS = { "an dem": "am", "an das": "ans", "in dem": "im", "in das": "ins", "zu dem": "zum", "zu der": "zur", "von dem": "vom", "bei dem": "beim", "um das": "ums", "für das": "fürs", "über das": "übers" };
      let vers = "";
      const zwei = text.split(" ").slice(0, 2).join(" ");
      if (po.art && po.art.typ === "def" && !po.adj && VERS[zwei] && ["am", "im", "zum", "zur", "vom", "beim", "ins", "ans"].includes(VERS[zwei])) {
        vers = ` · ${VERS[zwei]} = ${zwei} (слитная форма)`;
        text = VERS[zwei] + text.slice(zwei.length);
      }
      const artW = (text.split(" ")[1] || "");
      S.pobj = seg(text, "pobj",
        `Präpositionalobjekt · ${po.v}: ${verbInf(verb)} → ${po.p} → ${po.k === "akk" ? "Akkusativ" : "Dativ"}${artW ? " → " + artW : ""}${vers} · die Präposition gehört fest zum Verb (лучше учить вместе: ${po.v} + ${po.k === "akk" ? "Akk." : "Dat."})`);
    }

    // 2026-11-18: das Prädikativ (nach sein / werden / bleiben) – Nominativ
    let pkvKein = false;
    if (cfg.pkv && istKopula(verb)) {
      let pa = cfg.pkv.art;
      if (cfg.verneinung && fragNach !== "pkv" && (!pa || pa.typ === "none" || pa.stamm === "ein")) { pa = { typ: "ein", stamm: "kein" }; pkvKein = true; }
      const ohne = !pa || pa.typ === "none";
      S.pkv = seg(G.nomengruppe(cfg.pkv.nomen, pa, cfg.pkv.adj, "nom"), "pkv",
        "Prädikativ · Nominativ nach „" + verbInf(verb) + "“ (das Kopulaverb)" +
        (pkvKein ? " · Verneinung mit „kein“" : ohne ? " · der Beruf / die Rolle steht ohne Artikel (Er war Pilot.)" : ""));
    } else if (cfg.pkv) {
      hinweise.push("Das Prädikativ (Was ist er?) passt nur zu sein, werden, bleiben.");
    }
    // 2026-11-18: das Genitivattribut (Wessen? чей? чего?) – hängt an einem Nomen
    if (cfg.gen && cfg.gen.nomen) {
      const zu = cfg.gen.zu || "pkv";
      const ziel = S[zu];
      if (!ziel) {
        hinweise.push("„Wessen?“: Das Satzglied, zu dem das Genitivattribut gehört, ist nicht ausgewählt.");
      } else {
        const gt = G.nomengruppe(cfg.gen.nomen, cfg.gen.art, cfg.gen.adj, "gen");
        const n = cfg.gen.nomen;
        const artW = G.artikel(cfg.gen.art, n.gender, "gen");
        const regel = n.gender === "pl" ? "Plural: der/einer … + Nomen ohne Endung"
          : n.gender === "f" ? "Femininum: der/einer … + Nomen ohne Endung"
          : n.weak ? "schwaches Nomen (n-Deklination): -(e)n"
          : (n.gender === "m" ? "Maskulinum" : "Neutrum") + ": des/eines … + Nomen -" + (G.genitivNomen(n.lemma).endsWith("es") ? "es" : "s");
        ziel.text += " " + gt;
        ziel.info += " · Genitivattribut „" + gt + "“ (Wessen? чей? чего?) · der Genitiv – " + regel + (artW ? "" : " · ohne Artikel") + " · kein eigenes Satzglied, gehört zum Nomen davor";
      }
    }

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
        case "pkv": w = "was"; break; // Was war er? – Pilot.
        case "pobj": { // 2026-11-25: Worauf wartest du? / Auf wen wartest du?
          const po = cfg.pobj;
          if (po.nomen && po.nomen.istPerson) w = po.p + " " + (po.k === "akk" ? "wen" : "wem");
          else w = "wo" + (/^[aeiouäöü]/.test(po.p) ? "r" : "") + po.p;
          break;
        }
      }
      fragewort = seg(w, fragNach, "Fragewort für " + g("DE_SATZGLIEDER")[fragNach].name);
      delete S[fragNach];
    }

    // ---- Mittelfeld: Zeit – Dativ – (bestimmtes Akk) – Art – (unbestimmtes Akk) – Ort ----
    const akkBestimmt = akk && akk.art && (akk.art.typ === "def" || (akk.art.typ === "ein" && akk.art.stamm !== "ein" && akk.art.stamm !== "kein"));
    const mittel = [];
    const negNicht = cfg.verneinung && !kein && !pkvKein;
    const nicht = seg("nicht", "neg", "Negation");
    const freq = cfg.zeit && cfg.zeit.gruppe === "frequency";

    if (S.refl) mittel.push(S.refl); // das Reflexivpronomen steht gleich nach dem Verb / dem Subjekt
    if (S.zeit) { if (negNicht && freq) mittel.push(nicht); mittel.push(S.zeit); }
    if (S.dat) mittel.push(S.dat);
    if (S.akk && akkBestimmt) mittel.push(S.akk);
    if (negNicht && !freq) mittel.push(nicht);
    if (S.art) mittel.push(S.art);
    if (S.akk && !akkBestimmt) mittel.push(S.akk);
    if (S.ort) mittel.push(S.ort);
    if (S.pobj) mittel.push(S.pobj); // das Präpositionalobjekt steht meist am Ende des Mittelfelds
    if (S.pkv) mittel.push(S.pkv); // das Prädikativ steht am Ende des Mittelfelds (Er war gestern nicht müde.)

    const finit = seg(pr.finit, "pred", "finites Verb (2. Stelle)");
    const rechts = pr.rechts.map((r, i) =>
      seg(r, "pred", pr.rechts.length === 2 && i === 1 ? "Hilfsverb im Infinitiv" : (r === verbInf(verb) ? "Infinitiv" : (verb.trennbar && r === verb.prefix ? `abgetrennte Vorsilbe „${r}-“ (das trennbare Verb ${verbInf(verb)}) – steht am Satzende, ist KEINE Präposition` : "Partizip II")))
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
    const pIdx = (g("DE_VERB_PRAEP_INDEX") || {})[inf];
    if (pIdx && !cfg.pobj && fragNach !== "pobj") hinweise.push(`„${inf}“ hat oft eine feste Präposition: ${pIdx.map((x) => x.v + " + " + (x.k === "akk" ? "Akk." : "Dat.")).join(", ")} → wähle unten „das Präpositionalobjekt“.`);
    if (val.akk === "pflicht" && !cfg.akk) hinweise.push(`„${inf}“ braucht normalerweise ein Akkusativobjekt (Wen/Was?).`);
    if ((inf === "sein" || inf === "werden") && !cfg.pkv && !cfg.ort && !cfg.art) hinweise.push(`„${inf}“ ist hier ein Kopulaverb (глагол-связка) – wähle „Was ist …? – das Prädikativ“ (z. B. Pilot).`);

    return {
      text,
      segmente: alle,
      felder: { vorfeld, links: [finit], mittel: mf, rechts },
      aux: (cfg.tense === "perfekt" || cfg.tense === "plusquamperfekt" || cfg.tense === "futur2") ? hv : null,
      hinweise,
      zeitform: ZEITFORMEN[cfg.tense] || cfg.tense,
      key,          // Person (ich, du, er, wir, ihr, sie) – für Erklärungen
      hv,           // Hilfsverb-Wahl (immer), für Erklärungen
      kein: kein || pkvKein, // Verneinung mit „kein“?
    };
  }

  // Für Tests / spätere Satzanalyse verfügbar machen
  if (typeof window !== "undefined") window.DE_SATZ_ENGINE = { bauen, praedikat, hilfsverbWahl, ZEITFORMEN, formen, verbInf, alleVerben, istKopula };
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
        const o = { lemma: n.lemma, gender: n.gender, istPerson: persLemmas.includes(n.lemma), eigen: !!n.eigen };
        if (weak[n.lemma]) o.weak = weak[n.lemma];
        if (plural[n.lemma]) { o.gender = "pl"; o.datPl = plural[n.lemma]; }
        return o;
      })
      .filter((n) => !persSet.has(n.lemma + "|" + n.gender));
    AKK_LISTE = pers.concat(dinge);
  }
  const genLabel = (n) => (n.gender === "pl" ? "Pl." : { m: "der", f: "die", n: "das" }[n.gender]);

  // Optionen: ✏️ eigenes Nomen · Meine Wörter · Personen · Dinge
  // prefix: "" (Dativ/Akkusativ) oder "n:" (Subjekt)
  function fillNomenOptionen(sel, liste, mitDingen, prefix) {
    prefix = prefix || "";
    if (g("DE_EIGENE_NOMEN")) {
      opt(sel, "eigen", "✏️ eigenes Nomen eingeben … (der/die/das wird gesucht)");
      // 2026-11-18: „eingeben“ immer ganz oben (gleich nach „— bitte wählen —“), vor den Pronomen
      const e = sel.querySelector('option[value="eigen"]');
      const erste = sel.options[0];
      if (e && erste && erste !== e && erste.value === "" && erste.parentElement === sel) erste.after(e);
      else if (e && erste !== e) sel.prepend(e);
    }
    const meine = liste.map((n, i) => [n, i]).filter(([n]) => n.eigen);
    if (meine.length) {
      const gm = group(sel, "Meine Wörter");
      meine.forEach(([n, i]) => optIn(gm, prefix + i, `${n.lemma} (${genLabel(n)})`));
    }
    const gp = group(sel, "Personen");
    liste.forEach((n, i) => {
      if (n.istPerson && !n.eigen) optIn(gp, prefix + i, `${n.label || n.lemma} (${genLabel(n)})`);
    });
    if (mitDingen) {
      const gd = group(sel, "Dinge");
      liste.forEach((n, i) => {
        if (n.istPerson === false && !n.eigen) optIn(gd, prefix + i, `${n.lemma} (${genLabel(n)})`);
      });
    }
  }
  function fillNomenSelect(sel, liste, mitDingen) {
    sel.innerHTML = "";
    opt(sel, "", "— (keins) —");
    fillNomenOptionen(sel, liste, mitDingen, "");
  }
  function fillSubjekt() {
    const sSubj = $("sgSubj");
    sSubj.innerHTML = "";
    opt(sSubj, "", "— bitte wählen —");
    const gp = group(sSubj, "Pronomen");
    arr(g("DE_PRONOUNS")).forEach((p, i) => {
      const lbl = p.id === "sie_pl" ? "sie (Plural)" : p.id === "Sie_formal" ? "Sie (Höflichkeit)" : p.id === "sie" ? "sie (Singular)" : p.form;
      optIn(gp, "p:" + i, lbl);
    });
    fillNomenOptionen(sSubj, AKK_LISTE, true, "n:");
  }
  function fillAlleNomen() {
    fillSubjekt();
    fillNomenSelect($("sgDatNomen"), AKK_LISTE, false);
    fillNomenSelect($("sgAkkNomen"), AKK_LISTE, true);
    fillNomenSelect($("sgPkvNomen"), AKK_LISTE, true);
    fillNomenSelect($("sgPobjNomen"), AKK_LISTE, true);
    fillNomenSelect($("sgGenNomen"), AKK_LISTE, true);
  }

  function readNomenGruppe(prefix, liste) {
    const v = $(prefix + "Nomen").value;
    if (v === "" || v === "eigen") return null;
    const nomen = liste[Number(v)];
    const art = artikelById($(prefix + "Art").value);
    return { nomen, art, adj: $(prefix + "Adj").value || "", istPerson: !!nomen.istPerson };
  }

  // Felder sperren, die zum Verb nicht passen
  function updateValenz() {
    const verbs = alleVerben();
    const v = $("sgVerb").value === "" ? null : verbs[Number($("sgVerb").value)];
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
    // 2026-11-18: Prädikativ nur bei sein / werden / bleiben zeigen
    const kop = istKopula(v);
    $("sgPkvBox").hidden = !kop;
    if (!kop) $("sgPkvNomen").value = "";
    // 2026-11-25: das Präpositionalobjekt – nur bei Verben mit fester Präposition
    const pListe = v ? ((g("DE_VERB_PRAEP_INDEX") || {})[verbInf(v)] || []) : [];
    const pBox = $("sgPobjBox");
    if (pBox) {
      pBox.hidden = !pListe.length;
      const pw = $("sgPobjWahl");
      pw.innerHTML = "";
      pListe.forEach((x, i) => opt(pw, String(i), `${x.v} + ${x.k === "akk" ? "Akkusativ" : "Dativ"} – ${x.ru}`));
      pw.style.display = pListe.length > 1 ? "" : "none";
      if (!pListe.length) $("sgPobjNomen").value = "";
      updatePobjInfo();
    }
    updateGenZu();
    if (!v) { info.textContent = ""; return; }
    const teile = [];
    if (val) {
      if (val.dat) teile.push("Wem?" + (val.dat === "optional" ? " (optional)" : ""));
      if (val.akk) teile.push("Wen/Was?" + (val.akk === "optional" ? " (optional)" : ""));
      if (val.ort) teile.push(val.ort.charAt(0).toUpperCase() + val.ort.slice(1) + "?");
    }
    const KA = { stark: "das starke Verb", schwach: "das schwache Verb", gemischt: "das gemischte Verb", "unregelmäßig": "das unregelmäßige Verb" };
    const typ = [];
    if (KA[v.konjugation]) typ.push(KA[v.konjugation]);
    if (v.untrennbar) typ.push(`untrennbar (${v.untrennbar}-)`);
    if (v.trennbar) typ.push(`trennbar (${v.prefix}-)`);
    if (v.reflexiv) typ.push("reflexiv (sich)");
    if (v.vokalwechsel) typ.push(`Vokalwechsel: du ${formen(v.praesens, "du")}`);
    const prt = formen(v.praeteritum, "er");
    const stammformen = prt && (v.partizip2 || v.partizip) ? ` · ${verbInf(v)} – ${prt} – ${v.partizip2 || v.partizip}` : "";
    if (kop) teile.push("Was ist …? (das Prädikativ)");
    pListe.forEach((x) => teile.push(`${"wo" + (/^[aeiouäöü]/.test(x.p) ? "r" : "") + x.p}? (${x.p} + ${x.k === "akk" ? "Akk." : "Dat."})`));
    info.textContent = (kop ? "das Kopulaverb (глагол-связка) · " : "") + (typ.length ? typ.join(" · ") : verbInf(v)) + stammformen + ` · Perfekt mit „${kop ? "sein" : v.perfektAux || "haben"}“` + (teile.length ? " · fragt: " + teile.join(", ") : " · ohne Objekt");
    updateFragNach();
  }

  // 2026-11-25: die Zeile „warten → auf → Akkusativ“ in der Box Präpositionalobjekt
  function aktPobj() {
    const verbs = alleVerben();
    const v = $("sgVerb").value === "" ? null : verbs[Number($("sgVerb").value)];
    const liste = v ? ((g("DE_VERB_PRAEP_INDEX") || {})[verbInf(v)] || []) : [];
    return liste[Number($("sgPobjWahl").value) || 0] || null;
  }
  function updatePobjInfo() {
    const info = $("sgPobjInfo");
    if (!info) return;
    const x = aktPobj();
    if (!x) { info.innerHTML = ""; return; }
    const wo = "wo" + (/^[aeiouäöü]/.test(x.p) ? "r" : "") + x.p;
    info.innerHTML = `<b>${x.v.replace(/ \S+$/, "")}</b> → <b>${x.p}</b> → <b>${x.k === "akk" ? "der Akkusativ" : "der Dativ"}</b> → der Artikel · Frage: <b>${wo[0].toUpperCase() + wo.slice(1)}?</b> · ${x.ru} · <i>${x.en}</i>`
      + `<br><small>Beispiel: ${x.s} – ${x.sr}${x.h ? "<br>💡 " + x.h : ""}</small>`;
  }

  // 2026-11-18: „Wessen?“ – zu welchem Nomen gehört das Genitivattribut?
  function updateGenZu() {
    const sel = $("sgGenZu");
    if (!sel) return;
    const alt = sel.value;
    sel.innerHTML = "";
    const sv = $("sgSubj").value;
    const moegl = [];
    if (!$("sgPkvBox").hidden) moegl.push(["pkv", "zum Prädikativ (Pilot …)"]);
    if (sv.startsWith("n:")) moegl.push(["subj", "zum Subjekt (Wer?)"]);
    if (!$("sgAkkNomen").disabled) moegl.push(["akk", "zum Akkusativobjekt (Wen/Was?)"]);
    if (!$("sgDatNomen").disabled) moegl.push(["dat", "zum Dativobjekt (Wem?)"]);
    moegl.forEach(([v, t]) => opt(sel, v, t));
    if ([...sel.options].some((o) => o.value === alt)) sel.value = alt;
  }

  function updateSubjektArt() {
    const v = $("sgSubj").value;
    const istNomen = v.startsWith("n:") || v === "eigen";
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
      pkv: !$("sgPkvBox").hidden && !!$("sgPkvNomen").value,
      pobj: !!$("sgPobjBox") && !$("sgPobjBox").hidden && !!$("sgPobjNomen").value,
    };
    Object.keys(da).forEach((k) => {
      if (da[k]) opt(sel, k, k === "pkv" ? "Was? / Wer? – Prädikativ" : `${SG[k].frage} – ${SG[k].name}`);
    });
    if ([...sel.options].some((o) => o.value === alt)) sel.value = alt;
  }

  function readCfg() {
    const pronomen = arr(g("DE_PRONOUNS"));
    const personen = arr(g("DE_PERSONEN"));
    const verbs = alleVerben();
    const adverbs = arr(g("DE_ADVERBS"));
    const patterns = arr(g("DE_PREP_PATTERNS"));

    let subj = null;
    const sv = $("sgSubj").value;
    if (sv.startsWith("p:")) subj = { pronomen: pronomen[Number(sv.slice(2))] };
    else if (sv.startsWith("n:")) {
      subj = { nomen: AKK_LISTE[Number(sv.slice(2))], art: artikelById($("sgSubjArt").value), adj: $("sgSubjAdj").value || "" };
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

    return {
      satzart: $("sgSatzart").value === "verneinung" ? "aussage" : $("sgSatzart").value,
      verneinung: $("sgSatzart").value === "verneinung" || $("sgNeg").checked,
      tense: $("sgZeitform").value,
      subj,
      verb: $("sgVerb").value === "" ? null : verbs[Number($("sgVerb").value)] || null,
      auxOverride: $("sgAux").value,
      dat: readNomenGruppe("sgDat", AKK_LISTE),
      akk: readNomenGruppe("sgAkk", AKK_LISTE),
      pkv: $("sgPkvBox").hidden ? null : readNomenGruppe("sgPkv", AKK_LISTE),
      pobj: (() => { // 2026-11-25
        if (!$("sgPobjBox") || $("sgPobjBox").hidden) return null;
        const n = readNomenGruppe("sgPobj", AKK_LISTE); const x = aktPobj();
        return n && x ? Object.assign(n, { p: x.p, k: x.k, v: x.v, reflexiv: x.reflexiv }) : null;
      })(),
      gen: (() => { const n = readNomenGruppe("sgGen", AKK_LISTE); if (n) n.zu = $("sgGenZu").value; return n; })(),
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
    const RUF = (k) => (window.DE_RU_FELD ? `<br><small class="sg-ru-f">${window.DE_RU_FELD[k]}</small>` : "");
    html += `<div class="sg-klammer">
      ${zelle(`Vorfeld<br><small>Pos. 1</small>${RUF("vorfeld")}`, f.vorfeld, "")}
      ${zelle(`Verb<br><small>Pos. 2 · linke Klammer</small>${RUF("verb")}`, f.links, "sg-k")}
      ${zelle(`Mittelfeld${RUF("mittel")}`, f.mittel, "sg-mf")}
      ${zelle(`Satzende<br><small>rechte Klammer</small>${RUF("ende")}`, f.rechts, "sg-k")}
    </div>`;
    if (typeof window.DE_RU_KLAMMER === "function") html += window.DE_RU_KLAMMER();

    // 3) Tabelle
    const zeilen = r.segmente.map((s) => {
      const d = SG[s.rolle];
      return `<tr><td><span class="sg-dot" style="background:${d.farbe}"></span>${esc(d.name)}<br><small>${esc(d.ru)}</small></td><td>${esc(d.frage)}</td><td><b>${esc(s.text)}</b></td><td>${esc(s.info)}${window.DE_RU_INFO ? window.DE_RU_INFO(s.info) : ""}</td></tr>`;
    });
    html += `<table class="sg-tab"><thead><tr><th>Satzglied</th><th>Frage</th><th>Wörter</th><th>Info</th></tr></thead><tbody>${zeilen.join("")}</tbody></table>`;
    html += `<div class="sg-meta">Zeitform: <b>${esc(r.zeitform)}</b>${r.aux ? ` · Hilfsverb: <b>${esc(r.aux.aux)}</b> (${esc(r.aux.grund)})${r.aux.falsch ? ` · <b style="color:#d1242f">richtig wäre: ${esc(r.aux.falsch)}</b>` : ""}` : ""}</div>`;
    if (window.DE_RU_ZEITFORM) html += window.DE_RU_ZEITFORM(r.zeitform, !!r.aux);
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
    if ($("slModeTest")) $("slModeTest").style.display = m === "test" ? "" : "none";
    if (m === "test" && typeof window.DE_VERB_TEST_START === "function") window.DE_VERB_TEST_START();
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
    if (location.hash === "#test") m = "test";
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
  // Eigene Nomen: Eingabe-Box unter Wer? / Wem? / Wen-Was?
  // ------------------------------------------------------------
  const nomenSchluessel = (n) => (n ? n.lemma + "|" + n.gender : "");
  function initEigeneNomen() {
    const EN = g("DE_EIGENE_NOMEN");
    if (!EN) return;
    const slots = [
      { sel: "sgSubj", prefix: "n:", art: "sgSubjArt" },
      { sel: "sgDatNomen", prefix: "", art: "sgDatArt" },
      { sel: "sgAkkNomen", prefix: "", art: "sgAkkArt" },
      { sel: "sgPkvNomen", prefix: "", art: "sgPkvArt" },
      { sel: "sgPobjNomen", prefix: "", art: "sgPobjArt" },
      { sel: "sgGenNomen", prefix: "", art: "sgGenArt" },
    ];
    // Liste neu bauen, Auswahl in allen Feldern behalten
    function neuFuellen() {
      const merken = slots.map((sl) => {
        const v = $(sl.sel).value;
        if (sl.prefix && !v.startsWith(sl.prefix)) return { roh: v };
        if (v === "" || v === "eigen") return { roh: v };
        return { key: nomenSchluessel(AKK_LISTE[Number(v.slice(sl.prefix.length))]) };
      });
      bauAkkListe();
      fillAlleNomen();
      slots.forEach((sl, i) => {
        const m = merken[i];
        if (m.key) waehle(sl, m.key);
        else $(sl.sel).value = m.roh;
      });
    }
    function waehle(sl, key) {
      const i = AKK_LISTE.findIndex((n) => nomenSchluessel(n) === key);
      $(sl.sel).value = i >= 0 ? sl.prefix + i : "";
    }
    slots.forEach((sl) => {
      const sel = $(sl.sel);
      let vorher = sel.value;
      const bx = EN.box({
        nachSelect: sel,
        onFertig: (n) => {
          neuFuellen();
          waehle(sl, nomenSchluessel(n));
          vorher = sel.value;
          // Subjekt: statt „mein“ den bestimmten Artikel nehmen (die Sonne)
          if (sl.sel === "sgSubj" && $(sl.art).value === "mein") $(sl.art).value = "def";
          sel.dispatchEvent(new Event("change"));
        },
        onAbbruch: () => {
          sel.value = vorher === "eigen" ? "" : vorher;
          sel.dispatchEvent(new Event("change"));
        },
        onListe: neuFuellen,
      });
      sel.addEventListener("change", () => {
        if (sel.value === "eigen") bx.oeffnen();
        else { bx.schliessen(); vorher = sel.value; }
      });
    });
  }

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------
  function init() {
    bauAkkListe();

    // Subjekt: Pronomen + eigenes Nomen + Meine Wörter + Personen + Dinge
    fillSubjekt();

    // Verb
    const sVerb = $("sgVerb");
    opt(sVerb, "", "— bitte wählen —");
    // 2026-11-18: alphabetisch (der Wert bleibt die Nummer in DE_VERBS_MAIN)
    alleVerben().map((v, i) => ({ v, i })).sort((a, b) => verbInf(a.v).localeCompare(verbInf(b.v), "de")).forEach(({ v, i }) => opt(sVerb, String(i), verbInf(v)));

    // 2026-11-25: die Verb-Suche – tippen (auch langsam): war → warten; „sich freuen“ geht auch
    const suche = $("sgVerbSuche"), dl = $("sgVerbListe");
    if (suche && dl) {
      const liste = alleVerben().map((v, i) => ({ i, inf: verbInf(v), refl: !!v.reflexiv })).sort((a, b) => a.inf.localeCompare(b.inf, "de"));
      liste.forEach((x) => { const o = document.createElement("option"); o.value = x.inf; if (x.refl) o.label = "sich " + x.inf; dl.appendChild(o); });
      const finde = (t) => {
        t = t.trim().toLowerCase().replace(/^sich\s+/, "");
        if (!t) return null;
        return liste.find((x) => x.inf.toLowerCase() === t) || liste.find((x) => x.inf.toLowerCase().startsWith(t)) || liste.find((x) => x.inf.toLowerCase().includes(t)) || null;
      };
      const setze = (x) => {
        if (!x || sVerb.value === String(x.i)) return;
        sVerb.value = String(x.i);
        sVerb.dispatchEvent(new Event("change"));
      };
      suche.addEventListener("input", () => setze(finde(suche.value)));
      suche.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); const x = finde(suche.value); if (x) { setze(x); suche.value = x.inf; suche.blur(); } }
      });
      // umgekehrt: Verb im Menü gewählt → im Suchfeld anzeigen
      sVerb.addEventListener("change", () => { const x = liste.find((y) => String(y.i) === sVerb.value); if (document.activeElement !== suche) suche.value = x ? x.inf : ""; });
    }

    // Artikel + Adjektiv
    fillArtikel($("sgSubjArt"), true);
    fillArtikel($("sgDatArt"), true);
    fillArtikel($("sgAkkArt"), true);
    $("sgAkkArt").value = "ein";
    $("sgDatArt").value = "mein";
    $("sgSubjArt").value = "mein";
    // 2026-11-18: das Prädikativ (Standard: ohne Artikel – der Beruf) und das Genitivattribut (Standard: ein → eines)
    fillArtikel($("sgPkvArt"), true);
    fillArtikel($("sgGenArt"), true);
    fillArtikel($("sgPobjArt"), true);
    $("sgPobjArt").value = "def";
    $("sgPkvArt").value = "none";
    $("sgGenArt").value = "ein";
    ["sgSubjAdj", "sgDatAdj", "sgAkkAdj", "sgPkvAdj", "sgGenAdj", "sgPobjAdj"].forEach((id) => fillAdjektiv($(id)));

    // Dativ: Personen + Meine Wörter; Akkusativ: Personen + Dinge + Meine Wörter
    fillNomenSelect($("sgDatNomen"), AKK_LISTE, false);
    fillNomenSelect($("sgAkkNomen"), AKK_LISTE, true);
    fillNomenSelect($("sgPkvNomen"), AKK_LISTE, true);
    fillNomenSelect($("sgPobjNomen"), AKK_LISTE, true);
    fillNomenSelect($("sgGenNomen"), AKK_LISTE, true);
    initEigeneNomen();

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

    // 2026-11-25: „Warum?“ – Erklärung zur Ortsangabe (die Präposition → der Kasus → der Artikel)
    sOrt.addEventListener("change", () => {
      const box = $("sgOrtWarum"); if (!box) return;
      const v = sOrt.value;
      const p = v.startsWith("p:") ? pats.find((x) => x.id === v.slice(2)) : null;
      if (!p) { box.style.display = "none"; box.innerHTML = ""; return; }
      const DAT = ["aus", "bei", "mit", "nach", "seit", "von", "zu"];
      const WECHSEL = ["in", "an", "auf", "über", "unter", "vor", "hinter", "neben", "zwischen"];
      const VERS = { zum: "zu + dem", zur: "zu + der", im: "in + dem", ins: "in + das", am: "an + dem", ans: "an + das", vom: "von + dem", beim: "bei + dem" };
      const erstes = p.phrase.split(" ")[0];
      const kasus = p.case === "akk" ? "der Akkusativ" : "der Dativ";
      const zeilen = [`<b>${p.question}</b> → <b>${p.phrase}</b> · die Präposition <b>${p.prep}</b> → <b>${kasus}</b>`];
      if (VERS[erstes]) zeilen.push(`${erstes} = ${VERS[erstes]} (слитная форма: предлог + артикль)`);
      if (DAT.includes(p.prep)) zeilen.push(`${p.prep} verlangt <b>immer den Dativ</b> – вопрос не важен. Стишок: aus, bei, mit, nach, seit, von, zu → Dativ.`);
      else if (WECHSEL.includes(p.prep)) zeilen.push(`${p.prep} ist eine <b>Wechselpräposition</b>: Wohin? (куда?) → Akkusativ · Wo? (где?) → Dativ. Здесь вопрос <b>${p.question}</b> → ${kasus}.`);
      if (p.prep === "nach") zeilen.push(p.phrase === "nach Hause" ? "nach Hause – feste Wendung (устойчивое выражение): куда? домой. Где? дома → zu Hause." : "nach – для городов и стран без артикля (nach Berlin, nach Italien). Страны с артиклем → in die Türkei.");
      else if (p.prep === "zu" && p.question === "Wohin?") zeilen.push("zu – к человеку или учреждению (zum Arzt, zur Arbeit, zur Schule); «к кому? / на что?»");
      else if (p.prep === "bei") zeilen.push("bei – «у кого?», «на (работе)»: beim Arzt, bei der Arbeit.");
      if (p.phrase === "zu Hause") zeilen.push("zu Hause – feste Wendung: где? дома. Нельзя «Ich gehe zu Hause» → правильно nach Hause.");
      zeilen.push(`<a href="#test" onclick="document.querySelector('.sl-tab[data-mode=test]').click();return false;">📝 im Test üben</a> · <a href="/pages/language_lab/grammatik/index.html#de-praeposition-kasus" target="quantura_regel">📐 die Regel ↗</a>`);
      box.innerHTML = "💡 <b>Warum?</b> · почему так?<br>" + zeilen.join("<br>");
      box.style.display = "";
    });

    // Events
    $("sgVerb").addEventListener("change", updateValenz);
    $("sgSubj").addEventListener("change", () => { updateSubjektArt(); updateFragNach(); updateGenZu(); });
    ["sgSatzart", "sgDatNomen", "sgAkkNomen", "sgPkvNomen", "sgPobjNomen", "sgZeit", "sgWie", "sgOrt"].forEach((id) => $(id).addEventListener("change", updateFragNach));
    $("sgPobjWahl").addEventListener("change", updatePobjInfo);
    $("deGenerateBtn").addEventListener("click", () => generieren(true));
    $("deClearBtn").addEventListener("click", () => {
      ["sgSubj", "sgVerb", "sgDatNomen", "sgAkkNomen", "sgPkvNomen", "sgPobjNomen", "sgGenNomen", "sgZeit", "sgWie", "sgOrt", "sgAux", "sgSubjAdj", "sgDatAdj", "sgAkkAdj", "sgPkvAdj", "sgGenAdj", "sgPobjAdj"].forEach((id) => ($(id).selectedIndex = 0));
      if ($("sgOrtWarum")) $("sgOrtWarum").style.display = "none";
      if ($("sgVerbSuche")) $("sgVerbSuche").value = "";
      $("sgNeg").checked = false;
      document.querySelectorAll(".en-box").forEach((b) => (b.hidden = true));
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
