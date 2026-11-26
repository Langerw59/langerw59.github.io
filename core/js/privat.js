/* ============================================================
   DE: der Privatbereich (2026-11-26)
       Private Dinge (der Stundenplan / die Lernbilanz, die Lernzeit
       auf der Startseite, die 1. Etage „die Programme“ mit den
       Claude-Programmen) sind nur sichtbar, wenn dieses Gerät mit
       der PIN geöffnet wurde. Auf jedem neuen Gerät ist alles zu.
       – Öffnen:   ⚙️ → „🔒 der Privatbereich“ → PIN eingeben.
       – Schließen: 🔓 oben in der Kopfleiste (z. B. vor einer Präsentation).
       Der Zustand wird pro Gerät gespeichert (localStorage "q_privat_v1").
       WICHTIG: Das ist ein Vorhang, kein Tresor. GitHub Pages ist
       öffentlich – wer den Quelltext liest, sieht alles. Wirklich
       Geheimes gehört nicht auf diese Seite.
       PIN ändern: neuen SHA-256-Wert von "quantura:<PIN>" bei PIN_HASH eintragen.
   RU: Приватная зона. Личное (расписание/статистика, время учёбы,
       программы Claude) видно только на устройстве, открытом PIN-кодом.
       Это «занавеска», а не сейф: сайт на GitHub публичный.

   Im HTML:
     <section data-privat hidden> … </section>   → nur sichtbar, wenn offen
     <body data-privat-seite>                     → ganze Seite gesperrt, wenn zu
   ============================================================ */
