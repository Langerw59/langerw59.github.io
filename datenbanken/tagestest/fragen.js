// ============================================================
// der Grammatik-Tagestest / ежедневный тест по грамматике (15 Min.)
// 2026-11-23 · geschrieben mit Claude
// DE: Jeden Tag eine Lektion (10 Fragen) + Wiederholung der Fehler.
//     Reihenfolge: zuerst die Grundlagen, dann die Themen aus den Chats.
// RU: Каждый день – один урок (10 вопросов) + повтор ошибок.
//
// Aufbau einer Lektion:
//   id, titel (DE), ru, regel (id auf der Seite „die Grammatik“) oder lese (id einer Leseregel)
//   fragen: [{ f: Frage, a: [RICHTIG, falsch, falsch, …], e: Erklärung (RU), l: "en"/"de" (🔊, optional) }]
//   Die ERSTE Antwort in a ist immer die richtige – die Seite mischt sie.
// Neue Lektionen einfach unten anhängen.
// ============================================================
window.TAGESTEST = [

// ---------------- 1. Grundlagen ----------------
{ id: "personal", titel: "die Personalpronomen", ru: "личные местоимения", regel: "en-pronomen",
  fragen: [
  { f: "wir = ?", a: ["we", "us", "our", "you"], e: "wir = we («уи»). us = нас/нам, our = наш." , l: "en" },
  { f: "sie (Mehrzahl, они) = ?", a: ["they", "she", "their", "them"], e: "sie (они) = they. she = sie (она).", l: "en" },
  { f: "ihr (вы, многим) = ?", a: ["you", "your", "her", "they"], e: "ihr = you. В английском и «ты», и «вы» – одно слово you.", l: "en" },
  { f: "es = ?", a: ["it", "is", "its", "he"], e: "es = it. is – это «ist» (глагол), its – «его» (у предмета)." },
  { f: "she = ?", a: ["sie (Einzahl, она)", "sie (Mehrzahl, они)", "Sie (höflich)", "er"], e: "she – она, одна женщина." },
  { f: "I ___ from Willich.", a: ["am", "is", "are", "be"], e: "I am – всегда am только с I.", l: "en" },
  { f: "Мы дома. = ___ are at home.", a: ["We", "Our", "Us", "They"], e: "Подлежащее «мы» = we.", l: "en" },
  { f: "he = ?", a: ["er", "es", "sie", "ihr"], e: "he = er (он)." },
  { f: "Вежливое «Sie» по-английски = ?", a: ["you", "they", "she", "your"], e: "Sie (höflich) = you. Вежливой формы в английском нет." },
  { f: "Где ошибка? «Me am tired.»", a: ["me → I", "am → is", "tired → tire", "ошибки нет"], e: "Подлежащее – I: I am tired. me – это «мне / меня»." }
]},

{ id: "possessiv", titel: "die Possessivpronomen", ru: "притяжательные: I → my, we → our", regel: "en-pronomen",
  fragen: [
  { f: "we → ?", a: ["our", "us", "your", "their"], e: "we (мы) → our (наш). Главная путаница: our ≠ are ≠ hour.", l: "en" },
  { f: "they → ?", a: ["their", "there", "they're", "them"], e: "their = их. there = там, they're = they are. Звучат одинаково!", l: "en" },
  { f: "I → ?", a: ["my", "me", "mine", "I'm"], e: "I → my (мой).", l: "en" },
  { f: "she → ?", a: ["her", "his", "hers", "she's"], e: "she → her (её).", l: "en" },
  { f: "he → ?", a: ["his", "her", "him", "he's"], e: "he → his (его).", l: "en" },
  { f: "it → ?", a: ["its", "it's", "his", "it"], e: "its без апострофа = «его» (у предмета). it's = it is.", l: "en" },
  { f: "Das ist unser Haus. = This is ___ house.", a: ["our", "we", "us", "are"], e: "unser = our.", l: "en" },
  { f: "Где их машина? = Where is ___ car?", a: ["their", "there", "they", "they're"], e: "чья машина? их → their.", l: "en" },
  { f: "mein Sohn, meine Frau – в английском?", a: ["my son, my wife", "my son, mine wife", "mein son, my wife", "my son, myes wife"], e: "В английском my не меняется: всегда my." },
  { f: "Wie heißt du? = What is ___ name?", a: ["your", "you", "you're", "yours"], e: "твоё имя → your name.", l: "en" }
]},

{ id: "tobe", titel: "das Verb to be: am / is / are – was / were", ru: "глагол быть", regel: "en-be",
  fragen: [
  { f: "She ___ my daughter.", a: ["is", "am", "are", "be"], e: "he / she / it → is.", l: "en" },
  { f: "We ___ in Hannover last week.", a: ["were", "was", "are", "been"], e: "Прошлое: I/he/she/it → was, we/you/they → were.", l: "en" },
  { f: "I ___ tired yesterday.", a: ["was", "were", "am", "is"], e: "I → was (прошлое).", l: "en" },
  { f: "They ___ my sons.", a: ["are", "is", "am", "be"], e: "they → are.", l: "en" },
  { f: "Вопрос: ___ you at home?", a: ["Are", "Is", "Do", "Am"], e: "С be вопрос без do: Are you …?", l: "en" },
  { f: "Отрицание: It ___ cold.", a: ["isn't", "doesn't", "don't", "aren't"], e: "С be отрицание через not: is not = isn't.", l: "en" },
  { f: "Ich bin 67 Jahre alt. = I ___ 67 years old.", a: ["am", "have", "is", "be"], e: "Возраст – через be: I am 67. Не «I have 67».", l: "en" },
  { f: "The weather ___ good.", a: ["is", "are", "am", "be"], e: "the weather = it → is.", l: "en" },
  { f: "Где ошибка? «I am agree.»", a: ["лишнее am: I agree", "am → is", "agree → agreed", "ошибки нет"], e: "agree – это глагол: I agree. С be нельзя." },
  { f: "Немецкий: sein – war – gewesen. Английский: be – ? – been", a: ["was / were", "is / are", "been", "did"], e: "be – was/were – been." }
]},

// ---------------- 2. die Wortarten ----------------
{ id: "wortarten", titel: "die Wortarten", ru: "части речи (и их старые названия)", regel: "de-wortarten",
  fragen: [
  { f: "«schnell» в «Er fährt schnell» – это …", a: ["das Adverb (Umstandswort)", "das Adjektiv", "das Verb", "das Substantiv"], e: "Как едет? – schnell описывает глагол → das Adverb." },
  { f: "«schnell» в «das schnelle Auto» – это …", a: ["das Adjektiv (Eigenschaftswort)", "das Adverb", "das Verb", "die Präposition"], e: "Какая машина? – описывает существительное → das Adjektiv." },
  { f: "das Hauptwort = ?", a: ["das Substantiv (das Nomen)", "das Verb", "das Adjektiv", "das Pronomen"], e: "Hauptwort = Substantiv = Nomen = существительное." },
  { f: "das Zeitwort = ?", a: ["das Verb", "das Adverb", "der Artikel", "die Konjunktion"], e: "Zeitwort / Tätigkeitswort = das Verb." },
  { f: "das Fürwort = ?", a: ["das Pronomen", "die Präposition", "das Substantiv", "das Adverb"], e: "Fürwort – «вместо имени»: das Pronomen (ich, er, mein …)." },
  { f: "«mit», «aus», «für» – это …", a: ["die Präpositionen (Verhältniswörter)", "die Konjunktionen", "die Adverbien", "die Artikel"], e: "Предлоги = die Präpositionen." },
  { f: "«weil», «dass», «und» – это …", a: ["die Konjunktionen (Bindewörter)", "die Präpositionen", "die Pronomen", "die Verben"], e: "Союзы = die Konjunktionen." },
  { f: "I slept ___.", a: ["well", "good", "goodly", "better good"], e: "Как спал? – к глаголу нужно наречие: well.", l: "en" },
  { f: "This soup tastes ___.", a: ["good", "well", "goodly", "nicely"], e: "После taste, look, feel, be – прилагательное (описывает сам суп): good.", l: "en" },
  { f: "bad → наречие?", a: ["badly", "bad", "worse", "badness"], e: "Обычно наречие = прилагательное + -ly: badly. Исключение: good → well.", l: "en" }
]},

{ id: "artikel", titel: "der, die oder das?", ru: "род существительного по окончанию", regel: "de-artikel-finden",
  fragen: [
  { f: "___ Zeitung", a: ["die", "der", "das"], e: "-ung → всегда die.", l: "de" },
  { f: "___ Mädchen", a: ["das", "die", "der"], e: "-chen → всегда das (даже если это девочка).", l: "de" },
  { f: "___ Freiheit", a: ["die", "der", "das"], e: "-heit, -keit → die.", l: "de" },
  { f: "___ Lehrer", a: ["der", "die", "das"], e: "-er (человек, профессия) → обычно der.", l: "de" },
  { f: "___ Haustür (das Haus + die Tür)", a: ["die", "das", "der"], e: "Род берётся от ПОСЛЕДНЕГО слова (das Grundwort): die Tür → die Haustür.", l: "de" },
  { f: "___ Information", a: ["die", "der", "das"], e: "-tion → die.", l: "de" },
  { f: "___ Häuschen", a: ["das", "die", "der"], e: "-chen → das.", l: "de" },
  { f: "___ Wohnwagen (wohnen + der Wagen)", a: ["der", "das", "die"], e: "Последнее слово der Wagen → der Wohnwagen.", l: "de" },
  { f: "___ Freundschaft", a: ["die", "der", "das"], e: "-schaft → die.", l: "de" },
  { f: "___ Eigentum", a: ["das", "der", "die"], e: "-tum → обычно das (Ausnahme: der Reichtum, der Irrtum).", l: "de" }
]},

// ---------------- 3. Pronomen und Fragen ----------------
{ id: "thisthat", titel: "this / that – these / those", ru: "это рядом или там / сказанное", regel: "en-this-that",
  fragen: [
  { f: "Друг: «I'll repair your car.» – Вы: «___ is very good!»", a: ["That", "This", "These", "Those"], e: "Ответ на чужие слова → that: That's very good!", l: "en" },
  { f: "Вы едите суп: «___ soup is delicious!»", a: ["This", "That", "These", "Those"], e: "Суп у вас сейчас → this.", l: "en" },
  { f: "Мн. число от this = ?", a: ["these", "those", "this's", "thises"], e: "this → these [ðiːz].", l: "en" },
  { f: "Мн. число от that = ?", a: ["those", "these", "thats", "them"], e: "that → those [ðoʊz].", l: "en" },
  { f: "Как правильно?", a: ["This is my wife.", "This's my wife.", "This my wife.", "These is my wife."], e: "После this нет сокращения: всегда this is.", l: "en" },
  { f: "Как правильно?", a: ["That's right.", "This right.", "That right is.", "Those's right."], e: "That's = That is. Ответ на сказанное → that.", l: "en" },
  { f: "Look at ___ castle over there!", a: ["that", "this", "these", "those"], e: "Далеко (over there), один замок → that.", l: "en" },
  { f: "Who are ___ people over there?", a: ["those", "these", "that", "this"], e: "Далеко и много → those.", l: "en" },
  { f: "Собеседник сказал глупость. Вы: «I don't like ___.»", a: ["that", "this", "these", "it's"], e: "Реакция на чужие слова → that.", l: "en" },
  { f: "this week = ?", a: ["diese Woche", "jene Woche", "letzte Woche", "nächste Woche"], e: "this – сейчас, эта неделя. that day – в тот день." }
]},

{ id: "frage-verneinung", titel: "die Frage und die Verneinung mit do / does / did", ru: "вопрос и отрицание", regel: "satzart-verneinung",
  fragen: [
  { f: "___ you speak English?", a: ["Do", "Does", "Are", "Is"], e: "Present Simple, вопрос с you → Do.", l: "en" },
  { f: "___ she live in Krefeld?", a: ["Does", "Do", "Is", "Did"], e: "he / she / it → does.", l: "en" },
  { f: "What ___ that mean?", a: ["does", "do", "is", "did"], e: "that = it → does. «даз» / в быстрой речи «дэз».", l: "en" },
  { f: "What does that ___?", a: ["mean", "means", "meant", "meaning"], e: "После does глагол без -s: -s уже в does.", l: "en" },
  { f: "I ___ understand.", a: ["don't", "doesn't", "not", "am not"], e: "Отрицание с I → don't + глагол.", l: "en" },
  { f: "He ___ like coffee.", a: ["doesn't", "don't", "isn't", "not"], e: "he → doesn't.", l: "en" },
  { f: "___ you sleep well? (прошлое)", a: ["Did", "Do", "Does", "Were"], e: "Прошлое → Did + V1 (sleep).", l: "en" },
  { f: "Did you ___ well?", a: ["sleep", "slept", "sleeps", "sleeping"], e: "После did – первая форма: sleep.", l: "en" },
  { f: "I ___ see him yesterday.", a: ["didn't", "don't", "wasn't", "not"], e: "Прошлое отрицание → didn't + V1.", l: "en" },
  { f: "Как читается does?", a: ["«даз»", "«доэс»", "«дуз»", "«доз»"], e: "does [dʌz] – исключение, o звучит как «а»." }
]},

// ---------------- 4. Zeitformen ----------------
{ id: "pastsimple", titel: "das Past Simple", ru: "простое прошедшее: worked, slept", regel: "en-past-simple",
  fragen: [
  { f: "sleep – ___ – slept", a: ["slept", "sleeped", "sleept", "slep"], e: "Неправильный глагол: sleep – slept – slept.", l: "en" },
  { f: "go – ___ – gone", a: ["went", "goed", "gone", "go"], e: "go – went – gone.", l: "en" },
  { f: "forget – ___ – forgotten", a: ["forgot", "forgetted", "forgat", "forgets"], e: "forgot [fərˈɡɑt] «фэрга́т».", l: "en" },
  { f: "Yesterday I ___ in the garden. (work)", a: ["worked", "work", "working", "works"], e: "Правильный глагол: + -ed.", l: "en" },
  { f: "We ___ friends last Sunday. (visit)", a: ["visited", "visit", "visiting", "visits"], e: "visited – «ви́зитид» (после t → [ɪd]).", l: "en" },
  { f: "He ___ until nine. (sleep)", a: ["slept", "slepts", "sleeps", "sleeped"], e: "В прошедшем все лица одинаковы: he slept – без -s.", l: "en" },
  { f: "Ich habe gut geschlafen. = ?", a: ["I slept well.", "I have slept good.", "I sleeped well.", "I did slept well."], e: "Законченное прошлое (ночь прошла) → Past Simple.", l: "en" },
  { f: "regular verb = ?", a: ["regelmäßiges Verb (schwach)", "unregelmäßiges Verb (stark)", "Hilfsverb", "Modalverb"], e: "regular = regelmäßig ≈ schwach. irregular = unregelmäßig ≈ stark." },
  { f: "Das Präteritum heißt auch …", a: ["das Imperfekt", "das Perfekt", "das Präsens", "das Futur"], e: "Präteritum = Imperfekt = 1. Vergangenheit." },
  { f: "eat – ate – ___", a: ["eaten", "eated", "ate", "eat"], e: "eat – ate – eaten.", l: "en" }
]},

{ id: "kurzformen", titel: "I'm · I'll · I'd · would like", ru: "краткие формы и вежливая просьба", regel: "en-will-would",
  fragen: [
  { f: "I'd like a coffee. – I'd = ?", a: ["I would", "I had", "I did", "I could"], e: "I'd like = I would like = ich möchte.", l: "en" },
  { f: "Möchtest du etwas trinken? = ___ you like something to drink?", a: ["Would", "Do", "Will", "Are"], e: "möchtest = would … like.", l: "en" },
  { f: "Как правильно?", a: ["Would you like something to drink?", "Would you something to drink?", "Would like you something to drink?", "You would like drink?"], e: "После would нужен смысловой глагол: like.", l: "en" },
  { f: "It's cold. – it's = ?", a: ["it is", "its", "it has been", "it was"], e: "'s = is.", l: "en" },
  { f: "The dog wags ___ tail.", a: ["its", "it's", "his", "it is"], e: "its (без апострофа) = «свой/его» у предмета, животного.", l: "en" },
  { f: "He's seen it. – he's = ?", a: ["he has", "he is", "he was", "his"], e: "Перед третьей формой (seen) 's = has.", l: "en" },
  { f: "Peter's car = ?", a: ["Peters Auto", "Peter ist Auto", "Peter hat Auto", "Peter und Auto"], e: "'s после имени = чей? (der Genitiv)." },
  { f: "I'll call you. = ?", a: ["Ich rufe dich an (werde anrufen).", "Ich habe dich angerufen.", "Ich würde dich anrufen.", "Ich rief dich an."], e: "I'll = I will – будущее." },
  { f: "I want a coffee. звучит …", a: ["грубовато («Ich will»)", "очень вежливо", "как вопрос", "неправильно грамматически"], e: "Вежливо: I'd like a coffee, please." },
  { f: "Ответ на «Would you like tea?»", a: ["Yes, please.", "Yes, I would like.", "Yes, I like.", "Yes, would."], e: "Коротко и вежливо: Yes, please. / No, thank you.", l: "en" }
]},

// ---------------- 5. der Satz ----------------
{ id: "wortstellung", titel: "die Verbzweitstellung", ru: "порядок слов: DE глагол 2-й, EN подлежащее перед глаголом", regel: "verbzweit-de-en",
  fragen: [
  { f: "Gestern ___ im Garten.", a: ["war ich", "ich war", "ich bin", "war"], e: "Первым стоит Gestern → глагол 2-й, подлежащее после него.", l: "de" },
  { f: "Yesterday ___ in the garden.", a: ["I was", "was I", "I were", "were I"], e: "В английском подлежащее всегда перед глаголом.", l: "en" },
  { f: "Heute ___ es.", a: ["regnet", "es regnet", "ist regnen", "regnen"], e: "Heute regnet es. Глагол на 2-м месте.", l: "de" },
  { f: "Am Sonntag ___ Tomaten gepflanzt.", a: ["habe ich", "ich habe", "ich", "hat ich"], e: "«Am Sonntag» – одно место (Satzglied). Дальше глагол.", l: "de" },
  { f: "…, weil ich gestern im Garten ___.", a: ["war", "war ich", "bin", "ich war"], e: "В придаточном (Nebensatz) глагол в КОНЦЕ.", l: "de" },
  { f: "Как правильно по-английски?", a: ["I was in the garden yesterday.", "Yesterday was I in the garden.", "In the garden was I yesterday.", "Was I yesterday in the garden."], e: "Время чаще в конце; подлежащее всегда перед глаголом.", l: "en" },
  { f: "Где по-английски порядок меняется?", a: ["в вопросе: Were you …?", "после yesterday", "после today", "никогда"], e: "Только в вопросах вспомогательный глагол выходит вперёд." },
  { f: "die Verbzweitstellung значит …", a: ["das finite Verb steht auf Platz 2", "das Verb steht am Ende", "zwei Verben im Satz", "das Subjekt steht auf Platz 2"], e: "Личная форма глагола – второе место." },
  { f: "der Aussagesatz = ?", a: ["der Behauptungssatz", "der Fragesatz", "der Nebensatz", "der Befehlssatz"], e: "Aussagesatz = Behauptungssatz = Deklarativsatz – повествовательное предложение." },
  { f: "Im Garten ___ gestern.", a: ["war ich", "ich war", "ich", "waren"], e: "Место на первом месте → потом глагол, потом подлежащее.", l: "de" }
]},

{ id: "praeposition", titel: "die Präposition und der Kasus", ru: "какой падеж после предлога", regel: "de-praeposition-kasus",
  fragen: [
  { f: "Ich fahre mit ___ Bus.", a: ["dem", "den", "der", "das"], e: "mit → всегда Dativ: mit dem Bus.", l: "de" },
  { f: "Das ist für ___ Sohn.", a: ["den", "dem", "der", "des"], e: "für → всегда Akkusativ: für den Sohn.", l: "de" },
  { f: "Er kommt aus ___ Haus.", a: ["dem", "das", "den", "des"], e: "aus → Dativ: aus dem Haus.", l: "de" },
  { f: "Ich gehe in ___ Stadt. (куда?)", a: ["die", "der", "den", "dem"], e: "in + wohin? → Akkusativ: in die Stadt.", l: "de" },
  { f: "Ich wohne in ___ Stadt. (где?)", a: ["der", "die", "den", "das"], e: "in + wo? → Dativ: in der Stadt.", l: "de" },
  { f: "Ich gehe nach ___. (домой)", a: ["Hause", "Haus", "dem Haus", "zu Hause"], e: "Блок наизусть: nach Hause (куда), zu Hause (где).", l: "de" },
  { f: "Ich bin zu ___. (дома)", a: ["Hause", "Haus", "dem Haus", "nach Hause"], e: "zu Hause = дома.", l: "de" },
  { f: "Wir fahren ohne ___ Wohnwagen.", a: ["den", "dem", "der", "des"], e: "ohne → Akkusativ: ohne den Wohnwagen.", l: "de" },
  { f: "Er wohnt bei ___ Eltern.", a: ["seinen", "seine", "sein", "seiner"], e: "bei → Dativ, мн. число: bei seinen Eltern.", l: "de" },
  { f: "der Dativ = ?", a: ["der 3. Fall (Wem-Fall)", "der 4. Fall (Wen-Fall)", "der 2. Fall", "der 1. Fall"], e: "Dativ = 3. Fall = Wem? Akkusativ = 4. Fall = Wen?" }
]},

{ id: "satzzeichen", titel: "die Satzzeichen und please", ru: "запятая, please, большие буквы", regel: "satzzeichen",
  fragen: [
  { f: "Как правильно?", a: ["Sit down, please.", "Sit down please, .", "Sit down. please", "Sit, down please."], e: "please в конце → запятая ПЕРЕД please.", l: "en" },
  { f: "Как правильно?", a: ["Please sit down.", "Please, sit, down.", "Please sit, down.", "please sit down"], e: "please в начале → без запятой.", l: "en" },
  { f: "Could you ___ help me?", a: ["please", ", please,", "please,", "pleased"], e: "please в середине вопроса – без запятых.", l: "en" },
  { f: "Setz dich bitte. – Запятая нужна?", a: ["нет", "да, перед bitte", "да, после bitte", "да, везде"], e: "По-немецки bitte обычно без запятой." },
  { f: "По-английски с большой буквы пишется …", a: ["I, Monday, English", "все существительные", "only names", "nothing"], e: "В английском с большой: I, дни недели, языки, имена. Обычные существительные – с маленькой." },
  { f: "По-немецки с большой буквы пишутся …", a: ["alle Substantive", "nur Namen", "nur Satzanfänge", "alle Verben"], e: "Im Deutschen: alle Substantive groß (das Haus, die Zeit)." },
  { f: "Thank you Anna → правильно:", a: ["Thank you, Anna.", "Thank you Anna.", "Thank, you Anna.", "Thank you. Anna"], e: "Обращение отделяется запятой.", l: "en" },
  { f: "…, because I was tired. – Запятая перед because?", a: ["обычно нет (по-английски)", "всегда да", "только в вопросе", "только после because"], e: "По-английски перед because запятую обычно не ставят. По-немецки перед weil – всегда." },
  { f: "Ich bin müde ___ ich gearbeitet habe.", a: [", weil", "weil", ". Weil", "; weil,"], e: "По-немецки перед weil, dass – всегда запятая.", l: "de" },
  { f: "Yesterday(,) I was in the garden. – Запятая …", a: ["можно, не обязательно", "обязательно", "запрещена", "только в вопросе"], e: "После вынесенного вперёд времени запятая по желанию." }
]},

// ---------------- 6. Aussprache (die Leseregeln) ----------------
{ id: "lesen1", titel: "die Leseregeln I: kurz, a vor l, das Schwa", ru: "чтение: закрытый слог, call, forgot", lese: "kurz",
  fragen: [
  { f: "sun читается …", a: ["«сан»", "«сун»", "«сюн»", "«сон»"], e: "u в закрытом слоге = [ʌ] «а».", l: "en" },
  { f: "son читается …", a: ["«сан» (как sun)", "«сон»", "«сун»", "«соун»"], e: "o перед n, m, v часто «а»: son, come, love.", l: "en" },
  { f: "call читается …", a: ["«кол»", "«кэл»", "«кейл»", "«кул»"], e: "a перед ll → «о»: call, ball, all.", l: "en" },
  { f: "cat читается …", a: ["«кэт»", "«кат»", "«кот»", "«кейт»"], e: "a в закрытом слоге = [æ] «э».", l: "en" },
  { f: "half читается …", a: ["«хэф» / «хаф», l не читается", "«холф»", "«халф»", "«хейлф»"], e: "al + f, m → l немая: half, calm.", l: "en" },
  { f: "forgot читается …", a: ["«фэрга́т»", "«фо́ргот»", "«форго́т» с ударением на for", "«фергот»"], e: "for- безударный → [fər]; got по-американски «гат».", l: "en" },
  { f: "talk читается …", a: ["«ток»", "«талк»", "«толк»", "«тэлк»"], e: "alk → «о», l немая.", l: "en" },
  { f: "bus читается …", a: ["«бас»", "«бус»", "«бьюс»", "«боз»"], e: "u в закрытом слоге → «а».", l: "en" },
  { f: "Исключение: put читается …", a: ["«пут»", "«пат»", "«пьют»", "«пот»"], e: "put, push, pull, full – «у».", l: "en" },
  { f: "Знак [ə] (Schwa) – это …", a: ["слабый безударный звук «э/а»", "долгое «и»", "звук «ш»", "звук «ж»"], e: "Schwa – самый частый звук английского." }
]},

{ id: "lesen2", titel: "die Leseregeln II: ш, das stumme E, -s und -ed", ru: "чтение: delicious, retired, friends", lese: "tion-cious",
  fragen: [
  { f: "delicious читается …", a: ["«дили́шес»", "«делициоус»", "«дели́кьюс»", "«дели́циус»"], e: "ci + гласная → «ш», -ous → «ес».", l: "en" },
  { f: "station читается …", a: ["«стэ́йшен»", "«штацьон»", "«стейтион»", "«станция»"], e: "ti + гласная → «ш».", l: "en" },
  { f: "television: si после гласной →", a: ["«ж»", "«ш»", "«с»", "«з»"], e: "Vokal + sion → [ʒ] «ж»: «тэ́лэвижен».", l: "en" },
  { f: "retired читается …", a: ["«ритáйерд»", "«ритирд»", "«ретиред»", "«ритэрд»"], e: "Одна согласная перед -ed → была немая e (retire) → «ай».", l: "en" },
  { f: "hopped или hoped: где «оу»?", a: ["hoped", "hopped", "оба", "ни одно"], e: "Одна p → длинно (hope). Две pp → коротко (hop).", l: "en" },
  { f: "friends: конец читается …", a: ["«-ндз»", "«-нтс»", "«-ндс»", "«-нс»"], e: "После звонкого n окончание -s звонкое: «фрэндз».", l: "en" },
  { f: "visited: конец читается …", a: ["«-тид»", "«-тт»", "«-тд»", "«-тэд»"], e: "После t и d → [ɪd]: «ви́зитид».", l: "en" },
  { f: "worked: конец читается …", a: ["«-кт»", "«-кед»", "«-кд»", "«-кид»"], e: "После глухого k → [t]: «вёркт».", l: "en" },
  { f: "friend: буква i …", a: ["не читается", "читается «и»", "читается «ай»", "читается «и» долгое"], e: "friend [frend] – исключение.", l: "en" },
  { f: "two / to / too звучат …", a: ["одинаково «ту»", "по-разному", "two «тво»", "too «тоо»"], e: "two = 2, to = в/к, too = тоже. Звучат одинаково.", l: "en" }
]},

// ---------------- 7. gleichbedeutende Wörter ----------------
{ id: "synonyme", titel: "die gleichbedeutenden Wörter", ru: "одно и то же – разные названия", regel: "de-konjugieren-deklinieren",
  fragen: [
  { f: "unregelmäßig = ?", a: ["irregular ≈ stark", "regular ≈ schwach", "trennbar", "reflexiv"], e: "unregelmäßig = irregular ≈ das starke Verb." },
  { f: "das Perfekt = ?", a: ["die 2. Vergangenheit (vollendete Gegenwart)", "die 1. Vergangenheit", "die Zukunft", "die Gegenwart"], e: "Perfekt = 2. Vergangenheit." },
  { f: "das Plusquamperfekt = ?", a: ["die Vorvergangenheit", "die Gegenwart", "die Zukunft", "das Imperfekt"], e: "Plusquamperfekt = Vorvergangenheit = 3. Vergangenheit." },
  { f: "der Infinitiv = ?", a: ["die Grundform (Nennform, V1)", "das Partizip II", "die Befehlsform", "die Personalform"], e: "Infinitiv = Grundform = Nennform = V1." },
  { f: "das Partizip II = ?", a: ["das Mittelwort der Vergangenheit (V3)", "das Mittelwort der Gegenwart", "die Grundform", "das Imperfekt"], e: "Partizip II = V3 = gemacht, gesehen, slept." },
  { f: "der Imperativ = ?", a: ["die Befehlsform", "die Möglichkeitsform", "die Grundform", "die Personalform"], e: "Imperativ = Befehlsform: Komm! Sit down!" },
  { f: "der Konjunktiv II = ?", a: ["die Möglichkeitsform (würde, hätte)", "die Befehlsform", "die Vergangenheit", "die Zukunft"], e: "Konjunktiv II = Möglichkeitsform ≈ would." },
  { f: "das Subjekt = ?", a: ["der Satzgegenstand", "die Satzaussage", "die Ergänzung", "das Bindewort"], e: "Subjekt = Satzgegenstand (подлежащее)." },
  { f: "das Prädikat = ?", a: ["die Satzaussage", "der Satzgegenstand", "das Objekt", "das Adjektiv"], e: "Prädikat = Satzaussage (сказуемое)." },
  { f: "die Konjugation – это изменение …", a: ["глагола (по лицам и временам)", "существительного по падежам", "прилагательного", "порядка слов"], e: "Konjugation – глагол, Deklination – существительное/прилагательное (падежи)." }
]}

];
