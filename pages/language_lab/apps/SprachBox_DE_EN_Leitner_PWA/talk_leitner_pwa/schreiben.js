// 2026-11-17: der Schreib-Modus (Sprachführer + Diktat zusammen)
// RU: режим «Schreiben» – каждую карточку не только переворачивать, но и написать по-английски.
//   Aus     – как раньше (только переворачивать)
//   Lesen   – видишь немецкий текст, пишешь английский
//   Diktat  – немецкий текст скрыт, английский звучит, пишешь услышанное
// Проверка: регистр и знаки препинания не считаются ошибкой; ошибки показываются по словам и буквам.

const LS_KEY = "sprachbox_de_en_schreiben_v1";
const MODES = ["aus", "lesen", "diktat"];
const MODE_LABEL = {
  aus: "✍️ Schreiben: Aus",
  lesen: "✍️ Schreiben: Lesen",
  diktat: "✍️ Schreiben: Diktat 🎧",
};

let api = null; // { grade(known), next(), flipToAnswer(), speakBack(it), isAwaitingNext() }
let current = null; // aktuelle Karte / текущая карточка
let checked = null; // Ergebnis der Prüfung / результат проверки
let mode = "aus";
// 2026-11-17: Zählung pro Sitzung – richtig zählt nur ein Satz, der beim 1. Versuch ganz richtig war
// RU: счёт за сессию – правильным считается только предложение, написанное полностью верно с первой попытки
const LS_HIST = "sprachbox_de_en_schreiben_verlauf_v1";
const leereStats = () => ({ saetze: 0, richtig: 0, versuche: 0, fehler: 0 });
let stats = leereStats();
let karte = { versuche: 0, ersterOk: null }; // aktuelle Karte / текущая карточка

const $ = (id) => document.getElementById(id);

function loadMode() {
  try {
    const m = localStorage.getItem(LS_KEY);
    if (MODES.includes(m)) mode = m;
  } catch (_) {}
}
function saveMode() {
  try { localStorage.setItem(LS_KEY, mode); } catch (_) {}
}

export function getSchreibModus() {
  return mode;
}

