// ============================================================
// Wortdetektiv – Tier-Lexikon / словарь животных
// 2026-11-04 · geschrieben mit Claude
// DE: Jedes Tier: deutscher Name MIT Artikel, Mehrzahl, lateinischer
//     (wissenschaftlicher) Name mit Bedeutung, Russisch, Englisch,
//     kurze Wortgeschichte (RU, Fachwörter auf Deutsch).
// RU: Каждое животное: немецкое название с артиклем, множественное число,
//     латинское (научное) название и что оно значит, русское, английское,
//     короткая история слова.
//
// Felder / поля:
//   id, gr (Gruppe: haus | wild | vogel | fisch), emo (Bild-Zeichen)
//   de  – mit Artikel!        pl – Mehrzahl (mit „die“)
//   la  – lateinischer Name   laRu – что значит латинское название
//   ru, en                    her – Wortgeschichte (RU)
//   wiki / wikiRu – Titel des Wikipedia-Artikels (DE / RU)
// Neue Tiere einfach unten anhängen.
// ============================================================
window.WORTDETEKTIV_TIERGRUPPEN = [
  { id: "haus",  icon: "🏡", de: "Haus- und Nutztiere", ru: "домашние животные" },
  { id: "wild",  icon: "🌲", de: "Wildtiere",           ru: "дикие звери" },
  { id: "vogel", icon: "🐦", de: "Vögel",               ru: "птицы" },
  { id: "fisch", icon: "🐟", de: "Fische",              ru: "рыбы" }
];

