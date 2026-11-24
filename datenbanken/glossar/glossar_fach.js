// ============================================================
// Fachglossar – Mathematik und Elektrotechnik (Kurse in „die Fächer“)
// 2026-11-24 · angelegt mit Claude. Mathe-Begriffe aus dem alten Generator-Glossar übernommen.
// DE: Fachbegriffe der Kurse mit Artikel, Herkunft (meist Latein/Griechisch) und Beispiel.
// RU: Термины курсов математики и электротехники – с артиклем, происхождением, примером.
//
// Felder / поля:
//   w    – Begriff mit Artikel            fach – Mathematik | Elektrotechnik
//   auch – gleichbedeutende Namen (z. B. das Vertauschungsgesetz)
//   k    – weitere Suchformen             ru   – по-русски
//   h    – Herkunft-Gruppe: lat, griech, arab, germ
//   her  – Herkunft erklärt               erk  – объяснение
//   ver  – verwandte Wörter / кальки      bsp  – [[Beispiel, Hinweis], …]
//   lek  – Link zur Lektion (relativ zu /pages/faecher/elektrotechnik/)
// Neue Begriffe einfach unten anhängen. Im Chat: «в фачглоссарий».
// ============================================================
window.GLOSSAR_FACH = [
 {
  "w": "die Mathematik",
  "fach": "Mathematik",
  "ru": "математика",
  "h": "griech",
  "her": "греч. mathēma «знание, наука, то, чему учатся» → «наука о знании», учение",
  "erk": "Для древних греков — просто «то, что изучают». Позже — наука о числах и формах.",
  "bsp": [
   [
    "Mathematik ist überall.",
    ""
   ]
  ]
 },
 {
  "w": "senkrecht / das Perpendikel",
  "fach": "Mathematik",
  "ru": "перпендикуляр",
  "h": "lat",
  "her": "лат. perpendiculum «отвес» ← per-pendere «свисать» → «отвес»",
  "erk": "Перпендикуляр — линия, как нить с грузиком (отвес), висящая к земле: под прямым углом. Немецкое senkrecht = «опущенно-прямой».",
  "ver": "Слова «маятник» (Pendel) и «подвеска» (Anhänger, pendant) — родственники pendere «висеть».",
  "bsp": [
   [
    "Die Gerade steht senkrecht auf der anderen.",
    ""
   ]
  ]
 },
 {
  "w": "die Konstante",
  "fach": "Mathematik",
  "ru": "постоянная (константа)",
  "h": "lat",
  "her": "лат. constans ← con-stare «твёрдо стоять» → «твёрдо стоящая»",
  "erk": "Величина, которая не меняется: π, g = 9,81 м/с².",
  "ver": "«Постоянная» = «по-стоянная», стоящая на месте — калька.",
  "bsp": [
   [
    "Die Kreiszahl π ist eine Konstante.",
    ""
   ]
  ]
 },
 {
  "w": "die Variable",
  "fach": "Mathematik",
  "ru": "переменная",
  "h": "lat",
  "her": "лат. variabilis ← variare «изменять» → «изменчивая»",
  "erk": "Буква вместо числа, которое может меняться: x, y.",
  "ver": "«Переменная» — калька.",
  "bsp": [
   [
    "Setze für x die Zahl 3 ein.",
    ""
   ]
  ]
 },
 {
  "w": "parallel",
  "fach": "Mathematik",
  "ru": "параллельный",
  "h": "griech",
  "her": "греч. para allēlois → «рядом друг с другом»",
  "erk": "Прямые, которые идут рядом и никогда не пересекаются.",
  "bsp": [
   [
    "Die Schienen verlaufen parallel.",
    ""
   ]
  ]
 },
 {
  "w": "die Diagonale",
  "fach": "Mathematik",
  "ru": "диагональ",
  "h": "griech",
  "her": "греч. dia «через» + gōnia «угол» → «из угла через угол»",
  "erk": "Отрезок, соединяющий два несоседних угла.",
  "ver": "gōnia «угол» — также в «три-гон-ометрия», «поли-гон» (многоугольник).",
  "bsp": [
   [
    "Ein Rechteck hat zwei Diagonalen.",
    ""
   ]
  ]
 },
 {
  "w": "die Kathete",
  "fach": "Mathematik",
  "ru": "катет",
  "h": "griech",
  "her": "греч. kathetos «опущенный (отвесно)» → «отвес, опущенная»",
  "erk": "Сторона прямоугольного треугольника, прилегающая к прямому углу. Один катет «опущен» на другой, как отвес.",
  "bsp": [
   [
    "a² + b² = c² – a und b sind die Katheten.",
    ""
   ]
  ]
 },
 {
  "w": "die Hypotenuse",
  "fach": "Mathematik",
  "ru": "гипотенуза",
  "h": "griech",
  "her": "греч. hypoteinousa ← hypo «под» + teinein «натягивать» → «натянутая под (прямым углом)»",
  "erk": "Самая длинная сторона прямоугольного треугольника, лежит напротив прямого угла — как тетива, натянутая под углом.",
  "bsp": [
   [
    "c ist die Hypotenuse.",
    ""
   ]
  ]
 },
 {
  "w": "die Geometrie",
  "fach": "Mathematik",
  "ru": "геометрия",
  "h": "griech",
  "her": "греч. gē «земля» + metrein «измерять» → «землемерие»",
  "erk": "В Египте после разливов Нила заново измеряли участки земли — отсюда наука о фигурах.",
  "ver": "Русское слово «землемер» — дословный перевод.",
  "bsp": [
   [
    "Geometrie: Dreieck, Kreis, Quadrat",
    ""
   ]
  ]
 },
 {
  "w": "der Radius / der Durchmesser",
  "fach": "Mathematik",
  "ru": "радиус / диаметр",
  "h": "griech",
  "her": "лат. radius «спица колеса, луч»; греч. dia-metros «мера через» → «спица» / «мера насквозь»",
  "erk": "Radius — от центра до окружности, как спица колеса. Durchmesser (диаметр) — через весь круг = 2 · r. Немецкое Durch-messer — калька с dia-metros.",
  "bsp": [
   [
    "d = 2 · r",
    ""
   ]
  ]
 },
 {
  "w": "das Prozent",
  "fach": "Mathematik",
  "ru": "процент",
  "h": "lat",
  "her": "лат. pro centum → «на сотню»",
  "erk": "Одна сотая часть. 3 % = 3 из 100. Отсюда и вычисления процентов по кредиту при покупке машины.",
  "bsp": [
   [
    "3 % Zinsen auf 10 000 € = 300 €",
    ""
   ]
  ]
 },
 {
  "w": "die Algebra",
  "fach": "Mathematik",
  "ru": "алгебра",
  "h": "arab",
  "her": "араб. al-dschabr «восполнение, восстановление» → «восстановление»",
  "erk": "Из названия книги аль-Хорезми (IX век, родом из Хорезма — Средняя Азия). «Восстановление» — перенос членов уравнения на другую сторону.",
  "bsp": [
   [
    "x + 5 = 8 → x = 3",
    ""
   ]
  ]
 },
 {
  "w": "der Algorithmus",
  "fach": "Mathematik",
  "ru": "алгоритм",
  "h": "lat",
  "her": "от имени аль-Хорезми, лат. Algorismi → «(по методу) аль-Хорезми»",
  "erk": "Точная последовательность шагов. Средневековые латинские переводы начинались словами «Dixit Algorismi…» — «сказал аль-Хорезми».",
  "bsp": [
   [
    "Ein Kochrezept ist auch ein Algorithmus.",
    ""
   ]
  ]
 },
 {
  "w": "der Summand",
  "fach": "Mathematik",
  "ru": "слагаемое",
  "h": "lat",
  "her": "лат. summandus ← summare «складывать» → «то, что нужно сложить»",
  "erk": "Число, которое прибавляют. Окончание -and (лат. -andus) всегда значит «тот, с которым что-то надо сделать»: Summand, Minuend, Subtrahend, Dividend, Radikand.",
  "ver": "«Слагаемое» = «то, что слагают» — точная калька с summandus.",
  "bsp": [
   [
    "3 + 2 = 5 – 3 und 2 sind die Summanden.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Summe",
  "fach": "Mathematik",
  "ru": "сумма",
  "h": "lat",
  "her": "лат. summa «высшее, верхнее» → «верхняя (строка)»",
  "erk": "Результат сложения. Римляне складывали столбик снизу вверх и писали итог наверху — отсюда «summa linea» «верхняя строка».",
  "ver": "Родственники: «суммировать», англ. summit «вершина».",
  "bsp": [
   [
    "3 + 2 = 5 – 5 ist die Summe.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Minuend",
  "fach": "Mathematik",
  "ru": "уменьшаемое",
  "h": "lat",
  "her": "лат. minuendus ← minuere «уменьшать» → «то, что нужно уменьшить»",
  "erk": "Число, из которого вычитают.",
  "ver": "«Уменьшаемое» — калька. Родственники: minus, «минута» (pars minuta — «уменьшенная часть» часа).",
  "bsp": [
   [
    "5 − 2 = 3 – 5 ist der Minuend.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Subtrahend",
  "fach": "Mathematik",
  "ru": "вычитаемое",
  "h": "lat",
  "her": "лат. subtrahendus ← sub-trahere «вытягивать из-под» → «то, что нужно вытянуть»",
  "erk": "Число, которое вычитают.",
  "ver": "«Вычитаемое» — калька. trahere «тянуть» — также в «трактор» (тянущий).",
  "bsp": [
   [
    "5 − 2 = 3 – 2 ist der Subtrahend.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Differenz",
  "fach": "Mathematik",
  "ru": "разность",
  "h": "lat",
  "her": "лат. differentia ← dis-ferre «разносить в стороны» → «разнесённость, различие»",
  "erk": "Результат вычитания: насколько одно число отличается от другого.",
  "ver": "«Разность» = «то, чем числа разнятся» — калька.",
  "bsp": [
   [
    "5 − 2 = 3 – 3 ist die Differenz.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Faktor",
  "fach": "Mathematik",
  "ru": "множитель",
  "h": "lat",
  "her": "лат. factor ← facere «делать» → «делатель»",
  "erk": "Число, которое умножают. Оба числа при умножении — Faktoren.",
  "ver": "Родственники: «факт» (сделанное), «фабрика».",
  "bsp": [
   [
    "2 · 4 = 8 – 2 und 4 sind die Faktoren.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "das Produkt",
  "fach": "Mathematik",
  "ru": "произведение",
  "h": "lat",
  "her": "лат. productum ← pro-ducere «выводить вперёд, производить» → «произведённое»",
  "erk": "Результат умножения.",
  "ver": "«Произведение» — точная калька с productum.",
  "bsp": [
   [
    "2 · 4 = 8 – 8 ist das Produkt.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Dividend",
  "fach": "Mathematik",
  "ru": "делимое",
  "h": "lat",
  "her": "лат. dividendus ← dividere «делить» → «то, что нужно разделить»",
  "erk": "Число, которое делят. В экономике die Dividende — доля прибыли, «то, что делят» между акционерами.",
  "ver": "«Делимое» — калька.",
  "bsp": [
   [
    "8 : 4 = 2 – 8 ist der Dividend.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Divisor",
  "fach": "Mathematik",
  "ru": "делитель",
  "h": "lat",
  "her": "лат. divisor «делящий» → «делитель»",
  "erk": "Число, на которое делят. На ноль делить нельзя!",
  "ver": "«Делитель» — калька. Окончание -or = «тот, кто делает»: Divisor, Faktor, Motor.",
  "bsp": [
   [
    "8 : 4 = 2 – 4 ist der Divisor.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Quotient",
  "fach": "Mathematik",
  "ru": "частное",
  "h": "lat",
  "her": "лат. quotiens «сколько раз» → «сколько раз»",
  "erk": "Результат деления: сколько раз делитель помещается в делимом. Также сама запись a : b или дробь.",
  "ver": "Русское «частное» — от «часть»: на сколько частей поделили.",
  "bsp": [
   [
    "8 : 4 = 2 – 2 ist der Quotient.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Basis",
  "fach": "Mathematik",
  "ru": "основание (степени)",
  "h": "griech",
  "her": "греч. basis «шаг, ступень, основание» → «основание»",
  "erk": "В степени 2⁴ — число 2, которое умножают само на себя. Также основание логарифма.",
  "ver": "«Основание» — калька. Родственник: «база».",
  "bsp": [
   [
    "2⁴ = 16 – 2 ist die Basis.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Exponent",
  "fach": "Mathematik",
  "ru": "показатель степени",
  "h": "lat",
  "her": "лат. exponens ← ex-ponere «выставлять наружу» → «выставляющий (наверх)»",
  "erk": "Маленькое число вверху: сколько раз основание умножают само на себя.",
  "ver": "«Показатель» — тот, кто показывает, «выставляет». Родственник: «экспонат» (выставленный).",
  "bsp": [
   [
    "2⁴ = 16 – 4 ist der Exponent.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Potenz",
  "fach": "Mathematik",
  "ru": "степень",
  "h": "lat",
  "her": "лат. potentia «сила, мощь» → «сила»",
  "erk": "Запись вида aⁿ и её значение (der Potenzwert). potenzieren = возводить в степень. В физике die Zehnerpotenz: 10³ = kilo, 10⁻³ = milli.",
  "ver": "Родственник: «потенциал». Русское «степень» — «ступень»: число поднимается по ступеням.",
  "bsp": [
   [
    "2⁴ = 2 · 2 · 2 · 2 = 16",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Radikand",
  "fach": "Mathematik",
  "ru": "подкоренное число",
  "h": "lat",
  "her": "лат. radicandus ← radix «корень» → «то, из чего нужно извлечь корень»",
  "erk": "Число под знаком корня. radizieren = извлекать корень.",
  "bsp": [
   [
    "⁴√16 = 2 – 16 ist der Radikand.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Wurzel",
  "fach": "Mathematik",
  "ru": "корень",
  "h": "lat",
  "her": "нем. Wurzel «корень растения» — калька с лат. radix → «корень»",
  "erk": "Обратное действие к степени: какое число в степени n даёт радикант? Знак √ — это искажённая буква r от radix. Показатель корня — der Wurzelexponent.",
  "ver": "Слово «радикальный» = «до корня»; «редиска» тоже от radix!",
  "bsp": [
   [
    "√9 = 3, weil 3² = 9",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Logarithmus",
  "fach": "Mathematik",
  "ru": "логарифм",
  "h": "griech",
  "her": "греч. logos «отношение, слово» + arithmos «число»; придумал Джон Непер (1614) → «число отношения»",
  "erk": "Второе обратное действие к степени: в какую степень надо возвести основание, чтобы получить число?",
  "ver": "arithmos — также в «арифметика».",
  "bsp": [
   [
    "²log 16 = 4, weil 2⁴ = 16",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Numerus",
  "fach": "Mathematik",
  "ru": "число под логарифмом",
  "h": "lat",
  "her": "лат. numerus «число» → «число»",
  "erk": "Число, от которого берут логарифм. В грамматике der Numerus — число (Singular/Plural).",
  "ver": "Родственники: «номер», «нумерация».",
  "bsp": [
   [
    "²log 16 = 4 – 16 ist der Numerus.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "das Kommutativgesetz",
  "fach": "Mathematik",
  "ru": "переместительный закон",
  "h": "lat",
  "her": "лат. com-mutare «менять местами» → «закон перестановки»",
  "erk": "Слагаемые и множители можно менять местами, результат не изменится. Для вычитания и деления — нет!",
  "ver": "«Переместительный» — калька. Родственник: «коммутатор» (переключатель).",
  "bsp": [
   [
    "3 + 5 = 5 + 3 und 3 · 5 = 5 · 3",
    ""
   ]
  ],
  "auch": "das Vertauschungsgesetz",
  "k": [
   "Vertauschungsgesetz",
   "kommutativ"
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "das Assoziativgesetz",
  "fach": "Mathematik",
  "ru": "сочетательный закон",
  "h": "lat",
  "her": "лат. associare «объединять» ← socius «товарищ» → «закон объединения»",
  "erk": "Скобки при одних только сложениях (или одних умножениях) можно ставить как угодно.",
  "ver": "«Сочетательный» — калька. Родственники: «ассоциация», «социальный».",
  "bsp": [
   [
    "(2 + 3) + 4 = 2 + (3 + 4)",
    ""
   ]
  ],
  "auch": "das Verbindungsgesetz",
  "k": [
   "Verbindungsgesetz",
   "assoziativ"
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "das Distributivgesetz",
  "fach": "Mathematik",
  "ru": "распределительный закон",
  "h": "lat",
  "her": "лат. distribuere «распределять» → «закон распределения»",
  "erk": "Множитель перед скобкой «распределяется» на каждое слагаемое в скобке. Так раскрывают скобки (die Klammer auflösen) и выносят за скобку (ausklammern).",
  "ver": "«Распределительный» — калька. Родственник: «дистрибьютор».",
  "bsp": [
   [
    "3 · (4 + 5) = 3 · 4 + 3 · 5",
    ""
   ]
  ],
  "auch": "das Verteilungsgesetz",
  "k": [
   "Verteilungsgesetz",
   "distributiv"
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Klammer",
  "fach": "Mathematik",
  "ru": "скобка",
  "h": "germ",
  "her": "нем. Klammer «зажим, скоба» (Wäscheklammer — прищепка) → «зажим»",
  "erk": "Скобка «зажимает» то, что нужно посчитать сначала. die Klammer auflösen — раскрыть скобки; ausklammern — вынести за скобку.",
  "bsp": [
   [
    "2 · (3 + 4) = 2 · 7 = 14",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "die Reihenfolge der Rechenoperationen",
  "fach": "Mathematik",
  "ru": "порядок действий",
  "h": "germ",
  "her": "нем. Reihe «ряд» + Folge «следование» → «следование по ряду»",
  "erk": "Сначала скобки, потом степени и корни, потом умножение и деление, в конце сложение и вычитание. Коротко: Klammer vor Punkt vor Strich (Punkt = · und :, Strich = + und −).",
  "bsp": [
   [
    "2 + 3 · 4 = 2 + 12 = 14",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/01-rechenarten.html"
 },
 {
  "w": "der Bruch",
  "fach": "Mathematik",
  "ru": "дробь",
  "h": "lat",
  "her": "нем. brechen «ломать» — калька с лат. fractio ← frangere «ломать» → «обломок»",
  "erk": "Часть целого. Сверху der Zähler (числитель — «считающий», сколько частей взяли), снизу der Nenner (знаменатель — «называющий», на сколько частей разломили).",
  "ver": "Три языка — одна картинка: fractio = Bruch = «дробь» (от «дробить»). Родственник: «фракция».",
  "bsp": [
   [
    "¾ – 3 ist der Zähler, 4 ist der Nenner.",
    ""
   ]
  ]
 },
 {
  "w": "die ganze Zahl",
  "fach": "Mathematik",
  "ru": "целое число",
  "h": "germ",
  "her": "нем. ganz «целый» → «целое число»",
  "erk": "Числа …, −2, −1, 0, 1, 2, … без дробей. Вместе с дробями — die rationale Zahl (лат. ratio «отношение»). Положительные и отрицательные числа в книге называются relative Zahlen (относительные).",
  "bsp": [
   [
    "−3, 0, 7 sind ganze Zahlen.",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "der Dreisatz",
  "fach": "Mathematik",
  "ru": "тройное правило (пропорция)",
  "h": "lat",
  "her": "нем. drei «три» + Satz «предложение, шаг»; лат. {L}regula de tribus{E} «правило трёх» → «три шага»",
  "erk": "Решение пропорций за три шага: 1) что дано, 2) приводим к единице, 3) к нужному числу.",
  "ver": "По-русски раньше так и говорили: «тройное правило».",
  "bsp": [
   [
    "3 kg kosten 6 €. 1 kg kostet 2 €. 5 kg kosten 10 €.",
    ""
   ]
  ]
 },
 {
  "w": "die Gleichung",
  "fach": "Mathematik",
  "ru": "уравнение",
  "h": "lat",
  "her": "нем. gleich «равный» — калька с лат. {L}aequatio{E} «уравнивание» → «уравнивание»",
  "erk": "Две стороны со знаком =. Решить уравнение — найти x. Правило: с обеих сторон делать одно и то же.",
  "ver": "«Уравнение» — та же калька с aequatio.",
  "bsp": [
   [
    "2x + 3 = 11 → 2x = 8 → x = 4",
    ""
   ]
  ]
 },
 {
  "w": "die Funktion",
  "fach": "Mathematik",
  "ru": "функция",
  "h": "lat",
  "her": "лат. functio «исполнение, работа» ← fungi «исполнять»; в математику ввёл Лейбниц → «исполнение»",
  "erk": "Каждому x соответствует ровно одно y. die Funktionsgleichung — y = m·x + b; die Steigung m — наклон (подъём) прямой.",
  "bsp": [
   [
    "y = 2x + 1 – die Steigung ist 2.",
    ""
   ]
  ]
 },
 {
  "w": "die natürliche Zahl",
  "fach": "Mathematik",
  "ru": "натуральное число",
  "h": "lat",
  "k": [
   "natürliche Zahlen",
   "ℕ"
  ],
  "her": "лат. naturalis «природный» ← natura «природа» → «природное число»",
  "erk": "Числа для счёта: 0, 1, 2, 3 … Обозначение ℕ (N – natürlich). Появились раньше всех – «от природы».",
  "bsp": [
   [
    "Im Kasten liegen 3 Widerstände.",
    "3 ist eine natürliche Zahl"
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die rationale Zahl",
  "fach": "Mathematik",
  "ru": "рациональное число",
  "h": "lat",
  "auch": "die gebrochene Zahl, der Bruch",
  "k": [
   "rationale Zahlen",
   "gebrochene Zahl",
   "ℚ"
  ],
  "her": "лат. ratio «отношение, расчёт» → «число-отношение»",
  "erk": "Число, которое можно записать как отношение двух целых: 3/4, −1/2, 0,25. Обозначение ℚ – от Quotient.",
  "ver": "Родственники: die Ration (порция, «рассчитанная доля»), rational «разумный», рацион.",
  "bsp": [
   [
    "3 : 4 = ¾ = 0,75",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die irrationale Zahl",
  "fach": "Mathematik",
  "ru": "иррациональное число",
  "h": "lat",
  "k": [
   "irrational",
   "irrationale Zahlen"
  ],
  "her": "лат. ir- (in-) «не» + ratio «отношение» → «не-отношение»",
  "erk": "Число, которое нельзя записать дробью: бесконечно много знаков после запятой без периода. Примеры: √2, π.",
  "bsp": [
   [
    "√2 = 1,41421356…",
    ""
   ],
   [
    "π = 3,14159265…",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die reelle Zahl",
  "fach": "Mathematik",
  "ru": "действительное (вещественное) число",
  "h": "lat",
  "k": [
   "reelle Zahlen",
   "ℝ"
  ],
  "her": "лат. realis «вещественный» ← res «вещь» → «вещественное число»",
  "erk": "Все рациональные и иррациональные числа вместе – каждая точка числовой прямой, каждый результат измерения. Обозначение ℝ.",
  "ver": "Родственники: real, die Realität, реальный. «Вещественное» – калька: res = вещь.",
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die relative Zahl",
  "fach": "Mathematik",
  "ru": "относительное число (число со знаком)",
  "h": "lat",
  "k": [
   "relative Zahlen"
  ],
  "her": "лат. relativus «относящийся (к чему-то)» ← referre «относить»",
  "erk": "Число со знаком + или −: показывает, насколько и в какую сторону от нуля. Число «относится» к нулю как к точке отсчёта.",
  "bsp": [
   [
    "−4 °C",
    ""
   ],
   [
    "+12 V gegen Masse",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die Zahlengerade",
  "fach": "Mathematik",
  "ru": "числовая прямая",
  "h": "germ",
  "k": [
   "Zahlenstrahl"
  ],
  "her": "нем. die Zahl «число» + die Gerade «прямая» (gerade «прямой»)",
  "erk": "Прямая, на которой каждой точке соответствует число: справа от 0 – положительные, слева – отрицательные. Только с положительной частью – der Zahlenstrahl (числовой луч).",
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "der Betrag",
  "fach": "Mathematik",
  "ru": "модуль (абсолютная величина)",
  "h": "germ",
  "auch": "der Absolutbetrag",
  "k": [
   "Absolutbetrag",
   "|x|"
  ],
  "her": "нем. betragen «составлять (сумму)» → «сколько составляет»",
  "erk": "Расстояние числа от нуля, всегда без минуса: |−3| = 3. В быту der Betrag – сумма денег: «der Rechnungsbetrag».",
  "bsp": [
   [
    "|−7| = 7",
    ""
   ],
   [
    "Der Betrag beträgt 50 Euro.",
    "сумма составляет 50 евро"
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "das Vorzeichen",
  "fach": "Mathematik",
  "ru": "знак числа (плюс или минус)",
  "h": "germ",
  "k": [
   "Vorzeichenregel",
   "Vorzeichenregeln"
  ],
  "her": "нем. vor «перед» + das Zeichen «знак» → «знак впереди»",
  "erk": "Знак перед числом: + или −. Не путать с das Rechenzeichen – знаком действия. В 5 − (−3) первый минус – Rechenzeichen, второй – Vorzeichen.",
  "bsp": [
   [
    "(−3) · (−4) = 12",
    "gleiche Vorzeichen → plus"
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "das Rechenzeichen",
  "fach": "Mathematik",
  "ru": "знак действия (+ − · :)",
  "h": "germ",
  "her": "нем. rechnen «считать» + das Zeichen «знак»",
  "erk": "Знак, который говорит, ЧТО делать: +, −, ·, :. Отличать от das Vorzeichen (знак самого числа).",
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die Gegenzahl",
  "fach": "Mathematik",
  "ru": "противоположное число",
  "h": "germ",
  "her": "нем. gegen «против» + die Zahl → «противо-число»",
  "erk": "Число с тем же модулем, но обратным знаком: Gegenzahl von 5 ist −5. Сумма числа и его Gegenzahl = 0.",
  "bsp": [
   [
    "5 + (−5) = 0",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "das Potential",
  "fach": "Elektrotechnik",
  "ru": "потенциал",
  "h": "lat",
  "k": [
   "Potenzial",
   "φ"
  ],
  "her": "лат. potentia «сила, возможность» ← posse «мочь» → «возможность (совершить работу)»",
  "erk": "Напряжение точки относительно точки отсчёта (die Masse, 0 V). Знак φ (фи). Напряжение между двумя точками – разность потенциалов: U = φA − φB.",
  "ver": "Родственники: die Potenz (степень), potent, потенциальный. Пишут и Potential, и Potenzial – оба верно.",
  "bsp": [
   [
    "φ = +12 V gegen Masse",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die Masse",
  "fach": "Elektrotechnik",
  "ru": "масса, «земля» схемы (общий провод, 0 В)",
  "h": "lat",
  "k": [
   "Masse",
   "GND",
   "⏚"
  ],
  "her": "лат. massa «ком, глыба» → в технике: металлический корпус, «общая масса» железа",
  "erk": "Точка отсчёта в схеме, 0 В. В автомобиле масса – кузов: минус аккумулятора соединён с кузовом. Англ. ground (GND). Не путать с физической массой (кг) – слово то же.",
  "bsp": [
   [
    "Das Minuskabel ist an Masse.",
    "минус соединён с массой"
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "die Spannung",
  "fach": "Elektrotechnik",
  "ru": "напряжение",
  "h": "germ",
  "k": [
   "U",
   "Volt"
  ],
  "her": "нем. spannen «натягивать» → «натяжение» (как натянутая пружина, готовая сработать)",
  "erk": "Разность потенциалов между двумя точками; «давление», которое гонит ток. Знак U, единица – вольт (V). Измеряют параллельно.",
  "ver": "Родственники: gespannt «натянутый, напряжённый», die Hochspannung (высокое напряжение). «Напряжение» – калька.",
  "bsp": [
   [
    "U = 12 V",
    ""
   ]
  ],
  "lek": "etage-1/01-ladung-strom-spannung.html"
 },
 {
  "w": "der Strom",
  "fach": "Elektrotechnik",
  "ru": "ток",
  "h": "germ",
  "auch": "die Stromstärke",
  "k": [
   "Stromstärke",
   "I",
   "Ampere"
  ],
  "her": "нем. der Strom «поток, течение (реки)» → поток зарядов",
  "erk": "Упорядоченное движение зарядов. Знак I, единица – ампер (A). Измеряют последовательно. В быту «Strom» = электричество вообще (die Stromrechnung).",
  "ver": "Родственники: strömen «течь», der Golfstrom. Русское «ток» – тоже «течение».",
  "bsp": [
   [
    "I = 0,5 A",
    ""
   ]
  ],
  "lek": "etage-1/01-ladung-strom-spannung.html"
 },
 {
  "w": "der Widerstand",
  "fach": "Elektrotechnik",
  "ru": "сопротивление; резистор (деталь)",
  "h": "germ",
  "k": [
   "R",
   "Ohm",
   "Widerstände"
  ],
  "her": "нем. wider «против» + stehen «стоять» → «стоять против»",
  "erk": "Свойство проводника мешать току; и сама деталь – резистор. Знак R, единица – ом (Ω). Закон Ома: R = U / I.",
  "ver": "«Сопротивление» = «со-противо-стояние» – точная калька. Родственники: widersprechen (возражать).",
  "bsp": [
   [
    "R = 220 Ω",
    ""
   ]
  ],
  "lek": "etage-1/02-leiter-widerstand.html"
 }
];
