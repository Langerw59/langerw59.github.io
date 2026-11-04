// ============================================================
// Wortdetektiv – Geschichten der Wörter / Словодетектив – истории слов
// 2026-11-04 · geschrieben mit Claude
// DE: Jede Geschichte = ein Fall. Text mit Ortsnamen-Links [[ort:id|Name]],
//     Karte (Orte + Wege), „Mehr erfahren“-Links, Rätsel.
// RU: Каждая история – «дело». В тексте ссылки на места [[ort:id|Name]]:
//     нажал – место показывается на карте.
//
// Felder / поля:
//   id, titel (DE), ru (RU-Untertitel), wort (Hauptwort), h (Herkunft wie im Glossar)
//   thema     – Thema / тема: voelker | tiere | pflanzen | woerter (Liste unten: WORTDETEKTIV_THEMEN)
//   Im Text außerdem: [[ton:it|pomi d'oro]] – Wort zum Anhören in seiner Sprache (de, en, fr, it, es, la, ru …)
//   kurz      – ein Satz, worum es geht (RU)
//   text      – Absätze (RU, Fachwörter auf Deutsch); **fett**, [[ort:id|Name]]
//   spuren    – Wort-Spuren: [Wort, Erklärung]  (родственные слова, «улики»)
//   orte      – { id: { name, lat, lng, info } }
//   wege      – [ [von, nach, Beschriftung] ]   (стрелки на карте)
//   links     – [ { t: Titel, url, art: "lexikon|woerterbuch|video|karte", sp: "DE|RU|EN", info } ]
//   raetsel   – { frage, antwort }
// Neue Geschichten einfach unten anhängen.
// ============================================================
// Themen / темы – Reihenfolge = Reihenfolge auf der Seite
window.WORTDETEKTIV_THEMEN = [
  { id: "voelker",  icon: "🌍", de: "Völker & Länder",              ru: "народы и страны" },
  { id: "tiere",    icon: "🐾", de: "Tiere · Vögel · Fische",        ru: "звери, птицы, рыбы" },
  { id: "pflanzen", icon: "🍅", de: "Pflanzen & Essen",             ru: "растения и еда" },
  { id: "woerter",  icon: "🔤", de: "Wörter über Wörter",           ru: "слова о словах" }
];

