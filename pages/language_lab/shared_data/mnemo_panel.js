/* 2026-11-07: das Mnemo-Fenster (Merksatz + kleine Zeichnung) für alle Sprachführer
   окно «Мнемо»: подсказка-ассоциация (текст) + маленький рисунок пальцем.
   Gemeinsam für SprachBox DE↔EN/RU/ES/FR/IT/TR. Kein prompt() mehr (funktioniert in der iPhone-App nicht zuverlässig). */
(function () {
  "use strict";
  if (window.MnemoPanel) return;

  const W = 320, H = 180;
  const COLORS = [
    ["#111111", "Schwarz"], ["#d62828", "Rot"], ["#1d4ed8", "Blau"],
    ["#15803d", "Grün"], ["#f59e0b", "Orange"],
  ];
  const EMOJIS = ["☕", "🏠", "🚗", "🍞", "💶", "👍", "❓", "❤️", "⏰", "🛒", "🍺", "🌳"];

  const css = `
  .mnemoPanel{position:fixed;inset:0;z-index:20000;display:flex;align-items:center;justify-content:center;
    background:rgba(0,0,0,.55);padding:8px;}
  .mnemoPanel[hidden]{display:none;}
  .mnemoBox{background:#fdfdfb;color:#111;border-radius:16px;max-width:760px;width:100%;
    max-height:100%;overflow:auto;padding:12px 14px;box-shadow:0 10px 40px rgba(0,0,0,.5);font-family:system-ui,sans-serif;}
  .mnemoHead{font-weight:800;font-size:16px;margin-bottom:8px;}
  .mnemoHead small{display:block;font-weight:400;color:#555;font-size:13px;margin-top:2px;}
  .mnemoBody{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start;}
  .mnemoDraw{flex:0 0 auto;}
  .mnemoCanvas{width:${W}px;height:${H}px;max-width:100%;background:#fff;border:2px dashed #999;border-radius:10px;
    touch-action:none;display:block;cursor:crosshair;}
  .mnemoTools{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center;}
  .mnemoColor{width:28px;height:28px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #888;cursor:pointer;padding:0;}
  .mnemoColor.on{box-shadow:0 0 0 3px #111;}
  .mnemoSide{flex:1 1 220px;min-width:200px;display:flex;flex-direction:column;gap:6px;}
  .mnemoSide label{font-size:13px;color:#444;}
  .mnemoText{width:100%;min-height:70px;font-size:16px;padding:8px;border-radius:10px;border:1px solid #aaa;box-sizing:border-box;resize:vertical;background:#fff !important;color:#111 !important;}
  .mnemoEmojis{display:flex;flex-wrap:wrap;gap:4px;}
  .mnemoEmojis button{font-size:20px;background:#f1f1ee;border:1px solid #ccc;border-radius:8px;padding:2px 6px;cursor:pointer;}
  .mnemoBtns{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin-top:10px;}
  .mnemoBtns button,.mnemoTools button.mnemoSmall{font-size:15px;padding:8px 12px;border-radius:10px;border:1px solid #888;background:#eee;cursor:pointer;}
  .mnemoBtns .mnemoSave{background:#15803d;color:#fff;border-color:#15803d;font-weight:700;}
  .mnemoBtns .mnemoDel{background:#fff;color:#b91c1c;border-color:#b91c1c;}
  .mnemo .mnemoImg{display:block;max-width:100%;max-height:70px;margin-top:4px;border-radius:8px;background:#fff;}
  .mnemo .mnemoTxt{white-space:pre-wrap;}
  @media (max-height:480px){ .mnemoText{min-height:50px;} .mnemoBox{padding:8px 10px;} .mnemoHead{margin-bottom:4px;} }
  `;

  let panel, canvas, ctx, textEl, titleEl, color = COLORS[0][0], drawn = false, onSave = null;

  function build() {
    if (panel) return;
    const st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    panel = document.createElement("div");
    panel.className = "mnemoPanel";
    panel.setAttribute("data-farbe-fest", ""); // Farbwächter hier nicht umfärben
    panel.hidden = true;
    panel.innerHTML = `
      <div class="mnemoBox" role="dialog" aria-label="Mnemo">
        <div class="mnemoHead">💡 das Mnemo – die Eselsbrücke <small class="mnemoTitle"></small></div>
        <div class="mnemoBody">
          <div class="mnemoDraw">
            <canvas class="mnemoCanvas" width="${W}" height="${H}"></canvas>
            <div class="mnemoTools"></div>
          </div>
          <div class="mnemoSide">
            <label>der Merksatz / подсказка (необязательно)</label>
            <textarea class="mnemoText" placeholder="z. B. I'd = I would → ich möchte"></textarea>
            <label>das Bildchen / значок — нажмите, чтобы добавить:</label>
            <div class="mnemoEmojis"></div>
          </div>
        </div>
        <div class="mnemoBtns">
          <button type="button" class="mnemoDel">🗑 Mnemo löschen</button>
          <button type="button" class="mnemoCancel">Abbrechen</button>
          <button type="button" class="mnemoSave">✓ Speichern</button>
        </div>
      </div>`;
    document.body.appendChild(panel);

    canvas = panel.querySelector(".mnemoCanvas");
    ctx = canvas.getContext("2d");
    textEl = panel.querySelector(".mnemoText");
    titleEl = panel.querySelector(".mnemoTitle");

    const tools = panel.querySelector(".mnemoTools");
    COLORS.forEach(([c, name], i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "mnemoColor" + (i === 0 ? " on" : "");
      b.style.setProperty("background", c, "important");
      b.title = name;
      b.addEventListener("click", () => {
        color = c;
        tools.querySelectorAll(".mnemoColor").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
      });
      tools.appendChild(b);
    });
    const clr = document.createElement("button");
    clr.type = "button";
    clr.className = "mnemoSmall";
    clr.textContent = "✏️ Bild leeren";
    clr.addEventListener("click", clearCanvas);
    tools.appendChild(clr);

    const em = panel.querySelector(".mnemoEmojis");
    EMOJIS.forEach((e) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = e;
      b.addEventListener("click", () => {
        textEl.value = (textEl.value ? textEl.value + " " : "") + e;
      });
      em.appendChild(b);
    });

    // Zeichnen mit Finger oder Maus / рисование пальцем или мышью
    let down = false, lx = 0, ly = 0;
    const pos = (ev) => {
      const r = canvas.getBoundingClientRect();
      return [(ev.clientX - r.left) * (W / r.width), (ev.clientY - r.top) * (H / r.height)];
    };
    canvas.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      down = true;
      try { canvas.setPointerCapture(ev.pointerId); } catch (_) {}
      [lx, ly] = pos(ev);
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(lx, ly, 2, 0, Math.PI * 2); ctx.fill();
      drawn = true;
    });
    canvas.addEventListener("pointermove", (ev) => {
      if (!down) return;
      ev.preventDefault();
      const [x, y] = pos(ev);
      ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.stroke();
      lx = x; ly = y;
      drawn = true;
    });
    const up = () => { down = false; };
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", up);

    panel.querySelector(".mnemoCancel").addEventListener("click", close);
    panel.querySelector(".mnemoSave").addEventListener("click", () => {
      const text = textEl.value.trim();
      const drawing = drawn ? canvas.toDataURL("image/png") : "";
      const cb = onSave;
      close();
      if (cb) cb(text, drawing);
    });
    panel.querySelector(".mnemoDel").addEventListener("click", () => {
      if (!confirmSafe("Mnemo für diese Karte löschen?")) return;
      const cb = onSave;
      close();
      if (cb) cb("", "");
    });
    panel.addEventListener("click", (ev) => { if (ev.target === panel) close(); });
    // Tasten im Fenster nicht an die Karte weitergeben / клавиши не передавать карточке
    panel.addEventListener("keydown", (ev) => { ev.stopPropagation(); if (ev.key === "Escape") close(); });
    panel.addEventListener("keyup", (ev) => ev.stopPropagation());
  }

  function confirmSafe(msg) {
    try { return window.confirm(msg); } catch (_) { return true; }
  }

  function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    drawn = false;
  }

  function open(opts) {
    build();
    onSave = opts.onSave || null;
    titleEl.textContent = opts.title || "";
    textEl.value = opts.text || "";
    clearCanvas();
    if (opts.drawing) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, W, H); drawn = true; };
      img.src = opts.drawing;
    }
    panel.hidden = false;
  }

  function close() {
    if (panel) panel.hidden = true;
    onSave = null;
  }

  // Anzeige auf der Karte / показ на карточке
  function render(el, text, drawing) {
    if (!el) return;
    el.textContent = "";
    text = (text || "").trim();
    if (!text && !drawing) { el.hidden = true; return; }
    if (text) {
      const t = document.createElement("div");
      t.className = "mnemoTxt";
      t.textContent = "💡 " + text;
      el.appendChild(t);
    }
    if (drawing) {
      const img = document.createElement("img");
      img.className = "mnemoImg";
      img.alt = "Mnemo";
      img.src = drawing;
      el.appendChild(img);
    }
    el.hidden = false;
  }

  window.MnemoPanel = { open, close, render, isOpen: () => !!(panel && !panel.hidden) };
})();
