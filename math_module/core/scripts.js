// ===========================
// DE: Gemeinsames Verhalten für Level-System
// EN: Shared behavior for the level system
// RU: ÐžÐ±Ñ‰Ð°Ñ Ð»Ð¾Ð³Ð¸ÐºÐ° Ð´Ð»Ñ ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹ ÑƒÑ€Ð¾Ð²Ð½ÐµÐ¹
// ===========================
function getModuleRoot() {
  // Prefer the script URL so it works whether the app is hosted at /
  // or under a sub-path (e.g. /math_module).
  const script = document.currentScript;
  if (script && script.src) {
    try {
      const url = new URL(script.src, window.location.origin);
      return url.pathname.replace(/\/core\/scripts\.js(?:\\?.*)?$/, '');
    } catch (_) { /* fall through */ }
  }
  const p = window.location.pathname;
  const idx = p.indexOf('/math_module/');
  if (idx !== -1) return p.slice(0, idx) + '/math_module';
  const parts = p.split('/');
  parts.pop(); // drop file
  const root = parts.join('/') || '.';
  return root;
}
const MODULE_ROOT = getModuleRoot();

const basePath = window.location.pathname.includes('/levels/') ? '..' : '.';
const PROGRESS_KEY = 'math_module_progress_v1';
const ATTEMPTS_KEY = 'math_module_attempts_v1';
const STATE_VERSION = 2;
const USER_SESSION_KEY = 'll_user_name_session';
const PLAYER_NAME_KEY = 'll_playerName';
const TEAM_ID_KEY = 'll_teamId';
const WELCOME_SHOWN_KEY = 'll_welcome_shown';
const GAME_ACTIVE_KEY = 'll_game_active';
const SLIDE_KEY = 'math_module_slide_v1';
const GENERATED_KEY = 'math_module_generated_tasks_v1';
const TIMER_KEY = 'math_module_timer_v1';
const AVATAR_KEY = 'math_module_avatar_v1';
const THEME_KEY = 'math_module_theme_v1';
const BONUS_STORE_KEY = 'math_module_bonus_store_v1';
const BONUS_STEP_SECONDS = 60; // Bonus-Berechnung pro Minute Restzeit
const BONUS_POINTS_PER_STEP = 2;
const BONUS_JAR_CAP = 120;
// 2026-11-25: Grundschule ohne Zeitdruck – der Zeitmodus ist aus (für ältere Klassen später wieder an)
const OHNE_ZEITMODUS = true;
let timerInterval = null;
let toastHideTimeout = null;

// Asset root (funktioniert mit file:// und Server)
// Zeigt auf das Modul selbst, damit assets unter /math_module/assets/ gefunden werden
const SITE_ROOT = MODULE_ROOT || '.';

function normalizeAsset(path) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/assets/')) return `${SITE_ROOT}${path}`;
  if (path.startsWith('/')) return path; // already root-absolute (outside assets)
  return `${SITE_ROOT}/${path.replace(/^\/+/, '')}`;
}

function canonicalTheme(path) {
  if (!path) return '';
  const name = path.split('/').pop();
  const match = THEMES.find(t => t.endsWith(name));
  return match || '';
}

// Asset catalogs (absolute URLs from site root)
const AVATARS = [
  `${SITE_ROOT}/assets/avatars/pinguin.jpg`,
  `${SITE_ROOT}/assets/avatars/panda.jpg`,
  `${SITE_ROOT}/assets/avatars/frosch.jpg`,
  `${SITE_ROOT}/assets/avatars/eichhoernchen.jpg`,
  `${SITE_ROOT}/assets/avatars/tigr.jpg`,
];

const THEMES = [
  `${SITE_ROOT}/assets/themes/penguin.jpg`,
  `${SITE_ROOT}/assets/themes/panda.jpg`,
  `${SITE_ROOT}/assets/themes/frog.jpg`,
  `${SITE_ROOT}/assets/themes/squirrel.jpg`,
  `${SITE_ROOT}/assets/themes/tigr.jpg`,
];
const TEAM_NAMES = ['Pinguin', 'Panda', 'Frosch', 'Eichhörnchen', 'Tiger'];
const TEAM_TONES = [
  { accent: '#3b82f6', accentStrong: '#1d4ed8', onAccent: '#ffffff', accentSoft: '#e0ecff', accentBorder: '#b6ccff' },
  { accent: '#f59e0b', accentStrong: '#b45309', onAccent: '#ffffff', accentSoft: '#fff2d8', accentBorder: '#f5d39a' },
  { accent: '#22c55e', accentStrong: '#15803d', onAccent: '#ffffff', accentSoft: '#defbe8', accentBorder: '#b6edc8' },
  { accent: '#06b6d4', accentStrong: '#0e7490', onAccent: '#ffffff', accentSoft: '#ddf7fd', accentBorder: '#a7e9f6' },
  { accent: '#ef4444', accentStrong: '#b91c1c', onAccent: '#ffffff', accentSoft: '#ffe1e1', accentBorder: '#f8b5b5' },
];

// Keep theme in sync with avatar by index (fallback: random theme)
function themeForAvatar(avatarPath) {
  const idx = AVATARS.indexOf(avatarPath);
  if (idx >= 0 && THEMES[idx]) return THEMES[idx];
  return pickRandom(THEMES);
}

function setAvatarAndThemeByIndex(idx) {
  const avatar = AVATARS[idx % AVATARS.length];
  setAvatar(avatar); // setAvatar handles paired theme
}

function teamNameForAvatar(avatarPath) {
  const idx = AVATARS.indexOf(normalizeAsset(avatarPath));
  return TEAM_NAMES[idx] || 'Avatar';
}

function applyTeamToneByAvatar(avatarPath) {
  const idx = AVATARS.indexOf(normalizeAsset(avatarPath));
  const tone = TEAM_TONES[idx] || TEAM_TONES[0];
  const root = document.documentElement;
  if (!root || !tone) return;
  root.style.setProperty('--team-accent', tone.accent);
  root.style.setProperty('--team-accent-strong', tone.accentStrong);
  root.style.setProperty('--team-on-accent', tone.onAccent);
  root.style.setProperty('--team-accent-soft', tone.accentSoft);
  root.style.setProperty('--team-accent-border', tone.accentBorder);
}


// DE: Kurze Hinweise pro Level (UI nur DE/EN)
// EN: Short hints per level (UI DE/EN only)
// RU: ÐŸÐ¾Ð´ÑÐºÐ°Ð·ÐºÐ¸ ÑƒÑ€Ð¾Ð²Ð½Ñ (Ð´Ð»Ñ UI Ð±ÐµÐ· Ñ€ÑƒÑÑÐºÐ¾Ð³Ð¾ Ñ‚ÐµÐºÑÑ‚Ð°)
const LEVEL_HINTS = {
  '0': 'Plus und Minus bis 10: Nimm die Finger oder die Punkte zu Hilfe.',
  '1': 'Plus bis 20: zuerst bis 10 auffüllen, dann den Rest dazu.',
  '2': 'Minus bis 20: zuerst bis 10 zurück, dann weiter.',
  '3': 'Bis 100: zuerst die Zehner rechnen, dann die Einer.',
  '4': 'Das Einmaleins: 5 · 6 ist 5 mal die 6. Tipp: Kernaufgaben 2 ·, 5 ·, 10 · kennst du schon.',
  '5': 'Geteilt: Frag dich: Wie oft passt die Zahl hinein? Das Einmaleins hilft.',
  '6': 'Bis 1000: Hunderter, Zehner und Einer einzeln rechnen.',
  '7': 'Mit Zehnern: 30 · 4 ist wie 3 · 4, nur zehnmal so viel. Punkt vor Strich!',
  '8': 'Mit Rest: Wie oft passt die Zahl hinein? Was übrig bleibt, ist der Rest.',
  '9': 'Große Zahlen: schriftlich untereinander rechnen – Einer unter Einer.',
  '10': 'Schriftlich malnehmen: von rechts nach links, den Übertrag merken.',
  '11': 'Schriftlich teilen: von links nach rechts, Stelle für Stelle.',
};

// DE: Laufende Level-Stats für Pop-ups
// EN: Current level stats for popups
// RU: Ð¢ÐµÐºÑƒÑ‰Ð°Ñ ÑÑ‚Ð°Ñ‚Ð¸ÑÑ‚Ð¸ÐºÐ° ÑƒÑ€Ð¾Ð²Ð½Ñ Ð´Ð»Ñ Ð¼Ð¾Ð´Ð°Ð»Ð¾Ðº
let currentLevelStats = null;
let bonusJarFlashTimeout = null;
let lastBonusEarned = 0;

// DE: Einfacher Drag-Support für Modalfenster
// EN: Simple drag support for modal windows
// RU: ÐŸÑ€Ð¾ÑÑ‚Ð¾Ðµ Ð¿ÐµÑ€ÐµÑ‚Ð°ÑÐºÐ¸Ð²Ð°Ð½Ð¸Ðµ Ð¼Ð¾Ð´Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð¾ÐºÐ¾Ð½
function makeDraggable(box, handle) {
  if (!box || !handle) return;
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;
  const start = ev => {
    dragging = true;
    const rect = box.getBoundingClientRect();
    offsetX = ev.clientX - rect.left;
    offsetY = ev.clientY - rect.top;
    box.style.transform = 'none';
    box.style.left = `${rect.left}px`;
    box.style.top = `${rect.top}px`;
  };
  const move = ev => {
    if (!dragging) return;
    box.style.left = `${ev.clientX - offsetX}px`;
    box.style.top = `${ev.clientY - offsetY}px`;
  };
  const stop = () => { dragging = false; };
  handle.addEventListener('mousedown', start);
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stop);
}

function ensureModal(id, titleText = 'Info') {
  let overlay = document.getElementById(id);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = id;
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-window" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        <div class="modal-header">
          <h3 id="${id}-title"></h3>
          <button type="button" class="modal-close" aria-label="Schließen" data-de="Schließen" data-en="Close">×</button>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', ev => {
      if (ev.target === overlay) overlay.classList.remove('is-visible');
    });
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('is-visible'));
    const box = overlay.querySelector('.modal-window');
    const header = overlay.querySelector('.modal-header');
    makeDraggable(box, header);
  }
  const h3 = overlay.querySelector('h3');
  if (h3) h3.textContent = titleText;
  const body = overlay.querySelector('.modal-body');
  return { overlay, body };
}

function openModal(id, titleText, html) {
  const { overlay, body } = ensureModal(id, titleText);
  if (body) body.innerHTML = html;
  applyBilingualLabels(overlay);
  overlay.classList.add('is-visible');
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('is-visible');
}

const BG_ONLY_CLASS = 'background-only';
const BG_ONLY_LAYER_ID = 'bgOnlyExitLayer';
let bgOnlyBound = false;
let bgOnlyActive = false;
let bgOnlyRestores = [];

function detectBackgroundHost() {
  const bodyBg = window.getComputedStyle(document.body).backgroundImage;
  if (bodyBg && bodyBg !== 'none') return document.body;
  const nodes = Array.from(document.body.querySelectorAll('*'));
  for (const el of nodes) {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') return el;
  }
  return document.body;
}

function ensureBgOnlyExitLayer() {
  let layer = document.getElementById(BG_ONLY_LAYER_ID);
  if (!layer) {
    layer = document.createElement('div');
    layer.id = BG_ONLY_LAYER_ID;
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    layer.addEventListener('click', () => disableBackgroundOnly());
    layer.addEventListener('touchstart', () => disableBackgroundOnly(), { passive: true });
  }
  return layer;
}

function collectBgOnlyTargets(layer, backgroundHost) {
  const set = new Set();
  const children = Array.from(document.body.children);
  children.forEach(el => {
    if (el === layer) return;
    // 2026-11-26: das Bild selbst NICHT verstecken (sonst bleibt nur das verschwommene)
    if (el.id === 'mmBild' || el.id === 'mmBildUnscharf') return;
    if (backgroundHost !== document.body && el === backgroundHost) return;
    set.add(el);
  });
  if (backgroundHost && backgroundHost !== document.body) {
    Array.from(backgroundHost.querySelectorAll('*')).forEach(el => set.add(el));
  }
  return Array.from(set);
}

function disableBackgroundOnly() {
  if (!bgOnlyActive) return;
  bgOnlyRestores.forEach(({ el, visibility, pointerEvents }) => {
    el.style.visibility = visibility;
    el.style.pointerEvents = pointerEvents;
  });
  bgOnlyRestores = [];
  bgOnlyActive = false;
  document.body.classList.remove(BG_ONLY_CLASS);
}

function enableBackgroundOnly() {
  if (bgOnlyActive) return;
  const layer = ensureBgOnlyExitLayer();
  document.body.appendChild(layer);
  const backgroundHost = detectBackgroundHost();
  bgOnlyRestores = [];
  collectBgOnlyTargets(layer, backgroundHost).forEach(el => {
    bgOnlyRestores.push({
      el,
      visibility: el.style.visibility || '',
      pointerEvents: el.style.pointerEvents || '',
    });
    el.style.visibility = 'hidden';
    el.style.pointerEvents = 'none';
  });
  bgOnlyActive = true;
  document.body.classList.add(BG_ONLY_CLASS);
}

function initBackgroundOnly() {
  if (bgOnlyBound) return;
  document.addEventListener('keydown', ev => {
    if (ev.key !== 'Escape') return;
    if (!bgOnlyActive) return;
    ev.preventDefault();
    disableBackgroundOnly();
  });
  bgOnlyBound = true;
}

