// =============================================================
// de_eigene_nomen.js – Eigene Nomen + Artikel-Finder (der/die/das)
// EN: Own nouns + article finder
// RU: Свои существительные + поиск артикля
// -------------------------------------------------------------
// Version 1 (2026-11-18)
// Ablauf beim Suchen eines Artikels:
//   1. eigene Liste / Wörterbuch von Quantura (DE_NOUNS, DE_PERSONEN)
//   2. Wiktionary (de.wiktionary.org) – ganzes Wort, sonst das Grundwort
//      (bei Zusammensetzungen bestimmt das letzte Wort den Artikel)
//   3. ohne Internet: Grundwort im eigenen Wörterbuch, dann Endungs-Regeln
//   4. der Benutzer bestätigt oder ändert den Artikel → wird gespeichert
// Gespeichert wird im Browser (localStorage), pro Gerät.
// =============================================================

(() => {
  "use strict";

  const KEY = "quantura_de_eigene_nomen";
  const ART = { m: "der", f: "die", n: "das", pl: "die (Plural)" };
  const GENUS = { m: "Maskulinum (männlich)", f: "Femininum (weiblich)", n: "Neutrum (sächlich)", pl: "Plural (Mehrzahl)" };
  const arr = (x) => (Array.isArray(x) ? x : []);
  const g = (name) => window[name];
  const gross = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const klein = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);

  // ------------------------------------------------------------
  // Speichern / Laden
  // ------------------------------------------------------------
  function laden() {
    try {
      const l = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(l) ? l.filter((n) => n && n.lemma && ART[n.gender]) : [];
    } catch (e) {
      return [];
    }
  }
  function speichern(liste) {
    try { localStorage.setItem(KEY, JSON.stringify(liste)); } catch (e) { /* privat-Modus */ }
  }
  function hinzufuegen(n) {
    const l = laden().filter((x) => x.lemma !== n.lemma);
    l.push(n);
    l.sort((a, b) => a.lemma.localeCompare(b.lemma, "de"));
    speichern(l);
    inWoerterbuch(n);
  }
  function entfernen(lemma) {
    speichern(laden().filter((x) => x.lemma !== lemma));
  }

  // Eigene Wörter auch in die gemeinsamen Listen (für die Satzanalyse)
  function inWoerterbuch(n) {
    const nouns = g("DE_NOUNS");
    if (Array.isArray(nouns)) {
      const alt = nouns.find((x) => x.lemma === n.lemma);
      if (alt) { if (alt.eigen) { alt.gender = n.gender; alt.article = ART[n.gender]; } }
      else nouns.push({ lemma: n.lemma, article: ART[n.gender], gender: n.gender, eigen: true });
    }
    if (n.weak && g("DE_SCHWACHE_NOMEN")) g("DE_SCHWACHE_NOMEN")[n.lemma] = n.weak;
    if (n.gender === "pl" && g("DE_PLURAL_NOMEN")) g("DE_PLURAL_NOMEN")[n.lemma] = n.datPl || datPlural(n.lemma);
  }

  // Dativ Plural: -n anhängen, außer bei -n und -s (den Kindern, den Autos)
  function datPlural(pl) {
    return /[ns]$/.test(pl) ? pl : pl + "n";
  }

  // ------------------------------------------------------------
  // Eingabe vorbereiten: „die Sonne“ → Sonne (+ Artikel des Benutzers)
  // ------------------------------------------------------------
  function zerlege(eingabe) {
    let s = String(eingabe || "").trim().replace(/\s+/g, " ").replace(/[.,!?;:]+$/, "");
    let vorgabe = null;
    const m = s.match(/^(der|die|das)\s+(.+)$/i);
    if (m) {
      vorgabe = { der: "m", die: "f", das: "n" }[m[1].toLowerCase()];
      s = m[2];
    }
    return { lemma: gross(s), vorgabe };
  }

  // ------------------------------------------------------------
  // 1. Lokale Suche
  // ------------------------------------------------------------
  function lokal(lemma) {
    const e = laden().find((x) => x.lemma === lemma);
    if (e) return Object.assign({}, e, { quelle: "eigen", sicher: true });
    const p = arr(g("DE_PERSONEN")).find((x) => x.lemma === lemma);
    if (p) return { lemma, gender: p.gender, weak: p.weak, quelle: "quantura", sicher: true };
    const n = arr(g("DE_NOUNS")).find((x) => x.lemma === lemma && !x.eigen);
    if (n) {
      const weak = (g("DE_SCHWACHE_NOMEN") || {})[lemma];
      return { lemma, gender: n.gender, weak, quelle: "quantura", sicher: true };
    }
    return null;
  }

  // Grundwort im eigenen Wörterbuch suchen (Sonnenschein → Schein)
  function lokalGrundwort(lemma) {
    for (let i = 1; i <= lemma.length - 3; i++) {
      const teil = gross(lemma.slice(i));
      const t = lokal(teil);
      if (t) return { teil, treffer: t };
    }
    return null;
  }

  // ------------------------------------------------------------
  // 2. Wiktionary
  // ------------------------------------------------------------
  function parseWiktionary(text) {
    if (!text) return null;
    const start = text.indexOf("({{Sprache|Deutsch}})");
    if (start < 0) return null;
    let sec = text.slice(start);
    const ende = sec.indexOf("({{Sprache|", 25);
    if (ende > 0) sec = sec.slice(0, ende);
    const kopf = sec.match(/\{\{Wortart\|Substantiv\|Deutsch\}\}[^\n]*/);
    if (!kopf) return null;
    const gen = [...kopf[0].matchAll(/\{\{([mfn])\}\}/g)].map((x) => x[1]);
    let gender = gen[0] || null;
    if (!gender) {
      const gg = sec.match(/\|Genus(?: 1)?=([mfn])/);
      if (gg) gender = gg[1];
    }
    if (!gender && /Pluraletantum|\{\{kPl\.?\}\}|\{\{Pl\.?\}\}/.test(kopf[0])) gender = "pl";
    if (!gender) return null;
    const feld = (name) => {
      const m = sec.match(new RegExp("\\|" + name + "(?: 1)?=([^\\n|}]*)"));
      const v = m ? m[1].trim() : "";
      return v && v !== "—" && v !== "-" ? v : "";
    };
    return {
      gender,
      andere: [...new Set(gen.slice(1))].filter((x) => x !== gender),
      akkSg: feld("Akkusativ Singular"),
      plural: feld("Nominativ Plural"),
      datPl: feld("Dativ Plural"),
    };
  }

  async function wiktionary(lemma) {
    // ganzes Wort + alle möglichen Grundwörter in EINER Anfrage
    const titel = [lemma];
    for (let i = 1; i <= lemma.length - 3 && titel.length < 50; i++) titel.push(gross(lemma.slice(i)));
    const url =
      "https://de.wiktionary.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&origin=*&titles=" +
      encodeURIComponent(titel.join("|"));
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;
    try {
      const r = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const j = await r.json();
      const daten = {};
      arr(j.query && j.query.pages).forEach((p) => {
        if (p.missing || !p.revisions) return;
        const rev = p.revisions[0];
        const text = (rev.slots && rev.slots.main && rev.slots.main.content) || rev.content || "";
        const info = parseWiktionary(text);
        if (info) daten[p.title] = info;
      });
      if (daten[lemma]) return { teil: null, info: daten[lemma] };
      for (let i = 1; i < titel.length; i++) {
        if (daten[titel[i]]) return { teil: titel[i], info: daten[titel[i]] };
      }
      return { teil: null, info: null };
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  // ------------------------------------------------------------
  // 3. Endungs-Regeln (wenn nichts gefunden wurde)
  // ------------------------------------------------------------
  const REGELN = [
    { re: /(ung|heit|keit|schaft|ion|tät|ität)$/, gender: "f", sicher: true, text: "Wörter auf -ung, -heit, -keit, -schaft, -ion, -tät sind immer feminin (die Zeitung, die Freiheit)." },
    { re: /(chen|lein)$/, gender: "n", sicher: true, text: "Verkleinerungsformen auf -chen und -lein sind immer neutral (das Mädchen, das Fräulein)." },
    { re: /(ismus|ling)$/, gender: "m", sicher: true, text: "Wörter auf -ismus und -ling sind immer maskulin (der Tourismus, der Frühling)." },
    { re: /(ment|um)$/, gender: "n", sicher: false, text: "Wörter auf -ment und -um sind meistens neutral (das Dokument, das Zentrum)." },
    { re: /(ei|ie|ik|ur|anz|enz)$/, gender: "f", sicher: false, text: "Wörter auf -ei, -ie, -ik, -ur, -anz, -enz sind meistens feminin (die Bäckerei, die Musik)." },
    { re: /(or|ant|ig|ich)$/, gender: "m", sicher: false, text: "Wörter auf -or, -ant, -ig, -ich sind meistens maskulin (der Motor, der Honig)." },
    { re: /e$/, gender: "f", sicher: false, text: "Wörter auf -e sind meistens feminin (die Lampe) – aber Vorsicht: der Junge, das Auge." },
  ];
  function regel(lemma) {
    const w = lemma.toLowerCase();
    return REGELN.find((r) => r.re.test(w)) || null;
  }

  // ------------------------------------------------------------
  // Hauptfunktion: Artikel finden
  // Rückgabe: { lemma, gender|null, weak?, plural?, datPl?, sicher, erklaerung, warnung? }
  // ------------------------------------------------------------
  async function finden(eingabe) {
    const { lemma, vorgabe } = zerlege(eingabe);
    if (!lemma || lemma.length < 2) return { fehler: "Bitte ein Nomen eingeben." };
    if (/\s/.test(lemma)) return { fehler: "Bitte nur ein Wort eingeben (ohne Adjektiv)." };

    let erg = null;
    let offline = false;
    const l = lokal(lemma);
    if (l) {
      erg = Object.assign({}, l, {
        erklaerung: l.quelle === "eigen" ? "Steht schon in „Meine Wörter“." : "Steht im Wörterbuch von Quantura.",
      });
    }

    if (!erg) {
      try {
        const w = await wiktionary(lemma);
        if (w.info) {
          const i = w.info;
          erg = { lemma, gender: i.gender, sicher: true, plural: i.plural, quelle: "wiktionary" };
          if (!w.teil) {
            erg.erklaerung = "Gefunden im Wörterbuch Wiktionary.";
            if (i.gender === "m" && i.akkSg && i.akkSg !== lemma) erg.weak = i.akkSg;
            if (i.datPl) erg.datPl = i.datPl;
          } else {
            const vorne = lemma.slice(0, lemma.length - w.teil.length);
            erg.erklaerung =
              `Zusammengesetztes Wort (das Kompositum): ${vorne} + ${w.teil}. ` +
              `Das Grundwort (das letzte Wort) „${ART[i.gender].split(" ")[0]} ${w.teil}“ bestimmt den Artikel (Wiktionary).`;
            if (i.gender === "m" && i.akkSg && i.akkSg !== w.teil) erg.weak = vorne + klein(i.akkSg);
            if (i.plural) erg.plural = vorne + klein(i.plural);
          }
          if (i.andere && i.andere.length) erg.warnung = `Das Wort hat mehrere Artikel: auch „${i.andere.map((x) => ART[x]).join(", ")}“ (oft mit anderer Bedeutung).`;
        }
      } catch (e) {
        erg = null;
        offline = true;
      }
    }

    if (!erg) {
      const gw = lokalGrundwort(lemma);
      if (gw) {
        const vorne = lemma.slice(0, lemma.length - gw.teil.length);
        erg = {
          lemma, gender: gw.treffer.gender, sicher: true, quelle: "grundwort",
          erklaerung: `Zusammengesetztes Wort (das Kompositum): ${vorne} + ${gw.teil}. Das Grundwort „${ART[gw.treffer.gender].split(" ")[0]} ${gw.teil}“ bestimmt den Artikel.`,
        };
        if (gw.treffer.weak) erg.weak = vorne + klein(gw.treffer.weak);
      }
    }

    if (!erg) {
      const r = regel(lemma);
      if (r) erg = { lemma, gender: r.gender, sicher: r.sicher, quelle: "regel", erklaerung: "Regel: " + r.text };
    }

    if (!erg) {
      erg = { lemma, gender: null, sicher: false, quelle: "unbekannt", erklaerung: "Nicht gefunden. Bitte den Artikel selbst wählen." };
    }
    if (offline && erg.quelle !== "eigen" && erg.quelle !== "quantura") {
      erg.erklaerung += " (Kein Internet – Wiktionary nicht erreichbar.)";
    }
    if (!erg.sicher && erg.gender) erg.erklaerung += " Bitte prüfen!";

    if (vorgabe) {
      if (!erg.gender || !erg.sicher) {
        erg.gender = vorgabe;
        erg.sicher = true;
        erg.erklaerung = `Artikel von Ihnen eingegeben: ${ART[vorgabe]} ${lemma}.`;
      } else if (erg.gender !== vorgabe) {
        erg.warnung = `Achtung: Sie haben „${ART[vorgabe]} ${lemma}“ geschrieben, richtig ist aber „${ART[erg.gender].split(" ")[0]} ${lemma}“.`;
      }
    }
    return erg;
  }

  // ------------------------------------------------------------
  // Oberfläche: Eingabe-Box unter einem Auswahlfeld
  // opts = { nachSelect: Element, onFertig: (nomen) => void, onAbbruch: () => void }
  // ------------------------------------------------------------
  function el(tag, attrs, text) {
    const e = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => e.setAttribute(k, v));
    if (text) e.textContent = text;
    return e;
  }

  function box(opts) {
    const b = el("div", { class: "en-box", hidden: "" });
    const zeile = el("div", { class: "sg-zeile" });
    const inp = el("input", { type: "text", placeholder: "Nomen eingeben, z. B. Sonne", autocomplete: "off", autocapitalize: "words", spellcheck: "false" });
    const such = el("button", { type: "button", class: "en-btn" }, "🔍 Artikel finden");
    zeile.append(inp, such);
    const erg = el("div", { class: "en-erg" });
    const wahl = el("div", { class: "en-wahl", hidden: "" });
    const knoepfe = {};
    ["m", "f", "n", "pl"].forEach((gd) => {
      const k = el("button", { type: "button", "data-g": gd }, gd === "pl" ? "Plural" : ART[gd]);
      knoepfe[gd] = k;
      wahl.appendChild(k);
    });
    const ok = el("button", { type: "button", class: "en-ok" }, "✔ übernehmen");
    const ab = el("button", { type: "button", class: "en-ab" }, "✖");
    ab.title = "abbrechen";
    wahl.append(ok, ab);
    const meine = el("div", { class: "en-meine" });
    const regelLink = el("a", { href: "/pages/language_lab/grammatik/index.html#de-artikel-finden", target: "_blank", rel: "noopener", class: "en-regel" }, "📘 die Regel: der, die oder das? (das Grundwort, die Endungen)");
    b.append(zeile, erg, wahl, meine, regelLink);
    opts.nachSelect.insertAdjacentElement("afterend", b);

    let aktuell = null;
    let gewaehlt = null;

    function markiere(gd) {
      gewaehlt = gd;
      Object.entries(knoepfe).forEach(([k, btn]) => btn.classList.toggle("en-an", k === gd));
      ok.disabled = !gd;
      if (aktuell && gd) {
        const wort = gd === "pl" ? aktuell.plural || aktuell.lemma : aktuell.lemma;
        ok.textContent = `✔ übernehmen: ${ART[gd].split(" ")[0]} ${wort}`;
      } else ok.textContent = "✔ übernehmen";
    }

    function zeigeMeine() {
      const l = laden();
      meine.innerHTML = "";
      if (!l.length) return;
      meine.appendChild(el("span", { class: "en-mt" }, "Meine Wörter:"));
      l.forEach((n) => {
        const c = el("span", { class: "en-chip" }, `${ART[n.gender].split(" ")[0]} ${n.lemma}`);
        const x = el("button", { type: "button", title: "aus „Meine Wörter“ löschen" }, "×");
        x.addEventListener("click", () => {
          if (!confirmLoeschen(n.lemma)) return;
          entfernen(n.lemma);
          zeigeMeine();
          if (opts.onListe) opts.onListe();
        });
        c.appendChild(x);
        meine.appendChild(c);
      });
    }
    // kein Browser-Dialog: zweimal klicken zum Löschen
    let loeschKandidat = null;
    function confirmLoeschen(lemma) {
      if (loeschKandidat === lemma) { loeschKandidat = null; return true; }
      loeschKandidat = lemma;
      erg.textContent = `Zum Löschen von „${lemma}“ noch einmal auf × klicken.`;
      return false;
    }

    async function suchen() {
      const wert = inp.value.trim();
      if (!wert) { inp.focus(); return; }
      erg.textContent = "⏳ suche …";
      wahl.hidden = true;
      such.disabled = true;
      const r = await finden(wert);
      such.disabled = false;
      if (r.fehler) { erg.textContent = r.fehler; return; }
      aktuell = r;
      inp.value = r.lemma;
      erg.innerHTML = "";
      if (r.gender) {
        const t = el("div", { class: "en-treffer" });
        t.appendChild(el("b", {}, `${ART[r.gender].split(" ")[0]} ${r.gender === "pl" ? r.plural || r.lemma : r.lemma}`));
        t.appendChild(document.createTextNode(` – ${GENUS[r.gender]}` + (r.sicher ? " ✓" : " ?")));
        erg.appendChild(t);
      }
      erg.appendChild(el("div", { class: "en-erkl" }, r.erklaerung));
      if (r.warnung) erg.appendChild(el("div", { class: "en-warn" }, "⚠ " + r.warnung));
      const extra = [];
      if (r.weak) extra.push(`n-Deklination: den/dem ${r.weak}`);
      if (r.plural && r.gender !== "pl") extra.push(`Plural: die ${r.plural}`);
      if (extra.length) erg.appendChild(el("div", { class: "en-erkl" }, extra.join(" · ")));
      wahl.hidden = false;
      markiere(r.gender);
    }

    function uebernehmen() {
      if (!aktuell || !gewaehlt) return;
      const n = { lemma: aktuell.lemma, gender: gewaehlt };
      if (gewaehlt === "pl") {
        n.lemma = aktuell.plural || aktuell.lemma;
        n.datPl = aktuell.datPl || datPlural(n.lemma);
        if (aktuell.plural) n.singular = aktuell.lemma;
      } else if (gewaehlt === aktuell.gender && aktuell.weak) {
        n.weak = aktuell.weak;
      }
      n.quelle = aktuell.quelle;
      hinzufuegen(n);
      schliessen();
      opts.onFertig(n);
    }

    function oeffnen() {
      b.hidden = false;
      erg.textContent = "Ein Nomen eingeben – der Artikel wird gesucht (Wiktionary, Wortbildung, Regeln).";
      wahl.hidden = true;
      aktuell = null;
      inp.value = "";
      zeigeMeine();
      setTimeout(() => inp.focus(), 30);
    }
    function schliessen() {
      b.hidden = true;
    }

    such.addEventListener("click", suchen);
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (aktuell && gewaehlt && inp.value.trim() === aktuell.lemma && !wahl.hidden) uebernehmen();
        else suchen();
      }
    });
    inp.addEventListener("input", () => { if (aktuell && inp.value.trim() !== aktuell.lemma) wahl.hidden = true; });
    Object.entries(knoepfe).forEach(([gd, k]) => k.addEventListener("click", () => markiere(gd)));
    ok.addEventListener("click", uebernehmen);
    ab.addEventListener("click", () => { schliessen(); if (opts.onAbbruch) opts.onAbbruch(); });

    return { oeffnen, schliessen };
  }

  // Beim Laden: eigene Wörter in die Wörterbücher übernehmen
  laden().forEach(inWoerterbuch);

  window.DE_EIGENE_NOMEN = { laden, hinzufuegen, entfernen, finden, box, ART };
})();
