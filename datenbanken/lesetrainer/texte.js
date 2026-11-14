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
]},

// 2026-11-14: Lafontaine – Der Hahn und der Fuchs (dt. Text: Projekt Gutenberg, gemeinfrei)
{
 "id": "hahn_fuchs_gutenberg",
 "versteckt": true,
 "titel": "Der Hahn und der Fuchs (Gutenberg-Übersetzung)",
 "titel_en": "The Rooster and the Fox",
 "stufe": "B1",
 "info": "Лафонтен, «Le Coq et le Renard». Немецкий – старый перевод (Projekt Gutenberg), не тот, что вы учили. Английский – простой построчный перевод для учёбы. Старые слова: das Windspiel = борзая; «hast du nicht gesehn» = в мгновение ока; der Strolch = бродяга, негодяй. Нажмите на немецкую строку – она тоже прозвучит.",
 "haupt": "de",
 "zeilen": [
  [
   "On a branch, to guard the hens, there sat",
   "",
   "На ветке, чтобы стеречь кур, сидел",
   "Auf einem Aste saß, die Hühner zu bewachen,"
  ],
  [
   "an old and very clever rooster.",
   "",
   "старый, очень хитрый петух.",
   "Ein alter sehr gewitzter Hahn."
  ],
  [
   "\"Little brother,\" said the fox, all gentle and kind,",
   "",
   "«Братец, — сказал Лис, сама кротость, —",
   "»Brüderchen« sprach der Fuchs, mit Sanftmut angetan"
  ],
  [
   "\"let us finally make peace today,",
   "",
   "давай сегодня наконец помиримся,",
   "»Laß heut uns endlich Frieden machen,"
  ],
  [
   "no more fighting between us from now on!",
   "",
   "отныне никаких ссор между нами!",
   "Kein Streit sei zwischen uns fortan!"
  ],
  [
   "I bring you the news. Come down, let me kiss you,",
   "",
   "Я несу тебе эту весть. Спускайся, дай тебя поцеловать,",
   "Ich bring' die Botschaft dir. Komm 'runter, laß dich küssen,"
  ],
  [
   "but quickly, please, because you must know,",
   "",
   "только, пожалуйста, быстро: ведь знай,",
   "Doch, bitte, schnell; denn du mußt wissen,"
  ],
  [
   "I still have twenty messages to bring today.",
   "",
   "мне сегодня ещё двадцать вестей разнести.",
   "An zwanzig Meldungen hab' ich heut noch zu tun."
  ],
  [
   "You chickens can now, without any worry,",
   "",
   "Вы, куриный народ, теперь можете без забот",
   "Ihr Hühnervolk könnt sorglos nun"
  ],
  [
   "go back to your business;",
   "",
   "снова заниматься своими делами;",
   "Nachgehen wieder den Geschäften;"
  ],
  [
   "if you like, we will help you all we can.",
   "",
   "захотите – мы вам поможем, чем сможем.",
   "Wollt ihr's, wir helfen euch nach Kräften."
  ],
  [
   "That is how it will be from today;",
   "",
   "Так будет отныне;",
   "So soll es sein von heute ab;"
  ],
  [
   "but you – come down quickly now,",
   "",
   "а ты спускайся скорее,",
   "Du aber komm' jetzt schnell herab,"
  ],
  [
   "so that we can give each other a brother's kiss.\"",
   "",
   "чтобы нам обменяться братским поцелуем».",
   "Daß wir den Bruderkuß uns geben.«"
  ],
  [
   "\"Friend,\" the rooster answered, \"with greater joy",
   "",
   "«Друг, — ответил петух, — с бо́льшим удовольствием",
   "»»Freund«« sagte drauf der Hahn »»mit größerem Genuß"
  ],
  [
   "I have never heard any news in my life",
   "",
   "я ещё никогда в жизни не слышал вести,",
   "hab' eine Botschaft ich noch nie gehört im Leben,"
  ],
  [
   "than this one –",
   "",
   "чем эта —",
   "Als eben"
  ],
  [
   "the peace treaty;",
   "",
   "заключение мира;",
   "Den Friedensschluß;"
  ],
  [
   "and that it comes to me",
   "",
   "а то, что она пришла",
   "Und daß sie grad' aus deinem Munde"
  ],
  [
   "from your mouth makes me twice as happy. As I just saw,",
   "",
   "именно из твоих уст, радует меня вдвойне. Я как раз вижу:",
   "Mir kommt, freut doppelt mich. Wie eben ich erblickt,"
  ],
  [
   "also sent as messengers",
   "",
   "сюда, тоже посланные гонцами",
   "Nahn, auch als Boten abgeschickt"
  ],
  [
   "for the same purpose, two dogs are coming over there,",
   "",
   "с той же целью, бегут две собаки —",
   "Zu gleichem Zwecke, dort zwei Hunde,"
  ],
  [
   "greyhounds – just wait, they will be here in a moment,",
   "",
   "это борзые. Подожди, они сейчас будут здесь,",
   "Windspiele sind's – wart nur, sie sind gleich hier am Ort,"
  ],
  [
   "I'll come down, and we will all kiss at once.\"",
   "",
   "я спущусь, и мы сразу расцелуемся».",
   "Ich komm' herunter, und wir küssen uns sofort.««"
  ],
  [
   "\"Really?\" said the fox. \"Goodbye! I still have a long way",
   "",
   "«Вот как? — сказал Лис. — Прощай! Мне ещё далёкий путь",
   "»So?« sprach der Fuchs »Leb' wohl! Noch weiten Weg zu machen"
  ],
  [
   "to go. See you! And, friend, about our matters –",
   "",
   "предстоит. До свидания! А о наших делах, друг, —",
   "Hab' ich. Auf Wiedersehn! Und, Freund, von unsern Sachen"
  ],
  [
   "another time!\" And before you could blink,",
   "",
   "в другой раз!» И не успел ты оглянуться,",
   "Ein ander Mal!« Und, hast du nicht gesehn,"
  ],
  [
   "the rascal runs away – he could almost die",
   "",
   "как негодяй удрал — он готов был лопнуть",
   "Reißt aus der Strolch – er möcht' vergehn"
  ],
  [
   "of anger that his trick had failed",
   "",
   "от злости, что его хитрость не удалась",
   "Vor Wut, daß seine List mißlungen"
  ],
  [
   "with our rooster, the old boy.",
   "",
   "с нашим петухом, старым молодцом.",
   "Mit unsrem Hahn, dem alten Jungen."
  ],
  [
   "But the rooster laughed, very pleased:",
   "",
   "А тот смеялся, очень довольный:",
   "Der aber lachte höchst vergnügt:"
  ],
  [
   "It is twice the fun to cheat a cheater.",
   "",
   "вдвойне приятно обмануть обманщика.",
   "'s macht doppelt Spaß, wenn den Betrüger man betrügt."
  ]
 ]
},

