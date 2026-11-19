// ============================================================
// Die Etymologie – die Wortwurzeln / корни слов
// 2026-11-19 · geschrieben mit Claude
// DE: Lateinische und griechische Wurzeln – daraus sind viele deutsche,
//     englische, italienische und russische Wörter gewachsen.
// RU: Латинские и греческие корни – из них выросли многие немецкие,
//     английские, итальянские и русские слова.
//
// Felder / поля:
//   id, gr (Gruppe: lat_verb | lat_nomen | vorsilbe | griech), emo
//   w     – die Wurzel (lateinisch / griechisch in lateinischen Buchstaben)
//   form  – Formen (z. B. „porto, portavi, portatum“) oder griechische Schrift
//   sag   – was die Sprachausgabe liest; l – Sprache der Stimme (la | el)
//   bed   – Bedeutung (RU)
//   de    – deutsche Wörter (Substantive IMMER mit Artikel!)
//   en    – englische Wörter;  it – italienische Wörter (mit Artikel)
//   ru    – russische Wörter mit derselben Wurzel („мостики“)
//   her   – kurze Erklärung (RU, Fachwörter auf Deutsch)
// Neue Wurzeln einfach unten anhängen.
// ============================================================
window.WORTDETEKTIV_WURZELGRUPPEN = [
  { id: "lat_verb",  icon: "🏃", de: "die lateinischen Verben",                ru: "латинские глаголы" },
  { id: "lat_nomen", icon: "🏛️", de: "die lateinischen Substantive",           ru: "латинские существительные" },
  { id: "vorsilbe",  icon: "🧩", de: "die Vorsilben (die Präfixe)",            ru: "приставки" },
  { id: "griech",    icon: "🏺", de: "die griechischen Wurzeln",              ru: "греческие корни" }
];

