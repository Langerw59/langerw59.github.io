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
    }
  ]
};
