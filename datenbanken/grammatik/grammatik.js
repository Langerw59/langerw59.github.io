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
    { id: "grundbegriffe", titel: "die Grundbegriffe", titel_ru: "основные понятия" },
    { id: "verb",    titel: "das Verb",          titel_ru: "глагол" },
    { id: "pronomen", titel: "das Pronomen",     titel_ru: "местоимение" },
    { id: "praeposition", titel: "die Präposition",   titel_ru: "предлог" },
    { id: "artikel", titel: "der Artikel",       titel_ru: "артикль" },
    { id: "satz",    titel: "der Satzbau",       titel_ru: "порядок слов" },
    { id: "lesen",   titel: "das Lesen",         titel_ru: "чтение и произношение" }
  ],

  // fertige Seiten, die zur Grammatik gehören (nur Links)
  links: [
    { thema: "lesen", titel: "📏 die Leseregeln (Englisch)", titel_ru: "правила чтения: почему time – «тайм», night – «найт»",
      href: "/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/leseregeln.html" },
    { thema: "lesen", titel: "🔤 der Spickzettel (die Lautschrift)", titel_ru: "все значки транскрипции [ ] в одной таблице – для отдельного слова см. «Wie liest man das?» в глоссарии",
      href: "/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/spickzettel.html" }
  ],

  regeln: [
    {
      // 2026-11-18: mit Claude – konjugieren / deklinieren
      id: "de-konjugieren-deklinieren",
      thema: "grundbegriffe",
      sprache: "de",
      datum: "2026-11-18",
      titel: "konjugieren und deklinieren",
      titel_ru: "спрягать и склонять – в чём разница",
      formel: "das Verb → konjugieren (спрягать)  ·  das Nomen, der Artikel, das Adjektiv, das Pronomen → deklinieren (склонять)",
      // definitionen: deutscher Text + Knopf „по-русски“ zum Aufklappen der Übersetzung
      definitionen: [
        { wort: "konjugieren (die Konjugation)",
          de: "Konjugieren bedeutet, ein Verb (Tuwort) an verschiedene grammatische Merkmale anzupassen: an die Person (ich, du, er …), die Zahl (der Numerus), die Zeit (das Tempus) und die Aussageweise (der Modus).",
          ru: "Спрягать – значит изменять глагол в соответствии с грамматическими признаками: по лицам (я, ты, он …), по числам (число), по временам (время) и по наклонениям (наклонение)." },
        { wort: "deklinieren (die Deklination)",
          de: "Deklinieren bedeutet, ein Nomen (Namenwort), einen Artikel, ein Adjektiv (Wiewort) oder ein Pronomen (Fürwort) an den Fall (der Kasus), die Zahl (der Numerus) und das Geschlecht (das Genus) anzupassen.",
          ru: "Склонять – значит изменять существительное, артикль, прилагательное или местоимение по падежам, по числам и по родам." }
      ],
      erklaerung: [
        "Konjugieren (спрягать) – это только про глагол (das Verb). Глагол меняется по лицу, числу, времени и наклонению: ich gehe, du gehst, er geht, wir gehen; ich ging; ich würde gehen.",
        "Deklinieren (склонять) – это про всё, что меняется по падежам: das Nomen (существительное), der Artikel, das Adjektiv, das Pronomen. Они меняются по падежу (der Kasus), числу (der Numerus) и роду (das Genus): der Mann, des Mannes, dem Mann, den Mann.",
        "Значит, «ich gehe, du gehst, er geht» – это die Konjugation (спряжение), а не die Deklination. В русском точно так же: «я иду, ты идёшь» – спряжение; «стол, стола, столу» – склонение.",
        "Die Etymologie: konjugieren ← лат. coniugare «запрягать вместе» (con- «вместе» + iugum «ярмо», нем. das Joch). Русское «спрягать» – та же картинка: «впрягать, упряжь». deklinieren ← лат. declinare «отклонять, наклонять» (de- «от» + clinare «наклонять»). Русское «склонять» – тот же образ. Оба русских слова – кальки (Lehnübersetzungen) с латыни.",
        "По-английски: to conjugate (спрягать), to decline (склонять)."
      ],
      tabelle: {
        kopf: ["konjugieren · спрягать (das Verb)", "deklinieren · склонять (das Nomen)"],
        sprechen: true,
        zeilen: [
          ["ich gehe · я иду · 1. Person Singular",      "der Mann · der Nominativ · кто?"],
          ["du gehst · ты идёшь · 2. Person Singular",   "des Mannes · der Genitiv · чей?"],
          ["er geht · он идёт · 3. Person Singular",     "dem Mann · der Dativ · кому?"],
          ["wir gehen · мы идём · 1. Person Plural",     "den Mann · der Akkusativ · кого?"],
          ["ihr geht · вы идёте · 2. Person Plural",     "die Männer · der Plural · мужчины"],
          ["sie gehen · они идут · 3. Person Plural",    "den Männern · der Dativ Plural · мужчинам"],
          ["ich ging · я шёл · das Präteritum",          "—"]
        ]
      },
      beispiele: [
        { de: "Ich gehe nach Hause.", en: "I go home.", ru: "Я иду домой.", hinweis: "gehe – глагол спрягается (konjugiert)" },
        { de: "Du gehst nach Hause.", en: "You go home.", ru: "Ты идёшь домой.", hinweis: "gehst – другое лицо" },
        { de: "Das Auto des Mannes ist neu.", en: "The man's car is new.", ru: "Машина мужчины новая.", hinweis: "des Mannes – склоняется (dekliniert), der Genitiv" },
        { de: "Ich helfe dem Mann.", en: "I help the man.", ru: "Я помогаю мужчине.", hinweis: "dem Mann – der Dativ" }
      ],
      merke: "Глагол – konjugieren (спрягать): ich gehe, du gehst. Существительное, артикль, прилагательное, местоимение – deklinieren (склонять): der Mann, des Mannes, dem Mann."
    },
    {
      id: "en-ing",
      thema: "verb",
      sprache: "en",
      datum: "2026-11-12, überarbeitet 2026-11-17",
      titel: "die Endung -ing (das Partizip I und das Gerundium)",
      titel_ru: "окончание -ing: go → going, visit → visiting",
      formel: "Verb + -ing = das Verb «im Gang»  ·  going ≈ gehend ≈ идущий / идя / хождение",
      erklaerung: [
        "ТЕРМИНЫ (таблица 0). У английского глагола 4 основные формы: V1 (der Infinitiv: go), V2 (das Präteritum: went), V3 (das Partizip II: gone) и V-ing. У формы V-ing два грамматических названия – по её работе в предложении: present participle (das Partizip I) – когда она описывает процесс или признак, и gerund (das Gerundium) – когда она работает как существительное. Форма одна, названия два.",
        "ВРЕМЯ И ВИД. В английской грамматике у глагола два «измерения»: die Zeitform (das Tempus) – КОГДА (Present, Past, Future) и der Aspekt – КАК (Simple – просто факт, Continuous/Progressive – в процессе, die Verlaufsform; Perfect – завершено). Название времени всегда складывается из двух слов: Past + Continuous = Past Continuous. В немецком языке нет грамматической Verlaufsform – её заменяют словом gerade. В русском похожая идея – несовершенный вид (шёл, а не пошёл), но точно совпадает не всегда.",
        "ФОРМУЛЫ (das Hilfsverb be + V-ing): Present Continuous = am / is / are + V-ing. Past Continuous = was / were + V-ing. Future Continuous = will be + V-ing. Отрицание: not после Hilfsverb (I am not going). Вопрос: Hilfsverb вперёд (Are you going?).",
        "-ING – ЭТО ОДНА ИЗ ФОРМ ГЛАГОЛА. Как немецкий глагол имеет формы gehen – geht – ging – gegangen, так и у английского глагола есть свои формы: go – goes – went – gone – going. Каждая форма нужна для своего времени (die Zeitform). Смотрите таблицу 1.",
        "КАЖДОЕ ВРЕМЯ ИМЕЕТ ПАРУ: простое (Simple) и «в процессе» (Continuous). Формула Continuous: глагол be в нужном времени + форма на -ing. Меняется только be (am → was → will be), а going остаётся всегда одинаковым. Смотрите таблицу 2 – она построена на предложении «Ich gehe nach Hause».",
        "ГЛАВНАЯ МЫСЛЬ. Простая форма (go, visit) называет действие вообще – как в словаре: «ходить», «посещать». Форма с -ing (going, visiting) показывает действие изнутри: оно идёт, длится, ещё не закончено. Ближе всего по-немецки окончание -end: gehen → gehend, besuchen → besuchend (das Partizip I). По-русски: идущий / идя, посещающий / посещая.",
        "Форма с -ing сама по себе – не сказуемое. Нельзя сказать I going или we visiting. Ей всегда нужен помощник перед ней или своё место в предложении. Таких ролей четыре.",
        "РОЛЬ 1 – «сейчас в процессе» (das Present Continuous): am / is / are + -ing. Дословно I am going = «я есть идущий», по-немецки «ich bin gehend». Так по-немецки не говорят, говорят Ich gehe gerade. А в английском am going обязательно, если действие идёт в эту минуту или временно (сегодня, на этой неделе).",
        "То же в прошлом (das Past Continuous): was / were + -ing = «был в процессе». I was reading when you called – я как раз читал, когда ты позвонил. Обычно так описывают фон, на котором что-то случилось.",
        "РОЛЬ 2 – план (going to): am / is / are going to + простой глагол = «собираюсь». Здесь going уже не значит «иду», это готовое выражение, как немецкое Ich habe vor … или Ich werde …. После to глагол стоит без -ing: going to visit, а не going to visiting.",
        "РОЛЬ 3 – действие как предмет (das Gerundium). Перед ним нет am / is / are. Это как немецкое das Besuchen, das Lesen, das Reisen: из глагола сделали существительное. Где его ставят: в начале предложения (Visiting museums is interesting); после глаголов like, love, enjoy, stop, finish (I like reading); после предлогов before, after, without (before going – vor dem Gehen, перед тем как идти).",
        "РОЛЬ 4 – признак, как прилагательное (das Partizip I). Стоит перед существительным: a sleeping child – ein schlafendes Kind – спящий ребёнок; boiling water – kochendes Wasser – кипящая вода. Здесь английский и немецкий совпадают полностью: -ing = -end.",
        "КАК УЗНАТЬ РОЛЬ – посмотрите, что стоит слева. am / is / are / was / were → процесс (роль 1). going to → план (роль 2). like, stop, before … или -ing в начале предложения → действие как предмет (роль 3). Сразу после -ing идёт существительное (a sleeping child) → признак (роль 4).",
        "ИСКЛЮЧЕНИЯ для роли 1. Глаголы состояния обычно без -ing, потому что это не процесс: know, like, want, need, understand, have (= иметь). Правильно I know, I want – а не I am knowing.",
        "ПРОИЗНОШЕНИЕ: -ing [ɪŋ] – короткое «и» и носовое «н», как в немецком der Ring, lang. Звук «г» в конце не произносится: going ≈ «гоуин», не «гоуинг».",
        "ПРАВОПИСАНИЕ – смотрите таблицу 3."
      ],
      tabellen: [
      {
        titel: "0) die Fachbegriffe · грамматические термины (выучить!)",
        kopf: ["der Begriff (English)", "Deutsch", "Русский", "das Beispiel · пример"],
        sprechen: false,
        zeilen: [
          ["base form / infinitive (V1)",   "der Infinitiv, die Grundform",            "инфинитив, начальная форма",          "go, visit"],
          ["past simple (V2)",              "das Präteritum",                          "простое прошедшее",                   "went, visited"],
          ["past participle (V3)",          "das Partizip II (das Partizip Perfekt)",  "причастие прошедшего времени",        "gone, visited"],
          ["present participle (V-ing)",    "das Partizip I (das Partizip Präsens)",   "причастие настоящего времени / деепричастие", "going = gehend = идущий / идя"],
          ["gerund (V-ing)",                "das Gerundium, das substantivierte Verb", "герундий, отглагольное существительное", "going = das Gehen = хождение"],
          ["auxiliary verb",                "das Hilfsverb",                           "вспомогательный глагол",              "be, have, will"],
          ["tense",                         "die Zeitform, das Tempus",                "время глагола",                       "Present, Past, Future"],
          ["aspect: simple – continuous (progressive) – perfect", "der Aspekt: einfach – Verlaufsform – vollendet", "вид действия: простой – длительный – завершённый", "I go – I am going – I have gone"]
        ]
      },
      {
        titel: "1) die Formen des Verbs · формы глагола (go = gehen)",
        kopf: ["English", "Deutsch", "Русский", "wofür · для чего"],
        sprechen: 0,
        zeilen: [
          ["go",    "gehen (der Infinitiv)",     "идти / ходить",   "вообще; I go, we go"],
          ["goes",  "er geht",                   "он идёт",         "только he / she / it в настоящем"],
          ["went",  "ging (das Präteritum)",     "шёл / пошёл",     "прошлое: I went"],
          ["gone",  "gegangen (das Partizip II)", "ушёл / ушедший", "с have: I have gone"],
          ["going", "gehend (das Partizip I)",   "идущий / идя",    "с am / is / are / was / were: I am going"]
        ]
      },
      {
        titel: "2) die Zeitformen: einfach und mit -ing · времена: простое и с -ing",
        kopf: ["English", "der Name", "Deutsch", "Русский"],
        sprechen: 0,
        zeilen: [
          ["I go home.",             "Present Simple",     "Ich gehe nach Hause. (oft, immer)",       "Я хожу домой (обычно)."],
          ["I am going home.",       "Present Continuous", "Ich gehe gerade nach Hause.",              "Я сейчас иду домой."],
          ["I went home.",           "Past Simple",        "Ich ging nach Hause.",                     "Я пошёл домой."],
          ["I was going home.",      "Past Continuous",    "Ich war gerade auf dem Weg nach Hause.",   "Я как раз шёл домой."],
          ["I have gone home.",      "Present Perfect",    "Ich bin nach Hause gegangen.",             "Я ушёл домой (и теперь дома)."],
          ["I will go home.",        "Future Simple",      "Ich werde nach Hause gehen.",              "Я пойду домой."],
          ["I will be going home.",  "Future Continuous",  "Ich werde gerade nach Hause gehen.",       "Я буду (в тот момент) идти домой."],
          ["I am going to go home.", "going to",           "Ich habe vor, nach Hause zu gehen.",       "Я собираюсь пойти домой."]
        ]
      },
      {
        titel: "3) die Rechtschreibung · правописание",
        kopf: ["die Regel · правило", "das Verb", "+ -ing"],
        sprechen: false,
        zeilen: [
          ["normal · обычно просто + ing", "go · visit · read", "going · visiting · reading"],
          ["stummes e fällt weg · немая e на конце выпадает", "make · come · write", "making · coming · writing"],
          ["kurze betonte Silbe · короткий ударный слог: согласная удваивается", "sit · run · stop · swim", "sitting · running · stopping · swimming (aber: visit → visiting, ударение не на конце)"],
          ["ie → y", "lie · die", "lying · dying"]
        ]
      }
      ],
      beispiele: [
        { en: "I go home at five.", de: "Ich gehe um fünf nach Hause.", ru: "Я иду (хожу) домой в пять.", hinweis: "вообще, по привычке – просто go" },
        { en: "I am going home now.", de: "Ich gehe jetzt (gerade) nach Hause.", ru: "Я сейчас иду домой.", hinweis: "роль 1 · дословно: я есть идущий домой сейчас" },
        { en: "We are visiting our son this week.", de: "Wir besuchen diese Woche unseren Sohn.", ru: "На этой неделе мы в гостях у сына.", hinweis: "роль 1 · временно, на этой неделе" },
        { en: "I was reading when you called.", de: "Ich habe gerade gelesen, als du angerufen hast.", ru: "Я как раз читал, когда ты позвонил.", hinweis: "роль 1 в прошлом · was + -ing" },
        { en: "I am going to visit Venice.", de: "Ich habe vor, Venedig zu besuchen.", ru: "Я собираюсь посетить Венецию.", hinweis: "роль 2 · going to = собираюсь" },
        { en: "Visiting museums is interesting.", de: "Das Besuchen von Museen ist interessant.", ru: "Посещать музеи интересно.", hinweis: "роль 3 · visiting = das Besuchen" },
        { en: "I like going to the sea.", de: "Ich fahre gern ans Meer.", ru: "Я люблю ездить на море.", hinweis: "роль 3 · после like" },
        { en: "Close the door before going out.", de: "Schließ die Tür, bevor du hinausgehst.", ru: "Закрой дверь перед тем, как выйти.", hinweis: "роль 3 · после before" },
        { en: "Look at the sleeping child.", de: "Sieh das schlafende Kind an.", ru: "Посмотри на спящего ребёнка.", hinweis: "роль 4 · -ing = -end = -ящий" }
      ],
      merke: "go = gehen (вообще) · am going = ich gehe gerade (процесс) · going to = ich habe vor (план) · going = das Gehen (предмет) · a sleeping child = ein schlafendes Kind (признак)"
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
    },
    {
      id: "vergleich-wortstellung",
      thema: "satz",
      sprache: "en",
      datum: "2026-11-12",
      titel: "die Wortstellung im Vergleich: DE – EN – RU",
      titel_ru: "порядок слов: где английский как русский, а где как немецкий",
      formel: "Englisch ≈ Russisch  ·  Deutsch oft umgekehrt  ·  Ausnahme: die Uhrzeit (EN ≈ DE)",
      erklaerung: [
        "Хорошая новость: английский в порядке слов чаще всего как русский. «Наоборот» обычно говорит немецкий: jetzt nicht, einundzwanzig, глагол в конце после weil.",
        "Исключение – время на часах: five past five устроено как fünf nach fünf (сначала минуты, потом час, который уже прошёл). Русское «пять минут шестого» считает до следующего часа.",
        "Ловушка – половина: halb sechs = половина шестого = 5:30. А по-английски half past five («половина после пяти»). Если англичанин скажет half six – это 6:30!",
        "Совет: короткие фразы (not now, twenty-one, half past five) сначала заучить целиком как готовый блок, а разбирать уже потом."
      ],
      tabelle: {
        kopf: ["das Thema · тема", "🇷🇺 Russisch", "🇬🇧 Englisch", "🇩🇪 Deutsch", "Wer ist gleich? · кто похож"],
        sprechen: false,
        zeilen: [
          ["nicht + jetzt",        "не сейчас",           "not now",              "jetzt nicht",                "EN = RU"],
          ["die Zahl 21",          "двадцать один",       "twenty-one",           "einundzwanzig",              "EN = RU, DE наоборот"],
          ["die Zahl 85",          "восемьдесят пять",    "eighty-five",          "fünfundachtzig",             "EN = RU, DE наоборот"],
          ["5:05",                 "пять минут шестого",  "five past five",       "fünf nach fünf",             "EN = DE"],
          ["5:15",                 "четверть шестого",    "a quarter past five",  "Viertel nach fünf",          "EN = DE"],
          ["5:30 ⚠️",              "половина шестого",    "half past five",       "halb sechs",                 "DE = RU, EN иначе!"],
          ["5:45",                 "без четверти шесть",  "a quarter to six",     "Viertel vor sechs",          "все похожи"],
          ["5:05 (digital)",       "пять ноль пять",      "five oh five",         "fünf Uhr fünf",              "просто по цифрам"],
          ["die Verneinung",       "я не знаю",           "I don't know",         "ich weiß es nicht",          "EN = RU"],
          ["der Nebensatz (weil)", "потому что я устал",  "because I am tired",   "weil ich müde bin",          "EN = RU, DE глагол в конце"]
        ]
      },
      beispiele: [
        { en: "Not now, please.", de: "Jetzt nicht, bitte.", ru: "Не сейчас, пожалуйста.", hinweis: "EN = RU" },
        { en: "I am twenty-one.", de: "Ich bin einundzwanzig.", ru: "Мне двадцать один.", hinweis: "EN = RU" },
        { en: "It's five past five.", de: "Es ist fünf nach fünf.", ru: "Пять минут шестого.", hinweis: "EN = DE" },
        { en: "It's half past five.", de: "Es ist halb sechs.", ru: "Половина шестого.", hinweis: "⚠️ ловушка" },
        { en: "I stay at home because I am tired.", de: "Ich bleibe zu Hause, weil ich müde bin.", ru: "Я остаюсь дома, потому что устал.", hinweis: "DE – глагол в конце" }
      ],
      merke: "Английский – как русский. Немецкий переворачивает. Только часы: five past five = fünf nach fünf. Осторожно с half!"
    },
    {
      id: "de-laute",
      thema: "lesen",
      sprache: "de",
      datum: "2026-11-17",
      titel: "der Laut und der Buchstabe (der Vokal, der Konsonant, der Doppellaut, der Umlaut)",
      titel_ru: "звук и буква: гласные, согласные, дифтонги, умлауты",
      formel: "der Laut = звук (то, что слышно) · der Buchstabe = буква (то, что написано) · laut (Adjektiv) = громкий",
      erklaerung: [
        "ДВА СЛОВА – ОДИН КОРЕНЬ. laut с маленькой буквы – прилагательное (das Adjektiv): «громкий» (leise und laut – тихо и громко). der Laut с большой буквы и с артиклем – существительное (das Substantiv): «звук речи», любой звук – и гласный, и согласный. Корень общий: древневерхненемецкое hlūt – «звучащий». Отличить легко: у существительного есть артикль и большая буква.",
        "ЗВУК И БУКВА – НЕ ОДНО И ТО ЖЕ. der Buchstabe – буква, её видно. der Laut – звук, его слышно. В английском shine 5 букв (s-h-i-n-e), но только 3 звука: [ʃ] [aɪ] [n]. Поэтому и нужна die Lautschrift (транскрипция, буквально «звукопись») – она записывает звуки, а не буквы.",
        "ГЛАСНЫЕ. der Vokal (латинское слово) = der Selbstlaut (немецкое слово): звучит сам (selbst), без помощи других звуков. Немецкие гласные буквы: a, e, i, o, u (и умлауты ä, ö, ü).",
        "СОГЛАСНЫЕ. der Konsonant (лат. con-sonare – «звучать вместе») = der Mitlaut: звучит вместе (mit) с гласным. Попробуйте сказать «б» без гласного – получится «бэ» или «бы». Это все остальные буквы: b, c, d, f, g, h, k …",
        "ДИФТОНГИ. der Diphthong (греч. di- «два» + phthongos «звук») = der Doppellaut: два гласных звука сливаются в один слог. Немецкие: ei/ai «ай» (das Ei, der Mai), au «ау» (das Haus), eu/äu «ой» (heute, die Häuser). В английском те же: [aɪ] time, [aʊ] house, [ɔɪ] boy, плюс [eɪ] name и [oʊ] home. Doppellaut – это всегда двойной ГЛАСНЫЙ, а не согласный.",
        "УМЛАУТЫ. der Umlaut (um- «из-, пере-» + der Laut): гласный «изменён». a → ä, o → ö, u → ü. Часто появляется во множественном числе и в степенях сравнения: das Haus → die Häuser, alt → älter, der Fuß → die Füße.",
        "ДЛИННЫЙ И КОРОТКИЙ. Немецкие гласные бывают lang (долгие) и kurz (краткие). Правило: перед одним согласным – обычно долго (der Tag, die Rose), перед двумя согласными – кратко (die Stadt, kommen). Долготу показывают h (fahren), удвоение (das Boot, der See) и ie (die Liebe)."
      ],
      tabelle: {
        kopf: ["Deutsch", "das Fachwort", "Русский", "warum so · почему так", "Beispiele"],
        sprechen: false,
        zeilen: [
          ["der Laut",       "—",              "звук",        "то, что слышно",                         "[ʃ] [aɪ] [n]"],
          ["der Buchstabe",  "—",              "буква",       "то, что написано",                       "s, h, i, n, e"],
          ["der Selbstlaut", "der Vokal",      "гласный",     "звучит сам (selbst)",                    "a, e, i, o, u"],
          ["der Mitlaut",    "der Konsonant",  "согласный",   "звучит вместе (mit) с гласным",          "b, d, k, s, t"],
          ["der Doppellaut", "der Diphthong",  "дифтонг",     "два гласных в одном слоге",              "ei, au, eu, äu"],
          ["der Umlaut",     "—",              "умлаут",      "гласный изменён (um-)",                  "ä, ö, ü"],
          ["die Lautschrift","die Transkription","транскрипция","записывает звуки, а не буквы",          "[ˈʃaɪnɪŋ]"],
          ["die Silbe",      "—",              "слог",        "гласный + согласные вокруг",             "Haus (1), Häu-ser (2)"]
        ]
      },
      beispiele: [
        { de: "Das Radio ist zu laut.", en: "The radio is too loud.", ru: "Радио слишком громкое.", hinweis: "laut – Adjektiv: громкий" },
        { de: "Der Laut [ʃ] klingt wie „sch“.", en: "The sound [ʃ] sounds like “sh”.", ru: "Звук [ʃ] звучит как «ш».", hinweis: "der Laut – Substantiv: звук" },
        { de: "Das Wort „Haus“ hat einen Doppellaut: au.", en: "The word “house” has a diphthong: [aʊ].", ru: "В слове «Haus» дифтонг: au.", hinweis: "der Doppellaut" },
        { de: "Im Wort „shine“ sind fünf Buchstaben, aber nur drei Laute.", en: "The word “shine” has five letters but only three sounds.", ru: "В слове «shine» пять букв, но только три звука.", hinweis: "der Buchstabe ≠ der Laut" }
      ],
      merke: "laut = громкий · der Laut = звук · der Selbstlaut (Vokal) – гласный, звучит сам · der Mitlaut (Konsonant) – согласный, звучит вместе · der Doppellaut (Diphthong) – два гласных в одном слоге"
    },
    {
      id: "satzzeichen",
      thema: "satz",
      sprache: "de",
      datum: "2026-11-17",
      titel: "die Satzarten und die Satzzeichen (der Punkt, das Fragezeichen, das Ausrufezeichen, das Komma)",
      titel_ru: "типы предложений и знаки препинания – немецкий и английский",
      formel: "der Aussagesatz → .  ·  der Fragesatz → ?  ·  der Aufforderungssatz / der Ausrufesatz → !",
      erklaerung: [
        "НАЗВАНИЯ ЗНАКОВ. das Satzzeichen – знак препинания (буквально «знак предложения»). der Punkt (.) – точка, das Fragezeichen (?) – вопросительный знак (die Frage – вопрос), das Ausrufezeichen (!) – восклицательный знак (ausrufen – восклицать), das Komma (,) – запятая, der Doppelpunkt (:) – двоеточие, das Semikolon (;) – точка с запятой, die Anführungszeichen („ “) – кавычки.",
        "ЗНАК ЗАВИСИТ ОТ ТИПА ПРЕДЛОЖЕНИЯ (die Satzart). der Aussagesatz – повествовательное: сообщает факт, в конце точка (It hurts. – Es tut weh.). der Fragesatz – вопросительное: в конце всегда «?» (Where is the hospital? – Wo ist das Krankenhaus?). der Aufforderungssatz – побудительное: просьба или приказ, обычно «!» (Call an ambulance! – Rufen Sie einen Krankenwagen!). der Ausrufesatz – восклицательное: эмоция, «!» (How nice! – Wie schön!).",
        "DER IMPERATIV И DIE ELLIPSE. der Imperativ (повелительное наклонение) – это форма ГЛАГОЛА: Call! Come! Komm! Rufen Sie! «Quickly, please!» – тоже просьба (der Aufforderungssatz), но глагола в нём нет. Полностью было бы «Come quickly, please!». Предложение с пропущенной частью называется die Ellipse (эллипсис). quickly – das Adverb (наречие): das Adjektiv quick + окончание -ly. По-немецки окончания нет: schnell – и прилагательное, и наречие.",
        "ВОСКЛИЦАТЕЛЬНЫЙ ЗНАК: НЕМЕЦКИЙ И АНГЛИЙСКИЙ. В немецком после просьбы и приказа «!» ставят обычно; при спокойной вежливой просьбе можно и точку (Bitte schließen Sie die Tür.). В английском «!» ставят реже – только когда срочно или с эмоцией. Спокойно: Please call an ambulance. Срочно: Call an ambulance! Поэтому в английском «.» вместо «!» – не ошибка. А «?» в вопросе обязателен в обоих языках.",
        "ЗАПЯТАЯ: НЕМЕЦКИЙ СТРОЖЕ. В немецком перед придаточным предложением (der Nebensatz) запятая обязательна: Ich glaube, dass er kommt. / Ich bleibe zu Hause, weil ich müde bin. В английском перед that запятую не ставят: I think that he is coming. Перед because – обычно тоже нет: I stay at home because I am tired. Обращение и вежливые слова отделяются запятой в обоих языках: Quickly, please! – Schnell, bitte! / Thank you, Anna. – Danke, Anna.",
        "КАК ПРОВЕРЯЕТ SPRACHBOX. В режиме «✍️ Schreiben» проверяются знаки препинания (галочка «Satzzeichen prüfen») и большие/маленькие буквы – die Groß- und Kleinschreibung (галочка «Groß-/Kleinschreibung prüfen»): предложение начинается с большой буквы, I – всегда большое, лишняя большая буква тоже ошибка. «!» и «.» в конце считаются одинаковыми (в английском оба верны), «?» должен стоять. Пропущенный знак обводится красным, неверная буква подчёркивается красной волной."
      ],
      tabelle: {
        kopf: ["die Satzart", "Русский", "das Zeichen", "English", "Deutsch"],
        sprechen: 3,
        zeilen: [
          ["der Aussagesatz",       "повествовательное", ".",      "It hurts.",                "Es tut weh."],
          ["der Fragesatz",         "вопросительное",    "?",      "Where is the hospital?",   "Wo ist das Krankenhaus?"],
          ["der Aufforderungssatz", "побудительное",     "! (.)",  "Call an ambulance!",       "Rufen Sie einen Krankenwagen!"],
          ["die Ellipse (Bitte)",   "неполное (просьба)", "!",     "Quickly, please!",         "Schnell, bitte!"],
          ["der Ausrufesatz",       "восклицательное",   "!",      "How nice!",                "Wie schön!"],
          ["der Nebensatz (dass)",  "придаточное",       ", nur DE", "I think that he is coming.", "Ich glaube, dass er kommt."]
        ]
      },
      beispiele: [
        { en: "It hurts.", de: "Es tut weh.", ru: "Больно.", hinweis: "der Aussagesatz → ." },
        { en: "Where is the hospital?", de: "Wo ist das Krankenhaus?", ru: "Где больница?", hinweis: "der Fragesatz → ? (обязательно)" },
        { en: "Call an ambulance!", de: "Rufen Sie einen Krankenwagen!", ru: "Вызовите скорую!", hinweis: "der Imperativ → !" },
        { en: "Quickly, please!", de: "Schnell, bitte!", ru: "Быстрее, пожалуйста!", hinweis: "die Ellipse, quickly = das Adverb" },
        { en: "I stay at home because I am tired.", de: "Ich bleibe zu Hause, weil ich müde bin.", ru: "Я остаюсь дома, потому что устал.", hinweis: "Komma nur im Deutschen" }
      ],
      merke: "? – всегда в вопросе · ! – в английском по желанию (срочно, эмоция), в немецком обычно после просьбы · запятая перед dass / weil – только в немецком"
    },
    {
      id: "satzart-verneinung",
      thema: "satz",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Satzart, die Verneinung und die Zeitform – die Tabelle nach Petrow (die Frage · die Behauptung · die Verneinung)",
      titel_ru: "тип предложения, отрицание и время: таблица Петрова (вопрос · утверждение · отрицание)",
      formel: "die Satzart = WAS für ein Satz (Aussage / Frage)  ·  die Verneinung = JA oder NEIN (bejaht / verneint)  ·  die Zeitform = WANN  →  drei getrennte Schalter",
      erklaerung: [
        "ТАБЛИЦА ПЕТРОВА (16 уроков). Столбцы (die Spalten): вопрос – утверждение – отрицание. Строки (die Zeilen): будущее – настоящее – прошедшее. Получается 3 × 3 = 9 клеток: Will I love? – I will love. – I will not love. Для начинающего это очень удобная схема, и она правильная. Но в ней смешаны ДВА разных грамматических признака, и поэтому в Satzlabor «Satzart» выглядит иначе.",
        "ПРИЗНАК 1 – die Satzart (тип предложения): ЧТО это за предложение по цели. der Aussagesatz – повествовательное (сообщаю), der Fragesatz – вопросительное (спрашиваю: die Ja/Nein-Frage или die W-Frage), der Aufforderungssatz – побудительное (прошу, приказываю), der Ausrufesatz – восклицательное. Именно это и стоит в Satzlabor в строке «Satzart».",
        "ПРИЗНАК 2 – die Verneinung (отрицание) и её противоположность die Bejahung (утверждение). Грамматический термин для этой пары – die Polarität: bejaht (утвердительное) или verneint (отрицательное). Это НЕ тип предложения, а отдельный переключатель «да / нет». Петровская «Behauptung» = bejahter Aussagesatz, «Verneinung» = verneinter Aussagesatz.",
        "ДОКАЗАТЕЛЬСТВО, что это два разных признака: вопрос тоже может быть с отрицанием. Gehst du nicht nach Hause? – Ты не идёшь домой? Don't you go home? Значит, полная схема не 3, а 2 × 2: Aussage bejaht · Aussage verneint · Frage bejaht · Frage verneint. Петров для простоты взял три самых частых клетки.",
        "ПРИЗНАК 3 – время. У Петрова строки – это die Zeitstufe (реальное время: die Vergangenheit, die Gegenwart, die Zukunft – их три). В Satzlabor строки – это die Zeitform (das Tempus, грамматическая форма). В немецком их шесть: das Präsens, das Präteritum, das Perfekt, das Plusquamperfekt, das Futur I, das Futur II. На одну Zeitstufe приходится несколько Zeitformen: прошедшее = Präteritum, Perfekt или Plusquamperfekt. Поэтому в Satzlabor 6 строк, а у Петрова 3.",
        "ИТОГО: путаницы нет, если держать в голове три отдельных переключателя: (1) die Satzart – Aussage или Frage; (2) die Verneinung – bejaht или verneint (nicht / kein); (3) die Zeitform – когда. Таблица Петрова – это (1)+(2) по горизонтали и (3) по вертикали.",
        "КАК ОТРИЦАЮТ. Английский: всегда через вспомогательный глагол (das Hilfsverb) + not: will not (won't), do not (don't), did not (didn't). Вопрос: тот же вспомогательный глагол вперёд: Will you …? Do you …? Did you …? Немецкий: вспомогательного do нет – вперёд встаёт само finite Verb (Gehst du …?), а для отрицания служат nicht (отрицает глагол или всё предложение) и kein (отрицает существительное с неопределённым артиклем или без артикля: Ich habe kein Auto). nicht стоит обычно ближе к концу, перед Ortsangabe и перед infinite Teile: Du gehst nicht nach Hause. Du bist nicht nach Hause gegangen."
      ],
      tabellen: [
        {
          titel: "1 · die Tabelle nach Petrow – English (go home)",
          kopf: ["die Zeitstufe", "die Frage · вопрос", "die Behauptung · утверждение", "die Verneinung · отрицание"],
          sprache: "en",
          sprechen: [1, 2, 3],
          zeilen: [
            ["die Zukunft · будущее (Future Simple)", "Will you go home?", "You will go home.", "You will not (won't) go home."],
            ["die Gegenwart · настоящее (Present Simple)", "Do you go home?", "You go home.", "You do not (don't) go home."],
            ["die Vergangenheit · прошедшее (Past Simple)", "Did you go home?", "You went home.", "You did not (didn't) go home."]
          ]
        },
        {
          titel: "2 · dieselbe Tabelle auf Deutsch (nach Hause gehen)",
          kopf: ["die Zeitstufe (die Zeitform)", "die Frage · вопрос", "die Behauptung · утверждение", "die Verneinung · отрицание"],
          sprache: "de",
          sprechen: [1, 2, 3],
          zeilen: [
            ["die Zukunft (das Futur I)", "Wirst du nach Hause gehen?", "Du wirst nach Hause gehen.", "Du wirst nicht nach Hause gehen."],
            ["die Gegenwart (das Präsens)", "Gehst du nach Hause?", "Du gehst nach Hause.", "Du gehst nicht nach Hause."],
            ["die Vergangenheit (das Perfekt)", "Bist du nach Hause gegangen?", "Du bist nach Hause gegangen.", "Du bist nicht nach Hause gegangen."]
          ]
        },
        {
          titel: "3 · die Fachbegriffe · термины (выучить!)",
          kopf: ["der Begriff", "Русский", "Beispiel"],
          sprache: "de",
          sprechen: 0,
          zeilen: [
            ["die Satzart", "тип предложения (по цели)", "Aussagesatz / Fragesatz"],
            ["der Aussagesatz", "повествовательное предложение", "Du gehst nach Hause."],
            ["der Fragesatz", "вопросительное предложение", "Gehst du nach Hause?"],
            ["die Entscheidungsfrage (die Ja/Nein-Frage)", "вопрос «да/нет»: глагол на 1-м месте", "Gehst du nach Hause?"],
            ["die W-Frage (die Ergänzungsfrage)", "вопрос с вопросительным словом на W- (wer, was, wo, wohin, wann, wie, warum); W – не «Wort», а буква W", "Wohin gehst du?"],
            ["die Behauptung / die Bejahung", "утверждение (bejaht)", "Du gehst."],
            ["die Verneinung", "отрицание (verneint)", "Du gehst nicht."],
            ["die Polarität", "полярность: да или нет", "bejaht ↔ verneint"],
            ["die Zeitstufe", "реальное время (прошлое, настоящее, будущее)", "die Vergangenheit"],
            ["die Zeitform (das Tempus)", "грамматическое время (6 форм в немецком)", "das Perfekt"],
            ["die Spalte / die Zeile", "столбец / строка таблицы", "—"]
          ]
        }
      ],
      beispiele: [
        { de: "Gehst du nicht nach Hause?", en: "Don't you go home?", ru: "Ты не идёшь домой?", hinweis: "der Fragesatz + die Verneinung – вопрос тоже бывает отрицательным" },
        { de: "Ich habe kein Auto.", en: "I don't have a car.", ru: "У меня нет машины.", hinweis: "kein – отрицание существительного" },
        { de: "Ich gehe heute nicht nach Hause.", en: "I'm not going home today.", ru: "Я сегодня не иду домой.", hinweis: "nicht – перед Ortsangabe" }
      ],
      merke: "Три переключателя: die Satzart (Aussage / Frage) – die Verneinung (bejaht / verneint) – die Zeitform (wann). Таблица Петрова = Satzart + Verneinung по горизонтали, Zeitstufe по вертикали."
    },
    {
      id: "gross-klein",
      thema: "satz",
      sprache: "de",
      datum: "2026-11-17",
      titel: "die Groß- und Kleinschreibung (Deutsch und Englisch)",
      titel_ru: "большие и маленькие буквы: немецкий и английский",
      formel: "EN: groß nur Satzanfang · Namen · I  ·  DE: groß Satzanfang · alle Substantive · Sie (höflich)",
      erklaerung: [
        "ТЕРМИНЫ. der Großbuchstabe – большая (заглавная) буква, der Kleinbuchstabe – маленькая (строчная) буква, die Groß- und Kleinschreibung – правила, где писать большую, а где маленькую. der Eigenname – имя собственное (имя, город, страна).",
        "АНГЛИЙСКИЙ: БОЛЬШАЯ БУКВА ТОЛЬКО В ТРЁХ СЛУЧАЯХ. 1) начало предложения: May I ask something? 2) имена и названия (der Eigenname): Anna, London, Germany, а также дни недели, месяцы, языки и народы – Monday, November, English, German (в немецком они с маленькой: montags, englisch, но der Montag – как существительное с большой). 3) местоимение I (я) – всегда, в любом месте предложения: Yes, I can. Всё остальное – с маленькой буквы, и существительные тоже: the table, the hospital, help.",
        "ПОЧЕМУ «I» БОЛЬШОЕ. В древнеанглийском «я» было ic (родня немецкого ich), в среднеанглийском – ich / ik, потом сократилось до одной буквы i. Одиночная маленькая буква в рукописях терялась и сливалась с соседними словами, поэтому писцы стали писать её высокой – I. Так закрепилось. Только I: me (меня/мне), my (мой), mine – с маленькой буквы.",
        "НЕМЕЦКИЙ: БОЛЬШАЯ БУКВА – У ВСЕХ СУЩЕСТВИТЕЛЬНЫХ. 1) начало предложения; 2) все существительные (die Substantive): der Tisch, die Hilfe, das Krankenhaus; 3) слова, ставшие существительными (die Substantivierung): das Lesen, das Gute, beim Essen; 4) вежливое обращение Sie / Ihnen / Ihr: Können Sie mir helfen? – а sie (она, они) с маленькой: Sie kommt – в начале предложения не различить, тогда по смыслу. ich – с маленькой буквы (в отличие от английского I).",
        "ЛОВУШКИ ДЛЯ НАС. По-немецки привыкаешь писать существительные с большой буквы – а в английском нельзя: the Hospital – ошибка, правильно the hospital. И наоборот: английское english / monday с маленькой – ошибка, правильно English, Monday. Немецкое englisch (прилагательное) – с маленькой.",
        "КАК ПРОВЕРЯЕТ SPRACHBOX. Галочка «Groß-/Kleinschreibung prüfen» в режиме «✍️ Schreiben»: маленькое начало предложения, маленькое i и лишняя большая буква считаются ошибкой (слово подчёркнуто красной волной)."
      ],
      tabelle: {
        kopf: ["die Regel · правило", "English", "Deutsch", "Русский"],
        sprechen: 1,
        zeilen: [
          ["der Satzanfang · начало предложения",   "May I ask something?",      "Darf ich etwas fragen?",     "Можно спросить?"],
          ["das Pronomen „ich“ · я",               "Yes, I can.",               "Ja, ich kann.",              "EN большое I, DE маленькое ich"],
          ["das Substantiv · существительное",      "Where is the hospital?",    "Wo ist das Krankenhaus?",    "EN маленькая, DE большая"],
          ["die Sprache · язык",                    "I speak German.",           "Ich spreche Deutsch.",       "оба большие (DE: das Deutsch)"],
          ["das Adjektiv der Sprache",              "an English book",           "ein englisches Buch",        "EN большая, DE маленькая"],
          ["der Wochentag · день недели",           "on Monday",                 "am Montag",                  "оба большие"],
          ["die höfliche Anrede · вежливое Вы",     "Can you help me?",          "Können Sie mir helfen?",     "EN you маленькое, DE Sie большое"]
        ]
      },
      beispiele: [
        { en: "May I ask something?", de: "Darf ich etwas fragen?", ru: "Можно кое-что спросить?", hinweis: "I – immer groß, ich – klein" },
        { en: "Where is the hospital?", de: "Wo ist das Krankenhaus?", ru: "Где больница?", hinweis: "hospital klein, das Krankenhaus groß" },
        { en: "I speak a little English.", de: "Ich spreche ein bisschen Englisch.", ru: "Я немного говорю по-английски.", hinweis: "English – immer groß" },
        { en: "Can you help me, please?", de: "Können Sie mir bitte helfen?", ru: "Вы можете мне помочь?", hinweis: "Sie (höflich) – groß" }
      ],
      merke: "EN: большая буква только в начале, в именах (и English, Monday) и в I · DE: большая буква у всех существительных и у вежливого Sie, ich – маленькое"
    },
    {
      id: "moechte-would-like",
      thema: "verb",
      sprache: "en",
      datum: "2026-11-17",
      titel: "ich möchte / ich will – I'd like / I want (die Modalverben)",
      titel_ru: "хочу и хотел бы: would like и want",
      formel: "ich möchte = I'd like (= I would like) + to + Infinitiv  ·  ich will = I want + to + Infinitiv",
      erklaerung: [
        "ЧТО ТАКОЕ «MÖCHTE». möchte – это не отдельный глагол, а форма der Konjunktiv II (сослагательное наклонение, «бы») от глагола mögen (любить, нравиться). Буквально: «мне бы нравилось» → «я хотел бы». Это вежливая форма. Ваша догадка верная: это действительно вопрос формы глагола, только не времени (die Zeitform), а наклонения (der Modus).",
        "АНГЛИЙСКИЙ ДЕЛАЕТ ТО ЖЕ САМОЕ. Конъюнктив II в английском строится через would + глагол. Значит, möchte = would + like: I would like (буквально «я бы любил»). Коротко: I'd like. Поэтому: Ich möchte nach Hause. = I'd like to go home.",
        "ПОЧЕМУ «I WOULD TO GO HOME» – ОШИБКА. would – вспомогательный глагол (das Hilfsverb), он сам по себе ничего не значит, только «бы». После него обязательно нужен смысловой глагол (das Vollverb) – и без to: I would like, I would go. «I would to go» – смыслового глагола нет (пропущено like), а to после would не ставится. Правильно: I would like to go home. или I'd like to go home.",
        "WANT = WOLLEN. want – обычный смысловой глагол «хотеть», прямо и без вежливости: I want to go home. = Ich will nach Hause. После want – to + Infinitiv (I want to pay). В разговоре «I want to go home» тоже часто переводят как «Ich möchte nach Hause» – поэтому программа принимает оба варианта.",
        "ЛОВУШКА: ENGLISCH WILL ≠ DEUTSCH WILL. Немецкое ich will = I want (хочу). Английское I will = ich werde (будущее время, das Futur): I will go home. = Ich werde nach Hause gehen. Слова-родственники (оба от древнего «хотеть»), но значение в языках разошлось – это ложный друг (der falsche Freund).",
        "ВЕЖЛИВОСТЬ. В магазине, кафе, у врача лучше I'd like …: I'd like a coffee, please. – Ich möchte einen Kaffee, bitte. «I want a coffee» звучит грубовато, как «Ich will einen Kaffee»."
      ],
      tabelle: {
        kopf: ["Deutsch", "English", "die Form", "Русский"],
        sprechen: 1,
        zeilen: [
          ["Ich möchte nach Hause.",      "I'd like to go home.",        "would like (Konjunktiv II) – höflich", "Я хотел бы домой."],
          ["Ich will nach Hause.",        "I want to go home.",          "want – direkt",                      "Я хочу домой."],
          ["Ich werde nach Hause gehen.", "I will go home.",             "will – das Futur",                   "Я пойду домой."],
          ["Ich würde nach Hause gehen.", "I would go home.",            "would + Verb – der Konjunktiv II",   "Я бы пошёл домой."],
          ["Was möchten Sie?",            "What would you like?",        "die Frage, höflich",                 "Что вы желаете?"],
          ["Ich möchte bezahlen.",        "I'd like to pay.",            "would like + to + Infinitiv",        "Я хотел бы заплатить."]
        ]
      },
      beispiele: [
        { de: "Ich möchte nach Hause.", en: "I'd like to go home.", ru: "Я хотел бы домой.", hinweis: "möchte = would like" },
        { de: "Ich will nach Hause.", en: "I want to go home.", ru: "Я хочу домой.", hinweis: "will (DE) = want (EN)" },
        { de: "Ich werde morgen kommen.", en: "I will come tomorrow.", ru: "Я приду завтра.", hinweis: "will (EN) = werden (DE)!" },
        { de: "Ich möchte einen Kaffee, bitte.", en: "I'd like a coffee, please.", ru: "Мне кофе, пожалуйста.", hinweis: "höflich" }
      ],
      merke: "möchte = would like (I'd like) · will (DE) = want · will (EN) = werden · после would – глагол без to: I would like / I would go, НЕ I would to go"
    },
    {
      id: "en-phrasal-verb",
      thema: "verb",
      sprache: "en",
      datum: "2026-11-18",
      titel: "das Phrasal Verb – try on = anprobieren (wie das trennbare Verb)",
      titel_ru: "фразовый глагол: try on – примерить; почему on, а не an",
      formel: "Verb + Partikel: try on · put on · take off  ·  Pronomen in die Mitte: try it on (NICHT try on it)",
      erklaerung: [
        "ЧТО ЭТО. В английском есть фразовые глаголы (das Phrasal Verb): глагол + маленькое слово-частица (die Partikel) – on, off, up, out, in. Вместе они дают новое значение: try – пробовать, а try on – примерять (одежду, обувь). Это прямой родственник немецкого отделяемого глагола (das trennbare Verb): anprobieren → Ich probiere es an.",
        "ПОЧЕМУ ON, А НЕ AN. Ваше чувство верное, только оно немецкое: немецкое an + probieren = anprobieren. В английском эту роль играет частица on. Немецкой приставке an- в английском очень часто соответствует on: anziehen = put on (надеть), anmachen/einschalten = turn on (включить), anprobieren = try on. Английского слова «an» в этом значении нет: an – это неопределённый артикль (der unbestimmte Artikel) перед гласным звуком: an apple, an hour.",
        "ПОЧЕМУ СЛЫШИТСЯ «АН». Слово on читается /ɒn/ (британский вариант, короткое «он») или /ɑːn/ (американский вариант, ближе к «ан»). Голос в программе часто американский – поэтому on звучит почти как «ан». Пишется всё равно on.",
        "ПОРЯДОК СЛОВ. Если дополнение – местоимение (das Pronomen: it, this, them), оно стоит МЕЖДУ глаголом и частицей: try it on, try this on, try them on. Неправильно: try on it. Если дополнение – существительное, можно и так, и так: try on the jacket = try the jacket on. Сравните с немецким: Ich probiere die Jacke an – частица тоже уходит в конец.",
        "ОДНО СЛОВО ИЗ ДВУХ. try on – это одно слово по смыслу (одна лексема, das Lexem), хотя пишется раздельно. Три языка – три ступени: по-русски приставка всегда приклеена (при-мерить); по-немецки приклеена только в инфинитиве (anprobieren), а в предложении отрывается (Ich probiere es an); по-английски частица стоит отдельно всегда (try it on). Когда-то в древнеанглийском приставки были, как в немецком, но почти все исчезли, и их место заняли отдельные частицы. Следы старых приставок: understand, overcome, upset. А существительные от фразовых глаголов пишутся слитно: take off → the takeoff (взлёт), check out → the checkout (касса).",
        "ПРОТИВОПОЛОЖНОСТЬ. on – «на себя», off – «с себя»: put on – надеть, take off – снять. Ich ziehe die Jacke an / aus = I put the jacket on / take the jacket off."
      ],
      tabellen: [
      {
        titel: "Drei Sprachen – drei Stufen / три языка – три ступени",
        kopf: ["die Sprache", "Vorsilbe / Partikel", "die Grundform", "im Satz"],
        zeilen: [
          ["Russisch", "immer angeklebt (die Vorsilbe)", "примерить", "я примеряю"],
          ["Deutsch", "angeklebt nur im Infinitiv, im Satz getrennt (das trennbare Verb)", "anprobieren", "Ich probiere es an."],
          ["Englisch", "immer getrennt (das Phrasal Verb)", "try on", "I try it on."]
        ]
      },
      {
        titel: "Reste alter Vorsilben und Substantive / следы приставок и существительные",
        kopf: ["das Thema", "English", "Deutsch", "die Erklärung"],
        sprechen: 1,
        zeilen: [
          ["alte Vorsilbe (Rest)", "understand", "verstehen", "Vorsilbe noch angeklebt"],
          ["alte Vorsilbe (Rest)", "overcome", "überwinden", "Vorsilbe noch angeklebt"],
          ["alte Vorsilbe (Rest)", "upset", "verärgern", "Vorsilbe noch angeklebt"],
          ["das Substantiv aus dem Phrasal Verb", "the takeoff", "der Start (← abheben = take off)", "zusammengeschrieben"],
          ["das Substantiv aus dem Phrasal Verb", "the checkout", "die Kasse (← auschecken = check out)", "zusammengeschrieben"]
        ]
      },
      {
        titel: "Beispiele / примеры",
        kopf: ["Deutsch", "English", "Русский"],
        sprechen: 1,
        zeilen: [
          ["Kann ich das anprobieren?", "Can I try this on?",        "Можно это примерить?"],
          ["Ich probiere die Jacke an.", "I try the jacket on.",     "Я примеряю куртку."],
          ["Zieh die Jacke an!",         "Put the jacket on!",       "Надень куртку!"],
          ["Zieh die Schuhe aus!",       "Take your shoes off!",     "Сними обувь!"],
          ["Mach das Licht an.",         "Turn the light on.",       "Включи свет."],
          ["Mach das Licht aus.",        "Turn the light off.",      "Выключи свет."]
        ]
      }
      ],
      beispiele: [
        { de: "Kann ich das anprobieren?", en: "Can I try this on?", ru: "Можно это примерить?", hinweis: "an- (DE) = on (EN)" },
        { de: "Ich probiere es an.", en: "I try it on.", ru: "Я примеряю это.", hinweis: "it – в середину, НЕ try on it" },
        { de: "Wo ist die Umkleidekabine?", en: "Where is the fitting room?", ru: "Где примерочная?", hinweis: "die Umkleidekabine = fitting room" }
      ],
      merke: "anprobieren = try on · anziehen = put on · ausziehen = take off · местоимение в середину: try it on · an – это артикль (an apple), а не частица"
    },
    {
      id: "en-will-would",
      thema: "verb",
      sprache: "en",
      datum: "2026-11-18",
      titel: "I'm · I'll · I'd – die Kurzformen; will (das Futur) und would (der Konjunktiv II)",
      titel_ru: "I'm – я есть, I'll – я буду, I'd – я бы: will и would",
      formel: "I'm = I am = ich bin  ·  I'll = I will = ich werde (das Futur I)  ·  I'd = I would = ich würde (der Konjunktiv II, «бы»)",
      erklaerung: [
        "КРАТКИЕ ФОРМЫ (die Kurzform, die Kontraktion). В разговорном английском вспомогательный глагол сливается с местоимением, а пропущенные буквы заменяет апостроф (der Apostroph): I am → I'm, I will → I'll, I would → I'd. Значение от этого не меняется – это только сокращение, как в немецком «Wie geht's?» = «Wie geht es?».",
        "I'M = I AM = ICH BIN. am – форма глагола be (sein) в настоящем времени (das Präsens) для I. По-русски «есть» обычно пропускаем: I'm retired. – Ich bin Rentner. – Я на пенсии. Подробно: правило «das Verb to be».",
        "I'LL = I WILL = ICH WERDE. will – вспомогательный глагол (das Hilfsverb) будущего времени (das Futur I), по-немецки werden, по-русски «буду / -у»: I'll take it. – Ich nehme es. / Ich werde es nehmen. – Я возьму это. После will – глагол в начальной форме (der Infinitiv) без to. ЛОВУШКА (der falsche Freund): немецкое ich will = I want (хочу), а английское I will = ich werde (буду).",
        "ПОЧЕМУ «I'LL TAKE IT» – ЭТО «Я ВОЗЬМУ», А НЕ «Я БЕРУ». Грамматически это действительно будущее время: will + Infinitiv. Но will у англичан – это не только «буду», а ещё и решение, принятое в момент речи (die spontane Entscheidung): в магазине посмотрел, подумал – «Беру!». Решение сейчас, а действие (заплатить, забрать) – чуть позже. Поэтому английский ставит будущее. По-русски точный перевод тоже будущее: «Я возьму это» (совершенный вид, der vollendete Aspekt, будущее время). А «беру» – это разговорная замена, как и немецкое «Ich nehme es».",
        "ПОЧЕМУ НЕМЕЦКИЙ ГОВОРИТ «ICH NEHME ES» (DAS PRÄSENS). В немецком настоящее время (das Präsens) очень часто заменяет будущее (das Futur I), если из ситуации ясно, что действие ещё впереди: Ich komme morgen. – I'll come tomorrow. Ich rufe dich an. – I'll call you. Немецкое «Ich werde es nehmen» грамматически верно, но в магазине звучит тяжеловато. В английском так нельзя: «I take it» (das Present Simple) означает привычку, повторение – «я (обычно) это беру». Для решения нужен will.",
        "ИТОГ (die Faustregel): EN – решение сейчас → will (I'll take it). DE – чаще das Präsens (Ich nehme es). RU – будущее совершенного вида (Я возьму это) или разговорно «беру».",
        "I'D = I WOULD = ICH WÜRDE. would – тоже вспомогательный глагол; он образует сослагательное наклонение (der Konjunktiv II, англ. conditional), то есть русскую частицу «бы». Ваша догадка верная: would = «бы». По-немецки würde + Infinitiv: I would go. – Ich würde gehen. – Я бы пошёл. Историческая справка: would – это прошедшее время (das Präteritum) от will (древнеангл. willan – wolde, ср. немецкое wollen – wollte). Поэтому will и would – одна семья: «буду» и «бы».",
        "ГДЕ ВСТРЕЧАЕТСЯ WOULD. 1) Вежливость (die Höflichkeit): I'd like a coffee. – Ich möchte einen Kaffee. – Я хотел бы кофе. Would you help me? – Würden Sie mir helfen? – Вы не помогли бы мне? 2) Условие (der Bedingungssatz, der Konditionalsatz): If I had time, I would go. – Wenn ich Zeit hätte, würde ich gehen. – Если бы у меня было время, я бы пошёл. 3) Будущее в прошлом (в косвенной речи, die indirekte Rede): He said he would come. – Er sagte, er würde kommen. – Он сказал, что придёт.",
        "ОСТОРОЖНО: I'D БЫВАЕТ ДВУХ ВИДОВ. I'd = I would, если после него стоит начальная форма (V1): I'd go, I'd like. Но I'd = I had (ich hatte), если после него стоит третья форма (V3, das Partizip II): I'd seen it. – Ich hatte es gesehen. – Я (уже) видел это. Различаем по следующему глаголу.",
        "ME = MICH / MIR. me – это не глагол, а объектный падеж (der Objektfall) местоимения I: Help me! – Hilf mir! – Помоги мне! Can you see me? – Siehst du mich? – Ты меня видишь? В английском одна форма me на месте немецких mich (Akkusativ) и mir (Dativ)."
      ],
      tabelle: {
        kopf: ["English", "lang", "Deutsch", "Русский", "die Form"],
        sprechen: 0,
        zeilen: [
          ["I'm retired.",       "I am retired.",       "Ich bin Rentner.",               "Я на пенсии.",              "am – das Präsens von be"],
          ["I'll take it.",      "I will take it.",     "Ich nehme es. / Ich werde es nehmen.", "Я возьму это.",      "will – das Futur I (werden)"],
          ["I'd take it.",       "I would take it.",    "Ich würde es nehmen.",           "Я бы взял это.",            "would – der Konjunktiv II (würde, «бы»)"],
          ["I'd like a coffee.", "I would like a coffee.", "Ich möchte einen Kaffee.",    "Я хотел бы кофе.",          "would like = möchte (höflich)"],
          ["I'd seen it.",       "I had seen it.",      "Ich hatte es gesehen.",          "Я (уже) видел это.",        "had + V3 – das Plusquamperfekt"],
          ["Help me!",           "Help me!",            "Hilf mir!",                      "Помоги мне!",               "me – der Objektfall von I"]
        ]
      },
      beispiele: [
        { en: "I'll take it.", de: "Ich nehme es. (Ich werde es nehmen.)", ru: "Я возьму это. (разг.: Беру.)", hinweis: "will = Entscheidung jetzt; DE: das Präsens statt Futur" },
        { en: "I'll call you tomorrow.", de: "Ich rufe dich morgen an.", ru: "Я позвоню тебе завтра.", hinweis: "I'll = I will = ich werde" },
        { en: "I'd call you, but I have no phone.", de: "Ich würde dich anrufen, aber ich habe kein Telefon.", ru: "Я бы тебе позвонил, но у меня нет телефона.", hinweis: "I'd = I would = ich würde (бы)" },
        { en: "If I had time, I would go.", de: "Wenn ich Zeit hätte, würde ich gehen.", ru: "Если бы у меня было время, я бы пошёл.", hinweis: "der Bedingungssatz" },
        { en: "Would you help me, please?", de: "Würden Sie mir bitte helfen?", ru: "Вы не помогли бы мне?", hinweis: "höflich" }
      ],
      merke: "I'll take it = решение сейчас (DE: Ich nehme es, RU: Я возьму) · I'm = ich bin (я есть) · I'll = ich werde (я буду) · I'd = ich würde (я бы) · will (EN) = werden, НЕ wollen · I'd + V3 = I had"
    },
    {
      id: "zeitform-zeitbezug",
      thema: "verb",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Zeitform ≠ die wirkliche Zeit – der Algorithmus für die Umgangssprache",
      titel_ru: "грамматическое время ≠ реальное время: как говорят на самом деле",
      formel: "Eingabe: die wirkliche Zeit + die Situation (Plan, Entscheidung, Vermutung) → Ausgabe: die Zeitform je Sprache",
      erklaerung: [
        "ДВА РАЗНЫХ ПОНЯТИЯ. die Zeitform (грамматическое время: das Präsens, das Futur I, das Futur II …) – это форма глагола. der Zeitbezug (реальное время) – когда действие происходит на самом деле. Это не одно и то же. Ошибка алгоритма «будущее → das Futur I» в том, что на входе только одна переменная.",
        "АЛГОРИТМ ОСТАЁТСЯ МАТЕМАТИЧЕСКИМ – нужна вторая переменная: die Situation. Функция: Zeitform = f(die Sprache, der Zeitbezug, die Situation).",
        "DEUTSCH. Будущее + понятно из контекста (morgen, gleich, решение) → das Präsens: Ich gehe nach Hause. Ich komme morgen. das Futur I – для обещания, прогноза или подчёркивания: Es wird regnen. Ich werde das schaffen! das Futur II почти всегда означает предположение о прошлом (die Vermutung): Er wird schon nach Hause gegangen sein. = Он, наверное, уже ушёл домой. Как «будущее» его в разговоре почти не используют.",
        "ENGLISCH. Решение сейчас → will (I'll take it). План, уже решено → be going to (I'm going to visit my son). Договорённость → das Present Progressive (I'm meeting him tomorrow). Привычка → das Present Simple (I go home at six).",
        "RUSSISCH. Будущее совершенного вида (возьму, пойду) или разговорно настоящее (иду, беру)."
      ],
      tabelle: {
        kopf: ["die Situation", "Deutsch (Umgangssprache)", "English", "Русский"],
        sprechen: 2,
        zeilen: [
          ["jetzt, gerade",                  "Ich gehe nach Hause.",              "I'm going home.",             "Я иду домой."],
          ["Entscheidung jetzt",             "Ich gehe jetzt nach Hause.",        "I'll go home now.",           "Пойду-ка я домой."],
          ["Plan (schon entschieden)",        "Ich gehe morgen nach Hause.",       "I'm going to go home tomorrow.", "Завтра я пойду домой."],
          ["Gewohnheit",                     "Ich gehe um sechs nach Hause.",     "I go home at six.",           "Я хожу домой в шесть."],
          ["Vermutung (Vergangenheit)",      "Er wird schon nach Hause gegangen sein.", "He'll have gone home already.", "Он, наверное, уже ушёл домой."]
        ]
      },
      beispiele: [
        { de: "Ich gehe nach Hause.", en: "I'm going home.", ru: "Я иду домой.", hinweis: "so spricht man" },
        { de: "Ich werde nach Hause gegangen sein.", en: "I will have gone home.", ru: "Я уже уйду домой (к тому моменту).", hinweis: "grammatisch richtig, aber im Alltag fast nie" }
      ],
      merke: "Zeitform = f(Sprache, wirkliche Zeit, Situation) · DE: Zukunft meist im Präsens · Futur II = meist Vermutung · EN: Entscheidung → will, Plan → going to"
    },
    {
      id: "de-praeposition-kasus",
      thema: "praeposition",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Präposition bestimmt den Kasus (aus dem Fenster, nicht aus des Fensters)",
      titel_ru: "падеж в немецком определяет предлог, а не русский вопрос",
      formel: "der Kasus = f(die Präposition)  ·  NICHT f(русский вопрос)  ·  aus + Dativ → aus dem Fenster",
      erklaerung: [
        "ОШИБКА-ЛОВУШКА (die Interferenz – влияние родного языка). По-русски: «смотрю из окна» → из чего? → родительный падеж (der Genitiv). Если перенести это в немецкий, получается «aus des Fensters» – неправильно. Правильно: Ich sehe aus dem Fenster.",
        "ПРАВИЛО. В немецком падеж (der Kasus) после предлога определяет сам предлог (die Präposition), а не вопрос и не русский перевод. Каждый предлог «управляет» своим падежом (die Rektion – управление). aus всегда требует дательного падежа (der Dativ): aus dem Fenster, aus der Stadt, aus dem Haus.",
        "ПОЭТОМУ АЛГОРИТМ ТАКОЙ: 1) найти предлог; 2) посмотреть в таблице, какой падеж он требует; 3) поставить артикль в этом падеже. Русский вопрос «кого? чего?» здесь не помогает – он работает только для русского языка.",
        "ЧЕТЫРЕ ГРУППЫ ПРЕДЛОГОВ. 1) Всегда der Dativ: aus, bei, mit, nach, seit, von, zu, gegenüber (стишок: «aus, bei, mit, nach, seit, von, zu»). 2) Всегда der Akkusativ: durch, für, gegen, ohne, um, bis. 3) Предлоги двойного управления (die Wechselpräposition): in, an, auf, über, unter, vor, hinter, neben, zwischen – вопрос Wo? (где?) → der Dativ: Ich bin in dem (im) Haus; вопрос Wohin? (куда?) → der Akkusativ: Ich gehe in das (ins) Haus. Только здесь вопрос имеет значение, и это немецкий вопрос, а не русский. 4) der Genitiv: wegen, trotz, während, statt (anstatt), innerhalb, außerhalb – их немного, в разговоре после wegen и trotz часто тоже ставят Dativ.",
        "СЛИЯНИЕ ПРЕДЛОГА И АРТИКЛЯ (die Verschmelzung): von dem → vom, zu dem → zum, zu der → zur, bei dem → beim, in dem → im, in das → ins, an dem → am."
      ],
      tabelle: {
        kopf: ["der Kasus", "die Präpositionen", "das Beispiel", "Русский"],
        zeilen: [
          ["immer der Dativ",      "aus, bei, mit, nach, seit, von, zu, gegenüber", "Ich sehe aus dem Fenster.",       "Я смотрю из окна."],
          ["immer der Akkusativ",  "durch, für, gegen, ohne, um, bis",              "Das ist für den Enkel.",          "Это для внука."],
          ["Wo? → der Dativ",      "in, an, auf, über, unter, vor, hinter, neben, zwischen", "Das Buch liegt auf dem Tisch.", "Книга лежит на столе."],
          ["Wohin? → der Akkusativ","in, an, auf, über, unter, vor, hinter, neben, zwischen", "Ich lege das Buch auf den Tisch.", "Я кладу книгу на стол."],
          ["der Genitiv",          "wegen, trotz, während, statt",                  "Wegen des Regens bleibe ich zu Hause.", "Из-за дождя я остаюсь дома."]
        ]
      },
      beispiele: [
        { de: "Ich sehe aus dem Fenster.", en: "I look out of the window.", ru: "Я смотрю из окна.", hinweis: "aus + Dativ (NICHT aus des Fensters)" },
        { de: "Ich komme aus der Stadt.", en: "I come from the town.", ru: "Я иду из города.", hinweis: "aus + Dativ: die → der" },
        { de: "Ich fahre mit dem Auto.", en: "I go by car.", ru: "Я еду на машине.", hinweis: "mit + Dativ" },
        { de: "Ich gehe ins Haus.", en: "I go into the house.", ru: "Я иду в дом.", hinweis: "Wohin? → Akkusativ: in das = ins" }
      ],
      merke: "Падеж задаёт предлог: aus, bei, mit, nach, seit, von, zu → Dativ · durch, für, gegen, ohne, um → Akkusativ · in/an/auf…: Wo? Dativ, Wohin? Akkusativ · русский вопрос «из чего?» не переносить!"
    },
    {
      id: "de-finit-infinit",
      thema: "verb",
      sprache: "de",
      datum: "2026-11-18",
      titel: "das finite Verb und der Infinitiv (finite und infinite Verbformen)",
      titel_ru: "спрягаемый глагол и инфинитив: sehe ← sehen",
      formel: "das finite Verb = mit Person, Numerus, Tempus, Modus (ich sehe)  ·  der Infinitiv = die Grundform ohne Person (sehen)",
      erklaerung: [
        "ПРОИСХОЖДЕНИЕ И ПРОИЗНОШЕНИЕ. finit – латинское слово: finitus «ограниченный, определённый» ← finis «граница, конец» (отсюда же das Finale, англ. finish). По-немецки читается «фи-НИТ» [fiˈniːt]. «Файнайт» – это английское чтение того же слова (finite verb). Термины одни и те же, произношение разное – поэтому у немецких терминов свой глоссарий и немецкий голос.",
        "DAS FINITE VERB (спрягаемый, личный глагол; auch: die Personalform, das Finitum) – форма, по которой видно четыре вещи: die Person (лицо: ich / du / er), der Numerus (число: Singular / Plural), das Tempus (время: Präsens, Präteritum …) и der Modus (наклонение: Indikativ, Konjunktiv, Imperativ). Форма «определена» – отсюда название.",
        "DER INFINITIV (неопределённая форма, die Grundform) – лат. in- «не» + finitus = «НЕопределённый». Русское название «неопределённая форма» – буквальный перевод. Лицо и число не видны: sehen, gehen, arbeiten. Так глагол стоит в словаре. Почти всегда оканчивается на -en (sehen) или -n (wandern, sein).",
        "DIE INFINITEN VERBFORMEN – формы без лица: der Infinitiv (sehen), das Partizip I (sehend – видящий), das Partizip II (gesehen – увиденный, нужен для Perfekt). Сами по себе они не могут быть сказуемым: нельзя сказать «Ich gesehen».",
        "ПРИМЕР «Ich sehe aus dem Fenster». sehe – das finite Verb: 1. Person, Singular, Präsens, Indikativ. Der Infinitiv: sehen. У sehen в du и er/sie/es корневая гласная e меняется на ie (du siehst, er sieht) – это der Vokalwechsel, признак сильного глагола (das starke Verb). Таблица 1 – вся die Konjugation.",
        "ГДЕ СТОИТ (die Satzklammer). В повествовательном предложении (der Aussagesatz) finite Verb всегда на 2-м месте (die Verbzweitstellung) – это левая скобка (die linke Klammer). Infinite Teile уходят в самый конец – правая скобка (die rechte Klammer): Ich HABE aus dem Fenster GESEHEN. Ich WILL aus dem Fenster SEHEN. В вопросе без вопросительного слова (die Ja/Nein-Frage) и в повелительном (der Imperativ) finite Verb – на 1-м месте: Siehst du …? Sieh!",
        "КАК НАЙТИ finite Verb: (1) поменяйте лицо подлежащего – какое слово изменилось, то и finit: ich sehe → du siehst. (2) Поставьте предложение в другое время – finit тоже изменится: ich sehe → ich sah. Infinite Formen при смене лица не меняются: ich habe gesehen → du hast gesehen.",
        "РУССКАЯ ПАРАЛЛЕЛЬ: «я вижу» – личная форма (= finit), «видеть» – инфинитив. АНГЛИЙСКАЯ: I see – finite verb, (to) see – infinitive [ɪnˈfɪnətɪv]; см. также формы V1/V2/V3 в правиле про -ing."
      ],
      tabellen: [
        {
          titel: "1 · die Konjugation von «sehen» (der Infinitiv) – das finite Verb im Präsens und Präteritum",
          kopf: ["die Person", "das Präsens · сейчас", "das Präteritum · было"],
          sprechen: [1, 2],
          zeilen: [
            ["1. Person Singular", "ich sehe · я вижу", "ich sah · я видел"],
            ["2. Person Singular", "du siehst · ты видишь (e → ie)", "du sahst · ты видел"],
            ["3. Person Singular", "er sieht · он видит (e → ie)", "er sah · он видел"],
            ["1. Person Plural", "wir sehen · мы видим (= Infinitiv)", "wir sahen · мы видели"],
            ["2. Person Plural", "ihr seht · вы видите", "ihr saht · вы видели"],
            ["3. Person Plural / Sie", "sie sehen · они видят", "sie sahen · они видели"]
          ]
        },
        {
          titel: "2 · finit oder infinit? – Beispiele aus dem Satzlabor",
          kopf: ["der Satz", "das finite Verb (2. / 1. Stelle)", "infinite Teile (am Ende)"],
          sprechen: 0,
          zeilen: [
            ["Ich sehe aus dem Fenster. · я смотрю в окно", "sehe · ← sehen", "—"],
            ["Ich habe aus dem Fenster gesehen. · Perfekt", "habe · ← haben", "gesehen · das Partizip II"],
            ["Ich will heute nicht arbeiten. · Modalverb", "will · ← wollen", "arbeiten · der Infinitiv"],
            ["Wir werden morgen Fußball spielen. · Futur I", "werden · ← werden", "spielen · der Infinitiv"],
            ["Siehst du das Haus? · Ja/Nein-Frage", "siehst · 1. Stelle", "—"]
          ]
        }
      ],
      beispiele: [
        { de: "Ich sehe aus dem Fenster.", en: "I look out of the window.", ru: "Я смотрю в окно.", hinweis: "sehe – finit (1. Person Singular), Infinitiv: sehen" },
        { de: "Du siehst müde aus.", en: "You look tired.", ru: "Ты выглядишь усталым.", hinweis: "siehst … aus – finit + abgetrennte Vorsilbe; Infinitiv: aussehen" },
        { de: "Ich habe ihn gestern gesehen.", en: "I saw him yesterday.", ru: "Я видел его вчера.", hinweis: "habe – finit · gesehen – infinit (Partizip II)" },
        { de: "Ich möchte das Meer sehen.", en: "I would like to see the sea.", ru: "Я хотел бы увидеть море.", hinweis: "möchte – finit · sehen – Infinitiv (в англ. с to)" }
      ],
      merke: "finit [fi-NIT] = с лицом: ich sehe, du siehst – стоит на 2-м месте. Infinitiv = основная форма без лица: sehen – стоит в словаре и в конце предложения. Найти finit: поменяй ich на du – изменившийся глагол и есть finit."
    }
  ]
};
