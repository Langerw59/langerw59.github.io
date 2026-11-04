// =============================================================
// en_ui.js – Oberfläche des englischen Satzlabors
// RU: Интерфейс английской «лаборатории предложений»
// Version 1 (2026-11-02)
// =============================================================

(() => {
  "use strict";
  if (typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const g = (n) => window[n];
  const arr = (x) => (Array.isArray(x) ? x : []);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  function opt(p, value, text) { const o = document.createElement("option"); o.value = value; o.textContent = text; p.appendChild(o); return o; }
  function grp(sel, label) { const o = document.createElement("optgroup"); o.label = label; sel.appendChild(o); return o; }

  // ------------------------------------------------------------
  // Auswahl füllen
  // ------------------------------------------------------------
  function fillNP(sel, mitSubjektPron, mitObjPron, mitDingen) {
    sel.innerHTML = "";
    opt(sel, "", mitSubjektPron ? "— please choose / выбери —" : "— (none) —");
    const E = g("EN_ENGINE");
    if (mitSubjektPron) {
      const gp = grp(sel, "Pronouns / местоимения");
      E.PRONOMEN.forEach((p, i) => opt(gp, "s:" + i, `${p.form}${p.id === "you_pl" ? " (plural)" : ""} — ${p.ru}`));
    }
    if (mitObjPron) {
      const gp = grp(sel, "Pronouns / местоимения");
      E.OBJ_PRON.forEach((p, i) => opt(gp, "o:" + i, `${p.form} — ${p.ru}`));
    }
    const gpers = grp(sel, "People / люди");
    arr(g("EN_SL_NOUNS")).forEach((n, i) => { if (n.person) opt(gpers, "n:" + i, `${n.sg} — ${n.ru}`); });
    if (mitDingen) {
      const gd = grp(sel, "Things / вещи");
      arr(g("EN_SL_NOUNS")).forEach((n, i) => { if (!n.person) opt(gd, "n:" + i, `${n.sg} — ${n.ru}${n.unc ? " (uncountable)" : ""}`); });
    }
  }
  function fillDet(sel, def) {
    sel.innerHTML = "";
    arr(g("EN_SL_DETS")).forEach((d) => opt(sel, d.id, d.label));
    sel.value = def;
  }
  function fillAdj(sel) {
    sel.innerHTML = "";
    opt(sel, "", "— (no adjective) —");
    arr(g("EN_SL_ADJECTIVES")).forEach((a) => opt(sel, a, a));
  }
  function fillListe(sel, liste, leer) {
    sel.innerHTML = "";
    opt(sel, "", leer || "— (none) —");
    liste.forEach((x, i) => opt(sel, String(i), `${x.text} — ${x.ru}${x.note ? " (" + x.note + ")" : ""}`));
  }

  function readNP(prefix) {
    const v = $(prefix).value;
    if (!v) return null;
    const E = g("EN_ENGINE");
    if (v.startsWith("s:")) return { pron: E.PRONOMEN[Number(v.slice(2))] };
    if (v.startsWith("o:")) { const p = E.OBJ_PRON[Number(v.slice(2))]; return { pron: { form: p.form, person: p.person } }; }
    const n = arr(g("EN_SL_NOUNS"))[Number(v.slice(2))];
    return { noun: n, det: $(prefix + "Det").value, adj: $(prefix + "Adj").value, plural: $(prefix + "Pl").checked, person: !!n.person };
  }
  function npExtra(prefix) {
    const v = $(prefix).value;
    const box = $(prefix + "Extra");
    if (box) box.style.display = v.startsWith("n:") ? "" : "none";
  }

  function readCfg() {
    const pick = (id, liste) => ($(id).value === "" ? null : liste[Number($(id).value)]);
    return {
      satzart: $("enSatzart").value,
      neg: $("enNeg").checked,
      tense: $("enTense").value,
      subj: readNP("enSubj"),
      verb: pick("enVerb", arr(g("EN_SL_VERBS"))),
      io: readNP("enIo"),
      obj: readNP("enObj"),
      art: pick("enArt", arr(g("EN_SL_MANNER"))),
      ort: pick("enOrt", arr(g("EN_SL_PLACE"))),
      zeit: pick("enZeit", arr(g("EN_SL_TIME"))),
      freq: pick("enFreq", arr(g("EN_SL_FREQ"))),
      fragNach: $("enFragNach").value,
    };
  }

  function updateFragNach() {
    const w = $("enSatzart").value === "wfrage";
    $("enFragNachRow").style.display = w ? "" : "none";
    if (!w) return;
    const sel = $("enFragNach");
    const alt = sel.value;
    sel.innerHTML = "";
    const da = [
      ["subj", !!$("enSubj").value, "Who? / What? – подлежащее (кто? что?)"],
      ["akk", !!$("enObj").value, "Who? / What? – дополнение (кого? что?)"],
      ["ort", !!$("enOrt").value, "Where? – где? куда?"],
      ["zeit", !!$("enZeit").value, "When? – когда?"],
      ["freq", !!$("enFreq").value, "How often? – как часто?"],
      ["art", !!$("enArt").value, "How? – как?"],
    ];
    da.forEach(([k, ok, t]) => { if (ok) opt(sel, k, t); });
    if ([...sel.options].some((o) => o.value === alt)) sel.value = alt;
  }

  function updateVerbInfo() {
    const v = arr(g("EN_SL_VERBS"))[Number($("enVerb").value)];
    const info = $("enVerbInfo");
    if (!v) { info.textContent = ""; return; }
    const f = g("EN_ENGINE").formen(v);
    const ob = v.obj === "pflicht" ? "нужно: что? / кого?" : v.obj === "optional" ? "можно: что?" : "без дополнения";
    info.innerHTML = `<b>${esc(f.base)} – ${esc(f.past)} – ${esc(f.pp)}</b> · ${f.unregelmaessig ? "irregular (неправильный)" : "regular (правильный)"} · ${esc(v.ru)} · ${ob}${v.io ? " · + кому?" : ""}`;
    $("enObjBox").classList.toggle("sg-off", v.obj === false);
    $("enIoBox").classList.toggle("sg-off", !v.io);
    $("enObjTag").textContent = v.obj === "pflicht" ? "нужно" : v.obj === "optional" ? "можно" : "не подходит";
    $("enIoTag").textContent = v.io ? "можно" : "не подходит";
  }

  // ------------------------------------------------------------
  // Ausgabe
  // ------------------------------------------------------------
  const SLOT = (s) => {
    if (/question word/.test(s.info)) return "Question word<br><small>вопрос. слово</small>";
    if (s.rolle === "subj") return "Subject<br><small>кто? что?</small>";
    if (s.rolle === "pred" || s.rolle === "neg" || (s.rolle === "zeit" && /frequency|уже/.test(s.info))) return "Verb<br><small>глагол</small>";
    if (s.rolle === "dat" || s.rolle === "akk") return "Object<br><small>дополнение</small>";
    if (s.rolle === "pkv") return "Complement<br><small>после be</small>";
    if (s.rolle === "art") return "Manner<br><small>как?</small>";
    if (s.rolle === "ort") return "Place<br><small>где? куда?</small>";
    if (s.rolle === "zeit") return "Time<br><small>когда?</small>";
    return "Other";
  };

  function zeige(r, cfg) {
    const SG = g("EN_SATZGLIEDER");
    const out = $("enSentenceOutput"), ana = $("enAnalyse"), msg = $("enMessage");
    if (r.fehler) { out.textContent = r.fehler; ana.innerHTML = ""; msg.textContent = ""; return; }
    out.textContent = r.text;
    const chip = (s, first) => {
      const d = SG[s.rolle] || SG.unbek;
      return `<span class="sg-chip" style="--c:${d.farbe}" title="${esc(d.name + (s.info ? " – " + s.info : ""))}">${esc(first ? capFirst(s.text) : s.text)}</span>`;
    };
    let html = (r.alarme || []).map((a) => `<div class="sl-alarm">${esc(a)}</div>`).join("");
    html += `<div class="sg-farbsatz">${r.segmente.map((s, i) => chip(s, i === 0)).join(" ")}<span class="sg-punkt">${esc(r.text.slice(-1))}</span></div>`;
    if (r.textKurz) html += `<div class="en-kurz">🗣 разговорно: <b>${esc(r.textKurz)}</b></div>`;
    if (r.ausgeschrieben) html += `<div class="en-kurz">✍ полностью: <b>${esc(r.ausgeschrieben)}</b></div>`;

    // Schema S-V-O-M-P-T
    const gruppen = [];
    r.segmente.forEach((s) => {
      const sl = SLOT(s);
      const last = gruppen[gruppen.length - 1];
      if (last && last.slot === sl) last.segs.push(s); else gruppen.push({ slot: sl, segs: [s] });
    });
    html += `<div class="en-schema">${gruppen.map((gr) => `<div class="sg-feld${/^Verb/.test(gr.slot) ? " sg-k" : ""}"><div class="sg-feld-t">${gr.slot}</div><div>${gr.segs.map((s) => chip(s, false)).join(" ")}</div></div>`).join("")}</div>`;

    const zeilen = r.segmente.map((s) => {
      const d = SG[s.rolle] || SG.unbek;
      return `<tr><td><span class="sg-dot" style="background:${d.farbe}"></span>${esc(d.name)}<br><small>${esc(d.ru)}</small></td><td>${esc(d.frage)}</td><td><b>${esc(s.text)}</b></td><td>${esc(s.info)}</td></tr>`;
    });
    html += `<table class="sg-tab"><thead><tr><th>Part</th><th>Question</th><th>Words</th><th>Info</th></tr></thead><tbody>${zeilen.join("")}</tbody></table>`;
    const ti = r.tenseInfo;
    html += `<div class="sg-meta">Tense / время: <b>${esc(r.zeitform)}</b>${ti ? ` — ${esc(ti.ru)} · по-немецки ≈ ${esc(ti.de)}` : ""}</div>`;
    if (typeof g("EN_ERKLAERUNG") === "function") { try { html += g("EN_ERKLAERUNG")(cfg, r); } catch (e) { console.warn(e); } }
    ana.innerHTML = html;
    msg.innerHTML = (r.hinweise || []).map(esc).join("<br>");
  }

  // ------------------------------------------------------------
  // Vorlesen
  // ------------------------------------------------------------
  function autoVorlesen() { const c = $("slAutoTts"); return !c || c.checked; }
  function vorlesen(t) {
    if (!t || typeof LG_TTS === "undefined") return;
    try { LG_TTS.stop(); } catch (e) { /* egal */ }
    LG_TTS.speak(t);
  }

  function generieren(sprechen) {
    const cfg = readCfg();
    const r = g("EN_ENGINE").bauen(cfg);
    zeige(r, cfg);
    if (sprechen && r.text && autoVorlesen()) vorlesen(r.text);
    return r;
  }
  function analysieren(sprechen) {
    const t = $("slEingabe").value;
    const { cfg, r } = g("EN_ANALYSE")(t);
    zeige(r, cfg);
    if (sprechen && r.text && autoVorlesen()) vorlesen(r.original || r.text);
  }
  function setzeModus(m) {
    document.querySelectorAll(".sl-tab").forEach((b) => b.classList.toggle("active", b.dataset.mode === m));
    $("slModeBauen").style.display = m === "bauen" ? "" : "none";
    $("slModeEingabe").style.display = m === "eingabe" ? "" : "none";
    try { localStorage.setItem("satzlabor_en_modus", m); } catch (e) { /* egal */ }
  }

  const BEISPIELE = [
    "He goes home.", "He go home.", "Does he goes home?", "Did he went to school yesterday?", "I have went home.",
    "I have gone home yesterday.", "She is watching a film now.", "They was at home.", "My son gave his grandma a letter yesterday.",
    "Where does your daughter live?", "I don't never drink coffee.", "We're going to visit our parents next week.",
    "I live in Willich since 2020.", "She has been waiting for two hours.", "Can you help me?",
  ];

  function init() {
    fillNP($("enSubj"), true, false, false);
    fillNP($("enIo"), false, true, false);
    fillNP($("enObj"), false, true, true);
    [["enSubj", "my"], ["enIo", "my"], ["enObj", "a"]].forEach(([p, d]) => { fillDet($(p + "Det"), d); fillAdj($(p + "Adj")); });
    const sv = $("enVerb");
    opt(sv, "", "— please choose / выбери —");
    arr(g("EN_SL_VERBS")).forEach((v, i) => { const f = g("EN_ENGINE").formen(v); opt(sv, String(i), `${f.base} – ${f.past} – ${f.pp}  (${v.ru})`); });
    fillListe($("enArt"), arr(g("EN_SL_MANNER")));
    fillListe($("enOrt"), arr(g("EN_SL_PLACE")));
    fillListe($("enZeit"), arr(g("EN_SL_TIME")));
    fillListe($("enFreq"), arr(g("EN_SL_FREQ")));

    ["enSubj", "enIo", "enObj"].forEach((p) => { $(p).addEventListener("change", () => { npExtra(p); updateFragNach(); }); npExtra(p); });
    $("enVerb").addEventListener("change", updateVerbInfo);
    ["enSatzart", "enArt", "enOrt", "enZeit", "enFreq"].forEach((id) => $(id).addEventListener("change", updateFragNach));
    $("enGenerateBtn").addEventListener("click", () => generieren(true));
    $("enClearBtn").addEventListener("click", () => {
      ["enSubj", "enVerb", "enIo", "enObj", "enArt", "enOrt", "enZeit", "enFreq"].forEach((id) => ($(id).selectedIndex = 0));
      $("enNeg").checked = false;
      ["enSubj", "enIo", "enObj"].forEach(npExtra);
      $("enSentenceOutput").textContent = "No sentence yet …";
      $("enAnalyse").innerHTML = ""; $("enMessage").textContent = "";
      updateVerbInfo(); updateFragNach();
    });

    // Modus „Satz eingeben“
    document.querySelectorAll(".sl-tab").forEach((b) => b.addEventListener("click", () => setzeModus(b.dataset.mode)));
    $("slAnalyseBtn").addEventListener("click", () => analysieren(true));
    $("slEingabeLeeren").addEventListener("click", () => { $("slEingabe").value = ""; $("slEingabe").focus(); });
    $("slEingabe").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); analysieren(true); } });
    BEISPIELE.forEach((b) => { const k = document.createElement("button"); k.type = "button"; k.textContent = b; k.addEventListener("click", () => { $("slEingabe").value = b; analysieren(true); }); $("slBeispiele").appendChild(k); });
    $("slUebernehmen").addEventListener("click", () => { const r = generieren(false); if (!r || !r.text) return; $("slEingabe").value = r.text; setzeModus("eingabe"); analysieren(true); });
    let m = "bauen";
    try { m = localStorage.getItem("satzlabor_en_modus") || "bauen"; } catch (e) { /* egal */ }
    if (location.hash === "#eingabe") m = "eingabe";
    setzeModus(m);

    // TTS
    if (typeof LG_TTS !== "undefined") {
      LG_TTS.setLanguage("en-GB");
      const slider = $("ttsRateSlider");
      if (slider) { LG_TTS.setRate(parseFloat(slider.value) || 1); slider.addEventListener("input", () => LG_TTS.setRate(parseFloat(slider.value))); }
      const rate = (id, rr) => { const b = $(id); if (b) b.addEventListener("click", () => { LG_TTS.setRate(rr); if (slider) slider.value = String(rr); vorlesen($("enSentenceOutput").textContent); }); };
      rate("ttsSlowBtn", 0.7); rate("ttsNormalBtn", 1.0); rate("ttsFastBtn", 1.3);
      $("ttsSpeakBtn").addEventListener("click", () => vorlesen($("enSentenceOutput").textContent));
      $("ttsStopBtn").addEventListener("click", () => LG_TTS.stop());
    }
    const c = $("slAutoTts");
    try { c.checked = localStorage.getItem("satzlabor_auto_tts") !== "0"; } catch (e) { /* egal */ }
    c.addEventListener("change", () => { try { localStorage.setItem("satzlabor_auto_tts", c.checked ? "1" : "0"); } catch (e) { /* egal */ } });

    updateVerbInfo();
    updateFragNach();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
