# Changelog

## 2026-11-17 – Schreiben: die Groß- und Kleinschreibung wird geprüft
- kleiner Satzanfang, kleines „I“ oder unnötiger Großbuchstabe = Fehler (Wort rot unterstrichen, daneben deine Schreibweise)
- Häkchen „Groß-/Kleinschreibung prüfen“ zum Ausschalten; Kurzformen (I'm = I am) weiter erlaubt; Cache sprachbox-v49

## 2026-11-17 – Schreiben: die Satzzeichen werden mitgeprüft
- . , ? ! werden geprüft (Groß-/Kleinschreibung weiterhin nicht); fehlendes/falsches Zeichen rot umrandet; „ganz richtig“ nur mit richtigen Satzzeichen
- „!“ und „.“ am Satzende gelten als gleich (im Englischen ist „!“ freiwillig) – nur ein Hinweis; „?“ muss stimmen
- Häkchen „Satzzeichen prüfen“ zum Ausschalten; Grammatik: neue Regel „die Satzarten und die Satzzeichen“; Cache sprachbox-v48

## 2026-11-17 – Ordnung: Grammatik statt Spickzettel/Leseregeln
- oben nur noch: Lieder · Glossar · Grammatik; Spickzettel und Leseregeln sind in der Grammatik (Thema „das Lesen“) – die alten Knöpfe sind nur versteckt
- Zurück im Spickzettel/den Leseregeln führt zur Grammatik zurück; frisch geöffneter Tab wird geschlossen; Cache sprachbox-v47

## 2026-11-17 – Glossar, Spickzettel, Leseregeln im eigenen Tab
- aus der SprachBox (Knöpfe oben und Wortkarte) öffnen Glossar, Spickzettel und Leseregeln jeweils in einem eigenen Tab – die Karteikarten-Sitzung bleibt offen und fängt nicht von vorn an
- immer derselbe Tab pro Seite (kein Tab-Chaos); „↩ Zurück“ schließt den Tab und zeigt wieder die SprachBox; Cache sprachbox-v46

## 2026-11-17 – „Wie liest man das?“ direkt beim Wort
- Glossar und Wortkarte: [Lautschrift] antippen = Wort anhören
- neuer Block „Wie liest man das?“: jeder Laut einzeln (ʃ = das sch «ш», aɪ «ай» …, mit Beispiel zum Anhören) und die passende Leseregel mit Link (z. B. shine: das stumme E)
- Formen mit -ing/-ed: Hinweis, dass das stumme E weggefallen ist (shine → shining [aɪ]); Leseregel „Das stumme E“ um diesen Hinweis + shine/shining/making/writing ergänzt
- Spickzettel: Link aus dem Wort zeigt oben nur die Laute dieses Wortes (?z=…) und hebt sie hervor
- neue Datei datenbanken/glossar/lauthilfe_en.js; Cache sprachbox-v45

## 2026-11-17 – Fix: Stimmen überlagern sich im Diktat
- Enter (weiter) im Schreib-Modus liest den alten Satz nicht mehr vor – nur noch der neue Satz ist zu hören
- beim Wechsel zur nächsten Karte und beim Schließen wird jede laufende Sprachausgabe gestoppt (auch kein Wiederholen nach dem Ergebnis); Cache sprachbox-v44

## 2026-11-17 – Schreiben: Fehler korrigieren + Ergebnis in Prozent
- nach einem Fehler: Text korrigieren und noch einmal Enter (beliebig oft); Enter ohne Änderung = weiter
- „gewusst“ nur, wenn der Satz beim 1. Versuch ganz richtig war; sonst „nicht gewusst“ → Box 1, die Karte kommt in derselben Sitzung noch einmal
- Zähler in der Karte: Sätze · ganz richtig · Versuche · Fehler · Prozent
- am Ende (Karte schließen oder alle Karten fertig): Fenster „Das Ergebnis“ mit Prozent und früheren Ergebnissen; Cache sprachbox-v43

## 2026-11-17 – der Schreib-Modus (Sprachführer + Diktat zusammen)
- neuer Knopf in der Karte „✍️ Schreiben“: Aus → Lesen → Diktat (auch als Auswahl „✍️ Schreiben“ in den Einstellungen)
- Lesen: deutscher Satz sichtbar, englischen Satz eintippen; Diktat: deutscher Satz verschwommen (👁 DE zeigt ihn), Englisch wird vorgelesen
- Prüfung: Groß-/Kleinschreibung, Satzzeichen und Kurzformen (I'm = I am) zählen nicht als Fehler; Fehler pro Wort (rot) und Tippfehler pro Buchstabe (gelb)
- Enter: 1× prüfen, 2× bewerten (Vorschlag gelb umrandet) und nächste Karte; Leertaste/Pfeile im Eingabefeld drehen die Karte nicht mehr
- neue Datei schreiben.js; Cache sprachbox-v42

## 2026-11-14 – дословно + по-русски
- Rückseite jeder Karte (144 Lektionssätze): zwei Zeilen – „дословно“ (Wort für Wort aus dem Englischen, z. B. „Я есть смотрящий для одна куртка.“) und „по-русски“ (normaler Satz: „Я ищу куртку.“)
- neue Felder wort / ru in data/lektionen_de_en.json; Cache sprachbox-v41

## 2026-11-12 – Stimme „Auto“ ohne Spaß-Stimmen
- iPhone mit deutschem Menü: Spaß-Stimmen heißen dort „Gute Neuigkeiten“, „Glocken“, „Seifenblasen“ … – sie werden jetzt erkannt (auch an der voiceURI) und nicht mehr angeboten
- „Auto“ nimmt nie eine Spaß-Stimme, auch wenn eine gute Stimme vorher als „stumm“ markiert war; Cache sprachbox-v36
- dasselbe in leseregeln.html, DE↔IT, Satzlabor und Glossar

## 2026-11-12 – Handy hochkant, Merksätze Wetter
- L1-12 Wetter: passende Merksätze für „Es regnet.“, „Die Sonne scheint.“, „Das Wetter ist schön.“
- iPhone hochkant: Kopfleiste bricht um (Knöpfe zum Wischen), Knöpfe unten (Zurück / Portal) überdecken nichts mehr; Cache sprachbox-v35

## 2026-11-11 – die Leseregeln
- Neue Seite leseregeln.html: 14 Leseregeln Englisch (Erklärung auf Russisch), 141 Wörter mit Lautschrift, Sprachausgabe, „Alle anhören“, Test je Regel und gemischter Test
- Knopf „📏 Leseregeln“ im Sprachführer und im Spickzettel; Cache sprachbox-v33
- tools/make_audio_de_en.py vertont auch die Wörter der Leseregeln



## 2026-11-06 (Knopf Weiter auf dem iPhone)

- „Weiter / Next“ reagierte oft nicht: iOS hielt „Gewusst“ + „Weiter“ schnell nacheinander für einen Doppeltipp (Zoom). Jetzt `touch-action: manipulation` auf allen Knöpfen.
- Handy quer: nach der Antwort erscheint an der Stelle von Gewusst/Nicht gewusst ein großer Knopf „Weiter“. Rechte Spalte ohne eigene Scroll-Fläche.

## 2026-11-06 (Handy quer / Fernseher)

- Handy quer (z. B. iPhone auf den Fernseher gespiegelt): Karte links, Knöpfe rechts. „Gewusst / Nicht gewusst“, Tempo und × sind immer sichtbar, ohne Scrollen. Die Karte liegt dann über der Kopfleiste.
- Hochformat unverändert.

## 2026-11-06 (Service Worker)

- Löscht beim Update nur noch eigene alte Caches (`sprachbox-v…`), nicht den Cache der neuen DE↔IT-App. Cache `sprachbox-v25`.

## 2026-11-05 (Name beim Schließen speichern)

- Geänderter Name wird jetzt auch beim „Schließen“ automatisch gespeichert. Knopf heißt „💾 Speichern“.
- Service-Worker-Cache `sprachbox-v24`.

## 2026-11-05 (Updates sofort sichtbar)

- Service Worker: js/css/json/html immer zuerst frisch aus dem Netz (offline aus dem Cache). Neue Funktionen erscheinen ohne mehrfaches Neuladen.
- Service-Worker-Cache `sprachbox-v23`.

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
