# Nico Hofmeister Elektrotechnik – Entwurf „Legende“

Ungefragter Gratis-Entwurf für **Nico Hofmeister Elektrotechnik**, Frankensteinstraße 5,
68642 Bürstadt-Bobstadt (Elektrotechnikermeister, selbstständig seit 2004).
Die alte Seite elektrotechnik-hofmeister.de (WordPress/Elementor von 2020) zeigt seit 2025 auf der
Startseite nur noch „Seite nicht gefunden“. Im Webarchiv funktioniert sie zuletzt im März 2025.

## Idee

- **Legende:** Jede Leistung trägt ihr Planzeichen aus dem Installationsplan (DIN EN 60617-11:
  Steckdose, Zähler, Verteiler, Leuchte, SAT-Dose, Lautsprecher, EDV-Dose). Abgeglichen mit dem
  Symbolverzeichnis von rc-editor.de.
- **Farben aus dem Logo:** Gelb `#f7e744` als Fläche, Tinte `#1c1b18`, Rot `#d73237` nur als kleiner
  Blitz (wie der i-Punkt im Logo). Knöpfe mit hartem Schlagschatten wie die Logo-Buchstaben.
- **Schrift:** Mona Sans (variabel, OFL), schmal für Überschriften, normal für Text. Selbst ausgeliefert.
- **Einsatzgebiet** als eigene Karte aus OpenStreetMap-Daten (30 km um den Betrieb, Rhein, Neckar,
  Entfernung beim Überfahren). Nichts wird von fremden Servern geladen.
- **Ich-Form** wie auf Nicos alter Seite. Texte beruhen auf seinem Text, der Beschriftung seines
  Firmenwagens und Branchenbuch-Einträgen.

## Seiten

Startseite, Leistungen (Übersicht + 7 Unterseiten), Zähleranmeldung, Über mich, Kontakt
(Formular öffnet das eigene E-Mail-Programm), Impressum, Datenschutz, 404.

## Bauen

```bash
node _quelle/bauen.mjs
```

Die HTML-Dateien werden erzeugt – nie von Hand ändern. Inhalte: `_quelle/seiten.mjs`,
`_quelle/leistungen.mjs`, Stammdaten und Planzeichen: `_quelle/helfer.mjs`, Karte: `_quelle/karte.mjs`.
CSS/JS bekommen die Prüfsumme als `?v=` automatisch.

Werkzeuge außerhalb des Repos in `Desktop\Hofmeister\`: `quelle\` (Originale der alten Seite),
`werkzeug\bilder-bauen.sh` (AVIF + WebP, bricht ab, wenn ein Bild größer als seine Vorlage würde),
`werkzeug\karte-daten.mjs` (OSM-Daten → `_quelle/karte-daten.json`), `werkzeug\schirm.sh`
(Edge-Bildschirmfotos). Lokal: launch.json „hofmeister“, Port 4780, Adresse `/hofmeister/index.html`.

## Offene Punkte (nur Nico kann sie beantworten)

| Punkt | Wo | Stand |
|---|---|---|
| Arbeitet er allein? Die Startseite sagt „Bei mir kommt der Meister selbst.“ | Startseite | nicht bestätigt |
| Erreichbarkeit Mo–Fr 8–17 Uhr (stammt aus Gelbe Seiten) | Fuß, Kontakt | nicht bestätigt |
| Umfang je Leistung („Typische Aufträge“) gegenlesen | Leistungsseiten | Vorschlag |
| Macht er auch Wallbox oder PV-Montage? Bisher nur Zähleranmeldung dafür genannt | Leistungen | offen |
| Bei welchem Netzbetreiber im Installateurverzeichnis? | Zähleranmeldung | offen |
| USt-IdNr. (alte Seite: nur „DE“) | Impressum | fehlt |
| Kammer: Handwerkskammer Frankfurt-Rhein-Main, Handwerksrolle | Impressum | nicht bestätigt |
| Urheber der beiden Fotos (Porträt, Firmenwagen) | Impressum | nicht bestätigt |
| Hoster und AV-Vertrag | Datenschutz | beim Livegang |
| Google-Bewertungen (5,0) – echte Zitate nur mit Erlaubnis | Startseite | nicht eingebaut |
| Eigene Baustellenfotos würden die Seite stark machen | überall | keine vorhanden |

## Livegang

In `_quelle/bauen.mjs`: `ROBOTS` auf `"index, follow"`, `BASIS_404` auf `"/"`. `robots.txt`
freigeben. Canonical und Sitemap zeigen schon auf https://elektrotechnik-hofmeister.de/.