(function () {
  "use strict";
  if (window.__Q_PRIVAT_JS__) return;
  window.__Q_PRIVAT_JS__ = true;

  const KEY = "q_privat_v1";
  const PIN_HASH = "1510a86779031fde39a1b6ec4c25711db10c69dcc19694e9ee4839520c17b327";

  function istOffen() {
    try { return localStorage.getItem(KEY) === "offen"; } catch (e) { return false; }
  }
  window.Q_PRIVAT = istOffen();

  async function pinRichtig(pin) {
    const text = "quantura:" + String(pin).trim();
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      return hex === PIN_HASH;
    }
    return false;
  }

  function oeffnen() {
    try { localStorage.setItem(KEY, "offen"); } catch (e) {}
    location.reload();
  }
  function schliessen() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  }
  window.Q_PRIVAT_SCHLIESSEN = schliessen;

  // ---------- das PIN-Fenster ----------
  function pinFenster(text) {
    if (document.getElementById("qPrivatDlg")) return;
    const d = document.createElement("div");
    d.id = "qPrivatDlg";
    d.className = "qpv-hinter";
    d.innerHTML = `<form class="qpv-box" autocomplete="off">
        <div class="qpv-titel">🔒 der Privatbereich</div>
        <p class="qpv-text">${text || "Die PIN eingeben – danach ist der Privatbereich auf diesem Gerät offen."}</p>
        <input class="qpv-pin" type="password" inputmode="numeric" maxlength="12" aria-label="die PIN" placeholder="PIN">
        <div class="qpv-fehler" hidden>❌ Die PIN stimmt nicht.</div>
        <div class="qpv-knoepfe">
          <button type="button" class="qpv-k qpv-ab">Abbrechen</button>
          <button type="submit" class="qpv-k qpv-ok">Öffnen</button>
        </div>
      </form>`;
    document.body.appendChild(d);
    const inp = d.querySelector(".qpv-pin");
    setTimeout(() => inp.focus(), 30);
    d.querySelector(".qpv-ab").addEventListener("click", () => d.remove());
    d.addEventListener("click", (ev) => { if (ev.target === d) d.remove(); });
    d.querySelector("form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (await pinRichtig(inp.value)) oeffnen();
      else { d.querySelector(".qpv-fehler").hidden = false; inp.select(); }
    });
  }
  window.Q_PRIVAT_OEFFNEN = pinFenster;

  // ---------- Stil ----------
  function stil() {
    if (document.getElementById("qPrivatStil")) return;
    const s = document.createElement("style");
    s.id = "qPrivatStil";
    s.textContent = `
      .qpv-hinter{position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px}
      .qpv-box{background:#fff;color:#111827;border-radius:16px;padding:20px 22px;max-width:360px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.25);font-size:16px}
      html[data-theme="dark"] .qpv-box{background:#1d222b;color:#e5e7eb}
      .qpv-titel{font-weight:700;font-size:19px;margin-bottom:6px}
      .qpv-text{margin:0 0 12px;color:#5b6475;line-height:1.45}
      html[data-theme="dark"] .qpv-text{color:#aab2c0}
      .qpv-pin{width:100%;box-sizing:border-box;font-size:22px;letter-spacing:6px;text-align:center;padding:10px;border:1px solid #cfd6e2;border-radius:10px}
      .qpv-fehler{color:#b91c1c;margin-top:8px}
      .qpv-knoepfe{display:flex;gap:8px;justify-content:flex-end;margin-top:14px}
      .qpv-k{font-size:15px;padding:8px 14px;border-radius:10px;border:1px solid #cfd6e2;background:#f6f8fb;cursor:pointer}
      .qpv-ok{background:#2f6fb3;color:#fff;border-color:#2f6fb3}
      .qpv-gesperrt{max-width:520px;margin:60px auto;padding:28px 24px;text-align:center;border:1px solid #d9dee7;border-radius:16px;background:#fff}
      html[data-theme="dark"] .qpv-gesperrt{background:#1d222b;border-color:#353c48}
      .qpv-gesperrt .qpv-gross{font-size:48px;line-height:1}
      .qpv-gesperrt h1{font-size:22px;margin:10px 0 6px}
      .qpv-gesperrt p{color:#5b6475;margin:0 0 16px}
      .qpv-feld{display:flex;justify-content:space-between;align-items:center;gap:10px}
      .kopf2__knopf.qpv-offen{background:#fef3c7;border-color:#f59e0b}
    `;
    document.head.appendChild(s);
  }

  // ---------- die Seite einrichten ----------
  function einrichten() {
    stil();
    const offen = istOffen();

    // 1) einzelne private Teile
    document.querySelectorAll("[data-privat]").forEach((el) => {
      if (offen) el.removeAttribute("hidden"); else el.remove();
    });

    // 2) ganze private Seite
    if (!offen && document.body.hasAttribute("data-privat-seite")) {
      const main = document.querySelector("main");
      const box = document.createElement("div");
      box.className = "qpv-gesperrt";
      box.innerHTML = `<div class="qpv-gross">🔒</div>
        <h1>Diese Seite ist privat</h1>
        <p>Dieser Bereich ist nur für den Besitzer von Quantura.</p>
        <button type="button" class="qpv-k qpv-ok">🔑 mit der PIN öffnen</button>
        <p style="margin-top:16px"><a href="/index.html">➜ zur Startseite</a></p>`;
      box.querySelector("button").addEventListener("click", () => pinFenster());
      if (main) { main.replaceWith(box); } else { document.body.prepend(box); }
    } else if (document.body.hasAttribute("data-privat-seite")) {
      const main = document.querySelector("main");
      if (main) main.removeAttribute("hidden");
    }

    // 3) Kopfleiste: 🔓 zum Schließen + Eintrag im ⚙️-Fenster
    kopfleiste(0);
  }

  function kopfleiste(n) {
    const rechts = document.querySelector("header.kopf2 .kopf2__rechts");
    const panel = document.getElementById("kopf2Panel");
    if (!rechts || !panel) { if (n < 50) setTimeout(() => kopfleiste(n + 1), 100); return; }
    if (rechts.querySelector(".qpv-schloss")) return;
    const offen = istOffen();

    if (offen) {
      const k = document.createElement("button");
      k.type = "button";
      k.className = "kopf2__knopf qpv-schloss qpv-offen";
      k.title = "Der Privatbereich ist offen – klicken zum Schließen (z. B. vor einer Präsentation)";
      k.setAttribute("aria-label", "den Privatbereich schließen");
      k.textContent = "🔓";
      k.addEventListener("click", schliessen);
      const einst = document.getElementById("kopf2Einst");
      rechts.insertBefore(k, einst || null);
    }

    const feld = document.createElement("div");
    feld.className = "kopf2__feld qpv-feld";
    feld.innerHTML = offen
      ? `<span>🔓 der Privatbereich <small>(открыт)</small></span><button type="button" class="kopf2__knopf">schließen</button>`
      : `<span>🔒 der Privatbereich <small>(приватное)</small></span><button type="button" class="kopf2__knopf">öffnen</button>`;
    feld.querySelector("button").addEventListener("click", () => (offen ? schliessen() : pinFenster()));
    panel.appendChild(feld);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", einrichten);
  else einrichten();
})();
