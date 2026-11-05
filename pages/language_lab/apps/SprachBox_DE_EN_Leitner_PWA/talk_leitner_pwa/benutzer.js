// 2026-11-05: der Benutzer – jeder Benutzer hat seinen eigenen Lernfortschritt.
// пользователи: у каждого свой прогресс по карточкам; новый начинает с нуля.
//
// Wie es funktioniert:
// - Die Liste der Benutzer steht in localStorage unter PROFILES_KEY.
// - Der erste Benutzer (id "p0") nutzt die alten Schlüssel ohne Zusatz,
//   d. h. der bisherige Fortschritt gehört ihm und geht nicht verloren.
// - Für jeden weiteren Benutzer wird an die Fortschritts-Schlüssel "@<id>" angehängt.
// - Dieses Skript läuft VOR app.js und leitet getItem/setItem/removeItem
//   für diese Schlüssel auf den aktuellen Benutzer um. app.js bleibt unverändert.
// - Gemeinsam für alle bleiben: Glossar, Hintergrund, stumme Stimmen, Text-Korrekturen.
(function () {
  "use strict";

  const PROFILES_KEY = "sprachbox_de_en_benutzer_v1";

  // Schlüssel, die pro Benutzer getrennt gespeichert werden
  const PER_USER = new Set([
    "sprachbox_leitner_v1",    // Fortschritt (Boxen, Sterne)
    "sprachbox_mnemo_v1",      // Merkhilfen
    "sprachbox_time_v1",       // Lernzeit
    "sprachbox_settings_v1",   // Einstellungen (Thema, Stufe, Tempo, Stimme)
    "sprachbox_daily10_v1",    // Daily 10
    "SB_BOX_FOCUS_V1",         // Box-Fokus
    "sb_new_lessons_day_v1",   // neue Lektionen heute
  ]);

  const proto = Storage.prototype;
  const rawGet = proto.getItem;
  const rawSet = proto.setItem;
  const rawRemove = proto.removeItem;

  function readProfiles() {
    try {
      const p = JSON.parse(rawGet.call(localStorage, PROFILES_KEY) || "null");
      if (p && Array.isArray(p.list)) return p;
    } catch (_) {}
    return { list: [], active: "" };
  }
  function writeProfiles(p) {
    try { rawSet.call(localStorage, PROFILES_KEY, JSON.stringify(p)); } catch (_) {}
  }

  let profiles = readProfiles();
  let activeId = profiles.active || (profiles.list[0] && profiles.list[0].id) || "p0";

  function keyFor(base, id) {
    return (!id || id === "p0") ? base : base + "@" + id;
  }
  function mapKey(key) {
    return PER_USER.has(key) ? keyFor(key, activeId) : key;
  }

  proto.getItem = function (key) {
    return rawGet.call(this, this === localStorage ? mapKey(String(key)) : key);
  };
  proto.setItem = function (key, value) {
    return rawSet.call(this, this === localStorage ? mapKey(String(key)) : key, value);
  };
  proto.removeItem = function (key) {
    return rawRemove.call(this, this === localStorage ? mapKey(String(key)) : key);
  };

  function activeProfile() {
    return profiles.list.find((u) => u.id === activeId) || null;
  }
  function newId() {
    let n = 1;
    while (profiles.list.some((u) => u.id === "p" + n)) n++;
    return "p" + n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function switchTo(id) {
    profiles.active = id;
    writeProfiles(profiles);
    if (id !== activeId) location.reload();
    else closeDialog();
  }

  function addProfile(name) {
    name = String(name || "").trim();
    if (!name) return null;
    const exists = profiles.list.find((u) => u.name.toLowerCase() === name.toLowerCase());
    if (exists) return exists.id;
    // Allererster Benutzer übernimmt den bisherigen Fortschritt (p0)
    const id = profiles.list.length === 0 ? "p0" : newId();
    profiles.list.push({ id, name, seit: new Date().toISOString().slice(0, 10) });
    writeProfiles(profiles);
    return id;
  }

  function renameProfile(id, name) {
    name = String(name || "").trim();
    const u = profiles.list.find((x) => x.id === id);
    if (!u || !name) return false;
    if (profiles.list.some((x) => x.id !== id && x.name.toLowerCase() === name.toLowerCase())) {
      alert(`Den Namen „${name}“ gibt es schon.\nИмя „${name}“ уже есть.`);
      return false;
    }
    u.name = name;
    writeProfiles(profiles);
    return true;
  }

  let editId = null;

  function deleteProfile(id) {
    const u = profiles.list.find((x) => x.id === id);
    if (!u || id === activeId) return;
    if (!confirm(`Benutzer „${u.name}“ und seinen ganzen Fortschritt löschen?\nУдалить пользователя „${u.name}“ и весь его прогресс?`)) return;
    PER_USER.forEach((base) => { try { rawRemove.call(localStorage, keyFor(base, id)); } catch (_) {} });
    profiles.list = profiles.list.filter((x) => x.id !== id);
    writeProfiles(profiles);
    renderDialog();
  }

  // ---------- Oberfläche ----------
  const css = `
  .sbUserChip{display:inline-flex;align-items:center;gap:6px;font-weight:700}
  .sbUserOverlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px}
  .sbUserBox{background:#111c33;color:#eaf0ff;border:1px solid #ffffff2a;border-radius:18px;box-shadow:0 14px 40px rgba(0,0,0,.5);padding:20px;width:100%;max-width:420px;font-size:17px}
  .sbUserBox h2{margin:0 0 4px;font-size:21px}
  .sbUserBox .sub{color:#a9b7d6;font-size:14px;margin-bottom:14px}
  .sbUserList{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}
  .sbUserRow{display:flex;gap:8px}
  .sbUserRow button.pick{flex:1;text-align:left;padding:12px 14px;border-radius:12px;border:1px solid #ffffff2a;background:#1b2a4a;color:#eaf0ff;font-size:17px;cursor:pointer}
  .sbUserRow button.pick.is-active{border-color:#4ade80;background:#173a2a}
  .sbUserRow button.ren{padding:0 12px;border-radius:12px;border:1px solid #ffffff2a;background:transparent;color:#eaf0ff;font-size:17px;cursor:pointer}
  .sbUserRow input.renIn{flex:1;min-width:0;padding:12px;border-radius:12px;border:1px solid #7aa7ff;background:#0b1220;color:#eaf0ff;font-size:17px}
  .sbUserRow button.ok{padding:0 12px;white-space:nowrap;border-radius:12px;border:0;background:#4ade80;color:#07070b;font-weight:700;font-size:17px;cursor:pointer}
  .sbUserRow button.del{padding:0 12px;border-radius:12px;border:1px solid #ffffff2a;background:transparent;color:#fb7185;font-size:17px;cursor:pointer}
  .sbUserNew{display:flex;gap:8px}
  .sbUserNew input{flex:1;padding:12px;border-radius:12px;border:1px solid #ffffff3a;background:#0b1220;color:#eaf0ff;font-size:17px}
  .sbUserNew button,.sbUserClose{padding:12px 14px;border-radius:12px;border:0;background:#7aa7ff;color:#07070b;font-weight:700;font-size:16px;cursor:pointer}
  .sbUserClose{margin-top:14px;width:100%;background:#2a3a5c;color:#eaf0ff}
  `;

  let overlay = null;
  let firstStart = false;

  // Offene Namensänderung speichern (auch beim Schließen) / сохранить исправленное имя
  function savePendingRename() {
    if (!editId || !overlay) return true;
    const inp = overlay.querySelector("input.renIn");
    if (!inp) return true;
    const u = profiles.list.find((x) => x.id === editId);
    if (u && inp.value.trim() === u.name) { editId = null; return true; }
    if (!renameProfile(editId, inp.value)) return false;
    editId = null;
    updateChip();
    return true;
  }

  function closeDialog() {
    if (!savePendingRename()) return;
    editId = null;
    if (overlay) { overlay.remove(); overlay = null; }
  }

  function renderDialog() {
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sbUserOverlay";
      document.body.appendChild(overlay);
    }
    const rows = profiles.list.map((u) => u.id === editId ? `
      <form class="sbUserRow" data-renform="${u.id}">
        <input class="renIn" name="n" type="text" maxlength="30" autocomplete="off" value="${esc(u.name)}">
        <button type="submit" class="ok" title="Speichern / сохранить">💾 Speichern</button>
        <button type="button" class="del" data-cancel="1" title="Abbrechen / отмена">✖</button>
      </form>` : `
      <div class="sbUserRow">
        <button type="button" class="pick ${u.id === activeId ? "is-active" : ""}" data-pick="${u.id}">
          👤 ${esc(u.name)}${u.id === activeId ? " ✔" : ""}
        </button>
        <button type="button" class="ren" data-ren="${u.id}" title="Namen ändern / изменить имя">✏️</button>
        ${u.id === activeId ? "" : `<button type="button" class="del" data-del="${u.id}" title="Löschen / удалить">🗑</button>`}
      </div>`).join("");

    overlay.innerHTML = `
      <div class="sbUserBox" role="dialog" aria-label="Benutzer wählen">
        <h2>${firstStart ? "Wer lernt? / Кто учится?" : "der Benutzer / пользователь"}</h2>
        <div class="sub">${firstStart
          ? "Gib deinen Namen ein. Jeder Benutzer hat seinen eigenen Fortschritt.<br>Введи имя – у каждого свой прогресс."
          : "Wähle einen Benutzer oder lege einen neuen an. Ein neuer Benutzer beginnt mit allen Karten von vorn.<br>Новый пользователь начинает все карточки сначала."}</div>
        <div class="sbUserList">${rows}</div>
        <form class="sbUserNew">
          <input name="n" type="text" maxlength="30" autocomplete="off" placeholder="${profiles.list.length ? "Neuer Name / новое имя" : "Dein Name / твоё имя"}">
          <button type="submit">${profiles.list.length ? "➕ Neu" : "OK"}</button>
        </form>
        ${firstStart ? "" : `<button type="button" class="sbUserClose">Schließen / закрыть</button>`}
      </div>`;

    overlay.querySelectorAll("[data-pick]").forEach((b) => b.addEventListener("click", () => { if (savePendingRename()) switchTo(b.dataset.pick); }));
    overlay.querySelectorAll("[data-ren]").forEach((b) => b.addEventListener("click", () => { if (!savePendingRename()) return; editId = b.dataset.ren; renderDialog(); }));
    overlay.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => { editId = null; renderDialog(); }));
    overlay.querySelectorAll("[data-renform]").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (renameProfile(f.dataset.renform, f.n.value)) { editId = null; updateChip(); renderDialog(); }
    }));
    overlay.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => deleteProfile(b.dataset.del)));
    const close = overlay.querySelector(".sbUserClose");
    if (close) close.addEventListener("click", closeDialog);
    overlay.querySelector("form.sbUserNew").addEventListener("submit", (e) => {
      e.preventDefault();
      const id = addProfile(e.target.n.value);
      if (!id) return;
      if (firstStart) {
        // erster Benutzer = bisheriger Fortschritt, kein Neuladen nötig
        firstStart = false;
        activeId = id;
        profiles.active = id;
        writeProfiles(profiles);
        updateChip();
        closeDialog();
      } else {
        switchTo(id);
      }
    });
    if (!firstStart) overlay.addEventListener("click", (e) => { if (e.target === overlay) closeDialog(); });
    const renIn = overlay.querySelector("input.renIn");
    if (renIn) setTimeout(() => { renIn.focus(); renIn.select(); }, 50);
    const inp = overlay.querySelector(".sbUserNew input");
    if (firstStart && inp) setTimeout(() => inp.focus(), 50);
  }

  let chip = null;
  function updateChip() {
    if (!chip) return;
    const u = activeProfile();
    chip.innerHTML = `<span class="sbUserChip">👤 ${u ? esc(u.name) : "Benutzer"}</span>`;
  }

  function initUi() {
    const st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    chip = document.createElement("button");
    chip.type = "button";
    chip.className = "btn ghost";
    chip.title = "Benutzer wechseln / сменить пользователя";
    chip.addEventListener("click", () => { firstStart = false; renderDialog(); });
    const bar = document.querySelector(".top-actions");
    if (bar) bar.insertBefore(chip, bar.firstChild);
    updateChip();

    if (profiles.list.length === 0) {
      // Erster Start: Namen fragen
      firstStart = true;
      renderDialog();
    } else if (profiles.list.length > 1 && !sessionStorage.getItem("sb_user_gewaehlt")) {
      // Mehrere Benutzer: beim Öffnen fragen, wer lernt
      sessionStorage.setItem("sb_user_gewaehlt", "1");
      renderDialog();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initUi);
  else initUi();

  window.SprachBoxBenutzer = { aktiv: () => activeProfile(), oeffnen: () => renderDialog() };
})();