function isVisible(el) {
  if (!el) return false;
  if (el.hidden) return false;
  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
  if (el.offsetParent !== null) return true;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function findVisible(selectorList, root = document) {
  const selectors = Array.isArray(selectorList) ? selectorList : [selectorList];
  for (const sel of selectors) {
    const nodes = root.querySelectorAll(sel);
    for (const node of nodes) {
      if (isVisible(node)) return node;
    }
  }
  return null;
}

function findVisibleConfirmButton(root) {
  const byId = findVisible(
    ['#name-submit', '#name-confirm', '#start', '#ok', '#confirm', '[data-action="confirm"]'],
    root
  );
  if (byId) return byId;
  const candidates = Array.from(root.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"]'));
  return candidates.find(el => {
    if (!isVisible(el)) return false;
    const txt = ((el.textContent || el.value || '').trim()).toLowerCase();
    return /weiter|ok|start|bestätigen|bestaetigen|continue|confirm|los/.test(txt);
  }) || null;
}

function getActiveWelcomePopup() {
  const byId = document.getElementById('name-modal-backdrop');
  if (byId && byId.classList.contains('is-visible') && isVisible(byId)) return byId;
  const modalCandidates = Array.from(document.querySelectorAll('[role="dialog"], .modal, .popup, .dialog, .name-modal, [id*="welcome" i], [id*="modal" i]'));
  return modalCandidates.find(el => {
    if (!isVisible(el)) return false;
    return !!findVisible(
      ['#name-input', '#playerName', '#name', 'input[name="name"]', '.team-picker', '#team-picker'],
      el
    );
  }) || null;
}

function initWelcomeEnterHandler() {
  if (window.__LL_ENTER_HANDLER_INSTALLED) return;
  window.__LL_ENTER_HANDLER_INSTALLED = true;
  document.addEventListener('keydown', ev => {
    if (ev.key !== 'Enter') return;
    const popup = getActiveWelcomePopup();
    if (!popup) return;
    const active = document.activeElement;
    if (active && (active.tagName === 'TEXTAREA' || active.isContentEditable)) return;

    const nameInput = findVisible(
      ['#name-input', '#playerName', '#name', 'input[name="name"]', 'input[type="text"]', 'input[type="search"]', 'input[placeholder*="Name" i]', 'input[aria-label*="Name" i]'],
      popup
    );
    const confirmBtn = findVisibleConfirmButton(popup);
    if (!confirmBtn) return;

    const hasTeamPicker = !!findVisible(['#team-picker', '.team-picker'], popup);
    const hasTeamSelected = !!findVisible(['#team-picker input[type="radio"]:checked', '.team-picker input[type="radio"]:checked'], popup);
    const focusInsidePopup = !active || popup.contains(active) || active === document.body;
    if (!focusInsidePopup) return;

    const isNameContext = !!nameInput;
    const shouldConfirmTeam = !hasTeamPicker || hasTeamSelected;
    if (!isNameContext && !shouldConfirmTeam) return;

    ev.preventDefault();
    confirmBtn.click();
  }, true);
}

function escapeHtml(text) {
  return (text || '')
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyBilingualLabels(root = document) {
  const host = root && root.querySelectorAll ? root : document;
  const nodes = [];
  if (host !== document && host.matches && host.matches('[data-de][data-en]')) nodes.push(host);
  host.querySelectorAll('[data-de][data-en]').forEach(el => nodes.push(el));
  nodes.forEach(el => {
    const de = (el.getAttribute('data-de') || '').trim();
    const en = (el.getAttribute('data-en') || '').trim();
    if (!de || !en) return;
    const sig = `${de}||${en}`;
    if (el.dataset.biApplied === sig) return;
    el.innerHTML = `<span class="btn-label"><span class="btn-de">${escapeHtml(de)}</span><span class="btn-en">${escapeHtml(en)}</span></span>`;
    el.setAttribute('aria-label', `${de} (${en})`);
    el.dataset.biApplied = sig;
  });
}


// ===========================
// 2026-11-25: die Sterne ⭐ (1–3 pro Level, das beste Ergebnis zählt, pro Spieler)
// und das Zwanzigerfeld (Bild zum Zählen für Plus/Minus bis 20)
// RU: звёзды за уровень и «поле из 20 точек» как наглядная подсказка
// ===========================
const STERNE_KEY = 'math_module_sterne_v1';
function sterneSpieler() { return normalizePlayerName(getUserName() || localStorage.getItem(PLAYER_NAME_KEY) || 'gast').toLowerCase() || 'gast'; }
function sterneAlle() { try { return JSON.parse(localStorage.getItem(STERNE_KEY) || '{}') || {}; } catch (e) { return {}; } }
function sterneFuer(levelId) { const a = sterneAlle(); return ((a[sterneSpieler()] || {})[String(levelId)]) || 0; }
function sterneSpeichern(levelId, n) {
  const a = sterneAlle(); const sp = sterneSpieler(); a[sp] = a[sp] || {};
  if (n > (a[sp][String(levelId)] || 0)) a[sp][String(levelId)] = n;
  localStorage.setItem(STERNE_KEY, JSON.stringify(a));
}
// 2026-11-25: die Spielerliste – wie im Sprachführer: wählen, umbenennen, löschen.
// Jeder Spieler behält seine Sterne und das zuletzt gespielte Level.
const SPIELER_KEY = 'math_module_spieler_v1';   // [{ name, avatar, theme }]
const ZULETZT_KEY = 'math_module_zuletzt_v1';   // { "philipp": "3" }
function spielerListe() { try { const l = JSON.parse(localStorage.getItem(SPIELER_KEY) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; } }
function spielerSpeichern(l) { localStorage.setItem(SPIELER_KEY, JSON.stringify(l)); }
function spielerMerken(name, avatar, theme) {
  const n = normalizePlayerName(name); if (!n) return;
  const l = spielerListe(); const i = l.findIndex(p => p.name.toLowerCase() === n.toLowerCase());
  const eintrag = { ...(i >= 0 ? l[i] : {}), name: n, avatar: avatar || getAvatar() || AVATARS[0], theme: theme || getTheme() || THEMES[0] };
  if (i >= 0) l[i] = eintrag; else l.push(eintrag);
  spielerSpeichern(l);
}
// 2026-11-26: die Klasse des Spielers (1–4; 5 = „5 oder höher“) – bestimmt das Start-Level
// RU: класс ученика – с какого уровня начинать
const KLASSE_START = { 1: 0, 2: 3, 3: 6, 4: 9, 5: 9 };
function klasseFuer(name) {
  const n = String(name || getUserName() || '').toLowerCase();
  const p = spielerListe().find(x => x.name.toLowerCase() === n);
  return p && p.klasse ? Number(p.klasse) : null;
}
function klasseSetzen(name, k) {
  const n = String(name || '').toLowerCase();
  const l = spielerListe().map(p => (p.name.toLowerCase() === n ? { ...p, klasse: Number(k) } : p));
  spielerSpeichern(l);
}
function klasseText(k) { return k >= 5 ? '5. Klasse oder höher' : `${k}. Klasse`; }
function levelKlasse(id) {
  const l = mmLevelListe().find(x => String(x.level ?? x.id) === String(id));
  return l && l.klasse ? Number(l.klasse) : null;
}
// Start-Level: zuletzt gespielt, sonst das erste Level der eigenen Klasse ohne 3 Sterne
function startLevelFuer(name) {
  const z = zuletztFuer(name);
  if (z !== undefined && z !== null) return String(z);
  const k = klasseFuer(name);
  if (!k) return '0';
  const kk = Math.min(4, k);
  const eigene = mmLevelListe().filter(x => Number(x.klasse) === kk).map(x => String(x.level ?? x.id));
  const offen = eigene.find(id => sterneFuer(id) < 3);
  return offen || eigene[0] || String(KLASSE_START[k] || 0);
}
function zuletztAlle() { try { return JSON.parse(localStorage.getItem(ZULETZT_KEY) || '{}') || {}; } catch (e) { return {}; } }
function zuletztSetzen(levelId) { const a = zuletztAlle(); a[sterneSpieler()] = String(levelId); localStorage.setItem(ZULETZT_KEY, JSON.stringify(a)); }
function zuletztFuer(name) { return zuletztAlle()[String(name || '').toLowerCase()]; }
function sterneSummeVon(name) { const m = sterneAlle()[String(name || '').toLowerCase()] || {}; return Object.values(m).reduce((a, b) => a + (Number(b) || 0), 0); }
function spielerUmbenennen(alt, neu) {
  neu = normalizePlayerName(neu); if (!neu) return;
  const a = alt.toLowerCase(), b = neu.toLowerCase();
  const l = spielerListe().map(p => (p.name.toLowerCase() === a ? { ...p, name: neu } : p)); spielerSpeichern(l);
  const st = sterneAlle(); if (st[a] && a !== b) { st[b] = st[a]; delete st[a]; localStorage.setItem(STERNE_KEY, JSON.stringify(st)); }
  const z = zuletztAlle(); if (z[a] && a !== b) { z[b] = z[a]; delete z[a]; localStorage.setItem(ZULETZT_KEY, JSON.stringify(z)); }
  if ((getUserName() || '').toLowerCase() === a) setUserName(neu);
}
function spielerLoeschen(name) {
  const a = name.toLowerCase();
  spielerSpeichern(spielerListe().filter(p => p.name.toLowerCase() !== a));
  const st = sterneAlle(); delete st[a]; localStorage.setItem(STERNE_KEY, JSON.stringify(st));
  const z = zuletztAlle(); delete z[a]; localStorage.setItem(ZULETZT_KEY, JSON.stringify(z));
  if ((getUserName() || '').toLowerCase() === a) clearUserName();
}

function sterneSummeZeigen() {
  const el = document.getElementById('sterne-summe');
  if (!el) return;
  const meine = sterneAlle()[sterneSpieler()] || {};
  el.textContent = bruchText(Object.values(meine).reduce((a, b) => a + (Number(b) || 0), 0));
}
function sterneAusProzent(p) { return p >= 90 ? 3 : p >= 70 ? 2 : p >= 40 ? 1 : 0; }
// 2026-11-26: Sterne in Dritteln (z. B. 2⅔) – Punkte je Aufgabe: 1. Versuch 3, 2. Versuch 2, 3. Versuch 1
// RU: звёзды по третям: с 1-й попытки 3 очка, со 2-й – 2, с 3-й – 1
function sternText(n) { const v = Math.round((Number(n) || 0)); return '⭐'.repeat(Math.min(3, v)) + '☆'.repeat(Math.max(0, 3 - v)); }
function bruchText(x) {
  const d = Math.round((Number(x) || 0) * 3); const g = Math.floor(d / 3), r = d % 3;
  return (g || !r ? String(g) : '') + (r === 1 ? '⅓' : r === 2 ? '⅔' : '');
}
function sterneHTML(n) {
  return '<span class="st-reihe" title="' + bruchText(n) + ' von 3 Sternen">' + [0, 1, 2].map(i => {
    const f = Math.max(0, Math.min(1, (Number(n) || 0) - i));
    return `<span class="st" style="--f:${Math.round(f * 100)}%">★</span>`;
  }).join('') + '</span>';
}
function sterneSprechen(x) {
  const d = Math.round(x * 3); const g = Math.floor(d / 3), r = d % 3;
  const teil = r === 1 ? 'ein Drittel' : r === 2 ? 'zwei Drittel' : '';
  if (!g && teil) return `${teil} Stern`;
  if (!teil) return g === 1 ? 'einen Stern' : `${g} Sterne`;
  return `${g} und ${teil} Sterne`;
}

// 2026-11-26: Ton und Sprache – RU: звуки и озвучка
const TON_KEY = 'math_module_ton_v1';
function tonAn() { return localStorage.getItem(TON_KEY) !== '0'; }
let mmAudio = null;
function mmTon(noten) { // [frequenz, start, dauer, wellenform]
  if (!tonAn()) return;
  try {
    mmAudio = mmAudio || new (window.AudioContext || window.webkitAudioContext)();
    if (mmAudio.state === 'suspended') mmAudio.resume();
    const t0 = mmAudio.currentTime + 0.02;
    noten.forEach(([f, st, d, typ]) => {
      const o = mmAudio.createOscillator(); const g = mmAudio.createGain();
      o.type = typ || 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + st);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + st + d);
      o.connect(g); g.connect(mmAudio.destination);
      o.start(t0 + st); o.stop(t0 + st + d + 0.05);
    });
  } catch (e) { /* ohne Ton weiter */ }
}
function tonRichtig() { mmTon([[660, 0, 0.15], [880, 0.12, 0.3]]); }
function tonFalsch() { mmTon([[260, 0, 0.22, 'triangle'], [200, 0.18, 0.3, 'triangle']]); }
function tonFanfare() { mmTon([[523, 0, 0.16, 'triangle'], [659, 0.16, 0.16, 'triangle'], [784, 0.32, 0.16, 'triangle'], [1047, 0.5, 0.7, 'triangle'], [784, 0.5, 0.7, 'sine'], [659, 0.5, 0.7, 'sine']]); }
function tonSanft() { mmTon([[523, 0, 0.2], [659, 0.2, 0.35]]); }
function sprechen(text) {
  if (!tonAn() || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE'; u.rate = 0.95; u.pitch = 1.1;
    const st = window.speechSynthesis.getVoices().find(v => /^de/i.test(v.lang));
    if (st) u.voice = st;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}
// Sterne fallen vom Himmel – RU: падающие звёздочки
function sterneRegen(anzahl = 40) {
  const box = document.createElement('div');
  box.className = 'sterne-regen';
  for (let i = 0; i < anzahl; i += 1) {
    const s = document.createElement('span');
    s.textContent = ['⭐', '🌟', '✨', '🎉'][i % 4];
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 1.5}s`;
    s.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    s.style.fontSize = `${18 + Math.random() * 26}px`;
    box.appendChild(s);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

function zwanzigerfeld(text) {
  const m = String(text).match(/(\d+)\s*([+\-])\s*(\d+|\?)\s*=\s*(\d+)?/);
  if (!m) return '';
  const a = Number(m[1]); const op = m[2];
  const b = m[3] === '?' ? (Number(m[4]) - a) : Number(m[3]);
  if (!(a >= 0 && b >= 0) || a > 20 || (op === '+' && a + b > 20)) return '';
  const punkte = [];
  if (op === '+') {
    for (let i = 0; i < a; i++) punkte.push('rot');
    for (let i = 0; i < b; i++) punkte.push(m[3] === '?' ? 'frage' : 'blau');
  } else {
    for (let i = 0; i < a; i++) punkte.push(i >= a - b ? 'weg' : 'rot');
  }
  while (punkte.length < 20) punkte.push('leer');
  const reihe = (r) => punkte.slice(r * 10, r * 10 + 10).map((k, i) => `<span class="zf-p zf-${k}${i === 4 ? ' zf-fuenf' : ''}"></span>`).join('');
  return `<div class="zf"><div class="zf-reihe">${reihe(0)}</div><div class="zf-reihe">${reihe(1)}</div></div>`;
}

// 2026-11-25: die Rennbahn – das Tier läuft mit jeder gelösten Aufgabe ein Stück vom Start zum Ziel
// RU: беговая дорожка – зверёк бежит к финишу с каждой решённой задачей
function rennbahn(geloest, gesamt) {
  const host = document.getElementById('tasks');
  if (!host || !gesamt) return;
  let bahn = document.getElementById('mmRennbahn');
  if (!bahn) {
    bahn = document.createElement('div');
    bahn.id = 'mmRennbahn';
    bahn.innerHTML = '<span class="rb-start">🚩</span><div class="rb-strecke"><div class="rb-spur"></div><img class="rb-tier" alt=""></div><span class="rb-ziel">🏁</span>';
    host.parentNode.insertBefore(bahn, host);
  }
  const anteil = Math.max(0, Math.min(1, geloest / gesamt));
  const tier = bahn.querySelector('.rb-tier');
  tier.src = getAvatar() || AVATARS[0];
  tier.style.left = `calc(${anteil * 100}% - ${anteil * 44}px)`;
  bahn.querySelector('.rb-spur').style.width = `${anteil * 100}%`;
  bahn.querySelector('.rb-ziel').textContent = anteil >= 1 ? '🏆' : '🏁';
  bahn.classList.toggle('rb-fertig', anteil >= 1);
  bahn.title = `${geloest} von ${gesamt} Aufgaben gelöst`;
}

// 2026-11-25: Aufgabe vorlesen (deutsche Stimme) und das Maskottchen bewegen
function aufgabeSprechbar(text) {
  return String(text)
    .replace(/(\d)\s+:\s+(\d)/g, '$1 geteilt durch $2')
    .replace(/:/g, ', ')
    .replace(/·|×|\*/g, ' mal ').replace(/÷/g, ' geteilt durch ')
    .replace(/\+/g, ' plus ').replace(/(\d)\s*-\s*(\d)/g, '$1 minus $2')
    .replace(/(^|[\s(+\-=])\?(?=\s|$)/g, '$1 wie viel ')
    .replace(/=\s*$/, ' gleich wie viel').replace(/=/g, ' gleich ')
    .replace(/\?/g, '.').replace(/\s+/g, ' ').trim();
}
function vorlesen(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(aufgabeSprechbar(text));
  u.lang = 'de-DE'; u.rate = 0.9;
  const st = window.speechSynthesis.getVoices().find(v => /^de/i.test(v.lang));
  if (st) u.voice = st;
  window.speechSynthesis.speak(u);
}
document.addEventListener('click', (ev) => {
  const b = ev.target.closest && ev.target.closest('[data-action="vorlesen"]');
  if (!b) return;
  const p = b.closest('p');
  const t = p ? p.textContent.replace(/^Aufgabe\s*\d+:\s*/, '').replace('🔊', '') : '';
  vorlesen(t);
});
function maskottchen(art) {
  document.querySelectorAll('#welcome .avatar-img').forEach(img => {
    img.classList.remove('huepf', 'wackel'); void img.offsetWidth; img.classList.add(art);
  });
}

function resolveTheme(themeUrl) {
  const resolved = canonicalTheme(themeUrl);
  if (resolved) return resolved;
  const paired = canonicalTheme(themeForAvatar(getAvatar() || AVATARS[0]));
  return paired || THEMES[0];
}

function applyTheme(themeUrl) {
  // 2026-11-25: das Bild wird GANZ gezeigt (nicht vergrößert/abgeschnitten).
  // Die Ränder füllt dasselbe Bild – stark verschwommen – im Hintergrund.
  // RU: картинка целиком, края заполняет та же картинка, размытая.
  const resolved = resolveTheme(themeUrl);
  const dunkel = document.documentElement.getAttribute('data-theme') === 'dark';
  let unscharf = document.getElementById('mmBildUnscharf');
  if (!unscharf) {
    unscharf = document.createElement('div');
    unscharf.id = 'mmBildUnscharf';
    unscharf.setAttribute('aria-hidden', 'true');
    document.body.prepend(unscharf);
  }
  let scharf = document.getElementById('mmBild');
  if (!scharf) {
    scharf = document.createElement('div');
    scharf.id = 'mmBild';
    scharf.setAttribute('aria-hidden', 'true');
    unscharf.after(scharf);
  }
  unscharf.style.backgroundImage = `url(${resolved})`;
  unscharf.style.filter = `blur(28px) brightness(${dunkel ? 0.45 : 0.8})`;
  scharf.style.backgroundImage = `url(${resolved})`;
  scharf.style.filter = dunkel ? 'brightness(0.7)' : 'none';
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#0b1224';
  document.body.classList.toggle('mm-dunkel', dunkel);
  if (!window.__mmThemeBeobachter) {
    window.__mmThemeBeobachter = new MutationObserver(() => applyTheme(getTheme()));
    window.__mmThemeBeobachter.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
  applyTeamToneByAvatar(getAvatar() || AVATARS[0]);
}

// ===========================
// DE: Benutzername via Session + Modal
// EN: Username via session + modal
// RU: Ð˜Ð¼Ñ Ñ‡ÐµÑ€ÐµÐ· ÑÐµÑÑÐ¸ÑŽ Ð¸ Ð¼Ð¾Ð´Ð°Ð»
// ===========================
function purgeOldNameStorage() {
  localStorage.removeItem('ll_user_name');
  localStorage.removeItem('ll_user_name_session');
}

function normalizePlayerName(name) {
  const raw = (name || '').toString().trim();
  if (!raw) return '';
  const lower = raw.toLocaleLowerCase('de-DE');
  return lower.charAt(0).toLocaleUpperCase('de-DE') + lower.slice(1);
}

function getUserName() {
  const stored = sessionStorage.getItem(USER_SESSION_KEY) || '';
  const normalized = normalizePlayerName(stored);
  if (stored !== normalized) {
    if (normalized) {
      sessionStorage.setItem(USER_SESSION_KEY, normalized);
    } else {
      sessionStorage.removeItem(USER_SESSION_KEY);
    }
  }
  return normalized;
}

function setUserName(name) {
  const normalized = normalizePlayerName(name);
  if (!normalized) return;
  localStorage.setItem(PLAYER_NAME_KEY, normalized);
  sessionStorage.setItem(USER_SESSION_KEY, normalized);
  renderWelcome();
}

function clearUserName() {
  localStorage.removeItem(PLAYER_NAME_KEY);
  sessionStorage.removeItem(USER_SESSION_KEY);
}

function isGameActive() {
  return sessionStorage.getItem(GAME_ACTIVE_KEY) === '1';
}

function markGameActive(active) {
  if (active) {
    sessionStorage.setItem(GAME_ACTIVE_KEY, '1');
  } else {
    sessionStorage.removeItem(GAME_ACTIVE_KEY);
  }
}

function markWelcomeShown() {
  sessionStorage.setItem(WELCOME_SHOWN_KEY, '1');
}

function clearWelcomeShown() {
  sessionStorage.removeItem(WELCOME_SHOWN_KEY);
}

function resetGameState() {
  resetCurrentProfileBonus();
  clearUserName();
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
  localStorage.removeItem(TIMER_KEY);
  localStorage.removeItem(SLIDE_KEY);
  localStorage.removeItem(GENERATED_KEY);
  localStorage.removeItem(AVATAR_KEY);
  localStorage.removeItem(THEME_KEY);
  localStorage.removeItem(TEAM_ID_KEY);
  localStorage.removeItem(PLAYER_NAME_KEY);
  localStorage.removeItem('math_module_levels_cache');
  sessionStorage.removeItem(USER_SESSION_KEY);
  markGameActive(false);
  clearWelcomeShown();
  renderBonusJar(false);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getAvatar() {
  const val = localStorage.getItem(AVATAR_KEY) || '';
  return normalizeAsset(val);
}

function setAvatar(path) {
  const abs = normalizeAsset(path);
  localStorage.setItem(AVATAR_KEY, abs);
  const idx = AVATARS.indexOf(abs);
  if (idx >= 0) localStorage.setItem(TEAM_ID_KEY, String(idx));
  applyTeamToneByAvatar(abs);
  const paired = themeForAvatar(abs);
  setTheme(paired);
  document.dispatchEvent(new Event('avatar-theme-updated'));
}

function getTheme() {
  return canonicalTheme(localStorage.getItem(THEME_KEY) || '');
}

function setTheme(path) {
  const resolved = canonicalTheme(path);
  if (!resolved) return;
  localStorage.setItem(THEME_KEY, resolved);
}

function hasValidTeamId(value) {
  const idx = Number.parseInt(String(value ?? ''), 10);
  return Number.isInteger(idx) && idx >= 0 && idx < AVATARS.length;
}

function hasProfile() {
  const storedTeamId = localStorage.getItem(TEAM_ID_KEY);
  if (hasValidTeamId(storedTeamId)) return true;
  const storedAvatar = normalizeAsset(localStorage.getItem(AVATAR_KEY) || '');
  return AVATARS.includes(storedAvatar);
}

function loadBonusStore() {
  try {
    return JSON.parse(localStorage.getItem(BONUS_STORE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

function saveBonusStore(store) {
  localStorage.setItem(BONUS_STORE_KEY, JSON.stringify(store || {}));
}

function getBonusProfileId() {
  const name = normalizePlayerName(getUserName() || localStorage.getItem(PLAYER_NAME_KEY) || 'gast').toLowerCase();
  const teamIdRaw = localStorage.getItem(TEAM_ID_KEY);
  let teamId = hasValidTeamId(teamIdRaw) ? Number.parseInt(teamIdRaw, 10) : -1;
  if (teamId < 0) {
    const idx = AVATARS.indexOf(normalizeAsset(localStorage.getItem(AVATAR_KEY) || ''));
    teamId = idx >= 0 ? idx : 0;
  }
  return `${teamId}:${name || 'gast'}`;
}

function getProfileBonusPoints() {
  const store = loadBonusStore();
  const key = getBonusProfileId();
  return Math.max(0, Number(store[key] || 0) || 0);
}

function setProfileBonusPoints(points) {
  const store = loadBonusStore();
  const key = getBonusProfileId();
  store[key] = Math.max(0, Math.round(points || 0));
  saveBonusStore(store);
  renderBonusJar(false);
}

function addProfileBonusPoints(delta) {
  const add = Math.max(0, Math.round(delta || 0));
  if (!add) return 0;
  const next = getProfileBonusPoints() + add;
  lastBonusEarned = add;
  setProfileBonusPoints(next);
  // 2026-11-25: keine Spardose-Meldung mehr (Grundschule: nur Sterne)
  renderBonusJar(true);
  return add;
}

function addBonusPoints(delta) {
  return addProfileBonusPoints(delta);
}

function resetCurrentProfileBonus() {
  const store = loadBonusStore();
  const key = getBonusProfileId();
  if (key in store) {
    delete store[key];
    saveBonusStore(store);
  }
  lastBonusEarned = 0;
  renderBonusJar(false);
}

function renderBonusJar(pop = false, overridePoints = null) {
  const pointsEl = document.getElementById('bonus-points');
  const fillEl = document.getElementById('bonus-jar-fill');
  const wrapEl = document.getElementById('bonus-widget');
  const points = overridePoints !== null ? Math.max(0, Math.round(overridePoints || 0)) : getProfileBonusPoints();
  if (pointsEl) pointsEl.textContent = String(points);
  if (fillEl) {
    const pct = Math.max(0, Math.min(100, (points / BONUS_JAR_CAP) * 100));
    fillEl.style.height = `${pct}%`;
  }
  if (!pop || !wrapEl) return;
  wrapEl.classList.add('pop');
  if (bonusJarFlashTimeout) clearTimeout(bonusJarFlashTimeout);
  bonusJarFlashTimeout = setTimeout(() => wrapEl.classList.remove('pop'), 260);
}

function openBonusInfoModal() {
  const balance = getProfileBonusPoints();
  const last = lastBonusEarned;
  const recent = currentLevelStats ? ((currentLevelStats.timeBonusPoints || 0) + (currentLevelStats.lifeBonusPoints || 0)) : last;
  const timePart = currentLevelStats ? `${currentLevelStats.timeBonusPoints || 0} Zeit` : '–';
  const lifePart = currentLevelStats ? `${currentLevelStats.lifeBonusPoints || 0} Leben` : '–';
  const html = `
    <div class="bonus-modal-body">
      <p>Dein Punkteglas enthält aktuell <strong>${balance}</strong> Bonuspunkte.</p>
      <ul class="bonus-breakdown">
        <li>Letzte Gutschrift: <strong>${recent || 0}</strong> (Zeit: ${timePart}, Leben: ${lifePart})</li>
        <li>So sammelst du Punkte: Zeitmodus aktiv lassen und Aufgaben mit möglichst wenigen Versuchen lösen.</li>
        <li>Die Punkte bleiben pro Spielerprofil gespeichert.</li>
      </ul>
      <button type="button" class="pill btn-secondary" id="bonus-reset-btn">Punkteglas leeren</button>
    </div>`;
  const { overlay } = ensureModal('bonus-modal', 'Punkteglas / Spardose');
  if (overlay) {
    const body = overlay.querySelector('.modal-body');
    if (body) body.innerHTML = html;
    const resetBtn = overlay.querySelector('#bonus-reset-btn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        resetCurrentProfileBonus();
        showToast('Punkteglas geleert', 'warn');
        closeModal('bonus-modal');
      };
    }
    overlay.classList.add('is-visible');
  }
}

function getNavigationType() {
  const nav = performance.getEntriesByType?.('navigation')?.[0];
  if (nav && nav.type) return nav.type;
  if (performance.navigation && performance.navigation.type === 1) return 'reload';
  return 'navigate';
}

function autoOpenWelcomeOnce() {
  purgeOldNameStorage();
  renderWelcome();
  const navType = getNavigationType();
  if (navType === 'reload') {
    clearWelcomeShown();
  }
  if (!sessionStorage.getItem(WELCOME_SHOWN_KEY)) {
    openNameModal();
    return;
  }
  markGameActive(hasProfile());
}

function ensureUserName() {
  autoOpenWelcomeOnce();
}

function renderWelcome() {
  let target = document.getElementById('welcome');
  const header = document.getElementById('header-placeholder');
  const main = document.querySelector('main');
  if (!target) {
    target = document.createElement('div');
    target.id = 'welcome';
    if (main) {
      main.prepend(target);
    } else if (header) {
      header.insertAdjacentElement('afterend', target);
    } else {
      document.body.prepend(target);
    }
  }
  const name = getUserName() || 'Gast';
  let avatar = getAvatar();
  if (!AVATARS.includes(avatar)) avatar = pickRandom(AVATARS);
  let theme = getTheme();
  if (!theme) theme = themeForAvatar(avatar);
  setAvatar(avatar);
  setTheme(theme);
  applyTheme(theme);
  const teamName = teamNameForAvatar(avatar);
  // 2026-11-26: neues Design – eine schmale Leiste oben, alle Knöpfe im Seitenmenü rechts
  // RU: одна тонкая строка сверху, все кнопки – в выдвижном меню справа
  const lvlNow = parseCurrentLevel();
  const lvlTitel = lvlNow !== null ? mmLevelTitel(lvlNow) + (levelKlasse(lvlNow) ? ` · ${levelKlasse(lvlNow)}. Klasse` : '') : 'Mathe-Spaß';
  target.innerHTML = `
    <div class="mm-leiste">
      <button type="button" class="mm-spieler" id="avatar-open" title="Team wählen">
        <img class="avatar-img" src="${avatar}" alt="Avatar" width="34" height="34" />
        <span class="mm-spieler-name">${escapeHtml(name)} <small>· Team ${teamName}</small></span>
      </button>
      <span class="mm-level-chip" title="Aktuelles Level">${escapeHtml(lvlTitel)}</span>
      <span class="mm-sterne" id="sterne-widget" title="Alle Sterne aus allen Levels">⭐ <strong id="sterne-summe">0</strong>&nbsp;/&nbsp;<span id="sterne-max">${mmLevelListe().length * 3}</span></span>
      <button type="button" class="mm-menue-knopf" id="mm-menue-auf" aria-expanded="false" aria-controls="mm-menue">☰ Menü</button>
    </div>
  `;
  mmMenueAufbauen(name);
  document.querySelectorAll('#mmRennbahn .rb-tier').forEach(img => { img.src = avatar; }); // das Tier auf der Rennbahn = eigenes Team
  applyBilingualLabels(target);
  renderBonusJar(false);
  sterneSummeZeigen();
  const bonusWrap = document.getElementById('bonus-widget');
  if (bonusWrap) {
    bonusWrap.setAttribute('role', 'button');
    bonusWrap.setAttribute('tabindex', '0');
    bonusWrap.setAttribute('aria-label', 'Punkteglas öffnen');
    const openBonus = () => openBonusInfoModal();
    bonusWrap.onclick = openBonus;
    bonusWrap.onkeydown = ev => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        openBonus();
      }
    };
  }
  const changeBtn = document.getElementById('change-name');
  if (changeBtn) {
    changeBtn.onclick = () => openNameModal();
  }
  const resetBtn = document.getElementById('reset-player');
  if (resetBtn) {
    resetBtn.onclick = () => {
      resetGameState();
      location.reload();
    };
  }

  const avatarBtn = document.getElementById('avatar-open');
  if (avatarBtn) avatarBtn.onclick = () => openAvatarModal();

  const bgBtn = document.getElementById('bg-open');
  if (bgBtn) bgBtn.onclick = () => openBackgroundModal();
  const bgOnlyBtn = document.getElementById('btnBackgroundOnly');
  if (bgOnlyBtn) bgOnlyBtn.onclick = () => enableBackgroundOnly();

  const hintBtn = document.getElementById('hint-open');
  if (hintBtn) hintBtn.onclick = () => openHintModal();

  const resultsBtn = document.getElementById('open-level-results');
  if (resultsBtn) resultsBtn.onclick = () => {
    if (!currentLevelStats) { openHintModal(); return; }
    const rows = [
      ['Gesamtpunkte', `${currentLevelStats.earned}/${currentLevelStats.max}`],
      ['Prozent', `${currentLevelStats.percent}%`],
      ['Note', currentLevelStats.grade],
      ['Zeitmodus', currentLevelStats.timeModeEnabled ? 'An' : 'Aus'],
      ['Zeitbonus', currentLevelStats.timeModeEnabled ? `${currentLevelStats.timeBonusPoints}/${currentLevelStats.timeBonusMax}` : '–'],
      ['Versuche gesamt', currentLevelStats.attemptsTotal ?? 0],
    ];
    openModal('results-modal', 'Auswertung', renderResultTable(rows));
  };
}

// ===========================
// 2026-11-26: das Seitenmenü (rechts) – RU: выдвижное меню справа
// ===========================
const ENGLISCH_KEY = 'math_module_englisch_v1';
const UEBERSICHT_KEY = 'math_module_uebersicht_v1';
function mmLevelListe() {
  try { const l = JSON.parse(localStorage.getItem('math_module_levels_cache') || '[]'); if (Array.isArray(l) && l.length) return l; } catch (e) {}
  return [...Array(12).keys()].map(i => ({ level: i, klasse: Math.floor(i / 3) + 1, title: `Level ${i}`, description: '' }));
}
function mmLevelTitel(id) {
  const l = mmLevelListe().find(x => String(x.level ?? x.id) === String(id));
  return l ? l.title : `Level ${id}`;
}
function mmLevelStarten(id) {
  resetRun(String(id));
  window.location.href = `${MODULE_ROOT}/levels/level${id}.html`;
}
function mmSchalterAnwenden() {
  document.body.classList.toggle('mm-en', localStorage.getItem(ENGLISCH_KEY) === '1');
  document.body.classList.toggle('mm-uebersicht', localStorage.getItem(UEBERSICHT_KEY) === '1');
}
function mmMenueZu() {
  const m = document.getElementById('mm-menue');
  if (m) m.classList.remove('offen');
  const sch = document.getElementById('mm-menue-schatten');
  if (sch) sch.classList.remove('offen');
  const k = document.getElementById('mm-menue-auf');
  if (k) k.setAttribute('aria-expanded', 'false');
}
function mmMenueAuf() {
  const m = document.getElementById('mm-menue');
  if (!m) return;
  mmLevelKnoepfe();
  m.classList.add('offen');
  const sch = document.getElementById('mm-menue-schatten');
  if (sch) sch.classList.add('offen');
  const k = document.getElementById('mm-menue-auf');
  if (k) k.setAttribute('aria-expanded', 'true');
}
function mmLevelKnoepfe() {
  const host = document.getElementById('mm-level-liste');
  if (!host) return;
  const aktuell = parseCurrentLevel();
  const meine = klasseFuer();
  const liste = mmLevelListe();
  const gruppen = {};
  liste.forEach(l => { const k = Number(l.klasse) || 0; (gruppen[k] = gruppen[k] || []).push(l); });
  host.innerHTML = Object.keys(gruppen).sort((x, y) => x - y).map(k => {
    const istMeine = meine && Math.min(4, meine) === Number(k);
    const knoepfe = gruppen[k].map(l => {
      const id = String(l.level ?? l.id);
      const titel = String(l.title || `Level ${id}`).replace(/^Level\s*\d+\s*[–-]\s*/, '');
      return `<button type="button" class="mm-level${id === String(aktuell) ? ' aktiv' : ''}" data-level="${id}">
        <span class="mm-level-nr">${id}</span><span class="mm-level-name">${escapeHtml(titel)}</span><span class="mm-level-sterne">${sterneHTML(sterneFuer(id))}</span></button>`;
    }).join('');
    const kopf = Number(k) ? `${k}. Klasse${istMeine ? ' <span class="mm-meine">deine Klasse</span>' : ''}` : 'Level';
    return `<div class="mm-klassen-gruppe${istMeine ? ' meine' : ''}"><div class="mm-klasse-kopf">${kopf}</div>${knoepfe}</div>`;
  }).join('');
  host.querySelectorAll('.mm-level').forEach(b => b.addEventListener('click', () => mmLevelStarten(b.dataset.level)));
  const kBtn = document.getElementById('mm-klasse');
  if (kBtn) kBtn.textContent = meine ? `🎒 Klasse: ${klasseText(meine)} – ändern` : '🎒 Klasse wählen';
}
// Klasse ändern (für den aktuellen Spieler)
function openKlasseModal() {
  const name = getUserName();
  if (!name) { openNameModal(); return; }
  if (!spielerListe().some(p => p.name.toLowerCase() === name.toLowerCase())) spielerMerken(name);
  const jetzt = klasseFuer(name);
  const { overlay, body } = ensureModal('klasse-modal', `In welche Klasse geht ${name}?`);
  if (!body) return;
  body.innerHTML = `<div class="klasse-wahl">${[1, 2, 3, 4, 5].map(k => `
      <button type="button" class="klasse-karte${k === jetzt ? ' aktiv' : ''}" data-k="${k}"><strong>${k >= 5 ? '5+' : k}</strong><span>${klasseText(k)}</span></button>`).join('')}</div>
    <p class="hint-note">Danach beginnt das Spiel mit den Aufgaben dieser Klasse. Alle anderen Level bleiben im Menü frei wählbar.${''}</p>
    <p class="hint-note">Für die 5. Klasse und höher gibt es hier vorerst die Aufgaben der 4. Klasse (Kopfrechnen-Training) – eigene Aufgaben bis Klasse 8 kommen später.</p>`;
  overlay.classList.add('is-visible');
  body.querySelectorAll('.klasse-karte').forEach(b => b.addEventListener('click', () => {
    klasseSetzen(name, b.dataset.k);
    // zuletzt gespielt löschen, damit das Start-Level zur neuen Klasse passt
    const z = zuletztAlle(); delete z[name.toLowerCase()]; localStorage.setItem(ZULETZT_KEY, JSON.stringify(z));
    overlay.classList.remove('is-visible');
    mmLevelKnoepfe();
    if (typeof window.wireLevelToolbarNeu === 'function') window.wireLevelToolbarNeu();
    showToast(`${name}: ${klasseText(Number(b.dataset.k))} 🎒`, 'ok');
  }));
}
function mmMenueAufbauen() {
  let m = document.getElementById('mm-menue');
  if (m) m.remove();
  let sch = document.getElementById('mm-menue-schatten');
  if (!sch) {
    sch = document.createElement('div');
    sch.id = 'mm-menue-schatten';
    sch.addEventListener('click', mmMenueZu);
    document.body.appendChild(sch);
  }
  m = document.createElement('aside');
  m.id = 'mm-menue';
  m.setAttribute('aria-label', 'Menü');
  m.innerHTML = `
    <div class="mm-menue-kopf"><strong>Menü</strong><button type="button" class="mm-zu" id="mm-menue-zu" aria-label="Menü schließen">✕</button></div>
    <div class="mm-gruppe"><div class="mm-gruppe-titel">Level wählen</div><div id="mm-level-liste"></div></div>
    <div class="mm-gruppe">
      <div class="mm-gruppe-titel">Spiel</div>
      <button type="button" class="mm-eintrag" id="change-name" data-de="👥 Spieler wechseln" data-en="Players">👥 Spieler wechseln</button>
      <button type="button" class="mm-eintrag" id="mm-klasse">🎒 Klasse wählen</button>
      <button type="button" class="mm-eintrag" id="mm-team" data-de="🐾 Team wählen" data-en="Choose team">🐾 Team wählen</button>
      <button type="button" class="mm-eintrag" id="hint-open" data-de="💡 Hinweis" data-en="Hint">💡 Hinweis</button>
      <button type="button" class="mm-eintrag" id="bg-open" data-de="🖼️ Bild wechseln" data-en="Change image">🖼️ Bild wechseln</button>
      <button type="button" class="mm-eintrag" id="btnBackgroundOnly" data-de="👀 Nur Hintergrund" data-en="Background only">👀 Nur Hintergrund</button>
      <button type="button" class="mm-eintrag" id="open-level-results" data-de="📊 Auswertung" data-en="Evaluation">📊 Auswertung</button>
      <label class="mm-schalter"><input type="checkbox" id="mm-ton"> 🔊 Ton und Sprache</label>
      <button type="button" class="mm-eintrag" id="mm-startseite" data-de="🏠 Mathe-Start" data-en="Start page">🏠 Mathe-Start</button>
      <button type="button" class="mm-eintrag" id="mm-beenden" data-de="🚪 Spiel beenden" data-en="End game">🚪 Spiel beenden</button>
    </div>
    <details class="mm-gruppe mm-lehrer">
      <summary class="mm-gruppe-titel">🔒 Für Lehrer</summary>
      <button type="button" class="mm-eintrag" id="mm-alle-level">📋 Alle Level (Übersicht)</button>
      <label class="mm-schalter"><input type="checkbox" id="mm-uebersicht"> Aufgaben-Übersicht (Tabelle) zeigen</label>
      <label class="mm-schalter"><input type="checkbox" id="mm-englisch"> Englisch anzeigen</label>
    </details>`;
  document.body.appendChild(m);
  applyBilingualLabels(m);
  mmSchalterAnwenden();
  const auf = document.getElementById('mm-menue-auf');
  if (auf) auf.onclick = () => (m.classList.contains('offen') ? mmMenueZu() : mmMenueAuf());
  m.querySelector('#mm-menue-zu').onclick = mmMenueZu;
  // nach jedem Knopf (außer Schaltern) das Menü schließen, damit das Bild frei ist
  m.querySelectorAll('.mm-eintrag').forEach(b => b.addEventListener('click', () => setTimeout(mmMenueZu, 0)));
  m.querySelector('#mm-team').onclick = () => openAvatarModal();
  m.querySelector('#mm-klasse').onclick = () => openKlasseModal();
  m.querySelector('#mm-startseite').onclick = () => { window.location.href = `${MODULE_ROOT}/index.html`; };
  m.querySelector('#mm-beenden').onclick = () => {
    if (!window.confirm('Spiel wirklich beenden?')) return;
    resetGameState();
    window.location.href = `${MODULE_ROOT}/index.html`;
  };
  m.querySelector('#mm-alle-level').onclick = () => {
    if (parseCurrentLevel() !== null) { window.location.href = `${MODULE_ROOT}/index.html?lehrer=1`; return; }
    document.body.classList.add('mm-lehrer-sicht');
    const d = document.getElementById('allLevelsDetails');
    if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  };
  const ton = m.querySelector('#mm-ton');
  ton.checked = tonAn();
  ton.onchange = () => { localStorage.setItem(TON_KEY, ton.checked ? '1' : '0'); if (ton.checked) sprechen('Ton ist an.'); else window.speechSynthesis?.cancel(); };
  const en = m.querySelector('#mm-englisch');
  en.checked = localStorage.getItem(ENGLISCH_KEY) === '1';
  en.onchange = () => { localStorage.setItem(ENGLISCH_KEY, en.checked ? '1' : '0'); mmSchalterAnwenden(); };
  const ue = m.querySelector('#mm-uebersicht');
  ue.checked = localStorage.getItem(UEBERSICHT_KEY) === '1';
  ue.onchange = () => { localStorage.setItem(UEBERSICHT_KEY, ue.checked ? '1' : '0'); mmSchalterAnwenden(); };
  if (!window.mmEscGebunden) {
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') mmMenueZu(); });
    window.mmEscGebunden = true;
  }
  mmLevelKnoepfe();
  // Level-Namen noch nicht im Speicher? → einmal aus levels.json holen
  if (!localStorage.getItem('math_module_levels_cache')) {
    fetch(`${MODULE_ROOT}/data/levels.json`).then(r => r.json()).then(levels => {
      try { localStorage.setItem('math_module_levels_cache', JSON.stringify(levels)); } catch (e) {}
      mmLevelKnoepfe();
      const smax = document.getElementById('sterne-max'); if (smax) smax.textContent = String(levels.length * 3);
      const chip = document.querySelector('.mm-level-chip');
      const lv = parseCurrentLevel();
      if (chip && lv !== null) chip.textContent = mmLevelTitel(lv);
    }).catch(() => {});
  }
}

function openNameModal() {
  // 2026-11-25: „Wer spielt?“ – gespeicherte Spieler oben, neuer Spieler unten
  let overlay = document.getElementById('name-modal-backdrop');
  if (overlay) overlay.remove();
  overlay = document.createElement('div');
  overlay.id = 'name-modal-backdrop';
  // aktuellen Namen (falls noch nicht in der Liste) übernehmen
  const aktuell = getUserName() || localStorage.getItem(PLAYER_NAME_KEY) || '';
  if (aktuell && !spielerListe().some(p => p.name.toLowerCase() === aktuell.toLowerCase())) spielerMerken(aktuell);
  const liste = spielerListe();
  const LEVEL_ZAHL = mmLevelListe().length;
  const karten = liste.map((p, i) => {
    const z = zuletztFuer(p.name);
    return `<div class="sp-karte" data-i="${i}">
        <button type="button" class="sp-waehlen" data-i="${i}" title="Mit ${escapeHtml(p.name)} spielen">
          <img src="${p.avatar}" alt="" width="52" height="52">
          <span class="sp-name">${escapeHtml(p.name)}</span>
          <span class="sp-info">${p.klasse ? '🎒 ' + klasseText(p.klasse) + ' · ' : ''}⭐ ${bruchText(sterneSummeVon(p.name))} von ${LEVEL_ZAHL * 3}${z !== undefined ? ` · zuletzt Level ${escapeHtml(z)}` : ''}</span>
        </button>
        <button type="button" class="sp-mini" data-umbenennen="${i}" title="Namen ändern">✏️</button>
        <button type="button" class="sp-mini" data-loeschen="${i}" title="Spieler löschen">🗑️</button>
      </div>`;
  }).join('');
  const tabelle = liste.length ? `<details class="sp-erwachsene"><summary>👥 Übersicht für Erwachsene</summary>
      <table class="result-table"><tr><th>Spieler</th>${[...Array(LEVEL_ZAHL).keys()].map(l => `<th>L${l}</th>`).join('')}<th>⭐</th></tr>
      ${liste.map(p => { const m = sterneAlle()[p.name.toLowerCase()] || {};
        return `<tr><td>${escapeHtml(p.name)}</td>${[...Array(LEVEL_ZAHL).keys()].map(l => `<td>${m[l] ? bruchText(m[l]) : '–'}</td>`).join('')}<td><b>${bruchText(sterneSummeVon(p.name))}</b></td></tr>`; }).join('')}
      </table><p class="sp-klein">Die Zahlen eines Levels (Punkte, Versuche, Note) zeigt der Knopf „Auswertung“ oben – unter „Für Erwachsene“.</p></details>` : '';
  overlay.innerHTML = `
    <div class="name-modal sp-modal">
      <h3>Wer spielt?</h3>
      ${liste.length ? `<div class="sp-liste">${karten}</div>` : '<p class="name-sub">Noch kein Spieler – lege unten einen an.</p>'}
      <details class="sp-neu"${liste.length ? '' : ' open'}><summary>＋ Neuer Spieler</summary>
        <input type="text" id="name-input" placeholder="Name, z. B. Philipp" autocomplete="off" />
        <div class="team-picker" id="team-picker" aria-label="Team auswählen">
          ${AVATARS.map((src, idx) => `
            <label class="team-option">
              <input type="radio" name="team" value="${src}" data-theme="${THEMES[idx] || THEMES[0]}">
              <img src="${src}" alt="${TEAM_NAMES[idx] || 'Tier'}" width="52" height="52" />
              <span>${TEAM_NAMES[idx] || 'Tier'}</span>
            </label>`).join('')}
        </div>
        <p class="sp-klein" id="team-wahl-hinweis">Wähle dein Team: Für wen spielst du?</p>
        <label class="sp-klasse">🎒 In welche Klasse gehst du?
          <select id="klasse-input">
            <option value="1">1. Klasse</option><option value="2">2. Klasse</option>
            <option value="3">3. Klasse</option><option value="4">4. Klasse</option>
            <option value="5">5. Klasse oder höher</option>
          </select></label>
        <div class="name-actions"><button id="name-submit">Los geht's!</button></div>
      </details>
      ${tabelle}
      <div class="name-actions"><button type="button" id="name-later" class="name-later">Schließen</button></div>
    </div>`;
  document.body.appendChild(overlay);

  const fertig = () => {
    const wer = getUserName();
    if (wer) sprechen(`Hallo ${wer}! Team ${teamNameForAvatar(getAvatar())}. Los geht's!`);
    markGameActive(true);
    markWelcomeShown();
    overlay.classList.remove('is-visible');
    document.dispatchEvent(new Event('ll-game-activated'));
    if (typeof wireLevelToolbarNeu === 'function') wireLevelToolbarNeu();
  };
  overlay.querySelectorAll('.sp-waehlen').forEach(b => b.addEventListener('click', () => {
    const p = spielerListe()[Number(b.dataset.i)]; if (!p) return;
    setAvatar(p.avatar); setTheme(p.theme || themeForAvatar(p.avatar)); setUserName(p.name);
    fertig();
  }));
  overlay.querySelectorAll('[data-umbenennen]').forEach(b => b.addEventListener('click', () => {
    const p = spielerListe()[Number(b.dataset.umbenennen)]; if (!p) return;
    const neu = window.prompt('Neuer Name:', p.name);
    if (neu && neu.trim()) { spielerUmbenennen(p.name, neu.trim()); openNameModal(); }
  }));
  overlay.querySelectorAll('[data-loeschen]').forEach(b => b.addEventListener('click', () => {
    const p = spielerListe()[Number(b.dataset.loeschen)]; if (!p) return;
    if (window.confirm(`${p.name} löschen? Seine Sterne gehen dabei verloren.`)) { spielerLoeschen(p.name); renderWelcome(); openNameModal(); }
  }));
  const input = overlay.querySelector('#name-input');
  const neuAnlegen = () => {
    const val = normalizePlayerName((input.value || '').trim());
    if (!val) { input.focus(); input.placeholder = 'Bitte einen Namen eingeben'; return; }
    const sel = overlay.querySelector('#team-picker input[type="radio"]:checked');
    if (!sel) { const h = overlay.querySelector('#team-wahl-hinweis'); if (h) { h.textContent = '👆 Bitte zuerst ein Team antippen!'; h.style.color = '#b91c1c'; } return; }
    const avatar = sel.value;
    const theme = sel ? (sel.dataset.theme || themeForAvatar(avatar)) : THEMES[0];
    setAvatar(avatar); setTheme(theme); setUserName(val);
    spielerMerken(val, avatar, theme);
    const kSel = overlay.querySelector('#klasse-input');
    if (kSel) klasseSetzen(val, kSel.value);
    fertig();
  };
  overlay.querySelector('#name-submit').addEventListener('click', neuAnlegen);
  input.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); neuAnlegen(); } });
  overlay.querySelector('#name-later').addEventListener('click', () => {
    markWelcomeShown(); markGameActive(hasProfile()); overlay.classList.remove('is-visible');
  });
  overlay.classList.add('is-visible');
  if (!liste.length) requestAnimationFrame(() => input.focus());
}
// DE: Progress aus localStorage laden
// EN: Load progress from localStorage
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑÐ° Ð¸Ð· localStorage
function loadProgressStore() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

