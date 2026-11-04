// ============================================================
// DE: Satzglieder – gemeinsame Grundlage für Satzgenerator und Satzanalyse
// EN: Sentence constituents – shared base for generator and analysis
// RU: Члены предложения – общая основа для генератора и анализа
// ------------------------------------------------------------
// Enthält / contains / содержит:
//   DE_SATZGLIEDER      – Rollen, Fragen, Farben (Subjekt, Prädikat, ...)
//   DE_PERSONEN         – Personen-Nomen für Wer? / Wem? / Wen?
//   DE_ARTIKEL_TYPEN    – Artikelwörter (der, ein, mein, ...)
//   DE_VERB_VALENZ      – welche Ergänzungen ein Verb braucht
//   DE_SCHWACHE_NOMEN   – n-Deklination (den Kollegen, dem Kunden)
//   DE_PLURAL_NOMEN     – Nomen, die schon Plural sind (Schuhe)
//   DE_GRAMMATIK        – Funktionen: Artikel, Adjektiv-Endung, Nomengruppe
// ============================================================

const DE_SATZGLIEDER = {
  subj: { name: "Subjekt", frage: "Wer? / Was?", ru: "подлежащее", farbe: "#1f6feb", kasus: "Nominativ" },
  pred: { name: "Prädikat", frage: "Was tut …?", ru: "сказуемое", farbe: "#d1242f", kasus: "" },
  dat:  { name: "Dativobjekt", frage: "Wem?", ru: "дополнение (кому?)", farbe: "#1a7f37", kasus: "Dativ" },
  akk:  { name: "Akkusativobjekt", frage: "Wen? / Was?", ru: "дополнение (кого? что?)", farbe: "#e16f24", kasus: "Akkusativ" },
  zeit: { name: "Zeitangabe", frage: "Wann? / Wie oft?", ru: "обстоятельство времени", farbe: "#8250df", kasus: "" },
  art:  { name: "Art und Weise", frage: "Wie?", ru: "обстоятельство образа действия", farbe: "#0f8a8a", kasus: "" },
  ort:  { name: "Ortsangabe", frage: "Wo? / Wohin? / Woher?", ru: "обстоятельство места", farbe: "#9a6700", kasus: "" },
  neg:  { name: "Negation", frage: "", ru: "отрицание", farbe: "#57606a", kasus: "" },
};

// ------------------------------------------------------------
// Personen (für Subjekt, Dativobjekt, Akkusativobjekt)
// gender: m / f / n / pl
// datPl: Dativ Plural (den Kindern); weak: n-Deklination
// ------------------------------------------------------------
const DE_PERSONEN = [
  { lemma: "Sohn", gender: "m" },
  { lemma: "Tochter", gender: "f" },
  { lemma: "Mann", gender: "m" },
  { lemma: "Frau", gender: "f" },
  { lemma: "Kind", gender: "n" },
  { lemma: "Enkel", gender: "m" },
  { lemma: "Enkelin", gender: "f" },
  { lemma: "Oma", gender: "f" },
  { lemma: "Opa", gender: "m" },
  { lemma: "Freund", gender: "m" },
  { lemma: "Freundin", gender: "f" },
  { lemma: "Lehrer", gender: "m" },
  { lemma: "Lehrerin", gender: "f" },
  { lemma: "Arzt", gender: "m" },
  { lemma: "Chef", gender: "m" },
  { lemma: "Kollege", gender: "m", weak: "Kollegen" },
  { lemma: "Nachbar", gender: "m", weak: "Nachbarn" },
  { lemma: "Kinder", gender: "pl", datPl: "Kindern" },
  { lemma: "Enkel", gender: "pl", datPl: "Enkeln", label: "Enkel (Plural)" },
  { lemma: "Freunde", gender: "pl", datPl: "Freunden" },
  { lemma: "Eltern", gender: "pl", datPl: "Eltern" },
];

// n-Deklination für Nomen aus DE_NOUNS
const DE_SCHWACHE_NOMEN = {
  Student: "Studenten",
  Kunde: "Kunden",
  Kollege: "Kollegen",
};

// Nomen in DE_NOUNS, die Plural sind
const DE_PLURAL_NOMEN = { Schuhe: "Schuhen" };

