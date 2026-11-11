// ============================================================
// Navi-Knöpfe für alle Seiten / кнопки навигации на всех страницах
// 2026-11-11 · geschrieben mit Claude
// DE: Rechts am Rand: ⬆ nach oben · ⬇ nach unten · ← zurück · → vor.
//     Außerdem: Links zu fremden Seiten (Wikipedia, YouTube …) öffnen im
//     selben Fenster – so bringt „← zurück“ einen wieder auf unsere Seite
//     (auch in der App „Q“ auf dem iPhone).
//     Ausschalten pro Seite: <body data-keine-navi>
// RU: Справа у края: ⬆ вверх · ⬇ вниз · ← назад · → вперёд.
//     Чужие ссылки (Википедия, YouTube …) открываются в том же окне,
//     поэтому «← назад» возвращает на нашу страницу.
//     Отключить на странице: <body data-keine-navi>
// Wird automatisch von core_init.js geladen.
// ============================================================
(function () {
  "use strict";
  if (window.__NAVI_KNOEPFE__) return;
  window.__NAVI_KNOEPFE__ = true;

  // ---------- 1) Fremde Links im selben Fenster öffnen ----------
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || a.hasAttribute("download") || a.hasAttribute("data-neues-fenster")) return;
    if ((a.getAttribute("target") || "").toLowerCase() !== "_blank") return;
    let url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (!/^https?:$/.test(url.protocol)) return;
    e.preventDefault();
    location.href = url.href;
  }, false);

  // ---------- 2) Knöpfe ----------
  const CSS = `
  #navi-knoepfe{position:fixed;right:6px;top:50%;transform:translateY(-50%);z-index:9998;
    display:flex;flex-direction:column;gap:6px;opacity:.6;transition:opacity .2s}
  #navi-knoepfe:hover,#navi-knoepfe:focus-within{opacity:1}
  #navi-knoepfe button{width:40px;height:40px;border-radius:50%;border:1px solid rgba(31,77,153,.45);
    background:rgba(255,255,255,.92);color:#1f4d99;font-size:19px;line-height:1;font-weight:700;
    cursor:pointer;padding:0;box-shadow:0 1px 4px rgba(0,0,0,.18);touch-action:manipulation;
    display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
  #navi-knoepfe button:active{transform:scale(.92)}
  #navi-knoepfe button[disabled]{opacity:.3;cursor:default}
  html[data-theme="dark"] #navi-knoepfe button{background:rgba(24,32,51,.92);color:#8db4ff;border-color:rgba(141,180,255,.45)}
  @media print{#navi-knoepfe{display:none}}`;

  function seiteLang() {
    const h = Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0);
    return h > window.innerHeight + 40;
  }

  function bauen() {
    if (!document.body || document.getElementById("navi-knoepfe") || document.body.hasAttribute("data-keine-navi")) return;
    const st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    const box = document.createElement("div");
    box.id = "navi-knoepfe";
    const knopf = (zeichen, titel, tun) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = zeichen; b.title = titel; b.setAttribute("aria-label", titel);
      b.addEventListener("click", tun);
      box.appendChild(b);
      return b;
    };
    const schritt = () => Math.round(window.innerHeight * 0.8);
    const hoch = knopf("⬆", "Nach oben / вверх", () => window.scrollBy({ top: -schritt(), behavior: "smooth" }));
    const runter = knopf("⬇", "Nach unten / вниз", () => window.scrollBy({ top: schritt(), behavior: "smooth" }));
    knopf("←", "Zurück / назад", () => {
      if (history.length > 1) history.back();
      else location.href = "/index.html";
    });
    knopf("→", "Vor / вперёд", () => history.forward());
    document.body.appendChild(box);

    // ⬆/⬇ nur zeigen, wenn die Seite länger als der Bildschirm ist
    function pruefen() {
      const lang = seiteLang();
      hoch.style.display = runter.style.display = lang ? "" : "none";
      if (!lang) return;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      hoch.disabled = y < 5;
      runter.disabled = y > max - 5;
    }
    let t = null;
    const spaeter = () => { clearTimeout(t); t = setTimeout(pruefen, 120); };
    window.addEventListener("scroll", spaeter, { passive: true });
    window.addEventListener("resize", spaeter);
    window.addEventListener("hashchange", spaeter);
    try { new MutationObserver(spaeter).observe(document.body, { childList: true, subtree: true }); } catch (_) {}
    pruefen();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bauen);
  else bauen();
})();