// DE: Progress für Level speichern
// EN: Save progress for a level
// RU: Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑ ÑƒÑ€Ð¾Ð²Ð½Ñ
function saveProgress(levelId, data) {
  const store = loadProgressStore();
  store[levelId] = data;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

// DE: Versuche-Store laden
// EN: Load attempts store
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ñ…Ñ€Ð°Ð½Ð¸Ð»Ð¸Ñ‰Ðµ Ð¿Ð¾Ð¿Ñ‹Ñ‚Ð¾Ðº
function loadAttemptsStore() {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

// DE: Versuche-Store speichern
// EN: Save attempts store
// RU: Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ñ…Ñ€Ð°Ð½Ð¸Ð»Ð¸Ñ‰Ðµ Ð¿Ð¾Ð¿Ñ‹Ñ‚Ð¾Ðº
function saveAttemptsStore(store) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(store));
}

// DE: Generierte Aufgaben laden
// EN: Load generated tasks
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ ÑÐ³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°Ð´Ð°Ð½Ð¸Ñ
function loadGeneratedStore() {
  try {
    return JSON.parse(localStorage.getItem(GENERATED_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

// DE: Generierte Aufgaben speichern
// EN: Save generated tasks
// RU: Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ ÑÐ³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°Ð´Ð°Ð½Ð¸Ñ
function saveGeneratedStore(store) {
  localStorage.setItem(GENERATED_KEY, JSON.stringify(store));
}

// Timer store
function loadTimerStore() {
  try {
    return JSON.parse(localStorage.getItem(TIMER_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveTimerStore(store) {
  localStorage.setItem(TIMER_KEY, JSON.stringify(store));
}

// DE: Slide-Index-Store laden
// EN: Load slide index store
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ñ…Ñ€Ð°Ð½Ð¸Ð»Ð¸Ñ‰Ðµ Ñ‚ÐµÐºÑƒÑ‰Ð¸Ñ… ÑÐ»Ð°Ð¹Ð´Ð¾Ð²
function loadSlideStore() {
  try {
    return JSON.parse(localStorage.getItem(SLIDE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

// DE: Slide-Index-Store speichern
// EN: Save slide index store
// RU: Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ñ…Ñ€Ð°Ð½Ð¸Ð»Ð¸Ñ‰Ðµ ÑÐ»Ð°Ð¹Ð´Ð¾Ð²
function saveSlideStore(store) {
  localStorage.setItem(SLIDE_KEY, JSON.stringify(store));
}

// DE: Toast-Anzeige
// EN: Toast display
// RU: ÐŸÐ¾ÐºÐ°Ð· Ñ‚Ð¾ÑÑ‚Ð°
function showToast(message, type = 'info') {
  let box = document.getElementById('toast');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast';
    document.body.appendChild(box);
  }
  if (toastHideTimeout) {
    clearTimeout(toastHideTimeout);
    toastHideTimeout = null;
  }
  box.textContent = message;
  box.className = `toast ${type}`;
  box.style.opacity = '0';
  requestAnimationFrame(() => { box.style.opacity = '1'; });
  toastHideTimeout = setTimeout(() => { box.style.opacity = '0'; }, 2100);
}

// DE: Ergebnis-Tabelle als HTML
// EN: Result table as HTML
// RU: Ð¢Ð°Ð±Ð»Ð¸Ñ†Ð° Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð¾Ð² (UI Ð±ÐµÐ· Ñ€ÑƒÑÑÐºÐ¾Ð³Ð¾ Ñ‚ÐµÐºÑÑ‚Ð°)
function renderResultTable(rows) {
  const safe = rows.map(([label, value]) => {
    const cleanLabel = (label || '').toString();
    const cleanValue = (value == null ? '–' : value).toString();
    return `<tr><th>${cleanLabel}</th><td>${cleanValue}</td></tr>`;
  }).join('');
  return `<table class="result-table">${safe}</table>`;
}

// DE: Avatar/Theme Modal anzeigen
// EN: Show avatar/theme modal
// RU: ÐžÐºÐ½Ð¾ Ð²Ñ‹Ð±Ð¾Ñ€Ð° Ð°Ð²Ð°Ñ‚Ð°Ñ€Ð°/Ñ„Ð¾Ð½Ð°
// 2026-11-26: „Für welches Team spielst du?“ – das Kind wählt sein Team selbst (nicht mehr zufällig)
// RU: ребёнок сам выбирает команду; картинка-фон меняется вместе с командой
function openAvatarModal() {
  const jetzt = getAvatar();
  const { overlay, body } = ensureModal('avatar-modal', 'Für welches Team spielst du?');
  if (!body) return;
  body.innerHTML = `
    <div class="team-wahl">
      ${AVATARS.map((src, i) => `
        <button type="button" class="team-karte${src === jetzt ? ' aktiv' : ''}" data-i="${i}">
          <img src="${src}" alt="" width="84" height="84">
          <span>Team ${TEAM_NAMES[i] || 'Tier'}</span>
          ${src === jetzt ? '<small>✔ dein Team</small>' : ''}
        </button>`).join('')}
    </div>
    <p class="hint-note">Das Bild im Hintergrund passt zum Team. Ein anderes Bild gibt es im Menü unter „Bild wechseln“.</p>`;
  overlay.classList.add('is-visible');
  body.querySelectorAll('.team-karte').forEach(b => b.addEventListener('click', () => {
    const i = Number(b.dataset.i);
    const avatar = AVATARS[i];
    setAvatar(avatar);
    setTheme(THEMES[i] || themeForAvatar(avatar));
    applyTheme(getTheme());
    const name = getUserName();
    if (name) spielerMerken(name, avatar, getTheme());
    renderWelcome();
    document.dispatchEvent(new Event('avatar-theme-updated'));
    overlay.classList.remove('is-visible');
    showToast(`Du spielst jetzt für Team ${TEAM_NAMES[i]}! 🎉`, 'ok');
  }));
}

// 2026-11-26: „Bild wechseln“ – nur das Hintergrundbild, das Team bleibt gleich
// RU: меняется только фон, команда остаётся
function openBackgroundModal() {
  const jetzt = getTheme();
  const { overlay, body } = ensureModal('background-modal', 'Welches Bild möchtest du?');
  if (!body) return;
  const namen = ['Eis und Schnee', 'Bambuswald', 'Teich', 'Herbstwald', 'Dschungel'];
  body.innerHTML = `
    <div class="bild-wahl">
      ${THEMES.map((src, i) => `
        <button type="button" class="bild-karte${src === jetzt ? ' aktiv' : ''}" data-i="${i}">
          <img src="${src}" alt="">
          <span>${namen[i] || 'Bild ' + (i + 1)}${src === jetzt ? ' ✔' : ''}</span>
        </button>`).join('')}
    </div>
    <p class="hint-note">Dein Team bleibt gleich – nur das Bild im Hintergrund wechselt.</p>`;
  overlay.classList.add('is-visible');
  body.querySelectorAll('.bild-karte').forEach(b => b.addEventListener('click', () => {
    const t = THEMES[Number(b.dataset.i)];
    setTheme(t);
    applyTheme(t);
    const name = getUserName();
    if (name) spielerMerken(name, getAvatar(), t);
    document.dispatchEvent(new Event('avatar-theme-updated'));
    overlay.classList.remove('is-visible');
  }));
}

function openHintModal() {
  const lvl = parseCurrentLevel() || '0';
  const hint = LEVEL_HINTS[String(lvl)] || 'Kleiner Tipp: erst lesen, dann rechnen.';
  const { overlay, body } = ensureModal('hint-modal', 'Hinweis');
  if (!body) return;
  body.innerHTML = `
    <p class="eyebrow">Level ${lvl}</p>
    <p class="hint-body">${hint}</p>
    <p class="hint-sub">Wenn du festhängst: Schritt für Schritt notieren und Zwischenergebnisse prüfen.</p>
  `;
  applyBilingualLabels(overlay);
  overlay.classList.add('is-visible');
}

// ===========================
// DE: Zufallsaufgaben je Level generieren
// EN: Generate random tasks per level
// RU: Ð“ÐµÐ½ÐµÑ€Ð°Ñ†Ð¸Ñ ÑÐ»ÑƒÑ‡Ð°Ð¹Ð½Ñ‹Ñ… Ð·Ð°Ð´Ð°Ð½Ð¸Ð¹ Ð¿Ð¾ ÑƒÑ€Ð¾Ð²Ð½ÑÐ¼
// ===========================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 2026-11-26: der Zufallsgenerator – bei jedem Start neue Aufgaben.
// Die letzten 30 Aufgaben pro Level werden gemerkt und nicht wiederholt.
// RU: генератор – каждый раз новые задания, последние 30 не повторяются
const VERLAUF_KEY = 'math_module_verlauf_v1';
const AUFGABEN_PRO_RUNDE = 5;
const TIERE_TEXT = ['der Frosch', 'der Panda', 'der Pinguin', 'das Eichhörnchen', 'der Tiger'];
function verlaufLaden() { try { return JSON.parse(localStorage.getItem(VERLAUF_KEY) || '{}') || {}; } catch (e) { return {}; } }
function verlaufSpeichern(v) { try { localStorage.setItem(VERLAUF_KEY, JSON.stringify(v)); } catch (e) {} }

// eine einzelne Zufallsaufgabe für das Level: { text, answer, solution }
// 2026-11-26: 12 Level, nach Klassen geordnet (Klasse 1: L0–2, Klasse 2: L3–5, Klasse 3: L6–8, Klasse 4: L9–11)
function zahlDE(n) { return Number(n).toLocaleString('de-DE'); }
function zufallsAufgabe(levelId) {
  const r = randInt;
  const tier = () => TIERE_TEXT[r(0, TIERE_TEXT.length - 1)];
  const gross = t => t.charAt(0).toUpperCase() + t.slice(1);
  const Z = zahlDE;
  switch (String(levelId)) {
    // ---------- Klasse 1 ----------
    case '0': { // plus und minus bis 10
      const art = r(1, 6);
      if (art === 1) { const a = r(1, 9); return { text: `Ergänze: ${a} + ? = 10`, answer: 10 - a, solution: `${a} + ${10 - a} = 10.` }; }
      if (art === 2) { const a = r(2, 5), b = r(1, 10 - a); return { text: `${gross(tier())} hat ${a} Äpfel und findet ${b} dazu. Wie viele Äpfel sind es?`, answer: a + b, solution: `${a} + ${b} = ${a + b}.` }; }
      if (art <= 4) { const a = r(1, 9), b = r(1, 10 - a); return { text: `Rechne: ${a} + ${b} =`, answer: a + b, solution: `${a} + ${b} = ${a + b}.` }; }
      const a = r(2, 10), b = r(1, a); return { text: `Rechne: ${a} - ${b} =`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` };
    }
    case '1': { // plus bis 20
      const art = r(1, 6);
      if (art === 1) { const a = r(3, 15), s = r(a + 1, 20); return { text: `Ergänze: ${a} + ? = ${s}`, answer: s - a, solution: `${a} + ${s - a} = ${s}.` }; }
      if (art === 2) { const a = r(4, 12), b = r(2, 20 - a); return { text: `${gross(tier())} sammelt ${a} Nüsse und dann noch ${b}. Wie viele Nüsse sind es?`, answer: a + b, solution: `${a} + ${b} = ${a + b}.` }; }
      const a = r(5, 15), b = r(1, 20 - a); return { text: `Rechne: ${a} + ${b} =`, answer: a + b, solution: `${a} + ${b} = ${a + b}. Tipp: zuerst bis 10 auffüllen.` };
    }
    case '2': { // minus bis 20
      const art = r(1, 6);
      if (art === 1) { const a = r(10, 20), d = r(1, a - 1); return { text: `Ergänze: ${a} - ? = ${d}`, answer: a - d, solution: `${a} - ${a - d} = ${d}.` }; }
      if (art === 2) { const a = r(8, 20), b = r(1, a - 1); return { text: `${gross(tier())} hat ${a} Fische und frisst ${b}. Wie viele Fische bleiben?`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` }; }
      const a = r(8, 20), b = r(1, a); return { text: `Rechne: ${a} - ${b} =`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` };
    }
    // ---------- Klasse 2 ----------
    case '3': { // plus und minus bis 100
      const art = r(1, 6);
      if (art === 1) { const a = r(10, 90), s = r(a + 1, 100); return { text: `Ergänze: ${a} + ? = ${s}`, answer: s - a, solution: `${a} + ${s - a} = ${s}.` }; }
      if (art === 2) { const a = r(20, 99), b = r(5, a - 1); return { text: `${gross(tier())} hat ${a} Cent und kauft ein Eis für ${b} Cent. Wie viele Cent bleiben?`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` }; }
      if (art <= 4) { const a = r(11, 89), b = r(2, 100 - a); return { text: `Rechne: ${a} + ${b} =`, answer: a + b, solution: `${a} + ${b} = ${a + b}. Tipp: zuerst die Zehner, dann die Einer.` }; }
      const a = r(20, 100), b = r(2, a - 1); return { text: `Rechne: ${a} - ${b} =`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` };
    }
    case '4': { // das kleine Einmaleins
      const a = r(1, 10), b = r(1, 10);
      const art = r(1, 5);
      if (art === 1) return { text: `${gross(tier())} hat ${a} Körbe mit je ${b} Beeren. Wie viele Beeren sind es?`, answer: a * b, solution: `${a} · ${b} = ${a * b}.` };
      if (art === 2) return { text: `Ergänze: ${a} · ? = ${a * b}`, answer: b, solution: `${a} · ${b} = ${a * b}.` };
      return { text: `Rechne: ${a} · ${b} =`, answer: a * b, solution: `${a} · ${b} = ${a * b}.` };
    }
    case '5': { // geteilt durch (ohne Rest)
      const a = r(2, 10), b = r(1, 10), d = a * b;
      if (r(1, 5) === 1) return { text: `${d} Bonbons werden an ${a} Kinder verteilt. Wie viele bekommt jedes Kind?`, answer: b, solution: `${d} : ${a} = ${b}, denn ${a} · ${b} = ${d}.` };
      return { text: `Rechne: ${d} : ${a} =`, answer: b, solution: `${d} : ${a} = ${b}, denn ${a} · ${b} = ${d}.` };
    }
    // ---------- Klasse 3 ----------
    case '6': { // plus und minus bis 1000
      const art = r(1, 5);
      if (art === 1) { const a = r(100, 900), s = r(a + 1, 1000); return { text: `Ergänze: ${a} + ? = ${s}`, answer: s - a, solution: `${a} + ${s - a} = ${s}.` }; }
      if (art === 2) { const a = r(200, 999), b = r(20, a - 1); return { text: `Ein Zug hat ${a} Plätze. ${b} sind besetzt. Wie viele Plätze sind frei?`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` }; }
      if (art === 3) { const a = r(101, 899), b = r(11, 1000 - a); return { text: `Rechne: ${a} + ${b} =`, answer: a + b, solution: `${a} + ${b} = ${a + b}. Tipp: Hunderter, Zehner, Einer einzeln.` }; }
      const a = r(150, 1000), b = r(11, a - 1); return { text: `Rechne: ${a} - ${b} =`, answer: a - b, solution: `${a} - ${b} = ${a - b}.` };
    }
    case '7': { // mal und geteilt mit Zehnern, Punkt vor Strich
      const art = r(1, 4);
      if (art === 1) { const a = r(2, 9) * 10, b = r(2, 9); return { text: `Rechne: ${a} · ${b} =`, answer: a * b, solution: `${a / 10} · ${b} = ${a / 10 * b}, also ${a} · ${b} = ${a * b}.` }; }
      if (art === 2) { const a = r(2, 9), b = r(2, 9) * 10, d = a * b; return { text: `Rechne: ${d} : ${a} =`, answer: b, solution: `${d / 10} : ${a} = ${b / 10}, also ${d} : ${a} = ${b}.` }; }
      if (art === 3) { const a = r(2, 9), b = r(2, 9), c = r(1, 50); return { text: `Rechne: ${c} + ${a} · ${b} =`, answer: c + a * b, solution: `Punkt vor Strich: ${a} · ${b} = ${a * b}, dann ${c} + ${a * b} = ${c + a * b}.` }; }
      const a = r(11, 19), b = r(2, 6); return { text: `Rechne: ${a} · ${b} =`, answer: a * b, solution: `${a} · ${b} = 10 · ${b} + ${a - 10} · ${b} = ${10 * b} + ${(a - 10) * b} = ${a * b}.` };
    }
    case '8': { // geteilt mit Rest
      const t = r(2, 9), q = r(2, 10), rest = r(1, t - 1), d = t * q + rest;
      if (r(1, 2) === 1) return { text: `Rechne: ${d} : ${t} = ${q} Rest ?`, answer: rest, solution: `${t} · ${q} = ${t * q}, bis ${d} fehlen noch ${rest}. Also ${d} : ${t} = ${q} Rest ${rest}.` };
      return { text: `Rechne: ${d} : ${t} = ? Rest ${rest}`, answer: q, solution: `${t} · ${q} = ${t * q}, dazu der Rest ${rest} = ${d}. Also ${d} : ${t} = ${q} Rest ${rest}.` };
    }
    // ---------- Klasse 4 ----------
    case '9': { // große Zahlen bis 1 Million
      const art = r(1, 4);
      if (art === 1) { const a = r(1000, 500000), b = r(1000, 400000); return { text: `Rechne: ${Z(a)} + ${Z(b)} =`, answer: a + b, solution: `${Z(a)} + ${Z(b)} = ${Z(a + b)}. Tipp: schriftlich untereinander rechnen.` }; }
      if (art === 2) { const a = r(10000, 999999), b = r(1000, a - 1); return { text: `Rechne: ${Z(a)} - ${Z(b)} =`, answer: a - b, solution: `${Z(a)} - ${Z(b)} = ${Z(a - b)}. Tipp: schriftlich untereinander rechnen.` }; }
      if (art === 3) { const a = r(1, 999) * 1000; return { text: `Wie viel fehlt bis 1 Million? ${Z(a)} + ? = ${Z(1000000)}`, answer: 1000000 - a, solution: `${Z(a)} + ${Z(1000000 - a)} = ${Z(1000000)}.` }; }
      const a = r(1000, 99000), b = r(1, 9) * 1000; return { text: `Rechne: ${Z(a)} + ${Z(b)} =`, answer: a + b, solution: `${Z(a)} + ${Z(b)} = ${Z(a + b)}.` };
    }
    case '10': { // schriftlich malnehmen
      if (r(1, 3) === 1) { const a = r(12, 99), b = r(2, 9) * 10; return { text: `Rechne: ${a} · ${b} =`, answer: a * b, solution: `${a} · ${b / 10} = ${a * b / 10}, mal 10 = ${Z(a * b)}.` }; }
      const a = r(102, 999), b = r(2, 9); return { text: `Rechne: ${a} · ${b} =`, answer: a * b, solution: `${a} · ${b} = ${Z(a * b)}. Tipp: schriftlich von rechts nach links, Übertrag nicht vergessen.` };
    }
    case '11': { // schriftlich teilen
      const t = r(2, 9), q = r(21, 999), d = t * q;
      return { text: `Rechne: ${Z(d)} : ${t} =`, answer: q, solution: `${Z(d)} : ${t} = ${q}, denn ${q} · ${t} = ${Z(d)}. Tipp: schriftlich von links nach rechts teilen.` };
    }
    default: return null;
  }
}

function generateTasksForLevel(levelId) {
  const id = String(levelId);
  const verlauf = verlaufLaden();
  const alt = new Set(verlauf[id] || []);
  const tasks = [];
  const seen = new Set();
  let versuche = 0;
  while (tasks.length < AUFGABEN_PRO_RUNDE && versuche < 500) {
    versuche += 1;
    const t = zufallsAufgabe(id);
    if (!t) continue;
    if (seen.has(t.text)) continue;
    if (alt.has(t.text) && versuche < 400) continue; // zuletzt gehabt → überspringen
    seen.add(t.text);
    const slide = tasks.length + 1;
    tasks.push({ id: `gen-${id}-${Date.now()}-${slide}`, slide, text: t.text, answer: String(t.answer), points: 3, solution: t.solution });
  }
  verlauf[id] = [...(verlauf[id] || []), ...tasks.map(t => t.text)].slice(-30);
  verlaufSpeichern(verlauf);
  return tasks;
}

// DE: Prozentwert für Level holen
// EN: Get percent value for level
// RU: ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¾Ñ†ÐµÐ½Ñ‚ Ð´Ð»Ñ ÑƒÑ€Ð¾Ð²Ð½Ñ
function percentForLevel(levelId) {
  const store = loadProgressStore();
  return (store[levelId] && store[levelId].percent) || 0;
}

// DE: Aktuelles Level aus URL bestimmen
// EN: Detect current level from URL
// RU: ÐžÐ¿Ñ€ÐµÐ´ÐµÐ»Ð¸Ñ‚ÑŒ Ñ‚ÐµÐºÑƒÑ‰Ð¸Ð¹ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ð¸Ð· URL
function parseCurrentLevel() {
  const match = window.location.pathname.match(/level(\d+)\.html$/);
  return match ? match[1] : null;
}

function storageKey(levelId) {
  return `ll_math_state_v${STATE_VERSION}_${levelId}`;
}

function initialState(levelId) {
  return {
    version: STATE_VERSION,
    levelId: String(levelId),
    running: false,
    finished: false,
    timeModeEnabled: false,
    updatedAt: Date.now(),
  };
}

function loadState(levelId) {
  const fallback = initialState(levelId);
  const raw = localStorage.getItem(storageKey(levelId));
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION) return fallback;
    if (String(parsed.levelId) !== String(levelId)) return fallback;
    return { ...fallback, ...parsed, version: STATE_VERSION, levelId: String(levelId) };
  } catch (_) {
    return fallback;
  }
}

function saveState(levelId, state) {
  const payload = {
    ...initialState(levelId),
    ...(state || {}),
    version: STATE_VERSION,
    levelId: String(levelId),
    updatedAt: Date.now(),
  };
  localStorage.setItem(storageKey(levelId), JSON.stringify(payload));
  return payload;
}

function resetRun(levelId) {
  if (levelId == null) return;
  const attempts = loadAttemptsStore();
  delete attempts[levelId];
  saveAttemptsStore(attempts);

  const progress = loadProgressStore();
  delete progress[levelId];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

  const slides = loadSlideStore();
  delete slides[levelId];
  saveSlideStore(slides);

  const timers = loadTimerStore();
  delete timers[levelId];
  saveTimerStore(timers);

  localStorage.removeItem(storageKey(levelId));
  saveState(levelId, initialState(levelId));
}

function wireLevelToolbar(levels, container) {
  const select = document.getElementById('level-jump-select');
  const detailTitle = document.getElementById('levelDetailTitle');
  const detailDesc = document.getElementById('levelDetailDesc');
  const startBtn = document.getElementById('levelStartBtn');
  if (!select || !detailTitle || !detailDesc || !startBtn || !Array.isArray(levels)) return;

  // Leveldaten aus den bereits gerenderten Karten lesen (keine doppelte Pflege).
  const cards = container ? Array.from(container.querySelectorAll('.level[data-level]')) : [];
  const levelData = cards.map(card => {
    const id = String(card.dataset.level || '').trim();
    const title = (card.querySelector('h3')?.textContent || `Level ${id}`).trim();
    const desc = (card.querySelector('p')?.textContent || '').trim();
    const href = card.querySelector('a')?.getAttribute('href') || `${MODULE_ROOT}/levels/level${id}.html`;
    return { id, title, desc, href };
  }).filter(item => item.id !== '');

  if (!levelData.length) return;

  select.innerHTML = '';
  levelData.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.title}  ${sternText(sterneFuer(item.id))}`;
    select.appendChild(option);
  });

  const byId = new Map(levelData.map(item => [item.id, item]));
  const renderSelected = levelId => {
    const item = byId.get(String(levelId)) || levelData[0];
    if (!item) return;
    select.value = item.id;
    detailTitle.innerHTML = `${escapeHtml(item.title)} ${sterneHTML(sterneFuer(item.id))}`;
    detailDesc.textContent = item.desc;
    startBtn.dataset.href = item.href;
  };

  const initialFromUrl = new URLSearchParams(window.location.search).get('level');
  const startId = startLevelFuer(getUserName());
  renderSelected(initialFromUrl || (byId.has(startId) ? startId : select.value));
  // nach einem Spielerwechsel neu einstellen
  window.wireLevelToolbarNeu = () => {
    const z = zuletztFuer(getUserName());
    Array.from(select.options).forEach(o => { const it = byId.get(o.value); if (it) o.textContent = `${it.title}  ${sternText(sterneFuer(it.id))}`; });
    const st = startLevelFuer(getUserName());
    renderSelected(byId.has(st) ? st : levelData[0].id);
  };

  if (!select.dataset.bound) {
    select.addEventListener('change', () => renderSelected(select.value));
    startBtn.addEventListener('click', () => {
      const href = startBtn.dataset.href || byId.get(select.value)?.href;
      const targetLevelId = String(select.value || '').trim();
      if (targetLevelId) resetRun(targetLevelId);
      if (href) window.location.href = href;
    });
    select.dataset.bound = '1';
  }
}

// DE: Layout laden (Header/Footer)
// EN: Load layout (header/footer)
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° Ð¼Ð°ÐºÐµÑ‚Ð° (Ñ…ÐµÐ´ÐµÑ€/Ñ„ÑƒÑ‚ÐµÑ€)
function loadLayout() {
  const header = document.getElementById('header-placeholder');
  const footer = document.getElementById('footer-placeholder');

  if (header) {
    fetch(`${MODULE_ROOT}/core/header.html`)
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        const homeLink = header.querySelector('[data-nav="home"]');
        if (homeLink) homeLink.href = `${MODULE_ROOT}/index.html`;
        const level0Link = header.querySelector('[data-nav="level0"]');
        if (level0Link) {
          const currentLevel = parseCurrentLevel();
          level0Link.href = `${MODULE_ROOT}/levels/level0.html`;
          level0Link.textContent = currentLevel != null ? `Level ${currentLevel}` : 'Aufgaben';
        }
        const profileBtn = header.querySelector('#header-profile-btn');
        if (profileBtn) profileBtn.onclick = () => openNameModal();
        const startGameBtn = header.querySelector('#btnStartGame');
        if (startGameBtn) {
          const currentLevelId = parseCurrentLevel();
          if (currentLevelId !== null) {
            startGameBtn.textContent = 'Neustart';
            startGameBtn.setAttribute('data-de', 'Neustart');
            startGameBtn.setAttribute('data-en', 'Restart');
            startGameBtn.onclick = () => {
              resetRun(currentLevelId);
              window.location.reload();
            };
          } else {
            startGameBtn.onclick = () => {
              if (!hasProfile()) {
                openNameModal();
                return;
              }
              if (!window.location.pathname.endsWith('/index.html')) {
                window.location.href = `${MODULE_ROOT}/index.html#levels`;
              }
            };
          }
        }
        const endGameBtn = header.querySelector('#btnEndGame');
        if (endGameBtn) {
          endGameBtn.onclick = () => {
            const ok = window.confirm('Spiel wirklich beenden?');
            if (!ok) return;
            resetGameState();
            window.location.href = `${MODULE_ROOT}/index.html`;
          };
        }
        applyBilingualLabels(header);
      });
  }

  if (footer) {
    fetch(`${MODULE_ROOT}/core/footer.html`)
      .then(res => res.text())
      .then(html => { footer.innerHTML = html; });
  }
}

