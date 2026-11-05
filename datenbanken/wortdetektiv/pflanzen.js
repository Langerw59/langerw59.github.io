// ============================================================
// Wortdetektiv – Pflanzen-Lexikon / словарь растений
// 2026-11-05 · geschrieben mit Claude
// DE: Bäume, Beeren, Obst, Gemüse und Kräuter – wie im Tier-Lexikon:
//     deutscher Name MIT Artikel, Mehrzahl, lateinischer Name mit
//     Bedeutung, Russisch, Englisch, kurze Wortgeschichte (RU).
// RU: Деревья, ягоды, фрукты, овощи и травы – как в словаре животных.
//
// Felder / поля:
//   id, gr (Gruppe: baum | beere | obst | gemuese), emo (Bild-Zeichen)
//   de  – mit Artikel!        pl – Mehrzahl (mit „die“)
//   la  – lateinischer Name   laRu – что значит латинское название
//   ru, en                    her – Wortgeschichte (RU)
//   wiki / wikiRu – Titel des Wikipedia-Artikels (DE / RU)
//   fall – (optional) id einer ganzen Geschichte im Wortdetektiv (Fälle)
// Neue Pflanzen einfach unten anhängen.
// ============================================================
window.WORTDETEKTIV_PFLANZENGRUPPEN = [
  { id: "baum",    icon: "🌳", de: "Bäume",                 ru: "деревья" },
  { id: "beere",   icon: "🫐", de: "Beeren & Sträucher",     ru: "ягоды и кустарники" },
  { id: "obst",    icon: "🍎", de: "Obst & Nüsse",           ru: "фрукты и орехи" },
  { id: "gemuese", icon: "🥕", de: "Gemüse & Kräuter",       ru: "овощи и травы" }
];