window.WORTDETEKTIV = [

{
  id: "english",
  titel: "English – wie die Angeln England ihren Namen gaben",
  ru: "Как англы из Шлезвиг-Гольштейна дали имя Англии",
  wort: "English / England",
  h: "germ",
  thema: "voelker",
  kurz: "Англичане – не «дети» немцев, а двоюродные братья: у них общие германские предки.",
  text: [
    "Около **410 года** римляне ушли из Британии. Вскоре через Северное море туда начали переселяться германские племена. По преданию, которое записал монах **Беда Достопочтенный** (Beda Venerabilis, 731 г.), первые пришли в **449 году**.",
    "Пришли три главных племени: **англы (Angeln)** – с полуострова [[ort:angeln|Angeln]] между [[ort:flensburg|Flensburg]] и [[ort:schleswig|Schleswig]]; **саксы (Sachsen)** – с земель между Эльбой и Везером, [[ort:sachsen|Niedersachsen]]; **юты (Jüten)** – из [[ort:juetland|Jütland]], нынешней Дании.",
    "Беда пишет, что англы ушли почти все – их старая родина Angeln после этого долго стояла полупустой. В Британии они осели на востоке и севере: [[ort:eastanglia|East Anglia]], [[ort:northumbria|Northumbria]]. Саксы – на юге: [[ort:wessex|Wessex]]. Юты – в [[ort:kent|Kent]].",
    "От англов – имя всей страны: древнеангл. **Engla land** «земля англов» → **England**, а **Englisc** → **English**. Саксы остались в названиях графств: **Essex** = East Saxons (восточные саксы), **Sussex** = South Saxons (южные), **Wessex** = West Saxons (западные).",
    "Поэтому английский – **германский язык**, родня немецкому: Haus – house, Wasser – water, Hand – hand, gut – good, Vater – father.",
    "**Важная поправка:** немцев как народа тогда ещё не было. Были германские племена – и от них потом произошли и немцы, и англичане, и голландцы, и датчане. Так что англичане немцам – как **двоюродные братья**.",
    "А кто жил в Британии до них? **Кельты (бритты)**. Их язык сохранился в Уэльсе (валлийский) и Шотландии. Потом в английский пришли слова **викингов** (sky, egg, they) и в 1066 году – **французов-норманнов** (поэтому столько «умных» французских слов, как engagement)."
  ],
  spuren: [
    ["Angeln (Landschaft)", "Одна из версий: от германского *angul «крючок» (нем. Angel – удочка, крючок) – по изогнутой форме земли или узкой бухты Schlei. Это гипотеза, не точно."],
    ["England", "Engla land – «земля англов»."],
    ["Essex · Sussex · Wessex", "East / South / West + Seax (саксы). Саксы – возможно, от Sax «нож, короткий меч»."],
    ["Anglistik", "Нем. «наука об английском языке» – от лат. Angli «англы»."]
  ],
  orte: {
    angeln:     { name: "Angeln", lat: 54.70, lng: 9.75, info: "Полуостров в Шлезвиг-Гольштейне. Родина англов." },
    flensburg:  { name: "Flensburg", lat: 54.78, lng: 9.44, info: "Город на Фленсбургской бухте, на краю Angeln." },
    schleswig:  { name: "Schleswig", lat: 54.52, lng: 9.56, info: "Город на заливе Schlei. Рядом – Haithabu, древний город викингов." },
    juetland:   { name: "Jütland", lat: 56.20, lng: 9.20, info: "Полуостров Ютландия (Дания) – родина ютов." },
    sachsen:    { name: "Land der Sachsen", lat: 53.30, lng: 8.80, info: "Между Эльбой и Везером – откуда пришли саксы (нынешняя Нижняя Саксония)." },
    eastanglia: { name: "East Anglia", lat: 52.65, lng: 1.10, info: "«Восточная Англия» – здесь осели англы." },
    northumbria:{ name: "Northumbria", lat: 55.00, lng: -1.70, info: "Королевство англов на севере – «к северу от реки Humber»." },
    wessex:     { name: "Wessex", lat: 51.10, lng: -1.80, info: "Королевство западных саксов. Отсюда позже объединили Англию." },
    kent:       { name: "Kent", lat: 51.20, lng: 0.90, info: "Сюда пришли юты. По преданию – первыми, в 449 году." }
  },
  wege: [
    ["angeln", "eastanglia", "Angeln"],
    ["sachsen", "wessex", "Sachsen"],
    ["juetland", "kent", "Jüten"]
  ],
  links: [
    { t: "Angeln (Volk) – Wikipedia", url: "https://de.wikipedia.org/w/index.php?search=Angeln+Volk", art: "lexikon", sp: "DE", info: "Подробно о племени англов." },
    { t: "Англы – Википедия", url: "https://ru.wikipedia.org/wiki/Англы", art: "lexikon", sp: "RU", info: "То же по-русски." },
    { t: "Angelsachsen – Wikipedia", url: "https://de.wikipedia.org/w/index.php?search=Angelsachsen", art: "lexikon", sp: "DE", info: "Англосаксы: как жили, королевства." },
    { t: "„englisch“ im DWDS", url: "https://www.dwds.de/wb/englisch", art: "woerterbuch", sp: "DE", info: "Немецкий словарь с происхождением слова." },
    { t: "„English“ – Etymonline", url: "https://www.etymonline.com/word/English", art: "woerterbuch", sp: "EN", info: "Английский этимологический словарь." },
    { t: "Videos: Angelsachsen Geschichte", url: "https://www.youtube.com/results?search_query=Angelsachsen+Geschichte+Doku", art: "video", sp: "DE", info: "Поиск видео на YouTube (документальные фильмы)." },
    { t: "Видео: история английского языка", url: "https://www.youtube.com/results?search_query=история+английского+языка+англосаксы", art: "video", sp: "RU", info: "Поиск видео на YouTube по-русски." }
  ],
  raetsel: { frage: "Что значит название графства Sussex?", antwort: "South Saxons – «южные саксы». Как Essex – восточные, Wessex – западные." }
},

{
  id: "detektiv",
  titel: "Detektiv – der, der das Dach abnimmt",
  ru: "Детектив – тот, кто «снимает крышу»",
  wort: "Detektiv / detective",
  h: "lat",
  thema: "woerter",
  kurz: "Слово пришло в немецкий из английского, а туда – из латыни. И оно родня немецкому «Dach»!",
  text: [
    "**Detektiv** – не немецкое слово. В немецкий оно пришло в **XIX веке из английского** detective. В Лондоне около **1828 года** появилась «detective police» – полиция, которая раскрывает преступления. Потом осталось одно слово: detective.",
    "Английское detect «обнаружить, раскрыть» – из латыни: **detegere** = **de-** «прочь, с» + **tegere** «покрывать». То есть буквально: **снять покров, раскрыть то, что спрятано**.",
    "А теперь самое интересное. Латинское **tegere** и немецкое **Dach** (крыша) – из одного очень древнего корня **steg- «покрывать»**. Римляне говорили tegere, германцы – Dach. Значит, **Detektiv – это «тот, кто снимает крышу»** и смотрит, что под ней.",
    "Из того же латинского корня – **tegula** «черепица» → немецкое **Ziegel** (кирпич, черепица) и английское **tile** (плитка). А **protegere** «прикрыть спереди» → **Protektor, Protektion** (протекция – когда тебя «прикрывают»).",
    "Так что **Wortdetektiv** (словодетектив) – это тот, кто снимает «крышу» со слова и смотрит, что у него внутри."
  ],
  spuren: [
    ["Dach (DE) · thatch (EN)", "Германские родственники tegere: нем. Dach – крыша, англ. thatch – соломенная крыша, deck – палуба (то, что покрывает корабль)."],
    ["Ziegel · tile", "Лат. tegula «черепица» (то, чем кроют) → нем. Ziegel, англ. tile."],
    ["Protektor · Protektion", "Лат. protegere «прикрывать спереди». Протекция – «прикрытие»."],
    ["detektieren", "В технике: обнаруживать (Metalldetektor – металлоискатель, «снимает покров» с земли)."]
  ],
  orte: {},
  wege: [],
  links: [
    { t: "„Detektiv“ im DWDS", url: "https://www.dwds.de/wb/Detektiv", art: "woerterbuch", sp: "DE", info: "Немецкий словарь: значение и история." },
    { t: "„detective“ – Etymonline", url: "https://www.etymonline.com/word/detective", art: "woerterbuch", sp: "EN", info: "Английский этимологический словарь: 1828, detective police." },
    { t: "„Dach“ im DWDS", url: "https://www.dwds.de/wb/Dach", art: "woerterbuch", sp: "DE", info: "Происхождение слова Dach – там же корень «покрывать»." }
  ],
  raetsel: { frage: "Какое немецкое слово, которое вы видите каждый день, – «двоюродный брат» слова Detektiv?", antwort: "Dach (крыша)! И ещё Ziegel (черепица) – через латинское tegula." }
},

{
  id: "tomate",
  titel: "Tomate – die „anschwellende Frucht“ der Azteken",
  ru: "Помидор – «набухающий плод» ацтеков, «золотое яблоко» итальянцев",
  wort: "Tomate / tomato / помидор",
  h: "amerika",
  thema: "pflanzen",
  kurz: "Одно растение – два имени: «томат» пришёл от ацтеков через Испанию, а «помидор» – от итальянского «золотого яблока».",
  text: [
    "Дикий томат родом из [[ort:anden|Anden]] – гор Перу и Эквадора. Там он рос маленькими ягодками, как смородина, и его почти не ели.",
    "Настоящим овощем его сделали в Мексике. Ацтеки в [[ort:tenochtitlan|Tenochtitlan]] (сегодня Mexiko-Stadt) называли его на своём языке науатль **[[ton:es|tomatl]]** – по одному толкованию «набухающий плод» (от tomana «набухать»). Был и вариант **xitomatl**.",
    "В **1519–1521 годах** испанцы во главе с **Эрнаном Кортесом** завоевали царство ацтеков. Корабли из Америки приходили в [[ort:sevilla|Sevilla]]. Испанцы переделали слово под себя: **[[ton:es|tomate]]**. Из испанского – французское **[[ton:fr|tomate]]**, а оттуда немецкое **[[ton:de|Tomate]]**.",
    "Самое раннее описание томата в Европе – у итальянского врача **Пьетро Андреа Маттиоли** в **1544 году**, в книге, напечатанной в [[ort:venedig|Venedig]]. Имени он ещё не дал – назвал «новым видом баклажана» и написал, что его жарят в масле с солью и перцем. Растения тогда выращивали в первом университетском ботаническом саду в [[ort:pisa|Pisa]].",
    "В **1554 году** Маттиоли пишет: в народе их зовут **[[ton:it|pomi d'oro]]** – «золотые яблоки». Первые томаты в Европе часто были **жёлтые**, золотые! Отсюда итальянское **[[ton:it|pomodoro]]** – и наше русское **[[ton:ru|помидор]]**. В том же году фламандский врач **Додунс** в [[ort:antwerpen|Antwerpen]] переводит это как «gulden appelen» – тоже «золотые яблоки».",
    "Север Европы томата **боялся**. Он из семейства паслёновых (**Nachtschattengewächse**) – как ядовитые белладонна и дурман. Поэтому долго его держали как **декоративное растение** в саду, а не на столе. Смелее всех были на юге Италии – в [[ort:neapel|Neapel]], который тогда принадлежал Испании.",
    "Отсюда и другие красивые имена: французское **[[ton:fr|pomme d'amour]]** – «яблоко любви», немецкое **[[ton:de|Liebesapfel]]**, а в Австрии и сегодня – **[[ton:de|Paradeiser]]**, «райское яблоко» ([[ort:wien|Wien]]).",
    "Учёный **Карл Линней** в **1753 году** дал томату латинское имя **[[ton:la|Solanum lycopersicum]]**: lycopersicum – от греческого **lykos** «волк» + **persikon** «персик», то есть «волчий персик». Слово **Tomate** впервые появилось в немецком орфографическом словаре Duden в **1897 году**.",
    "В Россию томат пришёл, по распространённому рассказу, в **XVIII веке** – тоже сначала как диковинка. Поэтому у нас два слова: **томат** (как у ацтеков и испанцев) и **помидор** (как у итальянцев)."
  ],
  spuren: [
    ["tomatl · xitomatl", "Науатль, язык ацтеков. Толкование «набухающий плод» (tomana «набухать») – распространённое, но не единственное."],
    ["Schokolade · Kakao", "Тоже от ацтеков: науатль **xocolatl** и **cacahuatl**. Через испанский chocolate, cacao."],
    ["Avocado · Chili · Kojote", "Науатль **āhuacatl**, **chīlli**, **coyōtl** – ещё «ацтекские» слова в немецком и русском (авокадо, чили, койот)."],
    ["pomodoro · помидор", "Итал. pomo d'oro «золотое яблоко»: pomo (лат. pomum «плод», нем. Pomologie – наука о плодах) + oro (лат. aurum «золото»)."],
    ["Paradeiser", "Австрийское слово: Paradeisapfel → Paradeiser, «райское яблоко»."],
    ["Nachtschatten · Solanum", "Паслёновые: томат, картофель, баклажан, перец. Нем. Nachtschattengewächse, лат. Solanaceae."]
  ],
  orte: {
    anden:        { name: "Anden (Peru / Ecuador)", lat: -6.5, lng: -78.5, info: "Родина дикого томата: маленькие ягоды на склонах гор." },
    tenochtitlan: { name: "Tenochtitlan", lat: 19.43, lng: -99.13, info: "Столица ацтеков на озере. Сегодня здесь Mexiko-Stadt. Здесь томат – tomatl." },
    sevilla:      { name: "Sevilla", lat: 37.39, lng: -5.99, info: "Главный порт для кораблей из Америки. Испанцы: tomate." },
    pisa:         { name: "Pisa", lat: 43.72, lng: 10.40, info: "Первый университетский ботанический сад Европы (Luca Ghini, 1544). Здесь росли одни из первых томатов." },
    venedig:      { name: "Venedig", lat: 45.44, lng: 12.33, info: "Здесь печатали книгу Маттиоли – первое описание томата (1544), потом имя pomi d'oro (1554)." },
    antwerpen:    { name: "Antwerpen", lat: 51.22, lng: 4.40, info: "Додунс, 1554: первая книга с рисунком томата – «gulden appelen», золотые яблоки." },
    neapel:       { name: "Neapel", lat: 40.85, lng: 14.27, info: "Юг Италии, тогда под властью Испании. Здесь томат раньше всех стал едой – потом соус к пасте и пицце." },
    wien:         { name: "Wien", lat: 48.21, lng: 16.37, info: "В Австрии томат и сегодня – Paradeiser, «райское яблоко»." },
    petersburg:   { name: "Sankt Petersburg", lat: 59.94, lng: 30.31, info: "В России томат – с XVIII века, сначала как диковинка. Два имени: томат и помидор." }
  },
  wege: [
    ["anden", "tenochtitlan", "Wildtomate"],
    ["tenochtitlan", "sevilla", "Spanier, 16. Jh."],
    ["sevilla", "neapel", "nach Italien"],
    ["venedig", "antwerpen", "pomi d'oro"],
    ["neapel", "petersburg", "помидор"]
  ],
  links: [
    { t: "„Tomate“ im Duden", url: "https://www.duden.de/rechtschreibung/Tomate", art: "woerterbuch", sp: "DE", info: "Herkunft: franz. tomate < span. tomate < Nahuatl tomatl. Синонимы: Paradeiser, Liebesapfel." },
    { t: "„Tomate“ im DWDS", url: "https://www.dwds.de/wb/Tomate", art: "woerterbuch", sp: "DE", info: "Немецкий словарь с историей слова." },
    { t: "„tomato“ – Etymonline", url: "https://www.etymonline.com/word/tomato", art: "woerterbuch", sp: "EN", info: "Английский этимологический словарь: tomatl, «the swelling fruit»." },
    { t: "Tomate – Wikipedia", url: "https://de.wikipedia.org/wiki/Tomate", art: "lexikon", sp: "DE", info: "Растение, история, сорта." },
    { t: "Томат – Википедия", url: "https://ru.wikipedia.org/wiki/Томат", art: "lexikon", sp: "RU", info: "То же по-русски." },
    { t: "Videos: Geschichte der Tomate", url: "https://www.youtube.com/results?search_query=Geschichte+der+Tomate+Doku", art: "video", sp: "DE", info: "Поиск документальных фильмов на YouTube." },
    { t: "Видео: история помидора", url: "https://www.youtube.com/results?search_query=история+помидора+как+томат+попал+в+Европу", art: "video", sp: "RU", info: "Поиск видео на YouTube по-русски." }
  ],
  raetsel: { frage: "Почему итальянцы называют помидор «золотым яблоком» – pomodoro, – если он красный?", antwort: "Первые томаты, которые увидели в Европе, часто были **жёлтые**, золотистые. Маттиоли в 1554 году писал: у одних растений плоды золотые, у других красные." }
}

];
