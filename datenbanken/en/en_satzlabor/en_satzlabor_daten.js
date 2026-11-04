// =============================================================
// en_satzlabor_daten.js – Daten für den englischen Satzlabor
// RU: Данные для английской «лаборатории предложений»
// -------------------------------------------------------------
// Glieder, Verben (3 Formen!), Nomen, Wörter für Zeit/Ort/Art.
// Ort: datenbanken/en/en_satzlabor/en_satzlabor_daten.js
// Version 1 (2026-11-02)
// =============================================================

// ------------------------------------------------------------
// Satzglieder (gleiche Farben wie im deutschen Satzlabor)
// ------------------------------------------------------------
const EN_SATZGLIEDER = {
  subj: { name: "Subject", frage: "Who? / What?", ru: "подлежащее", farbe: "#1f6feb" },
  pred: { name: "Verb", frage: "What does … do?", ru: "сказуемое (глагол)", farbe: "#d1242f" },
  dat:  { name: "Indirect object", frage: "To whom?", ru: "косвенное дополнение (кому?)", farbe: "#1a7f37" },
  akk:  { name: "Direct object", frage: "Whom? / What?", ru: "прямое дополнение (кого? что?)", farbe: "#e16f24" },
  art:  { name: "Manner", frage: "How?", ru: "образ действия (как?)", farbe: "#0f8a8a" },
  ort:  { name: "Place", frage: "Where?", ru: "место (где? куда?)", farbe: "#9a6700" },
  zeit: { name: "Time", frage: "When? / How often?", ru: "время (когда? как часто?)", farbe: "#8250df" },
  neg:  { name: "not", frage: "", ru: "отрицание", farbe: "#57606a" },
  pkv:  { name: "Complement", frage: "What? / How? (after be)", ru: "именная часть (после be)", farbe: "#bf3989" },
  part: { name: "Particle / adverb", frage: "", ru: "частица / наречие", farbe: "#6e7781" },
  konj: { name: "Conjunction", frage: "", ru: "союз", farbe: "#8c959f" },
  ns:   { name: "Clause", frage: "", ru: "придаточное / часть предложения", farbe: "#a475f9" },
  unbek:{ name: "unknown", frage: "?", ru: "не распознано (нет в базе)", farbe: "#afb8c1" },
};

