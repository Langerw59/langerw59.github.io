// ============================================================
// glossar_karte.js – Wortkarte mit Herkunft im Wort-Fenster der SprachBox
// 2026-11-02 · Claude
// DE: Klick auf ein Wort → oben eine einfache Karte: Bedeutung,
//     Herkunft, verwandte Wörter, Beispiel, Knopf „📖 Ins Glossar“.
//     Das alte große Fenster (Übersetzung eintragen, Phrase speichern …)
//     bleibt erhalten – versteckt unter „Mehr… / ещё…“.
// RU: Нажал на слово → простая карточка с происхождением и кнопкой
//     «📖 в глоссарий». Старое окно не удалено – спрятано под «Mehr…».
// Braucht: datenbanken/glossar/glossar_en.js (window.GLOSSAR_EN)
// ============================================================
(function () {
  "use strict";
  const LS_MEINE = "glossar_meine_v1";   // { items: [ { w, lang, satz, datum, gefunden } ] }
  const GLOSSAR_SEITE = (document.currentScript && document.currentScript.dataset.glossar) || "/pages/language_lab/glossar/index.html";

  // ---------------- Daten ----------------
  const idx = {};       // englische Wörter + Formen → Eintrag
  const idxDe = {};     // deutsche Bedeutungen → Eintrag
  function indexBauen() {
    (window.GLOSSAR_EN || []).forEach((e) => {
      [e.w].concat(e.f || []).forEach((x) => { const k = norm(x); if (k && !idx[k]) idx[k] = e; });
      String(e.de || "").split(/[,;()]/).forEach((x) => {
        const k = norm(x.replace(/\b(der|die|das|ein|eine|sich|nach)\b/gi, ""));
        if (k && k.length > 2 && !idxDe[k]) idxDe[k] = e;
      });
    });
  }
  function norm(s) {
    return String(s || "").toLowerCase().replace(/[’`´]/g, "'").replace(/^[^a-zäöüßé']+|[^a-zäöüßé']+$/gi, "").trim();
  }
  function finden(wort, lang) {
    const w = norm(wort);
    if (!w) return null;
    if (lang === "de") return idxDe[w] || null;
    if (idx[w]) return idx[w];
    const versuche = [];
    if (w.endsWith("'s")) versuche.push(w.slice(0, -2));
    if (w.endsWith("ies")) versuche.push(w.slice(0, -3) + "y");
    if (w.endsWith("es")) versuche.push(w.slice(0, -2));
    if (w.endsWith("s")) versuche.push(w.slice(0, -1));
    if (w.endsWith("ed")) versuche.push(w.slice(0, -2), w.slice(0, -1), w.slice(0, -3));
    if (w.endsWith("ing")) versuche.push(w.slice(0, -3), w.slice(0, -3) + "e", w.slice(0, -4));
    if (w.endsWith("ly")) versuche.push(w.slice(0, -2));
    if (w.endsWith("er")) versuche.push(w.slice(0, -2), w.slice(0, -1));
    for (const v of versuche) if (idx[v]) return idx[v];
    return null;
  }

  // ---------------- Meine Wörter ----------------
  function meineLaden() { try { const d = JSON.parse(localStorage.getItem(LS_MEINE) || "{}"); return Array.isArray(d.items) ? d.items : []; } catch (e) { return []; } }
  function meineSpeichern(items) { try { localStorage.setItem(LS_MEINE, JSON.stringify({ items })); } catch (e) {} }
  function schluessel(w, lang) { return (lang || "en") + ":" + norm(w); }
  function istGemerkt(w, lang) { const k = schluessel(w, lang); return meineLaden().some((x) => schluessel(x.w, x.lang) === k); }
  function merken(w, lang, satz, gefunden) {
    const items = meineLaden();
    const k = schluessel(w, lang);
    if (items.some((x) => schluessel(x.w, x.lang) === k)) return;
    items.unshift({ w, lang: lang || "en", satz: satz || "", datum: new Date().toISOString().slice(0, 10), gefunden: !!gefunden });
    meineSpeichern(items);
  }
  function vergessen(w, lang) {
    const k = schluessel(w, lang);
    meineSpeichern(meineLaden().filter((x) => schluessel(x.w, x.lang) !== k));
  }

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------------- Stil ----------------
  const css = `
#wordPopup{max-height:calc(100vh - 16px);overflow:auto}
.gk-karte{margin:8px 0 6px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);font-size:14px;line-height:1.4}
.gk-bed{font-size:16px;font-weight:700;margin-bottom:6px}
.gk-bed small{font-weight:400;opacity:.85}
.gk-her{display:inline-block;font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;color:#fff;margin-bottom:5px}
.gk-zeile{margin:4px 0}
.gk-zeile b{opacity:.75;font-weight:600}
.gk-tip{margin:6px 0;padding:6px 8px;border-left:3px solid #f59e0b;background:rgba(245,158,11,.12);border-radius:4px}
.gk-bsp{margin-top:6px;opacity:.95}
.gk-bsp i{opacity:.75}
.gk-knoepfe{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.gk-knoepfe button,.gk-knoepfe a{font:inherit;font-size:13px;cursor:pointer;border-radius:999px;padding:5px 12px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);color:inherit;text-decoration:none}
.gk-knoepfe .gk-merk{background:#1f6feb;border-color:#1f6feb;color:#fff;font-weight:700}
.gk-knoepfe .gk-merk.ok{background:#1a7f37;border-color:#1a7f37}
.gk-fehlt{opacity:.9}
details.gk-mehr{margin-top:8px;border-top:1px solid rgba(255,255,255,.15);padding-top:6px}
details.gk-mehr>summary{cursor:pointer;font-size:13px;opacity:.8;list-style:none}
details.gk-mehr>summary::before{content:"▸ "}
details.gk-mehr[open]>summary::before{content:"▾ "}
`;

  // ---------------- Fenster umbauen ----------------
  let pop = null, karte = null, mehr = null;
  function umbauen() {
    pop = document.getElementById("wordPopup");
    if (!pop || pop.dataset.gkFertig) return !!pop;
    pop.dataset.gkFertig = "1";
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

    const wortZeile = pop.querySelector(".wordPopupWordWrap");
    karte = document.createElement("div");
    karte.className = "gk-karte";
    mehr = document.createElement("details");
    mehr.className = "gk-mehr";
    mehr.innerHTML = "<summary>Mehr… / ещё… <small>(Übersetzung, Phrase, Wörterbuch)</small></summary>";

    // alles nach der Wort-Zeile (außer ×) kommt unter „Mehr…“
    const kinder = Array.from(pop.children);
    const ab = wortZeile ? kinder.indexOf(wortZeile) + 1 : 0;
    kinder.slice(ab).forEach((k) => { if (!k.classList.contains("wordPopupClose")) mehr.appendChild(k); });
    if (wortZeile) wortZeile.after(karte, mehr); else pop.append(karte, mehr);
    return true;
  }

  function satzAusKontext() {
    const k = document.getElementById("wordPopupContext");
    const t = k ? k.textContent || "" : "";
    const m = t.match(/Satz:\s*(.+)$/);
    return m ? m[1].trim() : "";
  }

  function nachrutschen() {
    // Fenster nicht unten aus dem Bild laufen lassen
    const r = pop.getBoundingClientRect();
    const vh = window.innerHeight || 700;
    if (r.bottom > vh - 8) pop.style.top = Math.max(8, vh - r.height - 8) + "px";
  }

  function zeichnen() {
    if (!pop || pop.hidden || !karte) return;
    const wort = pop.dataset.word || "";
    const lang = pop.dataset.lang || "en";
    const e = finden(wort, lang);
    const satz = satzAusKontext();
    const gemerkt = istGemerkt(e ? e.w : wort, e ? "en" : lang);
    const H = (window.GLOSSAR_HERKUNFT || {})[e && e.h] || null;
    mehr.open = false;

    if (e) {
      karte.innerHTML = `
        <div class="gk-bed">${esc(e.w)} = ${esc(e.de)} <small>/ ${esc(e.ru)}</small></div>
        ${H ? `<span class="gk-her" style="background:${H.farbe}">${esc(H.de)} · ${esc(H.ru)}</span>` : ""}
        <div class="gk-zeile"><b>Herkunft:</b> ${esc(e.her)}</div>
        ${e.ver ? `<div class="gk-zeile"><b>Verwandt:</b> ${esc(e.ver)}</div>` : ""}
        ${e.tip ? `<div class="gk-tip">💡 ${esc(e.tip)}</div>` : ""}
        ${e.bsp ? `<div class="gk-bsp">„${esc(e.bsp[0])}“ – <i>${esc(e.bsp[1])}</i></div>` : ""}
        <div class="gk-knoepfe">
          <button type="button" class="gk-merk ${gemerkt ? "ok" : ""}">${gemerkt ? "✓ Im Glossar" : "📖 Ins Glossar / в глоссарий"}</button>
          <button type="button" class="gk-hoer">🔊</button>
          <a href="${GLOSSAR_SEITE}#w=${encodeURIComponent(e.w)}" target="_blank" rel="noopener">Glossar öffnen ↗</a>
        </div>`;
    } else {
      karte.innerHTML = `
        <div class="gk-fehlt">📭 Für „${esc(wort)}“ gibt es noch keine Erklärung.<br>
        <small>Объяснения пока нет. Нажми «Merken» – слово попадёт в список «ждут объяснения», Claude допишет происхождение.</small></div>
        <div class="gk-knoepfe">
          <button type="button" class="gk-merk ${gemerkt ? "ok" : ""}">${gemerkt ? "✓ Gemerkt – wartet auf Erklärung" : "📖 Merken / запомнить"}</button>
          <button type="button" class="gk-hoer">🔊</button>
        </div>`;
    }

    karte.querySelector(".gk-merk").onclick = (ev) => {
      ev.stopPropagation();
      const w = e ? e.w : wort, l = e ? "en" : lang;
      if (istGemerkt(w, l)) vergessen(w, l); else merken(w, l, satz, !!e);
      zeichnen();
    };
    karte.querySelector(".gk-hoer").onclick = (ev) => {
      ev.stopPropagation();
      const b = document.getElementById("btnWordSpeak");
      if (b) b.click();
    };
    requestAnimationFrame(nachrutschen);
  }

  function start() {
    indexBauen();
    if (!umbauen()) return;
    let letzter = "";
    new MutationObserver(() => {
      const sig = pop.hidden ? "" : (pop.dataset.word || "") + "|" + (pop.dataset.lang || "");
      if (sig && sig !== letzter) { letzter = sig; zeichnen(); }
      if (!sig) letzter = "";
    }).observe(pop, { attributes: true, attributeFilter: ["hidden", "data-word", "data-lang"] });
  }

  window.GLOSSAR_KARTE = { finden, merken, vergessen, meineLaden };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
