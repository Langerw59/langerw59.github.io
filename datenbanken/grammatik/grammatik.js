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
      // 2026-11-18: mit Claude – die Wortarten; das Adjektiv oder das Adverb?
      id: "de-wortarten",
      thema: "grundbegriffe",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Wortarten – das Adjektiv oder das Adverb?",
      titel_ru: "части речи – прилагательное или наречие?",
      formel: "das Adjektiv kann eine Endung bekommen (das schnelle Auto) · das Adverb bekommt NIE eine Endung (morgens, gern, hier)",
      erklaerung: [
        "ЧАСТИ РЕЧИ. die Wortart (мн. die Wortarten) – часть речи. Изменяемые: das Nomen / das Substantiv (существительное), das Verb (глагол), das Adjektiv (прилагательное), das Pronomen (местоимение), der Artikel (артикль). Неизменяемые: das Adverb (наречие), die Präposition (предлог), die Konjunktion (союз), die Partikel (частица). Неизменяемые слова никогда не получают окончаний.",
        "ПРИЛАГАТЕЛЬНОЕ. das Adjektiv (лат. adiectivum – «приложенное, добавленное» к существительному) описывает предмет: какой? Перед существительным оно склоняется (wird dekliniert) – получает окончание: das schnelle Auto, ein schneller Zug, mit dem schnellen Zug. Его можно сравнивать: schnell – schneller – am schnellsten (die Steigerung).",
        "НАРЕЧИЕ. das Adverb (лат. ad verbum – «при глаголе») описывает действие или всё предложение: когда? где? как? как часто? – morgens, heute, hier, dort, gern, oft. Оно неизменяемое: окончаний не бывает никогда. Нельзя сказать „das gerne Auto“ или „der hiere Mann“.",
        "ГЛАВНАЯ ПУТАНИЦА. В немецком многие прилагательные можно поставить к глаголу БЕЗ окончания: Er fährt schnell. Sie singt schön. По-русски тут наречие («быстро», «красиво»), а по-немецки слово остаётся прилагательным – это называется adverbial gebraucht (употреблено как обстоятельство). Отличие от русского: в русском меняется само слово (быстрый → быстро), в немецком – нет (schnell → schnell).",
        "ТЕСТ. Можно ли поставить слово между артиклем и существительным с окончанием? das schnelle Auto – да → das Adjektiv. das morgense Auto – нет → das Adverb. Второй тест: можно ли образовать сравнение? schnell – schneller → Adjektiv; hier – „hierer“ – нет → Adverb. (Исключения: gern – lieber – am liebsten, oft – öfter.)",
        "В АНГЛИЙСКОМ – НАОБОРОТ ПРОЩЕ. Там наречие обычно получает -ly: quick (adjective) → quickly (adverb): a quick car, he drives quickly. Немецкое schnell = и quick, и quickly. Исключения: good → well, fast → fast, hard → hard.",
        "КАК ЭТО РАБОТАЕТ В SATZLABOR. Вверху «Satz bauen» есть 🔎 der Wortart-Erkenner: введите слово – программа найдёт в словаре Wiktionary его часть речи, объяснит её и кнопкой «→ in die Liste» занесёт слово в нужное поле (Verb, Adjektiv, Wann?, Wie?, Wo? или Nomen)."
      ],
      tabelle: {
        kopf: ["die Wortart", "по-русски", "veränderlich? · изменяется?", "die Frage", "Beispiele"],
        sprechen: false,
        zeilen: [
          ["das Nomen (das Substantiv)", "существительное", "ja – der Kasus, der Plural", "Wer? Was?", "der Garten, die Sonne, das Haus"],
          ["das Verb", "глагол", "ja – wird konjugiert", "Was tut …?", "gehen, schwimmen, arbeiten"],
          ["das Adjektiv", "прилагательное", "ja – wird dekliniert, Steigerung", "Wie ist …? Was für ein …?", "schnell, schön, alt – das schnelle Auto"],
          ["das Adverb", "наречие", "nein – nie eine Endung", "Wann? Wo? Wie? Wie oft?", "morgens, heute, hier, gern, oft"],
          ["das Pronomen", "местоимение", "ja", "–", "ich, du, mein, dieser"],
          ["die Präposition", "предлог", "nein", "–", "in, mit, nach, auf"],
          ["die Konjunktion", "союз", "nein", "–", "und, aber, weil, dass"]
        ]
      },
      beispiele: [
        { de: "Das schnelle Auto steht im Garten.", en: "The fast car is in the garden.", ru: "Быстрая машина стоит в саду.", hinweis: "schnelle – das Adjektiv mit Endung (vor dem Nomen)" },
        { de: "Mein Sohn fährt schnell.", en: "My son drives fast.", ru: "Мой сын ездит быстро.", hinweis: "schnell – das Adjektiv, adverbial gebraucht (ohne Endung); по-русски наречие" },
        { de: "Morgens trinke ich gern Kaffee.", en: "In the morning I like to drink coffee.", ru: "По утрам я охотно пью кофе.", hinweis: "morgens, gern – zwei Adverbien: unveränderlich" },
        { de: "Wir wohnen hier.", en: "We live here.", ru: "Мы живём здесь.", hinweis: "hier – das Adverb (Wo?)" }
      ],
      merke: "Bekommt das Wort vor einem Nomen eine Endung (das schnelle Auto)? → das Adjektiv. Nie eine Endung möglich (morgens, hier, gern)? → das Adverb."
    },
    {
      // 2026-11-18: mit Claude – die Wortart und das Satzglied (zwei verschiedene Ebenen)
      id: "de-wortart-satzglied",
      thema: "grundbegriffe",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Wortart und das Satzglied – zwei verschiedene Dinge",
      titel_ru: "часть речи и член предложения – это разные вещи",
      formel: "die Wortart = WAS für ein Wort? (das Verb, das Adverb …) · das Satzglied = WELCHE ROLLE hat es im Satz? (das Subjekt, die Ortsangabe …) – man findet es mit der Frage (Wer? Wo? Wann? Wie?)",
      definitionen: [
        { wort: "die Wortart", de: "Die Wortart sagt, zu welcher Gruppe ein Wort gehört – unabhängig vom Satz. Sie steht im Wörterbuch.", ru: "Часть речи говорит, к какой группе относится слово само по себе, вне предложения. Она указана в словаре." },
        { wort: "das Satzglied", de: "Das Satzglied sagt, welche Aufgabe ein Wort (oder eine Wortgruppe) in einem bestimmten Satz hat. Man erfragt es mit einer Frage.", ru: "Член предложения говорит, какую роль слово (или группа слов) играет в конкретном предложении. Его находят вопросом." }
      ],
      erklaerung: [
        "ДВА УРОВНЯ. В школе это учат как две разные вещи: die Wortart (часть речи) – это «паспорт» слова, он всегда одинаковый. das Satzglied (член предложения) – это «должность» слова в данном предложении, она зависит от предложения. Сравнение: человек по профессии электрослесарь (Wortart), а на собрании он председатель (Satzglied).",
        "ЧЛЕНЫ ПРЕДЛОЖЕНИЯ (die Satzglieder): das Subjekt – подлежащее (Wer? Was?), das Prädikat – сказуемое (Was tut …?), das Dativobjekt – дополнение в дательном (Wem?), das Akkusativobjekt – дополнение в винительном (Wen? Was?), die Adverbialbestimmung – обстоятельство: der Zeit (Wann? Wie oft?), des Ortes (Wo? Wohin? Woher?), der Art und Weise (Wie?).",
        "ОДНА РОЛЬ – РАЗНЫЕ ЧАСТИ РЕЧИ. На вопрос Wo? (die Ortsangabe) могут ответить: das Adverb (hier, dort, irgendwo) или die Präposition + das Nomen (im Garten). На вопрос Wann?: das Adverb (morgens, heute) или die Präposition + das Nomen (am Montag). На вопрос Wie?: das Adverb (gern) или das Adjektiv без окончания (schnell, langsam – adverbial gebraucht).",
        "ОДНА ЧАСТЬ РЕЧИ – РАЗНЫЕ РОЛИ. das Nomen „die Sonne“ может быть das Subjekt (Die Sonne scheint.) или das Akkusativobjekt (Ich sehe die Sonne.) или частью Ortsangabe (in der Sonne).",
        "КАК ЭТО В SATZLABOR (Satz bauen). Поля там – это die Satzglieder (вопросы Wer? Wem? Wann? Wo? Wie?). После «🔍 prüfen» программа сразу показывает 📗 die Wortart слова (например: irgendwo – das Adverb des Ortes). Если слово по смыслу отвечает на другой вопрос, появляется ⚠ подсказка и кнопка «→ ins Feld Wo?» – слово само переходит в нужное поле. В «Meine Wörter» у каждого слова тоже видна часть речи. «✓ steht im Wörterbuch» означает только правильную орфографию.",
        "das Verb И das Prädikat – НЕ одно и то же. das Verb – часть речи (слово в словаре: kümmern, gehen). das Prädikat – член предложения, «сказуемое». В простом предложении Prädikat = один глагол (Die Sonne scheint.). Но Prädikat может состоять из нескольких глаголов: Die Sonne HAT … GESCHIENEN (das Hilfsverb + das Partizip II), Ich WILL nach Hause GEHEN (das Modalverb + der Infinitiv), Ich STEHE früh AUF (trennbares Verb). Все эти части вместе – одно Prädikat. Поэтому das Hilfsverb в Satzlabor не отдельное поле: оно часть Prädikat.",
        "ОТКУДА СЛОВА (die Etymologie). das Prädikat ← лат. praedicatum «высказанное» (praedicare – «объявлять, высказывать»): то, что высказано о подлежащем. Русское «сказуемое» – дословный перевод (калька): «то, что сказано». das Subjekt ← лат. subiectum «положенное под, лежащее в основе» – русское «подлежащее» тоже калька: «лежащее под». То есть русские грамматические термины – переводы латинских, и смысл у них один.",
        "ГЛАГОЛ КАК СУЩЕСТВИТЕЛЬНОЕ (das substantivierte Verb / der substantivierte Infinitiv). Любой инфинитив можно сделать существительным: laufen → das Laufen (бег), essen → das Essen (еда), lesen → das Lesen (чтение). Правило: всегда пишется с большой буквы и всегда среднего рода – das. Das Laufen ist gesund. Beim Laufen höre ich Musik (beim = bei dem). Поэтому программа в поле Nomen находит «das Laufen» – это не ошибка.",
        "ПРОВЕРКА ВОПРОСОМ. Чтобы найти поле, задай вопрос к слову в готовом предложении: Ich habe es irgendwo gefunden. – Wo habe ich es gefunden? – irgendwo → die Ortsangabe."
      ],
      tabelle: {
        kopf: ["das Wort", "die Wortart · часть речи", "die Frage", "das Satzglied · член предложения"],
        sprechen: 0,
        sprache: "de",
        zeilen: [
          ["irgendwo", "das Adverb (Ort) · наречие места", "Wo?", "die Ortsangabe"],
          ["im Garten", "die Präposition + das Nomen", "Wo?", "die Ortsangabe"],
          ["morgens", "das Adverb (Zeit)", "Wann?", "die Zeitangabe"],
          ["oft", "das Adverb (Zeit)", "Wie oft?", "die Zeitangabe"],
          ["gern", "das Adverb", "Wie?", "die Art und Weise"],
          ["schnell", "das Adjektiv (adverbial gebraucht)", "Wie?", "die Art und Weise"],
          ["die Sonne", "der Artikel + das Nomen", "Wer? / Wen?", "das Subjekt oder das Akkusativobjekt"],
          ["kümmert", "das Verb (finit)", "Was tut …?", "das Prädikat"]
        ]
      },
      beispiele: [
        { de: "Ich habe den Schlüssel irgendwo gefunden.", en: "I found the key somewhere.", ru: "Я где-то нашёл ключ.", hinweis: "irgendwo – das Adverb; Frage Wo? → die Ortsangabe" },
        { de: "Morgens trinke ich gern Kaffee.", en: "In the morning I like to drink coffee.", ru: "По утрам я охотно пью кофе.", hinweis: "morgens → Wann? (die Zeitangabe); gern → Wie? (die Art und Weise)" },
        { de: "Die Sonne scheint.", en: "The sun is shining.", ru: "Светит солнце.", hinweis: "die Sonne – das Nomen, hier das Subjekt (Wer? Was?)" },
        { de: "Ich sehe die Sonne.", en: "I see the sun.", ru: "Я вижу солнце.", hinweis: "dasselbe Nomen – hier das Akkusativobjekt (Wen? Was?)" }
      ],
      merke: "Die Wortart steht im Wörterbuch (das Adverb). Das Satzglied findet man mit der Frage im Satz (Wo? → die Ortsangabe). „irgendwo“ = das Adverb und antwortet auf Wo?"
    },
    {
      // 2026-11-18: mit Claude – Einteilung der Verben (wie in der Datenbank)
      id: "de-verbarten",
      thema: "verb",
      sprache: "de",
      datum: "2026-11-18",
      titel: "das starke, das schwache und das gemischte Verb; trennbar und untrennbar; reflexiv",
      titel_ru: "сильные, слабые и смешанные глаголы; отделяемые и неотделяемые приставки; возвратные",
      formel: "die Stammformen: der Infinitiv – das Präteritum – das Partizip II (gehen – ging – gegangen · machen – machte – gemacht · bringen – brachte – gebracht)",
      erklaerung: [
        "ТРИ ОСНОВНЫЕ ФОРМЫ. die Stammformen – три формы, по которым строятся все времена: der Infinitiv (gehen), das Präteritum (ging), das Partizip II (gegangen). По ним глаголы и делятся на типы. Satzlabor показывает их под выбранным глаголом.",
        "СЛАБЫЙ ГЛАГОЛ. das schwache Verb (= regelmäßig, правильный): корень не меняется, в Präteritum добавляется -te, Partizip II: ge- … -t. machen – machte – gemacht, spielen – spielte – gespielt. Таких глаголов большинство, и все новые слова (googeln – googelte – gegoogelt) – слабые.",
        "СИЛЬНЫЙ ГЛАГОЛ. das starke Verb (≈ unregelmäßig, неправильный): в Präteritum меняется корневая гласная – der Ablaut (чередование гласной), Partizip II: ge- … -en. gehen – ging – gegangen, sehen – sah – gesehen, fliegen – flog – geflogen. Их около 200, их учат наизусть – как английские irregular verbs (go – went – gone).",
        "СМЕШАННЫЙ ГЛАГОЛ. das gemischte Verb: гласная меняется (как у сильного), но окончания -te и -t (как у слабого). bringen – brachte – gebracht, denken – dachte – gedacht, wissen – wusste – gewusst. Их всего около десяти.",
        "СМЕНА ГЛАСНОЙ В НАСТОЯЩЕМ. der Vokalwechsel im Präsens: у многих сильных глаголов гласная меняется уже в du и er/sie/es: fahren → du fährst, er fährt; sehen → du siehst; geben → du gibst. В ich, wir, ihr, sie – без изменений.",
        "ОТДЕЛЯЕМЫЕ ПРИСТАВКИ. das trennbare Verb: ударная приставка (an-, auf-, aus-, ein-, mit-, zu- …) в предложении уходит в конец: aufstehen → Ich stehe um 7 Uhr auf. Partizip II: auf-ge-standen (ge- внутри).",
        "НЕОТДЕЛЯЕМЫЕ ПРИСТАВКИ. das untrennbare Verb: безударные приставки be-, ge-, er-, ver-, zer-, ent-, emp-, miss- никогда не отделяются и в Partizip II нет ge-: bezahlen – bezahlte – bezahlt, verkaufen – verkauft, beginnen – begonnen.",
        "ВОЗВРАТНЫЕ. das reflexive Verb: глагол с sich (как русское -ся): sich waschen – ich wasche mich, du wäschst dich. Perfekt всегда с haben: Ich habe mich gewaschen."
      ],
      tabelle: {
        kopf: ["die Art", "der Infinitiv", "das Präteritum", "das Partizip II", "Merkmal · признак"],
        sprechen: false,
        zeilen: [
          ["schwach", "machen", "machte", "gemacht", "-te / ge-…-t, Stamm bleibt"],
          ["stark", "gehen", "ging", "gegangen", "Ablaut / ge-…-en"],
          ["stark + Vokalwechsel", "fahren (du fährst)", "fuhr", "gefahren", "a → ä im Präsens"],
          ["gemischt", "bringen", "brachte", "gebracht", "Ablaut + -te / -t"],
          ["trennbar", "aufstehen", "stand … auf", "aufgestanden", "Vorsilbe ans Satzende"],
          ["untrennbar", "bezahlen", "bezahlte", "bezahlt", "kein ge-"],
          ["reflexiv", "sich waschen", "wusch sich", "hat sich gewaschen", "mit sich"]
        ]
      },
      beispiele: [
        { de: "Ich machte die Hausaufgaben.", en: "I did the homework.", ru: "Я делал домашнее задание.", hinweis: "schwach: machen – machte – gemacht" },
        { de: "Die Sonne schien den ganzen Tag.", en: "The sun shone all day.", ru: "Солнце светило весь день.", hinweis: "stark: scheinen – schien – geschienen" },
        { de: "Er brachte mir einen Brief.", en: "He brought me a letter.", ru: "Он принёс мне письмо.", hinweis: "gemischt: bringen – brachte – gebracht" },
        { de: "Wir haben die Rechnung bezahlt.", en: "We have paid the bill.", ru: "Мы оплатили счёт.", hinweis: "untrennbar: be- → kein ge-" }
      ],
      merke: "schwach: -te / -t · stark: neuer Vokal + -en · gemischt: neuer Vokal + -te / -t · be-, ver-, er- … → kein ge-"
    },
    {
      // 2026-11-18: mit Claude – Artikel-Finder im Satzlabor
      id: "de-artikel-finden",
      thema: "artikel",
      sprache: "de",
      datum: "2026-11-18",
      titel: "der, die oder das? – das Genus erkennen (das Grundwort und die Endungen)",
      titel_ru: "как узнать артикль существительного: основное слово и окончания",
      formel: "das Kompositum: Bestimmungswort + Grundwort → der Artikel kommt vom Grundwort (die Sonne + der Schein = der Sonnenschein)",
      erklaerung: [
        "ЧТО ТАКОЕ GENUS. das Genus (лат. genus – «род, порода») – грамматический род: das Maskulinum (мужской) → der, das Femininum (женский) → die, das Neutrum (средний, лат. neuter – «ни тот, ни другой») → das. Во множественном числе (der Plural) у всех один артикль: die. Род в немецком часто не совпадает с русским: die Sonne – но «солнце» среднего рода; der Mond – но «луна» женского.",
        "ГЛАВНОЕ ПРАВИЛО: ОСНОВНОЕ СЛОВО. das Kompositum (лат. compositum – «составленное») – сложное слово. Первая часть – das Bestimmungswort («определяющее слово»: какой?), последняя – das Grundwort («основное слово»: что?). Артикль ВСЕГДА берётся от последнего слова: die Sonne + der Schein = der Sonnenschein; das Haus + die Tür = die Haustür; die Arbeit + der Kollege = der Arbeitskollege. Поэтому длинные слова не страшны – смотрите на конец.",
        "ОКОНЧАНИЯ – ВСЕГДА (100 %). -ung, -heit, -keit, -schaft, -ion, -tät → die (die Zeitung, die Freiheit, die Station). -chen, -lein (уменьшительные) → das (das Mädchen, das Fräulein – поэтому «девочка» среднего рода!). -ismus, -ling → der (der Tourismus, der Frühling).",
        "ОКОНЧАНИЯ – ОБЫЧНО (есть исключения). -e → чаще die (die Lampe, но der Junge, das Auge). -ei, -ie, -ik, -ur, -anz, -enz → die (die Bäckerei, die Musik). -ment, -um → das (das Dokument, das Zentrum). -or, -ant, -ig, -ich → der (der Motor, der Honig).",
        "N-СКЛОНЕНИЕ. die n-Deklination (слабое склонение): некоторые существительные мужского рода получают -n/-en во всех падежах, кроме именительного: der Kollege → den Kollegen, dem Kollegen. Satzlabor показывает это сразу при поиске артикля.",
        "КАК ЭТО РАБОТАЕТ В SATZLABOR. В полях Wer? / Wem? / Wen? выберите «✏️ eigenes Nomen eingeben», напишите слово и нажмите «🔍 Artikel finden». Программа ищет: 1) в своём словаре, 2) в Wiktionary (сначала всё слово, потом основное слово), 3) без интернета – по правилам окончаний. Артикль можно исправить кнопками der / die / das / Plural; слово сохраняется в «Meine Wörter»."
      ],
      tabelle: {
        kopf: ["die Endung", "der Artikel", "wie sicher · насколько точно", "Beispiele"],
        sprechen: false,
        zeilen: [
          ["-ung, -heit, -keit, -schaft", "die", "immer · всегда", "die Zeitung, die Freiheit, die Möglichkeit, die Freundschaft"],
          ["-ion, -tät", "die", "immer · всегда", "die Station, die Universität"],
          ["-chen, -lein", "das", "immer · всегда", "das Mädchen, das Brötchen, das Fräulein"],
          ["-ismus, -ling", "der", "immer · всегда", "der Tourismus, der Frühling"],
          ["-e", "die", "meistens · обычно", "die Lampe, die Sonne – aber: der Junge, das Auge"],
          ["-ei, -ie, -ik, -ur, -anz, -enz", "die", "meistens · обычно", "die Bäckerei, die Familie, die Musik, die Natur"],
          ["-ment, -um", "das", "meistens · обычно", "das Dokument, das Zentrum – aber: der Reichtum"],
          ["-or, -ant, -ig, -ich", "der", "meistens · обычно", "der Motor, der Elefant, der Honig, der Teppich"]
        ]
      },
      beispiele: [
        { de: "Die Sonne scheint.", en: "The sun is shining.", ru: "Солнце светит.", hinweis: "die Sonne – Femininum (по-русски средний род!)" },
        { de: "Der Sonnenschein ist warm.", en: "The sunshine is warm.", ru: "Солнечный свет тёплый.", hinweis: "das Grundwort: der Schein → der Sonnenschein" },
        { de: "Ich sehe einen Arbeitskollegen.", en: "I see a colleague.", ru: "Я вижу коллегу.", hinweis: "n-Deklination: der Kollege → den Kollegen" },
        { de: "Die Zeitung liegt auf dem Tisch.", en: "The newspaper is on the table.", ru: "Газета лежит на столе.", hinweis: "-ung → immer die" }
      ],
      merke: "Bei langen Wörtern zählt das LETZTE Wort: der Schein → der Sonnenschein. -ung, -heit, -keit, -schaft, -ion, -tät → immer die · -chen, -lein → immer das"
    },
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
        "PLEASE В НАЧАЛЕ ИЛИ В КОНЦЕ (2026-11-19). Оба варианта правильные: Please sit down. = Sit down, please. – Setz dich bitte. / Setzen Sie sich bitte. Запятая зависит от места please: В НАЧАЛЕ – без запятой (Please sit down.), В КОНЦЕ – запятая ПЕРЕД please (Sit down, please.), В СЕРЕДИНЕ вопроса – без запятых (Could you please help me?). Please в начале звучит чуть вежливее и мягче, в конце – как добавка к просьбе. По-немецки bitte обычно без запятой: Setz dich bitte. / Bitte setz dich. (запятая только при особом ударении: Setz dich, bitte!).",
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
        { en: "Please sit down.", de: "Setz dich bitte.", ru: "Садись, пожалуйста.", hinweis: "please в начале → без запятой" },
        { en: "Sit down, please.", de: "Setz dich bitte.", ru: "Садись, пожалуйста.", hinweis: "please в конце → запятая перед please" },
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
        "'S = IS (2026-11-19). is сокращается до 's: that's, it's, what's, there's, here's, where's, he's, she's. НО НЕ ПОСЛЕ THIS: всегда полностью this is (This is my wife.). Форму «this's» не пишут – два звука [s] подряд неудобно произносить и некрасиво читать. Так же и these/those: these are, those are (без сокращения).",
        "У 'S ТРИ ЗНАЧЕНИЯ – смотрим на соседние слова: 1) 's = is: It's good. – Es ist gut. 2) 's = has (перед V3, das Partizip II): He's seen it. = He has seen it. – Er hat es gesehen. 3) 's = принадлежность (der Genitiv, «чей?»): Peter's car – Peters Auto – машина Петера. ЛОВУШКА: it's = it is, а its (без апострофа) = «его/её» (sein): The dog wags its tail.",
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
    },
    {
      // 2026-11-18: mit Claude – „Er war Pilot eines Passagierflugzeugs.“
      id: "de-genitiv",
      thema: "artikel",
      sprache: "de",
      datum: "2026-11-18",
      titel: "der Genitiv und das Genitivattribut (Pilot eines Passagierflugzeugs); der Beruf ohne Artikel",
      titel_ru: "родительный падеж: «пилот пассажирского самолёта»; профессия без артикля",
      formel: "Nomen + des/eines/meines … + Nomen-(e)s (m/n)  ·  Nomen + der/einer/meiner … + Nomen (f/Plural)  ·  sein + Beruf ohne Artikel",
      erklaerung: [
        "ПРИМЕР. Он был пилотом пассажирского самолёта → Er war Pilot eines Passagierflugzeugs. Типичная ошибка: „Er war einen Pilot der Passagierflugzeug“.",
        "1) ПОСЛЕ sein – НЕ Akkusativ. После глагола sein (быть), werden (становиться), bleiben (оставаться) стоит der Nominativ (именительный падеж). Эта часть называется das Prädikativ (именная часть сказуемого; лат. praedicare – «высказывать»). Поэтому „einen Pilot“ (это Akkusativ) – неправильно. Правильно: Er war Pilot. / Er war ein guter Pilot.",
        "2) ПРОФЕССИЯ БЕЗ АРТИКЛЯ. Если после sein / werden называют der Beruf (профессию), die Nationalität (национальность) или die Religion, артикль обычно не ставят: Er war Pilot. Sie ist Lehrerin. Ich bin Rentner. Er ist Deutscher. Артикль появляется, когда есть прилагательное: Er war ein guter Pilot. (В английском наоборот – артикль нужен всегда: He was a pilot.)",
        "ТРИ ВАРИАНТА – ТРИ СМЫСЛА (2026-11-18). Er ist Pilot. – профессия, «кем работает» (ответ на вопрос Was ist er von Beruf?) – обычный вариант. Er ist der Pilot (dieses Flugzeugs). – именно ТОТ пилот, конкретный человек: der bestimmte Artikel показывает «тот самый, единственный» (Wer fliegt heute? – Er ist der Pilot.). Er ist ein guter / erfahrener Pilot. – с прилагательным даём оценку, «какой он пилот» → нужен ein. Просто «Er ist ein Pilot» без прилагательного звучит для немца непривычно – как будто «он один из пилотов (а не кто-то другой)». Логика: когда называем профессию, мы говорим, ЧЕМ человек занимается, а не указываем на один предмет из многих – поэтому артикль не нужен. В русском артиклей нет совсем, поэтому эта ошибка у русскоязычных частая.",
        "3) РОДИТЕЛЬНЫЙ ПАДЕЖ. der Genitiv (лат. genitivus – «родовой, происхождения») отвечает на вопрос Wessen? – чей? чего? Он показывает принадлежность: das Auto meines Vaters (машина моего отца), die Tür der Küche (дверь кухни), der Pilot eines Passagierflugzeugs (пилот пассажирского самолёта).",
        "4) das Genitivattribut (определение в родительном падеже) – это НЕ отдельный член предложения (kein eigenes Satzglied). Оно «висит» на существительном перед ним и вместе с ним образует один член предложения. В Satzlabor вся группа „Pilot eines Passagierflugzeugs“ поэтому одного цвета (das Prädikativ).",
        "5) ОКОНЧАНИЯ В ГЕНИТИВЕ. Мужской и средний род (m/n): артикль des / eines / meines …, а само существительное получает -s или -es: des Vaters, eines Passagierflugzeugs, seines Sohnes (-es чаще у коротких слов и после s, ß, z, sch). Слабые существительные (die n-Deklination) получают -(e)n: des Piloten, des Kunden, des Studenten. Женский род и множественное число (f/Plural): артикль der / einer / meiner …, существительное без окончания: der Küche, einer Frau, der Kinder.",
        "6) der unbestimmte Artikel (неопределённый артикль ein) склоняется так: см. таблицу. В разговорной речи Genitiv часто заменяют на von + Dativ: der Pilot von einem Passagierflugzeug, das Auto von meinem Vater. Это понятно, но в письме лучше Genitiv.",
        "ЧАСТЬ РЕЧИ ≠ ЧЛЕН ПРЕДЛОЖЕНИЯ. Pilot по части речи – das Nomen (das Substantiv), а по роли в предложении – das Prädikativ: отвечает на вопрос «кем он был?» (Was war er?). Passagierflugzeugs – тоже das Nomen, но по роли это das Genitivattribut (Wessen Pilot? – пилот чего?). Это НЕ das Objekt (дополнение): дополнение зависит от глагола (Ich sehe den Piloten – Wen sehe ich?), а глагол sein дополнения не имеет. Атрибут зависит не от глагола, а от существительного перед ним. См. также правило «die Wortart und das Satzglied».",
        "eines – ЭТО НЕ DATIV. Dativ от ein: einem (m/n), einer (f). eines – это Genitiv (m/n). Проверка вопросом: Wem? (кому?) → Dativ; Wessen? (чей? чего?) → Genitiv.",
        "7) СЛОЖНОЕ СЛОВО (das Kompositum). der Passagier + das Flugzeug = das Passagierflugzeug. Род определяет ПОСЛЕДНЕЕ слово (das Grundwort): das Flugzeug → das Passagierflugzeug, поэтому в Genitiv: eines Passagierflugzeugs."
      ],
      tabellen: [
        {
          titel: "1 · Wort für Wort: die Wortart und das Satzglied (Er war Pilot eines Passagierflugzeugs.)",
          kopf: ["das Wort", "die Wortart · часть речи", "die Form · форма", "die Frage", "das Satzglied · член предложения"],
          sprechen: 0,
          sprache: "de",
          zeilen: [
            ["er", "das Personalpronomen · личное местоимение", "3. Person Singular, Nominativ", "Wer?", "das Subjekt · подлежащее"],
            ["war", "das Verb „sein“ (das Kopulaverb · глагол-связка)", "finit: 3. Person Singular, Präteritum", "Was tut er?", "das Prädikat · сказуемое"],
            ["Pilot", "das Nomen (das Substantiv) · существительное", "Nominativ Singular, ohne Artikel (der Beruf)", "Was war er? (кем был?)", "das Prädikativ (das Prädikatsnomen) · именная часть сказуемого"],
            ["eines", "der unbestimmte Artikel · неопределённый артикль", "Genitiv Singular, Neutrum (NICHT Dativ – Dativ wäre „einem“)", "—", "gehört zum Attribut"],
            ["Passagierflugzeugs", "das Nomen (das Kompositum) · сложное существительное", "Genitiv Singular, Neutrum: Endung -s", "Wessen Pilot? (пилот чего?)", "das Genitivattribut · определение (KEIN Objekt, kein eigenes Satzglied)"]
          ]
        },
        {
          titel: "2 · der unbestimmte Artikel (ein) und der bestimmte Artikel – alle vier Fälle",
          kopf: ["der Kasus", "Maskulinum (der Pilot)", "Neutrum (das Flugzeug)", "Femininum (die Frau)", "Русский"],
        zeilen: [
          ["der Nominativ (Wer? Was?)",  "ein Pilot · der Pilot",          "ein Flugzeug · das Flugzeug",          "eine Frau · die Frau",   "кто? что?"],
          ["der Akkusativ (Wen? Was?)",  "einen Piloten · den Piloten",    "ein Flugzeug · das Flugzeug",          "eine Frau · die Frau",   "кого? что?"],
          ["der Dativ (Wem?)",           "einem Piloten · dem Piloten",    "einem Flugzeug · dem Flugzeug",        "einer Frau · der Frau",  "кому? чему?"],
          ["der Genitiv (Wessen?)",      "eines Piloten · des Piloten",    "eines Flugzeugs · des Flugzeugs",      "einer Frau · der Frau",  "чей? чего?"]
          ]
        }
      ],
      beispiele: [
        { de: "Er war Pilot eines Passagierflugzeugs.", en: "He was the pilot of a passenger plane.", ru: "Он был пилотом пассажирского самолёта.", hinweis: "Pilot – Beruf ohne Artikel · eines …flugzeugs – Genitiv (n): eines + -s" },
        { de: "Er war Pilot bei einer Fluggesellschaft.", en: "He was a pilot with an airline.", ru: "Он был пилотом в авиакомпании.", hinweis: "bei + Dativ: die → einer" },
        { de: "Das Auto meines Vaters ist alt.", en: "My father's car is old.", ru: "Машина моего отца старая.", hinweis: "meines Vaters – Genitiv (m): -s" },
        { de: "Die Tür der Küche ist offen.", en: "The kitchen door is open.", ru: "Дверь кухни открыта.", hinweis: "der Küche – Genitiv (f): ohne Endung" },
        { de: "Er war ein guter Pilot.", en: "He was a good pilot.", ru: "Он был хорошим пилотом.", hinweis: "mit Adjektiv → mit Artikel, Nominativ (nicht „einen“)" }
      ],
      merke: "После sein – Nominativ, а не Akkusativ: Er war Pilot (профессия без артикля). Чей? чего? = Wessen? → der Genitiv: eines/des + Nomen-s (m/n), einer/der + Nomen (f/Pl)."
    },
    {
      // 2026-11-18: mit Claude – ist „sein“ ein Modalverb? Nein: Vollverb, Hilfsverb, Kopulaverb
      id: "de-sein-kopula",
      thema: "verb",
      sprache: "de",
      datum: "2026-11-18",
      titel: "das Verb „sein“: das Hilfsverb, das Kopulaverb – aber kein Modalverb",
      titel_ru: "глагол sein: вспомогательный глагол и глагол-связка – но не модальный",
      formel: "sein + Partizip II = das Hilfsverb (Er ist gegangen) · sein + Nomen/Adjektiv = das Kopulaverb (Er war Pilot. Er ist alt.)",
      definitionen: [
        { wort: "das Modalverb", de: "Ein Modalverb sagt, wie man zu einer Handlung steht (können, müssen, wollen, dürfen, sollen, mögen/möchten). Danach kommt ein Infinitiv: Ich will schlafen.", ru: "Модальный глагол выражает отношение к действию: мочь, должен, хотеть, сметь, следует, нравиться. После него – инфинитив: Ich will schlafen. sein сюда НЕ относится." },
        { wort: "das Hilfsverb", de: "Ein Hilfsverb hilft, eine Zeitform oder das Passiv zu bilden: haben, sein, werden. Ich bin nach Hause gegangen (das Perfekt).", ru: "Вспомогательный глагол помогает построить время или пассив: haben, sein, werden. Сам по себе смысла не несёт." },
        { wort: "das Kopulaverb", de: "Ein Kopulaverb verbindet das Subjekt mit einem Nomen oder Adjektiv (dem Prädikativ): sein, werden, bleiben. Er war Pilot. Sie wird Lehrerin. Es bleibt kalt.", ru: "Глагол-связка соединяет подлежащее с существительным или прилагательным (das Prädikativ): быть, становиться, оставаться. Он был пилотом. Она станет учительницей." }
      ],
      erklaerung: [
        "sein – НЕ МОДАЛЬНЫЙ ГЛАГОЛ. Модальных глаголов шесть: können, müssen, wollen, dürfen, sollen, mögen (möchten). После них стоит инфинитив: Ich kann schwimmen.",
        "У sein ТРИ РОЛИ. 1) das Hilfsverb (вспомогательный): Er ist nach Hause gegangen – sein строит das Perfekt. 2) das Kopulaverb (глагол-связка): Er war Pilot. Er ist alt. – sein связывает подлежащее с das Prädikativ. 3) das Vollverb (полнозначный, «существовать», редко): Ich denke, also bin ich. – Я мыслю, следовательно, существую.",
        "ОТКУДА СЛОВО (die Etymologie). die Kopula ← лат. copula – «связка, узы, верёвка» (отсюда же das Kopulieren, англ. couple – пара). Глагол-связка ничего не делает сам – он только «связывает» er и Pilot.",
        "В РУССКОМ ТО ЖЕ САМОЕ. «Он был пилотом» – «был» тоже связка. В настоящем времени русский связку опускает («Он – пилот»), а немецкий и английский – никогда: Er ist Pilot. He is a pilot.",
        "das Prädikat И das Prädikativ – РАЗНЫЕ ВЕЩИ. das Prädikat (сказуемое) = спрягаемый глагол: war. das Prädikativ (именная часть сказуемого) = то, что стоит после связки: Pilot, alt.",
        "НЕ ПУТАТЬ: das Genus (род: Maskulinum, Femininum, Neutrum) и der Genitiv (родительный падеж). Оба от лат. genus – «род, происхождение»."
      ],
      tabelle: {
        kopf: ["die Rolle von „sein“", "das Beispiel", "Русский"],
        sprechen: 1,
        sprache: "de",
        zeilen: [
          ["das Hilfsverb (+ Partizip II)", "Er ist nach Hause gegangen.", "Он пошёл домой."],
          ["das Kopulaverb (+ Nomen)", "Er war Pilot.", "Он был пилотом."],
          ["das Kopulaverb (+ Adjektiv)", "Das Auto ist alt.", "Машина старая."],
          ["das Vollverb (existieren)", "Ich denke, also bin ich.", "Я мыслю, следовательно, существую."],
          ["zum Vergleich: das Modalverb", "Ich kann schwimmen.", "Я умею плавать."]
        ]
      },
      beispiele: [
        { de: "Er war Pilot eines Passagierflugzeugs.", en: "He was the pilot of a passenger plane.", ru: "Он был пилотом пассажирского самолёта.", hinweis: "war – das Kopulaverb (Präteritum von sein)" },
        { de: "Er ist Pilot geworden.", en: "He has become a pilot.", ru: "Он стал пилотом.", hinweis: "ist – das Hilfsverb (Perfekt) · geworden – Partizip II von werden (Kopulaverb)" }
      ],
      merke: "sein ≠ Modalverb. sein + gegangen = das Hilfsverb; sein + Pilot / alt = das Kopulaverb (связка, лат. copula)."
    },
    {
      // 2026-11-18: mit Claude – die Bausteine des Satzes (DE · EN), „Ich schaue aus dem Fenster“
      id: "satzglieder-bausteine",
      thema: "satz",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Satzglieder – die Bausteine des Satzes (Deutsch · English)",
      titel_ru: "блоки предложения: Subjekt – Prädikat – Objekt – Orts- und Zeitangabe",
      formel: "DE: das Prädikat (finit) immer an 2. Stelle · die Zeit vor dem Ort (Ich schaue heute aus dem Fenster.) · EN: Subject – Verb – Object – Place – Time (I met him at the station yesterday.)",
      definitionen: [
        { wort: "die Ortsangabe", de: "Die Ortsangabe sagt, wo, wohin oder woher etwas passiert. Frage: Wo? Wohin? Woher? Beispiel: aus dem Fenster, im Garten, hier. Langer Fachbegriff: die Adverbialbestimmung des Ortes.", ru: "Обстоятельство места: где? куда? откуда? Например: aus dem Fenster (из окна), im Garten (в саду), hier (здесь). Длинное научное название – die Adverbialbestimmung des Ortes, в учебниках короче: die Ortsangabe (die Angabe – указание; не «Eingabe» – это «ввод»)." },
        { wort: "die Zeitangabe", de: "Die Zeitangabe sagt, wann oder wie oft etwas passiert. Frage: Wann? Wie oft? Beispiel: heute, morgens, am Montag.", ru: "Обстоятельство времени: когда? как часто? Например: heute (сегодня), morgens (по утрам), am Montag (в понедельник)." }
      ],
      erklaerung: [
        "ПЯТЬ БЛОКОВ (die Satzglieder). Для начала хватает пяти: das Subjekt (подлежащее: Wer? Was?), das Prädikat (сказуемое: Was tut …?), das Objekt (дополнение: Wen? Was? Wem?), die Ortsangabe (Wo? Wohin? Woher?) и die Zeitangabe (Wann?). Самые главные – три: Subjekt – Prädikat – Objekt.",
        "der Artikel – НЕ БЛОК. der Artikel – это часть речи (die Wortart), а не член предложения (das Satzglied). Он входит в блок вместе с существительным: den Garten = der Artikel + das Nomen = один блок (das Objekt). aus dem Fenster = die Präposition + der Artikel + das Nomen = один блок (die Ortsangabe). Поэтому каждое существительное учим сразу с артиклем – иначе нельзя его просклонять.",
        "НЕМЕЦКИЙ: ГЛАГОЛ НА 2-м МЕСТЕ (die Verbzweitstellung). В повествовательном предложении das Prädikat (спрягаемый глагол) всегда стоит вторым блоком. Остальные блоки можно переставлять: Ich schaue heute aus dem Fenster. → Heute schaue ich aus dem Fenster. → Aus dem Fenster schaue ich heute. Глагол остаётся вторым.",
        "НЕМЕЦКИЙ: ВРЕМЯ ПЕРЕД МЕСТОМ. Если в предложении есть и Zeitangabe, и Ortsangabe, то обычно сначала время, потом место: Ich habe ihn gestern am Bahnhof getroffen. Правило-подсказка: TeKaMoLo – temporal (когда?) – kausal (почему?) – modal (как?) – lokal (где?).",
        "АНГЛИЙСКИЙ: ПОРЯДОК ЖЁСТКИЙ (S – V – O). Subject – Verb – Object стоят всегда в этом порядке, подлежащее всегда перед глаголом (кроме вопросов). Глагол не «прыгает» на второе место: Today I look out of the window (а не «Today look I»). Обстоятельства – наоборот, чем в немецком: сначала место, потом время (Place – Time): I met him at the station yesterday.",
        "РУССКИЙ: порядок слов свободный, нейтральный вариант: подлежащее → сказуемое → остальное (Я смотрю из окна). Английский в этом очень похож на русский, немецкий – из-за глагола на 2-м месте – нет.",
        "ДВА ПРОСТЫХ СЛУЧАЯ ДЛЯ ПАДЕЖА. Нет предлога → падеж по роли блока: das Subjekt = der Nominativ, das Objekt = обычно der Akkusativ (den Garten). Есть предлог → падеж определяет сам предлог: aus → der Dativ (aus dem Fenster). См. правило «die Präposition bestimmt den Kasus»."
      ],
      tabelle: {
        kopf: ["der Baustein · блок", "die Frage", "Deutsch", "English", "Русский"],
        sprechen: 2,
        sprache: "de",
        zeilen: [
          ["das Subjekt · подлежащее", "Wer? Was?", "Ich", "I", "я"],
          ["das Prädikat · сказуемое", "Was tut …?", "schaue", "look", "смотрю"],
          ["die Zeitangabe · обст. времени", "Wann?", "heute", "today", "сегодня"],
          ["die Ortsangabe · обст. места", "Wo? Woher?", "aus dem Fenster", "out of the window", "из окна"],
          ["das Objekt · дополнение", "Wen? Was?", "den Garten", "the garden", "сад"],
          ["der ganze Satz · DE: Zeit vor Ort · EN: Place before Time", "—", "Ich schaue heute aus dem Fenster.", "I look out of the window today.", "Я сегодня смотрю из окна."]
        ]
      },
      beispiele: [
        { de: "Ich schaue aus dem Fenster.", en: "I look out of the window.", ru: "Я смотрю из окна.", hinweis: "Subjekt – Prädikat – Ortsangabe" },
        { de: "Heute schaue ich aus dem Fenster.", en: "Today I look out of the window.", ru: "Сегодня я смотрю из окна.", hinweis: "DE: глагол остаётся на 2-м месте · EN: I всегда перед look" },
        { de: "Ich sehe den Garten.", en: "I see the garden.", ru: "Я вижу сад.", hinweis: "den Garten – das Objekt (Wen? Was?) → Akkusativ: der → den" },
        { de: "Ich habe ihn gestern am Bahnhof getroffen.", en: "I met him at the station yesterday.", ru: "Я встретил его вчера на вокзале.", hinweis: "DE: Zeit → Ort · EN: Place → Time" }
      ],
      merke: "Drei Hauptblöcke: Subjekt – Prädikat – Objekt. DE: das Prädikat immer an 2. Stelle, Zeit vor Ort. EN: S – V – O fest, Place vor Time. Der Artikel ist kein Block – er gehört zum Nomen."
    },
    {
      // 2026-11-18: mit Claude – aus/von, nach Hause/zu Hause, auf die Toilette
      id: "praeposition-als-block",
      thema: "praeposition",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Präposition lernt man im Block (nach Hause, zu Hause, auf die Toilette)",
      titel_ru: "предлог не выводится логикой – учим готовыми блоками (DE · EN)",
      formel: "die Präposition + der Artikel + das Nomen = EIN Block zum Auswendiglernen: nach Hause gehen · zu Hause sein · auf die Toilette gehen · aus dem Fenster schauen",
      definitionen: [
        { wort: "die feste Verbindung", de: "Eine feste Verbindung (auch: die Wendung, der Chunk) ist eine Wortgruppe, die man immer genau so sagt. Man lernt sie als Ganzes, nicht Wort für Wort.", ru: "Устойчивое сочетание – группа слов, которую всегда говорят именно так. Её учат целиком, как одно слово, а не по отдельности." }
      ],
      erklaerung: [
        "ПОЧЕМУ НЕЛЬЗЯ ВЫВЕСТИ ЛОГИКОЙ. Какой предлог стоит – часто дело привычки языка (die Idiomatik), а не логики. Если предлог известен, дальше всё просто: предлог → падеж → артикль (aus → Dativ → dem). Трудность в том, чтобы выбрать сам предлог. Поэтому его учат вместе с выражением – так же, как существительное учат с артиклем.",
        "В РУССКОМ ТОЧНО ТАК ЖЕ – мы просто не замечаем: «НА почту», но «В банк»; «НА работу», но «В школу». Иностранец тоже спросил бы: почему?",
        "aus ИЛИ von? aus = изнутри наружу: Ich schaue aus dem Fenster (смотрю наружу). von = от / с какого-то места: Ich gehe vom Fenster weg (отхожу от окна); Vom Fenster aus sehe ich den Garten (от окна, с этого места я вижу сад). Оба требуют Dativ, но смысл разный. vom = von + dem.",
        "nach Hause ИЛИ zu Hause? nach Hause = домой (Wohin? куда?): Ich gehe nach Hause. zu Hause = дома (Wo? где?): Ich bin zu Hause. «Ich gehe zu Hause» – неправильно. «К дому» в смысле здания: Ich gehe zum Haus (zum = zu + dem).",
        "auf die Toilette ИЛИ in die Toilette? Правильно: Ich gehe auf die Toilette (так же: auf die Bank, auf die Post, aufs Amt). «Ich gehe in die Toilette» буквально значит «лезу в унитаз» – поэтому дети смеются.",
        "die Wechselpräposition (in, an, auf, über, unter, vor, hinter, neben, zwischen): Wo? → Dativ (Ich bin auf der Toilette), Wohin? → Akkusativ (Ich gehe auf die Toilette). Как в русском: «в доме» (где?) – «в дом» (куда?).",
        "АНГЛИЙСКИЙ – ТО ЖЕ САМОЕ, НО ПРОЩЕ. Предлоги тоже учат блоками: at home (дома), go home (домой – БЕЗ предлога!), on the bus (в автобусе), in the car (в машине), go to the toilet. Но в английском нет падежей и артикль the никогда не меняется – учить нужно только предлог, склонять ничего не надо."
      ],
      tabellen: [
        {
          titel: "1 · Deutsch – feste Blöcke (aufs Wort tippen – vorlesen)",
          kopf: ["der Block", "Русский", "💡"],
          sprechen: 0,
          sprache: "de",
          zeilen: [
            ["nach Hause gehen", "идти домой (куда?)", "nicht: zu Hause gehen"],
            ["zu Hause sein", "быть дома (где?)", "Wo? → zu Hause"],
            ["zum Haus gehen", "идти к дому (к зданию)", "zum = zu + dem"],
            ["aus dem Fenster schauen", "смотреть в окно / из окна (наружу)", "aus = изнутри наружу"],
            ["vom Fenster weggehen", "отойти от окна", "vom = von + dem"],
            ["auf die Toilette gehen", "пойти в туалет", "nicht: in die Toilette (= в унитаз)"],
            ["auf die Bank gehen", "пойти в банк", "auch: zur Bank gehen"],
            ["mit dem Auto fahren", "ехать на машине", "mit + Dativ"]
          ]
        },
        {
          titel: "2 · English – feste Blöcke (ohne Kasus)",
          kopf: ["the chunk", "Deutsch", "Русский"],
          sprechen: 0,
          sprache: "en",
          zeilen: [
            ["go home", "nach Hause gehen", "идти домой (без предлога!)"],
            ["at home", "zu Hause", "дома"],
            ["look out of the window", "aus dem Fenster schauen", "смотреть в окно"],
            ["on the bus", "im Bus", "в автобусе"],
            ["in the car", "im Auto", "в машине"],
            ["go to the toilet", "auf die Toilette gehen", "пойти в туалет"],
            ["by car", "mit dem Auto", "на машине"]
          ]
        }
      ],
      beispiele: [
        { de: "Ich gehe nach Hause.", en: "I am going home.", ru: "Я иду домой.", hinweis: "Wohin? → nach Hause · EN: go home без предлога" },
        { de: "Ich bin zu Hause.", en: "I am at home.", ru: "Я дома.", hinweis: "Wo? → zu Hause" },
        { de: "Ich gehe auf die Toilette.", en: "I am going to the toilet.", ru: "Я иду в туалет.", hinweis: "auf + Akkusativ (Wohin?)" },
        { de: "Vom Fenster aus sehe ich den Garten.", en: "From the window I can see the garden.", ru: "От окна я вижу сад.", hinweis: "von = от; aus = изнутри наружу" }
      ],
      merke: "Präpositionen nicht ausrechnen, sondern als Block lernen: nach Hause gehen · zu Hause sein · auf die Toilette gehen. EN genauso (go home, at home), aber ohne Kasus."
    },
    {
      // 2026-11-18: mit Claude – „он является кем?“ → Nominativ; 6 russische, 4 deutsche Fälle
      id: "kasus-vergleich-gleichsetzung",
      thema: "grundbegriffe",
      sprache: "de",
      datum: "2026-11-18",
      titel: "die Fälle im Vergleich (RU 6 · DE 4 · EN 0) und der Gleichsetzungsnominativ",
      titel_ru: "падежи: русский творительный «кем?» → в немецком Nominativ",
      formel: "sein · werden · bleiben · heißen + der Nominativ (Er ist Pilot. = Er = Pilot) · творительный «чем? с кем?» → mit + Dativ (mit dem Stift)",
      definitionen: [
        { wort: "der Kasus (der Fall)", de: "Der Kasus zeigt die Rolle eines Nomens im Satz. Das Deutsche hat vier Fälle: der Nominativ, der Genitiv, der Dativ, der Akkusativ.", ru: "Падеж показывает роль существительного в предложении. В немецком четыре падежа, в русском – шесть, в английском у существительных падежей нет." },
        { wort: "der Gleichsetzungsnominativ", de: "Nach sein, werden, bleiben und heißen steht ein zweiter Nominativ. Er ist mit dem Subjekt gleich: Er ist Pilot. (er = Pilot)", ru: "«Именительный приравнивания»: после sein, werden, bleiben, heißen второе слово тоже в Nominativ, потому что оно равно подлежащему: он = пилот. Глагол работает как знак «=»." }
      ],
      erklaerung: [
        "ШЕСТЬ РУССКИХ ПАДЕЖЕЙ: именительный (кто? что?), родительный (кого? чего?), дательный (кому? чему?), винительный (кого? что?), творительный (кем? чем?), предложный (о ком? о чём?).",
        "ЧЕТЫРЕ НЕМЕЦКИХ: der Nominativ, der Genitiv, der Dativ, der Akkusativ. Творительного (der Instrumental) и предложного (der Präpositiv) падежа в немецком НЕТ. Поэтому русский вопрос «кем? чем?» нельзя переносить в немецкий – нужно смотреть по смыслу.",
        "СЛУЧАЙ 1: «является кем?» → der Nominativ. По-русски: он является пилотОМ, он стал пилотОМ (творительный). По-немецки после sein, werden, bleiben, heißen – всегда Nominativ: Er ist Pilot. Er wurde Pilot. Er bleibt Pilot. Er heißt Jewgeni. Это der Gleichsetzungsnominativ, а слово после глагола – das Prädikativ (именная часть сказуемого).",
        "КАК ЗАПОМНИТЬ – ТРИ СПОСОБА. 1) Глаголы-«знаки равенства»: sein, werden, bleiben, heißen → сразу Nominativ, думать не нужно. 2) Замените «является» на старое «есть»: он есть КТО? – пилот → кто? = именительный = Nominativ. Немецкий «думает» именно так: Er ist wer? – Pilot. 3) Если между подлежащим и словом можно поставить «=» (он = пилот), это Nominativ.",
        "СРАВНИТЕ С ДОПОЛНЕНИЕМ. Er ist Pilot: er = Pilot (один человек) → das Prädikativ, Nominativ. Er fliegt ein Flugzeug: er ≠ Flugzeug (два разных предмета) → das Objekt, Akkusativ.",
        "СЛУЧАЙ 2: творительный «чем? с кем?» (орудие, вместе с) → mit + der Dativ: пишу ручкой → Ich schreibe mit dem Stift; еду с сыном → Ich fahre mit dem Sohn.",
        "ПРЕДЛОЖНЫЙ ПАДЕЖ в русском всегда с предлогом – в немецком падеж задаёт немецкий предлог: в доме → im Haus (Dativ), о сыне → über den Sohn (Akkusativ) или von dem Sohn (Dativ).",
        "АНГЛИЙСКИЙ: у существительных падежей нет (the pilot всегда одинаково). Падежи остались только у местоимений: I – me, he – him, she – her, we – us, they – them. После be тоже «знак равно», но артикль нужен обязательно: He is a pilot (а по-немецки профессия без артикля: Er ist Pilot)."
      ],
      tabelle: {
        kopf: ["русский падеж", "вопрос", "Beispiel RU", "auf Deutsch", "Beispiel DE"],
        sprechen: 4,
        sprache: "de",
        zeilen: [
          ["именительный", "кто? что?", "пилот", "der Nominativ", "der Pilot"],
          ["родительный", "кого? чего?", "пилота", "der Genitiv", "des Piloten"],
          ["дательный", "кому? чему?", "пилоту", "der Dativ", "dem Piloten"],
          ["винительный", "кого? что?", "пилота", "der Akkusativ", "den Piloten"],
          ["творительный", "кем? чем?", "(является) пилотом · пишу ручкой", "nach sein: der Nominativ · sonst: mit + Dativ", "Er ist Pilot. · Ich schreibe mit dem Stift."],
          ["предложный", "о ком? о чём? где?", "о пилоте · в доме", "die Präposition entscheidet", "im Haus · über den Piloten"]
        ]
      },
      beispiele: [
        { de: "Er ist Pilot.", en: "He is a pilot.", ru: "Он является пилотом.", hinweis: "является кем? → Nominativ · EN: обязательно a" },
        { de: "Er wurde Pilot.", en: "He became a pilot.", ru: "Он стал пилотом.", hinweis: "werden + Nominativ" },
        { de: "Er heißt Jewgeni.", en: "His name is Jewgeni.", ru: "Его зовут Евгений.", hinweis: "heißen + Nominativ" },
        { de: "Ich schreibe mit dem Stift.", en: "I write with a pen.", ru: "Я пишу ручкой.", hinweis: "творительный «чем?» → mit + Dativ" },
        { de: "Ich fahre mit dem Sohn.", en: "I am going with my son.", ru: "Я еду с сыном.", hinweis: "«с кем?» → mit + Dativ" }
      ],
      merke: "sein, werden, bleiben, heißen = знак «=» → immer der Nominativ (Er ist Pilot). Русский творительный «кем?» после «быть/являться» = Nominativ; «чем? с кем?» = mit + Dativ."
    },
    {
      // 2026-11-19: mit Claude – this oder that? (I don't like that / this)
      id: "en-this-that",
      thema: "pronomen",
      sprache: "en",
      datum: "2026-11-19",
      titel: "die Demonstrativpronomen this / that – these / those",
      titel_ru: "указательные местоимения: this или that?",
      formel: "this / these = nah (hier, jetzt) · that / those = fern (dort, vorhin, das Gesagte)",
      erklaerung: [
        "this и that – das Demonstrativpronomen (указательное местоимение). Они «показывают пальцем». Разница – в РАССТОЯНИИ: this – близко ко мне (вот это, здесь, сейчас), that – дальше от меня (вон то, там, тогда).",
        "Расстояние бывает не только в пространстве, но и во времени и в разговоре. this – то, что происходит сейчас, вокруг меня, или то, о чём я сейчас скажу. that – то, что уже было, уже сказано (особенно другим человеком) или находится «там».",
        "ПОЭТОМУ: I don't like that. – реакция на то, что только что сказал или сделал другой («Мне это (то, что ты сказал) не нравится» – Das gefällt mir nicht). I don't like this. – о том, что происходит со мной прямо сейчас («Мне это (вот это, здесь) не нравится» – Das hier gefällt mir nicht). Обе фразы правильные, но смысл разный.",
        "Типичные ответы на слова собеседника – всегда that: That's right. (Stimmt.) · That's good. · That's a good idea. · Thank you, that's very kind.",
        "КАК РЕШИТЬ ЗА СЕКУНДУ (2026-11-19). Задайте себе вопрос: «Я ОТВЕЧАЮ на то, что уже прозвучало или произошло – или я сам сейчас ПОКАЗЫВАЮ / ПРОБУЮ / ПЕРЕЖИВАЮ это?» Ответ на чужие слова, новость, предложение → that (это уже «там», оно сказано, закончено). Я сам держу в руках, ем, смотрю, сейчас нахожусь внутри → this. Русская проверка: можно сказать «то, что ты сказал» → that; можно сказать «вот это (у меня сейчас)» → this. В сомнении в ответе – that: так говорят примерно в 9 случаях из 10.",
        "ПРИМЕР С ЕДОЙ: я ем суп и он вкусный → This is very good! (суп у меня во рту, сейчас). Жена говорит: «Я сварила суп» → That's very good! (это её новость – ответ на сказанное). Друг: «Я починю твою машину» → That's very good! / That's great!",
        "ГРАММАТИКА: «this very good» – так нельзя, в предложении нет сказуемого (das Prädikat). Нужен глагол be: This IS very good. · That IS very good → сокращённо That's very good. (That's = That is.) У this сокращения нет: всегда this is (подробно: правило «I'm · I'll · I'd – die Kurzformen», раздел 's).",
        "Почему путаемся: в русском разговорном «это» стоит и вместо «это», и вместо «то»; в немецком разговорном «das» тоже говорят и про близкое, и про далёкое (das hier – das da). В английском выбирать между this и that нужно ВСЕГДА.",
        "Две роли: 1) der Begleiter (перед существительным): this car – dieses Auto, that house – das Haus dort. 2) der Stellvertreter (вместо существительного, одно): I like this. – Das gefällt mir.",
        "Множественное число: this → these, that → those. Произношение: this [ðɪs] (короткое и), these [ðiːz] (долгое и, звонкое z), that [ðæt] (широкое а/э), those [ðəʊz] («зоуз»). Звук th [ð] – кончик языка между зубами, звонко."
      ],
      tabelle: {
        kopf: ["", "Einzahl · ед. число", "Mehrzahl · мн. число", "Deutsch", "Русский"],
        sprechen: true,
        zeilen: [
          ["nah · близко", "this", "these", "dieser / diese / dieses · das hier", "этот, это · эти"],
          ["fern · далеко", "that", "those", "der / die / das dort · jener", "тот, то · те"]
        ]
      },
      beispiele: [
        { en: "I don't like that.", de: "Das gefällt mir nicht.", ru: "Мне это (то, что ты сказал/сделал) не нравится.", hinweis: "реакция на чужие слова → that" },
        { en: "I don't like this.", de: "Das hier gefällt mir nicht.", ru: "Мне это (вот это, сейчас) не нравится.", hinweis: "то, что передо мной → this" },
        { en: "That's right.", de: "Das stimmt.", ru: "Верно.", hinweis: "ответ на слова собеседника → that" },
        { en: "This is my wife, Lidia.", de: "Das ist meine Frau Lidia.", ru: "Это моя жена Лидия.", hinweis: "знакомлю – человек рядом → this" },
        { en: "Look at that castle!", de: "Schau dir das Schloss dort an!", ru: "Посмотри на тот замок!", hinweis: "далеко → that" },
        { en: "These apples are good.", de: "Diese Äpfel sind gut.", ru: "Эти яблоки хорошие.", hinweis: "мн. число, рядом → these" },
        { en: "Who are those people?", de: "Wer sind die Leute dort?", ru: "Кто те люди?", hinweis: "мн. число, далеко → those" },
        { en: "This soup is very good!", de: "Diese Suppe ist sehr gut!", ru: "Этот суп очень вкусный!", hinweis: "ем сейчас сам → this" },
        { en: "I'll repair your car. – That's very good!", de: "Ich repariere dein Auto. – Das ist sehr gut!", ru: "Я починю твою машину. – Вот это хорошо!", hinweis: "ответ на чужие слова → that" },
        { en: "this week · that day", de: "diese Woche · an jenem Tag", ru: "на этой неделе · в тот день", hinweis: "сейчас → this, тогда → that" }
      ],
      merke: "this / these – hier und jetzt (вот это). that / those – dort, damals, das Gesagte (то). На чужие слова отвечаем that: That's right. I don't like that."
    }
  ]
};
