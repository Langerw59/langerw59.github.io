// ============================================================
// Glossar DE – deutsche Fachwörter der Grammatik (Wortarten, Satzglieder, Verbformen)
// 2026-11-18 · angelegt mit Claude
// DE: Deutsche Begriffe IMMER mit Artikel, mit deutscher Aussprache (deutsche Stimme!),
//     Herkunft (meist Latein) und Beispiel. Viele Begriffe heißen auf Englisch fast gleich
//     (finite, infinitive …) – werden dort aber ganz anders ausgesprochen.
// RU: Немецкие термины грамматики – всегда с артиклем, с немецким произношением,
//     происхождением и примером. Читает НЕМЕЦКИЙ голос.
//
// Felder / поля:
//   w    – Begriff mit Artikel (so wird er angezeigt)
//   k    – Suchformen (markierte Wörter: finite, finites, Infinitivs …)
//   sag  – was die deutsche Stimme vorliest
//   aus  – Aussprache: Silben, BETONTE Silbe groß + Lautschrift
//   de   – kurze deutsche Erklärung          ru – по-русски
//   h    – Herkunft-Gruppe (lat, griech, germ …) – wie im Glossar EN
//   her  – Herkunft erklärt                  ver – verwandte Wörter
//   tip  – Merkhilfe / ловушка               bsp – [[Deutsch, Erklärung], …]
//   en   – so heißt es auf Englisch (+ englische Aussprache)
//   gr   – Link zur Regel in „die Grammatik“ (#id)
// Neue Begriffe einfach unten anhängen.
// ============================================================
window.GLOSSAR_DE = [
  {
    w: "das finite Verb", k: ["finit", "finite", "finites", "finiten", "finiter", "finitem", "das Finitum", "Finitum", "die Personalform", "Personalform"],
    sag: "finit. das finite Verb", aus: "fi-NIT [fiˈniːt]",
    de: "die gebeugte (konjugierte) Form des Verbs – zeigt Person, Zahl, Zeit und Modus: ich sehe, du siehst, er sah",
    ru: "спрягаемый (личный) глагол: форма, изменённая по лицу, числу, времени",
    h: "lat",
    her: "Лат. finitus «ограниченный, определённый» ← finis «граница, конец». Форма «определена»: по ней видно, КТО (лицо), СКОЛЬКО (число), КОГДА (время).",
    ver: "DE das Finale, der Infinitiv, die Definition · EN finish, final · RU финиш, финал, дефиниция",
    tip: "По-немецки читается «фи-НИТ», ударение на последний слог. «Файнайт» – это АНГЛИЙСКОЕ чтение того же латинского слова (finite verb). В немецком предложении finites Verb стоит на 2-м месте (die Verbzweitstellung).",
    bsp: [["Ich sehe aus dem Fenster.", "sehe = das finite Verb (1. Person Singular, Präsens) · der Infinitiv: sehen"],
          ["Ich habe aus dem Fenster gesehen.", "habe = finit · gesehen = infinit (das Partizip II)"]],
    en: "finite verb [ˈfaɪnaɪt] – «файнайт»", gr: "de-finit-infinit"
  },
  {
    w: "die infinite Verbform", k: ["infinit", "infinite", "infinites", "infiniten", "infiniter"],
    sag: "infinit. die infinite Verbform", aus: "IN-fi-nit [ˈɪnfiniːt]",
    de: "die nicht gebeugte Form des Verbs: der Infinitiv (sehen), das Partizip I (sehend), das Partizip II (gesehen)",
    ru: "неспрягаемая форма глагола – не показывает лицо и число",
    h: "lat",
    her: "Лат. in- «не» + finitus «определённый» = «неопределённый».",
    ver: "DE finit, der Infinitiv · RU инфинитив",
    tip: "Infinite Formen стоят обычно в конце предложения (die rechte Satzklammer): Ich will nach Hause GEHEN. Ich bin nach Hause GEGANGEN.",
    bsp: [["Ich will heute nicht arbeiten.", "will = finit · arbeiten = infinit (der Infinitiv)"]],
    en: "non-finite form", gr: "de-finit-infinit"
  },
  {
    w: "der Infinitiv", k: ["Infinitiv", "Infinitivs", "Infinitive", "die Grundform", "Grundform", "die Nennform", "Nennform"],
    sag: "der Infinitiv", aus: "IN-fi-ni-tiv [ˈɪnfinitiːf]",
    de: "die Grundform des Verbs, wie im Wörterbuch: sehen, gehen, arbeiten (endet fast immer auf -en oder -n)",
    ru: "инфинитив, неопределённая форма глагола (видеть, идти)",
    h: "lat",
    her: "Лат. (modus) infinitivus «неопределённый (способ)» ← in- «не» + finire «ограничивать». Русское «НЕопределённая форма» – буквальный перевод того же латинского слова.",
    ver: "DE finit, infinit · EN infinitive [ɪnˈfɪnətɪv] · RU инфинитив",
    tip: "Как найти Infinitiv: спросите себя «Was muss man tun?» – sehen. От него строятся все формы: ich sehe, du siehst, er sah, gesehen.",
    bsp: [["sehen → ich sehe, du siehst, er sieht", "der Infinitiv und das Präsens"]],
    en: "infinitive [ɪnˈfɪnətɪv]", gr: "de-finit-infinit"
  },
  {
    w: "das Partizip", k: ["Partizip", "Partizips", "Partizipien", "Partizip I", "Partizip II", "das Mittelwort", "Mittelwort"],
    sag: "das Partizip", aus: "par-ti-ZIP [paʁtiˈʦiːp]",
    de: "die Mittelform zwischen Verb und Adjektiv: Partizip I – sehend, gehend; Partizip II – gesehen, gegangen",
    ru: "причастие: Partizip I ≈ видящий/видя, Partizip II ≈ увиденный (для Perfekt: ich habe gesehen)",
    h: "lat",
    her: "Лат. participium «причастность» ← pars «часть» + capere «брать»: форма «берёт часть» от глагола и часть от прилагательного.",
    ver: "DE der Teil, die Partei, teilnehmen · EN participle · RU партия, частица, причастие",
    tip: "Partizip II почти всегда с ge-: ge-seh-en, ge-mach-t. Без ge- – у глаголов на -ieren (studiert) и с неотделяемой приставкой (besucht, verstanden).",
    bsp: [["Ich habe aus dem Fenster gesehen.", "gesehen = das Partizip II"], ["das weinende Kind", "weinend = das Partizip I"]],
    en: "participle [ˈpɑːtɪsɪpl]", gr: "de-finit-infinit"
  },
  {
    w: "die Konjugation", k: ["Konjugation", "konjugieren", "konjugiert", "die Beugung", "Beugung", "beugen"],
    sag: "die Konjugation. konjugieren", aus: "kon-ju-ga-ZION [kɔnjuɡaˈʦi̯oːn]",
    de: "die Beugung des Verbs nach Person, Zahl, Zeit und Modus: ich sehe, du siehst, er sieht …",
    ru: "спряжение глагола",
    h: "lat",
    her: "Лат. coniugatio «соединение» ← con- «вместе» + iugum «ярмо»: к основе глагола «припрягают» окончания.",
    ver: "DE das Joch · EN conjugation, yoke · RU иго (ярмо), супруг (= «в одной упряжке»)",
    tip: "Konjugation – у глаголов. У существительных и прилагательных изменение по падежам называется die Deklination.",
    bsp: [["ich sehe, du siehst, er sieht, wir sehen, ihr seht, sie sehen", "die Konjugation von «sehen» im Präsens"]],
    en: "conjugation", gr: "de-finit-infinit"
  },
  {
    w: "die Person", k: ["Person", "1. Person", "2. Person", "3. Person"],
    sag: "die Person", aus: "per-SON [pɛʁˈzoːn]",
    de: "wer handelt: 1. Person = ich / wir, 2. Person = du / ihr, 3. Person = er, sie, es / sie",
    ru: "лицо (грамматическое): 1-е – я/мы, 2-е – ты/вы, 3-е – он/она/оно/они",
    h: "lat",
    her: "Лат. persona «маска актёра, роль» – в грамматике: «роль» в разговоре (говорящий, слушающий, тот, о ком говорят).",
    ver: "DE das Personalpronomen, persönlich · EN person · RU персона, персонаж",
    bsp: [["ich sehe – du siehst – er sieht", "1. – 2. – 3. Person Singular"]],
    en: "person", gr: "de-finit-infinit"
  },
  {
    w: "der Numerus", k: ["Numerus", "der Singular", "Singular", "die Einzahl", "Einzahl", "der Plural", "Plural", "die Mehrzahl", "Mehrzahl"],
    sag: "der Numerus. der Singular. der Plural", aus: "NU-me-rus [ˈnuːməʁʊs] · SIN-gu-lar · PLU-ral",
    de: "die Zahl: der Singular (Einzahl: ich, du, er) und der Plural (Mehrzahl: wir, ihr, sie)",
    ru: "число: единственное (Singular) и множественное (Plural)",
    h: "lat",
    her: "Лат. numerus «число»; singularis «одиночный»; pluralis «многочисленный» ← plus «больше».",
    ver: "DE die Nummer, plus · EN number, single, plural · RU номер, плюс",
    bsp: [["ich sehe / wir sehen", "Singular / Plural"]],
    en: "number, singular, plural"
  },
  {
    w: "das Tempus", k: ["Tempus", "Tempora", "die Zeitform", "Zeitform"],
    sag: "das Tempus. die Zeitform", aus: "TEM-pus [ˈtɛmpʊs]",
    de: "die Zeitform des Verbs: das Präsens, das Präteritum, das Perfekt, das Plusquamperfekt, das Futur I, das Futur II",
    ru: "грамматическое время глагола",
    h: "lat",
    her: "Лат. tempus «время» (мн. ч. tempora).",
    ver: "DE das Tempo, temporär · EN tense, temporary · RU темп, темперамент",
    tip: "Tempus (грамматическая форма) ≠ реальное время: «Morgen gehe ich nach Hause» – Präsens, но про будущее.",
    bsp: [["ich sehe – ich sah – ich habe gesehen", "Präsens – Präteritum – Perfekt"]],
    en: "tense", gr: "zeitform-zeitbezug"
  },
  {
    w: "der Modus", k: ["Modus", "Modi", "der Indikativ", "Indikativ", "der Konjunktiv", "Konjunktiv", "der Imperativ", "Imperativ"],
    sag: "der Modus. der Indikativ. der Konjunktiv. der Imperativ", aus: "MO-dus [ˈmoːdʊs]",
    de: "die Aussageweise: der Indikativ (Wirklichkeit: ich sehe), der Konjunktiv (Wunsch, Möglichkeit: ich würde sehen), der Imperativ (Befehl: Sieh!)",
    ru: "наклонение: изъявительное (Indikativ), сослагательное (Konjunktiv), повелительное (Imperativ)",
    h: "lat",
    her: "Лат. modus «мера, способ». Indicativus ← indicare «указывать»; coniunctivus «соединительный» (стоял в придаточных); imperativus ← imperare «приказывать».",
    ver: "DE die Mode, modern · EN mode, mood · RU мода, модель, император",
    bsp: [["Ich sehe. – Ich würde sehen. – Sieh!", "Indikativ – Konjunktiv II – Imperativ"]],
    en: "mood (Indicative, Subjunctive, Imperative)"
  },
  {
    w: "das Prädikat", k: ["Prädikat", "Prädikats", "die Satzaussage", "Satzaussage"],
    sag: "das Prädikat", aus: "prä-di-KAT [pʁɛdiˈkaːt]",
    de: "das Satzglied «Was tut …?» – alle Verbteile zusammen: sehe; habe … gesehen; will … arbeiten",
    ru: "сказуемое",
    h: "lat",
    her: "Лат. praedicatum «высказанное» ← praedicare «объявлять публично».",
    ver: "DE der Prediger, predigen · EN predicate · RU предикат",
    tip: "Prädikat = finites Verb + (если есть) infinite Teile в конце. Вместе они образуют die Satzklammer.",
    bsp: [["Ich habe aus dem Fenster gesehen.", "das Prädikat: habe … gesehen"]],
    en: "predicate", gr: "de-finit-infinit"
  },
  {
    w: "das Subjekt", k: ["Subjekt", "Subjekts", "der Satzgegenstand", "Satzgegenstand"],
    sag: "das Subjekt", aus: "sub-JEKT [zʊpˈjɛkt]",
    de: "das Satzglied «Wer? / Was?» – steht im Nominativ und bestimmt die Form des finiten Verbs",
    ru: "подлежащее",
    h: "lat",
    her: "Лат. subiectum «положенное в основу» ← sub «под» + iacere «бросать».",
    ver: "DE das Objekt, das Projekt · EN subject · RU субъект, проект, объект",
    tip: "Subjekt «командует» глаголом: ich → sehe, du → siehst. Поэтому finites Verb всегда согласуется с Subjekt.",
    bsp: [["Ich sehe aus dem Fenster.", "ich = das Subjekt → sehe"]],
    en: "subject"
  },
  {
    w: "die Satzklammer", k: ["Satzklammer", "die Klammer", "Klammer", "die linke Klammer", "die rechte Klammer", "linke Klammer", "rechte Klammer"],
    sag: "die Satzklammer", aus: "SATZ-klam-mer [ˈzaʦklamɐ]",
    de: "die «Klammer» aus dem finiten Verb (links, 2. Stelle) und den infiniten Teilen (rechts, am Satzende)",
    ru: "рамка предложения: спрягаемый глагол слева, остальная часть глагола – в конце",
    h: "germ",
    her: "Немецкое слово: der Satz «предложение» + die Klammer «скобка, скоба» (klemmen «зажимать»).",
    ver: "DE klemmen, die Klemme · EN clamp",
    bsp: [["Ich bin gestern nach Hause gegangen.", "bin … gegangen = die Satzklammer"]],
    en: "sentence bracket", gr: "de-finit-infinit"
  },
  {
    w: "das Vorfeld", k: ["Vorfeld", "das Mittelfeld", "Mittelfeld", "das Nachfeld", "Nachfeld"],
    sag: "das Vorfeld. das Mittelfeld", aus: "VOR-feld · MIT-tel-feld",
    de: "die Felder im Satz: das Vorfeld (vor dem finiten Verb, genau ein Satzglied), das Mittelfeld (zwischen den Klammern)",
    ru: "«поля» предложения: предполье (перед глаголом) и среднее поле (между частями глагола)",
    h: "germ",
    her: "Немецкие слова: vor «перед» / Mittel «середина» + das Feld «поле».",
    ver: "EN field · RU поле",
    tip: "Im Vorfeld steht ВСЕГДА ровно одно Satzglied – поэтому глагол на 2-м месте: Heute | sehe | ich …",
    bsp: [["Heute sehe ich aus dem Fenster.", "Vorfeld: heute · finites Verb: sehe · Mittelfeld: ich aus dem Fenster"]],
    en: "front field, middle field"
  },
  {
    w: "der Nominativ", k: ["Nominativ", "Nominativs", "der Werfall", "Werfall"],
    sag: "der Nominativ", aus: "NO-mi-na-tiv [ˈnoːminatiːf]",
    de: "der 1. Fall – Frage «Wer? / Was?»; Fall des Subjekts",
    ru: "именительный падеж (кто? что?)",
    h: "lat",
    her: "Лат. (casus) nominativus «называющий (падеж)» ← nomen «имя».",
    ver: "DE der Name, nominieren · EN name, nominate · RU номинация, имя",
    bsp: [["Der Mann isst den Apfel.", "der Mann = Nominativ (Subjekt)"]],
    en: "nominative"
  },
  {
    w: "das Verb", k: ["Verb", "Verbs", "Verben", "das Zeitwort", "Zeitwort", "das Tätigkeitswort", "Tätigkeitswort"],
    sag: "das Verb", aus: "VERB [vɛʁp] – «ферп»",
    de: "die Wortart für Tätigkeiten und Zustände: sehen, gehen, sein; wird konjugiert",
    ru: "глагол",
    h: "lat",
    her: "Лат. verbum «слово» – глагол считали «главным словом» предложения.",
    ver: "DE verbal · EN verb, word · RU вербальный",
    tip: "В конце -b читается как [p]: das Verb = «ферп» (die Auslautverhärtung – оглушение на конце, как в русском «дуб» = «дуп»).",
    bsp: [["Ich sehe aus dem Fenster.", "sehe = das Verb"]],
    en: "verb [vɜːb]"
  },
  {
    w: "das starke Verb", k: ["starke Verb", "starkes Verb", "starken Verben", "starke Verben", "der Vokalwechsel", "Vokalwechsel", "der Ablaut", "Ablaut"],
    sag: "das starke Verb", aus: "das STAR-ke VERB",
    de: "ein Verb, das den Stammvokal ändert: sehen – du siehst – sah – gesehen (Partizip II auf -en)",
    ru: "сильный (неправильный) глагол: меняет гласную в корне",
    h: "germ",
    her: "Термин Якоба Гримма (1819): такие глаголы образуют формы «своей силой» – изменением корня, без суффикса -te.",
    ver: "das schwache Verb (machen – machte – gemacht) · EN irregular verb",
    tip: "e → ie / i в du и er/sie/es: sehen → du siehst, er sieht; geben → du gibst; lesen → du liest.",
    bsp: [["sehen – sah – gesehen", "die Stammformen eines starken Verbs"]],
    en: "strong (irregular) verb", gr: "de-finit-infinit"
  }
];