window.WORTDETEKTIV_TIERE = [
// ---------------- Haus- und Nutztiere ----------------
{ id:"kuh", gr:"haus", emo:"🐄", de:"die Kuh", pl:"die Kühe", la:"Bos taurus", laRu:"bos – корова/бык, taurus – бык",
  ru:"корова", en:"cow", wiki:"Hausrind", wikiRu:"Корова",
  her:"Немецкое Kuh и английское cow – одно германское слово. Латинское bos и русское «говядо» (отсюда говядина) – из того же древнего индоевропейского корня. Taurus – созвездие и знак зодиака Телец." },
{ id:"hund", gr:"haus", emo:"🐕", de:"der Hund", pl:"die Hunde", la:"Canis lupus familiaris", laRu:"canis – собака, lupus – волк, familiaris – домашний: «домашний волк»",
  ru:"собака", en:"dog", wiki:"Haushund", wikiRu:"Собака",
  her:"Собака произошла от волка – это видно прямо в латинском имени. Hund – родня английскому hound (охотничья собака), латинскому canis и греческому kyon: всё из одного древнего корня. От canis – Kanarische Inseln (die Kanaren), «собачьи острова»; птица der Kanarienvogel названа по островам." },
{ id:"katze", gr:"haus", emo:"🐈", de:"die Katze", pl:"die Katzen", la:"Felis catus", laRu:"felis – кошка, catus – кот",
  ru:"кошка", en:"cat", wiki:"Hauskatze", wikiRu:"Кошка",
  her:"Katze, cat, кот, итальянское gatto – все от позднелатинского cattus. Откуда оно в латыни – точно неизвестно, возможно, из Африки: домашнюю кошку очень любили в Древнем Египте." },
{ id:"pferd", gr:"haus", emo:"🐎", de:"das Pferd", pl:"die Pferde", la:"Equus ferus caballus", laRu:"equus – лошадь, ferus – дикий, caballus – рабочая лошадь",
  ru:"лошадь, конь", en:"horse", wiki:"Hauspferd", wikiRu:"Лошадь",
  her:"Pferd – из средневековой латыни paraveredus: так называли запасную почтовую лошадь (греч. para «рядом» + галльское veredus «почтовая лошадь»). Из caballus – испанское caballo, французское cheval, немецкое der Kavalier (всадник). Русское «лошадь» – из тюркских языков (алаша)." },
{ id:"schwein", gr:"haus", emo:"🐖", de:"das Schwein", pl:"die Schweine", la:"Sus scrofa domestica", laRu:"sus – свинья, scrofa – свиноматка, domestica – домашняя",
  ru:"свинья", en:"pig, swine", wiki:"Hausschwein", wikiRu:"Домашняя свинья",
  her:"Schwein, английское swine и русское свинья – родня, а латинское sus – из того же древнего корня. Сравните: Schwein – свинья, звучит почти одинаково!" },
{ id:"schaf", gr:"haus", emo:"🐑", de:"das Schaf", pl:"die Schafe", la:"Ovis aries", laRu:"ovis – овца, aries – баран",
  ru:"овца", en:"sheep", wiki:"Hausschaf", wikiRu:"Домашняя овца",
  her:"Здесь русский ближе к латыни, чем немецкий: латинское ovis – русское овца – английское ewe (овца-самка) – один древний корень. Aries – созвездие Овен." },
{ id:"ziege", gr:"haus", emo:"🐐", de:"die Ziege", pl:"die Ziegen", la:"Capra hircus", laRu:"capra – коза, hircus – козёл",
  ru:"коза", en:"goat", wiki:"Hausziege", wikiRu:"Домашняя коза",
  her:"От capra – латинское имя созвездия Capricornus «козлорогий» – по-русски Козерог, по-немецки der Steinbock. Остров Capri в Италии тоже, возможно, назван по козам." },
{ id:"huhn", gr:"haus", emo:"🐔", de:"das Huhn", pl:"die Hühner", la:"Gallus gallus domesticus", laRu:"gallus – петух, domesticus – домашний",
  ru:"курица", en:"chicken, hen", wiki:"Haushuhn", wikiRu:"Курица",
  her:"Петух – der Hahn – буквально «певец»: тот же древний корень, что в латинском canere «петь». Das Huhn – от Hahn. Латинское gallus «петух» звучит как Gallus «галл, француз» – поэтому петух стал символом Франции." },
{ id:"gans", gr:"haus", emo:"🪿", de:"die Gans", pl:"die Gänse", la:"Anser anser", laRu:"anser – гусь",
  ru:"гусь", en:"goose", wiki:"Hausgans", wikiRu:"Домашний гусь",
  her:"Gans – goose – гусь – латинское anser (раньше hanser): одно и то же древнее слово во всех четырёх языках!" },
{ id:"ente", gr:"haus", emo:"🦆", de:"die Ente", pl:"die Enten", la:"Anas platyrhynchos", laRu:"anas – утка, platyrhynchos – греч. «плоский клюв»",
  ru:"утка (кряква)", en:"duck (mallard)", wiki:"Stockente", wikiRu:"Кряква",
  her:"Ente и латинское anas – родня (один древний корень). Platyrhynchos: греч. platys «плоский» (как Platte, Plateau) + rhynchos «клюв»." },
{ id:"kaninchen", gr:"haus", emo:"🐇", de:"das Kaninchen", pl:"die Kaninchen", la:"Oryctolagus cuniculus", laRu:"греч. «роющий заяц» + cuniculus – кролик",
  ru:"кролик", en:"rabbit", wiki:"Wildkaninchen", wikiRu:"Кролик",
  her:"Kaninchen – из латинского cuniculus + немецкое уменьшительное -chen. Кролик роет норы – отсюда oryctolagus: греч. oryktes «копающий» + lagos «заяц»." },

// ---------------- Wildtiere ----------------
{ id:"wolf", gr:"wild", emo:"🐺", de:"der Wolf", pl:"die Wölfe", la:"Canis lupus", laRu:"canis – собака, lupus – волк",
  ru:"волк", en:"wolf", wiki:"Wolf", wikiRu:"Волк",
  her:"Wolf – волк – английское wolf – латинское lupus – греческое lykos: всё один древний корень. Помните томат – «волчий персик», lycopersicum? Это тот же lykos!" },
{ id:"fuchs", gr:"wild", emo:"🦊", de:"der Fuchs", pl:"die Füchse", la:"Vulpes vulpes", laRu:"vulpes – лиса",
  ru:"лиса", en:"fox", wiki:"Rotfuchs", wikiRu:"Обыкновенная лисица",
  her:"Fuchs и английское fox – германское слово; древнее значение, возможно, «хвост» (как der Fuchsschwanz – ножовка, «лисий хвост»)." },
{ id:"baer", gr:"wild", emo:"🐻", de:"der Bär", pl:"die Bären", la:"Ursus arctos", laRu:"ursus – медведь (лат.), arctos – медведь (греч.)",
  ru:"бурый медведь", en:"brown bear", wiki:"Braunbär", wikiRu:"Бурый медведь",
  her:"Настоящее имя медведя боялись произносить. Германцы говорили der Bär – «бурый», славяне – медведь, «тот, кто ест мёд». Греческое arktos «медведь» дало слово die Arktis: север лежит под созвездием Большой Медведицы." },
{ id:"hase", gr:"wild", emo:"🐇", de:"der Hase", pl:"die Hasen", la:"Lepus europaeus", laRu:"lepus – заяц, europaeus – европейский",
  ru:"заяц-русак", en:"hare", wiki:"Feldhase", wikiRu:"Заяц-русак",
  her:"Hase и английское hare – одно германское слово; древнее значение, возможно, «серый». Не путать: der Hase – заяц (дикий), das Kaninchen – кролик." },
{ id:"igel", gr:"wild", emo:"🦔", de:"der Igel", pl:"die Igel", la:"Erinaceus europaeus", laRu:"erinaceus – ёж, europaeus – европейский",
  ru:"ёж", en:"hedgehog", wiki:"Braunbrustigel", wikiRu:"Обыкновенный ёж",
  her:"Igel – ёж – греческое echinos: один древний корень! Английское hedgehog – «свинья из живой изгороди» (hedge – изгородь, hog – свинья)." },
{ id:"eichhoernchen", gr:"wild", emo:"🐿️", de:"das Eichhörnchen", pl:"die Eichhörnchen", la:"Sciurus vulgaris", laRu:"греч. «тенехвост» (skia – тень + oura – хвост), vulgaris – обыкновенная",
  ru:"белка", en:"squirrel", wiki:"Eurasisches Eichhörnchen", wikiRu:"Обыкновенная белка",
  her:"Белка прячется в тени своего пушистого хвоста – отсюда греческое «тенехвост», из него английское squirrel. В немецком Eichhörnchen к дубу (die Eiche) и рогу (das Horn) не имеет отношения: старое слово переделали, чтобы оно звучало понятно (народная этимология)." },
{ id:"hirsch", gr:"wild", emo:"🦌", de:"der Hirsch", pl:"die Hirsche", la:"Cervus elaphus", laRu:"cervus – олень, elaphos – олень (греч.)",
  ru:"благородный олень", en:"red deer", wiki:"Rothirsch", wikiRu:"Благородный олень",
  her:"Hirsch и латинское cervus, по одной версии, от древнего корня «рог» (как das Horn): «рогатый». Английское deer раньше значило просто «зверь» – как немецкое das Tier!" },
{ id:"wildschwein", gr:"wild", emo:"🐗", de:"das Wildschwein", pl:"die Wildschweine", la:"Sus scrofa", laRu:"sus – свинья, scrofa – свиноматка",
  ru:"кабан", en:"wild boar", wiki:"Wildschwein", wikiRu:"Кабан",
  her:"Дикий предок домашней свиньи – поэтому латинское имя почти такое же. Wild – дикий + das Schwein. Самец – der Keiler, самка – die Bache." },
{ id:"loewe", gr:"wild", emo:"🦁", de:"der Löwe", pl:"die Löwen", la:"Panthera leo", laRu:"panthera – пантера, leo – лев",
  ru:"лев", en:"lion", wiki:"Löwe", wikiRu:"Лев",
  her:"Löwe, лев, lion – все из латинского leo (греч. leon). Имя Leo, Leon, Лев – «лев». Созвездие – der Löwe / Лев." },
{ id:"elefant", gr:"wild", emo:"🐘", de:"der Elefant", pl:"die Elefanten", la:"Loxodonta africana", laRu:"греч. «косые зубы», africana – африканский",
  ru:"африканский слон", en:"African elephant", wiki:"Afrikanischer Elefant", wikiRu:"Африканский слон",
  her:"Elefant – из греческого elephas (так называли и слона, и слоновую кость). Откуда русское «слон» – учёные спорят." },

// ---------------- Vögel ----------------
{ id:"adler", gr:"vogel", emo:"🦅", de:"der Steinadler", pl:"die Steinadler", la:"Aquila chrysaetos", laRu:"aquila – орёл, chrysaetos – греч. «золотой орёл»",
  ru:"беркут", en:"golden eagle", wiki:"Steinadler", wikiRu:"Беркут",
  her:"Der Adler – из старого edel Aar «благородный орёл». Русское «беркут» – из тюркских языков (казахское бүркіт): с беркутом в Казахстане охотятся до сих пор. Chrysos – греч. «золото», как в слове хризантема." },
{ id:"spatz", gr:"vogel", emo:"🐦", de:"der Spatz (der Haussperling)", pl:"die Spatzen", la:"Passer domesticus", laRu:"passer – воробей, domesticus – домашний",
  ru:"воробей", en:"house sparrow", wiki:"Haussperling", wikiRu:"Домовый воробей",
  her:"Der Sperling и английское sparrow – одно германское слово; der Spatz – ласковое, разговорное. Поговорка: «Lieber den Spatz in der Hand als die Taube auf dem Dach» = лучше синица в руках, чем журавль в небе." },
{ id:"taube", gr:"vogel", emo:"🕊️", de:"die Taube", pl:"die Tauben", la:"Columba livia", laRu:"columba – голубь, livia – сизая",
  ru:"сизый голубь", en:"pigeon, dove", wiki:"Felsentaube", wikiRu:"Сизый голубь",
  her:"Columba – голубь. Фамилия Христофора Колумба – итальянское Colombo – значит «голубь»! Отсюда и Kolumbien / Колумбия." },
{ id:"storch", gr:"vogel", emo:"🪶", de:"der Weißstorch", pl:"die Weißstörche", la:"Ciconia ciconia", laRu:"ciconia – аист",
  ru:"белый аист", en:"white stork", wiki:"Weißstorch", wikiRu:"Белый аист",
  her:"Der Storch и английское stork – германское слово; возможно, от «стоять неподвижно, быть прямым» (как starr). В немецкой сказке аист приносит детей – Adebar, старое имя аиста." },
{ id:"rabe", gr:"vogel", emo:"🐦‍⬛", de:"der Kolkrabe", pl:"die Kolkraben", la:"Corvus corax", laRu:"corvus – ворон (лат.), corax – ворон (греч.)",
  ru:"ворон", en:"raven", wiki:"Kolkrabe", wikiRu:"Ворон",
  her:"Der Rabe, raven, corvus, corax – все подражают голосу птицы: «крра». Kolk – тоже звук его крика. Не путать: der Rabe – ворон, die Krähe – ворона." },
{ id:"uhu", gr:"vogel", emo:"🦉", de:"der Uhu", pl:"die Uhus", la:"Bubo bubo", laRu:"bubo – филин",
  ru:"филин", en:"eagle owl", wiki:"Uhu", wikiRu:"Филин",
  her:"И Uhu, и латинское bubo – звукоподражание: «у-ху», «бу-бо». Общее слово для сов – die Eule (английское owl)." },
{ id:"schwalbe", gr:"vogel", emo:"🐦", de:"die Rauchschwalbe", pl:"die Rauchschwalben", la:"Hirundo rustica", laRu:"hirundo – ласточка, rustica – деревенская",
  ru:"деревенская ласточка", en:"barn swallow", wiki:"Rauchschwalbe", wikiRu:"Деревенская ласточка",
  her:"Die Schwalbe и английское swallow – одно германское слово. Rauch-: она гнездилась в домах у дымохода (der Rauch – дым). Поговорка: «Eine Schwalbe macht noch keinen Sommer» – одна ласточка весны не делает." },

// ---------------- Fische ----------------
{ id:"karpfen", gr:"fisch", emo:"🐟", de:"der Karpfen", pl:"die Karpfen", la:"Cyprinus carpio", laRu:"cyprinus – греч. имя карпа, carpio – карп",
  ru:"карп, сазан", en:"carp", wiki:"Karpfen", wikiRu:"Сазан",
  her:"Karpfen, carp, карп – одно слово, через позднюю латынь carpa пришло во многие языки Европы. Сазан – дикий карп, слово из тюркских языков." },
{ id:"hecht", gr:"fisch", emo:"🐟", de:"der Hecht", pl:"die Hechte", la:"Esox lucius", laRu:"esox – крупная рыба (лат.), lucius – щука",
  ru:"щука", en:"pike", wiki:"Hecht", wikiRu:"Обыкновенная щука",
  her:"Der Hecht, по одной версии, «острый» – как у щуки острая морда и зубы. Английское pike тоже значит «пика, острие». Поговорка: «Hecht im Karpfenteich» – щука в карповом пруду, тот, кто всех расшевелит." },
{ id:"lachs", gr:"fisch", emo:"🐟", de:"der Lachs", pl:"die Lachse", la:"Salmo salar", laRu:"salmo – лосось, salar – «прыгун» (от salire – прыгать)",
  ru:"атлантический лосось, сёмга", en:"Atlantic salmon", wiki:"Atlantischer Lachs", wikiRu:"Атлантический лосось",
  her:"Lachs – лосось: один древний корень (немцы и славяне знали эту рыбу с давних времён). Латинское salmo дало английское salmon. Salar – «прыгун»: лосось прыгает через пороги, идя на нерест." },
{ id:"hering", gr:"fisch", emo:"🐟", de:"der Hering", pl:"die Heringe", la:"Clupea harengus", laRu:"clupea – сельдь, harengus – латинизированное германское Hering",
  ru:"атлантическая сельдь", en:"herring", wiki:"Atlantischer Hering", wikiRu:"Атлантическая сельдь",
  her:"Здесь латынь взяла слово у германцев: harengus – это Hering. Английское herring – то же слово. Русское «сельдь» – из скандинавского (шведское sill)." },
{ id:"forelle", gr:"fisch", emo:"🐟", de:"die Forelle", pl:"die Forellen", la:"Salmo trutta", laRu:"salmo – лосось, trutta – форель",
  ru:"форель (кумжа)", en:"brown trout", wiki:"Bachforelle", wikiRu:"Кумжа",
  her:"Русское «форель» пришло из немецкого die Forelle! Английское trout – из латинского trutta. Знаменитая песня Шуберта – «Die Forelle»." },
{ id:"hai", gr:"fisch", emo:"🦈", de:"der Weiße Hai", pl:"die Weißen Haie", la:"Carcharodon carcharias", laRu:"греч. «острозубый» (karcharos – острый + odon – зуб)",
  ru:"белая акула", en:"great white shark", wiki:"Weißer Hai", wikiRu:"Белая акула",
  her:"Der Hai пришёл в немецкий через голландский haai из исландского/древнескандинавского hár. Русское «акула» – тоже из скандинавского (hákall)." },
{ id:"aal", gr:"fisch", emo:"🐍", de:"der Aal", pl:"die Aale", la:"Anguilla anguilla", laRu:"anguilla – угорь, «маленькая змея» (anguis – змея)",
  ru:"речной угорь", en:"eel", wiki:"Europäischer Aal", wikiRu:"Речной угорь",
  her:"Der Aal и английское eel – одно германское слово. Латинское anguilla – «змейка»: угорь похож на змею. Русское «угорь» и латинское anguis, по одной версии, тоже родня." }
];