// DE: Level-Karte rendern, falls Container existiert
// EN: Render level map when container exists
// RU: ÐžÑ‚Ñ€Ð¸ÑÐ¾Ð²Ð°Ñ‚ÑŒ ÐºÐ°Ñ€Ñ‚Ñƒ ÑƒÑ€Ð¾Ð²Ð½ÐµÐ¹, ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€
function renderLevelMapIfPresent() {
  const container = document.querySelector('.levels');
  if (!container) return;
  const levelsUrl = `${MODULE_ROOT}/data/levels.json`;

  fetch(levelsUrl)
    .then(response => response.json())
    .then(levels => {
      try { localStorage.setItem('math_module_levels_cache', JSON.stringify(levels)); } catch (_) {}
      container.innerHTML = '';
      levels.forEach(level => {
        const id = (level.level ?? level.id ?? level.levelId);
        if (id == null) {
          console.error('Invalid level entry', level);
          return;
        }

        const percent = percentForLevel(id) || 0;
        const div = document.createElement('div');
        div.className = 'level';
        div.dataset.level = id;
        div.id = `level-${id}`;
        div.innerHTML = `
          <h3>${level.title}</h3>
          <p>${level.description}</p>
          <progress value="${percent}" max="100"></progress>
          <a href="${MODULE_ROOT}/levels/level${id}.html" data-de="Starten" data-en="Start">Starten</a>
        `;
        const startLink = div.querySelector('a');
        if (startLink) {
          startLink.addEventListener('click', () => {
            resetRun(String(id));
          });
        }
        container.appendChild(div);
      });
      wireLevelToolbar(levels, container);
      applyBilingualLabels(container);
    })
    .catch(() => {
      container.innerHTML = '<p>Levels konnten nicht geladen werden.</p>';
    });
}

