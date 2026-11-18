// ============================================================
// wort_markierer.js – Wort markieren → „📖 Glossar“ (auf allen Quantura-Seiten)
// 2026-11-17 · Claude
// DE: Ein englisches Wort (oder 2–3 Wörter) mit der Maus / dem Finger markieren →
//     kleiner Knopf „📖 Glossar“ erscheint. Antippen → Karte direkt auf der Seite:
//     Lautschrift [ ] zum Anhören, „Wie liest man das?“, Bedeutung, Herkunft.
//     Steht das Wort noch nicht im Glossar: „📥 Vormerken“ → es erscheint im Glossar
//     unter „📭 Warten auf Erklärung“; Claude trägt es dann mit Herkunft ein.
// RU: Выдели слово → кнопка «📖 Glossar» → карточка прямо на странице.
//     Нет в глоссарии → «📥 Vormerken» – слово ждёт объяснения в глоссарии.
// 2026-11-17 (2): Maus ruhig über einem Wort → deutsche Bedeutung; Rechtsklick → Karte.
// 2026-11-18: ZWEI Glossare – Englisch (glossar_en.js) und Deutsch (glossar_de.js).
//   Deutsche Fachwörter (finite, Infinitiv …) werden jetzt erkannt und mit DEUTSCHER Stimme
//   gelesen (vorher: immer englische Stimme → „finite“ klang wie „файнайт“).
//   Seite kann ihre Sprache angeben: <body data-wm-sprache="de">
// RU: два глоссария – английский и немецкий; немецкие слова читает немецкий голос.
// 2026-11-18 (2): Schnelleingabe – Knopf mit data-glossar-schnell öffnet „📖 Ins Glossar“ (Wort tippen, 🇩🇪/🇬🇧 wählen).
//   RU: кнопка data-glossar-schnell – ввести слово и выбрать немецкий или английский глоссарий.
// Ausschalten pro Seite: <body data-kein-markierer>
// ============================================================
(function () {
  "use strict";
  if (window.__WORT_MARKIERER__) return;
  window.__WORT_MARKIERER__ = true;
  if (document.body && document.body.hasAttribute("data-kein-markierer")) return;

  const LS_MEINE = "glossar_meine_v1";
  const GLOSSAR = "/pages/language_lab/glossar/index.html";
  const SPICK = "/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/spickzettel.html";
  const LESE = "/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/leseregeln.html";
  const GLOSSAR_DE_SEITE = "/pages/language_lab/glossar/de.html";
  const GRAMMATIK = "/pages/language_lab/grammatik/index.html";
  const DATEN = ["/datenbanken/glossar/glossar_en.js", "/datenbanken/glossar/lautschrift_en.js", "/datenbanken/glossar/lauthilfe_en.js", "/datenbanken/glossar/glossar_de.js"];

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s || "").toLowerCase().replace(/[’`´]/g, "'").replace(/^[^a-zäöüßé']+|[^a-zäöüßé']+$/gi, "").trim();

  // ---------- Daten nachladen (nur beim ersten Mal) ----------
  let ladenP = null;
  function laden() {
    if (ladenP) return ladenP;
    ladenP = Promise.all(DATEN.map((src) => new Promise((ok) => {
      if (document.querySelector(`script[src$="${src.split("/").pop()}"]`) &&
          (src.includes("glossar_en") ? window.GLOSSAR_EN : src.includes("glossar_de") ? window.GLOSSAR_DE : src.includes("lautschrift") ? window.lautschriftEN : window.LAUTHILFE_EN)) return ok();
      const s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = ok;
      document.head.appendChild(s);
    })));
    return ladenP;
  }
  let idx = null;
  function finden(wort) {
    if (!idx) {
      idx = {};
      (window.GLOSSAR_EN || []).forEach((e) => [e.w].concat(e.f || []).forEach((x) => { const k = norm(x); if (k && !idx[k]) idx[k] = e; }));
    }
    const w = norm(wort);
    if (!w) return null;
    if (idx[w]) return idx[w];
    const v = [];
    if (w.endsWith("'s")) v.push(w.slice(0, -2));
    if (w.endsWith("ies")) v.push(w.slice(0, -3) + "y");
    if (w.endsWith("es")) v.push(w.slice(0, -2));
    if (w.endsWith("s")) v.push(w.slice(0, -1));
    if (w.endsWith("ed")) v.push(w.slice(0, -2), w.slice(0, -1), w.slice(0, -3));
    if (w.endsWith("ing")) v.push(w.slice(0, -3), w.slice(0, -3) + "e", w.slice(0, -4));
    if (w.endsWith("ly")) v.push(w.slice(0, -2));
    for (const x of v) if (idx[x]) return idx[x];
    return null;
  }
  // ---------- Deutsches Glossar / немецкий глоссарий ----------
  const ohneArt = (s) => String(s || "").toLowerCase().replace(/[’`´]/g, "'").replace(/^(der|die|das|den|dem|des)\s+/, "").replace(/^[^a-zäöüß0-9]+|[^a-zäöüß0-9]+$/gi, "").trim();
  let idxDE = null;
  function findenDE(wort) {
    if (!idxDE) {
      idxDE = {};
      (window.GLOSSAR_DE || []).forEach((e) => {
        const ks = [e.w, ohneArt(e.w).split(" ").pop()].concat(e.k || []);
        ks.forEach((x) => { const k = ohneArt(x); if (k && !idxDE[k]) idxDE[k] = e; });
      });
    }
    const w = ohneArt(wort);
    return w ? idxDE[w] || null : null;
  }
  // Sprache eines unbekannten Wortes raten / угадать язык незнакомого слова
  function spracheVon(text, el) {
    if (/[äöüÄÖÜß]/.test(text)) return "de";
    const mitLang = el && el.closest && el.closest("[lang]");
    if (mitLang && mitLang !== document.documentElement) return /^de/i.test(mitLang.getAttribute("lang")) ? "de" : "en";
    const seite = document.body && document.body.getAttribute("data-wm-sprache");
    return seite === "de" ? "de" : "en";
  }
  const ipa = (w) => (typeof window.lautschriftEN === "function" ? window.lautschriftEN(w) : "");

  // ---------- Meine Wörter (gemeinsam mit Glossar und SprachBox) ----------
  function meine() { try { const d = JSON.parse(localStorage.getItem(LS_MEINE) || "{}"); return Array.isArray(d.items) ? d.items : []; } catch (_) { return []; } }
  function gemerkt(w) { const k = norm(w); return meine().some((x) => norm(x.w) === k); }
  function merken(w, satz, gefunden, lang) {
    const items = meine();
    if (items.some((x) => norm(x.w) === norm(w))) return;
    items.unshift({ w, lang: lang || "en", satz: satz || "", datum: new Date().toISOString().slice(0, 10), gefunden: !!gefunden, seite: document.title || location.pathname });
    try { localStorage.setItem(LS_MEINE, JSON.stringify({ items })); } catch (_) {}
    try { window.dispatchEvent(new CustomEvent("glossar-geaendert")); } catch (_) {} // Seite kann Liste neu zeichnen
  }

  // ---------- Sprechen ----------
  function sag(text, lang) {
    lang = lang === "de" ? "de" : "en";
    if (window.TTSManager && window.TTSManager.speak) { window.TTSManager.speak(text, lang); return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = lang === "de" ? "de-DE" : "en-US"; u.rate = 0.85;
      speechSynthesis.speak(u);
    } catch (_) {}
  }

  // ---------- Stil ----------
  const st = document.createElement("style");
  st.textContent = `
#wmKnopf{position:absolute;z-index:100000;display:none;gap:4px;padding:3px;border-radius:999px;background:#1f6feb;box-shadow:0 4px 14px rgba(0,0,0,.35)}
#wmKnopf button{font:600 14px system-ui,sans-serif;color:#fff;background:transparent;border:0;border-radius:999px;padding:6px 11px;cursor:pointer;white-space:nowrap}
#wmKnopf button:hover{background:rgba(255,255,255,.18)}
#wmKarte{position:fixed;z-index:100001;left:50%;bottom:16px;transform:translateX(-50%);width:min(560px,96vw);max-height:70vh;overflow:auto;
  background:var(--card,#fff);color:var(--text,#1f2328);border:2px solid #1f6feb;border-radius:16px;padding:12px 14px;box-shadow:0 18px 50px rgba(0,0,0,.4);font:15px/1.45 system-ui,sans-serif}
html[data-theme="dark"] #wmKarte{background:#253858;color:#dfe7f3}
#wmKarte .wm-kopf{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-right:30px}
#wmKarte .wm-wort{font-size:22px;font-weight:800}
#wmKarte .wm-ipa{font:600 19px "Segoe UI","DejaVu Sans",sans-serif;color:#1f6feb;cursor:pointer;border:0;background:none;padding:0 3px;border-radius:6px}
#wmKarte .wm-ipa:hover{background:rgba(31,111,235,.15)}
#wmKarte .wm-zu{position:absolute;right:10px;top:8px;font-size:20px;border:0;background:none;cursor:pointer;color:inherit}
#wmKarte .wm-bed{font-size:17px;font-weight:700;margin:4px 0}
#wmKarte .wm-her{display:inline-block;font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;color:#fff;margin:2px 0 4px}
#wmKarte .wm-tip{margin:6px 0;padding:6px 8px;border-left:3px solid #f59e0b;background:rgba(245,158,11,.12);border-radius:4px}
#wmKarte .wm-knoepfe{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
#wmKarte .wm-knoepfe button,#wmKarte .wm-knoepfe a{font:600 13px system-ui,sans-serif;cursor:pointer;border-radius:999px;padding:6px 12px;border:1px solid rgba(127,127,127,.45);background:transparent;color:inherit;text-decoration:none}
#wmKarte .wm-knoepfe .wm-haupt{background:#1f6feb;border-color:#1f6feb;color:#fff}
#wmKarte .wm-knoepfe .ok{background:#1a7f37;border-color:#1a7f37;color:#fff}
#wmKarte details>summary{cursor:pointer;font-weight:600;margin-top:6px}
#wmTipp{position:absolute;z-index:100002;pointer-events:none;max-width:340px;padding:6px 10px;border-radius:10px;background:#1f2937;color:#fff;font:14px/1.35 system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.35)}
#wmTipp b{font-size:15px}#wmTipp .i{color:#9fcbff;font-family:"Segoe UI","DejaVu Sans",sans-serif}#wmTipp small{opacity:.75}
#wmKarte .wm-fehlt{padding:8px 10px;border:1px dashed rgba(127,127,127,.6);border-radius:10px;margin:6px 0}`;
  document.head.appendChild(st);

  const knopf = document.createElement("div");
  knopf.id = "wmKnopf";
  knopf.innerHTML = `<button type="button" data-a="glossar" title="Wort im Glossar nachschlagen / посмотреть в глоссарии">📖 Glossar</button><button type="button" data-a="hoer" title="anhören / послушать">🔊</button>`;
  document.body.appendChild(knopf);
  let karte = null;
  let auswahl = { text: "", satz: "", el: null };

  // ---------- Markierung erkennen ----------
  function satzUm(sel) {
    try {
      const n = sel.anchorNode && (sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode);
      const t = (n && n.closest("p,li,td,div,label,option,h1,h2,h3,button") || n || {}).textContent || "";
      return t.replace(/\s+/g, " ").trim().slice(0, 200);
    } catch (_) { return ""; }
  }
  function pruefen() {
    const sel = window.getSelection && window.getSelection();
    const text = sel ? String(sel).replace(/\s+/g, " ").trim() : "";
    const ziel = sel && sel.anchorNode && (sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode);
    const ok = text && text.length <= 40 && /^[A-Za-zÄÖÜäöüßéè'’\- ]+$/.test(text) && text.split(" ").length <= 3 &&
      /[A-Za-z]/.test(text) && !(ziel && ziel.closest && ziel.closest("input,textarea,[contenteditable],#wmKarte,#wmKnopf,#wordPopup"));
    if (!ok) { knopf.style.display = "none"; return; }
    auswahl = { text: text.replace(/[’]/g, "'").replace(/^[^A-Za-zÄÖÜäöüß]+|[^A-Za-zÄÖÜäöüß]+$/g, ""), satz: satzUm(sel), el: ziel };
    const r = sel.getRangeAt(0).getBoundingClientRect();
    knopf.style.display = "flex";
    const kb = knopf.offsetWidth || 150;
    knopf.style.left = Math.max(6, Math.min(window.scrollX + r.left + r.width / 2 - kb / 2, window.scrollX + document.documentElement.clientWidth - kb - 6)) + "px";
    knopf.style.top = (window.scrollY + r.bottom + 8) + "px";
  }
  let t = 0;
  document.addEventListener("selectionchange", () => { clearTimeout(t); t = setTimeout(pruefen, 250); });
  knopf.addEventListener("mousedown", (e) => e.preventDefault()); // Markierung nicht verlieren
  knopf.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.a === "hoer") { sag(auswahl.text, findenDE(auswahl.text) ? "de" : spracheVon(auswahl.text, auswahl.el)); return; }
    zeigen(auswahl.text, auswahl.satz, auswahl.el);
  });

  // ---------- Wort unter der Maus / слово под мышкой ----------
  function wortBei(x, y) {
    let node = null, off = 0;
    if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); if (p) { node = p.offsetNode; off = p.offset; } }
    else if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); if (r) { node = r.startContainer; off = r.startOffset; } }
    if (!node || node.nodeType !== 3) return null;
    const el = node.parentElement;
    if (!el || el.closest("input,textarea,select,[contenteditable],#wmKarte,#wmKnopf,#wmTipp,#wordPopup,script,style")) return null;
    const t = node.textContent;
    const ist = (c) => /[A-Za-zÄÖÜäöüß'’]/.test(c || "");
    let a = off, b = off;
    while (a > 0 && ist(t[a - 1])) a--;
    while (b < t.length && ist(t[b])) b++;
    const w = t.slice(a, b).replace(/^'+|'+$/g, "");
    if (w.length < 2) return null;
    // wirklich über dem Wort? / курсор действительно над словом?
    try {
      const r = document.createRange(); r.setStart(node, a); r.setEnd(node, b);
      const q = r.getBoundingClientRect();
      if (x < q.left - 2 || x > q.right + 2 || y < q.top - 2 || y > q.bottom + 2) return null;
      return { w, rect: q, el };
    } catch (_) { return null; }
  }

  // DE: Maus ruhig über einem englischen Wort → kleiner Hinweis mit deutscher Bedeutung
  // RU: задержал мышку на английском слове → подсказка с немецким переводом
  const tipp = document.createElement("div");
  tipp.id = "wmTipp"; tipp.hidden = true;
  document.body.appendChild(tipp);
  const feineMaus = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let hT = 0, hLetzt = "";
  if (feineMaus) {
    document.addEventListener("mousemove", (ev) => {
      clearTimeout(hT);
      if (!tipp.hidden && hLetzt) { const q = tipp.dataset; if (Math.abs(ev.clientX - +q.x) > 30 || Math.abs(ev.clientY - +q.y) > 20) { tipp.hidden = true; hLetzt = ""; } }
      hT = setTimeout(async () => {
        const f = wortBei(ev.clientX, ev.clientY);
        if (!f) return;
        await laden(); if (!idx) finden("");
        const d = findenDE(f.w);
        if (d) {
          tipp.innerHTML = `<b>${esc(d.w)}</b> <span class="i">${esc(d.aus || "")}</span><br>${esc(d.ru)}<br><small>🇩🇪 Glossar Deutsch · Rechtsklick: mehr</small>`;
          tipp.hidden = false; hLetzt = f.w;
          tipp.dataset.x = ev.clientX; tipp.dataset.y = ev.clientY;
          tipp.style.left = Math.max(6, Math.min(window.scrollX + f.rect.left, window.scrollX + document.documentElement.clientWidth - tipp.offsetWidth - 6)) + "px";
          tipp.style.top = (window.scrollY + f.rect.bottom + 6) + "px";
          return;
        }
        if (spracheVon(f.w, f.el) === "de") return; // deutsches Wort ohne Eintrag → kein englischer Hinweis
        const e = finden(f.w);
        if (!e || norm(e.de).replace(/^(der|die|das) /, "") === norm(e.w)) return; // gleich im Deutschen → kein Hinweis
        const i = ipa(f.w) || ipa(e.w);
        tipp.innerHTML = `<b>${esc(f.w)}</b> ${i ? `<span class="i">[${esc(i)}]</span>` : ""} = ${esc(e.de)}<br><small>${esc(e.ru)} · Rechtsklick: mehr</small>`;
        tipp.hidden = false; hLetzt = f.w;
        tipp.dataset.x = ev.clientX; tipp.dataset.y = ev.clientY;
        const tb = tipp.offsetWidth;
        tipp.style.left = Math.max(6, Math.min(window.scrollX + f.rect.left, window.scrollX + document.documentElement.clientWidth - tb - 6)) + "px";
        tipp.style.top = (window.scrollY + f.rect.bottom + 6) + "px";
      }, 600);
    }, { passive: true });
    document.addEventListener("scroll", () => { tipp.hidden = true; }, { passive: true });
  }

  // DE: Rechtsklick auf ein englisches Wort → Karte (mit „Ins Glossar“). Mit Umschalt (Shift) = normales Menü.
  // RU: правый клик по слову → карточка (с «в глоссарий»). С Shift – обычное меню браузера.
  document.addEventListener("contextmenu", (ev) => {
    if (ev.shiftKey) return;
    const sel = window.getSelection && String(window.getSelection()).trim();
    if (sel) return; // markierter Text → normales Menü (Kopieren)
    if (ev.target.closest && ev.target.closest("a,input,textarea,select,img,video")) return;
    const f = wortBei(ev.clientX, ev.clientY);
    if (!f) return;
    ev.preventDefault();
    tipp.hidden = true;
    zeigen(f.w, (f.el.closest("p,li,td,div,label,h1,h2,h3,button") || f.el).textContent.replace(/\s+/g, " ").trim().slice(0, 200), f.el);
  });

  // ---------- Karte ----------
  function karteHer() {
    if (!karte) {
      karte = document.createElement("div");
      karte.id = "wmKarte";
      document.body.appendChild(karte);
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && karte) karte.hidden = true; });
    }
    karte.hidden = false;
    return karte;
  }
  // zwang: "de" | "en" | undefined – Glossar fest vorgeben / принудительно выбрать глоссарий
  async function zeigen(text, satz, el, zwang) {
    knopf.style.display = "none";
    await laden();
    idx = null; idxDE = null;
    karteHer();
    // 2026-11-18: zuerst im deutschen Glossar suchen / сначала ищем в немецком глоссарии
    const d = zwang === "en" ? null : findenDE(text);
    if (d) return zeigenDE(d, text);
    const sprache = zwang || spracheVon(text, el);
    if (sprache === "de") return zeigenUnbekanntDE(text, satz);
    const einzel = !/\s/.test(text);
    const e = einzel ? finden(text) : null;
    const wort = einzel ? norm(text) : text.toLowerCase();
    const i = einzel ? ipa(wort) || (e ? ipa(e.w) : "") : "";
    const H = e ? (window.GLOSSAR_HERKUNFT || {})[e.h] : null;
    const von = encodeURIComponent(location.pathname + location.search);
    const vonName = encodeURIComponent((document.title || "Zurück").split(/[–|-]/)[0].trim());
    const glossarLink = `${GLOSSAR}#w=${encodeURIComponent(e ? e.w : wort)}&von=${von}&vonName=${vonName}`;
    const google = `https://translate.google.com/?sl=en&tl=de&text=${encodeURIComponent(text)}&op=translate`;
    const lh = i && window.LAUTHILFE_EN
      ? `<details><summary>📏 Wie liest man das? / как читается?</summary>${window.LAUTHILFE_EN.html(wort, i, { spick: SPICK, lese: LESE, hoerAttr: "data-wm-sag", von: location.pathname })}</details>` : "";
    const istGemerkt = gemerkt(e ? e.w : wort);
    let inhalt;
    if (e) {
      inhalt = `
        <div class="wm-bed">= ${esc(e.de)} <small style="font-weight:400;opacity:.85">/ ${esc(e.ru)}</small></div>
        ${H ? `<span class="wm-her" style="background:${H.farbe}">${esc(H.de)} · ${esc(H.ru)}</span>` : ""}
        <div><b>Herkunft:</b> ${esc(e.her)}</div>
        ${e.ver ? `<div><b>Verwandt:</b> ${esc(e.ver)}</div>` : ""}
        ${e.tip ? `<div class="wm-tip">💡 ${esc(e.tip)}</div>` : ""}
        ${e.bsp ? `<div style="margin-top:4px">„${esc(e.bsp[0])}“ – <i>${esc(e.bsp[1])}</i></div>` : ""}
        ${lh}
        <div class="wm-knoepfe">
          <button type="button" class="wm-merk ${istGemerkt ? "ok" : "wm-haupt"}">${istGemerkt ? "✓ In „Meine Wörter“" : "⭐ In „Meine Wörter“"}</button>
          <a href="${glossarLink}" target="quantura_glossar">Im Glossar öffnen ↗</a>
        </div>`;
    } else {
      inhalt = `
        ${lh}
        <div class="wm-fehlt">📭 <b>Noch nicht im Glossar.</b> Vormerken – dann trägt Claude das Wort mit Bedeutung, Herkunft und Aussprache ein.<br>
          <small>Ещё нет в глоссарии. «Vormerken» – и потом в чате: «в глоссарий».</small></div>
        <div class="wm-knoepfe">
          <button type="button" class="wm-merk ${istGemerkt ? "ok" : "wm-haupt"}">${istGemerkt ? "✓ Vorgemerkt" : "📥 Vormerken"}</button>
          <a href="${google}" target="quantura_google" rel="noopener">Google Übersetzer ↗</a>
          <a href="${GLOSSAR}#tab=warte" target="quantura_glossar">📭 Warteliste ↗</a>
        </div>`;
    }
    karte.innerHTML = `
      <button type="button" class="wm-zu" title="schließen (Esc)">✕</button>
      <div class="wm-kopf"><span class="wm-wort">${esc(e && einzel ? (norm(e.w) === wort ? e.w : wort) : text)}</span>
        ${i ? `<button type="button" class="wm-ipa" data-wm-sag="${esc(text)}" title="anhören / послушать">[${esc(i)}] 🔊</button>` : `<button type="button" class="wm-ipa" data-wm-sag="${esc(text)}" title="anhören">🔊</button>`}
        ${e && norm(e.w) !== wort ? `<small>← ${esc(e.w)}</small>` : ""}
      </div>
      ${inhalt}`;
    karte.querySelector(".wm-zu").onclick = () => { karte.hidden = true; };
    karte.querySelectorAll("[data-wm-sag]").forEach((b) => { b.onclick = (ev) => { ev.preventDefault(); sag(b.dataset.wmSag); }; });
    const m = karte.querySelector(".wm-merk");
    if (m) m.onclick = () => {
      merken(e ? e.w : wort, satz, !!e);
      m.classList.remove("wm-haupt"); m.classList.add("ok");
      m.textContent = e ? "✓ In „Meine Wörter“" : "✓ Vorgemerkt";
    };
    sag(text);
  }

  // ---------- Karte für deutsche Fachwörter / карточка немецкого термина ----------
  function karteFertig(lang, sagText) {
    karte.querySelector(".wm-zu").onclick = () => { karte.hidden = true; };
    karte.querySelectorAll("[data-wm-sag]").forEach((b) => { b.onclick = (ev) => { ev.preventDefault(); sag(b.dataset.wmSag, b.dataset.wmLang || lang); }; });
    sag(sagText, lang);
  }
  function zeigenDE(d, text) {
    const key = ohneArt(d.w).split(" ").pop();
    const von = encodeURIComponent(location.pathname + location.search);
    karte.innerHTML = `
      <button type="button" class="wm-zu" title="schließen (Esc)">✕</button>
      <div class="wm-kopf"><span class="wm-wort">${esc(d.w)}</span>
        <button type="button" class="wm-ipa" data-wm-sag="${esc(d.sag || d.w)}" data-wm-lang="de" title="anhören – deutsche Stimme">${esc(d.aus || "")} 🔊</button>
        ${ohneArt(text) !== ohneArt(d.w) ? `<small>← ${esc(text)}</small>` : ""}
      </div>
      <div class="wm-bed">${esc(d.ru)}</div>
      <div><small>🇩🇪 ${esc(d.de)}</small></div>
      <div style="margin-top:4px"><b>Herkunft:</b> ${esc(d.her)}</div>
      ${d.en ? `<div><b>Englisch:</b> ${esc(d.en)}</div>` : ""}
      ${d.tip ? `<div class="wm-tip">💡 ${esc(d.tip)}</div>` : ""}
      ${(d.bsp || []).slice(0, 1).map((b) => `<div style="margin-top:4px">„${esc(b[0])}“ – <i>${esc(b[1])}</i></div>`).join("")}
      <div class="wm-knoepfe">
        <a class="wm-haupt" href="${GLOSSAR_DE_SEITE}#w=${encodeURIComponent(key)}&von=${von}" target="quantura_glossar_de">🇩🇪 Im Glossar Deutsch ↗</a>
        ${d.gr ? `<a href="${GRAMMATIK}#${encodeURIComponent(d.gr)}" target="quantura_grammatik">📐 Regel ↗</a>` : ""}
      </div>`;
    karteFertig("de", d.sag || d.w);
  }
  function zeigenUnbekanntDE(text, satz) {
    const istGemerkt = gemerkt(text);
    karte.innerHTML = `
      <button type="button" class="wm-zu" title="schließen (Esc)">✕</button>
      <div class="wm-kopf"><span class="wm-wort">${esc(text)}</span>
        <button type="button" class="wm-ipa" data-wm-sag="${esc(text)}" data-wm-lang="de" title="deutsche Stimme">🔊 DE</button>
        <button type="button" class="wm-ipa" data-wm-sag="${esc(text)}" data-wm-lang="en" title="englische Stimme">🔊 EN</button>
      </div>
      <div class="wm-fehlt">📭 <b>Noch nicht im Glossar Deutsch.</b> Vormerken – dann trägt Claude den Begriff mit Artikel, Bedeutung, Herkunft und Aussprache ein.<br>
        <small>Ещё нет в немецком глоссарии. «Vormerken» – и потом в чате: «в немецкий глоссарий».</small></div>
      <div class="wm-knoepfe">
        <button type="button" class="wm-merk ${istGemerkt ? "ok" : "wm-haupt"}">${istGemerkt ? "✓ Vorgemerkt" : "📥 Vormerken"}</button>
        <a href="https://translate.google.com/?sl=de&tl=ru&text=${encodeURIComponent(text)}&op=translate" target="quantura_google" rel="noopener">Google Übersetzer ↗</a>
        <a href="${GLOSSAR_DE_SEITE}" target="quantura_glossar_de">🇩🇪 Glossar Deutsch ↗</a>
      </div>`;
    const m = karte.querySelector(".wm-merk");
    m.onclick = () => { merken(text, satz, false, "de"); m.classList.remove("wm-haupt"); m.classList.add("ok"); m.textContent = "✓ Vorgemerkt"; };
    karteFertig("de", text);
  }

  // ============================================================
  // 2026-11-18: Schnelleingabe – Wort eintippen, Glossar wählen (Deutsch / Englisch), ins Glossar
  // RU: быстрый ввод – написать слово, выбрать глоссарий (немецкий / английский) и занести.
  // Auf jeder Seite: ein Knopf mit dem Attribut  data-glossar-schnell  öffnet die Karte.
  //   data-glossar-feld="slEingabe"  → das markierte Wort aus diesem Textfeld wird übernommen.
  // ============================================================
  let schnellSprache = null;
  function schnell(vorgabe, satz) {
    knopf.style.display = "none";
    laden();
    karteHer();
    if (!schnellSprache) schnellSprache = (document.body && document.body.getAttribute("data-wm-sprache")) === "de" ? "de" : "en";
    const LS = (l) => (l === "de" ? "🇩🇪 Glossar Deutsch" : "🇬🇧 Glossar Englisch");
    karte.innerHTML = `
      <button type="button" class="wm-zu" title="schließen (Esc)">✕</button>
      <div class="wm-kopf"><span class="wm-wort">📖 Ins Glossar</span><small>занести слово в глоссарий</small></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0" role="radiogroup" aria-label="Welches Glossar?">
        <button type="button" class="wm-spr" data-l="de">🇩🇪 Deutsch</button>
        <button type="button" class="wm-spr" data-l="en">🇬🇧 Englisch</button>
      </div>
      <input type="text" class="wm-feld" placeholder="das Wort, z. B. die Deklination" autocomplete="off" autocapitalize="off" spellcheck="false"
        style="width:100%;box-sizing:border-box;font:600 18px system-ui,sans-serif;padding:8px 10px;border-radius:10px;border:1px solid rgba(127,127,127,.6);background:transparent;color:inherit" />
      <div class="wm-msg" style="min-height:1.4em;margin-top:6px;font-size:14px"></div>
      <div class="wm-knoepfe">
        <button type="button" class="wm-haupt wm-los">📥 Ins Glossar</button>
        <button type="button" class="wm-hoer">🔊 Anhören</button>
        <a class="wm-oeffnen" target="quantura_glossar">Glossar öffnen ↗</a>
      </div>
      <div style="margin-top:6px"><small>Enter = ins Glossar. Steht das Wort schon drin, siehst du sofort die Erklärung. Sonst wird es vorgemerkt – потом в чате: «в глоссарий».</small></div>`;
    const feld = karte.querySelector(".wm-feld");
    const msg = karte.querySelector(".wm-msg");
    const auf = karte.querySelector(".wm-oeffnen");
    function sprSetzen(l) {
      schnellSprache = l;
      karte.querySelectorAll(".wm-spr").forEach((b) => {
        const an = b.dataset.l === l;
        b.style.cssText = `font:600 15px system-ui,sans-serif;cursor:pointer;border-radius:999px;padding:7px 16px;border:2px solid ${an ? "#1f6feb" : "rgba(127,127,127,.45)"};background:${an ? "#1f6feb" : "transparent"};color:${an ? "#fff" : "inherit"}`;
        b.setAttribute("aria-checked", an ? "true" : "false");
      });
      feld.placeholder = l === "de" ? "das Wort, z. B. die Deklination" : "the word, z. B. retired";
      auf.href = l === "de" ? GLOSSAR_DE_SEITE : GLOSSAR;
      auf.target = l === "de" ? "quantura_glossar_de" : "quantura_glossar";
      auf.textContent = (l === "de" ? "🇩🇪" : "🇬🇧") + " Glossar öffnen ↗";
      msg.textContent = "";
    }
    karte.querySelectorAll(".wm-spr").forEach((b) => { b.onclick = () => { sprSetzen(b.dataset.l); feld.focus(); }; });
    karte.querySelector(".wm-zu").onclick = () => { karte.hidden = true; };
    karte.querySelector(".wm-hoer").onclick = () => { const w = feld.value.trim(); if (w) sag(w, schnellSprache); };
    async function los() {
      const w = feld.value.replace(/\s+/g, " ").trim();
      if (!w) { msg.textContent = "Bitte ein Wort eingeben / введи слово"; feld.focus(); return; }
      await laden();
      idx = null; idxDE = null;
      const l = schnellSprache;
      const da = l === "de" ? findenDE(w) : finden(w);
      if (da) { zeigen(w, satz || "", null, l); return; } // steht schon drin → Erklärung zeigen
      if (gemerkt(w)) { msg.innerHTML = `✓ <b>${esc(w)}</b> ist schon vorgemerkt (${LS(l)}) / уже в списке ожидания`; return; }
      merken(w, satz || "", false, l);
      msg.innerHTML = `✓ <b>${esc(w)}</b> vorgemerkt im ${LS(l)} – 📭 wartet auf Erklärung. <small>Скажи в чате «в глоссарий».</small>`;
      sag(w, l);
      feld.select();
    }
    karte.querySelector(".wm-los").onclick = los;
    feld.addEventListener("keydown", (ev) => { if (ev.key === "Enter") { ev.preventDefault(); los(); } });
    sprSetzen(schnellSprache);
    if (vorgabe) {
      feld.value = vorgabe;
      // Sprache raten: Umlaut → Deutsch / угадать язык
      if (/[äöüÄÖÜß]/.test(vorgabe)) sprSetzen("de");
    }
    setTimeout(() => { feld.focus(); feld.select(); }, 30);
  }
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest && ev.target.closest("[data-glossar-schnell]");
    if (!b) return;
    ev.preventDefault();
    let vorgabe = "", satz = "";
    const f = b.getAttribute("data-glossar-feld") && document.getElementById(b.getAttribute("data-glossar-feld"));
    if (f && typeof f.value === "string") {
      satz = f.value.replace(/\s+/g, " ").trim().slice(0, 200);
      if (f.selectionEnd > f.selectionStart) vorgabe = f.value.slice(f.selectionStart, f.selectionEnd);
    }
    if (!vorgabe) { const s = window.getSelection && String(window.getSelection()).trim(); if (s && s.length <= 40) vorgabe = s; }
    schnell(vorgabe.replace(/^[^A-Za-zÄÖÜäöüß]+|[^A-Za-zÄÖÜäöüß]+$/g, ""), satz);
  });
  window.WortMarkierer = { zeigen: (text, lang) => zeigen(text, "", null, lang), schnell };
})();
