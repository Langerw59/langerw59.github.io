// =============================================================
// de_erklaerung.js – Grammatik-Erklärungen zum erzeugten Satz
// RU: Подробные грамматические объяснения на русском («для начинающих»)
// -------------------------------------------------------------
// Wird von de_script.js aufgerufen: window.DE_ERKLAERUNG(cfg, r) → HTML
// Braucht: window.DE_SATZ_ENGINE (praedikat, formen, verbInf)
// Version 1 (2026-11-02)
// =============================================================

(() => {
  "use strict";

  const g = (name) => (typeof window !== "undefined" ? window[name] : undefined);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const b = (s) => `<b>${esc(s)}</b>`;
  const de = (s) => `<span class="ek-de">${esc(s)}</span>`; // немецкий пример

  const PERSONEN = [
    { k: "ich", lbl: "ich", ru: "я", p: "1. Person Singular" },
    { k: "du", lbl: "du", ru: "ты", p: "2. Person Singular" },
    { k: "er", lbl: "er / sie / es", ru: "он / она / оно", p: "3. Person Singular" },
    { k: "wir", lbl: "wir", ru: "мы", p: "1. Person Plural" },
    { k: "ihr", lbl: "ihr", ru: "вы (несколько друзей)", p: "2. Person Plural" },
    { k: "sie", lbl: "sie / Sie", ru: "они / Вы (вежливо)", p: "3. Person Plural" },
  ];
  const ENDUNG = { ich: "-e", du: "-st", er: "-t", wir: "-en", ihr: "-t", sie: "-en" };

  // ------------------------------------------------------------
  // Hilfsfunktionen zum Verb
  // ------------------------------------------------------------
  function stammVon(inf) {
    let s = inf.replace(/^sich\s+/, "");
    if (/(el|er)n$/.test(s)) return s.slice(0, -1); // sammeln → sammel
    if (s.endsWith("en")) return s.slice(0, -2);     // laufen → lauf
    if (s.endsWith("n")) return s.slice(0, -1);      // tun → tu
    return s;
  }

  function istReflexiv(verb, inf) {
    return /^sich\s/.test(inf) || !!(verb.reflexiv || verb.reflexive || verb.sich);
  }

  function istTrennbar(verb, presEr) {
    return !!(verb.trennbar || verb.separable || verb.praefix || verb.prefix) || /\s/.test(presEr || "");
  }

  // Vokalwechsel im Präsens (laufen → er läuft, nehmen → er nimmt)
  function vokalwechsel(stamm, form) {
    if (!form || /\s/.test(form)) return null;
    if (form.startsWith(stamm)) return null;
    let i = 0;
    while (i < stamm.length && i < form.length && stamm[i] === form[i]) i++;
    const alt = stamm[i] || "";
    let neu = form[i] || "";
    let altV = alt;
    if (stamm[i + 1] === "u" && form[i + 1] === "u") { altV += "u"; neu += "u"; } // au → äu
    else if (form[i + 1] === "e" && alt !== "e") neu += "e"; // e → ie
    if (!/[aeiouäöü]/i.test(alt + neu)) return { unregelmaessig: true };
    return { alt: altV, neu };
  }

  // Typ: schwach / stark / gemischt
  function verbTyp(verb, inf, stamm) {
    const part = verb.partizip2 || verb.partizip || "";
    const S = window.DE_SATZ_ENGINE;
    const praetEr = S.formen(verb.praeteritum, "er") || "";
    if (part.endsWith("en")) return { typ: "stark", part, praetEr };
    if (part.endsWith("t") && praetEr && !praetEr.includes(stamm)) return { typ: "gemischt", part, praetEr };
    return { typ: "schwach", part, praetEr };
  }

  // ------------------------------------------------------------
  // Bausteine
  // ------------------------------------------------------------
  function block(nr, titel, inhalt, offen) {
    return `<details class="ek-block"${offen ? " open" : ""}><summary><span class="ek-nr">${nr}</span> ${titel}</summary><div class="ek-inhalt">${inhalt}</div></details>`;
  }

  function konjTabelle(cfg, r, verb) {
    const S = window.DE_SATZ_ENGINE;
    const aux = r.hv ? r.hv.aux : "haben";
    const zeilen = PERSONEN.map((p) => {
      const pr = S.praedikat(verb, cfg.tense, p.k, aux);
      const voll = [pr.finit].concat(pr.rechts).join(" ");
      const aktiv = p.k === r.key;
      const endung = cfg.tense === "praesens" ? `<td class="ek-end">${ENDUNG[p.k]}</td>` : "";
      return `<tr class="${aktiv ? "ek-aktiv" : ""}"><td>${esc(p.lbl)}<br><small>${esc(p.ru)}</small></td><td><b>${esc(voll)}</b></td>${endung}<td><small>${esc(p.p)}</small></td></tr>`;
    });
    const kopfEnd = cfg.tense === "praesens" ? "<th>Endung<br><small>окончание</small></th>" : "";
    return `<table class="ek-tab"><thead><tr><th>Person<br><small>лицо</small></th><th>Form<br><small>форма</small></th>${kopfEnd}<th></th></tr></thead><tbody>${zeilen.join("")}</tbody></table>
      <p class="ek-klein">Жёлтая строка — форма, которая стоит в твоём предложении.</p>`;
  }


  // 0) Derselbe Satz in allen Zeitformen und Satzarten
  const ZF_RU = {
    praesens: ["Präsens", "настоящее"],
    praeteritum: ["Präteritum", "простое прошедшее (книжное)"],
    perfekt: ["Perfekt", "прошедшее (разговорное)"],
    plusquamperfekt: ["Plusquamperfekt", "давнопрошедшее"],
    futur1: ["Futur I", "будущее"],
    futur2: ["Futur II", "будущее совершённое"],
  };
  function teilUebersicht(cfg, r) {
    const S = window.DE_SATZ_ENGINE;
    const bau = (aend) => { try { return S.bauen(Object.assign({}, cfg, aend)); } catch (e) { return { fehler: "–" }; } };
    const zelle = (x) => (x.fehler ? `<span class="ek-klein">${esc(x.fehler)}</span>` : `<b>${esc(x.text)}</b>`);

    const zf = Object.keys(ZF_RU).map((t) => {
      const x = bau({ tense: t });
      const aktiv = t === cfg.tense;
      return `<tr class="${aktiv ? "ek-aktiv" : ""}"><td><b>${ZF_RU[t][0]}</b><br><small>${ZF_RU[t][1]}</small></td><td>${zelle(x)}</td></tr>`;
    });

    // W-Frage: nach dem ersten vorhandenen Satzglied fragen
    const fn = ["ort", "zeit", "akk", "dat", "art", "subj"].find((k) => (k === "subj" ? cfg.subj : cfg[k]));
    const sa = [
      ["Aussagesatz", "утверждение", { satzart: "aussage", verneinung: false }],
      ["Verneinung", "отрицание", { satzart: "aussage", verneinung: true }],
      ["Ja/Nein-Frage", "вопрос «да/нет»", { satzart: "frage", verneinung: false }],
      ["W-Frage", "вопрос с вопросительным словом", { satzart: "wfrage", verneinung: false, fragNach: fn }],
    ].map(([n, ru, aend]) => {
      const x = bau(aend);
      const aktiv = aend.satzart === cfg.satzart && aend.verneinung === !!cfg.verneinung;
      return `<tr class="${aktiv ? "ek-aktiv" : ""}"><td><b>${n}</b><br><small>${ru}</small></td><td>${zelle(x)}</td></tr>`;
    });

    return `<p>Твоё предложение сразу <b>во всех временах</b> (Zeitformen) — жёлтым выбранное:</p>
      <table class="ek-tab"><tbody>${zf.join("")}</tbody></table>
      <p>И <b>во всех типах предложения</b> (Satzarten) — в выбранном времени «${esc(r.zeitform)}»:</p>
      <table class="ek-tab"><tbody>${sa.join("")}</tbody></table>
      <p class="ek-klein">Время и тип предложения выбираются в самом верху левой панели (серый блок «Satzart / Zeitform»).</p>`;
  }

  // 1) Konjugation
  function teilKonjugation(cfg, r) {
    const S = window.DE_SATZ_ENGINE;
    if (cfg.verbUnbekannt) {
      const finitU = r.felder.links[0].text;
      return `<p>Спрягаемый глагол здесь — ${de(finitU)}. Этого глагола пока нет в базе, поэтому полную таблицу спряжения показать не могу.</p>
        <div class="ek-merke"><b>Общее правило Präsens:</b> основа + окончание: ich <b>-e</b>, du <b>-st</b>, er/sie/es <b>-t</b>, wir <b>-en</b>, ihr <b>-t</b>, sie/Sie <b>-en</b>.
        У сильных глаголов в du и er меняется гласная (fahren → er fährt, waschen → er wäscht).</div>`;
    }
    const verb = cfg.verb;
    const inf = S.verbInf(verb);
    const stamm = stammVon(inf);
    const pers = PERSONEN.find((p) => p.k === r.key) || PERSONEN[2];
    const finit = r.felder.links[0].text;
    const subj = (r.segmente.find((s) => s.rolle === "subj") || {}).text || "Wer";
    let h = "";

    h += `<p><b>Infinitiv</b> (неопределённая форма, как в словаре): ${de(inf)}.
      <b>Stamm</b> (основа) = инфинитив без <b>-en</b>: ${de(stamm + "-")}.</p>`;
    h += `<p>Подлежащее ${de(subj)} — это <b>${esc(pers.p)}</b> (${esc(pers.ru)}).
      Немецкий глагол <b>согласуется</b> с подлежащим, как и русский: «я бегу — он бежит».
      Поэтому форма в предложении: ${de(finit)}.</p>`;

    if (cfg.tense === "praesens") {
      const pres = verb.praesens || verb.presens;
      const erForm = S.formen(pres, "er");
      const duForm = S.formen(pres, "du");
      const vw = vokalwechsel(stamm, erForm);
      const naiv = stamm + (/[td]$/.test(stamm) ? "et" : "t");
      if (vw && !vw.unregelmaessig) {
        h += `<div class="ek-merke"><b>Почему ${esc(erForm)}, а не «${esc(naiv)}»?</b><br>
          ${de(inf)} — <b>starkes Verb</b> (сильный глагол). У многих сильных глаголов в Präsens
          <u>только в двух лицах</u> — <b>du</b> и <b>er/sie/es</b> — меняется гласная корня:
          <b>${esc(vw.alt)} → ${esc(vw.neu)}</b>.<br>
          ${de("du " + duForm)}, ${de("er " + erForm)} — но ${de("ich " + S.formen(pres, "ich"))}, ${de("wir " + S.formen(pres, "wir"))} (без изменения).<br>
          Типичные замены: <b>a → ä</b> (fahren → fährt, schlafen → schläft), <b>au → äu</b> (laufen → läuft),
          <b>e → i</b> (nehmen → nimmt, essen → isst), <b>e → ie</b> (sehen → sieht, lesen → liest).
          Правила, какой глагол меняется, нет — это надо запоминать вместе со словом.</div>`;
      } else if (vw && vw.unregelmaessig) {
        h += `<div class="ek-merke">${de(inf)} — <b>unregelmäßiges Verb</b> (неправильный глагол): форма ${de(erForm)}
          не строится по правилу, её нужно просто запомнить.</div>`;
      } else {
        h += `<div class="ek-merke"><b>Правило Präsens:</b> основа ${de(stamm + "-")} + личное окончание.
          Для ${esc(pers.lbl)} окончание <b>${ENDUNG[r.key]}</b> → ${de(finit)}.
          ${/[td]$/.test(stamm) ? "<br>Основа кончается на <b>-t / -d</b> → вставляется <b>-e-</b> для удобства произношения: arbeiten → du arbeit<b>e</b>st, er arbeit<b>e</b>t." : ""}</div>`;
      }
    } else {
      const auxWort = r.felder.links[0].text;
      const welches = cfg.tense === "praeteritum" ? null : (cfg.tense === "futur1" || cfg.tense === "futur2") ? "werden" : (r.hv ? r.hv.aux : "haben");
      if (welches) {
        h += `<div class="ek-merke">В этом времени по лицам изменяется <u>не основной глагол</u>, а <b>Hilfsverb</b>
          (вспомогательный глагол) ${de(welches)} → ${de(auxWort)}.
          Основной глагол стоит в конце и <u>не меняется</u> ни для какого лица.</div>`;
      } else {
        h += `<div class="ek-merke">В Präteritum у <b>ich</b> и <b>er/sie/es</b> <u>нет окончания</u>:
          ${de("ich " + S.formen(verb.praeteritum, "ich"))}, ${de("er " + S.formen(verb.praeteritum, "er"))}.</div>`;
      }
    }
    h += `<p><b>Вся таблица спряжения</b> (Konjugation) в выбранном времени:</p>` + konjTabelle(cfg, r, verb);
    return h;
  }

  // 2) Verbtyp
  function teilVerbtyp(cfg, r) {
    const S = window.DE_SATZ_ENGINE;
    if (cfg.verbUnbekannt) return "";
    const verb = cfg.verb;
    const inf = S.verbInf(verb);
    const stamm = stammVon(inf);
    const val = (g("DE_VERB_VALENZ") || {})[inf] || null;
    const t = verbTyp(verb, inf, stamm);
    const pres = verb.praesens || verb.presens;
    let h = "<ul class='ek-liste'>";

    // stark / schwach
    if (t.typ === "stark") {
      h += `<li><b>starkes (unregelmäßiges) Verb</b> — сильный глагол. Признаки: Partizip II на <b>-en</b> (${de(t.part)}),
        в Präteritum меняется гласная (${de("er " + t.praetEr)}). Три формы учат наизусть:
        ${de(inf + " – " + t.praetEr + " – " + t.part)}.</li>`;
    } else if (t.typ === "gemischt") {
      h += `<li><b>gemischtes Verb</b> — смешанный глагол: гласная меняется (как у сильных),
        но окончания как у слабых: ${de(inf + " – " + t.praetEr + " – " + t.part)}.</li>`;
    } else {
      h += `<li><b>schwaches (regelmäßiges) Verb</b> — слабый, правильный глагол. Всё по правилу:
        Präteritum = основа + <b>-te</b> (${de("er " + t.praetEr)}), Partizip II = <b>ge- … -t</b> (${de(t.part)}).</li>`;
    }

    // transitiv / intransitiv
    const akk = val ? val.akk : undefined;
    if (akk === "pflicht") {
      h += `<li><b>transitives Verb</b> — переходный глагол: <u>требует</u> Akkusativobjekt (кого? что?).
        Без него предложение неполное. Пример: ${de("Ich kaufe einen Apfel.")}</li>`;
    } else if (akk === "optional") {
      h += `<li><b>transitiv, Objekt optional</b> — переходный, но дополнение можно опустить:
        ${de("Ich esse.")} и ${de("Ich esse einen Apfel.")} — оба правильные.</li>`;
    } else if (val && !akk) {
      h += `<li><b>intransitives Verb</b> — непереходный глагол: Akkusativobjekt (кого? что?) <u>не бывает</u>.
        Нельзя сказать «er ${esc(S.formen(pres, "er") || inf)} einen Ball». Вместо этого — обстоятельства:
        куда? где? когда? как?</li>`;
    } else if (!val) {
      h += `<li>Для этого глагола в базе ещё нет данных, переходный он или нет.</li>`;
    }

    // Dativ
    if (val && val.dat) {
      h += `<li><b>Verb mit Dativ</b> — глагол с дательным падежом (кому?): ${de("Ich helfe dem Vater.")}
        ${val.dat === "pflicht" ? "Здесь Dativobjekt обязателен." : "Dativobjekt здесь возможен, но не обязателен."}</li>`;
    }

    // reflexiv
    if (istReflexiv(verb, inf)) {
      h += `<li><b>reflexives Verb</b> — возвратный глагол (с <b>sich</b>, по-русски «-ся»):
        ${de("ich wasche mich, du wäschst dich, er wäscht sich")}. Местоимение меняется по лицам.
        В Perfekt всегда <b>haben</b>.</li>`;
    } else {
      h += `<li>Не возвратный (<b>nicht reflexiv</b>): без <b>sich</b>. Для сравнения, возвратный —
        ${de("sich waschen")} (мыться): ${de("Er wäscht sich.")}</li>`;
    }

    // trennbar
    if (istTrennbar(verb, S.formen(pres, "er"))) {
      h += `<li><b>trennbares Verb</b> — глагол с отделяемой приставкой: в Präsens/Präteritum приставка уходит
        в самый конец предложения: ${de("aufstehen → Ich stehe um 7 Uhr auf.")}</li>`;
    }

    // Bewegung
    if (r.hv && r.hv.aux === "sein") {
      h += `<li><b>Bewegungsverb</b> — глагол движения (перемещение из точки А в точку Б).
        Поэтому прошедшее время с <b>sein</b>. Удобно добавить «куда?» — ${de("nach Hause")}.</li>`;
    }
    h += "</ul>";
    return h;
  }

  // Beispiel mit anderem Vorfeld (Inversion)
  function inversionsBeispiel(r) {
    const seg = r.segmente;
    const kand = seg.find((s) => s.rolle === "zeit") || seg.find((s) => s.rolle === "ort") || seg.find((s) => s.rolle === "art") || seg.find((s) => s.rolle === "akk");
    if (!kand) return null;
    const finit = r.felder.links[0];
    const subj = seg.find((s) => s.rolle === "subj");
    if (!subj) return null;
    const rest = seg.filter((s) => s !== kand && s !== finit && s !== subj);
    // Segmente sind klein geschrieben gespeichert (nur der ganze Satz bekommt capFirst)
    const teile = [capFirst(kand.text), finit.text, subj.text].concat(rest.map((s) => s.text));
    return { text: teile.join(" ") + ".", kand };
  }

  // 3) Wortstellung
  function teilWortstellung(cfg, r) {
    const finit = r.felder.links[0].text;
    const vf = r.felder.vorfeld;
    let h = "";
    if (cfg.satzart === "aussage") {
      h += `<div class="ek-merke"><b>Главное правило немецкого предложения:</b> в повествовательном предложении
        (<b>Aussagesatz</b>) спрягаемый глагол (<b>finites Verb</b> — тот, что изменяется по лицам) стоит
        <u>всегда на 2-м месте</u>. По-немецки: <b>Verbzweitstellung</b> (V2).</div>`;
      h += `<p>В русском порядок слов свободный, в немецком — нет. Место №1 называется <b>Vorfeld</b>
        («предполье»), здесь там стоит ${de(vf.map((s) => s.text).join(" "))}, место №2 — глагол ${de(finit)}.</p>`;
      const lang = vf.length && vf[0].text.split(" ").length > 1;
      h += `<p><b>Внимание:</b> «2-е место» — это <u>не второе слово</u>, а второй <b>член предложения</b> (Satzglied).
        ${lang ? `${de(capFirst(vf[0].text))} — несколько слов, но это <u>одно</u> место.` : `Например, ${de("Mein kleiner Bruder läuft …")}: три слова «Mein kleiner Bruder» — это одно место.`}</p>`;
      const inv = inversionsBeispiel(r);
      if (inv) {
        h += `<p><b>Можно начать и с другого члена предложения</b> — но глагол <u>остаётся вторым</u>,
          а подлежащее перескакивает <u>за</u> глагол (это называется <b>Inversion</b>, обратный порядок):<br>
          ${de(inv.text)}</p>
          <p class="ek-klein">Частая ошибка русскоговорящих: «Heute er läuft» — неправильно! Только «Heute läuft er».</p>`;
      }
    } else if (cfg.satzart === "imperativ") {
      h += `<div class="ek-merke"><b>Imperativ</b> (повелительное предложение — просьба, приказ): глагол ${de(finit)} стоит 
        <u>на 1-м месте</u>, подлежащего (du) нет. Форма для «du» = основа без окончания: kommen → ${de("Komm!")}, gehen → ${de("Geh!")}. 
        Для «ihr»: ${de("Kommt!")}, вежливо: ${de("Kommen Sie!")}</div>`;
    } else if (cfg.satzart === "frage") {
      h += `<div class="ek-merke"><b>Ja/Nein-Frage</b> (вопрос без вопросительного слова, ответ «да / нет»):
        глагол ${de(finit)} ставится <u>на 1-е место</u>, подлежащее — сразу за ним.
        В русском вопрос делают интонацией («Он бежит?»), в немецком — порядком слов.</div>`;
    } else {
      h += `<div class="ek-merke"><b>W-Frage</b> (вопрос с вопросительным словом на W-: wer, was, wann, wo, wohin, wie…):
        на 1-м месте — вопросительное слово ${de(vf.map((s) => s.text).join(" "))}, на 2-м — глагол ${de(finit)},
        потом подлежащее. Правило V2 действует и здесь!</div>
        <p>Вопросительное слово <u>заменяет</u> тот член предложения, о котором спрашиваем — поэтому самого его в вопросе нет.</p>`;
    }
    return h;
  }

  // 4) Satzklammer
  function teilKlammer(cfg, r) {
    const links = r.felder.links.map((s) => s.text).join(" ");
    const rechts = r.felder.rechts.map((s) => s.text).join(" ");
    if (!rechts) {
      return `<p>В этом предложении глагол состоит из <u>одного</u> слова (${de(links)}), поэтому правая часть рамки пустая.</p>
        <p>Если взять сложное время (Perfekt, Futur), глагол разделится на две части, и они «обнимут» середину
        предложения, как скобки: ${de("Er [ist] heute nach Hause [gelaufen].")} Это называется <b>Satzklammer</b> (рамка предложения).</p>`;
    }
    return `<div class="ek-merke">Глагол здесь состоит из нескольких частей. Немцы <u>разрывают</u> их:
      спрягаемая часть ${de(links)} стоит на 2-м месте (<b>linke Klammer</b> — левая скобка),
      а остальное ${de(rechts)} уходит <u>в самый конец</u> (<b>rechte Klammer</b> — правая скобка).
      Всё остальное — внутри, в <b>Mittelfeld</b> (середине). Это и есть <b>Satzklammer</b> — рамка предложения.</div>
      <p class="ek-klein">По-русски: «Он <u>убежал</u> сегодня домой». По-немецки: «Er <u>ist</u> heute nach Hause <u>gelaufen</u>» —
      глагол «обнимает» середину. Ошибка: «Er ist gelaufen nach Hause» — так нельзя.</p>`;
  }

  // 5) Zeitform
  function teilZeitform(cfg, r) {
    const verb = cfg.verb;
    const S = window.DE_SATZ_ENGINE;
    const inf = S.verbInf(verb);
    const part = verb.partizip2 || verb.partizip || "";
    const aux = r.hv ? r.hv.aux : "haben";
    const t = verbTyp(verb, inf, stammVon(inf));
    const partErkl = t.typ === "stark"
      ? `У сильного глагола Partizip II = <b>ge- + (часто изменённая) основа + -en</b>: ${de(part)}.`
      : `У слабого глагола Partizip II = <b>ge- + основа + -t</b>: ${de(part)}.`;
    const F = {
      praesens: `<b>Präsens</b> (настоящее время) = основа + личное окончание.<br>
        Употребляется: сейчас (${de("Er läuft.")} — он бежит), регулярно (${de("Er läuft jeden Tag.")}),
        и <u>очень часто вместо будущего</u>, если есть слово времени: ${de("Morgen läuft er.")} — завтра он побежит.`,
      praeteritum: `<b>Präteritum</b> (простое прошедшее).<br>
        ${t.typ === "schwach" ? `Слабый глагол: основа + <b>-te</b> + окончание → ${de("er " + t.praetEr)}.` : `Сильный глагол: особая основа прошедшего времени → ${de("er " + t.praetEr)} (запомнить!).`}<br>
        Употребляется в основном <u>в письменной речи</u> (книги, газеты). В разговоре вместо него говорят Perfekt —
        кроме ${de("war, hatte")} и модальных глаголов (${de("konnte, musste")}).`,
      perfekt: `<b>Perfekt</b> (сложное прошедшее) = <b>${esc(aux)}</b> в Präsens (2-е место) + <b>Partizip II</b> (в конце).<br>
        ${partErkl}<br>
        Это <u>главное прошедшее время разговорной речи</u>. По-русски и «бежал», и «пробежал» — всё Perfekt.`,
      plusquamperfekt: `<b>Plusquamperfekt</b> (давнопрошедшее) = <b>${esc(aux)}</b> в Präteritum (${de(aux === "sein" ? "war" : "hatte")}) + <b>Partizip II</b>.<br>
        ${partErkl}<br>
        Употребляется, когда одно действие в прошлом было <u>ещё раньше</u> другого:
        ${de("Nachdem er gegessen hatte, ging er nach Hause.")} — после того как он поел, он пошёл домой.`,
      futur1: `<b>Futur I</b> (будущее) = <b>werden</b> (2-е место) + <b>Infinitiv</b> (в конце): ${de("er wird " + inf)}.<br>
        Употребляется для планов и обещаний, предположений (${de("Er wird müde sein.")} — он, наверное, устал).
        В разговоре часто заменяется на Präsens + «morgen».`,
      futur2: `<b>Futur II</b> (будущее совершённое) = <b>werden</b> + <b>Partizip II</b> + <b>${esc(aux)}</b> (Infinitiv) в конце:
        ${de("er wird " + part + " " + aux)}.<br>
        Значит: «к какому-то моменту в будущем это <u>уже будет сделано</u>»:
        ${de("Morgen um 8 wird er nach Hause gelaufen sein.")} Также — предположение о прошлом:
        ${de("Er wird schon gegangen sein.")} — он, наверное, уже ушёл. В жизни используется редко.`,
    };
    return `<div class="ek-merke">${F[cfg.tense] || ""}</div>`;
  }

  // 6) Hilfsverb
  function teilHilfsverb(cfg, r) {
    if (!r.hv) return "";
    const S = window.DE_SATZ_ENGINE;
    const inf = S.verbInf(cfg.verb);
    let grund;
    if (cfg.auxOverride) grund = `Ты выбрал <b>${esc(r.hv.aux)}</b> вручную.`;
    else if (r.hv.aux === "haben" && cfg.akk && /Akkusativ/.test(r.hv.grund) && (cfg.verb.perfektAux === "sein" || cfg.verb.usesSein)) grund = `${de(inf)} обычно с <b>sein</b>, но здесь есть Akkusativobjekt (что?) → <b>haben</b>: ${de("Ich bin nach Hause gefahren")}, но ${de("Ich habe das Auto gefahren.")}`;
    else if (r.hv.aux === "sein") grund = `${de(inf)} — движение или изменение состояния → <b>sein</b>.`;
    else grund = `${de(inf)} — обычный глагол → <b>haben</b> (так у большинства глаголов).`;
    return `<p>${grund}</p>
      <table class="ek-tab"><thead><tr><th>sein <small>(меньшинство)</small></th><th>haben <small>(большинство)</small></th></tr></thead>
      <tbody><tr><td>• движение из А в Б: gehen, laufen, fahren, kommen, fliegen<br>
        • изменение состояния: aufwachen, einschlafen, sterben, werden<br>
        • исключения: sein, bleiben, passieren</td>
      <td>• все глаголы с Akkusativobjekt (кого? что?)<br>
        • все возвратные (sich waschen)<br>
        • модальные (können, müssen)<br>
        • все остальные</td></tr></tbody></table>
      <div class="ek-merke"><b>А почему некоторые говорят «ich habe gelaufen»?</b><br>
        • В литературном языке (Hochdeutsch) <b>laufen, gehen, fahren, kommen</b> — только с <b>sein</b>: ${de("ich bin gelaufen")}. 
        «Ich habe gelaufen» — это диалект или ошибка, в школе и на экзамене засчитают как ошибку.<br>
        • У некоторых глаголов движения <u>без направления</u> (спорт, занятие) правильны <u>оба</u> варианта: 
        ${de("ich habe / bin geschwommen")}, ${de("er hat / ist gejoggt")}, ${de("sie hat / ist geklettert")}.<br>
        • Но как только появляется <b>«куда?»</b> (Wohin?) — <u>только sein</u>: ${de("Ich bin über den See geschwommen.")}<br>
        • Если глагол движения получает <b>Akkusativobjekt</b> (что?) — <b>haben</b>: ${de("Ich bin nach Köln gefahren")}, но ${de("Ich habe das Auto gefahren.")}<br>
        • На юге Германии, в Австрии и Швейцарии и <b>stehen, sitzen, liegen</b> говорят с sein: ${de("ich bin gesessen")}; 
        на севере — ${de("ich habe gesessen")}. Оба варианта есть в словаре Duden.</div>
      <p class="ek-klein">Совет: если сомневаешься — для глаголов движения из А в Б бери <b>sein</b>, для всех остальных <b>haben</b>.</p>`;
  }

  // 7) Kasus (Fälle)
  function teilKasus(cfg, r) {
    const teile = [];
    const genRu = { m: "мужской род (der)", f: "женский род (die)", n: "средний род (das)", pl: "множественное число (die)" };
    const markiert = { nom: {}, akk: {}, dat: {} };
    const zeile = (rolle, kasus, frage, ru, info) => {
      const s = r.segmente.find((x) => x.rolle === rolle);
      if (!s) return;
      teile.push(`<tr><td><b>${esc(kasus)}</b><br><small>${esc(ru)}</small></td><td>${esc(frage)}</td><td>${de(s.text)}</td><td>${info}</td></tr>`);
    };

    if (cfg.subj && cfg.subj.nomen) markiert.nom[cfg.subj.nomen.gender] = true;
    if (cfg.akk && cfg.akk.nomen) markiert.akk[cfg.akk.nomen.gender] = true;
    if (cfg.dat && cfg.dat.nomen) markiert.dat[cfg.dat.nomen.gender] = true;

    zeile("subj", "Nominativ", "Wer? Was?", "именительный", cfg.subj && cfg.subj.nomen ? esc(genRu[cfg.subj.nomen.gender] || "") : "местоимение в Nominativ");
    zeile("akk", "Akkusativ", "Wen? Was?", "винительный", cfg.akk && cfg.akk.nomen ? esc(genRu[cfg.akk.nomen.gender] || "") + (cfg.akk.nomen.weak ? "<br><b>n-Deklination</b>: такое слово получает <b>-(e)n</b> (den Jungen)" : "") : "");
    zeile("dat", "Dativ", "Wem?", "дательный", cfg.dat && cfg.dat.nomen ? esc(genRu[cfg.dat.nomen.gender] || "") + (cfg.dat.nomen.gender === "pl" ? "<br>в Dativ Plural к слову добавляется <b>-n</b>: den Kinder<b>n</b>" : "") : "");
    if (!teile.length) return "";

    const zelle = (k, gen, txt) => `<td class="${markiert[k][gen] ? "ek-aktiv" : ""}">${txt}</td>`;
    const tab = (titel, nom, akk, dat) => `<table class="ek-tab ek-art"><thead><tr><th>${titel}</th><th>m (der)</th><th>f (die)</th><th>n (das)</th><th>Plural</th></tr></thead><tbody>
      <tr><td>Nominativ</td>${["m", "f", "n", "pl"].map((x, i) => zelle("nom", x, nom[i])).join("")}</tr>
      <tr><td>Akkusativ</td>${["m", "f", "n", "pl"].map((x, i) => zelle("akk", x, akk[i])).join("")}</tr>
      <tr><td>Dativ</td>${["m", "f", "n", "pl"].map((x, i) => zelle("dat", x, dat[i])).join("")}</tr></tbody></table>`;

    return `<p>Падеж (<b>Kasus</b>) в немецком видно в основном <u>по артиклю</u>, а не по окончанию слова, как в русском.</p>
      <table class="ek-tab"><thead><tr><th>Fall<br><small>падеж</small></th><th>Frage</th><th>в предложении</th><th>почему</th></tr></thead><tbody>${teile.join("")}</tbody></table>
      <p><b>Таблица артиклей</b> (жёлтым — то, что есть в твоём предложении):</p>
      ${tab("bestimmt", ["der", "die", "das", "die"], ["<b>den</b>", "die", "das", "die"], ["<b>dem</b>", "<b>der</b>", "<b>dem</b>", "<b>den</b> (+n)"])}
      ${tab("unbestimmt / mein / kein", ["ein", "eine", "ein", "– / meine"], ["<b>einen</b>", "eine", "ein", "– / meine"], ["<b>einem</b>", "<b>einer</b>", "<b>einem</b>", "– / meinen (+n)"])}
      <div class="ek-merke"><b>Самое важное:</b> в Akkusativ меняется <u>только мужской род</u>: der → <b>den</b>, ein → <b>einen</b>.
      Женский, средний и множественное число в Akkusativ — как в Nominativ. В Dativ меняется всё.</div>`;
  }

  // 8) Verneinung
  function teilVerneinung(cfg, r) {
    if (!cfg.verneinung) return "";
    const kein = r.kein;
    return `<div class="ek-merke">${kein
      ? `Здесь отрицание через <b>kein</b>: оно ставится вместо артикля <b>ein</b> или там, где артикля нет.
         ${de("Ich habe ein Auto → Ich habe kein Auto.")} «kein» = «никакой, ни одного» и склоняется как «ein».`
      : `Здесь отрицание через <b>nicht</b>: оно отрицает глагол или целое предложение.
         «nicht» обычно стоит <u>ближе к концу</u> — перед «как?», «где/куда?» и перед второй частью глагола:
         ${de("Er läuft heute nicht nach Hause.")}`}</div>
      <p class="ek-klein">Правило: существительное с <b>ein</b> или без артикля → <b>kein</b>. Всё остальное → <b>nicht</b>.</p>`;
  }

  // 9) Reihenfolge im Mittelfeld
  function teilMittelfeld(cfg, r) {
    const mf = r.felder.mittel.filter((s) => s.rolle !== "subj");
    if (mf.length < 2) return "";
    return `<p>В середине предложения (Mittelfeld) тоже есть привычный порядок:</p>
      <div class="ek-merke"><b>TeKaMoLo</b>: <b>Te</b>mporal (когда?) – <b>Ka</b>usal (почему?) – <b>Mo</b>dal (как?) – <b>Lo</b>kal (где? куда?).<br>
      ${de("Ich fahre morgen wegen der Arbeit schnell nach Köln.")}<br>
      И ещё: <b>Dativ перед Akkusativ</b>, если оба — существительные: ${de("Ich gebe dem Vater das Buch.")}</div>
      <p>В твоём предложении: ${mf.map((s) => de(s.text)).join(" → ")}</p>`;
  }

  // ------------------------------------------------------------
  // Hauptfunktion
  // ------------------------------------------------------------
  function erklaerung(cfg, r) {
    if (!r || r.fehler || !cfg || !cfg.verb || !window.DE_SATZ_ENGINE) return "";
    const S = window.DE_SATZ_ENGINE;
    const inf = S.verbInf(cfg.verb);
    const finit = r.felder.links[0].text;
    const bloecke = [];
    let nr = 1;
    const add = (titel, inhalt, offen) => { if (inhalt) bloecke.push(block(nr++, titel, inhalt, offen)); };

    if (!r.analyse) add(`Все Zeitformen и Satzarten — это же предложение`, teilUebersicht(cfg, r), true);
    if (r.modal) add(`Modalverb «${esc(r.modal)}» — модальный глагол`, `<div class="ek-merke"><b>Modalverben</b> (модальные глаголы): können (мочь, уметь), müssen (должен), wollen (хотеть), dürfen (можно), sollen (следует), mögen (нравиться).<br>
      Модальный глагол спрягается и стоит на 2-м месте, а основной глагол — <b>в Infinitiv в самом конце</b>: ${de("Ich will heute nicht arbeiten.")}<br>
      Внимание: у können, müssen, wollen, dürfen для <b>ich</b> и <b>er</b> одинаковая форма <u>без окончания</u>: ${de("ich kann, er kann")}.</div>`, true);
    if (r.passiv) add(`Passiv — страдательный залог`, `<div class="ek-merke"><b>Passiv</b> = <b>werden</b> (2-е место) + <b>Partizip II</b> (в конце). Важно не «кто делает», а «что с предметом происходит»:
      ${de("Das Buch wird gelesen.")} — книгу читают. ${de("Das Buch wurde gelesen.")} — книгу прочитали.<br>
      Не путать с Futur I: ${de("werden + Infinitiv")} (${de("Er wird lesen")} — он будет читать).</div>`, true);
    add(`Почему «${esc(finit)}»? — Konjugation (спряжение)`, teilKonjugation(cfg, r), true);
    add(`Что за глагол «${esc(inf)}»? — Verbtyp (тип глагола)`, teilVerbtyp(cfg, r), false);
    add(`Почему глагол на этом месте? — Wortstellung (порядок слов)`, teilWortstellung(cfg, r), false);
    add(`Satzklammer — рамка предложения`, teilKlammer(cfg, r), false);
    add(`Zeitform «${esc(r.zeitform)}» — как образуется время`, teilZeitform(cfg, r), false);
    add(r.aux ? `Почему «${esc(r.hv.aux)}»? — Hilfsverb haben oder sein` : `Perfekt: «${esc(r.hv.aux)}» — haben oder sein? (и почему говорят «habe gelaufen»)`, teilHilfsverb(cfg, r), !!r.aux);
    add(`Kasus — падежи: почему «den», «dem», «einen»…`, teilKasus(cfg, r), false);
    if (cfg.verneinung) add(`Verneinung — отрицание: nicht или kein?`, teilVerneinung(cfg, r), false);
    add(`Порядок в середине предложения (Mittelfeld)`, teilMittelfeld(cfg, r), false);

    return `<div class="ek-wrap"><div class="ek-titel">📘 Erklärung / Объяснение по шагам</div>
      <div class="ek-knoepfe"><button type="button" class="btn ek-alle" data-auf="1">все открыть</button>
      <button type="button" class="btn ek-alle" data-auf="0">все закрыть</button></div>
      ${bloecke.join("")}</div>`;
  }

  if (typeof window !== "undefined") window.DE_ERKLAERUNG = erklaerung;
  if (typeof document !== "undefined") {
    document.addEventListener("click", (e) => {
      const t = e.target.closest && e.target.closest(".ek-alle");
      if (!t) return;
      const auf = t.dataset.auf === "1";
      document.querySelectorAll(".ek-block").forEach((d) => (d.open = auf));
    });
  }
})();