// Nomen in DE_NOUNS, die Personen sind (Frage „Wen?“ statt „Was?“)
const DE_PERSONEN_LEMMAS = [
  "Mann", "Frau", "Kind", "Freund", "Freundin", "Lehrer", "Lehrerin", "Student",
  "Studentin", "Arzt", "Ärztin", "Fahrer", "Fahrerin", "Verkäufer", "Verkäuferin",
  "Kunde", "Kundin", "Chef", "Chefin", "Kollege", "Kollegin", "Schauspieler",
  "Schauspielerin", "Sänger", "Sängerin", "Trainer", "Spieler", "Spielerin",
];

// ------------------------------------------------------------
// Artikelwörter
// typ: def = bestimmter Artikel, ein = ein-Wort (ein, kein, mein …), none = ohne
// ------------------------------------------------------------
const DE_ARTIKEL_TYPEN = [
  { id: "def", label: "der / die / das", typ: "def" },
  { id: "ein", label: "ein / eine", typ: "ein", stamm: "ein" },
  { id: "mein", label: "mein", typ: "ein", stamm: "mein" },
  { id: "dein", label: "dein", typ: "ein", stamm: "dein" },
  { id: "sein", label: "sein", typ: "ein", stamm: "sein" },
  { id: "ihr", label: "ihr (её / их)", typ: "ein", stamm: "ihr" },
  { id: "unser", label: "unser", typ: "ein", stamm: "unser" },
  { id: "euer", label: "euer", typ: "ein", stamm: "euer" },
  { id: "Ihr", label: "Ihr (Höflichkeit)", typ: "ein", stamm: "Ihr" },
  { id: "none", label: "— ohne Artikel —", typ: "none" },
];

// ------------------------------------------------------------
// Valenz: welche Satzglieder ein Verb braucht
// akk/dat: "pflicht" | "optional" | false ; ort: "wohin" | "wo" | "woher"
// ------------------------------------------------------------
const DE_VERB_VALENZ = {
  gehen: { akk: false, dat: false, ort: "wohin" },
  kommen: { akk: false, dat: false, ort: "woher" },
  fahren: { akk: "optional", dat: false, ort: "wohin" },
  laufen: { akk: false, dat: false, ort: "wohin" },
  bleiben: { akk: false, dat: false, ort: "wo" },
  steigen: { akk: false, dat: false, ort: "wohin" },
  machen: { akk: "pflicht", dat: false },
  arbeiten: { akk: false, dat: false },
  lernen: { akk: "optional", dat: false },
  spielen: { akk: "optional", dat: false },
  essen: { akk: "optional", dat: false },
  trinken: { akk: "optional", dat: false },
  schlafen: { akk: false, dat: false },
  kaufen: { akk: "pflicht", dat: "optional" },
  bezahlen: { akk: "pflicht", dat: "optional" },
  verkaufen: { akk: "pflicht", dat: "optional" },
  geben: { akk: "pflicht", dat: "pflicht" },
  nehmen: { akk: "pflicht", dat: false },
  bringen: { akk: "pflicht", dat: "optional" },
  holen: { akk: "pflicht", dat: "optional" },
  sagen: { akk: "optional", dat: "optional" },
  sprechen: { akk: false, dat: false },
  hören: { akk: "optional", dat: false },
  sehen: { akk: "optional", dat: false },
  fragen: { akk: "optional", dat: false },
  denken: { akk: false, dat: false },
  glauben: { akk: "optional", dat: "optional" },
  fühlen: { akk: "optional", dat: false },
  wissen: { akk: "optional", dat: false },
  helfen: { akk: false, dat: "pflicht" },
  brauchen: { akk: "pflicht", dat: false },
  beginnen: { akk: "optional", dat: false },
  enden: { akk: false, dat: false },
  warten: { akk: false, dat: false },
  wohnen: { akk: false, dat: false, ort: "wo" },
  putzen: { akk: "pflicht", dat: false },
};

// Bewegungsverben: Perfekt mit „sein“ – aber mit Akkusativobjekt „haben“
// (Ich bin nach Hause gefahren. / Ich habe das Auto gefahren.)
const DE_SEIN_ZU_HABEN_MIT_AKK = ["fahren"];

