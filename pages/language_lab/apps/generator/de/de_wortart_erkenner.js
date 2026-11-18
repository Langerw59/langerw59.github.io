// =============================================================
// de_wortart_erkenner.js – der Wortart-Erkenner (Satzlabor Deutsch)
// Ein Wort eingeben → welche Wortart ist es? (das Verb, das Adjektiv,
// das Adverb, das Nomen …) – mit Erklärung und Knopf „→ in die Liste“,
// der das Wort gleich in das richtige Feld des Satzlabors bringt.
// RU: определитель части речи: ввёл слово → узнал часть речи → занёс в нужный список
// -------------------------------------------------------------
// Version 1 (2026-11-18) · Quelle: de.wiktionary.org
// Regel dazu: /pages/language_lab/grammatik/index.html#de-wortarten
// =============================================================

(() => {
  "use strict";
  const EW = window.EIGENE_WOERTER;
  if (!EW) return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const klein = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  const gross = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const REGEL = "/pages/language_lab/grammatik/index.html#de-wortarten";

  // Wiktionary-Wortart → unsere Bezeichnung (immer mit Artikel)
  const ARTEN = [
    { re: /^Substantiv$|^Eigenname$|^Toponym$|^Vorname$|^Nachname$/, key: "nomen", name: "das Nomen (das Substantiv)", ru: "существительное", farbe: "#1f6feb",
      frage: "Wer? Was?", text: "Ein Ding, eine Person, ein Begriff. Wird großgeschrieben und hat einen Artikel: der Garten, die Sonne, das Haus." },
    { re: /^Verb$|^Hilfsverb$|^Modalverb$/, key: "verb", name: "das Verb", ru: "глагол", farbe: "#d1242f",
      frage: "Was tut …?", text: "Eine Handlung oder ein Zustand. Wird konjugiert (ich gehe, du gehst) und hat Zeitformen (ging, gegangen)." },
    { re: /^Adjektiv$/, key: "adjektiv", name: "das Adjektiv", ru: "прилагательное", farbe: "#8250df",
      frage: "Wie ist …? Was für ein …?", text: "Beschreibt ein Nomen. Vor dem Nomen bekommt es eine Endung (wird dekliniert): das schnelle Auto, ein schneller Zug. Man kann es aber auch ohne Endung beim Verb benutzen: Er fährt schnell. – Die Wortart bleibt trotzdem das Adjektiv (adverbial gebraucht)." },
    { re: /adverb$/i, key: "adverb", name: "das Adverb", ru: "наречие", farbe: "#bf8700",
      frage: "Wann? Wo? Wie? Wie oft?", text: "Beschreibt das Verb oder den ganzen Satz (Zeit, Ort, Art). Ist unveränderlich – es bekommt NIE eine Endung: morgens, hier, gern, oft. Man kann nicht sagen: „das gerne Auto“." },
    { re: /^Präposition$/, key: "praeposition", name: "die Präposition", ru: "предлог", farbe: "#57606a",
      frage: "", text: "Steht vor einem Nomen und bestimmt den Fall (den Kasus): in den Garten (Akkusativ), im Garten (Dativ)." },
    { re: /^Konjunktion$|^Subjunktion$/, key: "konjunktion", name: "die Konjunktion", ru: "союз", farbe: "#57606a",
      frage: "", text: "Verbindet Wörter oder Sätze: und, aber, oder, weil, dass." },
    { re: /pronomen$/i, key: "pronomen", name: "das Pronomen", ru: "местоимение", farbe: "#1f6feb",
      frage: "", text: "Steht für ein Nomen: ich, du, er, mein, dieser." },
    { re: /artikel$/i, key: "artikel", name: "der Artikel", ru: "артикль", farbe: "#57606a",
      frage: "", text: "Begleitet das Nomen und zeigt das Genus und den Kasus: der, die, das, ein, eine." },
    { re: /^Partizip/, key: "partizip", name: "das Partizip", ru: "причастие", farbe: "#8250df",
      frage: "", text: "Eine Form des Verbs, die man wie ein Adjektiv benutzen kann: gegangen, gekocht (das Partizip II), lachend (das Partizip I)." },
    { re: /^(Kardinalzahl|Ordinalzahl|Numerale)$/, key: "zahlwort", name: "das Zahlwort (das Numerale)", ru: "числительное", farbe: "#57606a",
      frage: "Wie viel?", text: "Eine Zahl: zwei, zehn, der dritte." },
    { re: /^(Partikel|Gradpartikel|Fokuspartikel|Modalpartikel|Negationspartikel|Antwortpartikel)$/, key: "partikel", name: "die Partikel", ru: "частица", farbe: "#57606a",
      frage: "", text: "Ein kleines unveränderliches Wort, das den Satz färbt: doch, ja, mal, nur, nicht." },
    { re: /^Interjektion$/, key: "interjektion", name: "die Interjektion", ru: "междометие", farbe: "#57606a",
      frage: "", text: "Ein Ausruf: ach, oh, hallo." },
  ];
  const finde = (wa) => ARTEN.find((a) => a.re.test(wa)) || { key: "anders", name: wa, ru: "", farbe: "#57606a", frage: "", text: "" };

  // ------------------------------------------------------------
  // Ein Feld des Satzlabors öffnen und das Wort gleich prüfen
  // ------------------------------------------------------------
  function feldOeffnen(selId, wort, wahl) {
    const sel = $(selId);
    if (!sel) return;
    const ew = [...sel.options].find((o) => o.dataset.ew === "1");
    if (!ew) return;
    ew.selected = true;
    sel.dispatchEvent(new Event("change"));
    const box = sel.nextElementSibling;
    if (!box || !box.classList.contains("ew-box")) return;
    box.querySelector("input").value = wort;
    if (wahl) {
      const kn = [...box.querySelectorAll(".ew-wahl button")].find((b) => b.textContent === wahl);
      if (kn) kn.click();
    }
    box.querySelector("button").click(); // 🔍 prüfen
    sel.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function nomenOeffnen(wort) {
    const sel = $("sgAkkNomen");
    if (!sel || ![...sel.options].some((o) => o.value === "eigen")) return;
    if (sel.disabled) { sel.disabled = false; }
    sel.value = "eigen";
    sel.dispatchEvent(new Event("change"));
    const box = sel.nextElementSibling;
    if (!box || !box.classList.contains("en-box")) return;
    box.querySelector("input").value = wort;
    const k = box.querySelector(".en-btn");
    if (k) k.click();
    sel.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ------------------------------------------------------------
  // Erkennen
  // ------------------------------------------------------------
  async function erkennen(eingabe) {
    let w = String(eingabe || "").trim().replace(/\s+/g, " ").replace(/[.,!?;:]+$/, "");
    const art = w.match(/^(der|die|das)\s+(\S+)$/i);
    if (art) w = art[2];
    if (!w) return { fehler: "Bitte ein Wort eingeben." };
    if (/\s/.test(w)) return { fehler: "Bitte nur ein einzelnes Wort eingeben (ohne Artikel oder mit Artikel: der Garten)." };
    const titel = [...new Set([w, klein(w), gross(w)])];
    let s;
    try { s = await EW.seiten(titel); } catch (e) { return { fehler: "Kein Internet – das Wörterbuch (Wiktionary) ist nicht erreichbar." }; }
    const treffer = [];
    titel.forEach((t) => {
      const sec = EW.sektion(s[t], "Deutsch");
      if (!sec) return;
      EW.wortarten(sec).forEach((wa) => {
        // Formen wie „ging“ zeigen auf die Grundform
        if (/^(Konjugierte Form|Deklinierte Form|Komparativ|Superlativ|Erweiterter Infinitiv)$/.test(wa)) {
          const grund = (sec.match(/\{\{Grundformverweis[^|]*\|([^|}#]+)/) || [])[1];
          treffer.push({ wort: t, wa, form: true, grund: grund ? grund.trim() : "" });
        } else if (!/^(Abkürzung|Wortverbindung|Redewendung|Sprichwort|Affix|Suffix|Präfix)$/.test(wa)) {
          treffer.push({ wort: t, wa, info: finde(wa) });
        }
      });
    });
    if (!treffer.length) {
      const vor = await EW.vorschlaege(w, []);
      return { nichts: true, wort: w, vorschlaege: vor };
    }
    return { wort: w, treffer };
  }

  // ------------------------------------------------------------
  // Oberfläche
  // ------------------------------------------------------------
  function aufbauen() {
    const ziel = $("slModeBauen");
    if (!ziel) return;
    const css = document.createElement("style");
    css.textContent = `
      .we-box{margin:0 0 .8rem;border:1px solid rgba(127,127,127,.35);border-radius:12px;padding:.5rem .7rem}
      .we-box summary{cursor:pointer;font-weight:600}
      .we-zeile{display:flex;gap:.4rem;flex-wrap:wrap;margin:.45rem 0}
      .we-zeile input{flex:1 1 12rem;padding:.4rem .55rem;border-radius:8px;border:1px solid #9ca3af;font-size:1rem}
      .we-zeile button,.we-kn button{padding:.32rem .7rem;border-radius:8px;border:1px solid #9ca3af;background:transparent;color:inherit;cursor:pointer}
      .we-art{border-left:5px solid var(--c);padding:.35rem .6rem;margin:.4rem 0;border-radius:6px;background:rgba(127,127,127,.07)}
      .we-art b.we-name{color:var(--c);font-size:1.05rem}
      .we-kn{display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.35rem}
      .we-kn button{border-color:var(--c)}
      .we-klein{font-size:.85rem;opacity:.85}`;
    document.head.appendChild(css);
    const box = document.createElement("details");
    box.className = "we-box";
    box.innerHTML = `
      <summary>🔎 der Wortart-Erkenner – welche Wortart ist das? <small>определить часть речи и занести слово в нужный список</small></summary>
      <div class="we-zeile">
        <input type="text" id="weInput" placeholder="ein Wort, z. B. schnell, gern, morgens, schwimmen, der Garten" autocomplete="off" spellcheck="true" lang="de" />
        <button type="button" id="weBtn">🔎 erkennen</button>
      </div>
      <div id="weErg" class="we-klein">Ein deutsches Wort eingeben – das Programm sucht die Wortart im Wörterbuch (Wiktionary) und erklärt sie.
        <a href="${REGEL}" target="quantura_grammatik">📘 die Regel: die Wortarten · das Adjektiv oder das Adverb?</a></div>`;
    ziel.prepend(box);
    const inp = $("weInput");
    const erg = $("weErg");

    async function los() {
      erg.textContent = "⏳ suche …";
      const r = await erkennen(inp.value);
      erg.innerHTML = "";
      if (r.fehler) { erg.innerHTML = `<div style="color:#b91c1c;font-weight:600">✖ ${esc(r.fehler)}</div>`; return; }
      if (r.nichts) {
        erg.innerHTML = `<div style="color:#b91c1c;font-weight:600">✖ „${esc(r.wort)}“ steht nicht im Wörterbuch – vielleicht ein Tippfehler?</div>` +
          (r.vorschlaege.length ? `<div>Meinten Sie: ${r.vorschlaege.map((v) => `<button type="button" class="we-vor">${esc(v)}</button>`).join(" ")}</div>` : "");
        erg.querySelectorAll(".we-vor").forEach((b) => b.addEventListener("click", () => { inp.value = b.textContent; los(); }));
        return;
      }
      const mehr = new Set(r.treffer.filter((t) => !t.form).map((t) => t.info.key)).size > 1;
      if (mehr) erg.insertAdjacentHTML("beforeend", `<div class="we-klein">Dieses Wort kann mehrere Wortarten haben – je nachdem, wie man es im Satz benutzt:</div>`);
      r.treffer.forEach((t) => {
        const d = document.createElement("div");
        d.className = "we-art";
        if (t.form) {
          d.style.setProperty("--c", "#57606a");
          d.innerHTML = `<b>${esc(t.wort)}</b> ist eine gebeugte Form (${esc(t.wa)})` + (t.grund ? ` von <b>${esc(t.grund)}</b>.` : ".") +
            (t.grund ? ` <button type="button" class="we-grund">🔎 ${esc(t.grund)} erkennen</button>` : "");
          erg.appendChild(d);
          const gb = d.querySelector(".we-grund");
          if (gb) gb.addEventListener("click", () => { inp.value = t.grund; los(); });
          return;
        }
        const a = t.info;
        d.style.setProperty("--c", a.farbe);
        const wortMitArt = a.key === "nomen" ? t.wort : t.wort;
        d.innerHTML = `<b class="we-name">${esc(a.name)}</b>${a.ru ? ` <small>(${esc(a.ru)})</small>` : ""}${t.wa !== a.name && a.key !== "anders" ? ` <small class="we-klein">· Wiktionary: ${esc(t.wa)}</small>` : ""}` +
          `<div><b>${esc(wortMitArt)}</b>${a.frage ? ` – antwortet auf: <i>${esc(a.frage)}</i>` : ""}</div>` +
          (a.text ? `<div class="we-klein">${esc(a.text)}</div>` : "");
        const kn = document.createElement("div");
        kn.className = "we-kn";
        const knopf = (text, fn) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; b.addEventListener("click", fn); kn.appendChild(b); };
        if (a.key === "verb") knopf("→ in die Liste: das Verb (Was tut …?)", () => feldOeffnen("sgVerb", klein(t.wort)));
        if (a.key === "nomen") knopf("→ in die Liste: das Nomen (Wer? / Wen-Was?)", () => nomenOeffnen(t.wort));
        if (a.key === "adjektiv") {
          knopf("→ in die Liste: das Adjektiv", () => feldOeffnen("sgAkkAdj", klein(t.wort)));
          knopf("→ als Wie? (adverbial)", () => feldOeffnen("sgWie", klein(t.wort)));
        }
        if (a.key === "adverb") {
          knopf("→ Wann?", () => feldOeffnen("sgZeit", klein(t.wort), "Wann?"));
          knopf("→ Wie oft?", () => feldOeffnen("sgZeit", klein(t.wort), "Wie oft?"));
          knopf("→ Wie?", () => feldOeffnen("sgWie", klein(t.wort)));
          knopf("→ Wo? / Wohin?", () => feldOeffnen("sgOrt", klein(t.wort)));
        }
        if (kn.children.length) d.appendChild(kn);
        erg.appendChild(d);
      });
      erg.insertAdjacentHTML("beforeend", `<div class="we-klein"><a href="${REGEL}" target="quantura_grammatik">📘 die Regel: die Wortarten · das Adjektiv oder das Adverb?</a></div>`);
    }
    $("weBtn").addEventListener("click", los);
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); los(); } });
  }

  document.addEventListener("DOMContentLoaded", () => setTimeout(aufbauen, 0));
  window.DE_WORTART_ERKENNER = { erkennen };
})();
