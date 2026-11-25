/* ============================================================
   DE: Etagen-Menü in der Kopfleiste (2026-11-25).
       Zeile 2 der Kopfleiste: 3 · 2 · 1 · EG · Keller – jede Etage
       klappt ein Fenster (Dropdown) mit allen Räumen auf.
       Daten: /core/js/etagen_daten.js. Wird von core_init.js geladen.
   RU: Меню этажей в шапке: каждый этаж открывает выпадающее окно
       со всеми комнатами. Данные – в etagen_daten.js.
   ============================================================ */
(function () {
  if (window.__ETAGEN_MENUE__) return;
  window.__ETAGEN_MENUE__ = true;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pfadOhneIndex = (p) => p.replace(/#.*$/, "").replace(/\/index\.html$/, "/");
  const hier = pfadOhneIndex(window.location.pathname);
  const hierHash = window.location.hash;
  // Link passt zur aktuellen Seite? (#de / #en nur, wenn der Hash auch passt)
  const istHier = (url) => {
    if (!url || pfadOhneIndex(url) !== hier) return false;
    const h = (url.match(/#.*$/) || [""])[0];
    return !h || !hierHash || h === hierHash;
  };

  function daten(fertig) {
    if (window.Q_ETAGEN) return fertig();
    const s = document.createElement("script");
    s.src = "/core/js/etagen_daten.js";
    s.onload = fertig;
    document.head.appendChild(s);
  }

  function bauen() {
    const kopf = document.querySelector("header.kopf2");
    const nav = kopf && kopf.querySelector(".kopf2__menue");
    if (!nav || !window.Q_ETAGEN || nav.dataset.etagen) return;
    nav.dataset.etagen = "1";
    nav.innerHTML = "";

    const fenster = document.createElement("div");
    fenster.className = "etm__fenster";
    fenster.hidden = true;
    kopf.appendChild(fenster);

    let offenId = null;
    const knoepfe = {};

    function zu() {
      fenster.hidden = true;
      offenId = null;
      document.body.classList.remove("etm-offen");
      Object.values(knoepfe).forEach((k) => k.setAttribute("aria-expanded", "false"));
    }

    // ein Raum: Link – oder Untermenü (5. Feld = Liste der Unterpunkte)
    function raum(r) {
      if (Array.isArray(r[4])) {
        const offen = r[4].some((u) => istHier(u[1]));
        return `<details class="etm__unter"${offen ? " open" : ""}><summary class="etm__raum">${esc(r[0])} <span class="etm__unterpfeil">▸</span>${r[2] ? `<small>${esc(r[2])}</small>` : ""}</summary>
          <div class="etm__unterliste">${r[4].map(raum).join("")}</div></details>`;
      }
      const ist = istHier(r[1]);
      const extern = /^https?:/.test(r[1] || "");
      return `<a href="${esc(r[1])}"${extern ? ' target="_blank" rel="noopener"' : ""} class="etm__raum${r[3] === "idee" ? " etm__idee" : ""}${ist ? " etm__ist-hier" : ""}"${ist ? ' aria-current="page"' : ""}>${esc(r[0])}${extern ? " ↗" : ""}${r[2] ? `<small>${esc(r[2])}</small>` : ""}</a>`;
    }

    function auf(e) {
      offenId = e.id;
      Object.entries(knoepfe).forEach(([id, k]) => k.setAttribute("aria-expanded", String(id === e.id)));
      fenster.style.setProperty("--etm-farbe", e.farbe);
      fenster.innerHTML =
        `<div class="etm__innen">
           <div class="etm__titel"><b>${esc(e.nr)} · ${esc(e.name)}</b>
             ${e.eingang ? `<a href="${esc(e.eingang)}" class="etm__eingang">➜ Eingang zur Etage</a>` : ""}
             <button type="button" class="etm__zu" aria-label="Schließen">✕</button></div>
           ${e.info ? `<div class="etm__info">${esc(e.info)}</div>` : ""}
           <div class="etm__gruppen">${e.gruppen.map((g) =>
             `<div class="etm__gruppe"><div class="etm__gtitel" title="${esc(g.info || "")}">${esc(g.t)}</div>${g.r.map(raum).join("")}</div>`).join("")}</div>
         </div>`;
      fenster.querySelector(".etm__zu").addEventListener("click", zu);
      fenster.hidden = false;
      document.body.classList.add("etm-offen");
    }

    for (const e of window.Q_ETAGEN) {
      if (e.id === "eg") continue;   // das Erdgeschoss = Q Quantura (Logo links)
      const k = document.createElement("button");
      k.type = "button";
      k.className = "nav-link etm__knopf" + (e.keller ? " etm__keller" : "");
      k.style.setProperty("--etm-farbe", e.farbe);
      k.setAttribute("aria-expanded", "false");
      k.title = `${e.nr} · ${e.name}`;
      k.innerHTML = `<span class="etm__nr">${esc(e.kurz)}</span><span class="etm__name">${esc(e.keller ? "Keller" : e.name)}</span><span class="etm__pfeil">▾</span>`;
      const alle = (r) => Array.isArray(r[4]) ? r[4] : [r];
      const enthaeltHier = e.gruppen.some((g) => g.r.some((r) => alle(r).some((u) => istHier(u[1])))) ||
                           (e.eingang && istHier(e.eingang));
      if (enthaeltHier) k.classList.add("ist-hier");
      k.addEventListener("click", (ev) => {
        ev.stopPropagation();
        offenId === e.id ? zu() : auf(e);
      });
      knoepfe[e.id] = k;
      nav.appendChild(k);
    }

    // die Bereichsleiste: auf jeder Seite eines Bereichs (z. B. die Grammatik)
    // die Nachbarseiten als Reiter zeigen. RU: вкладки раздела под меню.
    for (const e of window.Q_ETAGEN) {
      if (e.keller || e.id === "eg") continue;
      for (const g of e.gruppen) {
        const links = g.r.flatMap((r) => (Array.isArray(r[4]) ? r[4] : [r])).filter((r) => r[1] && r[3] !== "idee");
        if (links.length < 2 || !links.some((r) => istHier(r[1]))) continue;
        const leiste = document.createElement("div");
        leiste.className = "etm__bereich";
        leiste.style.setProperty("--etm-farbe", e.farbe);
        leiste.innerHTML = `<div class="etm__bereich-innen"><span class="etm__bereich-name"><span class="etm__nr">${esc(e.kurz)}</span> ${esc(g.t)}:</span>${
          links.map((r) => `<a href="${esc(r[1])}" class="etm__reiter${istHier(r[1]) ? " etm__reiter--hier" : ""}">${esc(r[0])}</a>`).join("")}</div>`;
        kopf.appendChild(leiste);
        break;
      }
      if (kopf.querySelector(".etm__bereich")) break;
    }

    fenster.addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (ev.target.closest("a")) zu();   // nach Klick auf einen Raum Fenster schließen
    });
    // Zurück-Taste: Browser zeigt die alte Seite aus dem Speicher – Fenster dann zu
    window.addEventListener("pageshow", zu);
    window.addEventListener("pagehide", zu);
    document.addEventListener("click", zu);
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") zu(); });
  }

  function warten(n) {
    if (document.querySelector("header.kopf2 .kopf2__menue")) return daten(bauen);
    if (n < 50) setTimeout(() => warten(n + 1), 100);
  }
  warten(0);
})();
