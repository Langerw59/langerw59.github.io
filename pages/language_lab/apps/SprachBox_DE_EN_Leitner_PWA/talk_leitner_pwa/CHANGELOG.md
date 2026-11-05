# Changelog

## 2026-11-05 (Namen ändern)

- Neu: Knopf ✏️ neben jedem Benutzer – Namen korrigieren (✔ speichern, ✖ abbrechen). Der Fortschritt bleibt erhalten.
- Service-Worker-Cache `sprachbox-v22`.

## 2026-11-05 (der Benutzer)

- Neu: Knopf „👤 Name“ oben. Jeder Benutzer hat seinen eigenen Fortschritt (Boxen, Sterne, Lektionen, Lernzeit, Einstellungen).
- Erster Start: Frage „Wer lernt?“. Der erste Name übernimmt den bisherigen Fortschritt.
- Neuer Benutzer beginnt alle Karten von vorn. Bei mehreren Benutzern fragt die App beim Öffnen, wer lernt.
- Benutzer löschen (🗑) möglich, außer dem gerade aktiven.
- Gemeinsam bleiben: Glossar, Hintergrund, Text-Korrekturen.
- Neue Datei `benutzer.js` (wird vor `app.js` geladen). Service-Worker-Cache `sprachbox-v21`.

## 2026-11-02 (Tempo in der Karte)

- Neu: In jeder Karte Knöpfe „🐢 Langsam / Normal / 🐇 Schnell“. Klick ändert das Tempo und liest die gerade sichtbare Seite sofort nochmal vor – die Karte bleibt offen.
- Tempo-Stufen deutlicher: Langsam 0.6×, Normal 0.9×, Schnell 1.2× (vorher 0.85 / 1.0 / 1.15). Gilt auch für die Knöpfe im Hauptmenü.
- Der aktive Tempo-Knopf ist markiert.
- Service-Worker-Cache `sprachbox-v19`.

## 2026-11-02 (Fix: 0 Karten)

- Filter „⭐ Gemerkt“ zeigte 0 Karten, weil alte Sterne zu alten Karten gehören. Gibt es keine gemerkte Karte, stellt die App den Filter automatisch auf „Alle“.
- Thema und Stufe passen nicht zusammen (z. B. L2-Thema + Stufe 1) -> Stufe automatisch auf „Alle“.
- Tageslimit (2 neue Lektionen) sperrt nicht mehr: Frage „Für heute genug – weiterlernen?“ mit Knopf „Weiter lernen ▶“.
- Service-Worker-Cache `sprachbox-v18`.

## 2026-11-02 (Lektionen)

- Neu: `data/lektionen_de_en.json` – 24 Lektionen (Level 1: 16, Level 2: 8), je 6 kurze, korrekte Sätze.
- Ist die Datei da, lädt die App NUR die Lektionen (alte Schablonen-Sätze und A1-Deck mit Fehlern werden nicht mehr geladen; Dateien bleiben erhalten).
- Neue Karten nicht mehr zufällig gemischt, sondern der Reihe nach, immer genau eine Lektion.
- Neue Lektion erst, wenn keine Karte mehr in Box 1 ist (alles einmal gewusst). Max. 2 neue Lektionen pro Tag.
- Erst Wiederholung (fällige Karten), danach die neue Lektion – in einem Durchgang.
- „Nicht gewusst“ / „Vergessen“: Karte kommt im selben Durchgang nach 2 Karten nochmal (max. 3x).
- Service-Worker-Cache `sprachbox-v16`. Audio-Skript vertont nur noch die Lektionen.

## 2026-10-28

- Sprachausgabe (TTS) standardmaessig auf `Beide` statt `Aus`.
- Chrome-Fehler behoben: Text wurde nach `cancel()` manchmal verschluckt (kurze Verzoegerung).
- Hinweis, wenn keine Englisch- oder Deutsch-Stimme installiert ist.
- Service-Worker-Cache auf `sprachbox-v13` erhoeht, damit die neue Version geladen wird.

## 2026-02-23

- UI-Begriffe geklaert:
  - Inhalts-`Level` wird in der Anzeige jetzt als `Stufe` bezeichnet.
  - Leitner-Fortschritt bleibt `Box` (nun 8 Boxen in der UI/Logik).
- Datenmodell rueckwaertskompatibel getrennt:
  - Karten/Deck-Eintraege nutzen `stufe` (Alias `level` bleibt lesbar).
  - Fortschritt nutzt `box` (Migration alter Progress-Eintraege mit `meta.level -> meta.box`).
- Neues A1-Zusatzdeck (offline) hinzugefuegt:
  - Datei: `data/sentences_a1.json`
  - Wird als Zusatzdeck automatisch geladen (falls vorhanden), ohne bestehende Decks zu ersetzen.