// ===========================
// DE: Aufgaben für aktuelles Level laden und rendern
// EN: Load and render tasks for current level
// RU: Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð¸ Ð¾Ñ‚Ñ€Ð¸ÑÐ¾Ð²Ð°Ñ‚ÑŒ Ð·Ð°Ð´Ð°Ð½Ð¸Ñ Ð´Ð»Ñ Ñ‚ÐµÐºÑƒÑ‰ÐµÐ³Ð¾ ÑƒÑ€Ð¾Ð²Ð½Ñ
// ===========================
function renderTasksForCurrentLevel() {
  const tasksHost = document.getElementById('tasks');
  const loadErrorEl = document.getElementById('loadError');
  const timeModeToggle = document.getElementById('timeModeToggle');
  const timerBox = document.getElementById('timerBox');
  const timerText = document.getElementById('timerText');
  const levelId = parseCurrentLevel();
  if (levelId !== null && levelId !== undefined && levelId !== '') { try { zuletztSetzen(levelId); } catch (e) {} }
  if (!tasksHost || levelId === null) return Promise.resolve();
  resetRun(levelId);
  let runState = loadState(levelId);
  const MAX_LIVES = 3;
  const TEST_TOTAL_SECONDS = 300; // 5 Minuten Gesamtzeit pro Test

  const taskScores = new Map();
  const taskAttemptMarks = new Map();
  const taskAttemptLog = new Map();
  const taskUiRefs = new Map();
  let currentTasks = [];
  const solved = new Set();
  let finalModalShown = false;
  let totalMax = 0; // Gesamt-Maximum inkl. Zeitbonus
  let hasActivity = false;
  let timeModeEnabled = true;
  let testRunning = false;
  let timerStartMs = 0;
  let timerEndMs = 0;
  let taskTimerInterval = null;
  let remainingSeconds = TEST_TOTAL_SECONDS;
  let testTaskCount = 0;
  let timeLimitSec = TEST_TOTAL_SECONDS;
  const POINTS_PER_CORRECT = 3;
  const BONUS_PER_SAVED_MIN = BONUS_POINTS_PER_STEP;
  const persistRunState = (patch = {}) => {
    runState = saveState(levelId, { ...runState, ...patch });
  };

  const hideLoadError = () => {
    if (loadErrorEl) loadErrorEl.hidden = true;
  };
  const showLoadError = () => {
    if (loadErrorEl) loadErrorEl.hidden = false;
  };
  // DE: Pro-Aufgabe-Timer im Zeitmodus.
  const formatClock = sec => {
    const safe = Math.max(0, sec | 0);
    const mm = Math.floor(safe / 60).toString().padStart(2, '0');
    const ss = Math.floor(safe % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };
  const updateTimerUi = () => {
    if (!timerBox || !timerText) return;
    timerBox.hidden = !timeModeEnabled;
    if (timeModeEnabled) timerText.textContent = formatClock(remainingSeconds);
  };
  const updateHourglass = () => {
    const el = document.querySelector('.hourglass, #hourglass, [data-hourglass]');
    if (!el) return;
    const shouldSpin = !!(timeModeEnabled && testRunning);
    el.classList.toggle('running', shouldSpin);
    el.classList.toggle('spinning', shouldSpin);
    el.style.display = timeModeEnabled ? '' : 'none';
  };
  const markTestRunning = on => {
    testRunning = !!on;
    if (testRunning && !timerStartMs) timerStartMs = Date.now();
    if (!testRunning && timerStartMs && !timerEndMs) timerEndMs = Date.now();
    persistRunState({ running: !!(timeModeEnabled && testRunning) });
    updateHourglass();
  };
  const setTimeMode = on => {
    timeModeEnabled = !!on;
    if (!timeModeEnabled) {
      stopTaskTimer();
      markTestRunning(false);
      timerStartMs = 0;
      timerEndMs = 0;
      remainingSeconds = TEST_TOTAL_SECONDS;
    }
    persistRunState({ timeModeEnabled: !!timeModeEnabled });
    updateTimerUi();
    updateHourglass();
  };
  const getConsumedSec = () => {
    if (!timerStartMs) return 0;
    const endMs = testRunning ? Date.now() : (timerEndMs || Date.now());
    return Math.max(0, Math.round((endMs - timerStartMs) / 1000));
  };
  const getTimeLimitSec = () => TEST_TOTAL_SECONDS;
  const getTimeMetrics = (taskCount) => {
    if (!timeModeEnabled) return { consumedSec: 0, savedSec: 0, savedMin: 0, bonusPoints: 0, bonusMax: 0, limitSec: 0 };
    const limitSec = getTimeLimitSec();
    const consumedSec = Math.max(0, getConsumedSec());
    const savedSec = Math.max(0, limitSec - consumedSec);
    const savedMin = Math.floor(savedSec / 60);
    const bonusMax = Math.floor(limitSec / 60) * BONUS_PER_SAVED_MIN;
    const bonusPoints = savedMin * BONUS_PER_SAVED_MIN;
    return { consumedSec, savedSec, savedMin, bonusPoints, bonusMax, limitSec };
  };
  const stopTaskTimer = () => {
    if (taskTimerInterval) {
      clearInterval(taskTimerInterval);
      taskTimerInterval = null;
    }
    persistRunState({ running: false });
    updateHourglass();
  };
  const canStartTestTimer = () => timeModeEnabled && isGameActive() && hasProfile() && !finalModalShown && !runState.finished;
  const awardTaskBonus = () => 0; // Bonus wird über die Gesamtzeit ermittelt
  const startTaskTimer = () => {
    if (!timeLimitSec || !canStartTestTimer()) return;
    if (taskTimerInterval) return;
    if (!timerStartMs) {
      timerStartMs = Date.now();
      timerEndMs = 0;
    }
    markTestRunning(true);
    updateTimerUi();
    taskTimerInterval = setInterval(() => {
      const elapsed = getConsumedSec();
      remainingSeconds = Math.max(0, timeLimitSec - elapsed);
      updateTimerUi();
      if (remainingSeconds > 0) return;
      stopTaskTimer();
      markTestRunning(false);
      showToast('Zeit abgelaufen: kein Bonus', 'warn');
    }, 1000);
  };

  const attemptsStore = loadAttemptsStore();
  const levelAttempts = attemptsStore[levelId] || {};

  const setAttempts = (taskId, value) => {
    levelAttempts[taskId] = value;
    attemptsStore[levelId] = levelAttempts;
    saveAttemptsStore(attemptsStore);
  };

  const incAttempts = taskId => {
    const next = (levelAttempts[taskId] || 0) + 1;
    setAttempts(taskId, next);
    return next;
  };

  const updateResults = () => {
    const correctCount = solved.size;
    rennbahn(correctCount, testTaskCount);
    const pointsTasks = correctCount * POINTS_PER_CORRECT;
    const timeMetrics = getTimeMetrics(testTaskCount);
    const timeBonusMax = timeModeEnabled ? timeMetrics.bonusMax : 0;
    const timeBonusEarned = timeModeEnabled ? timeMetrics.bonusPoints : 0;

    // Lebensbonus: jede gesparte Leben = 1 Punkt (verbleibende Leben pro Aufgabe)
    const savedLives = currentTasks.reduce((sum, task) => {
      const wrongAttempts = levelAttempts[task.id] || 0;
      const attemptsTotal = wrongAttempts + (solved.has(task.id) ? 1 : 0);
      const remaining = Math.max(0, MAX_LIVES - Math.min(MAX_LIVES, attemptsTotal));
      return sum + remaining;
    }, 0);
    const lifeBonusMax = testTaskCount * Math.max(0, MAX_LIVES - 1); // bei Lösung im 1. Versuch bleiben 2 Leben

    const maxTaskPoints = testTaskCount * POINTS_PER_CORRECT;
    const maxAll = maxTaskPoints + timeBonusMax + lifeBonusMax;
    const earned = pointsTasks + timeBonusEarned + savedLives;
    const percent = maxAll > 0 ? Math.round((earned / maxAll) * 100) : 0;
    const grade = gradeFromPercent(percent);
    const attemptsTotal = Object.values(levelAttempts).reduce((a, b) => a + (b || 0), 0);

    currentLevelStats = {
      levelId,
      earned,
      max: maxAll,
      baseMax: maxTaskPoints,
      basePoints: pointsTasks,
      percent,
      grade,
      attemptsTotal,
      timeModeEnabled,
      tasksTotal: testTaskCount,
      correctCount,
      pointsTasks,
      pointsTime: timeBonusEarned,
      pointsLives: savedLives,
      pointsTotal: earned,
      timeBonusPoints: timeBonusEarned,
      timeBonusMax: timeBonusMax,
      lifeBonusPoints: savedLives,
      lifeBonusMax,
      timeConsumedSec: timeMetrics.consumedSec,
      timeSavedSec: timeMetrics.savedSec,
      timeSavedMin: timeMetrics.savedMin,
      timeLimitSec: timeMetrics.limitSec,
    };

    // Bonus-Anzeige im Punkteglas mit aktuellen Level-Boni füllen (Zeit + Leben)
    const bonusDisplay = timeBonusEarned + savedLives;
    renderBonusJar(false, bonusDisplay);

    if (hasActivity) {
      saveProgress(levelId, { earned, max: maxAll, percent, timeModeEnabled, timeBonusPoints: timeBonusEarned, timeBonusMax: timeBonusMax, lifeBonusPoints: savedLives, lifeBonusMax });
    }
  };

  const slideStore = loadSlideStore();
  const generatedStore = loadGeneratedStore();
  let activeSlide = 0;
  const updateSlide = () => {};
  // Stop any running interval from previous render
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // 2026-11-26: bei jedem Start neue Zufallsaufgaben (tasks.json nur noch als Notlösung)
  const getTasks = () => {
    const neu = generateTasksForLevel(levelId);
    if (neu.length) {
      generatedStore[levelId] = neu;
      saveGeneratedStore(generatedStore);
      return Promise.resolve(neu);
    }
    return fetch(`${MODULE_ROOT}/data/tasks.json`).then(res => {
      if (!res.ok) {
        throw new Error(`tasks.json HTTP ${res.status}`);
      }
      return res.json();
    })
      .then(allTasks => {
        const fromNumeric = allTasks[String(levelId)] || [];
        const fromNamed = allTasks[`level${levelId}`] || [];
        return fromNumeric.length ? fromNumeric : fromNamed;
      });
  };

  const resetLevelState = () => {
    resetRun(levelId);
  };

  return getTasks().then(tasks => {
      currentTasks = tasks;
      hideLoadError();
      tasksHost.innerHTML = '';
      testTaskCount = tasks.length;
      timeLimitSec = getTimeLimitSec();
      remainingSeconds = TEST_TOTAL_SECONDS;
      const timeBonusMax = Math.floor(TEST_TOTAL_SECONDS / BONUS_STEP_SECONDS) * BONUS_POINTS_PER_STEP;
      const lifeBonusMax = testTaskCount * Math.max(0, MAX_LIVES - 1);
      totalMax = (testTaskCount * POINTS_PER_CORRECT) + timeBonusMax + lifeBonusMax;
      if (!tasks.length) {
        tasksHost.innerHTML = '<p>Für dieses Level sind aktuell keine Aufgaben hinterlegt.</p>';
        return;
      }

      activeSlide = Math.min(
        tasks.length - 1,
        Math.max(0, slideStore[levelId] ?? 0)
      );

      const slides = [];
      const nav = document.createElement('div');
      nav.className = 'slide-nav';

      const pager = document.createElement('div');
      pager.className = 'slide-pager';

      const newBtn = document.createElement('button');
      newBtn.type = 'button';
      newBtn.textContent = '🎲 Neue Aufgaben';
      newBtn.className = 'btn-secondary pill';
      newBtn.title = 'Neue zufällige Aufgaben für dieses Level';
      newBtn.setAttribute('data-de', '🎲 Neue Aufgaben');
      newBtn.setAttribute('data-en', 'New tasks');
      newBtn.addEventListener('click', () => {
        const generated = loadGeneratedStore();
        generated[levelId] = generateTasksForLevel(levelId);
        saveGeneratedStore(generated);
        resetLevelState();
        location.reload();
      });

      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.textContent = 'Zurück';
      prevBtn.className = 'btn-ghost pill';
      prevBtn.setAttribute('data-de', 'Zurück');
      prevBtn.setAttribute('data-en', 'Back');

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.textContent = 'Weiter';
      nextBtn.className = 'btn-ghost pill';
      nextBtn.setAttribute('data-de', 'Weiter');
      nextBtn.setAttribute('data-en', 'Next');

      let setActiveSlide;
      let updateVisibleSlides;

      pager.append(prevBtn, nextBtn);
      tasksHost.appendChild(nav);
      tasksHost.appendChild(newBtn);
      if (timeModeToggle && !timeModeToggle.dataset.bound) {
        const initialOn = OHNE_ZEITMODUS ? false : runState.timeModeEnabled !== false;
        timeModeToggle.checked = initialOn;
        timeModeToggle.addEventListener('change', () => {
          setTimeMode(!!timeModeToggle.checked);
          updateResults();
          updateVisibleSlides?.();
        });
        timeModeToggle.dataset.bound = '1';
      }
        const timeModeNote = document.querySelector('.time-mode-note');
      if (timeModeNote) {
        timeModeNote.textContent = `Bonus: +${BONUS_POINTS_PER_STEP} Punkt(e) pro gesparter Minute.`;
      }
      setTimeMode(OHNE_ZEITMODUS ? false : (timeModeToggle ? !!timeModeToggle.checked : true));
      console.log(`[Timer] Zeitmodus aktiv: ${timeModeEnabled}, Sanduhr: ${!!document.querySelector('.hourglass, #hourglass, [data-hourglass]')}, Toast: ${!!document.getElementById('toast')}, Dateien: math_module/core/scripts.js + math_module/core/styles.css + math_module/levels/level*.html`);

      const openSolutionPopup = (task, solutionText) => {
        updateResults();
        const stats = currentLevelStats || {
          levelId,
          earned: solved.size * POINTS_PER_CORRECT,
          max: totalMax,
          percent: totalMax ? Math.round(((solved.size * POINTS_PER_CORRECT) / totalMax) * 100) : 0,
          grade: gradeFromPercent(totalMax ? Math.round(((solved.size * POINTS_PER_CORRECT) / totalMax) * 100) : 0),
          attemptsTotal: Object.values(levelAttempts).reduce((a, b) => a + (b || 0), 0),
          timeModeEnabled,
          timeBonusPoints: 0,
          timeBonusMax: 0,
          tasksTotal: tasks.length,
          correctCount: solved.size,
          pointsTasks: solved.size * POINTS_PER_CORRECT,
          pointsTime: 0,
          pointsTotal: solved.size * POINTS_PER_CORRECT,
          timeConsumedSec: 0,
          timeSavedSec: 0,
          timeSavedMin: 0,
          timeLimitSec: getTimeLimitSec(),
        };
        const safeSolution = (solutionText || '–').toString().replace(/</g, '&lt;');
        const rows = [
          ['Aufgabe', task.text],
          ['Lösung', safeSolution],
          ['Punkte', `${taskScores.get(task.id) || 0} / ${MAX_LIVES}`],
          ['Versuche (Aufgabe)', levelAttempts[task.id] || 0],
          ['Zeitmodus', stats.timeModeEnabled ? 'An' : 'Aus'],
          ['Zeitbonus', stats.timeModeEnabled ? `${stats.timeBonusPoints}/${stats.timeBonusMax}` : '–'],
          ['Gesamt', `${stats.earned}/${stats.max} (${stats.percent}%)`],
          ['Note', stats.grade],
        ];
        const html = `<div class=\"solution-text\">${safeSolution}</div>${renderResultTable(rows)}`;
        openModal('solution-modal', 'Lösung', html);
      };

      // Tabelle für Versuche/Leben (unter den Aufgaben)
      const ensureAttemptTable = () => {
        let wrap = document.getElementById('attemptTableWrap');
        if (!wrap) {
          wrap = document.createElement('div');
          wrap.id = 'attemptTableWrap';
          wrap.className = 'attempt-table-wrap';
          const hostParent = tasksHost.parentElement;
          if (hostParent) {
            tasksHost.insertAdjacentElement('afterend', wrap);
          }
        }
        if (!wrap.innerHTML) {
          wrap.innerHTML = `
            <h3 class="attempt-table-title">Aufgaben-Übersicht</h3>
            <table class="attempt-log-table live">
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>Aufgabe</th>
                  <th>Leben 1</th>
                  <th>Leben 2</th>
                  <th>Leben 3</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          `;
        }
        return wrap.querySelector('tbody');
      };

      const renderLifeDots = (marks) => marks.map((m, i) => `
        <span class="life-dot ${m}" data-life="${i + 1}" aria-hidden="true"></span>
      `).join('');

      const renderAttemptTable = () => {
        const tbody = ensureAttemptTable();
        if (!tbody) return;
        tbody.innerHTML = tasks.map((task, idx) => {
          const marks = taskAttemptMarks.get(task.id) || ['empty', 'empty', 'empty'];
          const log = taskAttemptLog.get(task.id) || [];
          const cell = (i) => {
            const mark = marks[i] || 'empty';
            const entry = log[i];
            const text = entry ? escapeHtml(entry.input || '–') : '–';
            return `
              <td>
                <div class="life-cell">
                  <span class="life-dot ${mark}" aria-hidden="true"></span>
                  <span class="life-answer">${text}</span>
                </div>
              </td>
            `;
          };
          return `
            <tr>
              <td>${idx + 1}</td>
              <td>${task.text}</td>
              ${cell(0)}
              ${cell(1)}
              ${cell(2)}
            </tr>
          `;
        }).join('');
      };

      const updateTaskVisuals = (taskId, points) => {
        const refs = taskUiRefs.get(taskId);
        if (!refs) return;
        const marks = taskAttemptMarks.get(taskId) || ['empty', 'empty', 'empty'];
        if (refs.livesEl) refs.livesEl.innerHTML = renderLifeDots(marks);
        renderAttemptTable();
      };

      const formatAttempt = (entry) => {
        if (!entry) return '–';
        return entry.ok ? `✓ ${entry.input}` : `✗ ${entry.input}`;
      };

      const taskDone = taskId => solved.has(taskId) || (levelAttempts[taskId] || 0) >= MAX_LIVES;

      const openLevelEndModal = () => {
        stopTaskTimer();
        markTestRunning(false);
        persistRunState({ finished: true, running: false });
        updateResults();
        const stats = currentLevelStats || {
          levelId,
          earned: solved.size * POINTS_PER_CORRECT,
          max: totalMax,
          percent: totalMax ? Math.round(((solved.size * POINTS_PER_CORRECT) / totalMax) * 100) : 0,
          grade: gradeFromPercent(totalMax ? Math.round(((solved.size * POINTS_PER_CORRECT) / totalMax) * 100) : 0),
          attemptsTotal: Object.values(levelAttempts).reduce((a, b) => a + (b || 0), 0),
          timeModeEnabled,
          timeBonusPoints: 0,
          timeBonusMax: 0,
          tasksTotal: tasks.length,
          correctCount: solved.size,
          pointsTasks: solved.size * POINTS_PER_CORRECT,
          pointsTime: 0,
          pointsTotal: solved.size * POINTS_PER_CORRECT,
          timeConsumedSec: 0,
          timeSavedSec: 0,
          timeSavedMin: 0,
          timeLimitSec: getTimeLimitSec(),
        };
        // 2026-11-26: Punkte nach Versuchen: 1. Versuch 3, 2. Versuch 2, 3. Versuch 1, nicht geschafft 0
        const versuchVon = t => { const log = taskAttemptLog.get(t.id) || []; const i = log.findIndex(x => x.ok); return i >= 0 ? i + 1 : 0; };
        const kindPunkte = tasks.reduce((n, t) => { const v = versuchVon(t); return n + (v ? 4 - v : 0); }, 0);
        const kindMax = tasks.length * 3;
        const neueSterne = kindMax ? Math.round((kindPunkte / kindMax) * 9) / 3 : 0;
        sterneSpeichern(levelId, neueSterne);
        sterneSummeZeigen();
        const kindZeilen = tasks.map((t, i) => {
          const v = versuchVon(t);
          const was = v === 1 ? '✅ beim 1. Versuch' : v === 2 ? '✅ beim 2. Versuch' : v === 3 ? '✅ beim 3. Versuch' : `❌ Lösung: ${escapeHtml(String(t.answer))}`;
          return `<tr class="${v ? 'ok' : 'nein'}"><td>${i + 1}</td><td>${escapeHtml(t.text)}</td><td>${was}</td><td>${v ? 4 - v : 0}</td></tr>`;
        }).join('');
        const lob = neueSterne >= 3 ? 'Super! Alle drei Sterne! 🎉' : neueSterne >= 2 ? 'Sehr gut gemacht! 👏' : neueSterne >= 1 ? 'Gut gemacht! Schaffst du mehr Sterne? 🙂' : 'Nicht aufgeben – nochmal probieren! 💪';
        const rows = tasks.map((task, idx) => {
          const log = taskAttemptLog.get(task.id) || [];
          return `
            <tr>
              <td>${idx + 1}</td>
              <td>${task.text}</td>
              <td>${formatAttempt(log[0])}</td>
              <td>${formatAttempt(log[1])}</td>
              <td>${formatAttempt(log[2])}</td>
              <td>${taskScores.get(task.id) || 0}</td>
            </tr>
          `;
        }).join('');
        const html = `
          <div class="ende-grid">
          <div class="ende-links">
          <div class="pokal">🏆</div>
          <div class="sterne-gross">${sterneHTML(neueSterne)}</div>
          <p class="sterne-zahl-ende">${bruchText(neueSterne)} von 3 Sternen</p>
          <p class="sterne-lob">${lob}</p>
          <p class="kind-ergebnis">${kindPunkte} von ${kindMax} Punkten</p>
          </div>
          <div class="ende-rechts">
            <h4>So hast du gerechnet</h4>
            <table class="kind-tabelle"><thead><tr><th>Nr.</th><th>Aufgabe</th><th>Geschafft</th><th>Punkte</th></tr></thead><tbody>${kindZeilen}</tbody></table>
            <p class="kind-regel">1. Versuch = 3 Punkte · 2. Versuch = 2 · 3. Versuch = 1</p>
          </div>
          </div>
          ${mmLevelListe().some(x => String(x.level ?? x.id) === String(Number(levelId) + 1)) ? `<p style="text-align:center"><button type="button" class="pill btn-primary" id="mm-naechstes-level">▶ Nächstes Level: ${escapeHtml(mmLevelTitel(Number(levelId) + 1))}</button></p>` : ''}
          <details class="erwachsene"><summary>Für Erwachsene: alle Zahlen</summary>
          <div class="summary">
            <h3>Auswertung</h3>
            <p>Aufgaben gesamt / Total tasks: ${stats.tasksTotal || 0}</p>
            <p>Richtig / Correct: ${stats.correctCount || 0}</p>
            ${stats.timeModeEnabled ? `
            <p>Zeitlimit / Time limit: ${formatClock(stats.timeLimitSec || 0)}</p>
            <p>Zeit gebraucht / Time used: ${formatClock(stats.timeConsumedSec || 0)}</p>
            <p>Zeit gespart / Time saved: ${formatClock((stats.timeSavedMin || 0) * 60)}</p>` : ''}
            <p>Punkte (Aufgaben) / Task points: ${stats.pointsTasks || 0}</p>
            <p>Lebensbonus / Life bonus: ${stats.pointsLives || 0}</p>
            ${stats.timeModeEnabled ? `<p>Zeitbonus / Time bonus: ${stats.pointsTime || 0}</p>` : ''}
            <p>Gesamtpunkte / Total points: ${stats.pointsTotal || 0}</p>
            <p>Prozent: ${stats.percent}%</p>
            <p>Note (1–6): ${stats.grade}</p>
            <p>Versuche gesamt: ${tasks.reduce((n, t) => n + (taskAttemptLog.get(t.id) || []).length, 0)} (davon falsch: ${stats.attemptsTotal})</p>
          </div>
          <table class="attempt-log-table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Aufgabe</th>
                <th>Versuch 1</th>
                <th>Versuch 2</th>
                <th>Versuch 3</th>
                <th>Punkte</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          </details>
          <div class="modal-actions">
            <button type="button" class="pill btn-primary" id="restart-level-end">Nochmal spielen</button>
            <button type="button" class="pill btn-secondary" id="back-to-levels-end">Zur Level-Auswahl</button>
          </div>
        `;
        openModal('level-end-modal', 'Level beendet', html);
        const body = document.querySelector('#level-end-modal .modal-body');
        const restartBtn = body?.querySelector('#restart-level-end');
        const backBtn = body?.querySelector('#back-to-levels-end');
        if (restartBtn) restartBtn.onclick = () => { resetRun(levelId); location.reload(); };
        rennbahn(1, 1); // am Ende immer im Ziel – der Pokal
        // Jubel: Fanfare, Sternregen, „Hurra“ – RU: фанфары, звёздный дождь, «ура»
        const wer = getUserName() || '';
        if (neueSterne >= 1) {
          tonFanfare(); sterneRegen(neueSterne >= 3 ? 60 : 35);
          setTimeout(() => sprechen(`Hurra${wer ? ', ' + wer : ''}! Du hast ${sterneSprechen(neueSterne)}!`), 900);
        } else {
          tonSanft();
          setTimeout(() => sprechen(`Gut gekämpft${wer ? ', ' + wer : ''}! Probier es gleich noch einmal.`), 600);
        }
        const naechstesBtn = body?.querySelector('#mm-naechstes-level');
        if (naechstesBtn) { naechstesBtn.onclick = () => mmLevelStarten(Number(levelId) + 1); setTimeout(() => naechstesBtn.focus(), 100); }
        if (backBtn) backBtn.onclick = () => {
          stopTaskTimer();
          markTestRunning(false);
          resetRun(levelId);
          window.location.href = `${MODULE_ROOT}/index.html#levels`;
        };
      };

      const maybeOpenLevelEndModal = () => {
        if (finalModalShown) return;
        const allDone = tasks.every(task => taskDone(task.id));
        if (!allDone) return;
        // Bonus in die Spardose buchen: gesparte Zeit + gesparte Leben
        updateResults();
        const bonusToAdd = (currentLevelStats?.timeBonusPoints || 0) + (currentLevelStats?.lifeBonusPoints || 0);
        if (bonusToAdd > 0) addProfileBonusPoints(bonusToAdd);
        finalModalShown = true;
        openLevelEndModal();
      };

      const lockTask = (taskId, reason, ok = false) => {
        const refs = taskUiRefs.get(taskId);
        if (!refs) return;
        if (refs.input) refs.input.disabled = true;
        if (refs.checkBtn) refs.checkBtn.disabled = true;
        if (refs.statusBadge) {
          refs.statusBadge.textContent = ok ? '✅' : '⛔';
          refs.statusBadge.className = `status-badge ${ok ? 'status-ok' : 'status-warn'}`;
        }
        if (refs.feedback && reason) {
          refs.feedback.textContent = reason;
          refs.feedback.className = `feedback ${ok ? 'ok' : 'warn'}`;
        }
      };

      tasks.forEach((task, idx) => {
        const ex = document.createElement('div');
        ex.className = 'exercise';
        ex.dataset.answer = (task.answer || '').toString();
        ex.dataset.points = POINTS_PER_CORRECT.toString();
        ex.dataset.taskId = task.id;

        // Reset attempts per task on render so counters don't leak across tasks
        setAttempts(task.id, 0);
        const attempts = 0;
        const maxPts = POINTS_PER_CORRECT;
        const marks = ['empty', 'empty', 'empty'];
        for (let i = 0; i < attempts; i += 1) marks[i] = 'bad';
        taskAttemptMarks.set(task.id, marks);
        taskAttemptLog.set(task.id, []);

        ex.innerHTML = `
          <p><strong>Aufgabe ${task.slide}:</strong> ${task.text} <button type="button" class="pill btn-ghost btn-vorlesen" data-action="vorlesen" title="Aufgabe vorlesen">🔊</button></p>
          ${['0','1','2'].includes(String(levelId)) && zwanzigerfeld(task.text) ? `<details class="zf-hilfe"${String(levelId) === '0' ? ' open' : ''}><summary>🔴 mit Punkten zählen</summary>${zwanzigerfeld(task.text)}</details>` : ''}
          <p class="meta">Max: ${maxPts} Punkte · Versuche: <span class="attempts">${attempts}</span> · <span class="status-badge status-pending">⏳</span></p>
          <div class="lives-row">Leben: <span class="life-dots">${renderLifeDots(marks)}</span></div>
          <div class=\"row\">
            <label for=\"answer-${task.id}\">Antwort:</label>
            <input id=\"answer-${task.id}\" type=\"text\" autocomplete=\"off\">
          </div>
          <div class=\"actions\">
          <button type=\"button\" data-action=\"check-answer\" class=\"pill btn-primary\" data-de=\"Prüfen\" data-en=\"Check\">Prüfen</button>
          <button type=\"button\" data-action=\"show-solution\" class=\"pill btn-secondary\" data-de=\"Lösung\" data-en=\"Solution\">Lösung</button>
            <div class=\"nav-inline\"></div>
          </div>
          <div class=\"feedback\"></div>
          <div class=\"solution\">${task.solution || ''}</div>
        `;

          const checkBtn = ex.querySelector('[data-action=\"check-answer\"]');
          const showSolutionBtn = ex.querySelector('[data-action=\"show-solution\"]');
          const input = ex.querySelector('input');
          const feedback = ex.querySelector('.feedback');
          const solution = ex.querySelector('.solution');
          const attemptsEl = ex.querySelector('.attempts');
        const statusBadge = ex.querySelector('.status-badge');
        const livesEl = ex.querySelector('.life-dots');
        taskUiRefs.set(task.id, {
          task,
          ex,
          input,
          checkBtn,
          attemptsEl,
          statusBadge,
          feedback,
          livesEl,
        });
        updateTaskVisuals(task.id, taskScores.get(task.id) || 0);

        const focusInput = (el, select = true) => {
          if (!el) return;
          requestAnimationFrame(() => {
            el.focus();
            if (select && typeof el.select === 'function') el.select();
          });
        };

        if (attemptsEl) attemptsEl.textContent = '1';

        if (checkBtn && input) {
          const handleCheck = () => {
            if (solved.has(task.id)) return;
            const attemptsUsed = levelAttempts[task.id] || 0; // wrong attempts so far
            if (attemptsUsed >= MAX_LIVES) return;

            const attemptNumber = attemptsUsed + 1; // 1..3 human-readable
            const attemptIndex = attemptNumber - 1;
            const rawVal = (input.value || '').trim();
            // 2026-11-26: Leerzeichen und Tausenderpunkte egal (12.345 = 12345)
            const val = rawVal.toLowerCase().replace(/[\s.]/g, '');
            const expected = (task.answer || '').toString().trim().toLowerCase().replace(/[\s.]/g, '');
            const correct = val && val === expected;
            const pts = correct ? POINTS_PER_CORRECT : 0;
            const marksNow = taskAttemptMarks.get(task.id) || ['empty', 'empty', 'empty'];
            const log = taskAttemptLog.get(task.id) || [];
            log.push({ input: rawVal || '∅', ok: !!correct, ts: Date.now() });
            taskAttemptLog.set(task.id, log.slice(0, MAX_LIVES));
            if (correct) {
              marksNow[attemptIndex] = 'ok';
              for (let i = attemptIndex + 1; i < MAX_LIVES; i += 1) {
                marksNow[i] = 'gray';
              }
              taskAttemptMarks.set(task.id, marksNow);
              solved.add(task.id);
              taskScores.set(task.id, pts);
              if (statusBadge) {
                statusBadge.textContent = '✅';
                statusBadge.className = 'status-badge status-ok';
              }
              const bonus = awardTaskBonus(task.id, 'Aufgabe gelöst');
              showToast(['Super!', 'Toll!', 'Prima!', 'Klasse!', 'Spitze!'][Math.floor(Math.random() * 5)] + ' 🎉', 'ok');
              maskottchen('huepf');
              tonRichtig();
              if (bonus > 0 && feedback) {
                feedback.textContent = `Richtig! 🎉`;
              }
              lockTask(task.id, `Richtig! 🎉`, true);
            } else if (!solved.has(task.id)) {
              marksNow[attemptIndex] = 'bad';
              taskAttemptMarks.set(task.id, marksNow);
              // only increment attempts on wrong answers
              const attemptsNow = attemptsUsed + 1;
              setAttempts(task.id, attemptsNow);
              taskScores.set(task.id, 0);
              if (statusBadge) {
                statusBadge.textContent = '❌';
                statusBadge.className = 'status-badge status-warn';
              }
              showToast(`Versuch ${attemptNumber} nicht ganz richtig.`, 'warn');
              maskottchen('wackel');
              tonFalsch();
              if (attemptsEl) attemptsEl.textContent = attemptsNow.toString();
              const lifeIdx = attemptNumber - 1;
              marksNow[lifeIdx] = 'bad';
              taskAttemptMarks.set(task.id, marksNow);
              if (attemptsNow >= MAX_LIVES) {
                lockTask(task.id, `Versuch ${attemptNumber} nicht ganz richtig. Keine Versuche mehr.`, false);
                if (statusBadge) statusBadge.textContent = '⛔';
              } else {
                // still lives left; prepare for next try
                updateTaskVisuals(task.id, taskScores.get(task.id) || 0);
              }
            }

            if (attemptsEl) attemptsEl.textContent = attemptNumber.toString();

            if (feedback) {
              // 2026-11-25: kindgerechter Tipp bei falscher Zahl
              let tipp = '';
              const zahlKind = Number(String(rawVal).replace(/[\s.]/g, '').replace(',', '.'));
              const zahlSoll = Number(String(task.answer).replace(',', '.'));
              if (!correct && rawVal && Number.isFinite(zahlKind) && Number.isFinite(zahlSoll)) {
                tipp = zahlKind > zahlSoll ? ' Tipp: Deine Zahl ist zu groß. 🔽' : ' Tipp: Deine Zahl ist zu klein. 🔼';
              } else if (!correct && rawVal && !Number.isFinite(zahlKind)) {
                tipp = ' Tipp: Bitte nur eine Zahl eintippen.';
              }
              const restLeben = MAX_LIVES - attemptNumber;
              feedback.textContent = correct
                ? `Richtig! 🎉`
                : (restLeben > 0
                    ? `Versuch ${attemptNumber} nicht ganz richtig.${tipp} Noch ${restLeben} ${restLeben === 1 ? 'Leben' : 'Leben'}.`
                    : `Leider nicht richtig. Die Lösung ist ${task.answer}.`);
              feedback.className = 'feedback ' + (correct ? 'ok' : 'warn');
            }

            updateTaskVisuals(task.id, taskScores.get(task.id) || 0);
            hasActivity = true;
            updateResults();
            maybeOpenLevelEndModal();
            focusInput(input, true);
            // 2026-11-26: fertig (richtig oder keine Leben mehr) → automatisch zur nächsten Aufgabe,
            // damit das Kind nicht zur Maus greifen muss. RU: сам переходит к следующему заданию
            if (correct || attemptNumber >= MAX_LIVES) {
              clearTimeout(window.mmWeiterTimer);
              window.mmWeiterTimer = setTimeout(() => mmZurNaechsten(), correct ? 1300 : 3000);
            }
          };

          checkBtn.addEventListener('click', handleCheck);

          // =========================================================
          // DE: Enter im Eingabefeld = "Prüfen" ausführen
          // EN: Press Enter in input = run "Check"
          // RU: Нажатие Enter в поле ввода = выполнить "Проверить"
          // =========================================================
          input.addEventListener('keydown', ev => {
            const isEnter = ev.key === 'Enter' || ev.code === 'NumpadEnter' || ev.keyCode === 13;
            if (!isEnter) return;
            ev.preventDefault();
            ev.stopPropagation(); // verhindert doppeltes Auslösen über den globalen Listener
            handleCheck();
          });
        }

        if (attempts >= MAX_LIVES) {
          updateTaskVisuals(task.id, taskScores.get(task.id) || 0);
          lockTask(task.id, 'Alle 3 Versuche verbraucht.', false);
        }

        // focus first task's input on load
        if (idx === 0) {
          requestAnimationFrame(() => focusInput(input, true));
        }

        if (showSolutionBtn && solution) {
          showSolutionBtn.addEventListener('click', () => {
            solution.classList.add('is-visible');
          });
        }

        ex.dataset.wired = '1';
        tasksHost.appendChild(ex);
        applyBilingualLabels(ex);
        slides.push(ex);

        const navBtn = document.createElement('button');
        navBtn.type = 'button';
        navBtn.textContent = task.slide;
        navBtn.className = 'ghost pill';
        navBtn.addEventListener('click', () => setActiveSlide(task.slide - 1));
        nav.appendChild(navBtn);
      });

      tasksHost.appendChild(pager);

      // DE: Robuster Fallback - Enter im Antwortfeld entspricht Klick auf "Prüfen".
      if (!tasksHost.dataset.enterBound) {
        tasksHost.addEventListener('keydown', ev => {
          const isEnter = ev.key === 'Enter' || ev.code === 'NumpadEnter' || ev.keyCode === 13;
          if (!isEnter) return;
          const target = ev.target;
          if (!target || target.tagName !== 'INPUT') return;
          const exercise = target.closest('.exercise');
          const checkBtn = exercise?.querySelector('[data-action="check-answer"]');
          if (!checkBtn) return;
          ev.preventDefault();
          checkBtn.click();
        });
        tasksHost.dataset.enterBound = '1';
      }

      // 2026-11-26: zur nächsten noch offenen Aufgabe springen (auch mit Enter)
      const mmZurNaechsten = () => {
        clearTimeout(window.mmWeiterTimer);
        if (finalModalShown) return;
        const n = slides.length;
        for (let k = 1; k <= n; k += 1) {
          const i = (activeSlide + k) % n;
          if (!taskDone(slides[i].dataset.taskId)) { setActiveSlide(i); return; }
        }
      };
      window.mmZurNaechstenAufgabe = mmZurNaechsten;
      if (!window.mmEnterWeiterGebunden) {
        document.addEventListener('keydown', ev => {
          const isEnter = ev.key === 'Enter' || ev.code === 'NumpadEnter';
          if (!isEnter) return;
          if (document.querySelector('.is-visible[id$="modal"], #name-modal-backdrop.is-visible')) return;
          const aktiv = document.querySelector('#tasks .exercise.is-active');
          const inp = aktiv && aktiv.querySelector('input');
          if (inp && inp.disabled && typeof window.mmZurNaechstenAufgabe === 'function') {
            ev.preventDefault();
            window.mmZurNaechstenAufgabe();
          }
        });
        window.mmEnterWeiterGebunden = true;
      }

      setActiveSlide = (idx) => {
        const previousTaskId = slides[activeSlide]?.dataset.taskId;
        if (typeof idx === 'number' && idx !== activeSlide && previousTaskId) {
          awardTaskBonus(previousTaskId, 'Slide-Wechsel');
        }
        activeSlide = Math.max(0, Math.min(slides.length - 1, idx));
        slideStore[levelId] = activeSlide;
        saveSlideStore(slideStore);
        updateVisibleSlides();
      };

      updateVisibleSlides = () => {
        if (!slides.length) return;
        slides.forEach((el, i) => {
          const isActive = i === activeSlide;
          el.style.display = isActive ? '' : 'none';
          el.classList.toggle('is-active', isActive);
          if (nav.children[i]) {
            nav.children[i].classList.toggle('active', isActive);
          }
        });
        prevBtn.disabled = activeSlide === 0;
        nextBtn.disabled = activeSlide === slides.length - 1;

        const navInline = slides[activeSlide]?.querySelector('.nav-inline');
        if (navInline) {
          navInline.innerHTML = '';
          navInline.append(prevBtn, nextBtn);
        }
        const activeTaskId = slides[activeSlide]?.dataset.taskId;
        const activeInput = slides[activeSlide]?.querySelector('input');
        if (activeInput) {
          requestAnimationFrame(() => { activeInput.focus(); activeInput.select?.(); });
        }
        if (!canStartTestTimer()) {
          if (testRunning || taskTimerInterval) {
            stopTaskTimer();
            markTestRunning(false);
          }
        } else if (remainingSeconds > 0) {
          startTaskTimer();
        } else {
          stopTaskTimer();
          markTestRunning(false);
        }
        updateTimerUi();
      };

      prevBtn.addEventListener('click', () => setActiveSlide(activeSlide - 1));
      nextBtn.addEventListener('click', () => setActiveSlide(activeSlide + 1));

      updateVisibleSlides();
      applyBilingualLabels(tasksHost);
      if (!tasksHost.dataset.gameActivatedBound) {
        document.addEventListener('ll-game-activated', () => {
          updateVisibleSlides?.();
        });
        tasksHost.dataset.gameActivatedBound = '1';
      }

      updateResults();
      maybeOpenLevelEndModal();
    }).catch((err) => {
      console.error(err);
      showLoadError();
      tasksHost.innerHTML = '';
    });
}

// DE: Note aus Prozent berechnen
// EN: Compute grade from percent
// RU: Ð’Ñ‹Ñ‡Ð¸ÑÐ»Ð¸Ñ‚ÑŒ Ð¾Ñ†ÐµÐ½ÐºÑƒ Ð¿Ð¾ Ð¿Ñ€Ð¾Ñ†ÐµÐ½Ñ‚Ñƒ
function gradeFromPercent(percent) {
  if (percent >= 92) return 1;
  if (percent >= 81) return 2;
  if (percent >= 67) return 3;
  if (percent >= 50) return 4;
  if (percent >= 30) return 5;
  return 6;
}

// DE: Übungen verdrahten (Fallback für statische Blöcke)
// EN: Wire exercises (fallback for static blocks)
// RU: Ð¡Ð²ÑÐ·Ð°Ñ‚ÑŒ ÑƒÐ¿Ñ€Ð°Ð¶Ð½ÐµÐ½Ð¸Ñ (Ð´Ð»Ñ ÑÑ‚Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸Ñ… Ð±Ð»Ð¾ÐºÐ¾Ð²)
function wireExercises() {
  document.querySelectorAll('.exercise').forEach(ex => {
    if (ex.dataset.wired === '1') return;
    ex.dataset.wired = '1';

    const input = ex.querySelector('input');
    const solution = ex.querySelector('.solution');
    const showSolutionBtn = ex.querySelector('[data-role=\"show-solution\"], [data-action=\"show-solution\"]');
    const checkBtn = ex.querySelector('[data-role=\"check\"], [data-action=\"check-answer\"]');

    if (input && checkBtn) {
      input.addEventListener('keydown', ev => {
        const isEnter = ev.key === 'Enter' || ev.code === 'NumpadEnter' || ev.keyCode === 13;
        if (!isEnter) return;
        ev.preventDefault();
        checkBtn.click();
      });
    }

    if (showSolutionBtn && solution) {
      showSolutionBtn.addEventListener('click', () => {
        solution.classList.add('is-visible');
      });
    }
  });
}

// DE: Reset-Button verdrahten
// EN: Wire reset button
// RU: ÐŸÑ€Ð¸Ð²ÑÐ·Ð°Ñ‚ÑŒ ÐºÐ½Ð¾Ð¿ÐºÑƒ ÑÐ±Ñ€Ð¾ÑÐ° ÑƒÑ€Ð¾Ð²Ð½Ñ
function wireResetButton() {
  const btn = document.getElementById('reset-level');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const levelId = parseCurrentLevel();
    if (levelId === null) return;

    // Versuche zurücksetzen
    const attempts = loadAttemptsStore();
    delete attempts[levelId];
    saveAttemptsStore(attempts);

    // Progress zurücksetzen
    const progress = loadProgressStore();
    delete progress[levelId];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

    // Slide-Position zurücksetzen
    const slides = loadSlideStore();
    delete slides[levelId];
    saveSlideStore(slides);

    // Seite neu laden, um Felder/Feedback zu leeren
    location.reload();
  });
}

