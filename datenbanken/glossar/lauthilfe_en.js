// ============================================================
// Lauthilfe EN – „Wie liest man das?“ direkt beim Wort
// 2026-11-17 · Claude
// DE: zerlegt die Lautschrift (IPA) eines Wortes in einzelne Laute
//     (ʃ = sch «ш», aɪ = «ай» …) und sucht die passende Leseregel
//     (z. B. shine: sh → [ʃ], i … e → [aɪ] das stumme E).
//     Benutzt im Glossar und in der Wortkarte (glossar_karte.js).
// RU: разбирает транскрипцию слова по звукам и сразу показывает
//     нужное правило чтения – не надо искать в шпаргалке.
// ============================================================
(function () {
  "use strict";

  // Laut → [deutscher Name, Erklärung RU, Beispielwort]
  // звук → [название по-немецки, по-русски, пример]
  const LAUTE = {
    "ˈ": ["die Betonung", "ударение на следующий слог", ""],
    "ˌ": ["die Nebenbetonung", "слабое ударение", ""],
    "aɪ": ["der Doppellaut ai", "«ай»", "time"],
    "eɪ": ["der Doppellaut ej", "«эй»", "name"],
    "oʊ": ["der Doppellaut ou", "«оу»", "home"],
    "aʊ": ["der Doppellaut au", "«ау»", "house"],
    "ɔɪ": ["der Doppellaut eu", "«ой»", "boy"],
    "iː": ["das lange i", "долгое «ии»", "meet"],
    "uː": ["das lange u", "долгое «уу»", "food"],
    "ɜr": ["das betonte er", "«ёр» (ударное)", "work"],
    "ər": ["das unbetonte er", "слабое «ер»", "water"],
    "tʃ": ["das tsch", "«ч»", "teacher"],
    "dʒ": ["das dsch", "«дж»", "jacket"],
    "ɪ": ["das kurze i", "короткое «и», почти «ы»", "this"],
    "i": ["das i am Wortende", "короткое ясное «и»", "family"],
    "e": ["das e", "«э»", "yes"],
    "æ": ["das offene ä", "между «а» и «э», рот широко", "cat"],
    "ʌ": ["das kurze a", "короткое «а»", "cup"],
    "ɑ": ["das dunkle a", "глубокое «а»", "car"],
    "ɔ": ["das offene o", "открытое «о»", "call"],
    "ʊ": ["das kurze u", "короткое «у»", "good"],
    "ə": ["das Schwa", "слабый неясный звук «ə»", "again"],
    "ɜ": ["der ö-Laut", "похоже на «ё»", "bird"],
    "θ": ["das stimmlose th", "глухое «с», язык между зубами", "thank"],
    "ð": ["das stimmhafte th", "звонкое «з», язык между зубами", "this"],
    "ŋ": ["das ng", "«н» в нос, «г» не слышно", "morning"],
    "ʃ": ["das sch", "«ш»", "she"],
    "ʒ": ["das stimmhafte sch", "«ж»", "usually"],
    "w": ["das englische w", "губы трубочкой: «уа»", "water"],
    "v": ["das deutsche w", "«в»", "live"],
    "j": ["das j", "«й»", "yes"],
    "r": ["das englische r", "язык загнут назад, не раскатывать", "right"],
    "h": ["das h", "лёгкий выдох «х»", "help"],
    "z": ["das stimmhafte s", "«з»", "is"],
    "s": ["das stimmlose s", "«с»", "yes"],
    "p": ["das p", "«п»", ""], "b": ["das b", "«б»", ""], "t": ["das t", "«т»", ""], "d": ["das d", "«д»", ""],
    "k": ["das k", "«к»", ""], "ɡ": ["das g", "«г»", ""], "g": ["das g", "«г»", ""], "f": ["das f", "«ф»", ""],
    "m": ["das m", "«м»", ""], "n": ["das n", "«н»", ""], "l": ["das l", "«л»", ""],
  };
  const SCHLUESSEL = Object.keys(LAUTE).sort((a, b) => b.length - a.length);

  function zerlege(ipa) {
    const out = [];
    let s = String(ipa || "").replace(/[\[\]\/]/g, "");
    while (s.length) {
      if (/^[\s.,]/.test(s)) { s = s.slice(1); continue; }
      const k = SCHLUESSEL.find((x) => s.startsWith(x));
      if (k) { out.push(k); s = s.slice(k.length); }
      else { out.push(s[0]); s = s.slice(1); }
    }
    return out;
  }

  // ---------- die Leseregeln / правила чтения ----------
  const VOKAL_NAME = { a: ["eɪ", "«эй»"], i: ["aɪ", "«ай»"], o: ["oʊ", "«оу»"], u: ["juː", "«ю»"], e: ["iː", "«и»"] };
  const PAARE = {
    sh: ["ʃ", "«ш»"], ch: ["tʃ", "«ч»"], th: ["θ / ð", "язык между зубами"], ph: ["f", "«ф»"],
    ck: ["k", "«к»"], ng: ["ŋ", "«н» в нос"], wh: ["w", "«уа»"], qu: ["kw", "«кв»"],
  };

  function regeln(wort, ipa) {
    const w = String(wort || "").toLowerCase().trim();
    const i = String(ipa || "");
    const r = [];
    if (!w || /\s/.test(w)) return r; // nur einzelne Wörter / только отдельные слова
    const add = (id, titel, text) => { if (!r.some((x) => x.id === id && x.text === text)) r.push({ id, titel, text }); };

    // Buchstabenpaare: sh, ch, th …
    for (const [p, [laut, ru]] of Object.entries(PAARE)) {
      if (w.includes(p)) add("paare", "Die Buchstabenpaare", `<b>${p}</b> → [${laut}] ${ru}`);
    }
    // stummes E: Vokal + Konsonant + e am Ende
    const m = w.match(/([aeiou])([^aeiouy\s])e$/);
    if (m && VOKAL_NAME[m[1]] && i.includes(VOKAL_NAME[m[1]][0].replace("juː", "uː"))) {
      const [laut, ru] = VOKAL_NAME[m[1]];
      add("stummes-e", "Das stumme E", `<b>${m[1]} … e</b> → [${laut}] ${ru} – e в конце не читается, а ${m[1]} звучит как в алфавите`);
    }
    // 2026-11-17: Endung -ing/-ed/-er: das stumme E ist weggefallen (shine → shining)
    // RU: перед -ing/-ed немая e выпадает, но гласная всё равно читается «по алфавиту»
    const mf = w.match(/^(.*?([aeiou])([^aeiouy]))(ing|ed|er|est)$/);
    if (mf && VOKAL_NAME[mf[2]] && i.includes(VOKAL_NAME[mf[2]][0].replace("juː", "uː")) && !/[aeiou]{2}[^aeiouy](ing|ed|er|est)$/.test(w)) {
      const [laut, ru] = VOKAL_NAME[mf[2]];
      const grund = mf[1] + "e";
      add("stummes-e", "Das stumme E", `<b>${esc(w)}</b> ← <b>${esc(grund)}</b>: перед -${mf[4]} немая e выпадает, но <b>${mf[2]}</b> всё равно читается [${laut}] ${ru} (как в ${esc(grund)}). Признак: перед -${mf[4]} ОДНА согласная (<b>${mf[3]}</b>) → гласная длинная; две одинаковые (hopped, stopped) → коротко`);
    }
    if (/ee|ea/.test(w)) add("ee-ea", "Die Doppelvokale ee und ea", `<b>${w.includes("ee") ? "ee" : "ea"}</b> → обычно [iː] долгое «и»${w.includes("ea") && !i.includes("iː") ? " (здесь исключение!)" : ""}`);
    if (w.includes("oo")) add("oo", "Der Doppelvokal oo", `<b>oo</b> → [uː] «уу» или [ʊ] «у»`);
    if (/ai|ay/.test(w)) add("ai-oa", "Die Doppelvokale ai, ay, oa, ow", `<b>${w.includes("ai") ? "ai" : "ay"}</b> → [eɪ] «эй»`);
    if (w.includes("oa")) add("ai-oa", "Die Doppelvokale ai, ay, oa, ow", `<b>oa</b> → [oʊ] «оу»`);
    if (w.includes("ow")) add(i.includes("aʊ") ? "ou-oi" : "ai-oa", i.includes("aʊ") ? "Die Doppellaute ou, ow, oi, oy" : "Die Doppelvokale ai, ay, oa, ow", `<b>ow</b> → ${i.includes("aʊ") ? "[aʊ] «ау»" : "[oʊ] «оу»"}`);
    // 2026-11-19: ci / ti / si + Vokal → [ʃ] «ш» (delicious, station), Vokal + sion → [ʒ] «ж»
    const msh = w.match(/([cts])i(?=[aeiou])/);
    const shLaut = msh && (i.includes("ʃ") || i.includes("ʒ"));
    if (shLaut) {
      const zh = msh[1] === "s" && i.includes("ʒ");
      add("tion-cious", "ci, ti, si vor einem Vokal", `<b>${msh[1]}i</b> + гласная → ${zh ? "[ʒ] «ж»" : "[ʃ] «ш»"}, i отдельно не читается`);
    }
    // 2026-11-19: Endung -ous → [əs] «ес» (delicious, famous)
    const ousEnde = /ous$/.test(w) && /əs$/.test(i);
    if (ousEnde) add("schwa", "Das Schwa", `<b>-ous</b> в конце → [əs] «ес» (безударно)`);
    // 2026-11-19: a vor l / aw / au → [ɔ] «о» (call, talk, saw)
    if (/all|al[ktds]|aw|au/.test(w) && /ɔ/.test(i)) add("a-vor-l", "Das A vor L (all, al) und AW, AU", `<b>${w.match(/all|al[ktds]|aw|au/)[0]}</b> → [ɔ] «о»`);
    // 2026-11-19: Endungen -ed / -s
    if (/[^e]ed$/.test(w)) add("endungen-s-ed", "Die Endungen -s und -ed", `<b>-ed</b> → ${/ɪd$/.test(i) ? "[ɪd] «ид» (после t, d)" : /t$/.test(i) ? "[t] «т»" : "[d] «д»"}`);
    if (w.includes("ou") && !(ousEnde && (w.match(/ou/g) || []).length === 1)) add("ou-oi", "Die Doppellaute ou, ow, oi, oy", `<b>ou</b> → чаще [aʊ] «ау»`);
    if (/oi|oy/.test(w)) add("ou-oi", "Die Doppellaute ou, ow, oi, oy", `<b>${w.includes("oi") ? "oi" : "oy"}</b> → [ɔɪ] «ой»`);
    if (w.includes("igh")) add("igh-y", "Die Buchstaben igh und y", `<b>igh</b> → [aɪ] «ай», gh не читается`);
    else if (/[^aeiou]y$/.test(w)) add("igh-y", "Die Buchstaben igh und y", `<b>y</b> в конце → ${/aɪ$/.test(i) ? "[aɪ] «ай»" : "[i] «и»"}`);
    if (/^w[ao]|[^a-z]w[ao]/.test(w) || /^wor/.test(w)) add("w", "Das W ändert den Vokal", `<b>w</b> перед a/o меняет гласную`);
    else if (/[aeiou]r/.test(w)) add("vokal-r", "Vokal + R", `<b>${w.match(/[aeiou]r/)[0]}</b> → гласная + r читается вместе`);
    if (/c[eiy]/.test(w) && !(shLaut && msh[1] === "c" && !/c[ey]/.test(w) && (w.match(/ci/g) || []).length === 1)) add("c-g", "Die Buchstaben C und G", `<b>c</b> перед e, i, y → [s] «с»`);
    if (/g[eiy]/.test(w) && i.includes("dʒ")) add("c-g", "Die Buchstaben C und G", `<b>g</b> перед e, i, y → [dʒ] «дж»`);
    if (/^kn|^wr|mb$|gh|alk|^h(our|onest)/.test(w)) add("stumm", "Die stummen Buchstaben", `в слове есть немая буква – её не читают`);
    // geschlossene Silbe, wenn sonst nichts passt
    if (!r.some((x) => x.id !== "paare") && /^[^aeiou]*[aeiou][^aeiouy]+$/.test(w)) {
      add("kurz", "Die geschlossene Silbe", `одна гласная + согласная в конце → коротко`);
    }
    // wichtige Regeln zuerst, Buchstabenpaare zuletzt / главное правило – первым
    return r.filter((x) => x.id !== "paare").concat(r.filter((x) => x.id === "paare"));
  }

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function stilEinmal() {
    if (document.getElementById("lauthilfe-stil")) return;
    const st = document.createElement("style");
    st.id = "lauthilfe-stil";
    st.textContent = `
.lh-box{margin:4px 0 10px;padding:8px 10px;border:1px solid rgba(127,127,127,.35);border-left:4px solid #1f6feb;border-radius:10px;font-size:15px;line-height:1.6}
.lh-titel{font-weight:700;margin-bottom:2px}
.lh-laute{display:flex;flex-wrap:wrap;gap:4px 12px}
.lh-laut{font:inherit;cursor:pointer;border:none;background:none;padding:0;color:inherit;text-align:left}
.lh-laut b{font-family:"Segoe UI","DejaVu Sans","Lucida Sans Unicode",sans-serif;color:#1f6feb;font-size:18px}
.lh-laut:hover{text-decoration:underline}
.lh-regeln{margin:4px 0 0;padding-left:18px}
.lh-regeln a{font-weight:700;color:inherit}
.lh-links{margin-top:4px;display:flex;flex-wrap:wrap;gap:6px}
.lh-links a{font-size:13px;color:inherit;border:1px solid rgba(127,127,127,.4);border-radius:999px;padding:2px 10px;text-decoration:none}
.gl-ipa-btn,.gk-ipa-btn{font:inherit;cursor:pointer;border:none;background:none;padding:0 2px;border-radius:6px}
.gl-ipa-btn:hover,.gk-ipa-btn:hover{background:rgba(31,111,235,.15)}`;
    document.head.appendChild(st);
  }

  // HTML-Block „Wie liest man das?“
  // opt: { spick: URL des Spickzettels, lese: URL der Leseregeln, hoerAttr: Name des Attributs zum Anhören }
  function html(wort, ipa, opt) {
    opt = opt || {};
    if (!ipa) return "";
    stilEinmal();
    const hoer = opt.hoerAttr || "data-hoer";
    const laute = [];
    zerlege(ipa).forEach((z) => { if (LAUTE[z] && !laute.includes(z)) laute.push(z); });
    const chips = laute.map((z) => {
      const [name, ru, bsp] = LAUTE[z];
      const sag = bsp ? ` ${hoer}="${esc(bsp)}" data-l="en" title="Beispiel anhören: ${esc(bsp)}"` : "";
      return `<button type="button" class="lh-laut"${sag}><b>${esc(z)}</b> ${esc(name)} – ${esc(ru)}${bsp ? ` <small>(${esc(bsp)} 🔊)</small>` : ""}</button>`;
    }).join("");
    const rg = regeln(wort, ipa);
    const lese = opt.lese || "";
    const regelnHtml = rg.length
      ? `<ul class="lh-regeln">${rg.map((x) => `<li>${lese ? `<a href="${lese}#r-${x.id}" target="quantura_lese">📏 ${esc(x.titel)}</a>` : `<b>📏 ${esc(x.titel)}</b>`}: ${x.text}</li>`).join("")}</ul>`
      : "";
    const spick = opt.spick
      ? `${opt.spick}${opt.spick.indexOf("?") < 0 ? "?" : "&"}z=${encodeURIComponent(laute.join(","))}${opt.von ? "&von=" + encodeURIComponent(opt.von) : ""}`
      : "";
    return `<div class="lh-box">
      <div class="lh-titel">Wie liest man das? / как читается <b>${esc(wort)}</b> [${esc(ipa)}]</div>
      <div class="lh-laute">${chips}</div>
      ${regelnHtml}
      <div class="lh-links">${spick ? `<a href="${spick}" target="quantura_spick">🔤 diese Laute im Spickzettel ↗</a>` : ""}${lese ? `<a href="${lese}" target="quantura_lese">📏 alle Leseregeln ↗</a>` : ""}</div>
    </div>`;
  }

  window.LAUTHILFE_EN = { zerlege, regeln, html, LAUTE };
})();
