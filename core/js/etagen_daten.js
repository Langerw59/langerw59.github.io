/* ============================================================
   DE: Alle Räume von Quantura an EINEM Ort (2026-11-25).
       Daraus bauen sich das Etagen-Menü in der Kopfleiste
       (etagen_menue.js) und der Etagenplan (etagen.html).
       Neue Seite = eine Zeile: ["Name", "/pfad/zur/seite.html", "Hinweis", "idee"]
       Untermenü: ["Name", "", "Hinweis", "", [ [Unterpunkt], [Unterpunkt] ]]
       Neues Fenster: ["Name", "/pfad", "Hinweis", "", "neu"]
       Privat (nur mit PIN sichtbar, 2026-11-26): ["Name", "/pfad", "Hinweis", "privat"]
         oder bei einer Etage/Gruppe: privat:true  (siehe /core/js/privat.js)
   RU: Все комнаты Quantura в одном месте. Из этого списка строится
       меню в шапке и план этажей. Новая страница = одна строка.
   ============================================================ */
window.Q_ETAGEN = [
 { id:"e3", kurz:"3", nr:"3. Etage", name:"das Language Lab", motto:"Sprachen lernen und verstehen", farbe:"#2f6fb3", eingang:"/pages/language_lab/index.html",
   gruppen:[
    { t:"der Sprachführer", info:"die Karteikarten – Sprachpaar wählen; die Lieder sind auch Karten (🎵)", r:[
      ["🇩🇪⇄🇬🇧 Deutsch ⇄ English","/pages/language_lab/apps/SprachBox_DE_EN_Leitner_PWA/talk_leitner_pwa/index.html","die Karteikarten, auch die Lieder"],
      ["🇷🇺→🇩🇪 Russisch → Deutsch","/pages/language_lab/apps/SprachBox_DE_RU_Leitner_PWA/talk_leitner_pwa/index.html","dieselben Karten wie DE ⇄ EN"],
      ["✍️ das Diktat Deutsch","/pages/language_lab/diktat-trainer.html#de","Sätze hören und schreiben"],
      ["✍️ das Diktat English","/pages/language_lab/diktat-trainer.html#en","Sätze hören und schreiben"]]},
      /* weitere Sprachpaare (IT, ES, FR, TR) kommen später – vorerst im Keller/Archiv */
    { t:"das Satzlabor", info:"den Satz bauen (der Satzgenerator) und sofort zerlegen (die Satzanalyse)", r:[
      ["🔧 das Satzlabor Deutsch","/pages/language_lab/apps/generator/de/index_de.html","bauen + analysieren"],
      ["🔧 das Satzlabor English","/pages/language_lab/apps/generator/en/index_en.html","bauen + analysieren"],
      ["🎤 der Satzkonstrukteur RU → DE","/pages/language_lab/apps/satzkonstrukteur/index.html","auf Russisch sagen, deutsch bauen"]]},
    { t:"die Grammatik", info:"die Regeln, die Grundlagen (Level 1) und der tägliche Test an einem Ort", r:[
      ["📐 die Regeln – alles zur Grammatik","/pages/language_lab/grammatik/index.html","nach Wortarten, DE und EN"],
      ["🧱 Level 1 – die Grundlagen","/pages/language_lab/grundlagen/index.html","Pronomen, sein/haben, we're/were"],
      ["📝 der Tagestest","/pages/language_lab/tagestest/index.html","15 Minuten am Tag"]]},
    { t:"Lesen & Texte", info:"Texte, Geschichten und Lieder in mehreren Sprachen – lesen, hören, auswendig lernen", r:[
      ["📖 der Lese-Trainer","/pages/language_lab/lesetrainer/index.html","Der Hahn und der Fuchs …"],
      ["🐭 die Mausefalle – eine Geschichte","/stories/maus/maus_index.html","in 5 Sprachen, mit Bildern und Sprachausgabe"],
      ["📜 die Weisheiten","/pages/language_lab/weisheiten/index.html","Sprüche in 4 Sprachen"],
      ["🎵 der Lied-Trainer","/pages/language_lab/lieder/index.html","Liedtexte eingeben – lernen im Sprachführer"]]},
    { t:"die Wörter", info:"Nachschlagen: Bedeutung, Herkunft, Geschichte", r:[
      ["📖 das Glossar Englisch","/pages/language_lab/glossar/index.html","Wörter mit Herkunft"],
      ["📖 das Glossar Deutsch","/pages/language_lab/glossar/de.html","Fachwörter der Grammatik"],
      ["📜 die Etymologie – Wortgeschichte","/pages/language_lab/wortdetektiv/index.html","mit der Toponymie"]]}
   ]},
 { id:"e2", kurz:"2", nr:"2. Etage", name:"die Fächer", motto:"Wissen entdecken und vertiefen", farbe:"#2f8a5b", eingang:"/pages/faecher/index.html",
   gruppen:[
    { t:"die Mathematik", r:[
      ["die Mathematik – Übersicht","/pages/faecher/mathematik/index.html"],
      ["🐯 Mathe-Spaß – das Level-System","/math_module/index.html","öffnet in neuem Fenster ↗","","neu"],
      ["♞ Schach-Spaß – Schach für Anfänger","/schach_module/index.html","Figuren, Felder, Springer-Rundreise","","neu"],
      ["die Grundschule (Klasse 1–4) – die Themen","/mathe_grundschule.html"],
      ["die Realschule (Klasse 5–10)","/pages/faecher/mathematik-realschule/index.html"],
      ["💶 die Finanzmathematik","/pages/faecher/mathematik/finanzmathematik/index.html","Kredit, Sparplan"],
      ["🧮 der Rechner: die quadratische Gleichung","/pages/language_lab/apps/mathe/quadratgleichung/index.html"]]},
    { t:"die Elektrotechnik", r:[
      ["⚡ die Elektrotechnik – Übersicht","/pages/faecher/elektrotechnik/index.html"],
      ["Kurs 1 – die Mathematik","/pages/faecher/elektrotechnik/kurs-1-mathematik/index.html"],
      ["der Kursplan","/pages/faecher/elektrotechnik/kursplan.html","nach dem Lehrbuch"],
      ["📓 mein Labortagebuch","/pages/faecher/elektrotechnik/labortagebuch.html"]]},
    { t:"die Physik", r:[
      ["die Physik – Übersicht","/pages/faecher/physik/index.html"],
      ["die Kanonenkugel (Simulation)","/pages/faecher/physik-oberstufe/kanonenkugel_physik.html"]]},
    { t:"die Chemie", r:[
      ["⚗️ die Chemie – die Grundlagen","/pages/faecher/chemie/index.html"],
      ["Lektion 1 – der Stoff, das Gemisch","/pages/faecher/chemie/01-stoffe.html"],
      ["Lektion 2 – das Atom","/pages/faecher/chemie/02-atom.html","der Atom-Baukasten"],
      ["Lektion 3 – das Periodensystem","/pages/faecher/chemie/03-periodensystem.html"]]},
    { t:"die Technik", r:[
      ["⚙️ die Technik – Übersicht","/pages/faecher/technik/index.html","wie Maschinen funktionieren"],
      ["Lektion 1 – das Zahnradgetriebe","/pages/faecher/technik/01-zahnradgetriebe.html","die Übersetzung, Aufgaben-Trainer"]]},
    { t:"Für alle Fächer", r:[
      ["🧭 der Wegweiser","/pages/faecher/wegweiser/index.html","Simulationen, Videos, Wörterbücher"],
      ["📘 das Fachglossar","/pages/faecher/glossar.html","Mathematik, Elektrotechnik, Chemie, Technik"],
      ["🗺️ das Erfinder-Quiz","/pages/faecher/erfinder-quiz/index.html","wer hat was wo erfunden"]]},
    { t:"Ideen und ruhende Fächer", r:[
      ["die Überlebenskunst","/pages/faecher/ueberlebenskunst/index.html","noch leer","idee"],
      ["die Informatik (HTML, CSS, JavaScript)","/pages/faecher/informatik/index.html","ruht – 10 Web-Lektionen","idee"]]}
   ]},
 { id:"e1", privat:true, kurz:"1", nr:"1. Etage", name:"die Programme", motto:"Wissen praktisch anwenden", farbe:"#b0742a",
   info:"Programme, die Claude gebaut hat – sie öffnen in Claude (Anmeldung nötig)",
   gruppen:[
    { t:"das Auto", r:[
      ["🚗 der Auto-Kostenvergleich","https://claude.ai/artifact/316pXHXSPa2jNCCFBJ32mA","in Claude"],
      ["💶 der Autokredit-Rechner","https://claude.ai/artifact/KvNP4xakr67qjxerUz2nai","Rabatt oder 0 % Zinsen?"],
      ["⚖️ Kaufen oder Leasen","https://claude.ai/artifact/D5UobLUZ5xDzLyv9RWRnD4","Kosten über die Jahre"],
      ["🚗 der Auto-Kauf-Assistent","/pages/language_lab/apps/tools/auto-kauf-assistent/index.html","die Checkliste (auf dieser Seite)"]]},
    { t:"der Alltag", r:[
      ["👨‍👩‍👧 der Familienplaner","https://claude.ai/artifact/FZc51ozqHHEh9Wc9x1GVma","Aufgaben, Pläne, Fristen"],
      ["🏕️ der Urlaubsplaner","https://claude.ai/artifact/LqDTW7b4LzbcM7PdLE9sFm","in Claude"],
      ["☀️ das Morgen-Briefing","https://claude.ai/artifact/WcPhutG3FNYSpvvSsLY29r","in Claude"],
      ["🗺️ die Projektkarte","https://claude.ai/artifact/Hge72bF1dtNkXHQihGKecw","alle Projekte und Ideen"]]},
    { t:"das Lernen", r:[
      ["🎓 die Lernzentrale","https://claude.ai/artifact/GS1BWtaybDHL7NrY1bJfcy","in Claude"],
      ["🔥 der heiße Stuhl","https://claude.ai/artifact/2ixYA68agnLDwxgfCLC5Y1","in Claude"]]}
   ]},
 { id:"eg", kurz:"EG", nr:"Erdgeschoss", name:"der Eingang", farbe:"#6b4fa3", eingang:"/index.html",
   gruppen:[
    { t:"Start", r:[
      ["🏠 die Startseite – was ist Quantura?","/index.html"],
      ["🗓️ der Stundenplan","/pages/language_lab/stundenplan/index.html","was heute dran ist","privat"],
      ["🏢 der Etagenplan – alles auf einer Seite","/etagen.html"]]}
   ]}
];

