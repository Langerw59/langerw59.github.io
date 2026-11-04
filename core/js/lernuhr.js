// ============================================================
// lernuhr.js – Uhr · Datum · Kalenderwoche · Kalender · Lernzeit
// 2026-11-02
// DE: Eine Datei für ALLE Seiten.
//     1) Uhr + Datum + KW (nach ISO-Norm, wie im deutschen Kalender)
//        – auf Seiten mit Kopfzeile (header.html) in der Kopfzeile,
//        – auf Seiten ohne Kopfzeile (z. B. SprachBox) als kleine Leiste.
//     2) 📅 öffnet einen Monatskalender mit KW-Spalte.
//        Tage, an denen gelernt wurde, haben einen grünen Punkt.
//     3) Lernzeit-Stoppuhr (▶ Start / ⏸ Pause / ⏹ Fertig):
//        erscheint auf Seiten mit <body data-lernzeit="Name">.
//        Die Zeit wird pro Tag gespeichert (auch wenn die Seite neu lädt).
// RU: Один файл для всех страниц: часы, дата, неделя (KW), календарь
//     и секундомер «время занятий» (только там, где в <body> стоит
//     data-lernzeit="Название").
// ============================================================
(function () {
  "use strict";
  if (window.__LERNUHR__) return;
  window.__LERNUHR__ = true;

  // ---------------- Hilfen ----------------
  const LS_LOG = "lernuhr_log_v1";     // { "2026-11-02": { "SprachBox DE↔EN": 1234 } } Sekunden
  const LS_RUN = "lernuhr_lauf_v1";    // { name, start, schonSek } – laufende Stoppuhr
  const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const TAGE_KURZ = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const lesen = (k, def) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? def : v; } catch (e) { return def; } };
  const schreiben = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* egal */ } };
  const z2 = (n) => String(n).padStart(2, "0");
  const tagKey = (d) => `${d.getFullYear()}-${z2(d.getMonth() + 1)}-${z2(d.getDate())}`;

  // ISO-Kalenderwoche (Woche beginnt Montag, KW 1 = Woche mit dem ersten Donnerstag)
  function isoKW(datum) {
    const d = new Date(Date.UTC(datum.getFullYear(), datum.getMonth(), datum.getDate()));
    const wt = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - wt);
    const jahrStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - jahrStart) / 86400000 + 1) / 7);
  }

  // Dauer schön: 0:05:07 bzw. „1 h 12 min“
  function uhrDauer(sek) {
    sek = Math.max(0, Math.floor(sek));
    const h = Math.floor(sek / 3600), m = Math.floor((sek % 3600) / 60), s = sek % 60;
    return h ? `${h}:${z2(m)}:${z2(s)}` : `${z2(m)}:${z2(s)}`;
  }
  function textDauer(sek) {
    sek = Math.max(0, Math.round(sek));
    const h = Math.floor(sek / 3600), m = Math.round((sek % 3600) / 60);
    if (!h) return `${m} min`;
    return m ? `${h} h ${m} min` : `${h} h`;
  }

  // ---------------- Stil ----------------
  const css = `
.lu-leiste{position:fixed;top:6px;right:8px;z-index:10050;display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;font:13px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:calc(100vw - 16px)}
.lu-leiste.unten{top:auto;bottom:8px}
.lu-pille{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;background:rgba(15,23,42,.78);color:#f1f5f9;border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(6px);white-space:nowrap}
.lu-pille button,.lu-knopf{font:inherit;cursor:pointer;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);color:inherit;padding:2px 8px;line-height:1.3}
.lu-pille button:hover{background:rgba(255,255,255,.2)}
.lu-im-kopf{display:inline-flex;align-items:center;gap:6px;margin-left:6px}
.lu-im-kopf .lu-pille{background:var(--bg-surface,rgba(15,23,42,.06));color:var(--text-main,inherit);border-color:var(--border-subtle,rgba(0,0,0,.15));backdrop-filter:none}
.lu-im-kopf .lu-pille button{border-color:var(--border-subtle,rgba(0,0,0,.2));background:transparent}
.lu-zeit{font-variant-numeric:tabular-nums;font-weight:700;min-width:44px;text-align:center}
.lu-laeuft .lu-zeit{color:#22c55e}
.lu-pause .lu-zeit{color:#f59e0b}
.lu-heute{opacity:.8;font-size:.92em}
.lu-pop{position:fixed;z-index:10060;top:44px;right:8px;width:320px;max-width:calc(100vw - 16px);max-height:calc(100vh - 60px);overflow:auto;background:#fff;color:#1f2328;border:1px solid #d0d7de;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:12px;font:14px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.lu-pop h4{margin:0 0 8px;font-size:15px;display:flex;justify-content:space-between;align-items:center;gap:6px}
.lu-pop h4 button{font:inherit;border:1px solid #d0d7de;background:#f6f8fa;border-radius:8px;cursor:pointer;padding:2px 9px;color:#1f2328}
.lu-kal{width:100%;border-collapse:collapse;text-align:center;font-size:13px}
.lu-kal th{font-weight:600;color:#59636e;padding:3px 0}
.lu-kal td{padding:4px 0;border-radius:6px;position:relative}
.lu-kal td.kw{color:#8250df;font-size:11px;font-weight:600;background:#f6f0ff}
.lu-kal td.anders{color:#c3c9d0}
.lu-kal td.we{color:#cf222e}
.lu-kal td.heute{background:#1f6feb;color:#fff;font-weight:700}
.lu-kal td.gelernt::after{content:"";position:absolute;left:50%;bottom:1px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#1a7f37}
.lu-kal td.heute.gelernt::after{background:#fff}
.lu-sek{margin-top:10px;border-top:1px solid #eaeef2;padding-top:8px}
.lu-sek b{display:block;margin-bottom:4px}
.lu-tab{width:100%;border-collapse:collapse;font-size:13px}
.lu-tab td{padding:3px 2px;border-bottom:1px solid #f0f2f4}
.lu-tab td:last-child{text-align:right;font-variant-numeric:tabular-nums}
.lu-klein{color:#59636e;font-size:12px}
@media (max-width:560px){.lu-heute{display:none}.lu-pop{right:4px;left:4px;width:auto}}
`;
  function stilEinfuegen() {
    if (document.getElementById("lu-stil")) return;
    const s = document.createElement("style");
    s.id = "lu-stil";
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---------------- Lernzeit-Speicher ----------------
  function logLaden() { const l = lesen(LS_LOG, {}); return l && typeof l === "object" ? l : {}; }
  function sekundenEintragen(name, startMs, endMs) {
    // DE: Zeit über Mitternacht richtig auf die Tage verteilen
    // RU: если занятие шло через полночь – делим по дням
    if (!(endMs > startMs)) return;
    const log = logLaden();
    let a = startMs;
    while (a < endMs) {
      const d = new Date(a);
      const mitternacht = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime();
      const b = Math.min(endMs, mitternacht);
      const k = tagKey(d);
      log[k] = log[k] || {};
      log[k][name] = (Number(log[k][name]) || 0) + Math.round((b - a) / 1000);
      a = b;
    }
    schreiben(LS_LOG, log);
  }
  function tagSumme(log, k, name) {
    const t = log[k] || {};
    if (name) return Number(t[name]) || 0;
    return Object.values(t).reduce((s, v) => s + (Number(v) || 0), 0);
  }

  // ---------------- Stoppuhr ----------------
  // Zustand: lauf = { name, start: ms|null, schonSek: Sekunden dieser Sitzung vor der letzten Pause }
  function laufLaden() { const r = lesen(LS_RUN, null); return r && r.name ? r : null; }
  function laufSek(r) { if (!r) return 0; return (Number(r.schonSek) || 0) + (r.start ? (Date.now() - r.start) / 1000 : 0); }

  let lernName = "";
  let elZeit = null, elHeute = null, elStart = null, elStopp = null, elPille = null;

  function stoppuhrStart() {
    let r = laufLaden();
    if (r && r.name !== lernName) { stoppuhrFertig(true); r = null; } // andere App lief noch → abschließen
    if (!r) r = { name: lernName, start: null, schonSek: 0 };
    if (!r.start) r.start = Date.now();
    delete r.autoPauseAm;
    schreiben(LS_RUN, r);
    zeichnen();
  }
  function stoppuhrPause() {
    const r = laufLaden();
    if (!r || !r.start) return;
    const jetzt = Date.now();
    sekundenEintragen(r.name, r.start, jetzt);
    r.schonSek = (Number(r.schonSek) || 0) + (jetzt - r.start) / 1000;
    r.start = null;
    schreiben(LS_RUN, r);
    zeichnen();
  }
  function stoppuhrFertig(still) {
    const r = laufLaden();
    if (!r) return;
    if (r.start) sekundenEintragen(r.name, r.start, Date.now());
    const gesamt = laufSek(r);
    try { localStorage.removeItem(LS_RUN); } catch (e) {}
    zeichnen();
    if (!still && gesamt >= 1) meldung(`Fertig! Heute gelernt: ${uhrDauer(gesamt)} · Готово! Занимался: ${textDauer(gesamt)}`);
  }

  function meldung(text) {
    const m = document.createElement("div");
    m.textContent = text;
    m.style.cssText = "position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:10070;background:#1a7f37;color:#fff;padding:10px 16px;border-radius:10px;font:15px system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.3);max-width:90vw;text-align:center";
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 5000);
  }

  function zeichnen() {
    if (!elPille) return;
    const r = laufLaden();
    const meins = r && r.name === lernName;
    const sek = meins ? laufSek(r) : 0;
    const laeuft = meins && !!r.start;
    elPille.classList.toggle("lu-laeuft", laeuft);
    elPille.classList.toggle("lu-pause", meins && !r.start);
    elZeit.textContent = uhrDauer(sek);
    elStart.textContent = laeuft ? "⏸" : "▶";
    elStart.title = laeuft ? "Pause / Пауза" : (meins ? "Weiter / Продолжить" : "Lernen starten / Начать занятие");
    elStopp.hidden = !meins;
    // Heute = gespeicherte Zeit + noch nicht gespeicherter laufender Teil
    const log = logLaden();
    const offen = laeuft ? (Date.now() - r.start) / 1000 : 0;
    const heute = tagSumme(log, tagKey(new Date()), lernName) + offen;
    elHeute.textContent = `heute ${textDauer(heute)}`;
  }

  function stoppuhrBauen() {
    elPille = document.createElement("span");
    elPille.className = "lu-pille";
    elPille.title = "Lernzeit / Время занятий";
    elPille.innerHTML = `<span>⏱</span><span class="lu-zeit">00:00</span>
      <button type="button" class="lu-st">▶</button>
      <button type="button" class="lu-sp" title="Fertig – Zeit speichern / Закончить">⏹</button>
      <span class="lu-heute"></span>`;
    elZeit = elPille.querySelector(".lu-zeit");
    elStart = elPille.querySelector(".lu-st");
    elStopp = elPille.querySelector(".lu-sp");
    elHeute = elPille.querySelector(".lu-heute");
    elStart.addEventListener("click", (e) => {
      e.stopPropagation();
      const r = laufLaden();
      if (r && r.name === lernName && r.start) stoppuhrPause(); else stoppuhrStart();
    });
    elStopp.addEventListener("click", (e) => { e.stopPropagation(); stoppuhrFertig(false); });
    elHeute.style.cursor = "pointer";
    elHeute.addEventListener("click", (e) => { e.stopPropagation(); kalenderUmschalten(); });
    return elPille;
  }

  // ---------------- Kalender-Fenster ----------------
  let pop = null, popMonat = null;

  function kalenderUmschalten() {
    if (pop) { pop.remove(); pop = null; return; }
    const h = new Date();
    popMonat = new Date(h.getFullYear(), h.getMonth(), 1);
    pop = document.createElement("div");
    pop.className = "lu-pop";
    pop.addEventListener("click", (e) => e.stopPropagation());
    document.body.appendChild(pop);
    kalenderZeichnen();
  }
  document.addEventListener("click", () => { if (pop) { pop.remove(); pop = null; } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && pop) { pop.remove(); pop = null; } });

  function kalenderZeichnen() {
    if (!pop) return;
    const heute = new Date();
    const hk = tagKey(heute);
    const log = logLaden();
    const j = popMonat.getFullYear(), m = popMonat.getMonth();
    const erster = new Date(j, m, 1);
    const versatz = (erster.getDay() + 6) % 7; // Montag = 0
    let d = new Date(j, m, 1 - versatz);

    let zeilen = "";
    for (let w = 0; w < 6; w++) {
      if (w > 0 && d.getMonth() !== m) break;
      let z = `<tr><td class="kw">${isoKW(d)}</td>`;
      for (let t = 0; t < 7; t++) {
        const k = tagKey(d);
        const kl = [];
        if (d.getMonth() !== m) kl.push("anders");
        if (t >= 5) kl.push("we");
        if (k === hk) kl.push("heute");
        const sum = tagSumme(log, k);
        if (sum > 0) kl.push("gelernt");
        z += `<td class="${kl.join(" ")}" title="${d.getDate()}.${m + 1}.${j}${sum ? " · gelernt " + textDauer(sum) : ""}">${d.getDate()}</td>`;
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      }
      zeilen += z + "</tr>";
    }

    // Lernzeit: letzte 7 Tage
    const r = laufLaden();
    const offen = r && r.start ? (Date.now() - r.start) / 1000 : 0;
    let tage = "", summe7 = 0;
    for (let i = 0; i < 7; i++) {
      const dd = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate() - i);
      const k = tagKey(dd);
      let s = tagSumme(log, k) + (i === 0 ? offen : 0);
      summe7 += s;
      const name = i === 0 ? "Heute / сегодня" : i === 1 ? "Gestern / вчера" : `${TAGE_KURZ[(dd.getDay() + 6) % 7]}, ${dd.getDate()}.${dd.getMonth() + 1}.`;
      tage += `<tr><td>${name}</td><td>${s ? textDauer(s) : "–"}</td></tr>`;
    }
    // nach App (heute)
    const heuteApps = Object.entries(log[hk] || {}).map(([n, s]) => [n, s + (r && r.start && r.name === n ? offen : 0)]);
    if (r && r.start && !(log[hk] || {})[r.name]) heuteApps.push([r.name, offen]);
    const apps = heuteApps.length
      ? `<div class="lu-sek"><b>Heute nach Programm / сегодня по программам</b><table class="lu-tab">${heuteApps.map(([n, s]) => `<tr><td>${n.replace(/</g, "&lt;")}</td><td>${textDauer(s)}</td></tr>`).join("")}</table></div>`
      : "";

    pop.innerHTML = `
      <h4><button type="button" data-n="-1">‹</button><span>${MONATE[m]} ${j}</span><button type="button" data-n="1">›</button></h4>
      <table class="lu-kal"><thead><tr><th>KW</th>${TAGE_KURZ.map((t) => `<th>${t}</th>`).join("")}</tr></thead><tbody>${zeilen}</tbody></table>
      <div class="lu-klein" style="margin-top:6px">Heute: ${heute.getDate()}. ${MONATE[heute.getMonth()]} ${heute.getFullYear()} · KW ${isoKW(heute)} · <span style="color:#1a7f37">●</span> = gelernt</div>
      <div class="lu-sek"><b>Lernzeit – letzte 7 Tage / время занятий за 7 дней</b>
        <table class="lu-tab">${tage}<tr><td><b>Zusammen / итого</b></td><td><b>${textDauer(summe7)}</b></td></tr></table></div>
      ${apps}`;
    pop.querySelectorAll("h4 button").forEach((b) => b.addEventListener("click", () => {
      popMonat = new Date(popMonat.getFullYear(), popMonat.getMonth() + Number(b.dataset.n), 1);
      kalenderZeichnen();
    }));
  }

  // ---------------- Uhr ----------------
  let elEigeneUhr = null;
  function uhrText(d) {
    const datum = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const zeit = d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    return { datum, zeit, kw: isoKW(d) };
  }
  function uhrTick() {
    const d = new Date();
    const u = uhrText(d);
    // a) Kopfzeile aus header.html
    const dt = document.getElementById("headerDateTime");
    const kw = document.getElementById("headerKW");
    const kb = document.getElementById("headerCalendarBtn");
    if (dt) {
      dt.textContent = `${u.datum} · ${u.zeit}`;
      // Kopfleiste v2: kurze Formen für Tablet/Handy (CSS wählt aus)
      dt.dataset.zeit = u.zeit;
      dt.dataset.kurz = d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" }) + " · " + u.zeit;
    }
    if (kw) kw.textContent = "KW " + u.kw;
    if (kb) kb.title = `Kalender · KW ${u.kw}`;
    // b) eigene kleine Uhr (Seiten ohne Kopfzeile)
    if (elEigeneUhr) {
      const kurz = d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
      elEigeneUhr.querySelector(".lu-u-t").textContent = `${kurz} · ${u.zeit}`;
      elEigeneUhr.querySelector(".lu-u-k").textContent = `KW ${u.kw}`;
      elEigeneUhr.title = `${u.datum} · KW ${u.kw}`;
    }
    zeichnen();
  }

  // 📅 in der Kopfzeile (auch wenn die Kopfzeile erst später geladen wird)
  document.addEventListener("click", (e) => {
    const t = e.target instanceof Element ? e.target.closest("#headerCalendarBtn") : null;
    if (!t) return;
    e.stopPropagation();
    kalenderUmschalten();
  }, true);

  // ---------------- Einbauen ----------------
  function einbauen() {
    stilEinfuegen();
    lernName = (document.body && document.body.dataset && document.body.dataset.lernzeit) || "";
    const hatKopf = () => !!document.getElementById("headerDateTime");

    // Kopfzeile (header.html) wird per fetch nachgeladen → kurz warten
    let versuche = 0;
    (function warten() {
      if (hatKopf()) {
        if (lernName) {
          const ziel = document.querySelector(".site-header__actions");
          const box = document.createElement("span");
          box.className = "lu-im-kopf";
          box.appendChild(stoppuhrBauen());
          if (ziel) ziel.insertBefore(box, ziel.firstChild); else document.body.appendChild(box);
        }
        return;
      }
      const hatPartial = document.querySelector('[data-partial="header"]');
      if (hatPartial && versuche++ < 30) { setTimeout(warten, 100); return; }
      // keine Kopfzeile → eigene kleine Leiste
      // (gibt es auf der Seite ein Element mit data-lernuhr-slot, kommt sie dort hinein)
      const slot = document.querySelector("[data-lernuhr-slot]");
      const leiste = document.createElement(slot ? "span" : "div");
      leiste.className = slot ? "lu-im-slot" : "lu-leiste";
      leiste.style.cssText = slot ? "display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap" : "";
      if (document.body.dataset.lernuhrPos === "unten") leiste.classList.add("unten");
      if (lernName) leiste.appendChild(stoppuhrBauen());
      elEigeneUhr = document.createElement("span");
      elEigeneUhr.className = "lu-pille";
      elEigeneUhr.innerHTML = `<span class="lu-u-t"></span><span class="lu-u-k" style="opacity:.75"></span><button type="button" title="Kalender">📅</button>`;
      elEigeneUhr.querySelector("button").addEventListener("click", (e) => { e.stopPropagation(); kalenderUmschalten(); });
      leiste.appendChild(elEigeneUhr);
      if (slot) slot.insertBefore(leiste, slot.firstChild);
      else document.body.appendChild(leiste);
      // Platz oben lassen, damit nichts verdeckt wird
      if (!slot && !leiste.classList.contains("unten")) {
        const h = leiste.getBoundingClientRect().height + 8;
        const alt = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
        document.body.style.paddingTop = (alt + h) + "px";
      }
      uhrTick();
    })();

    uhrTick();
    setInterval(uhrTick, 1000);
    // DE: Seite wird geschlossen → Zeit speichern und Pause machen
    //     (damit die Uhr nicht die ganze Nacht weiterläuft).
    //     Nur neu geladen (unter 2 Minuten zurück) → läuft automatisch weiter.
    // RU: закрыл страницу – время сохраняется, секундомер на паузе;
    //     если просто перезагрузил (меньше 2 минут) – идёт дальше сам.
    window.addEventListener("pagehide", () => {
      const r = laufLaden();
      if (r && r.start && r.name === lernName) {
        stoppuhrPause();
        const r2 = laufLaden();
        if (r2) { r2.autoPauseAm = Date.now(); schreiben(LS_RUN, r2); }
      }
    });
    const r0 = laufLaden();
    if (lernName && r0 && r0.name === lernName && !r0.start && r0.autoPauseAm && Date.now() - r0.autoPauseAm < 120000) {
      delete r0.autoPauseAm;
      schreiben(LS_RUN, r0);
      stoppuhrStart();
    }
  }

  // für andere Skripte
  window.LERNUHR = { isoKW, start: () => stoppuhrStart(), pause: () => stoppuhrPause(), fertig: () => stoppuhrFertig(false) };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", einbauen);
  else einbauen();
})();
