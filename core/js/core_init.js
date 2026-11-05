// ============================================================
// DE: Master-Skript für LG_MASTER_FULL_v3
// EN: Master script for LG_MASTER_FULL_v3
// RU: Ð“Ð»Ð°Ð²Ð½Ñ‹Ð¹ ÑÐºÑ€Ð¸Ð¿Ñ‚ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð° LG_MASTER_FULL_v3
// ============================================================

// ------------------------------------------------------------
// 1) THEMA (HELL/DUNKEL) – Standard: DUNKEL
// ------------------------------------------------------------
(function setupTheme() {
  const html = document.documentElement;
  const STORAGE_KEY = "lg_theme";

  function setTheme(theme) {
    const next = theme === "dark" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  // DE: Standard-Theme jetzt "light"; Benutzerwahl wird in localStorage gemerkt.
  // RU: Ð¢ÐµÐ¿ÐµÑ€ÑŒ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ ÑÐ²ÐµÑ‚Ð»Ð°Ñ Ñ‚ÐµÐ¼Ð°, Ð²Ñ‹Ð±Ð¾Ñ€ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÑ‚ÑÑ Ð² localStorage.
  const saved = localStorage.getItem(STORAGE_KEY);
  const initialTheme = saved === "dark" || saved === "light" ? saved : "light";
  setTheme(initialTheme);

  // DE: Klick auf Theme-Taste auswerten
  // EN: Handle clicks on theme toggle button
  // RU: ÐžÐ±Ñ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÐ¼ ÐºÐ»Ð¸ÐºÐ¸ Ð¿Ð¾ ÐºÐ½Ð¾Ð¿ÐºÐµ Ð¿ÐµÑ€ÐµÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ Ñ‚ÐµÐ¼Ñ‹
  document.addEventListener("click", (evt) => {
    const target =
      evt.target instanceof Element ? evt.target : evt.target?.parentElement;
    const btn = target?.closest?.("#themeToggle, [data-theme-toggle]");
    if (!btn) return;

    const current =
      html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";

    setTheme(next);
  }, true); // 2026-11-04: capture – das ⚙️-Fenster stoppt Klicks (stopPropagation), sonst kam der Klick hier nie an
})();

// ------------------------------------------------------------
// 2) HEADER/FOOTER als Partials laden
// ------------------------------------------------------------
// DE: Lädt HTML-Fragmente (header.html, footer.html) in Container
// EN: Loads HTML fragments (header.html, footer.html) into containers
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÑ‚ Ñ„Ñ€Ð°Ð³Ð¼ÐµÐ½Ñ‚Ñ‹ (header.html, footer.html) Ð² ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ñ‹
(function loadPartials() {
  // DE: Kopfleiste v2 – eigene CSS-Datei immer laden (auch auf Seiten ohne style.css)
  // RU: стили новой шапки подключаются всегда
  (function ensureKopfCss() {
    const href = "/core/assets/kopfleiste.css";
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  })();
  // DE: Dunkel-Modus „Nachtblau“ für alle Seiten (2026-11-04)
  // RU: тёмная тема «ночной синий» для всех страниц
  (function ensureDunkelCss() {
    const href = "/core/assets/dunkel.css";
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => window.FARBWAECHTER && window.FARBWAECHTER.neu();
    document.head.appendChild(link);
  })();

  // DE: Farbwächter (2026-11-05) – passt fremde feste Farben an Hell/Dunkel an,
  //     damit alle Seiten gleich aussehen und alles lesbar bleibt.
  // RU: «страж цвета» – одинаковый светлый/тёмный фон на всех страницах.
  (function ensureFarbwaechter() {
    const src = "/core/js/farbwaechter.js";
    if (window.__FARBWAECHTER__ || document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  })();

  // DE: Seite ohne Kopfleiste? → automatisch oben einsetzen.
  //     Ausschalten pro Seite: <body data-kein-kopf>
  // RU: если на странице нет шапки – вставляем её сами (сверху).
  if (!document.querySelector('[data-partial="header"]') && document.body && !document.body.hasAttribute("data-kein-kopf")) {
    const host = document.createElement("div");
    host.setAttribute("data-partial", "header");
    host.setAttribute("data-partial-path", "/core/partials/header.html");
    document.body.insertBefore(host, document.body.firstChild);
  }

  const hosts = document.querySelectorAll("[data-partial]");

  // DE: Kopfleiste v2 einrichten: aktueller Menüpunkt, ⚙️-Fenster, Audio-Auswahl
  // RU: подсветка текущего раздела, окно ⚙️, выбор аудио
  function kopfEinrichten(host) {
    const pfad = window.location.pathname.replace(/\/index\.html$/, "/");
    let bester = null, laenge = 0;
    host.querySelectorAll(".kopf2__menue .nav-link").forEach((a) => {
      const ziel = new URL(a.getAttribute("href"), window.location.origin).pathname.replace(/\/index\.html$/, "/");
      const passt = ziel === "/" ? pfad === "/" : pfad.startsWith(ziel);
      if (passt && ziel.length > laenge) { bester = a; laenge = ziel.length; }
    });
    if (bester) {
      bester.classList.add("ist-hier");
      bester.setAttribute("aria-current", "page");
      const menue = bester.parentElement;
      if (menue) menue.scrollLeft = Math.max(0, bester.offsetLeft - (menue.clientWidth - bester.offsetWidth) / 2);
    }

    const knopf = host.querySelector("#kopf2Einst");
    const panel = host.querySelector("#kopf2Panel");
    if (knopf && panel) {
      const zu = () => { panel.hidden = true; knopf.setAttribute("aria-expanded", "false"); };
      knopf.addEventListener("click", (e) => {
        e.stopPropagation();
        const offen = panel.hidden;
        panel.hidden = !offen;
        knopf.setAttribute("aria-expanded", String(offen));
      });
      panel.addEventListener("click", (e) => e.stopPropagation());
      document.addEventListener("click", zu);
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) zu(); });
    }

    // Audio-Auswahl: Kopfleiste kommt später als tts_manager.js → neu verbinden
    let n = 0;
    (function tts() {
      if (window.TTSManager && typeof window.TTSManager.bindUI === "function") { window.TTSManager.bindUI(); return; }
      if (n++ < 30) setTimeout(tts, 100);
    })();
  }

  function navigateSmart(url, evt) {
    if (!url) return;
    const isExternal = /^https?:\/\//.test(url);
    const isPortal = url === "/" || url.startsWith("/index.html");
    if (typeof window.LL_NAVIGATE === "function" && !isExternal && isPortal) {
      evt?.preventDefault();
      window.LL_NAVIGATE("/index.html");
    } else if (!isExternal) {
      evt?.preventDefault();
      window.location.href = url;
    }
  }

  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    const portal = "/index.html";
    if (typeof window.LL_NAVIGATE === "function") {
      window.LL_NAVIGATE(portal);
    } else {
      window.location.href = portal;
    }
  }

  (function ensureFabNavAssets() {
    const cssHref = "/assets/css/ll_fab_nav.css";
    const jsSrc = "/assets/js/ll_fab_nav.js";

    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[src="${jsSrc}"]`)) {
      const script = document.createElement("script");
      script.src = jsSrc;
      script.defer = true;
      document.head.appendChild(script);
    }
  })();

  function normalizePartialPath(rawPath) {
    if (!rawPath) return rawPath;
    if (/^[a-z]+:\/\//i.test(rawPath)) return rawPath;
    const trimmed = rawPath.trim();
    const hasCoreSegment = /(^|\/)core\//.test(trimmed);
    if (trimmed.startsWith("/") || trimmed.startsWith("core/") || hasCoreSegment) {
      return trimmed.replace(/core\/core\//g, "core/");
    }
    return `core/${trimmed.replace(/^\/+/, "")}`;
  }

  hosts.forEach((host) => {
    const type = host.getAttribute("data-partial"); // "header" oder "footer"
    const path = host.getAttribute("data-partial-path");
    if (!path) return;
    const normalizedPath = normalizePartialPath(path);

    fetch(normalizedPath)
      .then((r) => r.text())
      .then((html) => {
        host.innerHTML = html;

        // DE: Keine automatische Umschreibung von Menü-Links; direkte hrefs bleiben.
        host.querySelectorAll("[data-nav]").forEach((el) => {
          const url = el.getAttribute("data-nav");
          if (!url) return;
          el.addEventListener("click", (evt) => navigateSmart(url, evt));
        });

        host.querySelectorAll("[data-back]").forEach((el) => {
          el.addEventListener("click", (evt) => {
            evt.preventDefault();
            goBack();
          });
        });

        if (type === "header" && host.querySelector(".kopf2")) kopfEinrichten(host);

        // DE: Im Footer Jahr aktualisieren
        // EN: Update year in footer
        // RU: ÐžÐ±Ð½Ð¾Ð²Ð»ÑÐµÐ¼ Ð³Ð¾Ð´ Ð² Ñ„ÑƒÑ‚ÐµÑ€Ðµ
        if (type === "footer") {
          const yearSpan = host.querySelector("#footerYear");
          if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
          }
        }
      })
      .catch((err) => console.error("Partial load error:", type, path, err));
  });
})();

// ------------------------------------------------------------
// 3) UHR, DATUM, KW, KALENDER, LERNZEIT  (2026-11-02)
// ------------------------------------------------------------
// DE: Alles steckt jetzt in /core/js/lernuhr.js (eine Datei für alle Seiten).
//     KW wird jetzt nach ISO-Norm berechnet (wie im deutschen Kalender).
// RU: Часы, неделя (KW), календарь 📅 и секундомер – в файле lernuhr.js.
(function loadLernuhr() {
  const SRC = "/core/js/lernuhr.js";
  if (window.__LERNUHR__ || document.querySelector('script[src$="lernuhr.js"]')) return;
  const script = document.createElement("script");
  script.src = SRC;
  script.defer = true;
  document.head.appendChild(script);
})();

// ------------------------------------------------------------
// 4) TTS-Manager global laden
// ------------------------------------------------------------
(function loadTtsManager() {
  const SRC = "/core/js/tts_manager.js";
  if (window.TTSManager || document.querySelector(`script[data-tts-manager="1"]`)) {
    return;
  }
  const script = document.createElement("script");
  script.src = SRC;
  script.defer = true;
  script.dataset.ttsManager = "1";
  document.head.appendChild(script);
})();

