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
  { id: "werkstatt", icon: "🧰", de: "Werkstatt & Bau",             ru: "мастерская и стройка" },  // 2026-11-05
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
    "Около **410 года** римляне ушли из [[lex:britannia|Британии]]. Вскоре через [[lex:nordsee|Северное море]] туда начали переселяться германские племена. По преданию, которое записал монах **[[lex:beda|Беда Достопочтенный]]** (Beda Venerabilis, 731 г.), первые пришли в **449 году**.",
    "Пришли три главных племени: **[[lex:angeln_volk|англы (Angeln)]]** – с полуострова [[ort:angeln|Angeln]] между [[ort:flensburg|Flensburg]] и [[ort:schleswig|Schleswig]]; **[[lex:sachsen_volk|саксы (Sachsen)]]** – с земель между [[lex:elbe|Эльбой]] и [[lex:weser|Везером]], [[ort:sachsen|Niedersachsen]]; **[[lex:jueten|юты (Jüten)]]** – из [[ort:juetland|Jütland]], нынешней [[lex:daenemark|Дании]].",
    "Беда пишет, что англы ушли почти все – их старая родина Angeln после этого долго стояла полупустой. В Британии они осели на востоке и севере: [[ort:eastanglia|East Anglia]], [[ort:northumbria|Northumbria]]. Саксы – на юге: [[ort:wessex|Wessex]]. Юты – в [[ort:kent|Kent]].",
    "От англов – имя всей страны: [[lex:altenglisch|древнеангл.]] **Engla land** «земля англов» → **England**, а **Englisc** → **English**. Саксы остались в названиях графств: **[[lex:essex|Essex]]** = East Saxons (восточные саксы), **[[lex:sussex|Sussex]]** = South Saxons (южные), **[[lex:wessex|Wessex]]** = West Saxons (западные).",
    "Поэтому английский – **германский язык**, родня немецкому: Haus – house, Wasser – water, Hand – hand, gut – good, Vater – father.",
    "**Важная поправка:** немцев как народа тогда ещё не было. Были германские племена – и от них потом произошли и немцы, и англичане, и голландцы, и датчане. Так что англичане немцам – как **двоюродные братья**.",
    "А кто жил в Британии до них? **[[lex:kelten|Кельты]] ([[lex:briten|бритты]])**. Их язык сохранился в [[lex:wales|Уэльсе]] ([[lex:walisisch|валлийский]]) и [[lex:schottland|Шотландии]]. Потом в английский пришли слова **[[lex:wikinger|викингов]]** (sky, egg, they) и в [[lex:normannen1066|1066 году]] – **[[lex:normannen|французов-норманнов]]** (поэтому столько «умных» французских слов, как engagement)."
  ],
  spuren: [
    ["Angeln (Landschaft)", "Одна из версий: от германского *angul «крючок» (нем. die Angel – удочка, крючок) – по изогнутой форме земли или узкой бухты Schlei. Это гипотеза, не точно."],
    ["England", "Engla land – «земля англов»."],
    ["Essex · Sussex · Wessex", "East / South / West + Seax (саксы). Саксы – возможно, от Sax «нож, короткий меч»."],
    ["die Anglistik", "Нем. «наука об английском языке» – от лат. Angli «англы»."]
  ],
  orte: {
    angeln:     { name: "Angeln", lat: 54.70, lng: 9.75, info: "Полуостров в Шлезвиг-Гольштейне. Родина англов.", wiki: "Angeln (Halbinsel)", wikiRu: "Ангельн" },
    flensburg:  { name: "Flensburg", lat: 54.78, lng: 9.44, info: "Город на Фленсбургской бухте, на краю Angeln.", wiki: "Flensburg", wikiRu: "Фленсбург" },
    schleswig:  { name: "Schleswig", lat: 54.52, lng: 9.56, info: "Город на заливе Schlei. Рядом – Haithabu, древний город викингов.", wiki: "Schleswig", wikiRu: "Шлезвиг (город)" },
    juetland:   { name: "Jütland", lat: 56.20, lng: 9.20, info: "Полуостров Ютландия (Дания) – родина ютов.", wiki: "Jütland", wikiRu: "Ютландия" },
    sachsen:    { name: "Land der Sachsen", lat: 53.30, lng: 8.80, info: "Между Эльбой и Везером – откуда пришли саксы (нынешняя Нижняя Саксония).", wiki: "Niedersachsen", wikiRu: "Нижняя Саксония" },
    eastanglia: { name: "East Anglia", lat: 52.65, lng: 1.10, info: "«Восточная Англия» – здесь осели англы.", wiki: "East Anglia", wikiRu: "Восточная Англия" },
    northumbria:{ name: "Northumbria", lat: 55.00, lng: -1.70, info: "Королевство англов на севере – «к северу от реки Humber».", wiki: "Northumbria", wikiRu: "Нортумбрия" },
    wessex:     { name: "Wessex", lat: 51.10, lng: -1.80, info: "Королевство западных саксов. Отсюда позже объединили Англию.", wiki: "Wessex", wikiRu: "Уэссекс" },
    kent:       { name: "Kent", lat: 51.20, lng: 0.90, info: "Сюда пришли юты. По преданию – первыми, в 449 году.", wiki: "Kent", wikiRu: "Кент" }
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
  wort: "der Detektiv / detective",
  h: "lat",
  thema: "woerter",
  kurz: "Слово пришло в немецкий из английского, а туда – из латыни. И оно родня немецкому «Dach»!",
  text: [
    "**der Detektiv** – не немецкое слово. В немецкий оно пришло в **XIX веке из английского** detective. В [[lex:london|Лондоне]] около **1828 года** появилась «detective police» – полиция, которая раскрывает преступления. Потом осталось одно слово: detective.",
    "Английское detect «обнаружить, раскрыть» – из [[lex:latein|латыни]]: **detegere** = **de-** «прочь, с» + **tegere** «покрывать». То есть буквально: **снять покров, раскрыть то, что спрятано**.",
    "А теперь самое интересное. Латинское **tegere** и немецкое **das Dach** (крыша) – из одного очень древнего ([[lex:indogermanisch|индоевропейского]]) корня **steg- «покрывать»**. [[lex:roemer|Римляне]] говорили tegere, [[lex:germanen|германцы]] – das Dach. Значит, **der Detektiv – это «тот, кто снимает крышу»** и смотрит, что под ней.",
    "Из того же латинского корня – **tegula** «черепица» → немецкое **der Ziegel** (кирпич, черепица) и английское **tile** (плитка). А **protegere** «прикрыть спереди» → **der Protektor, die Protektion** (протекция – когда тебя «прикрывают»).",
    "Так что **der Wortdetektiv** (словодетектив) – это тот, кто снимает «крышу» со слова и смотрит, что у него внутри."
  ],
  spuren: [
    ["das Dach (DE) · thatch (EN)", "Германские родственники tegere: нем. das Dach – крыша, англ. thatch – соломенная крыша, deck – палуба (то, что покрывает корабль)."],
    ["der Ziegel · tile", "Лат. tegula «черепица» (то, чем кроют) → нем. der Ziegel, англ. tile."],
    ["der Protektor · die Protektion", "Лат. protegere «прикрывать спереди». Протекция – «прикрытие»."],
    ["detektieren", "В технике: обнаруживать (der Metalldetektor – металлоискатель, «снимает покров» с земли)."]
  ],
  orte: {},
  wege: [],
  links: [
    { t: "„Detektiv“ im DWDS", url: "https://www.dwds.de/wb/Detektiv", art: "woerterbuch", sp: "DE", info: "Немецкий словарь: значение и история." },
    { t: "„detective“ – Etymonline", url: "https://www.etymonline.com/word/detective", art: "woerterbuch", sp: "EN", info: "Английский этимологический словарь: 1828, detective police." },
    { t: "„Dach“ im DWDS", url: "https://www.dwds.de/wb/Dach", art: "woerterbuch", sp: "DE", info: "Происхождение слова Dach – там же корень «покрывать»." }
  ],
  raetsel: { frage: "Какое немецкое слово, которое вы видите каждый день, – «двоюродный брат» слова Detektiv?", antwort: "das Dach (крыша)! И ещё der Ziegel (черепица) – через латинское tegula." }
},

