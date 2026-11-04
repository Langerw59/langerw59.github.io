# quantura-lernlab
Quantura – Lernportal für Sprache, Mathematik und Denken. Apps &amp; Tools direkt starten, Themen entdecken und Materialien (z. B. EPUB) ansehen oder herunterladen. Maß &amp; Klarheit – „Alles wird klar, wenn es messbar wird.“

## Regel für jede neue Seite / Правило для каждой новой страницы

Jede neue HTML-Seite braucht im `<head>` genau diese eine Zeile – dann kommen die Kopfleiste (Zurück, Portal, Uhr, Hell/Dunkel, ⚙️) und der Dunkel-Modus automatisch:

```html
<script src="/core/js/core_init.js" defer></script>  <!-- Kopfleiste v2 -->
```

Каждой новой странице нужна в `<head>` только эта одна строка – шапка и тёмная тема подключаются сами.
Seite ohne Kopfleiste (z. B. Offline-Datei): `<body data-kein-kopf>`.
