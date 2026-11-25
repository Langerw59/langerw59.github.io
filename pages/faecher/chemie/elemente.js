// ============================================================
// Chemie – die ersten 20 Elemente (für Lektion 2 und 3)
// 2026-11-25 · angelegt mit Claude
// Felder: z – die Ordnungszahl, s – das Symbol, n – der Name mit Artikel, ru – по-русски,
//         a – die Massenzahl (häufigstes Isotop), g – die Hauptgruppe (I–VIII), p – die Periode,
//         art – Metall | Halbmetall | Nichtmetall | Edelgas, lat – lateinischer/griechischer Name, info – kurz
// ============================================================
window.CHEMIE_ELEMENTE = [
  { z: 1,  s: "H",  n: "der Wasserstoff",  ru: "водород",  a: 1,  g: 1, p: 1, art: "Nichtmetall", lat: "Hydrogenium – „Wasser-Erzeuger“", info: "das leichteste Element; verbrennt zu Wasser (H₂O)" },
  { z: 2,  s: "He", n: "das Helium",       ru: "гелий",    a: 4,  g: 8, p: 1, art: "Edelgas",     lat: "griech. hēlios = die Sonne", info: "zuerst im Licht der Sonne entdeckt; im Luftballon" },
  { z: 3,  s: "Li", n: "das Lithium",      ru: "литий",    a: 7,  g: 1, p: 2, art: "Metall",      lat: "griech. lithos = der Stein", info: "im Akku (Lithium-Ionen-Akku) von Handy und E-Auto" },
  { z: 4,  s: "Be", n: "das Beryllium",    ru: "бериллий", a: 9,  g: 2, p: 2, art: "Metall",      lat: "nach dem Edelstein Beryll", info: "selten, giftig" },
  { z: 5,  s: "B",  n: "das Bor",          ru: "бор",      a: 11, g: 3, p: 2, art: "Halbmetall",  lat: "von pers./arab. būraq = Borax", info: "im Borax, im Glas für Kochgeschirr" },
  { z: 6,  s: "C",  n: "der Kohlenstoff",  ru: "углерод",  a: 12, g: 4, p: 2, art: "Nichtmetall", lat: "Carboneum ← lat. carbo = die Kohle", info: "Grundlage alles Lebendigen; Diamant und Graphit (der Bleistift!)" },
  { z: 7,  s: "N",  n: "der Stickstoff",   ru: "азот",     a: 14, g: 5, p: 2, art: "Nichtmetall", lat: "Nitrogenium – „Salpeter-Erzeuger“", info: "78 % der Luft; „erstickt“ die Flamme – daher der deutsche Name" },
  { z: 8,  s: "O",  n: "der Sauerstoff",   ru: "кислород", a: 16, g: 6, p: 2, art: "Nichtmetall", lat: "Oxygenium – „Säure-Erzeuger“ (griech. oxys = sauer)", info: "21 % der Luft; ohne ihn kein Feuer und kein Atmen" },
  { z: 9,  s: "F",  n: "das Fluor",        ru: "фтор",     a: 19, g: 7, p: 2, art: "Nichtmetall", lat: "lat. fluere = fließen (Flussspat)", info: "in der Zahnpasta (als Fluorid)" },
  { z: 10, s: "Ne", n: "das Neon",         ru: "неон",     a: 20, g: 8, p: 2, art: "Edelgas",     lat: "griech. neos = neu", info: "leuchtet rot in der Leuchtreklame" },
  { z: 11, s: "Na", n: "das Natrium",      ru: "натрий",   a: 23, g: 1, p: 3, art: "Metall",      lat: "von natron (ägypt./arab.)", info: "weiches Metall, reagiert heftig mit Wasser; im Kochsalz NaCl" },
  { z: 12, s: "Mg", n: "das Magnesium",    ru: "магний",   a: 24, g: 2, p: 3, art: "Metall",      lat: "nach der Landschaft Magnesia (Griechenland)", info: "verbrennt mit grellem weißem Licht (alter Fotoblitz)" },
  { z: 13, s: "Al", n: "das Aluminium",    ru: "алюминий", a: 27, g: 3, p: 3, art: "Metall",      lat: "lat. alumen = der Alaun", info: "leichtes Metall: die Alufolie, die Felge, die Leitung" },
  { z: 14, s: "Si", n: "das Silicium",     ru: "кремний",  a: 28, g: 4, p: 3, art: "Halbmetall",  lat: "lat. silex = der Kieselstein", info: "im Sand; Grundstoff aller Chips und Transistoren" },
  { z: 15, s: "P",  n: "der Phosphor",     ru: "фосфор",   a: 31, g: 5, p: 3, art: "Nichtmetall", lat: "griech. phōsphoros = der Lichtträger", info: "leuchtet im Dunkeln (weißer Phosphor); an der Streichholzschachtel" },
  { z: 16, s: "S",  n: "der Schwefel",     ru: "сера",     a: 32, g: 6, p: 3, art: "Nichtmetall", lat: "Sulfur (lat.)", info: "gelb; riecht in Verbindungen nach faulen Eiern; in der Autobatterie als Schwefelsäure" },
  { z: 17, s: "Cl", n: "das Chlor",        ru: "хлор",     a: 35, g: 7, p: 3, art: "Nichtmetall", lat: "griech. chlōros = gelbgrün", info: "giftiges gelbgrünes Gas; im Schwimmbad; im Kochsalz NaCl" },
  { z: 18, s: "Ar", n: "das Argon",        ru: "аргон",    a: 40, g: 8, p: 3, art: "Edelgas",     lat: "griech. argos = träge, faul", info: "fast 1 % der Luft; Schutzgas beim Schweißen" },
  { z: 19, s: "K",  n: "das Kalium",       ru: "калий",    a: 39, g: 1, p: 4, art: "Metall",      lat: "arab. al-qalī = die Pottasche", info: "im Dünger und in der Banane" },
  { z: 20, s: "Ca", n: "das Calcium",      ru: "кальций",  a: 40, g: 2, p: 4, art: "Metall",      lat: "lat. calx = der Kalk", info: "im Kalk, im Knochen, im Kesselstein" }
];

// Schalen (K, L, M, N) für die ersten 20 Elemente: 2 – 8 – 8 – 2
window.chemieSchalen = function (z) {
  const max = [2, 8, 8, 2], s = [];
  let rest = z;
  for (const m of max) { if (rest <= 0) break; const n = Math.min(m, rest); s.push(n); rest -= n; }
  return s;
};