{
  id: "tomate",
  titel: "Tomate – die „anschwellende Frucht“ der Azteken",
  ru: "Помидор – «набухающий плод» ацтеков, «золотое яблоко» итальянцев",
  wort: "die Tomate / tomato / помидор",
  h: "amerika",
  thema: "pflanzen",
  kurz: "Одно растение – два имени: «томат» пришёл от ацтеков через Испанию, а «помидор» – от итальянского «золотого яблока».",
  text: [
    "Дикий [[lex:tomate|томат]] родом из [[ort:anden|Anden]] ([[lex:anden|Анды]]) – гор [[lex:peru|Перу]] и [[lex:ecuador|Эквадора]]. Там он рос маленькими ягодками, как смородина, и его почти не ели.",
    "Кто там жил? В Андах издавна жили индейские народы – [[lex:quechua|кечуа (Quechua)]] и [[lex:aymara|аймара (Aymara)]]. В XV веке здесь возникла огромная империя [[lex:inka|инков (Inka)]] со столицей [[ort:cusco|Cusco]]. Но, насколько известно, томат инки не выращивали – культурным растением он стал далеко на севере, в [[lex:mexiko|Мексике]].",
    "Настоящим овощем его сделали в Мексике. [[lex:azteken|Ацтеки]] в [[ort:tenochtitlan|Tenochtitlan]] (сегодня [[lex:mexikostadt|Mexiko-Stadt]]) называли его на своём языке [[lex:nahuatl|науатль]] **[[ton:es|tomatl]]** – по одному толкованию «набухающий плод» (от tomana «набухать»). Был и вариант **xitomatl**.",
    "В **1519–1521 годах** испанцы во главе с **[[lex:cortes|Эрнаном Кортесом]]** [[lex:eroberung|завоевали царство ацтеков]]. Корабли из Америки приходили в [[ort:sevilla|Sevilla]]. Испанцы переделали слово под себя: **[[ton:es|tomate]]**. Из испанского – французское **[[ton:fr|tomate]]**, а оттуда немецкое **die [[ton:de|Tomate]]**.",
    "Самое раннее описание томата в Европе – у итальянского врача **[[lex:mattioli|Пьетро Андреа Маттиоли]]** в **1544 году**, в книге, напечатанной в [[ort:venedig|Venedig]]. Имени он ещё не дал – назвал «новым видом баклажана» и написал, что его жарят в масле с солью и перцем. Растения тогда выращивали в первом [[lex:ortobotanico_pisa|университетском ботаническом саду]] в [[ort:pisa|Pisa]].",
    "В **1554 году** Маттиоли пишет: в народе их зовут **[[ton:it|pomi d'oro]]** – «золотые яблоки». Первые томаты в Европе часто были **жёлтые**, золотые! Отсюда итальянское **[[ton:it|pomodoro]]** – и наше русское **[[ton:ru|помидор]]**. В том же году фламандский врач **[[lex:dodoens|Додунс]]** в [[ort:antwerpen|Antwerpen]] переводит это как «gulden appelen» – тоже «золотые яблоки».",
    "Север Европы томата **боялся**. Он из семейства паслёновых (**die [[lex:nachtschatten|Nachtschattengewächse]]**) – как ядовитые [[lex:belladonna|белладонна]] и [[lex:stechapfel|дурман]]. Поэтому долго его держали как **декоративное растение** в саду, а не на столе. Смелее всех были на юге Италии – в [[ort:neapel|Neapel]], который тогда принадлежал Испании.",
    "Отсюда и другие красивые имена: французское **[[ton:fr|pomme d'amour]]** – «яблоко любви», немецкое **der [[ton:de|Liebesapfel]]**, а в Австрии и сегодня – **der [[ton:de|Paradeiser]]**, «райское яблоко» ([[ort:wien|Wien]]).",
    "Учёный **[[lex:linne|Карл Линней]]** в **1753 году** дал томату латинское имя **[[ton:la|Solanum lycopersicum]]**: lycopersicum – от греческого **lykos** «волк» + **persikon** «персик», то есть «волчий персик». Слово **die Tomate** впервые появилось в немецком орфографическом словаре [[lex:duden|Duden]] в **1897 году**.",
    "В Россию томат пришёл, по распространённому рассказу, в **XVIII веке** – тоже сначала как диковинка. Поэтому у нас два слова: **томат** (как у ацтеков и испанцев) и **помидор** (как у итальянцев)."
  ],
  spuren: [
    ["tomatl · xitomatl", "Науатль, язык ацтеков. Толкование «набухающий плод» (tomana «набухать») – распространённое, но не единственное."],
    ["die Schokolade · der Kakao", "Тоже от ацтеков: науатль **xocolatl** и **cacahuatl**. Через испанский chocolate, cacao."],
    ["die Avocado · der Chili · der Kojote", "Науатль **āhuacatl**, **chīlli**, **coyōtl** – ещё «ацтекские» слова в немецком и русском (авокадо, чили, койот)."],
    ["pomodoro · помидор", "Итал. pomo d'oro «золотое яблоко»: pomo (лат. pomum «плод», нем. die Pomologie – наука о плодах) + oro (лат. aurum «золото»)."],
    ["der Paradeiser", "Австрийское слово: Paradeisapfel → Paradeiser, «райское яблоко»."],
    ["der Nachtschatten · Solanum", "Паслёновые: томат, картофель, баклажан, перец. Нем. die Nachtschattengewächse, лат. Solanaceae."]
  ],
  orte: {
    anden:        { name: "Anden (Peru / Ecuador)", lat: -6.5, lng: -78.5, info: "Родина дикого томата: маленькие ягоды на склонах гор.", wiki: "Anden", wikiRu: "Анды" },
    tenochtitlan: { name: "Tenochtitlan", lat: 19.43, lng: -99.13, info: "Столица ацтеков на озере. Сегодня здесь Mexiko-Stadt. Здесь томат – tomatl.", wiki: "Tenochtitlan", wikiRu: "Теночтитлан" },
    sevilla:      { name: "Sevilla", lat: 37.39, lng: -5.99, info: "Главный порт для кораблей из Америки. Испанцы: tomate.", wiki: "Sevilla", wikiRu: "Севилья" },
    pisa:         { name: "Pisa", lat: 43.72, lng: 10.40, info: "Первый университетский ботанический сад Европы (Luca Ghini, 1544). Здесь росли одни из первых томатов.", wiki: "Pisa", wikiRu: "Пиза" },
    venedig:      { name: "Venedig", lat: 45.44, lng: 12.33, info: "Здесь печатали книгу Маттиоли – первое описание томата (1544), потом имя pomi d'oro (1554).", wiki: "Venedig", wikiRu: "Венеция" },
    antwerpen:    { name: "Antwerpen", lat: 51.22, lng: 4.40, info: "Додунс, 1554: первая книга с рисунком томата – «gulden appelen», золотые яблоки.", wiki: "Antwerpen", wikiRu: "Антверпен" },
    neapel:       { name: "Neapel", lat: 40.85, lng: 14.27, info: "Юг Италии, тогда под властью Испании. Здесь томат раньше всех стал едой – потом соус к пасте и пицце.", wiki: "Neapel", wikiRu: "Неаполь" },
    cusco:        { name: "Cusco", lat: -13.53, lng: -71.97, info: "Столица империи инков в Андах (XV–XVI век).", wiki: "Cusco", wikiRu: "Куско" },
    wien:         { name: "Wien", lat: 48.21, lng: 16.37, info: "В Австрии томат и сегодня – Paradeiser, «райское яблоко».", wiki: "Wien", wikiRu: "Вена" },
    petersburg:   { name: "Sankt Petersburg", lat: 59.94, lng: 30.31, info: "В России томат – с XVIII века, сначала как диковинка. Два имени: томат и помидор.", wiki: "Sankt Petersburg", wikiRu: "Санкт-Петербург" }
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
,

// 2026-11-11: try und Trier – falsche Verwandte / ложные родственники
{
  id: "try-trier",
  titel: "try und Trier – ähnlich, aber nicht verwandt",
  ru: "try и Trier – похожи, но не родственники",
  wort: "try / trier (FR) / Trier",
  h: "frz",
  thema: "woerter",
  kurz: "Английское try пришло из французского trier «отбирать», а город Trier назван по кельтскому племени треверов. Сходство – случайность.",
  text: [
    "Английское **[[ton:en|try]]** («пробовать») пришло из старофранцузского **[[ton:fr|trier]]** – «отбирать, отделять, просеивать». Сначала try и значило: отделить хорошее от плохого. Отсюда «проверять», а потом – «пробовать».",
    "Французские слова попали в английский после **1066 года**, когда [[lex:normannen1066|нормандцы]] из [[ort:rouen|Rouen]] (Нормандия) завоевали Англию. Знать в [[ort:london|London]] долго говорила по-французски, и тысячи слов остались в английском навсегда.",
    "Откуда само trier – точно не известно. Возможно, от позднелатинского слова, но учёные спорят. Во французском оно живёт и сегодня: **[[ton:fr|le tri sélectif]]** – раздельный сбор мусора.",
    "А **[[ort:trier|Trier]]** на Мозеле – один из старейших городов Германии. Около **16 года до н. э.** римляне при императоре [[lex:augustus|Августе]] основали здесь город **[[ton:la|Augusta Treverorum]]** – «Августа у треверов». **Die [[lex:treverer|Treverer]]** – племя, которое жило в долине [[lex:mosel|Мозеля]]; их обычно считают кельтами.",
    "Позже от длинного римского имени осталось только **Treveris**, а из него – **Trier**. Самый известный памятник тех времён – римские ворота **die [[lex:porta_nigra|Porta Nigra]]**.",
    "Лучшее доказательство, что это разные слова: по-французски город Trier называется **[[ton:fr|Trèves]]** – совсем не похоже на глагол trier!"
  ],
  spuren: [
    ["try · trial", "Англ. trial – «проба, испытание» и «суд» (дело проверяют). Тот же корень."],
    ["die Triage", "Нем. и франц.: сортировка раненых по тяжести – от того же trier «отбирать»."],
    ["le tri · trier (FR)", "Франц. «сортировка, сортировать» – сегодня так говорят о мусоре и о почте."],
    ["Trèves (FR) · Treviri (IT)", "Так называют Trier во Франции и в Италии – видно имя треверов."]
  ],
  orte: {
    trier:  { name: "Trier", lat: 49.75, lng: 6.64, info: "Augusta Treverorum, основан римлянами около 16 г. до н. э. Porta Nigra.", wiki: "Trier", wikiRu: "Трир" },
    rouen:  { name: "Rouen (Normandie)", lat: 49.44, lng: 1.10, info: "Столица Нормандии. Отсюда в 1066 году нормандцы пошли на Англию – с французским языком.", wiki: "Rouen", wikiRu: "Руан" },
    london: { name: "London", lat: 51.51, lng: -0.13, info: "После 1066 года здесь при дворе говорили по-французски. Так trier стало английским try.", wiki: "London", wikiRu: "Лондон" }
  },
  wege: [
    ["rouen", "london", "trier → try (nach 1066)"]
  ],
  links: [
    { t: "„try“ – Etymonline", url: "https://www.etymonline.com/word/try", art: "woerterbuch", sp: "EN", info: "Английский этимологический словарь: от старофранцузского trier." },
    { t: "Trier – Wikipedia", url: "https://de.wikipedia.org/wiki/Trier", art: "lexikon", sp: "DE", info: "История города, Augusta Treverorum." },
    { t: "Трир – Википедия", url: "https://ru.wikipedia.org/wiki/Трир", art: "lexikon", sp: "RU", info: "То же по-русски." },
    { t: "Treverer – Wikipedia", url: "https://de.wikipedia.org/wiki/Treverer", art: "lexikon", sp: "DE", info: "Племя, давшее имя городу." }
  ],
  raetsel: { frage: "Как по-французски называется город Trier – и почему это доказывает, что try тут ни при чём?", antwort: "**Trèves** – от имени треверов. А глагол «отбирать» по-французски – trier. Будь это одно слово, город назывался бы так же." }
}

];

// ------------------------------------------------------------
// Lexikon für Links im Text / словарь ссылок: [[lex:id|Text]]
// Klick → Wikipedia Deutsch oder Russisch. de / ru = Titel des Artikels.
// Neue Namen einfach hier ergänzen.
// ------------------------------------------------------------
window.WORTDETEKTIV_LEXIKON = {
  // Völker & Geschichte
  beda:         { de: "Beda Venerabilis", ru: "Беда Достопочтенный" },
  britannia:    { de: "Britannia", ru: "Римская Британия" },
  angeln_volk:  { de: "Angeln (Volk)", ru: "Англы" },
  sachsen_volk: { de: "Sachsen (Volk)", ru: "Саксы" },
  jueten:       { de: "Jüten", ru: "Юты" },
  altenglisch:  { de: "Altenglische Sprache", ru: "Древнеанглийский язык" },
  kelten:       { de: "Kelten", ru: "Кельты" },
  briten:       { de: "Briten (Volk)", ru: "Бритты" },
  walisisch:    { de: "Walisische Sprache", ru: "Валлийский язык" },
  wikinger:     { de: "Wikinger", ru: "Викинги" },
  normannen:    { de: "Normannen", ru: "Норманны" },
  normannen1066:{ de: "Normannische Eroberung Englands", ru: "Нормандское завоевание Англии" },
  roemer:       { de: "Römisches Reich", ru: "Римская империя" },
  germanen:     { de: "Germanen", ru: "Германцы" },
  latein:       { de: "Latein", ru: "Латинский язык" },
  indogermanisch:{ de: "Indogermanische Ursprache", ru: "Праиндоевропейский язык" },
  azteken:      { de: "Azteken", ru: "Ацтеки" },
  nahuatl:      { de: "Nahuatl", ru: "Науатль" },
  cortes:       { de: "Hernán Cortés", ru: "Кортес, Эрнан" },
  eroberung:    { de: "Spanische Eroberung des Aztekenreiches", ru: "Испанское завоевание империи ацтеков" },
  inka:         { de: "Inka", ru: "Инки" },
  quechua:      { de: "Quechua (Volk)", ru: "Кечуа (народ)" },
  aymara:       { de: "Aymara (Volk)", ru: "Аймара" },
  // Länder, Orte, Natur
  nordsee:      { de: "Nordsee", ru: "Северное море" },
  elbe:         { de: "Elbe", ru: "Эльба" },
  weser:        { de: "Weser", ru: "Везер" },
  daenemark:    { de: "Dänemark", ru: "Дания" },
  essex:        { de: "Essex", ru: "Эссекс" },
  sussex:       { de: "Sussex", ru: "Суссекс" },
  wessex:       { de: "Wessex", ru: "Уэссекс" },
  wales:        { de: "Wales", ru: "Уэльс" },
  schottland:   { de: "Schottland", ru: "Шотландия" },
  london:       { de: "London", ru: "Лондон" },
  anden:        { de: "Anden", ru: "Анды" },
  peru:         { de: "Peru", ru: "Перу" },
  ecuador:      { de: "Ecuador", ru: "Эквадор" },
  mexiko:       { de: "Mexiko", ru: "Мексика" },
  mexikostadt:  { de: "Mexiko-Stadt", ru: "Мехико" },
  ortobotanico_pisa: { de: "Botanischer Garten Pisa", ru: "Ботанический сад Пизы" },
  // Menschen
  mattioli:     { de: "Pietro Andrea Mattioli", ru: "Маттиоли, Пьетро Андреа" },
  dodoens:      { de: "Rembert Dodoens", ru: "Додунс, Ремберт" },
  linne:        { de: "Carl von Linné", ru: "Линней, Карл" },
  // Pflanzen, Bücher
  tomate:       { de: "Tomate", ru: "Томат" },
  nachtschatten:{ de: "Nachtschattengewächse", ru: "Паслёновые" },
  belladonna:   { de: "Schwarze Tollkirsche", ru: "Красавка" },
  stechapfel:   { de: "Gemeiner Stechapfel", ru: "Дурман обыкновенный" },
  duden:        { de: "Duden", ru: "Дуден (словарь)" },
  // 2026-11-11: try und Trier
  augustus:     { de: "Augustus", ru: "Октавиан Август" },
  treverer:     { de: "Treverer", ru: "Треверы" },
  mosel:        { de: "Mosel", ru: "Мозель" },
  porta_nigra:  { de: "Porta Nigra", ru: "Порта Нигра" }
};