// ------------------------------------------------------------
// Verben: base – past (V2) – past participle (V3)
// obj: "pflicht" | "optional" | false  (Direct object)
// io:  true = kann ein Indirect object haben (give somebody something)
// ort: "wohin" (go home) | "wo" (live in Berlin) | null
// s / ing / pastReg: Sonderformen (Verdopplung usw.)
// ------------------------------------------------------------
const EN_SL_VERBS = [
  { base: "go", past: "went", pp: "gone", ru: "идти, ехать", de: "gehen", obj: false, ort: "wohin", motion: true },
  { base: "come", past: "came", pp: "come", ru: "приходить", de: "kommen", obj: false, ort: "wohin", motion: true },
  { base: "run", past: "ran", pp: "run", ru: "бежать", de: "laufen, rennen", obj: false, ort: "wohin", motion: true, ing: "running" },
  { base: "walk", ru: "идти пешком, гулять", de: "zu Fuß gehen", obj: false, ort: "wohin", motion: true },
  { base: "drive", past: "drove", pp: "driven", ru: "вести машину, ехать", de: "fahren (Auto)", obj: "optional", ort: "wohin", motion: true },
  { base: "fly", past: "flew", pp: "flown", ru: "лететь", de: "fliegen", obj: false, ort: "wohin", motion: true },
  { base: "swim", past: "swam", pp: "swum", ru: "плавать", de: "schwimmen", obj: false, ort: "wo", motion: true, ing: "swimming" },
  { base: "travel", ru: "путешествовать", de: "reisen", obj: false, ort: "wohin", motion: true, ing: "travelling", pastReg: "travelled" },
  { base: "stay", ru: "оставаться", de: "bleiben", obj: false, ort: "wo" },
  { base: "live", ru: "жить", de: "wohnen, leben", obj: false, ort: "wo" },
  { base: "work", ru: "работать", de: "arbeiten", obj: false, ort: "wo" },
  { base: "sleep", past: "slept", pp: "slept", ru: "спать", de: "schlafen", obj: false, ort: "wo" },
  { base: "sit", past: "sat", pp: "sat", ru: "сидеть", de: "sitzen", obj: false, ort: "wo", ing: "sitting" },
  { base: "wait", ru: "ждать", de: "warten", obj: false, ort: "wo" },
  { base: "play", ru: "играть", de: "spielen", obj: "optional", ort: "wo" },
  { base: "learn", ru: "учить, учиться", de: "lernen", obj: "optional" },
  { base: "study", ru: "учиться, изучать", de: "lernen, studieren", obj: "optional" },
  { base: "read", past: "read", pp: "read", ru: "читать", de: "lesen", obj: "optional", note: "read [ri:d] – read [red] – read [red]: пишется одинаково, звучит по-разному!" },
  { base: "write", past: "wrote", pp: "written", ru: "писать", de: "schreiben", obj: "optional", io: true },
  { base: "speak", past: "spoke", pp: "spoken", ru: "говорить", de: "sprechen", obj: "optional" },
  { base: "say", past: "said", pp: "said", ru: "сказать", de: "sagen", obj: "pflicht" },
  { base: "tell", past: "told", pp: "told", ru: "рассказать", de: "erzählen", obj: "pflicht", io: true },
  { base: "ask", ru: "спрашивать", de: "fragen", obj: "optional" },
  { base: "answer", ru: "отвечать", de: "antworten", obj: "optional" },
  { base: "help", ru: "помогать", de: "helfen", obj: "pflicht", note: "help + кого? (прямое дополнение): I help my son. В немецком — Dativ (Ich helfe meinem Sohn), в английском предлога нет." },
  { base: "give", past: "gave", pp: "given", ru: "давать", de: "geben", obj: "pflicht", io: true },
  { base: "bring", past: "brought", pp: "brought", ru: "приносить", de: "bringen", obj: "pflicht", io: true },
  { base: "send", past: "sent", pp: "sent", ru: "посылать", de: "schicken", obj: "pflicht", io: true },
  { base: "show", past: "showed", pp: "shown", ru: "показывать", de: "zeigen", obj: "pflicht", io: true },
  { base: "buy", past: "bought", pp: "bought", ru: "покупать", de: "kaufen", obj: "pflicht", io: true },
  { base: "sell", past: "sold", pp: "sold", ru: "продавать", de: "verkaufen", obj: "pflicht", io: true },
  { base: "pay", past: "paid", pp: "paid", ru: "платить", de: "bezahlen", obj: "optional" },
  { base: "take", past: "took", pp: "taken", ru: "брать", de: "nehmen", obj: "pflicht" },
  { base: "make", past: "made", pp: "made", ru: "делать, изготовлять", de: "machen", obj: "pflicht", io: true },
  { base: "do", past: "did", pp: "done", ru: "делать", de: "tun, machen", obj: "pflicht" },
  { base: "have", past: "had", pp: "had", ru: "иметь", de: "haben", obj: "pflicht", s: "has" },
  { base: "see", past: "saw", pp: "seen", ru: "видеть", de: "sehen", obj: "pflicht" },
  { base: "hear", past: "heard", pp: "heard", ru: "слышать", de: "hören", obj: "pflicht" },
  { base: "watch", ru: "смотреть (ТВ, фильм)", de: "ansehen, schauen", obj: "pflicht" },
  { base: "eat", past: "ate", pp: "eaten", ru: "есть", de: "essen", obj: "optional" },
  { base: "drink", past: "drank", pp: "drunk", ru: "пить", de: "trinken", obj: "optional" },
  { base: "cook", ru: "готовить", de: "kochen", obj: "optional", io: true },
  { base: "clean", ru: "убирать, чистить", de: "putzen", obj: "pflicht" },
  { base: "open", ru: "открывать", de: "öffnen", obj: "pflicht" },
  { base: "close", ru: "закрывать", de: "schließen", obj: "pflicht" },
  { base: "find", past: "found", pp: "found", ru: "находить", de: "finden", obj: "pflicht" },
  { base: "lose", past: "lost", pp: "lost", ru: "терять", de: "verlieren", obj: "pflicht" },
  { base: "forget", past: "forgot", pp: "forgotten", ru: "забывать", de: "vergessen", obj: "pflicht", ing: "forgetting" },
  { base: "know", past: "knew", pp: "known", ru: "знать", de: "wissen, kennen", obj: "pflicht" },
  { base: "think", past: "thought", pp: "thought", ru: "думать", de: "denken", obj: false },
  { base: "like", ru: "нравиться, любить", de: "mögen", obj: "pflicht" },
  { base: "love", ru: "любить", de: "lieben", obj: "pflicht" },
  { base: "need", ru: "нуждаться", de: "brauchen", obj: "pflicht" },
  { base: "want", ru: "хотеть", de: "wollen", obj: "pflicht" },
  { base: "begin", past: "began", pp: "begun", ru: "начинать", de: "beginnen", obj: "optional", ing: "beginning" },
  { base: "finish", ru: "заканчивать", de: "beenden", obj: "optional" },
  { base: "visit", ru: "навещать, посещать", de: "besuchen", obj: "pflicht" },
  { base: "call", ru: "звонить", de: "anrufen", obj: "pflicht" },
  { base: "meet", past: "met", pp: "met", ru: "встречать", de: "treffen", obj: "pflicht" },
  { base: "leave", past: "left", pp: "left", ru: "уходить, покидать", de: "verlassen", obj: "optional" },
  { base: "get", past: "got", pp: "got", ru: "получать, добираться", de: "bekommen", obj: "optional", ing: "getting", note: "В американском английском V3 = gotten." },
  { base: "put", past: "put", pp: "put", ru: "класть, ставить", de: "legen, stellen", obj: "pflicht", ing: "putting" },
  { base: "build", past: "built", pp: "built", ru: "строить", de: "bauen", obj: "pflicht" },
  { base: "repair", ru: "ремонтировать", de: "reparieren", obj: "pflicht" },
  { base: "teach", past: "taught", pp: "taught", ru: "учить (кого-то)", de: "unterrichten", obj: "optional", io: true },
  { base: "carry", ru: "нести", de: "tragen", obj: "pflicht" },
  { base: "try", ru: "пытаться, пробовать", de: "versuchen", obj: "optional" },
  { base: "stop", ru: "останавливать(ся)", de: "anhalten", obj: "optional", ing: "stopping", pastReg: "stopped" },
  { base: "plan", ru: "планировать", de: "planen", obj: "pflicht", ing: "planning", pastReg: "planned" },
  { base: "wash", ru: "мыть", de: "waschen", obj: "pflicht" },
];

