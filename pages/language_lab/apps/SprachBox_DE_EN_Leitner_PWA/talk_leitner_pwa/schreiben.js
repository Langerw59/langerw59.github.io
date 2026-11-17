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
let stats = { richtig: 0, fast: 0, falsch: 0 };

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
        ops.push({ t: a === b ? "ok" : (sub < 1 ? "typo" : "wrong"), target: a, typed: b, ti: i - 1 });
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

  // Zuordnung Vergleichswort → Anzeigewort (gleiche Anzahl, wenn keine Kurzformen)
  const disp = displayTokens(targetText);
  const sameCount = disp.length === tWords.length;

  const parts = [];
  if (urteil === "richtig") {
    return { urteil, html: `<span class="sbOk">${esc(String(targetText).trim())}</span>`, fehler: 0 };
  }
  for (const o of ops) {
    const shown = sameCount && o.ti != null ? disp[o.ti] : o.target;
    if (o.t === "ok") parts.push(`<span class="sbOk">${esc(shown)}</span>`);
    else if (o.t === "typo") {
      // Satzzeichen vorn/hinten behalten, Buchstaben vergleichen / знаки препинания оставить, буквы сравнить
      const mm = String(shown).match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u) || ["", "", shown, ""];
      const core = compareWords(mm[2]).join("") === o.target ? mm[2] : o.target;
      parts.push(`<span class="sbTypo" title="Du: ${esc(o.typed)}">${esc(mm[1])}${letterDiff(core, o.typed)}${esc(mm[3])}</span><span class="sbYou">(${esc(o.typed)})</span>`);
    }
    else if (o.t === "wrong") parts.push(`<span class="sbBad">${esc(shown)}</span><span class="sbYou"><s>${esc(o.typed)}</s></span>`);
    else if (o.t === "missing") parts.push(`<span class="sbMiss" title="fehlt">${esc(shown)}</span>`);
    else if (o.t === "extra") parts.push(`<span class="sbYou"><s>${esc(o.typed)}</s></span>`);
  }
  return { urteil, html: parts.join(" "), fehler: fehler.length };
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

function updateStats() {
  const el = $("lblSchreibStats");
  if (el) el.textContent = `✅ ${stats.richtig} · 🟡 ${stats.fast} · ❌ ${stats.falsch}`;
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
  stats[r.urteil] += 1;
  updateStats();

  const titel = {
    richtig: "✅ Richtig! / Правильно!",
    fast: "🟡 Fast richtig! / Почти правильно – маленькая опечатка",
    falsch: "❌ Noch nicht richtig / Пока неправильно",
  }[r.urteil];
  if (res) {
    res.className = "schreibErgebnis is-" + r.urteil;
    res.innerHTML = `<div class="sbTitel">${titel}</div><div class="sbZeile">${r.html}</div>`;
  }
  if (inp) inp.disabled = false;
  const pr = $("btnSchreibPruefen");
  if (pr) pr.textContent = r.urteil === "falsch" ? "↵ Weiter (nicht gewusst)" : "↵ Weiter (gewusst)";

  // Antwort zeigen und Bewertung vorschlagen / показать ответ и подсказать оценку
  api?.flipToAnswer?.();
  const gut = r.urteil !== "falsch";
  $("btnYes")?.classList.toggle("sbVorschlag", gut);
  $("btnNo")?.classList.toggle("sbVorschlag", !gut);
}

// Enter: 1× prüfen · 2× bewerten (nach Vorschlag) und nächste Karte
// RU: Enter: 1-й раз – проверить, 2-й – оценить (как подсказано) и следующая карточка.
//     Если хотите оценить иначе – нажмите «Gewusst»/«Nicht gewusst» мышкой.
function onEnter() {
  if (!checked) return doCheck();
  if (!api?.isAwaitingNext?.()) api?.grade?.(checked.urteil !== "falsch");
  api?.next?.();
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
  stats = { richtig: 0, fast: 0, falsch: 0 };
  updateStats();
}