// ------------------------------------------------------------
// Grammatik-Funktionen
// ------------------------------------------------------------
const DE_GRAMMATIK = (() => {
  const DEF = {
    nom: { m: "der", f: "die", n: "das", pl: "die" },
    akk: { m: "den", f: "die", n: "das", pl: "die" },
    dat: { m: "dem", f: "der", n: "dem", pl: "den" },
  };
  const EIN_END = {
    nom: { m: "", f: "e", n: "", pl: "e" },
    akk: { m: "en", f: "e", n: "", pl: "e" },
    dat: { m: "em", f: "er", n: "em", pl: "en" },
  };
  // Adjektiv-Endungen
  const ADJ_SCHWACH = { // nach der/die/das
    nom: { m: "e", f: "e", n: "e", pl: "en" },
    akk: { m: "en", f: "e", n: "e", pl: "en" },
    dat: { m: "en", f: "en", n: "en", pl: "en" },
  };
  const ADJ_GEMISCHT = { // nach ein/kein/mein
    nom: { m: "er", f: "e", n: "es", pl: "en" },
    akk: { m: "en", f: "e", n: "es", pl: "en" },
    dat: { m: "en", f: "en", n: "en", pl: "en" },
  };
  const ADJ_STARK = { // ohne Artikel
    nom: { m: "er", f: "e", n: "es", pl: "e" },
    akk: { m: "en", f: "e", n: "es", pl: "e" },
    dat: { m: "em", f: "er", n: "em", pl: "en" },
  };

  // Artikelwort bilden. Rückgabe "" wenn kein Artikel.
  function artikel(art, gender, kasus) {
    if (!art || art.typ === "none") return "";
    if (art.typ === "def") return DEF[kasus][gender];
    if (art.stamm === "ein" && gender === "pl") return ""; // ein → Plural ohne Artikel
    const end = EIN_END[kasus][gender];
    let stamm = art.stamm;
    if (stamm === "euer" && end) stamm = "eur"; // eure, eurem
    return stamm + end;
  }

  function adjektivForm(base, art, gender, kasus) {
    if (!base) return "";
    const artWort = artikel(art, gender, kasus);
    let tabelle;
    if (art && art.typ === "def") tabelle = ADJ_SCHWACH;
    else if (artWort) tabelle = ADJ_GEMISCHT;
    else tabelle = ADJ_STARK;
    let stamm = base;
    const end = tabelle[kasus][gender];
    if (stamm.endsWith("e")) stamm = stamm.slice(0, -1); // leise → leis-e
    else if (/[^aeiouäöü]el$/.test(stamm)) stamm = stamm.slice(0, -2) + "l"; // dunkel → dunkl-
    else if (/(au|eu)er$/.test(stamm)) stamm = stamm.slice(0, -2) + "r"; // teuer → teur-
    return stamm + end;
  }

  // nomen: { lemma, gender, weak?, datPl? }
  function nomenForm(nomen, kasus) {
    if (nomen.gender === "pl") return kasus === "dat" ? nomen.datPl || nomen.lemma : nomen.lemma;
    if (nomen.weak && kasus !== "nom") return nomen.weak;
    return nomen.lemma;
  }

  // Ganze Nomengruppe: Artikel + Adjektiv + Nomen
  function nomengruppe(nomen, art, adjBase, kasus) {
    const teile = [artikel(art, nomen.gender, kasus), adjektivForm(adjBase, art, nomen.gender, kasus), nomenForm(nomen, kasus)];
    return teile.filter(Boolean).join(" ");
  }

  return { artikel, adjektivForm, nomenForm, nomengruppe };
})();

if (typeof window !== "undefined") {
  Object.assign(window, {
    DE_SATZGLIEDER, DE_PERSONEN, DE_SCHWACHE_NOMEN, DE_PLURAL_NOMEN, DE_PERSONEN_LEMMAS,
    DE_ARTIKEL_TYPEN, DE_VERB_VALENZ, DE_SEIN_ZU_HABEN_MIT_AKK, DE_GRAMMATIK,
  });
}
if (typeof module !== "undefined") {
  module.exports = {
    DE_SATZGLIEDER, DE_PERSONEN, DE_SCHWACHE_NOMEN, DE_PLURAL_NOMEN, DE_PERSONEN_LEMMAS,
    DE_ARTIKEL_TYPEN, DE_VERB_VALENZ, DE_SEIN_ZU_HABEN_MIT_AKK, DE_GRAMMATIK,
  };
}
