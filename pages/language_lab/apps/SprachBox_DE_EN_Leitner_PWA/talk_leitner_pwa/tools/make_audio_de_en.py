# -*- coding: utf-8 -*-
"""
SprachBox DE<->EN: erzeugt mp3-Audiodateien mit neuronalen Microsoft-Stimmen (edge-tts).
Erstellt 2026-11-02.

Einmalig:   pip install edge-tts
Starten:    python tools\\make_audio_de_en.py            (im Ordner talk_leitner_pwa)
Optionen:   --voice-en en-US-AriaNeural  --voice-de de-DE-KatjaNeural  --limit 20 (nur testen)

Ergebnis:   audio/en/*.mp3, audio/de/*.mp3 und audio/index.json (Text -> Datei).
Die App spielt diese Dateien automatisch ab; fehlt eine Datei, nimmt sie die Browser-Stimme.
Bereits vorhandene Dateien werden uebersprungen -> das Skript kann jederzeit erneut laufen.
"""
import argparse, asyncio, hashlib, json, os, sys, unicodedata

try:
    import edge_tts
except ImportError:
    sys.exit("Bitte zuerst installieren:  pip install edge-tts")

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)  # .../talk_leitner_pwa
# 2026-11-02: Die App benutzt jetzt nur noch die Lektionen -> nur dafuer Audio erzeugen (144 Saetze, geht schnell).
# Alte Saetze wieder vertonen: "data/talk_levels_de_en.json", "data/sentences_a1.json" hier ergaenzen.
DATA_FILES = ["data/lektionen_de_en.json"]


def norm(text):
    # Muss zu normAudioKey() in app.js passen
    t = unicodedata.normalize("NFC", str(text or "")).strip()
    return " ".join(t.split())


def fname(text):
    return hashlib.sha1(norm(text).encode("utf-8")).hexdigest()[:16] + ".mp3"


def collect():
    de, en = set(), set()
    for rel in DATA_FILES:
        p = os.path.join(APP, rel)
        if not os.path.exists(p):
            print("  fehlt (uebersprungen):", rel)
            continue
        with open(p, encoding="utf-8-sig") as f:
            data = json.load(f)
        items = data.get("items", data) if isinstance(data, dict) else data
        for it in items:
            if not isinstance(it, dict):
                continue
            if norm(it.get("de")):
                de.add(norm(it["de"]))
            if norm(it.get("en")):
                en.add(norm(it["en"]))
    return sorted(de), sorted(en)


async def make_one(text, voice, path, sem, stats):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        stats["skip"] += 1
        return True
    async with sem:
        for attempt in range(4):
            try:
                tmp = path + ".part"
                await edge_tts.Communicate(text, voice, rate="-5%").save(tmp)
                os.replace(tmp, path)
                stats["new"] += 1
                done = stats["new"] + stats["skip"]
                if done % 50 == 0:
                    print(f"  {done}/{stats['total']} ...")
                return True
            except Exception as e:
                if attempt == 3:
                    print("  FEHLER:", text[:60], "->", e)
                    stats["err"] += 1
                    return False
                await asyncio.sleep(2 * (attempt + 1))


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice-en", default="en-US-AriaNeural")
    ap.add_argument("--voice-de", default="de-DE-KatjaNeural")
    ap.add_argument("--limit", type=int, default=0, help="nur die ersten N Saetze je Sprache (Test)")
    ap.add_argument("--parallel", type=int, default=4)
    a = ap.parse_args()

    de, en = collect()
    if a.limit:
        de, en = de[: a.limit], en[: a.limit]
    print(f"Saetze: DE {len(de)}, EN {len(en)}")

    index = {"de": {}, "en": {}, "voices": {"de": a.voice_de, "en": a.voice_en}}
    jobs = []
    sem = asyncio.Semaphore(a.parallel)
    stats = {"new": 0, "skip": 0, "err": 0, "total": len(de) + len(en)}
    for lang, texts, voice in (("de", de, a.voice_de), ("en", en, a.voice_en)):
        folder = os.path.join(APP, "audio", lang)
        os.makedirs(folder, exist_ok=True)
        for t in texts:
            fn = fname(t)
            jobs.append((lang, t, fn, make_one(t, voice, os.path.join(folder, fn), sem, stats)))

    results = await asyncio.gather(*(j[3] for j in jobs))
    for (lang, t, fn, _), ok in zip(jobs, results):
        if ok:
            index[lang][t] = f"{lang}/{fn}"

    # vorhandenen Index ergaenzen (z.B. nach --limit-Test)
    ip = os.path.join(APP, "audio", "index.json")
    if os.path.exists(ip) and a.limit:
        with open(ip, encoding="utf-8") as f:
            old = json.load(f)
        for lang in ("de", "en"):
            old.get(lang, {}).update(index[lang])
            index[lang] = old.get(lang, {})
    with open(ip, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=0)

    print(f"Fertig: neu {stats['new']}, schon da {stats['skip']}, Fehler {stats['err']}")
    print("Index:", ip)


if __name__ == "__main__":
    asyncio.run(main())
