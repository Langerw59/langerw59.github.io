// ============================================================
// Level 1 – die Grundlagen / основы
// 2026-11-14 · geschrieben mit Claude
// DE: Kleine Übungen, die „wie aus der Pistole“ sitzen sollen: Pronomen, sein, haben, ähnliche Wörter.
// RU: Маленькие упражнения на самое простое – чтобы отскакивало от зубов.
// Felder: id, titel, ru, info, karten: [{de, en, ru, h (Hinweis, optional)}]
//   h_de / h_en – kleiner Hinweis, wenn ein Wort doppelt vorkommt (sie / you)
// ============================================================
window.GRUNDLAGEN = [

{ id: "personal", titel: "die Personalpronomen", ru: "личные местоимения",
  info: "ich, du, er, sie, es, wir, ihr, sie, Sie – с этого начинается любой язык.",
  karten: [
  { de: "ich", en: "I", ru: "я" },
  { de: "du", en: "you", h_en: "Einzahl", ru: "ты" },
  { de: "er", en: "he", ru: "он" },
  { de: "sie", h_de: "Einzahl", en: "she", ru: "она" },
  { de: "es", en: "it", ru: "оно" },
  { de: "wir", en: "we", ru: "мы" },
  { de: "ihr", en: "you", h_en: "Mehrzahl", ru: "вы (многим)" },
  { de: "sie", h_de: "Mehrzahl", en: "they", ru: "они" },
  { de: "Sie", h_de: "höflich", en: "you", h_en: "höflich", ru: "Вы (вежливо)" }
]},

{ id: "possessiv", titel: "die Possessivpronomen", ru: "притяжательные местоимения",
  info: "В английском они НЕ склоняются: my – всегда my. В немецком: mein Sohn, meine Frau, mein Haus, mit meinem Auto …",
  karten: [
  { de: "mein", en: "my", ru: "мой" },
  { de: "dein", en: "your", h_en: "Einzahl", ru: "твой" },
  { de: "sein", h_de: "von er", en: "his", ru: "его (у него)" },
  { de: "ihr", h_de: "von sie, Einzahl", en: "her", ru: "её" },
  { de: "sein", h_de: "von es", en: "its", ru: "его (у предмета)" },
  { de: "unser", en: "our", ru: "наш" },
  { de: "euer", en: "your", h_en: "Mehrzahl", ru: "ваш (многим)" },
  { de: "ihr", h_de: "von sie, Mehrzahl", en: "their", ru: "их" },
  { de: "Ihr", h_de: "höflich", en: "your", h_en: "höflich", ru: "Ваш (вежливо)" }
]},

{ id: "paare", titel: "ich → mein", ru: "кто → чей",
  info: "Пара: местоимение → «чей». I → my, we → our. Это главное, что путается.",
  karten: [
  { de: "ich → mein", en: "I → my", ru: "я → мой" },
  { de: "du → dein", en: "you → your", ru: "ты → твой" },
  { de: "er → sein", en: "he → his", ru: "он → его" },
  { de: "sie → ihr", h_de: "Einzahl", en: "she → her", ru: "она → её" },
  { de: "wir → unser", en: "we → our", ru: "мы → наш" },
  { de: "ihr → euer", en: "you → your", h_en: "Mehrzahl", ru: "вы → ваш" },
  { de: "sie → ihr", h_de: "Mehrzahl", en: "they → their", ru: "они → их" }
]},

{ id: "sein", titel: "das Verb sein", ru: "глагол «быть» (to be)",
  info: "По-русски «есть» обычно не говорят, а в немецком и английском без него нельзя: I am / ich bin.",
  karten: [
  { de: "ich bin", en: "I am", ru: "я (есть)" },
  { de: "du bist", en: "you are", h_en: "Einzahl", ru: "ты (есть)" },
  { de: "er ist", en: "he is", ru: "он (есть)" },
  { de: "sie ist", en: "she is", ru: "она (есть)" },
  { de: "es ist", en: "it is", ru: "оно (есть)" },
  { de: "wir sind", en: "we are", ru: "мы (есть)" },
  { de: "ihr seid", en: "you are", h_en: "Mehrzahl", ru: "вы (есть)" },
  { de: "sie sind", en: "they are", ru: "они (есть)" },
  { de: "Sie sind", en: "you are", h_en: "höflich", ru: "Вы (есть)" }
]},

{ id: "haben", titel: "das Verb haben", ru: "глагол «иметь» (to have)",
  info: "«У меня есть» = ich habe = I have. Внимание: he/she/it → has.",
  karten: [
  { de: "ich habe", en: "I have", ru: "у меня есть" },
  { de: "du hast", en: "you have", h_en: "Einzahl", ru: "у тебя есть" },
  { de: "er hat", en: "he has", ru: "у него есть" },
  { de: "sie hat", en: "she has", ru: "у неё есть" },
  { de: "wir haben", en: "we have", ru: "у нас есть" },
  { de: "ihr habt", en: "you have", h_en: "Mehrzahl", ru: "у вас есть" },
  { de: "sie haben", en: "they have", ru: "у них есть" }
]},

{ id: "aehnlich", titel: "die ähnlichen Wörter", ru: "похожие английские слова",
  info: "Звучат похоже – значат разное. Нажмите на слово – послушайте разницу.",
  karten: [
  { de: "wir sind", en: "we're", ru: "мы (есть) = we are" },
  { de: "waren", en: "were", ru: "были (we were)" },
  { de: "wo", en: "where", ru: "где" },
  { de: "unser", en: "our", ru: "наш" },
  { de: "sind", en: "are", ru: "есть (we are)" },
  { de: "die Stunde", en: "hour", ru: "час" },
  { de: "dort", en: "there", ru: "там" },
  { de: "ihr (Mehrzahl)", en: "their", ru: "их" },
  { de: "sie sind", en: "they're", ru: "они (есть) = they are" },
  { de: "dein / Ihr", en: "your", ru: "твой / ваш" },
  { de: "du bist", en: "you're", ru: "ты (есть) = you are" }
]}

];