window.WORTDETEKTIV_WURZELN = [
// ---------------- lateinische Verben / латинские глаголы ----------------
{ id:"portare", gr:"lat_verb", emo:"📦", w:"portare", form:"porto, portavi, portatum", l:"la",
  bed:"нести, носить, перевозить",
  de:["der Transport","der Export","der Import","der Reporter","das Porto","das Portemonnaie"],
  en:["transport","export","import","report","portable"],
  it:["portare","il portafoglio"],
  ru:["транспорт","экспорт","импорт","репортёр","портфель"],
  her:"trans- «через» + portare = «переносить» → der Transport. ex- «из» → der Export (вывоз), in- «в» → der Import (ввоз). Das Porto (плата за письмо) пришло из итальянского porto – «перевозка». Das Portemonnaie и русский «портфель» – из французского: porter «носить» + monnaie «монеты» / feuille «листы»." },

{ id:"videre", gr:"lat_verb", emo:"👁️", w:"videre", form:"video, vidi, visum", l:"la",
  bed:"видеть",
  de:["das Video","die Vision","das Visum","die Visite","die Revision"],
  en:["video","vision","visa","visit","evident"],
  it:["vedere","la vista"],
  ru:["видео","виза","визит","ревизия"],
  her:"Video по-латыни – просто «я вижу». Das Visum – «увиденное» (печать, которую посмотрели). re- «снова» + visio → die Revision, «пересмотр». И русское «видеть», и немецкое wissen («знать» = «увидел – значит знаю») – общий древний индоевропейский корень *weid-." },

{ id:"scribere", gr:"lat_verb", emo:"✍️", w:"scribere", form:"scribo, scripsi, scriptum", l:"la",
  bed:"писать",
  de:["schreiben","die Schrift","das Skript","das Manuskript","die Beschreibung"],
  en:["script","describe","manuscript","scribble"],
  it:["scrivere","lo scritto"],
  ru:["скрипт","манускрипт"],
  her:"Немецкое schreiben – очень старое заимствование: германцы взяли его у римлян вместе с самим искусством письма. Das Manuskript = manus «рука» + scriptum «написанное» – буквально «рукопись». Русское «рукопись» – это калька (Lehnübersetzung) того же слова." },

{ id:"esse", gr:"lat_verb", emo:"🙋", w:"esse → praesens", form:"sum, fui; praesens, absens", l:"la",
  bed:"быть; praesens – «присутствующий»",
  de:["das Präsens","die Präsenz","präsent","das Präsent","die Präsentation","abwesend"],
  en:["present","presence","presentation","absent"],
  it:["presente","la presenza","assente"],
  ru:["презент","презентация"],
  her:"prae- «впереди, перед» + esse «быть» → praesens – das Partizip I: «находящийся перед (глазами)», т. е. «присутствующий». Отсюда грамматическое das Präsens – настоящее время: то, что происходит сейчас, «перед нами». Das Präsent (подарок) – то, что «ставят перед» человеком. ab- «прочь» → absens, «отсутствующий» → англ. absent." },

{ id:"ducere", gr:"lat_verb", emo:"🧭", w:"ducere", form:"duco, duxi, ductum", l:"la",
  bed:"вести",
  de:["das Produkt","produzieren","die Reduktion","der Aquädukt"],
  en:["produce","product","introduce","conduct"],
  it:["produrre","il prodotto"],
  ru:["продукт","продукция","кондуктор","акведук"],
  her:"pro- «вперёд» + ducere = «выводить вперёд», т. е. производить → das Produkt. Кондуктор (conductor) – «тот, кто ведёт вместе». Der Aquädukt = aqua «вода» + ductus «проведение» – водопровод римлян." },

{ id:"struere", gr:"lat_verb", emo:"🏗️", w:"struere", form:"struo, struxi, structum", l:"la",
  bed:"строить, складывать",
  de:["die Struktur","die Konstruktion","konstruieren","die Instruktion"],
  en:["structure","construction","instruction"],
  it:["costruire","la struttura"],
  ru:["структура","конструкция","конструктор","инструкция"],
  her:"con- «вместе» + struere → construere, «складывать вместе» → die Konstruktion. Ваш der Satzkonstrukteur – буквально «тот, кто складывает предложение из частей». in- «в» → die Instruktion: «то, что вкладывают (в голову)»." },

{ id:"currere", gr:"lat_verb", emo:"🏃", w:"currere", form:"curro, cucurri, cursum", l:"la",
  bed:"бежать",
  de:["der Kurs","der Kurier","die Konkurrenz","der Konkurrent"],
  en:["course","current","courier"],
  it:["correre","il corso","il corriere"],
  ru:["курс","курьер","конкурент","конкурс"],
  her:"cursus – «бег» → der Kurs (курс корабля, курс обучения, курс валюты – всё «движение»). Der Kurier – «бегун» (через итальянское corriere). con- «вместе» + currere → die Konkurrenz: «бежать вместе», т. е. соревноваться." },

{ id:"ponere", gr:"lat_verb", emo:"📍", w:"ponere", form:"pono, posui, positum", l:"la",
  bed:"класть, ставить",
  de:["die Position","die Post","die Komposition","der Komponist","das Depot"],
  en:["position","post","compose","deposit"],
  it:["porre","la posta","la posizione"],
  ru:["позиция","композитор","депо","почта"],
  her:"positum – «поставленное» → die Position. Die Post: в Италии ставили (posita) станции со свежими лошадьми – это и была posta. Русское «почта» пришло через польское poczta из итальянского posta. con- «вместе» → componere, «складывать вместе» → der Komponist." },

{ id:"facere", gr:"lat_verb", emo:"🛠️", w:"facere", form:"facio, feci, factum", l:"la",
  bed:"делать",
  de:["der Fakt","der Effekt","perfekt","das Perfekt","die Manufaktur"],
  en:["fact","effect","perfect","manufacture"],
  it:["fare","il fatto"],
  ru:["факт","эффект","перфект","мануфактура"],
  her:"factum – «сделанное» → der Fakt. per- «до конца» + factum → perfectus, «доделанный» → das Perfekt: грамматическое время для законченного действия («Ich habe es gemacht» – уже сделано). Die Manufaktur = manus «рука» + factura «изготовление» – «сделанное руками»." },

// ---------------- lateinische Substantive / латинские существительные ----------------
{ id:"aqua", gr:"lat_nomen", emo:"💧", w:"aqua", form:"aqua, aquae (f.)", l:"la",
  bed:"вода",
  de:["das Aquarium","das Aquarell","der Aquädukt"],
  en:["aquarium","aquatic"],
  it:["l'acqua","l'acquerello"],
  ru:["аквариум","акварель","акведук"],
  her:"Итальянское acqua почти не изменилось за 2000 лет – добавилась одна буква c. Das Aquarell (акварель) – из итальянского acquerello, «краска на воде»." },

{ id:"terra", gr:"lat_nomen", emo:"🌍", w:"terra", form:"terra, terrae (f.)", l:"la",
  bed:"земля",
  de:["das Territorium","die Terrasse","das Terrarium","das Terrain"],
  en:["territory","terrace","Mediterranean"],
  it:["la terra","il territorio"],
  ru:["территория","терраса","террариум","терракота"],
  her:"Die Terrasse – через французский: «насыпь из земли». Англ. Mediterranean (Средиземное море) = medius «средний» + terra – «море посреди земель». Русское «Средиземное» – калька того же слова." },

{ id:"manus", gr:"lat_nomen", emo:"✋", w:"manus", form:"manus, manus (f.)", l:"la",
  bed:"рука",
  de:["manuell","das Manuskript","die Manufaktur","die Maniküre"],
  en:["manual","manuscript","manicure"],
  it:["la mano","il manoscritto"],
  ru:["мануальный","манускрипт","мануфактура","маникюр"],
  her:"Die Maniküre = manus «рука» + cura «уход». Manuell – «ручной» (manuelle Schaltung – ручная коробка передач). Корень встречается и у facere, и у scribere – слова складываются как конструктор." },

{ id:"nomen", gr:"lat_nomen", emo:"🏷️", w:"nomen", form:"nomen, nominis (n.)", l:"la",
  bed:"имя, название",
  de:["das Nomen","der Name","nominieren","der Nominativ"],
  en:["noun","name","nominate"],
  it:["il nome"],
  ru:["номинация","номинал","номинатив","имя"],
  her:"Das Nomen – грамматический термин: имя существительное (Substantiv). Der Nominativ – «падеж называния» (wer? was?). Немецкое Name, английское name и русское «имя» – не заимствования, а родственники латинского nomen: общий индоевропейский корень." },

{ id:"tempus", gr:"lat_nomen", emo:"⏳", w:"tempus", form:"tempus, temporis (n.)", l:"la",
  bed:"время",
  de:["das Tempus","das Tempo","temporär"],
  en:["tense","tempo","temporary"],
  it:["il tempo"],
  ru:["темп"],
  her:"Das Tempus – грамматическое время (Präsens, Präteritum, Perfekt …) = die Zeitform. Английское tense (время глагола) – тоже от tempus, через старофранцузское tens. В итальянском il tempo – и «время», и «погода»." },

// ---------------- Vorsilben / приставки ----------------
{ id:"prae", gr:"vorsilbe", emo:"⏩", w:"prae-", form:"prae + …", l:"la",
  bed:"перед, впереди, заранее",
  de:["das Präsens","das Präfix","der Präsident","die Prävention"],
  en:["prefix","president","prevention"],
  it:["il prefisso","il presidente"],
  ru:["префикс","президент","превентивный"],
  her:"Der Präsident = prae + sedere «сидеть» – «тот, кто сидит впереди» (председатель – точная русская калька!). Das Präfix = prae + fixum «прикреплённое» – «прикреплённое спереди», т. е. приставка." },

{ id:"re", gr:"vorsilbe", emo:"🔁", w:"re-", form:"re + …", l:"la",
  bed:"снова; назад",
  de:["die Reaktion","die Reparatur","die Revision","die Reduktion"],
  en:["react","repair","return","repeat"],
  it:["la reazione","riparare"],
  ru:["реакция","ревизия","реставрация"],
  her:"re- = «снова» или «назад». Die Reaktion – «ответное действие» (re + actio). Die Revision – «снова посмотреть» (см. videre). В английском эта приставка живая: return, repeat, rewrite." },

{ id:"con", gr:"vorsilbe", emo:"🤝", w:"con- / com-", form:"cum «с, вместе»", l:"la",
  bed:"вместе, с",
  de:["die Konstruktion","die Konkurrenz","die Komposition","der Kontakt"],
  en:["connect","compose","contact","company"],
  it:["costruire","il contatto"],
  ru:["конструкция","конкурс","композиция","контакт","компания"],
  her:"cum по-латыни – «с, вместе». Перед b, p, m она становится com- (die Komposition), перед другими буквами – con- (die Konstruktion). Die Kompanie = com + panis «хлеб» – «те, кто вместе едят хлеб»." },

// ---------------- griechische Wurzeln / греческие корни ----------------
{ id:"tele", gr:"griech", emo:"📡", w:"tele", form:"τῆλε", sag:"τῆλε", l:"el",
  bed:"далеко",
  de:["das Telefon","das Teleskop","die Telegrafie","das Fernsehen"],
  en:["telephone","telescope","television"],
  it:["il telefono","il telescopio"],
  ru:["телефон","телескоп","телевизор","телеграф"],
  her:"tele + phone «голос» → das Telefon, «далёкий голос». tele + skopein «смотреть» → das Teleskop. Немецкое das Fernsehen – калька (Lehnübersetzung) слова Television: fern = tele, sehen = videre." },

{ id:"phone", gr:"griech", emo:"🔊", w:"phone", form:"φωνή", sag:"φωνή", l:"el",
  bed:"звук, голос",
  de:["das Telefon","das Mikrofon","die Phonetik","das Saxofon"],
  en:["phone","microphone","phonetics"],
  it:["il microfono","la fonetica"],
  ru:["телефон","микрофон","фонетика","магнитофон"],
  her:"mikros «маленький» + phone → das Mikrofon: «маленький (тихий) звук» делает громким. Die Phonetik – наука о звуках речи (das Lautsystem). В вашем Spickzettel (die Lautschrift) – это и есть фонетика." },

{ id:"bios", gr:"griech", emo:"🌱", w:"bios", form:"βίος", sag:"βίος", l:"el",
  bed:"жизнь",
  de:["die Biologie","die Biografie","das Antibiotikum","das Bio-Gemüse"],
  en:["biology","biography","antibiotic"],
  it:["la biologia","la biografia"],
  ru:["биология","биография","антибиотик"],
  her:"bios + logos «наука» → die Biologie. bios + graphein «писать» → die Biografie, «описание жизни». anti «против» + bios → das Antibiotikum, «против жизни» (бактерий)." },

{ id:"logos", gr:"griech", emo:"💬", w:"logos", form:"λόγος", sag:"λόγος", l:"el",
  bed:"слово; разум; наука",
  de:["die Logik","der Dialog","der Katalog","die Etymologie","die Biologie"],
  en:["logic","dialogue","catalogue"],
  it:["la logica","il dialogo"],
  ru:["логика","диалог","каталог","этимология"],
  her:"-logie в конце слова = «наука о …»: die Biologie, die Geologie. die Etymologie = etymon «истинное (значение)» + logos – наука об истинном смысле слов. dia «через» + logos → der Dialog, «разговор между двумя»." },

{ id:"graphein", gr:"griech", emo:"🖋️", w:"graphein", form:"γράφειν", sag:"γράφειν", l:"el",
  bed:"писать, чертить",
  de:["die Grafik","die Geografie","die Fotografie","die Orthografie"],
  en:["graphic","geography","photograph"],
  it:["la grafica","la geografia","la fotografia"],
  ru:["график","география","фотография","орфография"],
  her:"geo «земля» + graphein → die Geografie, «описание Земли». phos/photos «свет» + graphein → die Fotografie, «рисование светом». orthos «правильный» + graphein → die Orthografie = die Rechtschreibung (правописание – тоже калька!)." },

{ id:"metron", gr:"griech", emo:"📏", w:"metron", form:"μέτρον", sag:"μέτρον", l:"el",
  bed:"мера",
  de:["der Meter","das Thermometer","die Geometrie","die Symmetrie"],
  en:["metre","thermometer","geometry","symmetry"],
  it:["il metro","la geometria"],
  ru:["метр","термометр","геометрия","симметрия"],
  her:"thermos «тёплый» + metron → das Thermometer, «мера тепла». geo «земля» + metron → die Geometrie, «измерение земли»: наука выросла из межевания полей (ещё в Египте), а название ей дали греки. syn «вместе» + metron → die Symmetrie, «соразмерность». Quantura: «Alles wird klar, wenn es messbar wird.»" }
];
