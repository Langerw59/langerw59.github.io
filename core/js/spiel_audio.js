// ============================================================
// SpielAudio – schöne Stimme für die Spiele (Mathe-Spaß, Schach-Spaß …)
// 2026-11-26
// DE: Spielt fertige MP3-Dateien (neuronale Microsoft-Stimmen, erzeugt mit
//     tools/audio_spiele/make_audio_spiele.py) aus /audio/spiele/.
//     Ein Satz besteht aus Teilen, z. B. ["Hallo Tom!", "Team Tiger.", "Los geht's!"].
//     Fehlt auch nur ein Teil als MP3, spricht die Gerätestimme den ganzen Satz.
// RU: проигрывает готовые MP3 (красивый голос); если файла нет – голос устройства.
// ============================================================
(function () {
  const BASIS = '/audio/spiele/';
  let index = null;
  let laden = null;
  let aktuell = null;
  let nummer = 0;

  // 2026-11-26: das Tempo – langsam / normal / schnell (für alle Spiele gleich)
  const TEMPO_KEY = 'spiel_tempo_v1';
  const TEMPI = { langsam: 0.75, normal: 1, schnell: 1.2 };
  function tempo() { const t = localStorage.getItem(TEMPO_KEY); return TEMPI[t] ? t : 'normal'; }
  function tempoSetzen(t) { if (TEMPI[t]) localStorage.setItem(TEMPO_KEY, t); }
  function faktor() { return TEMPI[tempo()]; }

  function norm(t) { return String(t == null ? '' : t).normalize('NFC').trim().replace(/\s+/g, ' '); }

  function indexLaden() {
    if (!laden) {
      laden = fetch(BASIS + 'index.json', { cache: 'no-cache' })
        .then(r => (r.ok ? r.json() : {}))
        .catch(() => ({}))
        .then(j => { index = j || {}; return index; });
    }
    return laden;
  }

  function stop() {
    nummer += 1;
    if (aktuell) { try { aktuell.pause(); } catch (e) {} aktuell = null; }
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  }

  function geraeteStimme(text, lang) {
    if (!('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'en' ? 'en-GB' : 'de-DE';
      u.rate = 0.95 * faktor();
      const v = window.speechSynthesis.getVoices().find(x => (lang === 'en' ? /^en/i : /^de/i).test(x.lang));
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function abspielen(url, meine) {
    return new Promise(fertig => {
      if (meine !== nummer) { fertig(); return; }
      const a = new Audio(url);
      a.playbackRate = faktor();
      a.preservesPitch = true;
      aktuell = a;
      a.onended = fertig;
      a.onerror = fertig;
      const p = a.play();
      if (p && p.catch) p.catch(fertig);
    });
  }

  // teile: Text oder Liste von Texten; lang: 'de' oder 'en'
  async function sagen(teile, lang) {
    lang = lang === 'en' ? 'en' : 'de';
    const liste = (Array.isArray(teile) ? teile : [teile]).map(norm).filter(Boolean);
    if (!liste.length) return;
    stop();
    const meine = nummer;
    const idx = await indexLaden();
    if (meine !== nummer) return;
    const tabelle = (idx && idx[lang]) || {};
    const dateien = liste.map(t => tabelle[t]);
    if (dateien.some(d => !d)) {
      if (window.SpielAudioDebug) console.info('[SpielAudio] fehlt:', liste.filter((t, i) => !dateien[i]));
      geraeteStimme(liste.join(' '), lang);
      return;
    }
    for (const d of dateien) {
      if (meine !== nummer) return;
      await abspielen(BASIS + d, meine);
      if (tempo() === 'langsam') await new Promise(w => setTimeout(w, 180)); // kleine Pause zwischen den Teilen
    }
  }

  // Rechenaufgabe in Teile zerlegen: "Rechne: 12 + 7 =" → ["Rechne", "12", "plus", "7", "gleich wie viel"]
  function aufgabeTeile(text, lang) {
    const en = lang === 'en';
    const W = en
      ? { 'Calculate:': 'Calculate', 'Fill in:': 'Fill in', '+': 'plus', '-': 'minus', '×': 'times', '÷': 'divided by', '=': 'equals', '?': 'what', 'remainder': 'remainder' }
      : { 'Rechne:': 'Rechne', 'Ergänze:': 'Ergänze', '+': 'plus', '-': 'minus', '·': 'mal', ':': 'geteilt durch', '=': 'gleich', '?': 'wie viel', 'Rest': 'Rest' };
    const toks = norm(text).replace(/^Fill in:/, 'Fill\u00a0in:').split(' ').map(t => t.replace('\u00a0', ' '));
    const out = [];
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i];
      if (W[t]) {
        if (t === '=' && i === toks.length - 1) out.push(en ? 'equals what' : 'gleich wie viel');
        else out.push(W[t]);
      } else if (/^\d{1,3}([.,]\d{3})*$/.test(t)) {
        out.push(String(Number(t.replace(/[.,]/g, ''))));
      } else {
        return null; // unbekanntes Wort (z. B. Textaufgabe) → Gerätestimme
      }
    }
    return out;
  }

  indexLaden();
  window.SpielAudio = { sagen, stop, aufgabeTeile, norm, indexLaden, tempo, tempoSetzen };
})();