// ------------------------------------------------------------
// Nomen: sg / pl, Person?, unzählbar (unc), ohne Artikel (noArt)
// ------------------------------------------------------------
const EN_SL_NOUNS = [
  // Personen
  { sg: "son", pl: "sons", ru: "сын", person: true },
  { sg: "daughter", pl: "daughters", ru: "дочь", person: true },
  { sg: "grandson", pl: "grandsons", ru: "внук", person: true },
  { sg: "granddaughter", pl: "granddaughters", ru: "внучка", person: true },
  { sg: "grandma", pl: "grandmas", ru: "бабушка", person: true },
  { sg: "grandpa", pl: "grandpas", ru: "дедушка", person: true },
  { sg: "mother", pl: "mothers", ru: "мама", person: true },
  { sg: "father", pl: "fathers", ru: "папа", person: true },
  { sg: "brother", pl: "brothers", ru: "брат", person: true },
  { sg: "sister", pl: "sisters", ru: "сестра", person: true },
  { sg: "wife", pl: "wives", ru: "жена", person: true },
  { sg: "husband", pl: "husbands", ru: "муж", person: true },
  { sg: "man", pl: "men", ru: "мужчина", person: true },
  { sg: "woman", pl: "women", ru: "женщина", person: true },
  { sg: "child", pl: "children", ru: "ребёнок", person: true },
  { sg: "friend", pl: "friends", ru: "друг", person: true },
  { sg: "teacher", pl: "teachers", ru: "учитель", person: true },
  { sg: "doctor", pl: "doctors", ru: "врач", person: true },
  { sg: "boss", pl: "bosses", ru: "начальник", person: true },
  { sg: "neighbour", pl: "neighbours", ru: "сосед", person: true },
  { sg: "student", pl: "students", ru: "студент, ученик", person: true },
  { sg: "parents", pl: "parents", ru: "родители", person: true, nurPl: true },
  // Dinge
  { sg: "car", pl: "cars", ru: "машина" },
  { sg: "book", pl: "books", ru: "книга" },
  { sg: "letter", pl: "letters", ru: "письмо" },
  { sg: "apple", pl: "apples", ru: "яблоко" },
  { sg: "house", pl: "houses", ru: "дом" },
  { sg: "ball", pl: "balls", ru: "мяч" },
  { sg: "bike", pl: "bikes", ru: "велосипед" },
  { sg: "phone", pl: "phones", ru: "телефон" },
  { sg: "computer", pl: "computers", ru: "компьютер" },
  { sg: "newspaper", pl: "newspapers", ru: "газета" },
  { sg: "film", pl: "films", ru: "фильм" },
  { sg: "song", pl: "songs", ru: "песня" },
  { sg: "present", pl: "presents", ru: "подарок" },
  { sg: "key", pl: "keys", ru: "ключ" },
  { sg: "door", pl: "doors", ru: "дверь" },
  { sg: "window", pl: "windows", ru: "окно" },
  { sg: "game", pl: "games", ru: "игра" },
  { sg: "question", pl: "questions", ru: "вопрос" },
  { sg: "story", pl: "stories", ru: "история, рассказ" },
  { sg: "hour", pl: "hours", ru: "час", an: true },
  { sg: "bread", ru: "хлеб", unc: true },
  { sg: "coffee", ru: "кофе", unc: true },
  { sg: "tea", ru: "чай", unc: true },
  { sg: "water", ru: "вода", unc: true },
  { sg: "money", ru: "деньги", unc: true },
  { sg: "homework", ru: "домашнее задание", unc: true },
  { sg: "breakfast", ru: "завтрак", unc: true, noArt: true },
  { sg: "dinner", ru: "ужин", unc: true, noArt: true },
  { sg: "English", ru: "английский язык", unc: true, noArt: true },
  { sg: "German", ru: "немецкий язык", unc: true, noArt: true },
  { sg: "football", ru: "футбол", unc: true, noArt: true },
  { sg: "chess", ru: "шахматы", unc: true, noArt: true },
  { sg: "music", ru: "музыка", unc: true, noArt: true },
];