// 2026-11-14: Der Hahn und der Fuchs – die Fassung, die Wladimir auswendig gelernt hat
{
 "id": "hahn_fuchs",
 "titel": "Der Hahn und der Fuchs",
 "titel_en": "The Rooster and the Fox",
 "stufe": "B1",
 "haupt": "de",
 "info": "Лафонтен, «Le Coq et le Renard» – ваш вариант, который вы учили наизусть. Английский – простой построчный перевод. Выражения: dämpfte sein Organ = приглушил голос (das Organ – шутливо «голос»); auf beschwingten Sohlen = на крылатых ногах; Reißaus nehmen = удрать; sich vor Vergnügen biegen = корчиться от удовольствия. Нажмите на немецкую строку – она тоже прозвучит.",
 "zeilen": [
  [
   "In a tree there sat an old rooster,",
   "",
   "На дереве сидел старый петух,",
   "Auf einem Baume saß ein alter Hahn,"
  ],
  [
   "a clever head in every situation of life.",
   "",
   "умная голова в любых жизненных положениях.",
   "Ein schlauer Kopf in allen Lebenslagen."
  ],
  [
   "\"Friend,\" said a fox and made his voice soft,",
   "",
   "«Друг, — сказал Лис, приглушив свой голос, —",
   "»Freund,« sprach ein Fuchs und dämpfte sein Organ,"
  ],
  [
   "\"from today on we will get along,",
   "",
   "давай с сегодняшнего дня жить в ладу,",
   "»Wir wollen uns von heute an vertragen,"
  ],
  [
   "a general peace has been ordered.",
   "",
   "объявлен всеобщий мир.",
   "Ein allgemeiner Friede ist befohlen."
  ],
  [
   "I come to tell you; climb down",
   "",
   "Я пришёл тебе это возвестить; спускайся",
   "Ich komme, dir’s zu künden; steige nieder"
  ],
  [
   "and kiss me, from now on we are brothers.",
   "",
   "и поцелуй меня, отныне мы братья.",
   "Und küsse mich, von nun an sind wir Brüder."
  ],
  [
   "Soon I must hurry on with winged feet",
   "",
   "Сейчас мне спешить дальше на крылатых ногах,",
   "Gleich muß ich weiter auf beschwingten Sohlen,"
  ],
  [
   "to visit twenty other people.",
   "",
   "чтобы навестить ещё двадцать других.",
   "Noch zwanzig andre Leute aufzusuchen."
  ],
  [
   "Just come down – over there under those beech trees",
   "",
   "Спускайся же, там, под теми буками,",
   "Komm nur herab, dort unter jenen Buchen"
  ],
  [
   "you can peck beetles with your children.",
   "",
   "сможешь с детьми клевать жуков.",
   "Kannst du mit deinen Kindern Käfer picken."
  ],
  [
   "Come quickly, so that we look each other in the eyes",
   "",
   "Иди скорей, чтобы мы посмотрели друг другу в глаза",
   "Komm schnell, daß wir uns in die Augen blicken"
  ],
  [
   "and kiss warmly, because now there is peace.\"",
   "",
   "и сердечно поцеловались, ведь теперь мир».",
   "Und herzlich küssen, weil nun Friede ist.«"
  ],
  [
   "\"Friend,\" said the rooster, \"never",
   "",
   "«Друг, — сказал петух, — никогда",
   "»Freund,« sprach der Hahn, »es hätte nie"
  ],
  [
   "could I have received sweeter news",
   "",
   "не могло быть для меня вести слаще,",
   "Mir süßre Botschaft werden können"
  ],
  [
   "than this melody of peace.",
   "",
   "чем эта мелодия мира.",
   "Als diese Friedensmelodie."
  ],
  [
   "How nice that you are the one who brings it!",
   "",
   "Как прекрасно, что принёс её именно ты!",
   "Wie schön, daß du ihr Überbringer bist!"
  ],
  [
   "Over there I see two more dogs running,",
   "",
   "Вон я вижу, бегут ещё две собаки,",
   "Dort seh ich noch zwei Hunde rennen,"
  ],
  [
   "probably the fast animals were chosen",
   "",
   "наверное, этих быстрых зверей выбрали",
   "Vermutlich wählte man die schnellen Tiere"
  ],
  [
   "as couriers for the message of peace.",
   "",
   "гонцами для вести о мире.",
   "Zur Friedensbotschaft als Kuriere."
  ],
  [
   "They almost fly, they will be here soon;",
   "",
   "Они почти летят, сейчас будут здесь;",
   "Sie fliegen fast, gleich sind sie hier;"
  ],
  [
   "then all four of us will kiss!\"",
   "",
   "тогда расцелуемся все вчетвером!»",
   "Dann küssen wir uns alle vier!«"
  ],
  [
   "\"Farewell,\" cried the fox, \"my way is long;",
   "",
   "«Прощай, — крикнул тут Лис, — путь мой далёк;",
   "»Lebwohl,« rief da der Fuchs, »mein Weg ist weit;"
  ],
  [
   "let us at a better time",
   "",
   "давай в более подходящее время",
   "Wir wollen zu gelegenerer Zeit"
  ],
  [
   "celebrate the joy.\" And the fellow",
   "",
   "отпразднуем радость». И малый",
   "Die Freude feiern.« Und der Bursche nahm"
  ],
  [
   "ran away so fast, you can hardly believe it,",
   "",
   "удрал так быстро, что трудно поверить,",
   "Reißaus so schnell, man glaubt es kaum,"
  ],
  [
   "sad that he had lost his prey.",
   "",
   "огорчённый, что лишился добычи.",
   "Betrübt, daß er um seine Beute kam."
  ],
  [
   "The old rooster sat in the tree for a long time",
   "",
   "Старый петух ещё долго сидел на дереве",
   "Der alte Hahn saß lange noch im Baum"
  ],
  [
   "and bent over, crowing with delight.",
   "",
   "и, кукарекая, корчился от удовольствия.",
   "Und bog sich krähend vor Vergnügen."
  ],
  [
   "What double pleasure – to cheat the cheaters!",
   "",
   "Какое двойное удовольствие — обмануть обманщиков!",
   "Welch doppelter Genuß, Betrüger zu betrügen!"
  ]
 ]
}

];
