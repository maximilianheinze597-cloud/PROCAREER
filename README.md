# PROCAREER – 3D-Fußball-Karrierespiel (Kernversion)

Browserspiel für iPhone (Querformat) und PC. Reines HTML/CSS/JS, kein Backend, Spielstand im `localStorage`.

## Starten / GitHub Pages
1. Neues Repository auf GitHub anlegen, den **entpackten Inhalt** dieser ZIP (nicht den Ordner selbst) hochladen – `index.html` liegt im Root.
2. Repository → Settings → Pages → Source: *Deploy from a branch* → Branch `main`, Ordner `/ (root)` → Save.
3. Nach 1–2 Minuten erreichbar unter `https://<name>.github.io/<repo>/`. Auf dem iPhone: Teilen → „Zum Home-Bildschirm".
Lokal testen: `python3 -m http.server` im Projektordner, dann http://localhost:8000.

## Struktur
- **`index.html` ist eigenständig** (CSS und JavaScript eingebettet) – das Spiel läuft, sobald diese eine Datei plus `manifest.json`/`sw.js`/`assets/` im Repo-Root liegen.
- `src/` enthält dieselben Quellmodule getrennt (nur zum Weiterentwickeln, wird zur Laufzeit nicht geladen).
- `src/js/data.js` Vereine, Formationen, Spielergenerierung, Gesamtstärke-Formel
- `src/js/career.js` Karriere, Training, Saison, Transfers, Speichern (Format v1)
- `src/js/match.js` 3D-Match-Engine (Three.js), KI, Ballphysik, Torwart, Jubel
- `src/js/audio.js` WebAudio-Sounds (synthetisch, abschaltbar)
- `src/js/app.js` Oberfläche und Steuerung; `sw.js` + `manifest.json` PWA

## Steuerung
PC: WASD/Pfeile, J Pass, K Steilpass, L/Leertaste Schuss, Shift Sprint, U Grätsche, Q Spielerwechsel.
Mobil: Joystick links, Buttons rechts.

## Abhängigkeiten / Lizenzen
- Three.js r128 (MIT) per CDN (cdnjs, Fallback jsDelivr, jeweils Version 0.128/r128) (benötigt Internet beim ersten Laden)
- Alle Vereine, Namen und Spieler sind frei erfunden. Keine fremden Modelle, Wappen oder Audiodateien; Sounds werden per WebAudio erzeugt. Eigene GLB-Modelle/Wappen können in `assets/` ergänzt werden.

## Bekannte Einschränkungen
- Spieler sind **prozedurale Figuren** (Zylinder/Quader) mit einfacher Lauf-, Grätsch-, Hecht- und Jubelanimation – keine GLB-Modelle, keine Rückennummern, kein Kopfball, keine Flanken, keine Elfmeter, keine Auswechslungen im Spiel, keine Abseitspfiffe (KI hält nur die Abseitslinie).
- Standards vereinfacht: Einwurf, Ecke, Abstoß, Freistoß werden als Neustart mit Ballübergabe umgesetzt; nur gelbe Karten; Seitenwechsel zur Halbzeit fehlt.
- Eine Liga (8 Vereine, 14 Spieltage), kein Pokal, keine internationalen Wettbewerbe, keine Leihen, Transfermarkt nur als Ansicht; Angebote anderer Vereine an den eigenen Spieler funktionieren.
- Aufstellung wird automatisch gewählt (kein Drag-and-Drop), Kapitän/Standardschützen fehlen.
- Grafik: einfach, keine Spielermodelle auf Niveau von EA FC.
- Nicht im Browser getestet (siehe Testprotokoll in der Chat-Antwort).
