// Einsatzgebiet als eigene Zeichnung: 30 km um den Betrieb, Rhein und Neckar, Orte mit Entfernung.
// Daten: karte-daten.json (erzeugt mit Desktop/Hofmeister/werkzeug/karte-daten.mjs aus OpenStreetMap).
// Einheit im SVG: 1 = 100 m, Mitte = Frankensteinstraße 5.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc } from "./helfer.mjs";

const DATEN = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "karte-daten.json"), "utf8"));
const S = 10; // km -> Einheiten

// Beschriftung je Ort: Seite (r = rechts, l = links, o = oben, u = unten), Rang (1 = Großstadt)
const ORTE = {
  "Bürstadt": ["r", 2], "Biblis": ["r", 2], "Groß-Rohrheim": ["r", 3], "Gernsheim": ["r", 2],
  "Lampertheim": ["r", 2], "Worms": ["l", 1], "Osthofen": ["l", 3], "Frankenthal (Pfalz)": ["l", 2, "Frankenthal"],
  "Ludwigshafen am Rhein": ["l", 1, "Ludwigshafen"], "Mannheim": ["r", 1], "Viernheim": ["u", 2],
  "Weinheim": ["r", 2], "Hemsbach": ["r", 3], "Heppenheim": ["r", 2], "Bensheim": ["r", 2], "Lorsch": ["o", 3],
  "Pfungstadt": ["r", 3], "Darmstadt": ["l", 1], "Ladenburg": ["r", 3],
};

const fmt = (n) => +n.toFixed(1);
const pfad = (linie) => "M" + linie.map(([x, y]) => `${fmt(x * S)} ${fmt(y * S)}`).join("L");

export function karte() {
  const orte = DATEN.orte.filter((o) => ORTE[o.name]).map((o) => {
    const [seite, rang, kurz] = ORTE[o.name];
    const name = kurz || o.name;
    const x = fmt(o.x * S), y = fmt(o.y * S);
    const dx = seite === "r" ? 9 : seite === "l" ? -9 : 0;
    const dy = seite === "o" ? -10 : seite === "u" ? 18 : 5;
    const anker = seite === "r" ? "start" : seite === "l" ? "end" : "middle";
    const km = String(Math.round(o.km)).replace(".", ",");
    return `<g class="ort ort--${rang}"><title>${esc(name)}: ${km} km Luftlinie</title>`
      + `<circle cx="${x}" cy="${y}" r="${rang === 1 ? 4.5 : 3.5}"/>`
      + `<text x="${x + dx}" y="${y + dy}" text-anchor="${anker}">${esc(name)}<tspan class="ort__km" dx="6">${km} km</tspan></text></g>`;
  }).join("\n    ");

  const fluesse = Object.entries(DATEN.fluesse).map(([name, linien]) =>
    linien.map((l) => `<path class="fluss" d="${pfad(l)}"/>`).join("")).join("");

  const ringe = [10, 20, 30].map((r) =>
    `<circle class="ring ${r === 30 ? "ring--aussen" : ""}" r="${r * S}"/>`
    + `<text class="ring__km" x="${-r * S + 6}" y="17">${r} km</text>`).join("");

  return `<figure class="karte">
  <svg viewBox="-330 -330 660 660" role="img" aria-labelledby="karte-titel karte-text">
    <title id="karte-titel">Einsatzgebiet rund 30 Kilometer um Bürstadt-Bobstadt</title>
    <desc id="karte-text">Kreis mit 30 Kilometern Halbmesser um Bobstadt. Darin liegen unter anderem Bürstadt, Biblis, Lampertheim, Worms, Lorsch, Bensheim, Heppenheim, Viernheim, Mannheim, Ludwigshafen, Weinheim und Darmstadt.</desc>
    <defs><clipPath id="karte-kreis"><circle r="300"/></clipPath></defs>
    <circle class="flaeche" r="300"/>
    <g clip-path="url(#karte-kreis)">${fluesse}</g>
    <text class="fluss__name" transform="translate(-40 82) rotate(-108)" text-anchor="middle">Rhein</text>
    ${ringe}
    ${orte}
    <g class="mitte"><circle r="9"/><circle class="mitte__kern" r="3.5"/><text x="-14" y="-12" text-anchor="end">Bobstadt</text></g>
  </svg>
  <figcaption>Kartendaten © <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap-Mitwirkende</a></figcaption>
</figure>`;
}
