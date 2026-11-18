// =============================================================
// eigene_woerter.js – gemeinsame Bausteine für „eigenes Wort eingeben“
// (Satzlabor Deutsch + Satzlabor English)
// -------------------------------------------------------------
// Version 1 (2026-11-18)
//  - Wiktionary-Abfrage (de.wiktionary.org, auch für englische Wörter)
//  - Eingabe-Box unter einem Auswahlfeld (prüfen → übernehmen)
//  - „Meine Wörter“ im Browser speichern (localStorage, pro Gerät)
//  - „📋 für die Datenbank kopieren“ → im Chat an Claude schicken
// =============================================================

(() => {
  "use strict";
  const arr = (x) => (Array.isArray(x) ? x : []);

  // ------------------------------------------------------------
  // CSS einmal einfügen
  // ------------------------------------------------------------
  const CSS = `
  .ew-box{margin:.35rem 0 .2rem;padding:.55rem .65rem;border:1px dashed var(--accent,#4f46e5);border-radius:10px;background:var(--card-bg,rgba(79,70,229,.04));font-size:.9rem}
  .ew-box[hidden]{display:none}
  .ew-titel{font-weight:600;margin-bottom:.3rem}
  .ew-zeile{display:flex;gap:.4rem;flex-wrap:wrap;align-items:center}
  .ew-zeile input[type=text]{flex:1 1 12rem;min-width:9rem;padding:.35rem .5rem;border-radius:8px;border:1px solid #9ca3af;font-size:1rem}
  .ew-box button{padding:.3rem .65rem;border-radius:8px;border:1px solid #9ca3af;background:transparent;color:inherit;cursor:pointer;font-size:.9rem}
  .ew-box button:disabled{opacity:.45;cursor:default}
  .ew-ok{background:#16a34a!important;color:#fff!important;border-color:#16a34a!important}
  .ew-wahl button.ew-an{background:var(--accent,#4f46e5);color:#fff;border-color:var(--accent,#4f46e5)}
  .ew-erg{margin:.35rem 0;line-height:1.45}
  .ew-gruen{color:#15803d;font-weight:600}
  .ew-rot{color:#b91c1c;font-weight:600}
  .ew-warn{color:#b45309}
  .ew-klein{opacity:.8;font-size:.85rem}
  .ew-formen{margin:.25rem 0;padding:.3rem .5rem;border-radius:6px;background:rgba(127,127,127,.1)}
  .ew-vorschlag button{margin:0 .2rem .2rem 0}
  .ew-meine{margin-top:.4rem;display:flex;flex-wrap:wrap;gap:.3rem;align-items:center}
  .ew-chip{display:inline-flex;align-items:center;gap:.2rem;padding:.1rem .45rem;border-radius:999px;background:rgba(79,70,229,.12);font-size:.85rem}
  .ew-chip button{border:none!important;padding:0 .15rem!important;font-size:.95rem}
  .ew-chip-q{background:rgba(245,158,11,.2)}
  input.ew-falsch{border-color:#dc2626!important;background:rgba(220,38,38,.06)}
  input.ew-richtig{border-color:#16a34a!important}
  .ew-wortart{margin:.3rem 0;padding:.3rem .55rem;border-left:4px solid #bf8700;border-radius:6px;background:rgba(191,135,0,.09)}
  .ew-wortart b{font-size:1.02rem}
  .ew-wortart a{margin-left:.35rem;text-decoration:none}
  .ew-wa{opacity:.75;font-size:.78rem}
  .ew-umzug{margin:.3rem 0;padding:.35rem .55rem;border-left:4px solid #d97706;border-radius:6px;background:rgba(245,158,11,.12)}
  `;
  function css() {
    if (document.getElementById("ew-css")) return;
    const s = document.createElement("style");
    s.id = "ew-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function el(tag, attrs, text) {
    const e = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => e.setAttribute(k, v));
    if (text != null) e.textContent = text;
    return e;
  }

  // ------------------------------------------------------------
  // Speichern
  // ------------------------------------------------------------
  function laden(key) {
    try {
      const o = JSON.parse(localStorage.getItem(key) || "{}");
      return o && typeof o === "object" ? o : {};
    } catch (e) {
      return {};
    }
  }
  function speichern(key, o) {
    try { localStorage.setItem(key, JSON.stringify(o)); } catch (e) { /* privat-Modus */ }
  }

  // ------------------------------------------------------------
  // Wiktionary (de.wiktionary.org – hat deutsche UND englische Wörter)
  // ------------------------------------------------------------
  const API = "https://de.wiktionary.org/w/api.php?format=json&formatversion=2&origin=*";
  async function holen(url) {
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const t = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;
    try {
      const r = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } finally {
      if (t) clearTimeout(t);
    }
  }
  // titel → Wikitext (fehlende Seiten fehlen im Ergebnis); wirft bei Netzfehler
  async function seiten(titel) {
    const j = await holen(API + "&action=query&prop=revisions&rvprop=content&rvslots=main&titles=" + encodeURIComponent(titel.join("|")));
    const aus = {};
    arr(j.query && j.query.pages).forEach((p) => {
      if (p.missing || !p.revisions) return;
      const rev = p.revisions[0];
      aus[p.title] = (rev.slots && rev.slots.main && rev.slots.main.content) || rev.content || "";
    });
    return aus;
  }
  // Abschnitt einer Sprache: „Deutsch“ oder „Englisch“
  function sektion(text, sprache) {
    if (!text) return "";
    const start = text.indexOf("({{Sprache|" + sprache + "}})");
    if (start < 0) return "";
    let s = text.slice(start);
    const ende = s.indexOf("({{Sprache|", 20);
    return ende > 0 ? s.slice(0, ende) : s;
  }
  // alle Wortarten des Abschnitts (Verb, Substantiv, Adjektiv, Adverb …)
  function wortarten(sec) {
    return [...new Set([...String(sec).matchAll(/\{\{Wortart\|([^|}]+)\|/g)].map((m) => m[1].trim()))];
  }
  // Feld aus einer Übersichts-Vorlage: |Präteritum_ich=ging
  function feld(sec, name) {
    const n = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const m = String(sec).match(new RegExp("\\|\\s*" + n + "\\s*=([^\\n|}]*)"));
    const v = m ? m[1].trim() : "";
    return v && v !== "—" && v !== "-" ? v : "";
  }
  // erste Bedeutung (für englische Wörter: die deutsche Erklärung)
  function bedeutung(sec) {
    const i = String(sec).indexOf("{{Bedeutungen}}");
    if (i < 0) return "";
    const m = sec.slice(i).match(/\n:\s*\[1[^\]]*\]\s*([^\n]+)/);
    if (!m) return "";
    return m[1]
      .replace(/\{\{[^{}|]*\|([^{}|]*)\}\}/g, "$1")
      .replace(/\{\{[^{}]*\}\}/g, "")
      .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1")
      .replace(/''+/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .replace(/\([^)]*\)/g, "")
      .split(/[;,]/)[0]
      .replace(/\s+/g, " ")
      .replace(/^[\s,;:]+|[\s,;:]+$/g, "")
      .replace(/^(.{40}\S*).*$/, "$1 …");
  }

  // Tippfehler-Vorschläge („Meinten Sie …?“)
  function abstand(a, b) {
    a = a.toLowerCase(); b = b.toLowerCase();
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  async function vorschlaege(wort, lokaleWoerter) {
    const kand = new Set(arr(lokaleWoerter));
    try {
      const basis = API + "&action=query&list=search&srnamespace=0&srlimit=10&srprop=&srinfo=suggestion&srsearch=";
      const [a, b] = await Promise.all([holen(basis + encodeURIComponent(wort)), holen(basis + encodeURIComponent("intitle:" + wort + "~"))]);
      [a, b].forEach((j) => {
        const q = (j && j.query) || {};
        arr(q.search).forEach((x) => kand.add(x.title));
        if (q.searchinfo && q.searchinfo.suggestion) kand.add(q.searchinfo.suggestion);
      });
    } catch (e) { /* ohne Internet nur lokale Wörter */ }
    const grenze = wort.length <= 4 ? 1 : wort.length <= 8 ? 2 : 3;
    return [...kand]
      .filter((w) => w && w !== wort && !/\s/.test(w))
      .filter((w) => (w.charAt(0) === w.charAt(0).toUpperCase()) === (wort.charAt(0) === wort.charAt(0).toUpperCase()))
      .map((w) => [w, abstand(w, wort)])
      .filter(([, d]) => d <= grenze)
      .sort((x, y) => x[1] - y[1])
      .slice(0, 5)
      .map(([w]) => w);
  }

  // ------------------------------------------------------------
  // Auswahlfeld vorbereiten: „✏️ eigenes Wort eingeben …“ + Gruppe „Meine Wörter“
  // Die ✏️-Option hat value="" → das Programm liest sie wie „nichts gewählt“.
  // ------------------------------------------------------------
  function istEw(sel) {
    const o = sel.selectedOptions && sel.selectedOptions[0];
    return !!(o && o.dataset.ew === "1");
  }
  function vorbereiten(sel, text, istMeins) {
    if (!sel) return null;
    let ew = sel.querySelector('option[data-ew="1"]');
    if (!ew) {
      ew = el("option", { value: "", "data-ew": "1" }, text);
      const erste = sel.options[0];
      if (erste && erste.value === "" && erste.parentElement === sel) erste.after(ew);
      else sel.prepend(ew);
    }
    let gm = sel.querySelector('optgroup[data-ew="1"]');
    if (!gm) {
      gm = el("optgroup", { label: "Meine Wörter", "data-ew": "1" });
      ew.after(gm);
    }
    // eigene Wörter aus den anderen Gruppen hierher holen
    [...sel.querySelectorAll("option")].forEach((o) => {
      if (o.parentElement !== gm && o !== ew && istMeins(o)) gm.appendChild(o);
    });
    gm.hidden = !gm.children.length;
    gm.style.display = gm.children.length ? "" : "none";
    return gm;
  }
  function inGruppe(sel, value, text) {
    const gm = sel.querySelector('optgroup[data-ew="1"]');
    if (!gm) return;
    let o = [...sel.options].find((x) => x.value === value && x.dataset.ew !== "1");
    if (!o) o = el("option", { value });
    o.textContent = text;
    if (o.parentElement !== gm) gm.appendChild(o);
    gm.hidden = false;
    gm.style.display = "";
  }
  function ausGruppe(sel, value) {
    const gm = sel.querySelector('optgroup[data-ew="1"]');
    if (!gm) return;
    [...gm.children].forEach((o) => { if (o.value === value) o.remove(); });
    if (!gm.children.length) { gm.hidden = true; gm.style.display = "none"; }
  }

  // ------------------------------------------------------------
  // 2026-11-18: die Wortart sofort anzeigen (das Adverb, das Verb …)
  // und prüfen, ob das Wort zum Feld (Satzglied) passt
  // Regel: /pages/language_lab/grammatik/index.html#de-wortart-satzglied
  // ------------------------------------------------------------
  const REGEL_WA = "/pages/language_lab/grammatik/index.html#de-wortart-satzglied";
  const escWa = (x) => String(x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const WA_NAMEN = [
    [/^(Substantiv|Eigenname|Toponym|Vorname|Nachname)$/, "das Nomen", "существительное"],
    [/^(Verb|Hilfsverb|Modalverb)$/, "das Verb", "глагол"],
    [/^Adjektiv$/, "das Adjektiv", "прилагательное"],
    [/^Lokaladverb$/, "das Adverb (des Ortes)", "наречие места"],
    [/^Temporaladverb$/, "das Adverb (der Zeit)", "наречие времени"],
    [/^Modaladverb$/, "das Adverb (der Art und Weise)", "наречие образа действия"],
    [/adverb$/i, "das Adverb", "наречие"],
    [/^Präposition$/, "die Präposition", "предлог"],
    [/^(Konjunktion|Subjunktion)$/, "die Konjunktion", "союз"],
    [/pronomen$/i, "das Pronomen", "местоимение"],
    [/artikel$/i, "der Artikel", "артикль"],
    [/^Partizip/, "das Partizip", "причастие"],
    [/^(Kardinalzahl|Ordinalzahl|Numerale)$/, "das Zahlwort", "числительное"],
    [/partikel$/i, "die Partikel", "частица"],
    [/^Interjektion$/, "die Interjektion", "междометие"],
  ];
  const ORT_ADV = /^(hier|dort|da|irgendwo|überall|nirgends|nirgendwo|oben|unten|draußen|drinnen|außen|innen|links|rechts|vorn|vorne|hinten|hierher|dorthin|daheim|weg|fort|nebenan|woanders|anderswo|hinein|heraus|herein|hinaus|hinauf|herunter|zurück)$/i;
  const ZEIT_ADV = /^(heute|gestern|vorgestern|übermorgen|morgens|abends|mittags|nachts|vormittags|nachmittags|jetzt|nun|bald|später|früher|damals|sofort|gleich|schon|noch|immer|nie|niemals|oft|öfter|manchmal|selten|täglich|wöchentlich|monatlich|jährlich|stets|meistens|irgendwann|neulich|vorhin|zuerst|dann|danach|endlich|montags|dienstags|mittwochs|donnerstags|freitags|samstags|sonntags|wochentags)$/i;
  // Wiktionary-Wortarten → Namen mit Artikel (das Spezielle zuerst: Lokaladverb statt Adverb)
  function wortartNamen(waListe) {
    const aus = [];
    const l = arr(waListe).filter((w) => !/^(Konjugierte Form|Deklinierte Form|Komparativ|Superlativ|Erweiterter Infinitiv|Abkürzung|Wortverbindung|Redewendung|Sprichwort|Affix|Suffix|Präfix)$/.test(w));
    const speziell = l.some((w) => /^(Lokal|Temporal|Modal|Kausal|Pronominal)adverb$/.test(w));
    l.forEach((w) => {
      if (speziell && w === "Adverb") return;
      const t = WA_NAMEN.find((x) => x[0].test(w));
      const n = t ? { name: t[1], ru: t[2] } : { name: w, ru: "" };
      if (!aus.some((a) => a.name === n.name)) aus.push(n);
    });
    return aus;
  }
  // Welche Frage passt zum Wort? „ort“ (Wo?), „zeit“ (Wann?), „art“ (Wie?), „verb“, „nomen“ oder null
  function wortKategorie(wort, waListe) {
    const w = String(wort || "").toLowerCase();
    const l = arr(waListe);
    const adv = l.some((x) => /adverb$/i.test(x));
    if (l.includes("Lokaladverb") || ORT_ADV.test(w)) return "ort";
    if (l.includes("Temporaladverb") || ZEIT_ADV.test(w)) return "zeit";
    if (l.includes("Modaladverb")) return "art";
    if (l.includes("Adjektiv") && !adv) return "art";
    if (l.some((x) => /^(Verb|Hilfsverb|Modalverb)$/.test(x)) && !adv && !l.includes("Adjektiv")) return "verb";
    if (l.some((x) => /^(Substantiv|Eigenname|Toponym)$/.test(x)) && !adv && !l.includes("Adjektiv")) return "nomen";
    return null;
  }
  // Schild: „📗 „irgendwo“ – die Wortart: das Adverb (des Ortes) · наречие места ❓“
  function wortartHtml(wort, waListe) {
    const n = wortartNamen(waListe);
    if (!n.length) return "";
    return `<div class="ew-wortart">📗 „${escWa(wort)}“ – die Wortart: ` +
      n.map((x) => `<b>${escWa(x.name)}</b>${x.ru ? " · " + escWa(x.ru) : ""}`).join(" / ") +
      ` <a href="${REGEL_WA}" target="_blank" rel="noopener" title="die Wortart und das Satzglied – открыть правило">❓</a></div>`;
  }
  // Wortgruppe (mit dem Auto): jedes Wort mit seiner Wortart
  function wortartGruppeHtml(teile) {
    const z = teile.filter((t) => t.namen && t.namen.length).map((t) => `${escWa(t.wort)} = <b>${escWa(t.namen[0].name)}</b>`);
    if (!z.length) return "";
    return `<div class="ew-wortart">📗 die Wortarten: ${z.join(" · ")} <a href="${REGEL_WA}" target="_blank" rel="noopener" title="открыть правило">❓</a></div>`;
  }
  // Kurzname für die Chips „Meine Wörter“
  function wortartKurz(waListe) {
    const n = wortartNamen(waListe);
    return n.length ? n[0].name : "";
  }

  // ------------------------------------------------------------
  // Eingabe-Box
  // opts = {
  //   sel, titel, placeholder, hinweis,
  //   wahl: [{key,label}] (optional, Pflicht-Auswahl, z. B. Wann?/Wie oft?),
  //   pruefen: async (text, wahlKey) => { fehler? | ok, geprueft, offline, text, html, eintrag, vorschlaege, wahlVorschlag },
  //   onFertig: (eintrag, ungeprueft, wahlKey) => void,
  //   meine: () => [{label, q, del: () => void}],  kopierText: () => string
  // }
  // ------------------------------------------------------------
  function box(opts) {
    css();
    const sel = opts.sel;
    const b = el("div", { class: "ew-box", hidden: "" });
    const titel = el("div", { class: "ew-titel" }, opts.titel);
    const zeile = el("div", { class: "ew-zeile" });
    const inp = el("input", { type: "text", placeholder: opts.placeholder || "", autocomplete: "off", spellcheck: "true", lang: opts.lang || "de" });
    const such = el("button", { type: "button" }, "🔍 prüfen");
    const ab = el("button", { type: "button", title: "abbrechen" }, "✖");
    zeile.append(inp, such, ab);
    const wahlZeile = el("div", { class: "ew-zeile ew-wahl" });
    const wahlKn = {};
    let wahlKey = null;
    if (opts.wahl) {
      wahlZeile.appendChild(el("span", { class: "ew-klein" }, opts.wahlText || ""));
      opts.wahl.forEach((w) => {
        const k = el("button", { type: "button" }, w.label);
        k.addEventListener("click", () => setzeWahl(w.key));
        wahlKn[w.key] = k;
        wahlZeile.appendChild(k);
      });
    } else wahlZeile.hidden = true;
    const erg = el("div", { class: "ew-erg" });
    const knZeile = el("div", { class: "ew-zeile" });
    const ok = el("button", { type: "button", class: "ew-ok", disabled: "" }, "✔ übernehmen");
    const trotzdem = el("button", { type: "button", hidden: "", title: "Nur wenn Sie sicher sind, dass das Wort richtig geschrieben ist" }, "trotzdem übernehmen (?)");
    knZeile.append(ok, trotzdem);
    const meine = el("div", { class: "ew-meine" });
    b.append(titel, zeile, wahlZeile, erg, knZeile, meine);
    sel.insertAdjacentElement("afterend", b);

    let aktuell = null;
    let vorher = sel.value;

    function setzeWahl(k) {
      wahlKey = k;
      Object.entries(wahlKn).forEach(([kk, btn]) => btn.classList.toggle("ew-an", kk === k));
      knoepfe();
    }
    function knoepfe() {
      const brauchtWahl = !!opts.wahl && !wahlKey;
      ok.disabled = !(aktuell && aktuell.eintrag && aktuell.geprueft) || brauchtWahl;
      trotzdem.hidden = !(aktuell && aktuell.eintrag && !aktuell.geprueft);
      trotzdem.disabled = brauchtWahl;
    }
    function zeigeMeine() {
      meine.innerHTML = "";
      const l = opts.meine ? opts.meine() : [];
      if (!l.length) return;
      meine.appendChild(el("span", { class: "ew-klein" }, "Meine Wörter:"));
      const kop = el("button", { type: "button", title: "Liste kopieren und im Chat an Claude schicken" }, "📋 für die Datenbank kopieren");
      kop.addEventListener("click", kopieren);
      meine.appendChild(kop);
      l.forEach((x) => {
        const c = el("span", { class: "ew-chip" + (x.q ? " ew-chip-q" : "") }, x.label + (x.q ? " ?" : ""));
        if (x.wa) c.appendChild(el("span", { class: "ew-wa" }, " · " + x.wa));
        if (x.q) c.title = "nicht im Wörterbuch gefunden – Rechtschreibung nicht geprüft";
        const del = el("button", { type: "button", title: "aus „Meine Wörter“ löschen (zweimal klicken)" }, "×");
        let einmal = false;
        del.addEventListener("click", () => {
          if (!einmal) { einmal = true; erg.textContent = `Zum Löschen von „${x.label}“ noch einmal auf × klicken.`; return; }
          x.del();
          zeigeMeine();
          erg.textContent = `„${x.label}“ gelöscht.`;
        });
        c.appendChild(del);
        meine.appendChild(c);
      });
    }
    function kopieren() {
      const text = opts.kopierText ? opts.kopierText() : "";
      const fertig = () => { erg.textContent = "✓ Kopiert. Jetzt im Chat mit Claude einfügen (Strg+V bzw. lange drücken → Einsetzen)."; };
      const zeigen = () => {
        erg.innerHTML = "";
        erg.appendChild(el("div", { class: "ew-klein" }, "Bitte markieren und kopieren:"));
        const ta = el("textarea", { rows: "3", style: "width:100%" });
        ta.value = text;
        erg.appendChild(ta);
        ta.select();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(fertig, zeigen);
      else zeigen();
    }

    // 2026-11-18: Wort passt besser in ein anderes Feld → Hinweis + Knopf
    function zeigeUmzug(r) {
      if (!r || !r.umzug) return;
      const u = el("div", { class: "ew-umzug" }, "⚠ " + r.umzug.text + " ");
      if (r.umzug.klick) {
        const k = el("button", { type: "button" }, r.umzug.knopf || "→ dorthin");
        k.addEventListener("click", () => { schliessen(); r.umzug.klick(); });
        u.appendChild(k);
      }
      erg.appendChild(u);
    }
    async function suchen() {
      const wert = inp.value.trim().replace(/\s+/g, " ");
      if (!wert) { inp.focus(); return; }
      erg.textContent = "⏳ prüfe …";
      aktuell = null;
      knoepfe();
      such.disabled = true;
      let r;
      try { r = await opts.pruefen(wert, wahlKey); } catch (e) { r = { fehler: "Fehler beim Prüfen: " + e.message }; }
      such.disabled = false;
      erg.innerHTML = "";
      inp.classList.remove("ew-falsch", "ew-richtig");
      if (r.fehler) { erg.appendChild(el("div", { class: "ew-rot" }, "✖ " + r.fehler)); zeigeUmzug(r); return; }
      aktuell = r;
      if (r.text) inp.value = r.text;
      inp.classList.toggle("ew-richtig", !!r.geprueft);
      inp.classList.toggle("ew-falsch", !r.geprueft && !r.offline);
      if (r.geprueft) erg.appendChild(el("div", { class: "ew-gruen" }, "✓ richtig geschrieben – steht im Wörterbuch"));
      else if (r.offline) erg.appendChild(el("div", { class: "ew-warn" }, "⚠ Kein Internet – die Rechtschreibung konnte nicht geprüft werden. Bitte genau ansehen!"));
      else if (r.nichtGefunden !== false) erg.appendChild(el("div", { class: "ew-rot" }, `✖ „${r.text || wert}“ steht nicht im Wörterbuch – vielleicht ein Tippfehler?`));
      if (r.vorschlaege && r.vorschlaege.length) {
        const v = el("div", { class: "ew-vorschlag" });
        v.appendChild(el("span", {}, "Meinten Sie: "));
        r.vorschlaege.forEach((w) => {
          const k = el("button", { type: "button" }, w);
          k.addEventListener("click", () => { inp.value = w; suchen(); });
          v.appendChild(k);
        });
        erg.appendChild(v);
      }
      if (r.html) { const d = el("div"); d.innerHTML = r.html; erg.appendChild(d); }
      zeigeUmzug(r);
      if (r.eintrag && !r.geprueft) erg.appendChild(el("div", { class: "ew-klein" }, "Wenn das Wort wirklich richtig ist: „trotzdem übernehmen“ – es wird mit ? gespeichert, Claude prüft es später."));
      if (r.wahlVorschlag && opts.wahl && !wahlKey) setzeWahl(r.wahlVorschlag);
      knoepfe();
    }
    function uebernehmen(ungeprueft) {
      if (!aktuell || !aktuell.eintrag) return;
      if (opts.wahl && !wahlKey) { erg.appendChild(el("div", { class: "ew-warn" }, "Bitte zuerst oben wählen: " + opts.wahl.map((w) => w.label).join(" / "))); return; }
      const e = aktuell.eintrag;
      if (ungeprueft) e.ungeprueft = true;
      schliessen();
      opts.onFertig(e, !!ungeprueft, wahlKey);
      vorher = sel.value;
    }
    function oeffnen() {
      b.hidden = false;
      aktuell = null;
      inp.value = "";
      inp.classList.remove("ew-falsch", "ew-richtig");
      erg.textContent = opts.hinweis || "";
      if (opts.wahl) setzeWahl(null);
      knoepfe();
      zeigeMeine();
      setTimeout(() => inp.focus(), 30);
    }
    function schliessen() { b.hidden = true; }

    such.addEventListener("click", suchen);
    inp.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (aktuell && aktuell.eintrag && aktuell.geprueft && inp.value.trim() === (aktuell.text || "")) uebernehmen(false);
      else suchen();
    });
    inp.addEventListener("input", () => { inp.classList.remove("ew-falsch", "ew-richtig"); if (aktuell) { aktuell = null; knoepfe(); } });
    ok.addEventListener("click", () => uebernehmen(false));
    trotzdem.addEventListener("click", () => uebernehmen(true));
    ab.addEventListener("click", () => {
      schliessen();
      // zurück zur vorherigen Auswahl
      const o = [...sel.options].find((x) => x.value === vorher && x.dataset.ew !== "1");
      if (o) o.selected = true; else sel.selectedIndex = 0;
      sel.dispatchEvent(new Event("change"));
    });
    sel.addEventListener("change", () => {
      if (istEw(sel)) oeffnen();
      else { schliessen(); vorher = sel.value; }
    });
    return { oeffnen, schliessen, zeigeMeine };
  }

  window.EIGENE_WOERTER = { wortartNamen, wortKategorie, wortartHtml, wortartGruppeHtml, wortartKurz, laden, speichern, seiten, sektion, wortarten, feld, bedeutung, vorschlaege, vorbereiten, inGruppe, ausGruppe, box, istEw, el };
})();
