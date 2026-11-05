// ============================================================
// DE: Farbwächter (2026-11-05) – Hell/Dunkel für ALLE Seiten gleich.
//     Viele Seiten haben eigene feste Farben (weiße Kästen, dunkle Seiten).
//     Der Farbwächter passt nach dem Umschalten 🌞/🌙 automatisch an:
//       1) neutrale Flächen (weiß/grau/schwarz) → Farben des Modus
//          (Dunkel = „Nachtblau“ wie in dunkel.css, Hell = weiß/hellgrau)
//       2) Schrift, die schlecht lesbar ist → passende helle/dunkle Schrift
//     Bunte Knöpfe, Bilder und Fotos-Hintergründe bleiben unverändert.
//     Ausschalten für eine Seite: <body data-farbwaechter="aus">
//     Ausnehmen für ein Element: data-farbe-fest
// RU: «Страж цвета»: на всех страницах одинаковый светлый/тёмный фон,
//     нечитаемый текст исправляется сам. Цветные кнопки и картинки не трогает.
// ============================================================
(function () {
  if (window.__FARBWAECHTER__) return;
  window.__FARBWAECHTER__ = true;

  const html = document.documentElement;

  // Farben der beiden Modi (Dunkel = dieselben wie core/assets/dunkel.css)
  const PAL = {
    dark: {
      page: [29, 44, 71], card: [37, 56, 88], field: [45, 67, 104], line: [61, 86, 128],
      text: [223, 231, 243], link: [159, 203, 255],
    },
    light: {
      page: [242, 244, 248], card: [255, 255, 255], field: [247, 249, 252], line: [208, 215, 226],
      text: [17, 24, 39], link: [29, 78, 216],
    },
  };

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IMG", "SVG", "CANVAS", "VIDEO", "IFRAME", "PICTURE", "AUDIO", "OBJECT", "EMBED", "BR", "HR", "svg"]);
  const FIELD_TAGS = new Set(["INPUT", "SELECT", "TEXTAREA", "BUTTON"]);

  // ---------- Farb-Hilfen ----------
  function parse(s) {
    const m = s && s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const a = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
    return [a[0], a[1], a[2], a[3] === undefined ? 1 : a[3]];
  }
  function lum(c) {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  }
  function kontrast(a, b) {
    const x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }
  function hsl(c) {
    const r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    const d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    return { s, l };
  }
  // neutral = weiß/grau/beige/schwarz/nachtblau – keine richtige „Farbe“
  function neutral(c) {
    const h = hsl(c);
    return h.s < 0.35 || h.l > 0.955 || h.l < 0.2;
  }
  function mischen(fg, bg) {
    const a = fg[3] === undefined ? 1 : fg[3];
    return [0, 1, 2].map((i) => Math.round(fg[i] * a + bg[i] * (1 - a)));
  }
  const css = (c, a) => (a === undefined || a >= 1 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`);
  function verlaufFarben(img) {
    if (!img || img === "none" || /url\(/.test(img)) return null;
    const f = img.match(/rgba?\([^)]+\)/g);
    return f && f.length ? f.map(parse) : null;
  }

  // ---------- Merken & Zurücksetzen ----------
  const orig = new Map(); // Element → { Eigenschaft: [alterWert, alterVorrang] }
  function setzen(el, prop, wert) {
    let o = orig.get(el);
    if (!o) { o = {}; orig.set(el, o); }
    if (!(prop in o)) o[prop] = [el.style.getPropertyValue(prop), el.style.getPropertyPriority(prop)];
    el.style.setProperty(prop, wert, "important");
  }
  function zuruecksetzen(el) {
    const o = orig.get(el);
    if (!o) return;
    for (const p in o) {
      const [v, pr] = o[p];
      if (v) el.style.setProperty(p, v, pr); else el.style.removeProperty(p);
    }
    orig.delete(el);
  }
  function allesZurueck() { for (const el of Array.from(orig.keys())) zuruecksetzen(el); }

  function modus() { return html.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function ausgenommen(el) {
    return SKIP_TAGS.has(el.tagName) || el.closest(".kopf2, [data-farbe-fest], svg");
  }

  // ---------- 1) Flächen ----------
  function flaeche(el, m) {
    const P = PAL[m];
    const cs = getComputedStyle(el);
    const img = cs.backgroundImage;
    if (/url\(/.test(img)) return; // Foto/Bild → nicht anfassen

    const zuHell = (c) => m === "dark" && lum(c) > 0.3;   // im Dunkel-Modus zu hell
    const zuDunkel = (c) => m === "light" && lum(c) < 0.06; // im Hell-Modus zu dunkel
    const ersatz = () => {
      if (FIELD_TAGS.has(el.tagName)) return P.field;
      // Kasten im Kasten → etwas andere Stufe, damit man ihn noch sieht
      const p = el.parentElement && orig.get(el.parentElement);
      return p && p["background-color"] ? P.field : P.card;
    };

    const verlauf = verlaufFarben(img);
    if (verlauf) {
      if (verlauf.every((c) => neutral(c) && (zuHell(c) || zuDunkel(c)))) {
        setzen(el, "background-image", "none");
        setzen(el, "background-color", css(ersatz()));
      }
    } else {
      const bg = parse(cs.backgroundColor);
      if (bg && bg[3] >= 0.25 && neutral(bg) && (zuHell(bg) || zuDunkel(bg))) {
        setzen(el, "background-color", css(ersatz(), bg[3]));
      }
    }

    // Rahmen
    if (parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0) {
      const bc = parse(parseFloat(cs.borderTopWidth) > 0 ? cs.borderTopColor : cs.borderLeftColor);
      if (bc && bc[3] > 0.2 && neutral(bc) && ((m === "dark" && lum(bc) > 0.45) || (m === "light" && lum(bc) < 0.03))) {
        setzen(el, "border-color", css(P.line));
      }
    }
  }

  // ---------- 2) Schrift ----------
  function hintergrundVon(el, m) {
    for (let e = el; e && e !== html; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (/url\(/.test(cs.backgroundImage)) return null; // auf Foto → nicht beurteilen
      const v = verlaufFarben(cs.backgroundImage);
      if (v) {
        const s = v.reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0]);
        return s.map((x) => x / v.length);
      }
      const c = parse(cs.backgroundColor);
      if (c && c[3] >= 0.5) return c;
    }
    return PAL[m].page;
  }
  function hatText(el) {
    if (FIELD_TAGS.has(el.tagName)) return true;
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) return true;
    return false;
  }
  function schrift(el, m) {
    if (!hatText(el)) return;
    const bg = hintergrundVon(el, m);
    if (!bg) return;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    if (!fg) return;
    if (kontrast(mischen(fg, bg), bg) >= 3.5) return;
    const hellerGrund = lum(bg) > 0.3;
    const link = el.closest("a");
    const ziel = hellerGrund
      ? (link ? PAL.light.link : PAL.light.text)
      : (link ? PAL.dark.link : PAL.dark.text);
    setzen(el, "color", css(ziel));
  }

  // ---------- Seite / Teilbaum bearbeiten ----------
  function seitengrund(m) {
    const P = PAL[m];
    for (const el of [html, document.body]) {
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (/url\(/.test(cs.backgroundImage)) continue;
      if (cs.backgroundImage !== "none") setzen(el, "background-image", "none");
      if (el === document.body || parse(cs.backgroundColor)?.[3] > 0) setzen(el, "background-color", css(P.page));
    }
    if (document.body) {
      const fg = parse(getComputedStyle(document.body).color);
      if (fg && kontrast(fg, P.page) < 4.5) setzen(document.body, "color", css(P.text));
    }
  }

  // Während des Messens keine Übergangs-Animationen (sonst liest man halbe Farben)
  let stopStil = null;
  function uebergaengeAus() {
    if (!stopStil) {
      stopStil = document.createElement("style");
      stopStil.textContent = "html.fw-messen *, html.fw-messen *::before, html.fw-messen *::after { transition: none !important; }";
      document.head.appendChild(stopStil);
    }
    html.classList.add("fw-messen");
    void html.offsetHeight;
  }
  function uebergaengeAn() {
    void html.offsetHeight;
    html.classList.remove("fw-messen");
  }

  function bearbeiten(wurzel) {
    uebergaengeAus();
    try { bearbeitenIntern(wurzel); } finally { uebergaengeAn(); }
  }
  function bearbeitenIntern(wurzel) {
    if (!document.body || document.body.getAttribute("data-farbwaechter") === "aus") return;
    const m = modus();
    const liste = wurzel === document.body ? Array.from(document.body.getElementsByTagName("*")) : [wurzel, ...wurzel.getElementsByTagName("*")];
    const els = liste.filter((el) => el.nodeType === 1 && !ausgenommen(el));
    if (wurzel === document.body) seitengrund(m);
    for (const el of els) flaeche(el, m);
    for (const el of els) schrift(el, m);
  }

  function alles() {
    uebergaengeAus();
    try { allesZurueck(); bearbeitenIntern(document.body); } finally { uebergaengeAn(); }
  }

  // ---------- Beobachten: neue Inhalte, Klassenwechsel, Umschalten 🌞/🌙 ----------
  let warteschlange = new Set(), timer = null;
  function planen(el) {
    if (!el || el.nodeType !== 1) return;
    warteschlange.add(el);
    if (!timer) timer = setTimeout(abarbeiten, 120);
  }
  function abarbeiten() {
    timer = null;
    const liste = Array.from(warteschlange);
    warteschlange = new Set();
    for (const el of liste) {
      if (!el.isConnected || liste.some((x) => x !== el && x.contains(el))) continue;
      uebergaengeAus();
      try {
        for (const k of [el, ...el.getElementsByTagName("*")]) zuruecksetzen(k);
        bearbeitenIntern(el);
      } finally { uebergaengeAn(); }
    }
  }

  function start() {
    alles();
    new MutationObserver((muts) => {
      for (const mu of muts) {
        if (mu.type === "childList") mu.addedNodes.forEach(planen);
        else if (mu.type === "attributes") planen(mu.target);
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden", "open"] });

    let letzter = modus();
    new MutationObserver(() => {
      if (modus() !== letzter) { letzter = modus(); alles(); }
    }).observe(html, { attributes: true, attributeFilter: ["data-theme"] });

    // nach dem Laden von Bildern/Daten noch einmal
    window.addEventListener("load", () => setTimeout(alles, 300));
  }

  window.FARBWAECHTER = { neu: alles };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
