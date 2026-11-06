# Changelog – SprachBox DE↔IT

## 2026-11-06 (neu aufgebaut wie DE↔EN)

- Vorher war hier eine Kopie der alten DE↔EN-App mit **englischen** Sätzen (nur der Titel war Italienisch).
- Jetzt: gleiches Programm wie DE↔EN (Lektionen der Reihe nach, der Benutzer, Tempo in der Karte, mp3-Aufnahmen), aber mit **italienischen** Karten.
- Neu: `data/lektionen_de_it.json` – 24 Lektionen (Level 1: 16, Level 2: 8), je 6 Sätze, gleiche Themen wie bei Englisch. Mit Merkhilfen (Muster, z. B. „Vorrei … = Ich möchte …“).
- Sprachausgabe Italienisch (`it-IT`). Stimme wählbar unter „Stimme Italienisch“.
- Eigene Speicher-Schlüssel (`sprachbox_it_…`): der Fortschritt Italienisch mischt sich nicht mit Englisch.
- Eigener Service-Worker-Cache `sprachbox-it-v1` (löscht nur seine eigenen alten Caches).
- mp3: `tools/make_audio_de_it.bat` (Doppelklick am Computer) erzeugt neuronale Stimmen (it-IT-ElsaNeural, de-DE-KatjaNeural). Bis dahin spricht die Browser-Stimme.
- Alte englische Daten (`talk_levels_de_en.json`, `sentences_a1.json`, `de_en_sample.json`) hier entfernt – sie liegen weiter in der DE↔EN-App.
