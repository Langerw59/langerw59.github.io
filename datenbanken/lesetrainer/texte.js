// ============================================================
// Lese-Trainer – Texte / тексты для чтения
// 2026-11-14 · geschrieben mit Claude
// DE: Kurze englische Texte (A1), Zeile für Zeile:
//     en – Englisch, wort – дословно (RU, Wort für Wort), ru – по-русски, de – Deutsch
// RU: Короткие тексты A1, строка за строкой. Новые тексты – просто добавить внизу.
// Felder: id, titel (DE), titel_en, stufe, info (Hinweis, RU), zeilen: [[en, wort, ru, de], …]
//   wort = "" → дословно совпадает с нормальным переводом
// ============================================================
window.LESETEXTE = [

{ id: "mein_tag", titel: "Mein Tag", titel_en: "My Day", stufe: "A1",
  info: "Простое настоящее время: I get up, I drink, I learn. Ориентир: «каждый день / обычно».",
  zeilen: [
  ["My name is Wladimir.", "Моё имя есть Владимир.", "Меня зовут Владимир.", "Ich heiße Wladimir."],
  ["I live in Willich.", "", "Я живу в Willich.", "Ich wohne in Willich."],
  ["I get up at seven o'clock.", "Я встаю вверх в семь от часов.", "Я встаю в семь часов.", "Ich stehe um sieben Uhr auf."],
  ["I drink a cup of coffee.", "Я пью одну чашку от кофе.", "Я выпиваю чашку кофе.", "Ich trinke eine Tasse Kaffee."],
  ["Then I learn English for thirty minutes.", "Тогда я учу английский для тридцати минут.", "Потом я полчаса учу английский.", "Dann lerne ich dreißig Minuten Englisch."],
  ["In the afternoon I work in the garden.", "В том после-полудне я работаю в том саду.", "Днём я работаю в саду.", "Am Nachmittag arbeite ich im Garten."],
  ["In the evening my wife and I watch TV.", "В том вечере моя жена и я смотрим ТВ.", "Вечером мы с женой смотрим телевизор.", "Am Abend sehen meine Frau und ich fern."],
  ["I go to bed at eleven o'clock.", "Я иду в кровать в одиннадцать от часов.", "Я ложусь спать в одиннадцать.", "Ich gehe um elf Uhr ins Bett."]
]},

{ id: "cafe", titel: "Im Café", titel_en: "At the Café", stufe: "A1",
  info: "Вежливые фразы: I'd like … (я бы хотел), Can I …? (можно мне …?).",
  zeilen: [
  ["A man goes into a café.", "Один мужчина идёт внутрь одного кафе.", "Мужчина заходит в кафе.", "Ein Mann geht in ein Café."],
  ["\"Good morning! A table for one, please.\"", "«Хорошее утро! Один стол для одного, пожалуйста.»", "«Доброе утро! Столик на одного, пожалуйста.»", "„Guten Morgen! Einen Tisch für eine Person, bitte.“"],
  ["The waiter brings the menu.", "Тот официант приносит то меню.", "Официант приносит меню.", "Der Kellner bringt die Speisekarte."],
  ["\"What would you like?\"", "«Что бы вы любили?»", "«Что желаете?»", "„Was möchten Sie?“"],
  ["\"I'd like a coffee and a piece of cake.\"", "«Я бы любил один кофе и один кусок от пирога.»", "«Мне кофе и кусочек торта.»", "„Ich möchte einen Kaffee und ein Stück Kuchen.“"],
  ["\"With milk?\" – \"Yes, please. No sugar.\"", "«С молоком?» – «Да, пожалуйста. Никакой сахар.»", "«С молоком?» – «Да, пожалуйста. Без сахара.»", "„Mit Milch?“ – „Ja, bitte. Ohne Zucker.“"],
  ["The cake is very good.", "Тот пирог есть очень хороший.", "Торт очень вкусный.", "Der Kuchen ist sehr gut."],
  ["\"The check, please. Can I pay by card?\"", "«Тот чек, пожалуйста. Могу я платить через карту?»", "«Счёт, пожалуйста. Можно картой?»", "„Die Rechnung, bitte. Kann ich mit Karte zahlen?“"]
]},

{ id: "wohnwagen", titel: "Mit dem Wohnwagen", titel_en: "With the Caravan", stufe: "A1",
  info: "in summer / in the evening – «летом / вечером»: по-английски с предлогом in и артиклем the.",
  zeilen: [
  ["In summer we travel with our caravan.", "В лете мы путешествуем с нашим жилым прицепом.", "Летом мы путешествуем с жилым прицепом.", "Im Sommer reisen wir mit unserem Wohnwagen."],
  ["Our grandchildren come with us.", "Наши внуки приходят с нами.", "Внуки едут с нами.", "Unsere Enkel kommen mit."],
  ["We drive to Italy.", "Мы едем к Италии.", "Мы едем в Италию.", "Wir fahren nach Italien."],
  ["The campsite is near the sea.", "Тот кемпинг есть близко того моря.", "Кемпинг находится у моря.", "Der Campingplatz ist am Meer."],
  ["Every morning we swim in the sea.", "Каждое утро мы плаваем в том море.", "Каждое утро мы купаемся в море.", "Jeden Morgen schwimmen wir im Meer."],
  ["In the evening we sit outside and eat pizza.", "В том вечере мы сидим снаружи и едим пиццу.", "Вечером мы сидим на улице и едим пиццу.", "Am Abend sitzen wir draußen und essen Pizza."],
  ["The children are happy.", "Те дети есть счастливые.", "Дети довольны.", "Die Kinder sind glücklich."],
  ["After two weeks we drive home.", "После двух недель мы едем домой.", "Через две недели мы едем домой.", "Nach zwei Wochen fahren wir nach Hause."]
]},

{ id: "fuchs", titel: "Der Fuchs und die Trauben", titel_en: "The Fox and the Grapes", stufe: "A1",
  info: "Басня Эзопа (у Крылова – «Лиса и виноград»). Отсюда выражение «sour grapes» – «зелен виноград».",
  zeilen: [
  ["It is a hot day.", "Оно есть один горячий день.", "Жаркий день.", "Es ist ein heißer Tag."],
  ["A fox is hungry and thirsty.", "Одна лиса есть голодная и жаждущая.", "Лиса голодна, и ей хочется пить.", "Ein Fuchs hat Hunger und Durst."],
  ["He sees grapes high up on a vine.", "Он видит виноград высоко вверху на одной лозе.", "Он видит виноград высоко на лозе.", "Er sieht Trauben hoch oben an einer Rebe."],
  ["He jumps, but he can't reach them.", "Он прыгает, но он не может достать их.", "Он прыгает, но не может достать.", "Er springt, aber er kann sie nicht erreichen."],
  ["He jumps again and again.", "Он прыгает снова и снова.", "Он прыгает ещё и ещё.", "Er springt immer wieder."],
  ["Then he goes away and says:", "Тогда он идёт прочь и говорит:", "Потом он уходит и говорит:", "Dann geht er weg und sagt:"],
  ["\"The grapes are sour. I don't want them.\"", "«Те виноградины есть кислые. Я не делаю хотеть их.»", "«Виноград зелёный, кислый. Не нужен он мне.»", "„Die Trauben sind sauer. Ich will sie nicht.“"],
  ["Some people are like the fox.", "Некоторые люди есть как та лиса.", "Некоторые люди похожи на эту лису.", "Manche Menschen sind wie der Fuchs."]
]},

{ id: "vaterunser", titel: "Das Vaterunser", titel_en: "The Lord's Prayer", stufe: "A2",
  info: "Старинный английский: thy = your (твой), art = are (еси). Немецкий – экуменический текст, русский – синодальный перевод.",
  zeilen: [
  ["Our Father, who art in heaven,", "Наш Отец, который еси в небесах,", "Отче наш, сущий на небесах!", "Vater unser im Himmel,"],
  ["hallowed be thy name;", "освящённое будь твоё имя;", "да святится имя Твоё;", "geheiligt werde dein Name."],
  ["thy kingdom come;", "твоё царство приди;", "да приидет Царствие Твоё;", "Dein Reich komme."],
  ["thy will be done", "твоя воля будь сделана", "да будет воля Твоя", "Dein Wille geschehe,"],
  ["on earth as it is in heaven.", "на земле, как оно есть на небесах.", "и на земле, как на небе;", "wie im Himmel, so auf der Erde."],
  ["Give us this day our daily bread.", "Дай нам этот день наш ежедневный хлеб.", "хлеб наш насущный дай нам на сей день;", "Unser tägliches Brot gib uns heute."],
  ["And forgive us our trespasses,", "И прости нам наши проступки,", "и прости нам долги наши,", "Und vergib uns unsere Schuld,"],
  ["as we forgive those who trespass against us.", "как мы прощаем тех, кто проступает против нас.", "как и мы прощаем должникам нашим;", "wie auch wir vergeben unseren Schuldigern."],
  ["And lead us not into temptation,", "И веди нас не внутрь искушения,", "и не введи нас в искушение,", "Und führe uns nicht in Versuchung,"],
  ["but deliver us from evil.", "но избавь нас от зла.", "но избавь нас от лукавого.", "sondern erlöse uns von dem Bösen."]
]}

];
