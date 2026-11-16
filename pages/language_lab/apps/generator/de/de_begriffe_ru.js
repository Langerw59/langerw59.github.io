// ============================================================
// de_begriffe_ru.js – Russische Kurzerklärungen der Fachbegriffe
// im Satzlabor (Tabelle „Info“, Satzklammer, Zeitform).
// RU: краткие пояснения грамматических терминов на русском –
// в каждой строке таблицы, в рамке предложения и у времени.
// ============================================================
(function () {
  "use strict";

  // Reihenfolge wichtig: längere Begriffe zuerst (Personalpronomen vor Pronomen usw.)
  const BEGRIFFE = [
    ["finites Verb", "<b>das finite Verb</b> – спрягаемый глагол: форма, изменённая по лицу и числу (ich laufe, er läuft). От лат. <i>finitus</i> «определённый, ограниченный» (не от «финиш»). Противоположность – <b>der Infinitiv</b> (laufen), «неопределённая» форма."],
    ["1. Stelle", "<b>1. Stelle</b> – 1-е место: в вопросе «да/нет» и в повелительном предложении спрягаемый глагол стоит первым (Läufst du?)."],
    ["2. Stelle", "<b>2. Stelle</b> – 2-е место: в обычном повествовательном предложении спрягаемый глагол всегда второй (Heute läuft er …)."],
    ["Personalpronomen", "<b>das Personalpronomen</b> – личное местоимение (ich, du, er, sie, es, wir, ihr, sie). Лат. <i>persona</i> «лицо» + <i>pro nomine</i> «вместо имени»."],
    ["Reflexivpronomen", "<b>das Reflexivpronomen</b> – возвратное местоимение (sich, mich, dich) – как русское «себя» / «-ся»."],
    ["Pronomen", "<b>das Pronomen</b> – местоимение: слово «вместо имени» (er, ihn, ihm …)."],
    ["Nomengruppe", "<b>die Nomengruppe</b> – группа существительного: артикль + (прилагательное) + существительное (der alte Mann)."],
    ["Gleichsetzung", "<b>die Gleichsetzung</b> – «приравнивание»: после sein / werden / bleiben второе существительное тоже в Nominativ (Er ist ein Lehrer)."],
    ["Nominativ", "<b>der Nominativ</b> – именительный падеж (кто? что? – Wer? Was?). Падеж подлежащего."],
    ["Akkusativ", "<b>der Akkusativ</b> – винительный падеж (кого? что? – Wen? Was?). Прямое дополнение."],
    ["Dativ", "<b>der Dativ</b> – дательный падеж (кому? чему? – Wem?)."],
    ["Zeitadverb", "<b>das Zeitadverb</b> – наречие времени (heute, morgen, gestern), вопрос Wann? «когда?»."],
    ["Zeitangabe", "<b>die Zeitangabe</b> – обстоятельство времени (jeden Tag, am Montag)."],
    ["Häufigkeit", "<b>die Häufigkeit</b> – частота (oft, immer, nie), вопрос Wie oft? «как часто?»."],
    ["Art und Weise", "<b>die Art und Weise</b> – образ действия, вопрос Wie? «как?» (schnell, gern)."],
    ["Ortsadverb", "<b>das Ortsadverb</b> – наречие места (hier, dort), вопрос Wo? «где?»."],
    ["Adjektiv", "<b>das Adjektiv</b> – прилагательное. В немецком оно без окончания может работать как наречие (Er läuft schnell)."],
    ["Präpositionalgruppe", "<b>die Präpositionalgruppe</b> – предлог + слово или группа (nach Hause, in die Stadt). Лат. <i>praepositio</i> «поставленное впереди»."],
    ["Präposition", "<b>die Präposition</b> – предлог (in, nach, mit, zu)."],
    ["Konjunktion", "<b>die Konjunktion</b> – союз (weil, dass, als, wenn). После таких союзов спрягаемый глагол уходит в конец."],
    ["Nebensatz", "<b>der Nebensatz</b> – придаточное предложение. Если оно стоит впереди, оно целиком считается за 1-е место."],
    ["Negation", "<b>die Negation</b> – отрицание (nicht, kein)."],
    ["Verneinung", "<b>die Verneinung</b> – отрицание (то же, что die Negation)."],
    ["Fragewort", "<b>das Fragewort</b> – вопросительное слово (wer, was, wann, wo, wohin, warum)."],
    ["Vorsilbe", "<b>die abgetrennte Vorsilbe</b> – отделённая приставка: у отделяемых глаголов (aufstehen → Ich stehe … auf) приставка уходит в конец, в die rechte Klammer."],
    ["Partikel", "<b>die Partikel</b> – частица (doch, ja, mal, nur) – маленькое слово без своего вопроса."],
    ["Adverb", "<b>das Adverb</b> – наречие."],
    ["Zahl", "<b>die Zahl</b> – число."],
    ["ohne Artikel", "<b>ohne Artikel</b> – без артикля."],
    ["nicht in der Datenbank", "этого слова нет в базе программы – его роль угадана."],
  ];

  // Zeitformen – längere zuerst (Plusquamperfekt vor Perfekt, Futur II vor Futur I)
  const ZEITEN = [
    ["Plusquamperfekt", "<b>das Plusquamperfekt</b> – предпрошедшее время: что случилось ещё раньше другого прошлого (Ich war nach Hause gegangen). Лат. <i>plus quam perfectum</i> «более чем завершённое». По-немецки: <b>die vollendete Vergangenheit</b>."],
    ["Perfekt", "<b>das Perfekt</b> – прошедшее время разговорной речи: haben / sein + Partizip II (Ich bin nach Hause gegangen). Лат. <i>perfectum</i> «завершённое». По-немецки: <b>die vollendete Gegenwart</b>."],
    ["Präteritum", "<b>das Präteritum</b> – простое прошедшее время, в основном в книгах и рассказах (Ich ging nach Hause). Лат. <i>praeteritum</i> «прошедшее мимо». По-немецки: <b>die Vergangenheit</b> (раньше также das Imperfekt)."],
    ["Präsens", "<b>das Präsens</b> – настоящее время (Ich gehe nach Hause). Лат. <i>praesens</i> «присутствующий». Часто и для будущего: Morgen gehe ich nach Hause. По-немецки: <b>die Gegenwart</b>."],
    ["Futur II", "<b>das Futur II</b> – будущее завершённое: что к какому-то моменту уже будет сделано (Ich werde nach Hause gegangen sein). По-немецки: <b>die vollendete Zukunft</b>."],
    ["Futur I", "<b>das Futur I</b> – будущее время: werden + Infinitiv (Ich werde nach Hause gehen). Лат. <i>futurum</i> «будущее». По-немецки: <b>die Zukunft</b>."],
    ["Passiv", "<b>das Passiv</b> – страдательный залог: действие совершается над подлежащим (Das Haus wird gebaut – дом строится)."],
    ["Modalverb", "<b>das Modalverb</b> – модальный глагол (können, müssen, wollen, dürfen, sollen, mögen); второй глагол стоит в конце в Infinitiv."],
  ];

  function suche(text, liste) {
    let rest = String(text || "");
    const treffer = [];
    for (const [key, ru] of liste) {
      if (rest.includes(key)) { treffer.push(ru); rest = rest.split(key).join(" "); }
    }
    return treffer;
  }

  // Für die Spalte „Info“: Erklärungen unter dem deutschen Text
  window.DE_RU_INFO = function (info) {
    const t = suche(info, BEGRIFFE);
    return t.length ? t.map((x) => `<div class="sg-ru">${x}</div>`).join("") : "";
  };

  // Für „Zeitform: …“ (+ Hilfsverb)
  window.DE_RU_ZEITFORM = function (zeitform, mitHilfsverb) {
    const t = suche(zeitform, ZEITEN);
    if (mitHilfsverb) t.push("<b>das Hilfsverb</b> – вспомогательный глагол (haben, sein, werden): он спрягается и стоит на 2-м месте, а главный глагол уходит в конец.");
    return t.length ? `<div class="sg-ru-box">${t.map((x) => `<div>${x}</div>`).join("")}</div>` : "";
  };

  // Kurze Zeile unter den Feldern der Satzklammer
  window.DE_RU_FELD = {
    vorfeld: "предполе: всё, что стоит перед глаголом",
    verb: "спрягаемый глагол – левая скобка",
    mittel: "среднее поле: всё между частями глагола",
    ende: "вторая часть глагола (gegangen, auf …) – правая скобка",
  };

  // Aufklappbare Erklärung der Satzklammer
  window.DE_RU_KLAMMER = function () {
    return `<details class="sg-ru-det"><summary>Was ist die Satzklammer? – что такое рамка предложения?</summary>
      <p><b>die Satzklammer</b> – «рамка» (скобка) предложения: глагол в немецком часто состоит из двух частей, и они берут остальные слова «в скобки»:
      <br><i>Ich <b>bin</b> gestern nach Hause <b>gegangen</b>.</i></p>
      <p><b>das Vorfeld</b> (Pos. 1) – «предполе»: всё перед спрягаемым глаголом. Там стоит ровно <b>одна</b> часть предложения (подлежащее, время, место …).</p>
      <p><b>die linke Klammer</b> (Pos. 2) – левая скобка: <b>das finite Verb</b>, спрягаемый глагол (bin, läuft, will).</p>
      <p><b>das Mittelfeld</b> – «среднее поле»: всё между двумя частями глагола. Порядок обычно: время – причина – образ действия – место (правило <b>TeKaMoLo</b>).</p>
      <p><b>die rechte Klammer</b> (Satzende) – правая скобка в конце: Partizip II (gegangen), Infinitiv (gehen) или отделённая приставка (auf). Если глагол из одной части (Er läuft heute nach Hause), правая скобка пустая.</p>
    </details>`;
  };
})();
