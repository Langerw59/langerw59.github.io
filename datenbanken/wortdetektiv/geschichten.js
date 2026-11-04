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
//   kurz      – ein Satz, worum es geht (RU)
//   text      – Absätze (RU, Fachwörter auf Deutsch); **fett**, [[ort:id|Name]]
//   spuren    – Wort-Spuren: [Wort, Erklärung]  (родственные слова, «улики»)
//   orte      – { id: { name, lat, lng, info } }
//   wege      – [ [von, nach, Beschriftung] ]   (стрелки на карте)
//   links     – [ { t: Titel, url, art: "lexikon|woerterbuch|video|karte", sp: "DE|RU|EN", info } ]
//   raetsel   – { frage, antwort }
// Neue Geschichten einfach unten anhängen.
// ============================================================
window.WORTDETEKTIV = [

{
  id: "english",
  titel: "English – wie die Angeln England ihren Namen gaben",
  ru: "Как англы из Шлезвиг-Гольштейна дали имя Англии",
  wort: "English / England",
  h: "germ",
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
}

];
