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
        const offen = r[4].some((u) => pfadOhneIndex(u[1]) === hier);
        return `<details class="etm__unter"${offen ? " open" : ""}><summary class="etm__raum">${esc(r[0])} <span class="etm__unterpfeil">▸</span>${r[2] ? `<small>${esc(r[2])}</small>` : ""}</summary>
          <div class="etm__unterliste">${r[4].map(raum).join("")}</div></details>`;
      }
      const ist = pfadOhneIndex(r[1]) === hier;
      return `<a href="${esc(r[1])}" class="etm__raum${r[3] === "idee" ? " etm__idee" : ""}${ist ? " etm__ist-hier" : ""}"${ist ? ' aria-current="page"' : ""}>${esc(r[0])}${r[2] ? `<small>${esc(r[2])}</small>` : ""}</a>`;
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
           <div class="etm__gruppen">${e.gruppen.map((g) =>
             `<div class="etm__gruppe"><div class="etm__gtitel">${esc(g.t)}</div>${g.r.map(raum).join("")}</div>`).join("")}</div>
         </div>`;
      fenster.querySelector(".etm__zu").addEventListener("click", zu);
      fenster.hidden = false;
      document.body.classList.add("etm-offen");
    }

    for (const e of window.Q_ETAGEN) {
      const k = document.createElement("button");
      k.type = "button";
      k.className = "nav-link etm__knopf" + (e.keller ? " etm__keller" : "");
      k.style.setProperty("--etm-farbe", e.farbe);
      k.setAttribute("aria-expanded", "false");
      k.title = `${e.nr} · ${e.name}`;
      k.innerHTML = `<span class="etm__nr">${esc(e.kurz)}</span><span class="etm__name">${esc(e.keller ? "Keller" : e.name)}</span><span class="etm__pfeil">▾</span>`;
      const alle = (r) => Array.isArray(r[4]) ? r[4] : [r];
      const enthaeltHier = e.gruppen.some((g) => g.r.some((r) => alle(r).some((u) => pfadOhneIndex(u[1]) === hier))) ||
                           (e.eingang && pfadOhneIndex(e.eingang) === hier);
      if (enthaeltHier) k.classList.add("ist-hier");
      k.addEventListener("click", (ev) => {
        ev.stopPropagation();
        offenId === e.id ? zu() : auf(e);
      });
      knoepfe[e.id] = k;
      nav.appendChild(k);
    }

    fenster.addEventListener("click", (ev) => ev.stopPropagation());
    document.addEventListener("click", zu);
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") zu(); });
  }

  function warten(n) {
    if (document.querySelector("header.kopf2 .kopf2__menue")) return daten(bauen);
    if (n < 50) setTimeout(() => warten(n + 1), 100);
  }
  warten(0);
})();
