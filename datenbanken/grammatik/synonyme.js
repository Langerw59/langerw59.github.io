// ============================================================
// Die gleichbedeutenden Wörter (die Synonyme) der Grammatik
// 2026-11-19: angelegt mit Claude
// DE: Ein Begriff hat oft mehrere Namen (unregelmäßig = irregular ≈ stark).
//     Die Grammatik-Seite markiert diese Wörter (gepunktet unterstrichen)
//     und zeigt am Ende jeder Regel „🔁 gleichbedeutende Wörter“.
// RU: Один термин – несколько названий. На странице «die Grammatik» такие слова
//     подчёркнуты точками (нажать – подсказка), а в конце правила – сноска.
//
// Aufbau:
//   namen – was angezeigt wird (= gleich, ≈ ungefähr gleich)
//   ru    – auf Russisch
//   such  – Wörter, nach denen im Text gesucht wird (Anfang des Wortes; Endungen erlaubt)
//   nicht – Wörter, die NICHT gemeint sind (z. B. Prädikativ ≠ Prädikat)
// Neue Einträge einfach unten anhängen.
// ============================================================
window.GRAMMATIK_SYNONYME = [
  // --- das Verb ---
  { namen: "unregelmäßig = irregular ≈ stark (das starke Verb)", ru: "неправильный глагол", such: ["unregelmäßig", "irregular", "starke Verb", "starken Verb"] },
  { namen: "regelmäßig = regular ≈ schwach (das schwache Verb)", ru: "правильный глагол", such: ["regelmäßig", "regular", "schwache Verb", "schwachen Verb"] },
  { namen: "das Hilfsverb = auxiliary verb", ru: "вспомогательный глагол", such: ["Hilfsverb", "auxiliary"] },
  { namen: "das Modalverb = modal verb", ru: "модальный глагол", such: ["Modalverb"] },
  { namen: "die Konjugation = die Beugung des Verbs (konjugieren)", ru: "спряжение", such: ["Konjugation", "konjugier"] },
  { namen: "die Deklination = die Beugung des Nomens (deklinieren)", ru: "склонение", such: ["Deklination", "dekliniert", "deklinieren"] },
  { namen: "die Zeitform = das Tempus = tense", ru: "время глагола", such: ["Zeitform", "Tempus"] },
  { namen: "das Präsens = die Gegenwart ≈ Present Simple", ru: "настоящее время", such: ["Präsens", "Gegenwart", "Present Simple"] },
  { namen: "das Präteritum = das Imperfekt = die 1. Vergangenheit ≈ Past Simple", ru: "простое прошедшее", such: ["Präteritum", "Imperfekt", "Past Simple"] },
  { namen: "das Perfekt = die vollendete Gegenwart = die 2. Vergangenheit ≈ Present Perfect", ru: "перфект (прошедшее разговорное)", such: ["Perfekt", "Present Perfect"] },
  { namen: "das Plusquamperfekt = die Vorvergangenheit = die 3. Vergangenheit ≈ Past Perfect", ru: "предпрошедшее время", such: ["Plusquamperfekt", "Vorvergangenheit", "Past Perfect"] },
  { namen: "das Futur I = die Zukunft ≈ will + Infinitiv", ru: "будущее время", such: ["Futur", "Zukunft"] },
  { namen: "der Infinitiv = die Grundform = die Nennform = V1", ru: "начальная (неопределённая) форма", such: ["Infinitiv", "Grundform", "Nennform", "V1"] },
  { namen: "das Partizip I = das Mittelwort der Gegenwart = present participle (-ing)", ru: "причастие настоящего времени", such: ["Partizip I"] },
  { namen: "das Partizip II = das Mittelwort der Vergangenheit = V3 = past participle", ru: "причастие прошедшего времени", such: ["Partizip II", "V3", "past participle"] },
  { namen: "der Imperativ = die Befehlsform", ru: "повелительное наклонение", such: ["Imperativ", "Befehlsform"] },
  { namen: "der Konjunktiv II = die Möglichkeitsform ≈ conditional (would)", ru: "сослагательное наклонение («бы»)", such: ["Konjunktiv II", "Möglichkeitsform", "conditional"] },
  // --- die Wortarten ---
  { namen: "das Substantiv = das Nomen = das Hauptwort = noun", ru: "имя существительное", such: ["Substantiv", "Nomen", "Hauptwort"] },
  { namen: "das Verb = das Zeitwort = das Tätigkeitswort = verb", ru: "глагол", such: ["Verb", "Zeitwort", "Tätigkeitswort"] },
  { namen: "das Adjektiv = das Eigenschaftswort = adjective", ru: "имя прилагательное", such: ["Adjektiv", "Eigenschaftswort", "adjective"] },
  { namen: "das Adverb = das Umstandswort = adverb", ru: "наречие", such: ["Adverb", "Umstandswort", "adverb"] },
  { namen: "das Pronomen = das Fürwort = pronoun", ru: "местоимение", such: ["Pronomen", "Fürwort", "pronoun"] },
  { namen: "die Präposition = das Verhältniswort = preposition", ru: "предлог", such: ["Präposition", "Verhältniswort", "preposition"] },
  { namen: "der Artikel = das Geschlechtswort = article", ru: "артикль", such: ["Artikel", "Geschlechtswort"] },
  { namen: "die Konjunktion = das Bindewort = conjunction", ru: "союз", such: ["Konjunktion", "Bindewort"] },
  // --- die Fälle ---
  { namen: "der Kasus = der Fall", ru: "падеж", such: ["Kasus"] },
  { namen: "der Nominativ = der 1. Fall = der Wer-Fall", ru: "именительный падеж", such: ["Nominativ", "Wer-Fall"] },
  { namen: "der Genitiv = der 2. Fall = der Wessen-Fall", ru: "родительный падеж", such: ["Genitiv", "Wessen-Fall"] },
  { namen: "der Dativ = der 3. Fall = der Wem-Fall", ru: "дательный падеж", such: ["Dativ", "Wem-Fall"] },
  { namen: "der Akkusativ = der 4. Fall = der Wen-Fall", ru: "винительный падеж", such: ["Akkusativ", "Wen-Fall"] },
  // --- der Satz ---
  { namen: "das Subjekt = der Satzgegenstand", ru: "подлежащее", such: ["Subjekt", "Satzgegenstand"] },
  { namen: "das Prädikat = die Satzaussage", ru: "сказуемое", such: ["Prädikat", "Satzaussage"], nicht: ["Prädikativ"] },
  { namen: "das Prädikativ = die Gleichsetzung (nach sein, werden, bleiben)", ru: "именная часть сказуемого", such: ["Prädikativ"] },
  { namen: "das Objekt = die Ergänzung", ru: "дополнение", such: ["Objekt"] },
  { namen: "der Nebensatz = der Gliedsatz", ru: "придаточное предложение", such: ["Nebensatz", "Nebensätze"] }
];
