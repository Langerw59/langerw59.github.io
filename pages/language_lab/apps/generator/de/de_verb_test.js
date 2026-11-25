// =============================================================
// de_verb_test.js – Satzlabor, Modus „📝 Test“: das Verb + die Präposition + der Kasus
// 2026-11-25 · mit Claude (ersetzt den früheren eigenen „Verb-Trainer“)
// DE: Daten: /datenbanken/de/de_verb_praeposition.js · Fortschritt: localStorage „verbtrainer_v1“ (pro Gerät)
// RU: Тест «глагол → предлог → падеж → артикль» внутри Satzlabor.
// =============================================================
(function () {
  "use strict";
  const KEY = "verbtrainer_v1";
  const PRO_RUNDE = 10, GELERNT = 3;            // 3 × hintereinander richtig = gelernt
  const REGEL = "/pages/language_lab/grammatik/index.html#de-verb-mit-praeposition";
  const GRUPPEN = {
    alle: { t: "alle", ru: "все" },
    akk:  { t: "Verb + Präposition + Akkusativ", ru: "глагол + предлог + винительный" },
    dat:  { t: "Verb + Präposition + Dativ", ru: "глагол + предлог + дательный" },
    ohne: { t: "Verb OHNE Präposition", ru: "без предлога – русская ловушка" },
    ort:  { t: "Wohin? / Wo? (nach Hause …)", ru: "куда? / где?" }
  };
  let st = {}; try { st = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (_) {}
  st.serie = st.serie || {}; st.fehler = st.fehler || {}; st.gruppe = st.gruppe || "alle";
  const speichern = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (_) {} };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mische = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const D = () => window.DE_VERB_PRAEPOSITION || [];
  const KN = { akk: "Akkusativ", dat: "Dativ" };
  const schl = (e) => e.v;
  const gelernt = (e) => (st.serie[schl(e)] || 0) >= GELERNT;
  const inGruppe = (e) => st.gruppe === "alle" || e.g === st.gruppe;
  const formel = (e) => e.p ? `${e.p} + ${KN[e.k]}` : `+ ${KN[e.k]} (ohne Präposition)`;
  let app = null;

  // Stil einmal einfügen
  function stil() {
    if (document.getElementById("vtStil")) return;
    const css = document.createElement("style");
    css.id = "vtStil";
    css.textContent = `
      #slModeTest .vt-kette { font-weight: 700; border: 2px solid #6639ba; border-radius: 12px; padding: 8px 12px; background: rgba(102,57,186,.06); margin: 6px 0 10px; }
      #slModeTest .vt-knopf { font: inherit; font-size: 16px; cursor: pointer; padding: 9px 16px; border-radius: 999px; border: 1px solid #1f6feb; background: #1f6feb; color: #fff; font-weight: 700; margin: 6px 4px 0 0; text-decoration: none; display: inline-block; }
      #slModeTest .vt-knopf.leicht { background: transparent; color: inherit; }
      #slModeTest .vt-gruppen { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
      #slModeTest .vt-gruppen button { font: inherit; font-size: 14px; cursor: pointer; padding: 5px 10px; border-radius: 999px; border: 1px solid #d0d7de; background: transparent; color: inherit; }
      #slModeTest .vt-gruppen button.an { background: #6639ba; border-color: #6639ba; color: #fff; }
      #slModeTest .vt-modi { display: grid; gap: 8px; margin: 10px 0; }
      #slModeTest .vt-modi button { font: inherit; text-align: left; cursor: pointer; padding: 10px 12px; border-radius: 12px; border: 2px solid #d0d7de; background: transparent; color: inherit; }
      #slModeTest .vt-modi button b { font-size: 17px; display: block; }
      #slModeTest .vt-balken { height: 10px; border-radius: 5px; background: #d0d7de; overflow: hidden; margin: 4px 0 2px; }
      #slModeTest .vt-balken span { display: block; height: 100%; background: #1a7f37; }
      #slModeTest .vt-klein { color: #57606a; font-size: 13px; }
      #slModeTest .vt-stand { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; color: #57606a; font-size: 14px; }
      #slModeTest .vt-ru { font-size: 17px; color: #57606a; margin-top: 10px; }
      #slModeTest .vt-frage { font-size: 24px; font-weight: 800; margin: 4px 0; line-height: 1.3; }
      #slModeTest .vt-frage .luecke { display: inline-block; min-width: 70px; border-bottom: 3px solid #6639ba; }
      #slModeTest .vt-wdh { display: inline-block; font-size: 12px; font-weight: 700; border-radius: 999px; padding: 2px 8px; background: #d29922; color: #fff; }
      #slModeTest .vt-wahl { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; }
      #slModeTest .vt-wahl button { font: inherit; font-size: 18px; font-weight: 600; padding: 12px 8px; border-radius: 12px; border: 2px solid #d0d7de; background: transparent; color: inherit; cursor: pointer; touch-action: manipulation; }
      #slModeTest .vt-wahl button.richtig { background: #1a7f37; border-color: #1a7f37; color: #fff; }
      #slModeTest .vt-wahl button.falsch { background: #cf222e; border-color: #cf222e; color: #fff; }
      #slModeTest .vt-erkl { border-left: 4px solid #6639ba; background: rgba(102,57,186,.07); padding: 8px 10px; border-radius: 6px; font-size: 16px; }
      #slModeTest .vt-erg { text-align: center; font-size: 20px; margin: 14px 0; }
      #slModeTest .vt-erg b { font-size: 36px; display: block; }
      #slModeTest .vt-suche { font: inherit; width: 100%; box-sizing: border-box; padding: 7px 10px; border-radius: 10px; border: 1px solid #d0d7de; margin: 6px 0 8px; }
      #slModeTest .vt-tab { width: 100%; border-collapse: collapse; font-size: 15px; }
      #slModeTest .vt-tab td { border-bottom: 1px solid #d0d7de; padding: 5px; vertical-align: top; }
      #slModeTest .vt-tab td.v { font-weight: 700; }
      #slModeTest .vt-tab .k { display: inline-block; font-size: 11px; font-weight: 700; border-radius: 6px; padding: 1px 6px; color: #fff; }
      #slModeTest .vt-tab .k.akk { background: #1f6feb; } #slModeTest .vt-tab .k.dat { background: #bf3989; }
      #slModeTest .vt-tab button { cursor: pointer; border: none; background: transparent; font-size: 17px; }
      @media (max-width: 600px) { #slModeTest .vt-wahl { grid-template-columns: 1fr; } }`;
    document.head.appendChild(css);
  }

  function sprich(text) {
    try {
      if (typeof LG_TTS !== "undefined") { LG_TTS.speakInLang ? LG_TTS.speakInLang(text, "de-DE") : LG_TTS.speak(text); return; }
      if (!window.speechSynthesis || !text) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = "de-DE"; u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch (_) {}
  }
  function mitLuecke(e, ersatz) {
    const re = new RegExp("(^|[^A-Za-zÄÖÜäöüß])" + e.l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=[^A-Za-zÄÖÜäöüß]|$)");
    return e.s.replace(re, (m, vor) => vor + ersatz);
  }

  // ---------- die Übersicht ----------
  function start() {
    app = document.getElementById("slModeTest");
    if (!app) return;
    stil();
    const alle = D(); if (!alle.length) { app.innerHTML = "<p>Keine Daten gefunden.</p>"; return; }
    const liste = alle.filter(inGruppe);
    const g = liste.filter(gelernt).length, fk = liste.filter((e) => st.fehler[schl(e)]).length;
    app.innerHTML = `<div class="language-panel__title">📝 Test: das Verb + die Präposition</div>
      <div class="vt-klein">Welches Verb braucht welche Präposition und welchen Kasus? Und: Wohin? oder Wo?<br>Какой глагол с каким предлогом и падежом? Куда или где?</div>
      <div class="vt-kette">das Verb → die Präposition → der Kasus → der Artikel<br><small>warten → auf → Akkusativ → auf <u>den</u> Bus</small></div>
      <div class="vt-gruppen">${Object.keys(GRUPPEN).map((k) => `<button type="button" data-g="${k}" class="${st.gruppe === k ? "an" : ""}" title="${esc(GRUPPEN[k].ru)}">${esc(GRUPPEN[k].t)}</button>`).join("")}</div>
      <div class="vt-klein">${esc(GRUPPEN[st.gruppe].ru)} · gelernt ${g} von ${liste.length} <small>(= ${GELERNT}× hintereinander richtig)</small></div>
      <div class="vt-balken"><span style="width:${liste.length ? Math.round(g / liste.length * 100) : 0}%"></span></div>
      <div class="vt-modi">
        <button type="button" id="vtSatz"><b>📝 der Satz</b><small>Lücke füllen: Ich warte ___ Bus. · вставить предлог + артикль</small></button>
        <button type="button" id="vtFormel"><b>🔤 Verb + ?</b><small>warten → auf + Akkusativ · запомнить «формулу» глагола</small></button>
        <button type="button" id="vtListe"><b>📋 die Liste</b><small>alles nachschlagen, mit 🔊 · весь список</small></button>
        ${fk ? `<button type="button" id="vtFehler"><b>🔁 die Fehlerkiste (${fk})</b><small>nur die Fehler · только ошибки</small></button>` : ""}
      </div>
      <a class="vt-knopf leicht" href="${REGEL}" target="quantura_regel">📐 die Regel lesen ↗</a>
      <p class="vt-klein">Tipp: Im Modus „🔧 Satz bauen“ ein solches Verb wählen (z. B. warten) – dann erscheint „das Präpositionalobjekt“.<br>Der Fortschritt wird auf diesem Gerät gespeichert.</p>`;
    app.querySelectorAll(".vt-gruppen button").forEach((b) => b.onclick = () => { st.gruppe = b.dataset.g; speichern(); start(); });
    document.getElementById("vtSatz").onclick = () => lauf(auswahl(liste, false), "satz");
    document.getElementById("vtFormel").onclick = () => lauf(auswahl(liste.filter((e) => e.g !== "ort"), false), "formel");
    document.getElementById("vtListe").onclick = () => zeigeListe("");
    const f = document.getElementById("vtFehler");
    if (f) f.onclick = () => lauf(auswahl(liste, true), "satz");
  }

  function auswahl(liste, nurFehler) {
    const fehler = mische(liste.filter((e) => st.fehler[schl(e)]));
    if (nurFehler) return fehler;
    const neu = mische(liste.filter((e) => !st.fehler[schl(e)] && !gelernt(e)));
    const rest = mische(liste.filter((e) => !st.fehler[schl(e)] && gelernt(e)));
    return fehler.slice(0, 3).concat(neu, fehler.slice(3), rest).slice(0, PRO_RUNDE);
  }

  function falscheFormeln(e) {
    const aus = new Set([formel(e)]), res = [];
    const nimm = (t) => { if (!aus.has(t) && res.length < 3) { aus.add(t); res.push(t); } };
    const anderer = e.k === "akk" ? "dat" : "akk";
    if (e.p) nimm(`${e.p} + ${KN[anderer]}`); else nimm(`+ ${KN[anderer]} (ohne Präposition)`);
    if (!e.p) nimm(e.k === "dat" ? "für + Akkusativ" : "zu + Dativ");
    mische(D().filter((x) => x.g !== "ort" && x.p && x.p !== e.p)).forEach((x) => nimm(formel(x)));
    return res;
  }
  const verbOhne = (e) => e.v.replace(/ \+ .*$/, "").replace(new RegExp(" " + e.p + "$"), "");

  // ---------- der Test ----------
  function lauf(fr, modus) {
    if (!fr.length) { app.innerHTML = `<p>Hier gibt es nichts zu üben. / Здесь пока нечего повторять.</p><button type="button" class="vt-knopf" id="vtZur">Zur Übersicht</button>`; document.getElementById("vtZur").onclick = start; return; }
    let i = 0, richtig = 0;
    function zeige() {
      if (i >= fr.length) return ende();
      const e = fr[i];
      let frage, opt;
      if (modus === "formel") {
        frage = `<div class="vt-ru">${esc(e.ru)}</div><div class="vt-frage">${esc(verbOhne(e))} → ?</div>`;
        opt = mische([{ t: formel(e), ok: true }].concat(falscheFormeln(e).map((t) => ({ t, ok: false }))));
      } else {
        const teile = mitLuecke(e, "\u0000").split("\u0000");
        frage = `<div class="vt-ru">${esc(e.sr)}</div><div class="vt-frage">${esc(teile[0])}<span class="luecke">&nbsp;</span>${esc(teile[1] || "")}</div>`;
        opt = mische([{ t: e.l, ok: true }].concat(e.f.map((t) => ({ t, ok: false }))));
      }
      app.innerHTML = `<div class="vt-stand"><span>${modus === "formel" ? "🔤 Verb + ?" : "📝 der Satz"} · ${esc(GRUPPEN[e.g].t)}</span><span>Frage ${i + 1} von ${fr.length}</span></div>
        ${st.fehler[schl(e)] ? `<span class="vt-wdh">🔁 aus der Fehlerkiste</span>` : ""}
        ${frage}
        <div class="vt-wahl">${opt.map((o, k) => `<button type="button" data-k="${k}">${esc(o.t)}</button>`).join("")}</div>
        <div id="vtNach"></div>`;
      app.querySelectorAll(".vt-wahl button").forEach((b) => b.onclick = () => {
        const o = opt[+b.dataset.k], key = schl(e);
        app.querySelectorAll(".vt-wahl button").forEach((bb) => { bb.disabled = true; if (opt[+bb.dataset.k].ok) bb.classList.add("richtig"); });
        if (o.ok) { richtig++; st.serie[key] = (st.serie[key] || 0) + 1; delete st.fehler[key]; }
        else { b.classList.add("falsch"); st.serie[key] = 0; st.fehler[key] = true; }
        speichern();
        document.getElementById("vtNach").innerHTML = `<div class="vt-erkl">${o.ok ? "✅ <b>Richtig!</b>" : "❌ <b>Nicht ganz.</b>"}
          <b>${esc(e.s)}</b> – ${esc(e.sr)}<br>
          🧩 <b>${esc(e.v)}</b> = ${esc(formel(e))} · ${esc(e.ru)} · <i>${esc(e.en)}</i>
          ${e.h ? `<br>💡 ${esc(e.h)}` : ""}</div>
          <button type="button" class="vt-knopf leicht" id="vtHoer">🔊 anhören</button>
          <button type="button" class="vt-knopf" id="vtWeiter">Weiter ➜</button>`;
        document.getElementById("vtHoer").onclick = () => sprich(e.s);
        sprich(e.s);
        const w = document.getElementById("vtWeiter"); w.focus();
        w.onclick = () => { i++; zeige(); };
      });
    }
    function ende() {
      app.innerHTML = `<div class="vt-erg">Ergebnis / результат<b>${richtig} / ${fr.length}</b>${Math.round(richtig / fr.length * 100)} %</div>
        <p class="vt-klein" style="text-align:center">Fehler kommen in die Fehlerkiste und kommen in der nächsten Runde zuerst. / Ошибки в следующий раз идут первыми.</p>
        <p style="text-align:center"><button type="button" class="vt-knopf" id="vtNochmal">▶ noch eine Runde</button> <button type="button" class="vt-knopf leicht" id="vtZur">Zur Übersicht</button></p>`;
      document.getElementById("vtZur").onclick = start;
      document.getElementById("vtNochmal").onclick = () => {
        const liste = D().filter(inGruppe);
        lauf(auswahl(modus === "formel" ? liste.filter((x) => x.g !== "ort") : liste, false), modus);
      };
    }
    zeige();
  }

  // ---------- die Liste ----------
  function zeigeListe(such) {
    const q = such.trim().toLowerCase();
    const passt = (e) => !q || [e.v, e.ru, e.en, e.s, e.sr].join(" ").toLowerCase().includes(q);
    const gruppen = ["akk", "dat", "ohne", "ort"].filter((g) => st.gruppe === "alle" || st.gruppe === g);
    let h = `<button type="button" class="vt-knopf leicht" id="vtZur">← Zur Übersicht</button>
      <input class="vt-suche" id="vtSuche" placeholder="suchen … (z. B. warten, Hause, denken)" value="${esc(such)}">
      <table class="vt-tab">`;
    gruppen.forEach((g) => {
      const zeilen = D().filter((e) => e.g === g && passt(e));
      if (!zeilen.length) return;
      h += `<tr><td colspan="3"><b>${esc(GRUPPEN[g].t)}</b> <span class="vt-klein">· ${esc(GRUPPEN[g].ru)}</span></td></tr>`;
      zeilen.forEach((e) => {
        const n = D().indexOf(e);
        h += `<tr><td class="v">${gelernt(e) ? "✅ " : ""}${esc(e.v)}<br><span class="k ${e.k}">${esc(formel(e))}</span><br><span class="vt-klein">${esc(e.ru)}</span></td>
          <td><b>${esc(e.s)}</b><br><span class="vt-klein">${esc(e.sr)}</span>${e.h ? `<br><small>💡 ${esc(e.h)}</small>` : ""}</td>
          <td><button type="button" data-n="${n}" title="anhören">🔊</button></td></tr>`;
      });
    });
    app.innerHTML = h + `</table>`;
    document.getElementById("vtZur").onclick = start;
    const s = document.getElementById("vtSuche");
    s.oninput = () => { const pos = s.selectionStart; zeigeListe(s.value); const n = document.getElementById("vtSuche"); n.focus(); n.setSelectionRange(pos, pos); };
    app.querySelectorAll(".vt-tab button").forEach((b) => b.onclick = () => sprich(D()[+b.dataset.n].s));
  }

  window.DE_VERB_TEST_START = start;
  // falls der Test-Modus schon beim Laden aktiv ist
  document.addEventListener("DOMContentLoaded", () => {
    const t = document.getElementById("slModeTest");
    if (t && t.style.display !== "none") start();
  });
})();
