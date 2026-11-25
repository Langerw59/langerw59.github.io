// ============================================================
// lernbilanz.js – die Lernzeit zählt sich selbst (2026-11-25)
// DE: Auf jeder Seite wird automatisch gemessen, wie lange gelernt wird –
//     ohne ▶-Knopf. Die Zeit zählt nur, wenn die Seite sichtbar ist und
//     in den letzten 2 Minuten etwas getan wurde (Taste, Klick, Wischen).
//     Die Zeit kommt in den Bereich aus etagen_daten.js (z. B. „der Sprachführer“).
//     Wird der Höchstwert eines Bereichs überschritten, kommt EINMAL am Tag
//     ein freundlicher Hinweis („Genug für heute“).
//     Speicher: localStorage „q_lernzeit_v1“ = { "2026-11-25": { "der Sprachführer": Sekunden } }
//     (pro Gerät getrennt). Die Bilanz zeigt die Seite der Stundenplan.
// RU: Время учёбы считается само по разделам; при превышении потолка –
//     одно мягкое напоминание в день. Статистика – на странице «der Stundenplan».
// ============================================================
(function () {
  "use strict";
  if (window.__LERNBILANZ__) return;
  window.__LERNBILANZ__ = true;

  const KEY = "q_lernzeit_v1";
  const ZIEL_KEY = "q_lernziele_v1";
  const MELD_KEY = "q_lernmeldung_v1";
  const TAKT = 15;            // Sekunden pro Messschritt
  const RUHE = 120 * 1000;    // so lange gilt man nach der letzten Aktion als „aktiv“

  // Ziele pro Tag in Minuten: min = mindestens, max = höchstens (Deckel gegen das Festbeißen)
  const STANDARD_ZIELE = {
    "der Sprachführer":      { min: 15, max: 45 },
    "die Grammatik":         { min: 15, max: 30 },
    "die Elektrotechnik":    { min: 30, max: 0 },
    "Lesen & Texte":         { min: 10, max: 0 },
    "die Zehnfingertechnik": { min: 10, max: 30 },
  };

  const lesen = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };
  const schreiben = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const z2 = (n) => String(n).padStart(2, "0");
  const tagKey = (d = new Date()) => `${d.getFullYear()}-${z2(d.getMonth() + 1)}-${z2(d.getDate())}`;

  function laden() { const l = lesen(KEY, {}); return l && typeof l === "object" ? l : {}; }
  function hinzu(bereich, sek, tag = tagKey()) {
    if (!bereich || !(sek > 0)) return;
    const l = laden();
    l[tag] = l[tag] || {};
    l[tag][bereich] = (Number(l[tag][bereich]) || 0) + sek;
    schreiben(KEY, l);
  }
  function ziele() {
    const eigene = lesen(ZIEL_KEY, null);
    return eigene && typeof eigene === "object" ? eigene : JSON.parse(JSON.stringify(STANDARD_ZIELE));
  }
  function zieleSpeichern(z) { schreiben(ZIEL_KEY, z); }

  // Für andere Seiten (der Stundenplan, die Startseite)
  window.Q_LERN = { KEY, ZIEL_KEY, STANDARD_ZIELE, laden, hinzu, ziele, zieleSpeichern, tagKey };

  // ---------- Bereich der aktuellen Seite finden ----------
  function ordner(url) { return String(url || "").replace(/[#?].*$/, "").replace(/[^/]*$/, ""); }
  function bereichFinden() {
    const E = window.Q_ETAGEN || [];
    const pfad = window.location.pathname;
    let best = null, laenge = 0;
    for (const e of E) {
      if (e.id === "eg" || e.keller) continue;
      for (const g of e.gruppen) {
        for (const r of g.r.flatMap((x) => (Array.isArray(x[4]) ? x[4] : [x]))) {
          const u = r[1] || "";
          if (!u.startsWith("/")) continue;
          // genau diese Seite oder eine Seite im selben Ordner (z. B. Lektionen)
          const genau = u.replace(/[#?].*$/, "") === pfad;
          const o = ordner(u);
          const passt = genau || (o.length > 1 && pfad.startsWith(o));
          const l = genau ? 9999 : o.length;
          if (passt && l > laenge) { best = g.t; laenge = l; }
        }
      }
    }
    return best;
  }

  // ---------- Hinweis („Genug für heute“) ----------
  function hinweis(text) {
    const d = document.createElement("div");
    d.setAttribute("data-farbe-fest", "");
    d.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:10060;max-width:min(560px,92vw);" +
      "background:#24263f;color:#fff;padding:14px 18px;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.3);" +
      "font:16px/1.45 system-ui,'Segoe UI',Arial,sans-serif;display:flex;gap:12px;align-items:flex-start";
    d.innerHTML = `<div style="font-size:26px;line-height:1">🛑</div><div>${text}<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">` +
      `<a href="/pages/language_lab/stundenplan/index.html" style="color:#a9b8ff">➜ die Lernbilanz</a>` +
      `<button type="button" style="margin-left:auto;border:0;border-radius:8px;padding:4px 12px;cursor:pointer">OK</button></div></div>`;
    d.querySelector("button").addEventListener("click", () => d.remove());
    document.body.appendChild(d);
  }

  function starten() {
    const bereich = bereichFinden();
    if (!bereich) return;
    let letzteAktion = Date.now();
    const aktiv = () => { letzteAktion = Date.now(); };
    ["keydown", "pointerdown", "wheel", "touchstart", "scroll", "input"].forEach((t) =>
      window.addEventListener(t, aktiv, { passive: true, capture: true }));

    setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - letzteAktion > RUHE) return;
      hinzu(bereich, TAKT);
      const z = ziele()[bereich];
      if (!z || !(z.max > 0)) return;
      const heute = (laden()[tagKey()] || {})[bereich] || 0;
      const meld = lesen(MELD_KEY, {});
      const mk = tagKey() + "|" + bereich;
      if (heute >= z.max * 60 && !meld[mk]) {
        meld[mk] = 1; schreiben(MELD_KEY, meld);
        hinweis(`<b>${bereich}: schon ${Math.round(heute / 60)} Minuten heute.</b><br>` +
          `Genug für heute – mehr bringt jetzt wenig. Lieber etwas anderes, das noch fehlt.`);
      }
    }, TAKT * 1000);
  }

  function warten(n) {
    if (window.Q_ETAGEN) return starten();
    if (n === 0 && !document.querySelector('script[src$="etagen_daten.js"]')) {
      const s = document.createElement("script"); s.src = "/core/js/etagen_daten.js"; document.head.appendChild(s);
    }
    if (n < 50) setTimeout(() => warten(n + 1), 100);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => warten(0));
  else warten(0);
})();