/* 2026-11-25: Keller geleert. Gelöscht (in der GitHub-Historie noch vorhanden): Bibliothek, Projekte,
   Store, Werkstatt/TagBook, Legacy-Portal, Talk Levels, alte Glossare, Generator-Übersicht.
   Videos aus der Bibliothek liegen jetzt in /portfolio/videos/.
   Nur versteckt (Datei bleibt): weitere Sprachpaare IT/ES/FR/TR (/pages/language_lab/sprachfuehrer_auswahl/),
   Informatik-Kurse (/pages/faecher/informatik/). */

/* 2026-11-26: der Privatbereich – ohne PIN (siehe /core/js/privat.js) werden private
   Etagen, Gruppen und Räume aus allen Menüs entfernt.
   RU: без PIN-кода приватные этажи/группы/комнаты убираются из всех меню. */
(function () {
  let offen = false;
  try { offen = localStorage.getItem("q_privat_v1") === "offen"; } catch (e) {}
  window.Q_PRIVAT = offen;
  if (offen) return;
  const istPrivat = (r) => r[3] === "privat";
  window.Q_ETAGEN = window.Q_ETAGEN
    .filter((e) => !e.privat)
    .map((e) => Object.assign({}, e, {
      gruppen: e.gruppen
        .filter((g) => !g.privat)
        .map((g) => Object.assign({}, g, {
          r: g.r.filter((r) => !istPrivat(r)).map((r) =>
            Array.isArray(r[4]) ? r.slice(0, 4).concat([r[4].filter((u) => !istPrivat(u))], r.slice(5)) : r)
        }))
        .filter((g) => g.r.length)
    }));
})();