// DE: Alles initialisieren nach DOM-Load
// EN: Initialize everything after DOM load
// RU: Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ DOM
window.addEventListener('DOMContentLoaded', () => {
  // 2026-11-26: Startkarte und Lehrer-Ansicht
  const anderesLevel = document.getElementById('mm-anderes-level');
  if (anderesLevel) anderesLevel.addEventListener('click', () => mmMenueAuf());
  const hallo = document.getElementById('mm-hallo');
  const halloSetzen = () => { const n = getUserName(); if (hallo && n) hallo.textContent = `Hallo ${n}! Los geht's mit:`; };
  halloSetzen();
  document.addEventListener('ll-game-activated', () => { halloSetzen(); renderWelcome(); });
  if (new URLSearchParams(window.location.search).get('lehrer') === '1') {
    document.body.classList.add('mm-lehrer-sicht');
    const d = document.getElementById('allLevelsDetails');
    if (d) d.open = true;
  }
  initBackgroundOnly();
  initWelcomeEnterHandler();
  applyBilingualLabels(document);
  loadLayout();
  renderLevelMapIfPresent();
  renderTasksForCurrentLevel().then(() => {
    wireExercises();
    wireResetButton();
    ensureUserName();
    applyBilingualLabels(document);
  }).catch(() => {
    wireExercises();
    wireResetButton();
    ensureUserName();
    applyBilingualLabels(document);
  });
});

// Dev test:
// 1) Klicke "Nur Hintergrund / Background only" -> nur Theme-Hintergrund bleibt sichtbar.
// 2) Drücke ESC oder klicke/tippe irgendwo -> UI erscheint wieder ohne Reload.