// Artikel / Bestimmungswörter
const EN_SL_DETS = [
  { id: "the", label: "the" },
  { id: "a", label: "a / an" },
  { id: "my", label: "my" },
  { id: "your", label: "your" },
  { id: "his", label: "his" },
  { id: "her", label: "her" },
  { id: "our", label: "our" },
  { id: "their", label: "their" },
  { id: "this", label: "this / these" },
  { id: "none", label: "— (без артикля)" },
];

const EN_SL_ADJECTIVES = ["small", "big", "new", "old", "good", "nice", "young", "little", "red", "beautiful", "interesting", "expensive", "old"].filter((x, i, a) => a.indexOf(x) === i);

// ------------------------------------------------------------
// Zeit / Häufigkeit / Art / Ort
// bezug: past | future | present | any  (für Warnungen bei der Zeitform)
// ------------------------------------------------------------
const EN_SL_TIME = [
  { text: "today", ru: "сегодня", bezug: "any" },
  { text: "now", ru: "сейчас", bezug: "present" },
  { text: "at the moment", ru: "в данный момент", bezug: "present" },
  { text: "every day", ru: "каждый день", bezug: "any" },
  { text: "in the morning", ru: "утром", bezug: "any" },
  { text: "in the evening", ru: "вечером", bezug: "any" },
  { text: "at 7 o'clock", ru: "в 7 часов", bezug: "any" },
  { text: "on Monday", ru: "в понедельник", bezug: "any" },
  { text: "yesterday", ru: "вчера", bezug: "past" },
  { text: "last week", ru: "на прошлой неделе", bezug: "past" },
  { text: "two days ago", ru: "два дня назад", bezug: "past" },
  { text: "in 2020", ru: "в 2020 году", bezug: "past" },
  { text: "tomorrow", ru: "завтра", bezug: "future" },
  { text: "next week", ru: "на следующей неделе", bezug: "future" },
  { text: "soon", ru: "скоро", bezug: "future" },
  { text: "already", ru: "уже", bezug: "perfect" },
  { text: "just", ru: "только что", bezug: "perfect" },
  { text: "for two hours", ru: "в течение двух часов", bezug: "any" },
  { text: "since Monday", ru: "с понедельника", bezug: "perfect" },
];
const EN_SL_FREQ = [
  { text: "always", ru: "всегда" },
  { text: "usually", ru: "обычно" },
  { text: "often", ru: "часто" },
  { text: "sometimes", ru: "иногда" },
  { text: "rarely", ru: "редко" },
  { text: "never", ru: "никогда" },
];
const EN_SL_MANNER = [
  { text: "quickly", ru: "быстро" },
  { text: "slowly", ru: "медленно" },
  { text: "well", ru: "хорошо" },
  { text: "carefully", ru: "осторожно, внимательно" },
  { text: "together", ru: "вместе" },
  { text: "alone", ru: "одни, в одиночку" },
  { text: "by car", ru: "на машине" },
  { text: "by bus", ru: "на автобусе" },
  { text: "on foot", ru: "пешком" },
  { text: "with my son", ru: "с моим сыном" },
];
const EN_SL_PLACE = [
  { text: "home", ru: "домой", frage: "Where to?", note: "без to!" },
  { text: "to school", ru: "в школу", frage: "Where to?" },
  { text: "to work", ru: "на работу", frage: "Where to?" },
  { text: "to the city", ru: "в город", frage: "Where to?" },
  { text: "to the shop", ru: "в магазин", frage: "Where to?" },
  { text: "to Berlin", ru: "в Берлин", frage: "Where to?" },
  { text: "into the house", ru: "в дом (внутрь)", frage: "Where to?" },
  { text: "at home", ru: "дома", frage: "Where?" },
  { text: "at school", ru: "в школе", frage: "Where?" },
  { text: "at work", ru: "на работе", frage: "Where?" },
  { text: "in the garden", ru: "в саду", frage: "Where?" },
  { text: "in the city", ru: "в городе", frage: "Where?" },
  { text: "in the park", ru: "в парке", frage: "Where?" },
  { text: "in Willich", ru: "в Виллихе", frage: "Where?" },
  { text: "here", ru: "здесь / сюда", frage: "Where?" },
  { text: "there", ru: "там / туда", frage: "Where?" },
  { text: "from work", ru: "с работы", frage: "Where from?" },
  { text: "from school", ru: "из школы", frage: "Where from?" },
];

if (typeof window !== "undefined") {
  Object.assign(window, { EN_SATZGLIEDER, EN_SL_VERBS, EN_SL_NOUNS, EN_SL_DETS, EN_SL_ADJECTIVES, EN_SL_TIME, EN_SL_FREQ, EN_SL_MANNER, EN_SL_PLACE });
}
if (typeof module !== "undefined") {
  module.exports = { EN_SATZGLIEDER, EN_SL_VERBS, EN_SL_NOUNS, EN_SL_DETS, EN_SL_ADJECTIVES, EN_SL_TIME, EN_SL_FREQ, EN_SL_MANNER, EN_SL_PLACE };
}
