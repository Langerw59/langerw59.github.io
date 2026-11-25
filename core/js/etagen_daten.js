/* ============================================================
   DE: Alle Räume von Quantura an EINEM Ort (2026-11-25).
       Daraus bauen sich das Etagen-Menü in der Kopfleiste
       (etagen_menue.js) und der Etagenplan (etagen.html).
       Neue Seite = eine Zeile: ["Name", "/pfad/zur/seite.html", "Hinweis", "idee"]
       Untermenü: ["Name", "", "Hinweis", "", [ [Unterpunkt], [Unterpunkt] ]]
   RU: Все комнаты Quantura в одном месте. Из этого списка строится
       меню в шапке и план этажей. Новая страница = одна строка.
   ============================================================ */
window.Q_ETAGEN = [
 { id:"e3", kurz:"3", nr:"3. Etage", name:"die Sprachen", farbe:"#2f6fb3", eingang:"/pages/language_lab/index.html",
   gruppen:[
    { t:"Täglich lernen", r:[
      ["🗂️ der Sprachführer","","die Karteikarten – Sprachpaar wählen","",[
        ["🇩🇪⇄🇬🇧 Deutsch ⇄ English","/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/index.html"],
        ["🇷🇺→🇩🇪 Russisch → Deutsch","/pages/language_lab/apps/SprachBox_DE_RU_Leitner_PWA/talk_leitner_pwa/index.html","dieselben Karten wie DE ⇄ EN"]]],
        /* IT, ES, FR, TR: vorerst nicht im Menü – werden später umgebaut */
      ["🧱 Level 1 – die Grundlagen","/pages/language_lab/grundlagen/index.html","Pronomen, sein/haben"],
      ["📝 der Grammatik-Tagestest","/pages/language_lab/tagestest/index.html","15 Minuten am Tag"]]},
    { t:"Sätze üben", r:[
      ["🔧 das Satzlabor","","Sätze bauen und zerlegen","",[
        ["🇩🇪 Deutsch","/pages/language_lab/apps/generator/de/index_de.html"],
        ["🇬🇧 English","/pages/language_lab/apps/generator/en/index_en.html"]]],
      ["🎤 der Satzkonstrukteur RU → DE","/pages/language_lab/apps/satzkonstrukteur/index.html"],
      ["✍️ der Diktat-Trainer","","hören und schreiben","",[
        ["🇩🇪 Deutsch","/pages/language_lab/diktat-trainer.html#de"],
        ["🇬🇧 English","/pages/language_lab/diktat-trainer.html#en"]]],
      ["Talk Levels 0–10","/pages/language_lab/apps/talk_levels/index.html","Themen und Level"]]},
    { t:"Lesen & Hören", r:[
      ["📖 der Lese-Trainer","/pages/language_lab/lesetrainer/index.html","Der Hahn und der Fuchs …"],
      ["🎵 der Lied-Trainer","/pages/language_lab/lieder/index.html","Lieder Zeile für Zeile"],
      ["📜 die Weisheiten","/pages/language_lab/weisheiten/index.html","in 4 Sprachen"]]},
    { t:"Nachschlagen", r:[
      ["📐 die Grammatik","/pages/language_lab/grammatik/index.html","alle Regeln"],
      ["📖 das Glossar","","Wörter mit Herkunft","",[
        ["🇬🇧 Englisch","/pages/language_lab/glossar/index.html","Wörter aus dem Sprachführer"],
        ["🇩🇪 Deutsch","/pages/language_lab/glossar/de.html","Fachwörter der Grammatik"]]],
      ["📜 die Etymologie – Wortgeschichte","/pages/language_lab/wortdetektiv/index.html","mit der Toponymie"]]}
   ]},
 { id:"e2", kurz:"2", nr:"2. Etage", name:"die Fächer", farbe:"#2f8a5b", eingang:"/pages/faecher/index.html",
   gruppen:[
    { t:"die Mathematik", r:[
      ["die Mathematik – Übersicht","/pages/faecher/mathematik/index.html"],
      ["die Grundschule (Klasse 1–4)","/mathe_grundschule.html"],
      ["die Realschule (Klasse 5–10)","/pages/faecher/mathematik-realschule/index.html"],
      ["💶 die Finanzmathematik","/pages/faecher/mathematik/finanzmathematik/index.html","Kredit, Sparplan"],
      ["🧮 der Rechner: die quadratische Gleichung","/pages/language_lab/apps/mathe/quadratgleichung/index.html"]]},
    { t:"die Elektrotechnik", r:[
      ["⚡ die Elektrotechnik – Übersicht","/pages/faecher/elektrotechnik/index.html"],
      ["Kurs 1 – die Mathematik","/pages/faecher/elektrotechnik/kurs-1-mathematik/index.html"],
      ["der Kursplan","/pages/faecher/elektrotechnik/kursplan.html","nach dem Lehrbuch"],
      ["📓 mein Labortagebuch","/pages/faecher/elektrotechnik/labortagebuch.html"]]},
    { t:"die Physik & die Informatik", r:[
      ["die Physik – Übersicht","/pages/faecher/physik/index.html"],
      ["die Kanonenkugel (Simulation)","/pages/faecher/physik-oberstufe/kanonenkugel_physik.html"],
      ["die Informatik – Übersicht","/pages/faecher/informatik/index.html"],
      ["10 Web-Lektionen","/pages/faecher/informatik/web-lessons/index.html"]]},
    { t:"Für alle Fächer", r:[
      ["🧭 der Wegweiser","/pages/faecher/wegweiser/index.html","Simulationen und Videos"],
      ["📘 das Fachglossar","/pages/faecher/glossar.html","Mathematik, Elektrotechnik"],
      ["🗺️ das Erfinder-Quiz","/pages/faecher/erfinder-quiz/index.html","wer hat was wo erfunden"]]},
    { t:"Ideen (noch leer)", r:[
      ["die Chemie","/pages/faecher/chemie/index.html","","idee"],
      ["die Überlebenskunst","/pages/faecher/ueberlebenskunst/index.html","","idee"],
      ["die Technik","/pages/faecher/technik/index.html","","idee"]]}
   ]},
 { id:"e1", kurz:"1", nr:"1. Etage", name:"die Werkzeuge", farbe:"#b0742a",
   gruppen:[
    { t:"Werkzeuge für den Alltag", r:[
      ["🚗 der Auto-Kauf-Assistent","/pages/language_lab/apps/tools/auto-kauf-assistent/index.html"],
      ["🔨 die Werkstatt / TagBook","/pages/portal/werkstatt/index.html"]]},
    { t:"die Bibliothek & die Projekte", r:[
      ["📚 die Bibliothek","/pages/bibliothek/index.html","Videos, Fotos, Ressourcen"],
      ["🐭 das Maus-Projekt","/pages/projekte/index.html"],
      ["der Store – Apps & Tools","/pages/store/index.html","Katalog aller Programme"]]}
   ]},
 { id:"eg", kurz:"EG", nr:"Erdgeschoss", name:"der Eingang", farbe:"#6b4fa3",
   gruppen:[
    { t:"Start", r:[
      ["🏠 das Portal – die Startseite","/index.html"],
      ["🗓️ der Stundenplan","/pages/language_lab/stundenplan/index.html","was heute dran ist"],
      ["🏢 der Etagenplan – alles auf einer Seite","/etagen.html"]]}
   ]},
 { id:"k", kurz:"K", nr:"Keller", name:"alt – später löschen", farbe:"#8a8a8a", keller:true,
   gruppen:[
    { t:"Alte Seiten", r:[
      ["Glossar (alt, Tools)","/pages/language_lab/apps/tools/glossar/index.html"],
      ["Glossar (alt, Generator)","/pages/language_lab/apps/generator/de/glossar.html"],
      ["Generator-Übersicht (alt)","/sections/generator.html"],
      ["Legacy-Portal","/pages/legacy/index.html"]]}
   ]}
];
