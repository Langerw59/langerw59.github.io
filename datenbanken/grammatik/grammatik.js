// ============================================================
// Die Grammatik – Sammlung der Regeln (DE · EN · RU)
// 2026-11-12: angelegt mit Claude
// DE: Jede Regel wird nur EINMAL hier aufgeschrieben.
//     Satzlabor, Satzanalyse, Sprachführer usw. verlinken nur hierher:
//     /pages/language_lab/grammatik/index.html#<id>
// RU: Каждое правило записано только ОДИН раз – здесь.
//     Остальные программы только ссылаются сюда (кнопка «?»).
//
// Aufbau einer Regel:
//   id        – kurzer Name für den Link (#en-ing)
//   thema     – id aus THEMEN
//   titel     – deutscher Titel (immer mit Artikel)
//   titel_ru  – russischer Titel
//   sprache   – "en", "de" …
//   datum     – wann eingetragen
//   formel    – die Formel in einer Zeile
//   erklaerung– Erklärung auf Russisch (Liste von Absätzen)
//   beispiele – [{ de, en, ru, hinweis }]
//   tabelle   – { kopf:[…], zeilen:[[…]], sprechen: Spaltennummer mit englischem Text }
//   merke     – kurzer Merksatz
// ============================================================
window.GRAMMATIK = {
  themen: [
    { id: "verb",    titel: "das Verb",          titel_ru: "глагол" },
    { id: "pronomen", titel: "das Pronomen",     titel_ru: "местоимение" },
    { id: "artikel", titel: "der Artikel",       titel_ru: "артикль" },
    { id: "satz",    titel: "der Satzbau",       titel_ru: "порядок слов" },
    { id: "lesen",   titel: "das Lesen",         titel_ru: "чтение и произношение" }
  ],

  // fertige Seiten, die zur Grammatik gehören (nur Links)
  links: [
    { thema: "lesen", titel: "📏 die Leseregeln (Englisch)", titel_ru: "правила чтения: почему time – «тайм»",
      href: "/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/leseregeln.html" },
    { thema: "lesen", titel: "🔤 der Spickzettel (die Lautschrift)", titel_ru: "шпаргалка по транскрипции [ ]",
      href: "/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/spickzettel.html" }
  ],

  regeln: [
    {
      id: "en-ing",
      thema: "verb",
      sprache: "en",
      datum: "2026-11-12",
      titel: "die Endung -ing",
      titel_ru: "окончание -ing (stay → staying)",
      formel: "am / is / are + Verb-ing = gerade jetzt  ·  Verb-ing allein = das Bleiben (как существительное)",
      erklaerung: [
        "-ing НЕ имеет отношения к частице «-ся». «Ся» есть только в русском слове «оставаться». Английское stay само уже значит «оставаться» (по-немецки bleiben – тоже без «sich»).",
        "1) Действие идёт прямо сейчас или временно (Present Continuous): am / is / are + глагол + -ing. В немецком и русском отдельной формы нет – немцы добавляют слово gerade, русские понимают по смыслу. Англичане обязаны менять сам глагол.",
        "2) Действие как предмет (das Gerundium): глагол + -ing без am/is/are. Это как немецкое das Lesen, das Schwimmen, das Bleiben – из глагола сделали существительное."
      ],
      beispiele: [
        { en: "I stay at home on Sundays.", de: "Ich bleibe sonntags zu Hause.", ru: "По воскресеньям я сижу дома.", hinweis: "привычка – просто stay" },
        { en: "I am staying at home today.", de: "Ich bleibe heute (gerade) zu Hause.", ru: "Сегодня я остаюсь дома.", hinweis: "сейчас / временно – am staying" },
        { en: "I work.", de: "Ich arbeite.", ru: "Я работаю (вообще).", hinweis: "" },
        { en: "I am working.", de: "Ich arbeite gerade.", ru: "Я сейчас работаю (занят).", hinweis: "" },
        { en: "Staying here is nice.", de: "Das Bleiben hier ist schön.", ru: "Оставаться здесь приятно.", hinweis: "das Gerundium" },
        { en: "I like reading.", de: "Ich mag das Lesen.", ru: "Я люблю чтение.", hinweis: "das Gerundium" }
      ],
      merke: "stay = bleiben (вообще) · am staying = gerade bleiben (сейчас) · staying = das Bleiben (предмет)"
    },
    {
      id: "en-pronomen",
      thema: "pronomen",
      sprache: "en",
      datum: "2026-11-12",
      titel: "die Personalpronomen und die Possessivpronomen",
      titel_ru: "склонение местоимений: I – me – my – mine",
      formel: "I → me → my → mine  ·  ich → mich/mir → mein → meins",
      erklaerung: [
        "В английском у местоимения всего 4 формы. Немецкие mich (кого?) и mir (кому?) – в английском одно слово me. Так и с him, her, us, them.",
        "my / your / our … стоят перед существительным: our house – unser Haus. mine / yours / ours … стоят одни, без существительного: The house is ours – Das Haus gehört uns.",
        "you – это и du, и ihr, и Sie. Your – и dein, и euer, и Ihr.",
        "Произношение: our [aʊər] ≈ «ауэр», your [jɔːr] ≈ «йор», their [ðer] ≈ «зэа» (как there)."
      ],
      tabelle: {
        kopf: ["wer? · кто?", "wen? / wem? · кого? / кому?", "wessen? + Nomen · чей?", "allein · без сущ."],
        sprechen: true,
        zeilen: [
          ["I · ich · я",           "me · mich / mir · меня / мне",     "my · mein · мой",              "mine · meins"],
          ["you · du · ты",         "you · dich / dir · тебя / тебе",   "your · dein · твой",           "yours · deins"],
          ["he · er · он",          "him · ihn / ihm · его / ему",      "his · sein · его",             "his · seins"],
          ["she · sie · она",       "her · sie / ihr · её / ей",        "her · ihr · её",               "hers · ihrs"],
          ["it · es · оно",         "it · es / ihm · его / ему",        "its · sein · его",             "—"],
          ["we · wir · мы",         "us · uns / uns · нас / нам",       "our · unser · наш",            "ours · unseres"],
          ["you · ihr / Sie · вы",  "you · euch / Ihnen · вас / вам",   "your · euer / Ihr · ваш",      "yours · eures / Ihres"],
          ["they · sie · они",      "them · sie / ihnen · их / им",     "their · ihr · их",             "theirs · ihres"]
        ]
      },
      beispiele: [
        { en: "This is our house.", de: "Das ist unser Haus.", ru: "Это наш дом.", hinweis: "our + существительное" },
        { en: "The house is ours.", de: "Das Haus gehört uns.", ru: "Дом – наш.", hinweis: "ours – одно" },
        { en: "Is this your car?", de: "Ist das dein (Ihr) Auto?", ru: "Это твоя (ваша) машина?", hinweis: "" },
        { en: "Help me, please.", de: "Hilf mir, bitte.", ru: "Помоги мне, пожалуйста.", hinweis: "me = mir" },
        { en: "Can you see me?", de: "Siehst du mich?", ru: "Ты меня видишь?", hinweis: "me = mich" },
        { en: "I give them their books.", de: "Ich gebe ihnen ihre Bücher.", ru: "Я даю им их книги.", hinweis: "" }
      ],
      merke: "Перед существительным – my, your, our. В конце фразы, без существительного – mine, yours, ours."
    },
    {
      id: "en-be",
      thema: "verb",
      sprache: "en",
      datum: "2026-11-12",
      titel: "das Verb to be (sein) und das Futur mit will",
      titel_ru: "глагол be (быть): am / is / are – was / were – will be",
      formel: "be = sein  ·  jetzt: am / is / are  ·  früher: was / were  ·  will / can / must + be",
      erklaerung: [
        "be – это начальная форма глагола «быть» (по-немецки sein). Это не частица «-ся». Как и sein, он меняется: I am – ich bin, it is – es ist, we are – wir sind.",
        "Чистое be (без изменений) стоит только после will, can, must: It will be ready. It can be ready. Так же в немецком: es wird fertig sein, es kann fertig sein.",
        "Зачем be в «It will be ready»? ready (готов, fertig) – не глагол, а прилагательное. В английском предложении обязательно нужен глагол, поэтому: will + be + ready. По-русски «будет готово», по-английски дословно «будет быть готово».",
        "Вопрос: will ставим перед it. It will be ready. → When will it be ready? Так же в немецком: Es wird … → Wann wird es …?",
        "В разговорном немецком чаще говорят просто Wann ist es fertig? (das Präsens вместо будущего) или Wann wird es fertig? (здесь werden – самостоятельный глагол «становиться»). Английское When will it be ready? – обычная разговорная фраза, совсем не книжная."
      ],
      tabelle: {
        kopf: ["die Gegenwart · сейчас", "die Vergangenheit · было", "die Zukunft · будет"],
        sprechen: true,
        zeilen: [
          ["I am · ich bin · я (есть)",         "I was · ich war · я был",          "I will be · ich werde sein · я буду"],
          ["you are · du bist · ты",            "you were · du warst · ты был",     "you will be · du wirst sein · ты будешь"],
          ["he is · er ist · он",               "he was · er war · он был",         "he will be · er wird sein · он будет"],
          ["she is · sie ist · она",            "she was · sie war · она была",     "she will be · sie wird sein · она будет"],
          ["it is · es ist · оно",              "it was · es war · оно было",       "it will be · es wird sein · оно будет"],
          ["we are · wir sind · мы",            "we were · wir waren · мы были",    "we will be · wir werden sein · мы будем"],
          ["you are · ihr seid / Sie sind · вы","you were · ihr wart · вы были",    "you will be · ihr werdet sein · вы будете"],
          ["they are · sie sind · они",         "they were · sie waren · они были", "they will be · sie werden sein · они будут"]
        ]
      },
      beispiele: [
        { en: "When will it be ready?", de: "Wann ist es fertig? (Wann wird es fertig sein?)", ru: "Когда это будет готово?", hinweis: "will + be" },
        { en: "It will be ready tomorrow.", de: "Es ist morgen fertig.", ru: "Это будет готово завтра.", hinweis: "" },
        { en: "It is ready.", de: "Es ist fertig.", ru: "Это готово.", hinweis: "is – сейчас" },
        { en: "It was ready.", de: "Es war fertig.", ru: "Это было готово.", hinweis: "was – было" },
        { en: "I am at home.", de: "Ich bin zu Hause.", ru: "Я дома.", hinweis: "по-русски «есть» не говорим, по-английски am обязательно" },
        { en: "It can be cold.", de: "Es kann kalt sein.", ru: "Может быть холодно.", hinweis: "can + be" }
      ],
      merke: "Один be в предложении: либо он меняется сам (am / is / are / was / were), либо перед ним will / can / must – тогда просто be. Неправильно: It is be ready."
    }
  ]
};
