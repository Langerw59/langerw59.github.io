// =============================================================
// en_erklaerung.js – Erklärungen zum englischen Satz (auf Russisch)
// RU: Объяснения английской грамматики на русском (с подсказками из немецкого)
// window.EN_ERKLAERUNG(cfg, r) → HTML
// Version 1 (2026-11-02)
// =============================================================

(() => {
  "use strict";
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const en = (s) => `<span class="ek-de">${esc(s)}</span>`;
  const E = () => window.EN_ENGINE;

  const PERS = [
    { key: "i", pron: { id: "I", form: "I", key: "i" }, lbl: "I", ru: "я" },
    { key: "you", pron: { id: "you", form: "you", key: "you" }, lbl: "you", ru: "ты" },
    { key: "3sg", pron: { id: "he", form: "he", key: "3sg" }, lbl: "he / she / it", ru: "он / она / оно" },
    { key: "pl", pron: { id: "we", form: "we", key: "pl" }, lbl: "we", ru: "мы" },
    { key: "pl", pron: { id: "you_pl", form: "you", key: "pl" }, lbl: "you", ru: "вы" },
    { key: "pl", pron: { id: "they", form: "they", key: "pl" }, lbl: "they", ru: "они" },
  ];

  // Erklärungen zu den Zeitformen
  const TZ = {
    pres_simple: {
      formel: "V1 (для he/she/it: V1 + <b>-s</b>). Вопрос и отрицание — с <b>do / does</b>.",
      wann: "регулярно, всегда, привычки, факты: «Я каждый день хожу домой», «Вода кипит при 100°».",
      signal: "always, usually, often, sometimes, never, every day, on Mondays",
      de: "Немецкий Präsens, когда речь о привычке: «Ich gehe jeden Tag nach Hause».",
      fehler: "Забыть -s: «He go» ✗ → «He goes» ✓. После does — без -s: «Does he go?» ✓, «Does he goes?» ✗",
    },
    pres_prog: {
      formel: "<b>am / is / are</b> + V-<b>ing</b>",
      wann: "прямо сейчас, в данный момент; временно; договорённость на ближайшее будущее.",
      signal: "now, at the moment, right now, today, look!, listen!",
      de: "В немецком нет отдельной формы — говорят «Ich gehe gerade nach Hause».",
      fehler: "Глаголы состояния (know, like, want, need) не ставят в -ing: «I am knowing» ✗ → «I know» ✓",
    },
    pres_perf: {
      formel: "<b>have / has</b> + V3 (past participle)",
      wann: "результат важен сейчас; опыт в жизни; «уже / ещё не / только что»; длится до сих пор (с since/for).",
      signal: "already, just, yet, ever, never, since, for, so far",
      de: "Похоже на немецкий Perfekt, но <u>не то же самое</u>: «Ich bin gestern gegangen» → «I went yesterday», а не «I have gone yesterday».",
      fehler: "Present Perfect + yesterday / last week / ago / in 2020 — ошибка! С конкретным прошлым временем — только Past Simple.",
    },
    pres_perf_prog: {
      formel: "<b>have / has + been</b> + V-<b>ing</b>",
      wann: "действие началось в прошлом и длится до сих пор (часто — с for / since).",
      signal: "for two hours, since Monday, all day, how long",
      de: "Немецкий Präsens + seit: «Ich warte seit zwei Stunden» → «I have been waiting for two hours».",
      fehler: "«I wait for two hours» ✗ — так нельзя; только «I have been waiting…» ✓",
    },
    past_simple: {
      formel: "V2 (правильные: + <b>-ed</b>; неправильные — учить: go – <b>went</b>). Вопрос и отрицание — с <b>did</b> + V1.",
      wann: "закончилось в прошлом, известно когда: вчера, в 2020 году, два дня назад.",
      signal: "yesterday, last week, two days ago, in 2020, when I was young",
      de: "Немецкий Präteritum <u>и</u> разговорный Perfekt: «Ich bin gestern gegangen / ich ging gestern» → «I went yesterday».",
      fehler: "После did — V1, не V2: «Did he go?» ✓, «Did he went?» ✗",
    },
    past_prog: {
      formel: "<b>was / were</b> + V-<b>ing</b>",
      wann: "процесс в конкретный момент прошлого; фон для другого действия: «Я шёл домой, когда зазвонил телефон».",
      signal: "at 7 o'clock yesterday, while, when",
      de: "Немецкий Präteritum + gerade: «Ich ging gerade nach Hause, als …».",
      fehler: "I/he/she/it — was, you/we/they — were: «they was» ✗",
    },
    past_perf: {
      formel: "<b>had</b> + V3",
      wann: "действие было ещё раньше другого действия в прошлом.",
      signal: "before, after, already, by the time",
      de: "Немецкий Plusquamperfekt: «Er war schon gegangen» → «He had already gone».",
      fehler: "had — одинаково для всех лиц.",
    },
    past_perf_prog: {
      formel: "<b>had been</b> + V-<b>ing</b>",
      wann: "длилось какое-то время до момента в прошлом.",
      signal: "for two hours, since",
      de: "Немецкий Plusquamperfekt + seit.",
      fehler: "Используется редко — для начала можно пропустить.",
    },
    fut_simple: {
      formel: "<b>will</b> + V1 (одинаково для всех лиц)",
      wann: "решение в момент речи, обещание, предсказание: «Я, пожалуй, пойду домой».",
      signal: "tomorrow, next week, soon, I think, probably",
      de: "Немецкий Futur I (werden + Infinitiv). Но <b>will</b> ≠ немецкое «will» (хочу)! «I will go» = «Ich werde gehen».",
      fehler: "После will — без -s и без to: «He will go» ✓, «He will goes / will to go» ✗",
    },
    going_to: {
      formel: "<b>am / is / are + going to</b> + V1",
      wann: "план, намерение, решено заранее; видно, что сейчас произойдёт.",
      signal: "tomorrow, next week, look!",
      de: "Немецкое «ich habe vor …» / «ich werde …».",
      fehler: "Не забыть am/is/are: «I going to» ✗ → «I am going to» ✓",
    },
    fut_prog: {
      formel: "<b>will be</b> + V-<b>ing</b>",
      wann: "процесс в определённый момент будущего: «Завтра в 8 я буду ехать домой».",
      signal: "at 8 o'clock tomorrow, this time next week",
      de: "Немецкий Futur I + gerade.",
      fehler: "Используется редко.",
    },
    fut_perf: {
      formel: "<b>will have</b> + V3",
      wann: "к определённому моменту в будущем уже будет сделано.",
      signal: "by tomorrow, by 8 o'clock, by the time",
      de: "Немецкий Futur II: «Er wird nach Hause gegangen sein» → «He will have gone home».",
      fehler: "Используется редко.",
    },
    fut_perf_prog: {
      formel: "<b>will have been</b> + V-<b>ing</b>",
      wann: "к моменту в будущем действие будет длиться уже какое-то время.",
      signal: "for two years by next month",
      de: "Немецкий Futur II + seit — почти не употребляется.",
      fehler: "Очень редкое время — достаточно узнавать.",
    },
  };

  function block(nr, titel, inhalt, offen) {
    return `<details class="ek-block"${offen ? " open" : ""}><summary><span class="ek-nr">${nr}</span> ${titel}</summary><div class="ek-inhalt">${inhalt}</div></details>`;
  }

  // 0) Alle Zeitformen + Satzarten (nur im Generator)
  function teilUebersicht(cfg, r) {
    const bau = (a) => { try { return E().bauen(Object.assign({}, cfg, a)); } catch (e) { return { fehler: "–" }; } };
    const zelle = (x) => (x.fehler ? `<span class="ek-klein">${esc(x.fehler)}</span>` : `<b>${esc(x.text)}</b>`);
    let gruppe = "";
    const zeilen = Object.entries(E().TENSES).map(([t, info]) => {
      const kopf = info.gruppe !== gruppe ? `<tr><th colspan="3" class="ek-gruppe">${info.gruppe} — ${info.gruppe === "Present" ? "настоящее" : info.gruppe === "Past" ? "прошедшее" : "будущее"}</th></tr>` : "";
      gruppe = info.gruppe;
      return kopf + `<tr class="${t === cfg.tense ? "ek-aktiv" : ""}"><td><b>${esc(info.en)}</b><br><small>${esc(info.ru)}</small></td><td>${zelle(bau({ tense: t, neg: false, satzart: "aussage" }))}</td><td><small>${esc(info.de)}</small></td></tr>`;
    });
    const fn = ["ort", "zeit", "akk", "art", "freq"].find((k) => (k === "akk" ? cfg.obj : k === "freq" ? cfg.freq : cfg[k]));
    const sa = [
      ["Statement", "утверждение", { satzart: "aussage", neg: false }],
      ["Negative", "отрицание", { satzart: "aussage", neg: true }],
      ["Yes/No question", "вопрос «да/нет»", { satzart: "frage", neg: false }],
      ["Wh-question", "вопрос с вопросительным словом", fn ? { satzart: "wfrage", neg: false, fragNach: fn } : null],
      ["Subject question", "вопрос к подлежащему (кто?)", { satzart: "wfrage", neg: false, fragNach: "subj" }],
    ].filter((x) => x[2]).map(([n, ru, a]) => {
      const x = bau(a);
      const aktiv = a.satzart === cfg.satzart && !!a.neg === !!cfg.neg && (a.satzart !== "wfrage" || a.fragNach === cfg.fragNach);
      return `<tr class="${aktiv ? "ek-aktiv" : ""}"><td><b>${n}</b><br><small>${ru}</small></td><td>${zelle(x)}${x.textKurz ? `<br><small>разговорно: ${esc(x.textKurz)}</small>` : ""}</td></tr>`;
    });
    return `<p>Твоё предложение <b>во всех временах</b> (жёлтым — выбранное). Справа — что примерно соответствует по-немецки:</p>
      <table class="ek-tab"><tbody>${zeilen.join("")}</tbody></table>
      <p class="ek-klein">Для начала (уровень 1–2) важнее всего: <b>Present Simple, Present Progressive, Past Simple, Present Perfect, will, going to</b>. Остальные — узнавать.</p>
      <p>И <b>во всех типах предложения</b> (в выбранном времени):</p>
      <table class="ek-tab"><tbody>${sa.join("")}</tbody></table>`;
  }

  // 1) Verbform
  function teilVerbform(cfg, r) {
    const f = r.formen;
    const finite = (r.kette && r.kette[0]) ? r.kette[0].text : "";
    let h = "";
    const pers = PERS.find((p) => p.key === r.key) || PERS[2];
    if (cfg.tense === "pres_simple" && !r.brauchtDo && f) {
      const formJetzt = r.key === "3sg" ? f.s : f.base;
      h += `<p>Подлежащее — <b>${esc(pers.lbl)}</b> (${esc(pers.ru)}). В Present Simple у глагола почти нет окончаний — <u>кроме одного</u>:</p>
        <div class="ek-merke"><b>Правило «-s»:</b> только для <b>he / she / it</b> (и одного человека/предмета: my son, the car) к глаголу добавляется <b>-s</b>:
        ${en("I go, you go, we go, they go")} — но ${en("he goes, she goes, it goes")}.<br>
        Сейчас: ${en(formJetzt)}${r.key === "3sg" ? " — потому что подлежащее в 3-м лице единственного числа." : " — без -s, потому что подлежащее не he/she/it."}</div>
        <p><b>Как пишется -s:</b></p><ul class="ek-liste">
        <li>после <b>o, s, sh, ch, x</b> → <b>-es</b>: go → ${en("goes")}, watch → ${en("watches")}, wash → ${en("washes")}</li>
        <li>согласная + <b>y</b> → <b>-ies</b>: study → ${en("studies")}, carry → ${en("carries")} (но play → plays: перед y гласная)</li>
        <li>исключение: have → ${en("has")}</li></ul>`;
    } else if (r.brauchtDo) {
      const op = r.kette[0].text;
      h += `<div class="ek-merke">В ${cfg.tense === "past_simple" ? "Past Simple" : "Present Simple"} для вопроса и отрицания нужен «помощник» <b>${esc(op)}</b>.
        Он берёт на себя всю грамматику (лицо, время), а смысловой глагол стоит в <b>начальной форме (V1)</b>: ${en(r.kette.map((k) => k.text).join(" … "))}.<br>
        ${op === "does" ? `Поэтому: ${en("Does he go?")} ✓ — а не «Does he goes?» ✗ (окончание -s уже «забрал» does).` : op === "did" ? `Поэтому: ${en("Did he go?")} ✓ — а не «Did he went?» ✗ (прошедшее время уже «забрал» did).` : `Для he/she/it помощник — <b>does</b>, для остальных — <b>do</b>, в прошедшем для всех — <b>did</b>.`}</div>`;
    } else if (r.kette && r.kette.length) {
      h += `<p>Глагол здесь состоит из нескольких частей: ${r.kette.map((k) => en(k.text) + ` <small>(${esc(k.name)})</small>`).join(" + ")}.</p>
        <div class="ek-merke">По лицам меняется <u>только первый вспомогательный глагол</u> (${en(finite)}) —
        ${/^(am|is|are|was|were)$/.test(finite) ? "be: I <b>am</b>, he/she/it <b>is</b>, you/we/they <b>are</b>; в прошедшем I/he <b>was</b>, you/we/they <b>were</b>." : /^(have|has)$/.test(finite) ? "have: he/she/it <b>has</b>, все остальные <b>have</b>." : "will / had / can — одинаково для всех лиц."}
        Смысловой глагол не меняется.</div>`;
    }
    if (f && cfg.tense && !cfg.verbUnbekannt) {
      const zeilen = PERS.map((p) => {
        let x;
        try { x = E().bauen(Object.assign({}, cfg, { subj: { pron: p.pron }, satzart: "aussage", neg: false, io: cfg.io, obj: cfg.obj, art: null, ort: null, zeit: null, freq: null })); } catch (e) { x = { text: "–" }; }
        const aktiv = p.key === r.key && (p.key !== "pl" || p.pron.id === (cfg.subj && cfg.subj.pron ? cfg.subj.pron.id : "they"));
        return `<tr class="${aktiv ? "ek-aktiv" : ""}"><td>${esc(p.lbl)}<br><small>${esc(p.ru)}</small></td><td><b>${esc((x.text || "").replace(/\.$/, ""))}</b></td></tr>`;
      });
      h += `<p><b>Все лица</b> в этом времени:</p><table class="ek-tab"><tbody>${zeilen.join("")}</tbody></table>`;
    }
    return h;
  }

  // 2) Verb: 3 Formen
  function teilVerb(cfg, r) {
    const v = cfg.verb;
    if (!v || cfg.verbUnbekannt) return `<p>Этого глагола пока нет в базе. У каждого английского глагола три формы: <b>V1</b> (go), <b>V2</b> (went), <b>V3</b> (gone) + форма на <b>-ing</b>.</p>`;
    const f = r.formen || E().formen(v);
    let h = `<table class="ek-tab"><thead><tr><th>V1<br><small>base</small></th><th>V2<br><small>past</small></th><th>V3<br><small>past participle</small></th><th>-ing</th><th>-s</th></tr></thead>
      <tbody><tr><td><b>${esc(f.base)}</b></td><td><b>${esc(f.past)}</b></td><td><b>${esc(f.pp)}</b></td><td>${esc(f.ing)}</td><td>${esc(f.s)}</td></tr></tbody></table>
      <p>Перевод: <b>${esc(v.ru || "")}</b>${v.de ? ` · по-немецки: ${esc(v.de)}` : ""}</p><ul class="ek-liste">`;
    if (f.unregelmaessig) h += `<li><b>irregular verb</b> — неправильный глагол: V2 и V3 нужно <u>учить наизусть</u> (как немецкие сильные глаголы: gehen – ging – gegangen ↔ go – went – gone).</li>`;
    else h += `<li><b>regular verb</b> — правильный глагол: V2 = V3 = V1 + <b>-ed</b> (work → worked). Как немецкие слабые глаголы (arbeiten – arbeitete – gearbeitet).</li>`;
    if (v.obj === "pflicht") h += `<li><b>transitive</b> (переходный): нужно дополнение «кого? что?» — ${en(v.base + " a book / my son")}.</li>`;
    else if (v.obj === "optional") h += `<li>дополнение можно добавить или нет: ${en("I eat.")} и ${en("I eat an apple.")}</li>`;
    else h += `<li><b>intransitive</b> (непереходный): без дополнения «что?». Вместо него — куда? где? когда?</li>`;
    if (v.io) h += `<li>может иметь <b>косвенное дополнение</b> (кому?): ${en(v.base + " my son a book")} = ${en(v.base + " a book to my son")}.</li>`;
    if (v.note) h += `<li>${esc(v.note)}</li>`;
    if (f.pp === "gone") h += `<li><b>gone</b> или <b>been</b>? ${en("He has gone to Berlin")} — уехал и сейчас там. ${en("He has been to Berlin")} — был там (и вернулся).</li>`;
    return h + "</ul>";
  }

  // 3) Wortstellung
  function teilWortstellung(cfg, r) {
    let h = `<div class="ek-merke"><b>Главное правило английского:</b> порядок слов <u>жёсткий</u>:
      <b>Подлежащее → Глагол → Дополнение → Как? → Где/куда? → Когда?</b><br>
      (S – V – O – M – P – T). ${en("My son | gave | his grandma | a letter | yesterday.")}</div>`;
    if (cfg.satzart === "aussage" || (cfg.satzart === "wfrage" && cfg.fragNach === "subj")) {
      h += `<p><b>Отличие от немецкого:</b> в немецком глагол всегда на 2-м месте, и если начать со времени, подлежащее «перепрыгивает» за глагол:
        ${en("Heute geht er nach Hause.")} В английском — <u>нет</u>! Подлежащее всегда стоит <b>перед</b> глаголом:
        ${en("Today he goes home.")} ✓ — а не «Today goes he home» ✗.</p>`;
      const z = r.segmente.find((s) => s.rolle === "zeit" && !/frequency/.test(s.info));
      if (z) {
        const rest = r.segmente.filter((s) => s !== z).map((s) => s.text);
        h += `<p>Твоё предложение можно начать со времени (тогда ставят запятую): ${en(capFirst(z.text) + ", " + rest.join(" ") + ".")}</p>`;
      }
    } else if (cfg.satzart === "frage") {
      h += `<p><b>Вопрос «да/нет»:</b> на 1-е место встаёт <u>вспомогательный глагол</u> (do/does/did, is, have, will, can…), потом подлежащее, потом смысловой глагол:
        ${en("Does he go home?")} — ${en("Is he going home?")} — ${en("Has he gone home?")}<br>
        В немецком на 1-е место встаёт сам глагол («Geht er nach Hause?»), в английском так можно только с be, have (в Perfect), will, can.</p>`;
    } else {
      h += `<p><b>Вопрос с вопросительным словом:</b> вопросительное слово → вспомогательный глагол → подлежащее → смысловой глагол:
        ${en("Where does he go?")} — ${en("When did you come?")} — ${en("What are you doing?")}</p>
        <p class="ek-klein">Исключение — вопрос к подлежащему (кто?): там нет do/does и нет перестановки: ${en("Who goes home?")} ✓ (а не «Who does go home?»).</p>`;
    }
    return h;
  }

  // 4) Zeitform
  function teilZeit(cfg, r) {
    if (r.modal) return `<div class="ek-merke"><b>Modal verb «${esc(r.modal)}»</b> (модальный глагол): can (мочь), must (должен), should (следует), may (можно).
      После него — <b>V1 без to</b> и <b>без -s</b>: ${en("He can swim.")} ✓ — не «He cans swim» и не «He can to swim» ✗.<br>
      Вопрос и отрицание — без do: ${en("Can he swim? He cannot (can't) swim.")}</div>`;
    if (r.passiv) return `<div class="ek-merke"><b>Passive</b> (страдательный залог) = <b>be</b> + V3: ${en("The letter was written yesterday.")} — Письмо было написано вчера.
      Как немецкий Passiv (werden + Partizip II): «Der Brief wurde gestern geschrieben».</div>`;
    const t = TZ[cfg.tense];
    const info = E().TENSES[cfg.tense];
    if (!t || !info) return "";
    return `<p><b>${esc(info.en)}</b> — ${esc(info.ru)}.</p>
      <div class="ek-merke"><b>Как образуется:</b> ${t.formel}<br>
      <b>Когда:</b> ${t.wann}<br>
      <b>Слова-сигналы:</b> <i>${esc(t.signal)}</i><br>
      <b>Сравни с немецким:</b> ${t.de}</div>
      <p class="ek-klein">⚠ Типичная ошибка: ${t.fehler}</p>`;
  }

  // 5) Artikel
  function teilArtikel(cfg, r) {
    const nps = r.segmente.filter((s) => ["subj", "akk", "dat"].includes(s.rolle) && /\b(a|an|the)\b/i.test(s.text));
    if (!nps.length) return "";
    return `<p>В твоём предложении: ${nps.map((s) => en(s.text)).join(", ")}.</p>
      <div class="ek-merke"><b>a / an</b> — «какой-то, один» (как немецкое ein/eine), только с <u>единственным числом</u>:
      <b>a</b> перед согласным <u>звуком</u> (a car, a big apple), <b>an</b> перед гласным звуком (an apple, an old car, an hour — h не читается).<br>
      <b>the</b> — «тот самый, известный» (как der/die/das). Один для всех родов и чисел — в английском <u>нет рода</u>!<br>
      <b>Без артикля:</b> множественное число в общем смысле (I like apples), неисчисляемые (water, money, bread), языки и спорт (English, football),
      и после my/your/his (my car — не «the my car»).</div>`;
  }

  // 6) Ort, Zeit, Häufigkeit
  function teilOrtZeit(cfg, r) {
    const teile = [];
    const text = r.text.toLowerCase();
    if (/\bhome\b/.test(text)) teile.push(`<li><b>home</b> после глаголов движения — <u>без предлога</u>: ${en("go home, come home")} (не «go to home» ✗). Дома (где?) — ${en("at home")}.</li>`);
    if (/\b(always|usually|often|sometimes|rarely|never)\b/.test(text)) teile.push(`<li><b>always, usually, often, sometimes, never</b> стоят <u>перед смысловым глаголом</u>, но <u>после</u> be и первого вспомогательного:
      ${en("He always goes")} — ${en("He is always late")} — ${en("He has never been there")}. В немецком наоборот — после глагола: «Er geht immer».</li>`);
    if (r.segmente.some((s) => s.rolle === "ort") && r.segmente.some((s) => s.rolle === "zeit" && !/frequency/.test(s.info))) teile.push(`<li><b>Место, потом время</b> (в конце предложения): ${en("I go to school every day.")} В немецком обычно наоборот: «Ich gehe jeden Tag zur Schule».</li>`);
    if (/\bto\b/.test(text)) teile.push(`<li><b>to</b> = куда? (to school, to Berlin) · <b>at / in</b> = где? (at school, in Berlin) · <b>from</b> = откуда?</li>`);
    if (r.segmente.some((s) => s.rolle === "dat")) teile.push(`<li>Два дополнения: сначала <b>кому</b>, потом <b>что</b> — оба без предлога: ${en("give my son a book")}. Или наоборот, но тогда с <b>to</b>: ${en("give a book to my son")}.</li>`);
    if (!teile.length) return "";
    return `<ul class="ek-liste">${teile.join("")}</ul>`;
  }

  // 7) Kurzformen
  function teilKurz(cfg, r) {
    const kurz = r.textKurz;
    if (!kurz && !r.ausgeschrieben) return "";
    return `<p>${r.ausgeschrieben ? `Ты написал краткую форму. Полностью: ${en(r.ausgeschrieben)}` : `В разговоре говорят коротко: ${en(kurz)}`}</p>
      <div class="ek-merke">Краткие формы: <b>I'm</b> = I am, <b>he's</b> = he is / he has, <b>they're</b> = they are, <b>I've</b> = I have, <b>I'll</b> = I will,
      <b>don't</b> = do not, <b>doesn't</b> = does not, <b>didn't</b> = did not, <b>isn't</b>, <b>aren't</b>, <b>haven't</b>, <b>hasn't</b>, <b>won't</b> = will not, <b>can't</b> = cannot.<br>
      В письме и на экзамене можно полную форму, в разговоре почти всегда краткую.</div>`;
  }

  function erklaerung(cfg, r) {
    if (!r || r.fehler || !cfg || !E()) return "";
    const bl = [];
    let nr = 1;
    const add = (t, inh, offen) => { if (inh) bl.push(block(nr++, t, inh, offen)); };
    if (!r.analyse) add("Все времена и типы предложения — это же предложение", teilUebersicht(cfg, r), true);
    const finite = r.kette && r.kette.length ? r.kette.map((k) => k.text).join(" ") : "";
    add(`Почему «${esc(finite)}»? — форма глагола`, teilVerbform(cfg, r), true);
    add(`Глагол «${esc(cfg.verb ? cfg.verb.base : "")}» — три формы (V1 – V2 – V3)`, teilVerb(cfg, r), false);
    add("Порядок слов (word order) — и чем он отличается от немецкого", teilWortstellung(cfg, r), false);
    add(`Время ${r.zeitform ? "«" + esc(r.zeitform) + "»" : ""} — как образуется и когда употребляется`, teilZeit(cfg, r), false);
    add("Артикли a / an / the", teilArtikel(cfg, r), false);
    add("Место, время, always / never, home", teilOrtZeit(cfg, r), false);
    add("Краткие формы (don't, he's, I'm …)", teilKurz(cfg, r), false);
    return `<div class="ek-wrap"><div class="ek-titel">📘 Explanation / Объяснение по шагам</div>
      <div class="ek-knoepfe"><button type="button" class="btn ek-alle" data-auf="1">все открыть</button>
      <button type="button" class="btn ek-alle" data-auf="0">все закрыть</button></div>${bl.join("")}</div>`;
  }

  if (typeof window !== "undefined") window.EN_ERKLAERUNG = erklaerung;
  if (typeof document !== "undefined") {
    document.addEventListener("click", (e) => {
      const t = e.target.closest && e.target.closest(".ek-alle");
      if (!t) return;
      document.querySelectorAll(".ek-block").forEach((d) => (d.open = t.dataset.auf === "1"));
    });
  }
})();
