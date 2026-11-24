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
  ],
  "aus": "ma-the-ma-TIK [matemaˈtiːk]"
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
  ],
  "aus": "SENK-recht [ˈzɛŋkʁɛçt] · per-PEN-di-kel [pɛʁˈpɛndɪkl̩]"
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
  ],
  "aus": "kon-STAN-te [kɔnˈstantə]"
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
  ],
  "aus": "va-ri-A-ble [vaˈʁi̯aːblə]"
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
  ],
  "aus": "pa-ral-LEL [paʁaˈleːl]"
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
  ],
  "aus": "di-a-go-NA-le [di̯aɡoˈnaːlə]"
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
  ],
  "aus": "ka-THE-te [kaˈteːtə]"
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
  ],
  "aus": "hy-po-te-NU-se [hypoteˈnuːzə]"
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
  ],
  "aus": "ge-o-me-TRIE [ɡeomeˈtʁiː]"
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
  ],
  "aus": "RA-di-us [ˈʁaːdi̯ʊs] · DURCH-mes-ser [ˈdʊʁçˌmɛsɐ]"
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
  ],
  "aus": "pro-ZENT [pʁoˈt͡sɛnt]"
 },
 {
  "w": "die Algebra",
  "fach": "Mathematik",
  "ru": "алгебра",
  "h": "arab",
  "her": "араб. al-ǧabr (аль-джабр) «восполнение, дополнение» – слово из названия книги аль-Хорезми «Китаб аль-мухтасар фи хисаб аль-джабр валь-мукабала» – «Краткая книга о счёте через дополнение и уравнивание» (около 825 г.)",
  "erk": "Наука о решении уравнений. Аль-Хорезми (родился около 780 г. в Хорезме – Средняя Азия, у Аральского моря; работал в Багдаде, в «Доме мудрости») описал два приёма: al-ǧabr – «дополнить»: перенести вычитаемое на другую сторону как сложение; al-muqābala – «уравнять»: убрать одинаковое с обеих сторон. В 1145 г. книгу перевели на латынь (Liber algebrae et almucabala) – так слово попало в Европу.",
  "bsp": [
   [
    "x − 3 = 5 → x = 5 + 3 = 8",
    "al-ǧabr – das Ergänzen (дополнение)"
   ],
   [
    "x + 3 = 5 + 3 → x = 5",
    "al-muqābala – das Ausgleichen (уравнивание)"
   ]
  ],
  "aus": "AL-ge-bra [ˈalɡebʁa]",
  "links": [
   [
    "die Algebra",
    "https://de.wikipedia.org/wiki/Algebra"
   ],
   [
    "das Buch „Hisab al-dschabr wa-l-muqabala“ (um 825)",
    "https://de.wikipedia.org/wiki/Hisab_al-dschabr_wa-l-muqabala"
   ],
   [
    "al-Chwarizmi – der Mathematiker",
    "https://de.wikipedia.org/wiki/Al-Chwarizmi"
   ],
   [
    "Choresmien – seine Heimat",
    "https://de.wikipedia.org/wiki/Choresm"
   ],
   [
    "das Haus der Weisheit in Bagdad",
    "https://de.wikipedia.org/wiki/Haus_der_Weisheit_(Bagdad)"
   ],
   [
    "die Mathematik in der Blütezeit des Islam",
    "https://de.wikipedia.org/wiki/Mathematik_in_der_Bl%C3%BCtezeit_des_Islam"
   ]
  ],
  "ver": "Родственник: der Algorithmus – тоже от аль-Хорезми. Испанское algebrista когда-то значило «костоправ» – тот, кто «восстанавливает» кости (тот же корень ǧabr)."
 },
 {
  "w": "der Algorithmus",
  "fach": "Mathematik",
  "ru": "алгоритм",
  "h": "lat",
  "her": "от имени аль-Хорезми (al-Ḫwārizmī = «хорезмиец»), лат. Algorismi → Algorismus → der Algorithmus (буквы -rith- – под влиянием греч. arithmos «число»)",
  "erk": "Точная последовательность шагов для решения задачи. Латинский перевод его книги о счёте индийскими цифрами (XII век) начинался словами «Dixit Algorizmi…» – «сказал аль-Хорезми». В 1983 г. в СССР вышла марка к 1200-летию со дня его рождения.",
  "bsp": [
   [
    "Ein Kochrezept ist auch ein Algorithmus.",
    ""
   ],
   [
    "Der schriftliche Rechenweg der Division ist ein Algorithmus.",
    ""
   ]
  ],
  "aus": "al-go-RITH-mus [alɡoˈʁɪtmʊs]",
  "links": [
   [
    "der Algorithmus (mit Briefmarke 1983)",
    "https://de.wikipedia.org/wiki/Algorithmus"
   ],
   [
    "al-Chwarizmi – der Namensgeber",
    "https://de.wikipedia.org/wiki/Al-Chwarizmi"
   ],
   [
    "„Dixit Algorizmi“ – die lateinische Übersetzung",
    "https://de.wikipedia.org/wiki/Dixit_Algorizmi"
   ],
   [
    "Choresmien",
    "https://de.wikipedia.org/wiki/Choresm"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "sum-MAND [zʊˈmant]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "SUM-me [ˈzʊmə]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "mi-nu-END [minuˈɛnt]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "sub-tra-HEND [zʊptʁaˈhɛnt]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "dif-fe-RENZ [dɪfəˈʁɛnt͡s]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "FAK-tor [ˈfaktoːɐ̯]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "pro-DUKT [pʁoˈdʊkt]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "di-vi-DEND [diviˈdɛnt]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "di-VI-sor [diˈviːzoːɐ̯]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "quo-ti-ENT [kvoˈt͡si̯ɛnt]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "BA-sis [ˈbaːzɪs]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "ex-po-NENT [ɛkspoˈnɛnt]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "po-TENZ [poˈtɛnt͡s]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "ra-di-KAND [ʁadiˈkant]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "WUR-zel [ˈvʊʁt͡sl̩]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "lo-ga-RITH-mus [loɡaˈʁɪtmʊs]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "NU-me-rus [ˈnuːməʁʊs]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "kom-mu-ta-TIF-ge-setz [kɔmutaˈtiːfɡəˌzɛt͡s]",
  "links": [
   [
    "das Kommutativgesetz",
    "https://de.wikipedia.org/wiki/Kommutativgesetz"
   ]
  ]
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "as-so-zi-a-TIF-ge-setz [asot͡si̯aˈtiːfɡəˌzɛt͡s]",
  "links": [
   [
    "das Assoziativgesetz",
    "https://de.wikipedia.org/wiki/Assoziativgesetz"
   ]
  ]
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "dis-tri-bu-TIF-ge-setz [dɪstʁibuˈtiːfɡəˌzɛt͡s]",
  "links": [
   [
    "das Distributivgesetz",
    "https://de.wikipedia.org/wiki/Distributivgesetz"
   ]
  ]
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "KLAM-mer [ˈklamɐ]"
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
  "lek": "kurs-1-mathematik/01-rechenarten.html",
  "aus": "REI-hen-fol-ge [ˈʁaɪ̯ənˌfɔlɡə]"
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
  ],
  "aus": "BRUCH [bʁʊx]"
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "GAN-ze ZAHL [ˈɡant͡sə ˈt͡saːl]"
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
  ],
  "aus": "DREI-satz [ˈdʁaɪ̯zat͡s]"
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
  ],
  "aus": "GLEI-chung [ˈɡlaɪ̯çʊŋ]"
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
  ],
  "aus": "funk-TSION [fʊŋkˈt͡si̯oːn]"
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "na-TÜR-li-che ZAHL [naˈtyːɐ̯lɪçə ˈt͡saːl]",
  "links": [
   [
    "der Zahlenbereich",
    "https://de.wikipedia.org/wiki/Zahlenbereich"
   ]
  ]
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "ra-tsio-NA-le ZAHL [ʁat͡si̯oˈnaːlə ˈt͡saːl]",
  "links": [
   [
    "der Zahlenbereich",
    "https://de.wikipedia.org/wiki/Zahlenbereich"
   ]
  ]
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
  "erk": "Число, которое нельзя записать дробью: бесконечно много знаков после запятой без периода. Примеры: √2, π, e. Лежит НЕ внутри ℚ, а рядом: ℚ + иррациональные = ℝ.",
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "IR-ra-tsio-na-le ZAHL [ˈɪʁat͡si̯oˌnaːlə ˈt͡saːl]",
  "links": [
   [
    "die irrationale Zahl",
    "https://de.wikipedia.org/wiki/Irrationale_Zahl"
   ]
  ]
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
  "erk": "Все рациональные и иррациональные числа вместе (ℝ = ℚ + иррациональные) – каждая точка числовой прямой, каждый результат измерения. Обозначение ℝ.",
  "ver": "Родственники: real, die Realität, реальный. «Вещественное» – калька: res = вещь.",
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "re-EL-le ZAHL [ʁeˈɛlə ˈt͡saːl]",
  "links": [
   [
    "der Zahlenbereich",
    "https://de.wikipedia.org/wiki/Zahlenbereich"
   ]
  ]
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "re-la-TI-ve ZAHL [ʁelaˈtiːvə ˈt͡saːl]"
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "ZAH-len-ge-ra-de [ˈt͡saːlənɡəˌʁaːdə]"
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "be-TRAG [bəˈtʁaːk]",
  "links": [
   [
    "der Betrag (die Betragsfunktion)",
    "https://de.wikipedia.org/wiki/Betragsfunktion"
   ]
  ]
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "VOR-zei-chen [ˈfoːɐ̯ˌt͡saɪ̯çn̩]"
 },
 {
  "w": "das Rechenzeichen",
  "fach": "Mathematik",
  "ru": "знак действия (+ − · :)",
  "h": "germ",
  "her": "нем. rechnen «считать» + das Zeichen «знак»",
  "erk": "Знак, который говорит, ЧТО делать: +, −, ·, :. Отличать от das Vorzeichen (знак самого числа).",
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "RE-chen-zei-chen [ˈʁɛçn̩ˌt͡saɪ̯çn̩]"
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "GE-gen-zahl [ˈɡeːɡn̩ˌt͡saːl]"
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
  "erk": "Напряжение точки относительно точки отсчёта (die Masse, 0 V). Знак φ – греческая буква das Phi [fiː], «фи». Напряжение между двумя точками – разность потенциалов: U = φA − φB.",
  "ver": "Родственники: die Potenz (степень), potent, потенциальный. Пишут и Potential, и Potenzial – оба верно.",
  "bsp": [
   [
    "φ = +12 V gegen Masse",
    ""
   ]
  ],
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "po-ten-TSIAL [potɛnˈt͡si̯aːl]",
  "links": [
   [
    "das elektrische Potential",
    "https://de.wikipedia.org/wiki/Elektrisches_Potential"
   ]
  ]
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
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "aus": "MAS-se [ˈmasə]"
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
  "lek": "etage-1/01-ladung-strom-spannung.html",
  "aus": "SPAN-nung [ˈʃpanʊŋ]"
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
  "lek": "etage-1/01-ladung-strom-spannung.html",
  "aus": "STROM [ʃtʁoːm]"
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
  "lek": "etage-1/02-leiter-widerstand.html",
  "aus": "WI-der-stand [ˈviːdɐˌʃtant]"
 },
 {
  "w": "die komplexe Zahl",
  "fach": "Mathematik",
  "ru": "комплексное число",
  "h": "lat",
  "k": [
   "komplexe Zahlen",
   "ℂ",
   "Realteil",
   "Imaginärteil"
  ],
  "her": "лат. complexus «сплетённый, составной» ← com-plectere «сплетать» → «составное число»",
  "erk": "Число из двух частей: der Realteil + der Imaginärteil · i, например z = 3 + 4i. Множество ℂ включает все действительные числа. В электротехнике нужны для расчёта переменного тока (Modul 6); там пишут j вместо i.",
  "ver": "Родственники: der Komplex, kompliziert, комплекс.",
  "bsp": [
   [
    "z = 3 + 4i",
    ""
   ],
   [
    "Z = R + jX",
    "der komplexe Widerstand in der Elektrotechnik"
   ]
  ],
  "aus": "kom-PLE-xe ZAHL [kɔmˈplɛksə ˈt͡saːl]",
  "lek": "kurs-1-mathematik/02-zahlenarten.html",
  "links": [
   [
    "die komplexe Zahl",
    "https://de.wikipedia.org/wiki/Komplexe_Zahl"
   ]
  ]
 },
 {
  "w": "die imaginäre Einheit",
  "fach": "Mathematik",
  "ru": "мнимая единица",
  "h": "lat",
  "k": [
   "imaginär",
   "i",
   "j"
  ],
  "her": "лат. imaginarius «воображаемый» ← imago «образ» → «воображаемая единица»",
  "erk": "Число i, для которого i² = −1. «Воображаемое», потому что среди действительных чисел такого нет. Электрики пишут j, потому что i (I) – это ток.",
  "ver": "Родственники: das Image, die Imagination, имидж. «Мнимая» – калька.",
  "bsp": [
   [
    "i² = −1",
    ""
   ],
   [
    "√(−4) = 2i",
    ""
   ]
  ],
  "aus": "i-ma-gi-NÄ-re EIN-heit [imaɡiˈnɛːʁə ˈaɪ̯nhaɪ̯t]",
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 },
 {
  "w": "das Phi",
  "fach": "Elektrotechnik",
  "ru": "фи (греческая буква φ, Φ)",
  "h": "griech",
  "k": [
   "φ",
   "Φ",
   "phi"
  ],
  "her": "греч. φῖ (phi) – 21-я буква греческого алфавита",
  "erk": "Маленькая φ – потенциал (das Potential) или угол сдвига фаз (der Phasenwinkel); большая Φ – магнитный поток (der magnetische Fluss). Названия греческих букв в немецком среднего рода: das Phi.",
  "bsp": [
   [
    "U = φA − φB",
    "die Spannung als Differenz der Potentiale"
   ]
  ],
  "aus": "FI [fiː]",
  "lek": "kurs-1-mathematik/02-zahlenarten.html"
 }
];