// ---------- Vergleich / сравнение ----------
const CONTRACTIONS = [
  [/\bi'm\b/g, "i am"], [/\byou're\b/g, "you are"], [/\bwe're\b/g, "we are"],
  [/\bthey're\b/g, "they are"], [/\bhe's\b/g, "he is"], [/\bshe's\b/g, "she is"],
  [/\bit's\b/g, "it is"], [/\bthat's\b/g, "that is"], [/\bwhat's\b/g, "what is"],
  [/\bwhere's\b/g, "where is"], [/\bthere's\b/g, "there is"], [/\bhere's\b/g, "here is"],
  [/\bi've\b/g, "i have"], [/\byou've\b/g, "you have"], [/\bwe've\b/g, "we have"],
  [/\bthey've\b/g, "they have"], [/\bi'll\b/g, "i will"], [/\byou'll\b/g, "you will"],
  [/\bwe'll\b/g, "we will"], [/\bit'll\b/g, "it will"], [/\bi'd\b/g, "i would"],
  [/\bcan't\b/g, "cannot"], [/\bcan not\b/g, "cannot"], [/\bwon't\b/g, "will not"],
  [/\bdon't\b/g, "do not"], [/\bdoesn't\b/g, "does not"], [/\bdidn't\b/g, "did not"],
  [/\bisn't\b/g, "is not"], [/\baren't\b/g, "are not"], [/\bwasn't\b/g, "was not"],
  [/\bweren't\b/g, "were not"], [/\bhaven't\b/g, "have not"], [/\bhasn't\b/g, "has not"],
  [/\bcouldn't\b/g, "could not"], [/\bwouldn't\b/g, "would not"], [/\bshouldn't\b/g, "should not"],
  [/\blet's\b/g, "let us"],
];

function basicNorm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”„"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Wörter ohne Satzzeichen, Kurzformen ausgeschrieben / слова без знаков, сокращения раскрыты
function compareWords(s) {
  let t = basicNorm(s);
  for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep);
  t = t.replace(/[^a-z0-9'äöüß\s-]/g, " ").replace(/-/g, " ").replace(/'/g, "");
  return t.split(/\s+/).filter(Boolean);
}

// Anzeige-Wörter (Original mit Satzzeichen) / слова для показа (как в оригинале)
function displayTokens(s) {
  return String(s || "").trim().split(/\s+/).filter(Boolean);
}

function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

function isTypo(a, b) {
  const d = lev(a, b);
  const lim = Math.max(1, Math.floor(Math.max(a.length, b.length) / 4));
  return d <= lim;
}

// Wort-Ausrichtung (wie „diff“) / выравнивание слов
function align(target, typed) {
  const m = target.length, n = typed.length;
  const cost = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) cost[i][0] = i;
  for (let j = 0; j <= n; j++) cost[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const a = target[i - 1], b = typed[j - 1];
      const sub = a === b ? 0 : (isTypo(a, b) ? 0.6 : 1.6);
      cost[i][j] = Math.min(cost[i - 1][j] + 1, cost[i][j - 1] + 1, cost[i - 1][j - 1] + sub);
    }
  }
  const ops = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const a = target[i - 1], b = typed[j - 1];
      const sub = a === b ? 0 : (isTypo(a, b) ? 0.6 : 1.6);
      if (Math.abs(cost[i][j] - (cost[i - 1][j - 1] + sub)) < 1e-9) {
        ops.push({ t: a === b ? "ok" : (sub < 1 ? "typo" : "wrong"), target: a, typed: b, ti: i - 1, tj: j - 1 });
        i--; j--; continue;
      }
    }
    if (i > 0 && Math.abs(cost[i][j] - (cost[i - 1][j] + 1)) < 1e-9) {
      ops.push({ t: "missing", target: target[i - 1], ti: i - 1 });
      i--; continue;
    }
    ops.push({ t: "extra", typed: typed[j - 1] });
    j--;
  }
  return ops.reverse();
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Buchstaben-Vergleich für ein Tippfehler-Wort / сравнение по буквам
function letterDiff(target, typed) {
  const a = [...target], b = [...typed];
  const eq = (x, y) => x.toLowerCase() === y.toLowerCase();
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (eq(a[i - 1], b[j - 1]) ? 0 : 1));
  const out = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (eq(a[i - 1], b[j - 1]) ? 0 : 1)) {
      out.push(eq(a[i - 1], b[j - 1]) ? esc(a[i - 1]) : `<b class="sbLetterBad">${esc(a[i - 1])}</b>`);
      i--; j--;
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      out.push(`<b class="sbLetterBad">${esc(a[i - 1])}</b>`); // fehlt / пропущена
      i--;
    } else {
      j--; // überflüssiger Buchstabe / лишняя буква
    }
  }
  return out.reverse().join("");
}

// ---------- die Satzzeichen / знаки препинания ----------
// 2026-11-17: Satzzeichen werden mitgeprüft (Groß-/Kleinschreibung weiterhin nicht).
//   „!“ und „.“ am Ende gelten als gleich (im Englischen ist „!“ freiwillig), „?“ muss stimmen.
// RU: знаки препинания проверяются (большие буквы – нет). «!» и «.» считаются равными, «?» – обязателен.
const LS_ZEICHEN = "sprachbox_de_en_schreiben_zeichen_v1";
let zeichenPruefen = true;
try { zeichenPruefen = localStorage.getItem(LS_ZEICHEN) !== "aus"; } catch (_) {}

function nurZeichen(s) {
  return String(s || "").replace(/…/g, ".").replace(/[^.,!?;:]/g, "").replace(/\.{2,}/g, ".");
}
// Satzzeichen hinter jedem Vergleichswort / знаки после каждого слова
function zeichenProWort(text) {
  const arr = [];
  for (const tok of displayTokens(text)) {
    const n = compareWords(tok).length;
    const hinten = (tok.match(/[^\p{L}\p{N}]*$/u) || [""])[0];
    if (n === 0) { if (arr.length) arr[arr.length - 1].roh += tok; continue; }
    for (let k = 0; k < n - 1; k++) arr.push({ roh: "" });
    arr.push({ roh: hinten });
  }
  return arr.map((x) => ({ roh: x.roh, z: nurZeichen(x.roh) }));
}
const gleichZeichen = (a, b) => a.replace(/!/g, ".") === b.replace(/!/g, ".");

function pruefe(targetText, typedText) {
  const tWords = compareWords(targetText);
  const uWords = compareWords(typedText);
  const ops = align(tWords, uWords);
  const fehler = ops.filter((o) => o.t !== "ok");
  const typos = fehler.filter((o) => o.t === "typo").length;
  const grob = fehler.length - typos;
  let urteil = "falsch";
  if (fehler.length === 0) urteil = "richtig";
  else if (grob === 0 && typos <= Math.max(1, Math.floor(tWords.length / 5))) urteil = "fast";

  // Satzzeichen vergleichen / сравнить знаки
  const tZ = zeichenProWort(targetText);
  const uZ = zeichenProWort(typedText);
  const zFehler = {};   // ti → { soll, ist }
  const zHinweis = [];  // „!“ statt „.“ – kein Fehler
  if (zeichenPruefen) {
    for (const o of ops) {
      if ((o.t !== "ok" && o.t !== "typo") || o.ti == null) continue;
      const soll = (tZ[o.ti] || {}).z || "";
      const ist = (uZ[o.tj] || {}).z || "";
      if (soll === ist) continue;
      if (gleichZeichen(soll, ist)) { zHinweis.push({ soll, ist }); continue; }
      zFehler[o.ti] = { soll, ist };
    }
  }
  const zAnzahl = Object.keys(zFehler).length;
  if (urteil === "richtig" && zAnzahl) urteil = "zeichen";

  if (urteil === "richtig") {
    let html = `<span class="sbOk">${esc(String(targetText).trim())}</span>`;
    if (zHinweis.length) html += `<div class="sbInfo">ℹ️ Im Original steht „${esc(zHinweis[0].soll)}“, du hast „${esc(zHinweis[0].ist)}“ – im Englischen ist beides richtig / в английском оба варианта верны</div>`;
    return { urteil, html, fehler: 0 };
  }

  const parts = [];
  for (const o of ops) {
    if (o.t === "extra") { parts.push(`<span class="sbYou"><s>${esc(o.typed)}</s></span>`); continue; }
    const tz = tZ[o.ti] || { roh: "", z: "" };
    // Wort ohne Satzzeichen hinten / слово без знаков в конце
    const roh = disp(targetText, tWords, o);
    const kern = roh.slice(0, roh.length - tz.roh.length) || o.target;
    let wort;
    if (o.t === "ok") wort = `<span class="sbOk">${esc(kern)}</span>`;
    else if (o.t === "typo") {
      const core = compareWords(kern).join("") === o.target ? kern.replace(/^[^\p{L}\p{N}]+/u, "") : o.target;
      const vorn = (kern.match(/^[^\p{L}\p{N}]*/u) || [""])[0];
      wort = `<span class="sbTypo" title="Du: ${esc(o.typed)}">${esc(vorn)}${letterDiff(core, o.typed)}</span><span class="sbYou">(${esc(o.typed)})</span>`;
    }
    else if (o.t === "wrong") wort = `<span class="sbBad">${esc(kern)}</span><span class="sbYou"><s>${esc(o.typed)}</s></span>`;
    else wort = `<span class="sbMiss" title="fehlt">${esc(kern)}</span>`;
    const zf = zFehler[o.ti];
    let zeichen = esc(tz.roh);
    if (zf) {
      zeichen = zf.soll
        ? `<span class="sbPunkt" title="Satzzeichen fehlt / знак пропущен${zf.ist ? ": du hast " + esc(zf.ist) : ""}">${esc(tz.roh || zf.soll)}</span>`
        : `<span class="sbYou" title="hier kein Satzzeichen / здесь знак не нужен"><s>${esc(zf.ist)}</s></span>`;
    }
    parts.push(wort + zeichen);
  }
  let html = parts.join(" ");
  if (zAnzahl) html += `<div class="sbInfo">🔴 rot umrandet = das Satzzeichen (знак препинания) fehlt oder ist falsch</div>`;
  return { urteil, html, fehler: fehler.length + zAnzahl };
}

// Anzeigewort zum Vergleichswort / слово в оригинальном виде
function disp(targetText, tWords, o) {
  const d = displayTokens(targetText);
  if (d.length === tWords.length && o.ti != null) return d[o.ti];
  return o.target + ((zeichenProWort(targetText)[o.ti] || {}).roh || "");
}

export function setZeichenPruefen(an) {
  zeichenPruefen = !!an;
  try { localStorage.setItem(LS_ZEICHEN, an ? "an" : "aus"); } catch (_) {}
}
export function getZeichenPruefen() {
  return zeichenPruefen;
}

// ---------- Oberfläche / интерфейс ----------
function applyModeUi() {
  const box = $("schreibBox");
  const btn = $("btnSchreibModus");
  const sel = $("selSchreiben");
  const card = $("card");
  if (btn) {
    btn.textContent = MODE_LABEL[mode];
    btn.classList.toggle("isActive", mode !== "aus");
  }
  if (sel) sel.value = mode;
  if (box) box.hidden = mode === "aus";
  document.body.classList.toggle("schreibAn", mode !== "aus");
  if (card) card.classList.toggle("schreibDiktat", mode === "diktat");
  const hint = $("btnSchreibHinweis");
  if (hint) hint.hidden = mode !== "diktat";
}

function resetBox() {
  checked = null;
  karte = { versuche: 0, ersterOk: null };
  const inp = $("inpSchreiben");
  const res = $("schreibErgebnis");
  if (inp) {
    inp.value = "";
    inp.disabled = false;
  }
  if (res) {
    res.innerHTML = "";
    res.className = "schreibErgebnis";
  }
  const pr = $("btnSchreibPruefen");
  if (pr) pr.textContent = "✔ Prüfen";
  for (const id of ["btnYes", "btnNo"]) $(id)?.classList.remove("sbVorschlag");
  $("card")?.classList.remove("hinweisAn");
}

function focusInput() {
  if (mode === "aus") return;
  const inp = $("inpSchreiben");
  if (!inp) return;
  // auf Touch-Geräten nicht automatisch die Tastatur aufklappen / на телефоне не открывать клавиатуру сразу
  const touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (!touch) setTimeout(() => inp.focus(), 60);
}

function prozent(st) {
  return st.saetze ? Math.round((st.richtig / st.saetze) * 100) : 0;
}

function updateStats() {
  const el = $("lblSchreibStats");
  if (el) el.textContent =
    `Sätze ${stats.saetze} · ganz richtig ${stats.richtig} · Versuche ${stats.versuche} · Fehler ${stats.fehler} · ${prozent(stats)} %`;
}

function doCheck() {
  if (!current || mode === "aus") return;
  const inp = $("inpSchreiben");
  const res = $("schreibErgebnis");
  const typed = (inp?.value || "").trim();
  if (!typed) {
    if (res) {
      res.className = "schreibErgebnis";
      res.textContent = "Bitte zuerst schreiben … / Сначала напишите …";
    }
    return;
  }
  const r = pruefe(current.en || "", typed);
  checked = r;
  const ok = r.urteil === "richtig";
  karte.versuche += 1;
  stats.versuche += 1;
  if (!ok) stats.fehler += 1;
  if (karte.versuche === 1) {
    karte.ersterOk = ok;
    stats.saetze += 1;
    if (ok) stats.richtig += 1;
  }
  updateStats();

  let titel;
  if (ok && karte.versuche === 1) titel = "✅ Richtig! / Правильно с первой попытки!";
  else if (ok) titel = `✅ Jetzt richtig! (${karte.versuche}. Versuch) – zählt als Fehler, die Karte kommt noch einmal / теперь правильно, но карточка вернётся на повторение`;
  else if (r.urteil === "zeichen") titel = "🟡 Die Wörter sind richtig – aber die Satzzeichen nicht. Korrigieren und noch einmal Enter / слова верны, но знаки препинания нет";
  else if (r.urteil === "fast") titel = "🟡 Fast richtig – Tippfehler korrigieren und noch einmal Enter / опечатка: исправьте и снова Enter";
  else titel = "❌ Noch nicht richtig – Fehler korrigieren und noch einmal Enter / исправьте ошибку и снова Enter";
  if (res) {
    res.className = "schreibErgebnis is-" + (ok ? "richtig" : r.urteil);
    res.innerHTML = `<div class="sbTitel">${titel}</div><div class="sbZeile">${r.html}</div>`;
  }
  if (inp) {
    inp.disabled = false;
    if (!ok) inp.focus();
  }
  const pr = $("btnSchreibPruefen");
  if (pr) pr.textContent = ok ? "↵ Weiter" : "↵ Aufgeben / Weiter";

  // Antwort zeigen und Bewertung vorschlagen / показать ответ и подсказать оценку
  api?.flipToAnswer?.();
  const gut = karte.ersterOk === true;
  $("btnYes")?.classList.toggle("sbVorschlag", gut);
  $("btnNo")?.classList.toggle("sbVorschlag", !gut);
}

// Enter: prüfen · nach einem Fehler: Text korrigieren → Enter prüft noch einmal
//        ohne Änderung Enter → weiter (Karte gilt als „nicht gewusst“ und kommt wieder)
// RU: Enter – проверить; после ошибки исправьте текст → Enter проверит снова;
//     Enter без исправления – дальше (карточка «не знал» и вернётся на повторение).
//     «Gewusst» засчитывается, только если с первой попытки всё правильно.
function onEnter() {
  if (!checked) return doCheck();
  api?.stopSpeech?.();
  if (!api?.isAwaitingNext?.()) api?.grade?.(karte.ersterOk === true, { silent: true });
  api?.next?.();
}

// ---------- Ergebnis am Ende / итог в конце ----------
function ladeVerlauf() {
  try {
    const v = JSON.parse(localStorage.getItem(LS_HIST) || "[]");
    return Array.isArray(v) ? v : [];
  } catch (_) {
    return [];
  }
}

function zeigeErgebnis(st, verlauf) {
  document.getElementById("schreibBilanz")?.remove();
  const p = prozent(st);
  const farbe = p >= 80 ? "var(--good)" : p >= 50 ? "#facc15" : "var(--bad)";
  const zeilen = verlauf.slice(1, 6).map((h) =>
    `<tr><td>${esc(h.datum)}</td><td>${h.richtig} / ${h.saetze}</td><td>${h.fehler}</td><td><b>${h.prozent} %</b></td></tr>`).join("");
  const box = document.createElement("div");
  box.id = "schreibBilanz";
  box.className = "schreibBilanz";
  box.innerHTML = `
    <div class="schreibBilanzKarte" role="dialog" aria-label="Ergebnis">
      <div class="sbTitel">✍️ Das Ergebnis / Итог</div>
      <div class="sbProzent" style="color:${farbe}">${p} %</div>
      <div class="mini">ganz richtig beim 1. Versuch / полностью правильно с первой попытки</div>
      <table class="sbTabelle">
        <tr><td>Sätze geschrieben</td><td><b>${st.saetze}</b></td></tr>
        <tr><td>davon ganz richtig</td><td><b>${st.richtig}</b></td></tr>
        <tr><td>mit Fehlern</td><td><b>${st.saetze - st.richtig}</b></td></tr>
        <tr><td>Versuche insgesamt</td><td><b>${st.versuche}</b></td></tr>
        <tr><td>Fehler insgesamt</td><td><b>${st.fehler}</b></td></tr>
      </table>
      ${zeilen ? `<div class="mini" style="margin-top:10px">Frühere Ergebnisse / прошлые результаты</div>
      <table class="sbTabelle sbVerlauf"><tr><th>Datum</th><th>richtig</th><th>Fehler</th><th>%</th></tr>${zeilen}</table>` : ""}
      <button class="btn primary" type="button" id="btnSchreibBilanzOk">OK</button>
    </div>`;
  document.body.appendChild(box);
  const ok = box.querySelector("#btnSchreibBilanzOk");
  ok.addEventListener("click", () => box.remove());
  setTimeout(() => ok.focus(), 50);
}

// Lern-Sitzung beendet (Karte geschlossen oder alle Karten fertig)
// RU: сессия закончилась – показать итог и сохранить его
export function schreibenSitzungEnde() {
  if (!stats.saetze) return;
  const d = new Date();
  const datum = d.toLocaleDateString("de-DE") + " " + d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  const verlauf = ladeVerlauf();
  verlauf.unshift({ datum, modus: mode, ...stats, prozent: prozent(stats) });
  try { localStorage.setItem(LS_HIST, JSON.stringify(verlauf.slice(0, 50))); } catch (_) {}
  zeigeErgebnis(stats, verlauf);
  stats = leereStats();
  updateStats();
}

export function initSchreiben(appApi) {
  api = appApi;
  loadMode();

  $("btnSchreibModus")?.addEventListener("click", (e) => {
    e.preventDefault();
    mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    saveMode();
    applyModeUi();
    resetBox();
    if (mode === "diktat" && current) api?.speakBack?.(current);
    focusInput();
  });
  $("selSchreiben")?.addEventListener("change", (e) => {
    const v = e.target.value;
    if (MODES.includes(v)) {
      mode = v;
      saveMode();
      applyModeUi();
    }
  });
  $("btnSchreibPruefen")?.addEventListener("click", (e) => {
    e.preventDefault();
    onEnter();
  });
  $("btnSchreibHoeren")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (current) api?.speakBack?.(current);
    $("inpSchreiben")?.focus();
  });
  $("btnSchreibHinweis")?.addEventListener("click", (e) => {
    e.preventDefault();
    $("card")?.classList.toggle("hinweisAn");
  });
  const inp = $("inpSchreiben");
  if (inp) {
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        onEnter();
      }
    });
    // nach dem Prüfen neu tippen → neu prüfen / если исправил текст – проверить заново
    inp.addEventListener("input", () => {
      if (checked && !api?.isAwaitingNext?.()) {
        checked = null;
        const pr = $("btnSchreibPruefen");
        if (pr) pr.textContent = "✔ Prüfen";
      }
    });
  }
  // 2026-11-17: Satzzeichen prüfen an/aus
  const chk = $("chkSchreibZeichen");
  if (chk) {
    chk.checked = getZeichenPruefen();
    chk.addEventListener("change", () => setZeichenPruefen(chk.checked));
  }
  applyModeUi();
  updateStats();
}

// neue Karte gezeigt / показана новая карточка
export function schreibenNeueKarte(it) {
  current = it;
  resetBox();
  applyModeUi();
  focusInput();
}

// neue Lern-Sitzung / новая сессия
export function schreibenNeueSitzung() {
  stats = leereStats();
  updateStats();
}