window.WORTDETEKTIV_PFLANZEN = [
// ---------------- Bäume / деревья ----------------
{ id:"eiche", gr:"baum", emo:"🌳", de:"die Eiche", pl:"die Eichen", la:"Quercus robur", laRu:"quercus – дуб, robur – крепость, сила",
  ru:"дуб", en:"oak", wiki:"Stieleiche", wikiRu:"Дуб черешчатый",
  her:"Eiche и английское oak – одно германское слово. Латинское robur («крепкое дерево, сила») живёт в немецком robust (крепкий, прочный). Жёлудь – die Eichel." },
{ id:"buche", gr:"baum", emo:"🌳", de:"die Buche", pl:"die Buchen", la:"Fagus sylvatica", laRu:"fagus – бук, sylvatica – лесной",
  ru:"бук", en:"beech", wiki:"Rotbuche", wikiRu:"Бук лесной",
  her:"Самая известная улика: das Buch (книга) и der Buchstabe (буква) – от Buche! Древние германцы вырезали знаки (руны) на буковых дощечках и палочках. Русское «буква» тоже пришло из германского *bōk-. Английское book – то же слово." },
{ id:"birke", gr:"baum", emo:"🌳", de:"die Birke", pl:"die Birken", la:"Betula pendula", laRu:"betula – берёза (слово галлов), pendula – свисающая (ветки)",
  ru:"берёза", en:"birch", wiki:"Hänge-Birke", wikiRu:"Берёза повислая",
  her:"Birke, birch и «берёза» – из одного древнего индоевропейского корня со значением «светлый, белый». Дерево назвали по белой коре. Немецкое Birke и русское «берёза» – прямые родственники." },
{ id:"linde", gr:"baum", emo:"🌳", de:"die Linde", pl:"die Linden", la:"Tilia cordata", laRu:"tilia – липа, cordata – сердцевидная (форма листа)",
  ru:"липа", en:"lime tree, linden", wiki:"Winterlinde", wikiRu:"Липа сердцевидная",
  her:"В Германии липа – дерево деревни: под ней собирались, судили, танцевали. Улица Unter den Linden в Берлине. Город Leipzig назван по-славянски (сорбы): lipa – «место у лип». Так что в Лейпциге спрятано русское слово «липа»." },
{ id:"kiefer", gr:"baum", emo:"🌲", de:"die Kiefer", pl:"die Kiefern", la:"Pinus sylvestris", laRu:"pinus – сосна, sylvestris – лесная",
  ru:"сосна", en:"pine, Scots pine", wiki:"Waldkiefer", wikiRu:"Сосна обыкновенная",
  her:"Kiefer – сокращение от старого Kienföhre: der Kien (смолистая сосновая древесина для лучины) + die Föhre (сосна). Осторожно, ловушка: der Kiefer (мужской род) – это челюсть! Одинаково звучит, но другое слово. От pinus – английское pine и ананас pineapple (похож на шишку)." },
{ id:"tanne", gr:"baum", emo:"🌲", de:"die Tanne", pl:"die Tannen", la:"Abies alba", laRu:"abies – пихта, alba – белая (светлая кора)",
  ru:"пихта", en:"fir", wiki:"Weißtanne", wikiRu:"Пихта белая",
  her:"Ловушка для переводчика: die Tanne – это пихта, а не ель! Ель – die Fichte. В песне «O Tannenbaum» поют о пихте. Хвоинки у пихты мягкие, плоские, снизу две белые полоски; шишки стоят на ветках вверх." },
{ id:"fichte", gr:"baum", emo:"🎄", de:"die Fichte", pl:"die Fichten", la:"Picea abies", laRu:"picea – смолистая (от pix – смола), abies – пихта",
  ru:"ель", en:"spruce", wiki:"Gemeine Fichte", wikiRu:"Ель обыкновенная",
  her:"Fichte – родня греческому peukē (сосна). Английское spruce – от старого Pruce = Пруссия: еловый лес и «прусское» пиво привозили из Пруссии. Латинское pix (смола) – отсюда немецкое das Pech (смола; и «неудача»: Pech haben)." },
{ id:"ahorn", gr:"baum", emo:"🍁", de:"der Ahorn", pl:"die Ahorne", la:"Acer platanoides", laRu:"acer – клён, platanoides – похожий на платан",
  ru:"клён", en:"maple", wiki:"Spitzahorn", wikiRu:"Клён остролистный",
  her:"Ahorn и латинское acer – из одного древнего корня. Лист клёна – на флаге Канады, а кленовый сироп – der Ahornsirup. Плоды-«вертолётики» дети в Германии клеят себе на нос – «Nasenzwicker»." },
{ id:"kastanie", gr:"baum", emo:"🌰", de:"die Rosskastanie", pl:"die Rosskastanien", la:"Aesculus hippocastanum", laRu:"aesculus – вид дуба у римлян, hippos – конь (греч.), castanum – каштан: «конский каштан»",
  ru:"конский каштан", en:"horse chestnut", wiki:"Gewöhnliche Rosskastanie", wikiRu:"Конский каштан обыкновенный",
  her:"Das Ross – старое слово «конь» (родня английскому horse). Название пришло из Турции: каштаны давали лошадям от кашля. Kastanie – от греческого kastanon, слово, вероятно, из Малой Азии. Съедобный каштан – другое дерево: die Edelkastanie (Castanea sativa)." },
{ id:"weide", gr:"baum", emo:"🌿", de:"die Weide", pl:"die Weiden", la:"Salix alba", laRu:"salix – ива, alba – белая (листья снизу серебристые)",
  ru:"ива, верба", en:"willow", wiki:"Silber-Weide", wikiRu:"Ива белая",
  her:"Детективная улика: из коры ивы (salix) получили салициловую кислоту (die Salicylsäure) – из неё сделали аспирин. Ловушка: die Weide значит ещё и «пастбище» – это другое слово. Ветки вербы на Вербное воскресенье – по-немецки der Palmsonntag." },
{ id:"pappel", gr:"baum", emo:"🌳", de:"die Pappel", pl:"die Pappeln", la:"Populus nigra", laRu:"populus – тополь, nigra – чёрная (тёмная кора)",
  ru:"тополь", en:"poplar", wiki:"Schwarz-Pappel", wikiRu:"Тополь чёрный",
  her:"Pappel и английское poplar пришли из латинского populus. Римляне сажали тополя у площадей, где собирался народ, – поэтому позже говорили arbor populi, «дерево народа» (это красивая версия, учёные спорят). Тополиный пух – die Pappelwolle." },
{ id:"erle", gr:"baum", emo:"🌳", de:"die Erle", pl:"die Erlen", la:"Alnus glutinosa", laRu:"alnus – ольха, glutinosa – клейкая (молодые листья липкие)",
  ru:"ольха", en:"alder", wiki:"Schwarz-Erle", wikiRu:"Ольха чёрная",
  her:"Erle, alder и «ольха» – родственники из одного древнего корня (рыжеватый: древесина на срезе краснеет). Знаменитая баллада Гёте «Der Erlkönig» – «Лесной царь». Но это ошибка перевода: Гердер перевёл датское ellerkonge (король эльфов) как «король ольхи»." },
{ id:"esche", gr:"baum", emo:"🌳", de:"die Esche", pl:"die Eschen", la:"Fraxinus excelsior", laRu:"fraxinus – ясень, excelsior – более высокий",
  ru:"ясень", en:"ash", wiki:"Gemeine Esche", wikiRu:"Ясень обыкновенный",
  her:"Esche, ash и «ясень» – три брата из одного индоевропейского корня. У древних скандинавов весь мир держался на огромном ясене – Иггдрасиль (Yggdrasil). Из древесины ясеня делали копья и рукоятки инструментов." },

// ---------------- Beeren & Sträucher / ягоды ----------------
{ id:"johannisbeere", gr:"beere", emo:"🔴", de:"die Johannisbeere", pl:"die Johannisbeeren", la:"Ribes rubrum", laRu:"ribes – от арабского ribas (ревень), rubrum – красная",
  ru:"красная смородина", en:"redcurrant", wiki:"Rote Johannisbeere", wikiRu:"Смородина красная",
  her:"Johannisbeere – ягода Иванова дня: созревает около 24 июня, der Johannistag. Английское currant – от «изюм из Коринфа» (raisins of Corinth); по-немецки маленький изюм так и называется: die Korinthe. Название ribes принесли арабские врачи." },
{ id:"schwarze_johannisbeere", gr:"beere", emo:"⚫", de:"die Schwarze Johannisbeere", pl:"die Schwarzen Johannisbeeren", la:"Ribes nigrum", laRu:"ribes – смородина, nigrum – чёрная",
  ru:"чёрная смородина", en:"blackcurrant", wiki:"Schwarze Johannisbeere", wikiRu:"Смородина чёрная",
  her:"Русское «смородина» – от старого «смород» – сильный запах (сравни «смрад»): листья и ягоды чёрной смородины сильно пахнут. Немцы называют её ещё die Ahlbeere. Сок – der Johannisbeersaft, ликёр Cassis – из Франции." },
{ id:"himbeere", gr:"beere", emo:"🍓", de:"die Himbeere", pl:"die Himbeeren", la:"Rubus idaeus", laRu:"rubus – колючий куст (родня ruber – красный), idaeus – с горы Ида",
  ru:"малина", en:"raspberry", wiki:"Himbeere", wikiRu:"Малина обыкновенная",
  her:"Himbeere – из древненемецкого hintberi: die Hinde (Hindin) – самка оленя. «Ягода оленихи» – её любят олени. Латинское idaeus: по греческой легенде, малина росла на горе Ида, где прятали младенца Зевса." },
{ id:"erdbeere", gr:"beere", emo:"🍓", de:"die Erdbeere", pl:"die Erdbeeren", la:"Fragaria × ananassa", laRu:"fragaria – душистая (fragrans – ароматный), ananassa – «ананасная» (запах)",
  ru:"клубника (садовая земляника)", en:"strawberry", wiki:"Gartenerdbeere", wikiRu:"Земляника садовая",
  her:"Erdbeere – «земляная ягода», растёт у самой земли; русское «земляника» построено точно так же! «Клубника» – от «клуб» (шар, клубок). Крупная садовая клубника родилась около 1750 года во Франции: скрестили два американских вида – поэтому знак × в латинском имени." },
{ id:"stachelbeere", gr:"beere", emo:"🟢", de:"die Stachelbeere", pl:"die Stachelbeeren", la:"Ribes uva-crispa", laRu:"ribes – смородина, uva-crispa – «кудрявая гроздь»",
  ru:"крыжовник", en:"gooseberry", wiki:"Stachelbeere", wikiRu:"Крыжовник обыкновенный",
  her:"Der Stachel – шип, колючка: «колючая ягода». Крыжовник и смородина – близкие родственники, один род Ribes. Английское gooseberry («гусиная ягода») – происхождение неясное, может быть, от старого немецкого Krausbeere («кудрявая ягода»)." },
{ id:"brombeere", gr:"beere", emo:"🫐", de:"die Brombeere", pl:"die Brombeeren", la:"Rubus fruticosus", laRu:"rubus – колючий куст, fruticosus – кустистый",
  ru:"ежевика", en:"blackberry", wiki:"Brombeeren", wikiRu:"Ежевика",
  her:"Brom- – от древненемецкого brāma – колючий куст; английское bramble – то же слово. Русское «ежевика» – от «ёж», тоже из-за колючек! Два языка, одна мысль. Малина и ежевика – один род Rubus." },
{ id:"heidelbeere", gr:"beere", emo:"🫐", de:"die Heidelbeere", pl:"die Heidelbeeren", la:"Vaccinium myrtillus", laRu:"vaccinium – черника у римлян, myrtillus – «маленький мирт»",
  ru:"черника", en:"bilberry, blueberry", wiki:"Heidelbeere", wikiRu:"Черника",
  her:"Heidelbeere – ягода с пустоши: die Heide (вересковая пустошь). Её зовут ещё die Blaubeere. Русское «черника» – от «чёрный» (и язык становится чёрным). В магазине «blueberries» – обычно американская голубика, другое растение." },
{ id:"preiselbeere", gr:"beere", emo:"🔴", de:"die Preiselbeere", pl:"die Preiselbeeren", la:"Vaccinium vitis-idaea", laRu:"vaccinium – черника, vitis-idaea – «лоза с горы Ида»",
  ru:"брусника", en:"lingonberry, cowberry", wiki:"Preiselbeere", wikiRu:"Брусника",
  her:"Сенсация для детектива: Preiselbeere пришло из славянских языков! Чешское brusnice, русское «брусника» → немецкое Preisel-. Английское lingonberry – от шведского lingon (шведы едят её с фрикадельками)." },
{ id:"holunder", gr:"beere", emo:"⚫", de:"der Holunder", pl:"die Holunder", la:"Sambucus nigra", laRu:"sambucus – от греч. sambykē (музыкальный инструмент), nigra – чёрная",
  ru:"бузина (чёрная)", en:"elder, elderberry", wiki:"Schwarzer Holunder", wikiRu:"Бузина чёрная",
  her:"Окончание -der/-ter в Holunder, как и в der Wacholder (можжевельник), – старое германское слово «дерево» (родня английскому tree). Из веток бузины делали дудочки – отсюда, по одной версии, латинское sambucus. Сироп и сок – der Holundersaft." },
{ id:"hagebutte", gr:"beere", emo:"🌹", de:"die Hagebutte", pl:"die Hagebutten", la:"Rosa canina", laRu:"rosa – роза, canina – собачья",
  ru:"шиповник (плод)", en:"rose hip, dog rose", wiki:"Hunds-Rose", wikiRu:"Шиповник собачий",
  her:"Der Hag – живая изгородь (отсюда фамилия Hagen и слово die Hecke), die Butte – коробочка, плод. «Плод с изгороди». Русское «шиповник» – от «шип». Чай из шиповника – der Hagebuttentee." },

// ---------------- Obst & Nüsse / фрукты и орехи ----------------
{ id:"apfel", gr:"obst", emo:"🍎", de:"der Apfel", pl:"die Äpfel", la:"Malus domestica", laRu:"malus – яблоня, domestica – домашняя",
  ru:"яблоко (яблоня)", en:"apple", wiki:"Kulturapfel", wikiRu:"Яблоня домашняя",
  her:"Apfel, apple, «яблоко», литовское obuolys – все из одного очень древнего европейского слова. Латинское malum (яблоко) звучит почти как malum (зло) – поэтому на картинах Ева протягивает Адаму именно яблоко, хотя в Библии просто «плод». Кадык – der Adamsapfel." },
{ id:"birne", gr:"obst", emo:"🍐", de:"die Birne", pl:"die Birnen", la:"Pyrus communis", laRu:"pyrus – груша, communis – обыкновенная",
  ru:"груша", en:"pear", wiki:"Kulturbirne", wikiRu:"Груша обыкновенная",
  her:"Birne и английское pear – от латинского pirum (pira → bira → Birne). Электрическая лампочка по-немецки – die Glühbirne, «светящаяся груша», по форме! И в русском есть «груша» у боксёров." },
{ id:"suesskirsche", gr:"obst", emo:"🍒", de:"die Süßkirsche", pl:"die Süßkirschen", la:"Prunus avium", laRu:"prunus – слива, avium – птичья (птицы любят ягоды)",
  ru:"черешня", en:"sweet cherry", wiki:"Vogelkirsche", wikiRu:"Черешня",
  her:"Kirsche, cherry и русское «черешня» – все от латинского cerasus (греческое kerasos). Римлянин Лукулл, по преданию, привёз дерево из города Керасунт (сегодня Гиресун в Турции). Немцы видят тут «птичью вишню» – die Vogelkirsche." },
{ id:"sauerkirsche", gr:"obst", emo:"🍒", de:"die Sauerkirsche", pl:"die Sauerkirschen", la:"Prunus cerasus", laRu:"prunus – слива, cerasus – вишня",
  ru:"вишня", en:"sour cherry", wiki:"Sauerkirsche", wikiRu:"Вишня обыкновенная",
  her:"Ловушка: Kirsche – это часто черешня, а русская «вишня» – die Sauerkirsche («кислая вишня»). Улика: южнонемецкое die Weichsel (вишня) – родня русскому «вишня». Знаменитый торт – die Schwarzwälder Kirschtorte." },
{ id:"pflaume", gr:"obst", emo:"🟣", de:"die Pflaume", pl:"die Pflaumen", la:"Prunus domestica", laRu:"prunus – слива, domestica – домашняя",
  ru:"слива", en:"plum", wiki:"Pflaume", wikiRu:"Слива домашняя",
  her:"Pflaume и plum – от латинского prunum: pr- в немецком превратилось в pfl-. Из того же слова – французское pruneau (чернослив). Вытянутая слива, из которой пекут пирог, – die Zwetschge (по-северному Zwetsche)." },
{ id:"aprikose", gr:"obst", emo:"🍑", de:"die Aprikose", pl:"die Aprikosen", la:"Prunus armeniaca", laRu:"prunus – слива, armeniaca – армянская",
  ru:"абрикос", en:"apricot", wiki:"Aprikose", wikiRu:"Абрикос обыкновенный",
  her:"Длинная дорога слова: латинское praecoquum («рано созревший») → греческий → арабский al-barqūq → испанский albaricoque → французский abricot → голландский abrikoos → немецкое Aprikose и русское «абрикос». Римляне думали, что дерево из Армении." },
{ id:"pfirsich", gr:"obst", emo:"🍑", de:"der Pfirsich", pl:"die Pfirsiche", la:"Prunus persica", laRu:"prunus – слива, persica – персидская",
  ru:"персик", en:"peach", wiki:"Pfirsich", wikiRu:"Персик",
  her:"Римляне называли его malum persicum – «персидское яблоко». Отсюда немецкое Pfirsich, русское «персик» и английское peach. А на самом деле родина персика – Китай; в Европу он пришёл через Персию." },
{ id:"weintraube", gr:"obst", emo:"🍇", de:"die Weintraube", pl:"die Weintrauben", la:"Vitis vinifera", laRu:"vitis – лоза, vinifera – «несущая вино»",
  ru:"виноград", en:"grape", wiki:"Weinrebe", wikiRu:"Виноград культурный",
  her:"Der Wein, wine и «вино» – из латинского vinum (а оно, может быть, ещё старше, с Кавказа). Русское «виноград» = вино + «град» (ограда, сад). Die Traube – гроздь. Изюм – die Rosine." },
{ id:"walnuss", gr:"obst", emo:"🌰", de:"die Walnuss", pl:"die Walnüsse", la:"Juglans regia", laRu:"juglans = Jovis glans – «жёлудь Юпитера», regia – царская",
  ru:"грецкий орех", en:"walnut", wiki:"Echte Walnuss", wikiRu:"Орех грецкий",
  her:"Wal- – от старого welsch: «чужой, романский (из Италии, Франции)». Walnuss – «чужеземный орех». Русские назвали его так же – «грецкий», то есть пришедший из Греции! Две разные страны, одна мысль." },

// ---------------- Gemüse & Kräuter / овощи и травы ----------------
{ id:"kartoffel", gr:"gemuese", emo:"🥔", de:"die Kartoffel", pl:"die Kartoffeln", la:"Solanum tuberosum", laRu:"solanum – паслён, tuberosum – клубненосный",
  ru:"картофель, картошка", en:"potato", wiki:"Kartoffel", wikiRu:"Картофель",
  her:"Из Южной Америки (инки) через Испанию. Итальянцы назвали клубни tartufolo – «трюфель» → немецкое Kartoffel → русское «картофель» (через немецкий!). Английское potato – от слова индейцев таино batata (батат)." },
{ id:"gurke", gr:"gemuese", emo:"🥒", de:"die Gurke", pl:"die Gurken", la:"Cucumis sativus", laRu:"cucumis – огурец, sativus – посевной",
  ru:"огурец", en:"cucumber", wiki:"Gurke", wikiRu:"Огурец обыкновенный",
  her:"Средневековое греческое angouri(on) → славянское «огурец», польское ogórek → немецкое Gurke. Немцы взяли слово у славян! Английское cucumber – от латинского cucumis. Солёный огурец – die Salzgurke, die Gewürzgurke." },
{ id:"zwiebel", gr:"gemuese", emo:"🧅", de:"die Zwiebel", pl:"die Zwiebeln", la:"Allium cepa", laRu:"allium – чеснок/лук, cepa – луковица",
  ru:"лук (репчатый)", en:"onion", wiki:"Speisezwiebel", wikiRu:"Лук репчатый",
  her:"Zwiebel – от латинского cepulla («маленькая луковица», от cepa). Немцы, по-видимому, переделали непонятное слово на свой лад – zwie- похоже на zwei («два»). Английское onion – от латинского unio («одна целая луковица»)." },
{ id:"knoblauch", gr:"gemuese", emo:"🧄", de:"der Knoblauch", pl:"–", la:"Allium sativum", laRu:"allium – чеснок, sativum – посевной",
  ru:"чеснок", en:"garlic", wiki:"Knoblauch", wikiRu:"Чеснок",
  her:"Knob- от старого klobelouch: klieben – раскалывать + der Lauch (лук-порей): «расколотый лук» – головка делится на зубчики. Русское «чеснок» тоже, по одной из версий, от «чесать/частить» – раскалывать, расщеплять! Снова одна мысль в двух языках." },
{ id:"moehre", gr:"gemuese", emo:"🥕", de:"die Möhre", pl:"die Möhren", la:"Daucus carota", laRu:"daucus – морковь (греч.), carota – морковь",
  ru:"морковь", en:"carrot", wiki:"Karotte", wikiRu:"Морковь посевная",
  her:"Möhre и русское «морковь» – родственники, из одного древнего корня. Второе немецкое слово – die Karotte, от латинского carota (как английское carrot). Знаменитая оранжевая морковь – выведена в Голландии; раньше морковь бывала фиолетовой и жёлтой." },
{ id:"kohl", gr:"gemuese", emo:"🥬", de:"der Kohl", pl:"die Kohlköpfe", la:"Brassica oleracea", laRu:"brassica – капуста, oleracea – огородная",
  ru:"капуста", en:"cabbage, kale", wiki:"Gemüsekohl", wikiRu:"Капуста огородная",
  her:"Kohl, английское kale/cole – от латинского caulis (стебель, кочерыжка). Русское «капуста» – тоже из латыни, от caput (голова, кочан). Квашеная капуста – das Sauerkraut, одно из немецких слов в английском языке." },
{ id:"dill", gr:"gemuese", emo:"🌿", de:"der Dill", pl:"–", la:"Anethum graveolens", laRu:"anethum – укроп (греч. anēthon), graveolens – сильно пахнущий",
  ru:"укроп", en:"dill", wiki:"Dill", wikiRu:"Укроп пахучий",
  her:"Dill и английское dill – одно германское слово. Русское «укроп» – от «кропить» (брызгать, посыпать): им посыпают блюда. Огурцы с укропом – die Dillgurken." },
{ id:"petersilie", gr:"gemuese", emo:"🌿", de:"die Petersilie", pl:"–", la:"Petroselinum crispum", laRu:"petros – камень, selinon – сельдерей (греч.), crispum – кудрявая",
  ru:"петрушка", en:"parsley", wiki:"Petersilie", wikiRu:"Петрушка кудрявая",
  her:"Греки называли её «каменный сельдерей» – petroselinon (растёт на камнях). Из этого слова получились немецкое Petersilie, английское parsley и русское «петрушка». Немцы потом услышали в начале слова имя Peter (по-гречески тоже «камень»)." },
{ id:"tomate", gr:"gemuese", emo:"🍅", de:"die Tomate", pl:"die Tomaten", la:"Solanum lycopersicum", laRu:"solanum – паслён, lycopersicum – «волчий персик» (греч.)",
  ru:"помидор, томат", en:"tomato", wiki:"Tomate", wikiRu:"Томат", fall:"tomate",
  her:"Tomate и «томат» – от ацтекского слова tomatl («вздувающийся плод»). Итальянцы назвали её pomodoro – «золотое яблоко»; отсюда русское «помидор». Подробно – в деле «Tomate» ниже." },
{ id:"kuerbis", gr:"gemuese", emo:"🎃", de:"der Kürbis", pl:"die Kürbisse", la:"Cucurbita pepo", laRu:"cucurbita – тыква, pepo – «спелая, сваренная солнцем» (греч.)",
  ru:"тыква", en:"pumpkin", wiki:"Gartenkürbis", wikiRu:"Тыква обыкновенная",
  her:"Kürbis – от латинского cucurbita: древненемецкое kurbiz → Kürbis. Английское pumpkin – от греческого pepon (спелый), как и латинское pepo. Садовая тыква родом из Америки; в Европе её узнали после Колумба." }
];
