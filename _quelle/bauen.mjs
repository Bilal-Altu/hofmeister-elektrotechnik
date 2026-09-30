// Baut den Entwurf für Nico Hofmeister Elektrotechnik (Bürstadt-Bobstadt).
//
//   node _quelle/bauen.mjs
//
// Erzeugte HTML-Dateien nie von Hand ändern: Inhalte in seiten.mjs und leistungen.mjs,
// Rahmen (Kopf, Menü, Fuß) hier. CSS und JS in assets/ bekommen automatisch ?v=<Prüfsumme>.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { alleSeiten } from "./seiten.mjs";
import { DOMAIN, BETRIEB, esc, HOERER } from "./helfer.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// 404.html wird unter beliebigen Adressen ausgeliefert, dort gehen keine relativen Pfade.
// Vorschau auf GitHub Pages: "/hofmeister-elektrotechnik/". Beim Livegang: "/".
const BASIS_404 = "/hofmeister-elektrotechnik/";
// Vorschau bleibt aus Suchmaschinen draußen. Beim Livegang: "index, follow".
const ROBOTS = "noindex, nofollow";

/* ---------- Bilder: Breiten und Maße aus bilder/ lesen ---------- */
const BILDER = {};
for (const datei of fs.readdirSync(path.join(REPO, "bilder"))) {
  const m = datei.match(/^(.+)-(\d+)\.webp$/);
  if (m) (BILDER[m[1]] ||= []).push(+m[2]);
}
for (const k in BILDER) BILDER[k].sort((a, b) => a - b);

function webpMasse(datei) {
  const b = fs.readFileSync(datei);
  const typ = b.toString("ascii", 12, 16);
  if (typ === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (typ === "VP8L") { const bits = b.readUInt32LE(21); return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }; }
  if (typ === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  throw new Error("Unbekanntes WebP: " + datei);
}

/* ---------- Kontext je Seite: relative Pfade, Bilder ---------- */
function kontext(pfad) {
  const tiefe = pfad.split("/").filter(Boolean).length;
  const wurzel = "../".repeat(tiefe);
  const u = (ziel = "") => (wurzel + ziel) || "./";
  const bild = (name, o = {}) => {
    const breiten = BILDER[name];
    if (!breiten) throw new Error("Bild fehlt: " + name);
    const gross = breiten[breiten.length - 1];
    const m = webpMasse(path.join(REPO, "bilder", `${name}-${gross}.webp`));
    const sizes = o.sizes || "100vw";
    const set = (ext) => breiten.map((w) => `${u(`bilder/${name}-${w}.${ext}`)} ${w}w`).join(", ");
    const laden = o.prio ? ' fetchpriority="high"' : ' loading="lazy"';
    return `<picture><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><img src="${u(`bilder/${name}-${gross}.webp`)}" srcset="${set("webp")}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(o.alt || "")}"${laden}></picture>`;
  };
  return { pfad, u, bild };
}

/* ---------- Kopf und Fuß ---------- */
const MENUE = [
  ["leistungen/", "Leistungen"],
  ["zaehleranmeldung/", "Zähleranmeldung"],
  ["ueber-mich/", "Über mich"],
  ["kontakt/", "Kontakt"],
];

function kopf(s, seite) {
  const { u } = s;
  const aktiv = (ziel) => seite.pfad === ziel ? ' aria-current="page"' : seite.pfad.startsWith(ziel) && ziel !== "" ? ' class="ist-drin"' : "";
  const punkte = MENUE.map(([ziel, name]) => `<li><a href="${u(ziel)}"${aktiv(ziel)}>${name}</a></li>`).join("");
  // Auf der Kontaktseite steht die Nummer groß im Inhalt, dort nicht zusätzlich oben.
  const telefon = seite.ohneKopfTelefon ? "" :
    `<a class="knopf knopf--klein kopf__telefon" href="${BETRIEB.telefonLink}">${HOERER}<span>${BETRIEB.telefon}</span></a>`;
  return `<header class="kopf">
  <div class="rahmen kopf__innen">
    <a class="kopf__logo" href="${u()}"><img src="${u("bilder/logo.webp")}" width="440" height="139" alt="Hofmeister Elektrotechnik – zur Startseite"></a>
    <nav class="nav" aria-label="Hauptmenü"><ul>${punkte}</ul></nav>
    ${telefon}
    <button class="kopf__menue" type="button" aria-expanded="false" aria-controls="menue-mobil"><span class="nur-leser">Menü öffnen</span><i></i><i></i></button>
  </div>
  <nav class="menue-mobil" id="menue-mobil" aria-label="Menü" hidden>
    <ul><li><a href="${u()}"${seite.pfad === "" ? ' aria-current="page"' : ""}>Startseite</a></li>${punkte}</ul>
  </nav>
</header>`;
}

function fuss(s, seite) {
  const { u } = s;
  const kontakt = seite.fussOhneKontakt ? "" : `
    <div class="fuss__block">
      <p class="fuss__titel">${BETRIEB.name}</p>
      <address>${BETRIEB.strasse}<br>${BETRIEB.plz} ${BETRIEB.ort}</address>
    </div>
    <div class="fuss__block">
      <p class="fuss__titel">Erreichbar ${BETRIEB.zeiten}</p>
      <p><a href="${BETRIEB.telefonLink}">Telefon ${BETRIEB.telefon}</a><br>Fax ${BETRIEB.fax}<br><a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>
    </div>`;
  return `<footer class="fuss">
  <div class="rahmen fuss__innen">${kontakt}
    <nav class="fuss__block fuss__nav" aria-label="Seiten">
      <ul>${MENUE.map(([ziel, name]) => `<li><a href="${u(ziel)}">${name}</a></li>`).join("")}</ul>
    </nav>
  </div>
  <div class="rahmen fuss__unten">
    <span>© 2026 ${BETRIEB.inhaber}</span>
    <a href="${u("impressum/")}">Impressum</a>
    <a href="${u("datenschutz/")}">Datenschutz</a>
  </div>
</footer>`;
}

/* ---------- Seite zusammensetzen ---------- */
const pruefsumme = (datei) => crypto.createHash("sha1").update(fs.readFileSync(path.join(REPO, datei))).digest("hex").slice(0, 8);
const V_CSS = pruefsumme("assets/stil.css");
const V_JS = pruefsumme("assets/seite.js");

function html(s, seite) {
  const canonical = DOMAIN + seite.pfad;
  const schema = (seite.schema || []).map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join("\n");
  const basis = seite.datei === "404.html" ? `<base href="${BASIS_404}">\n` : "";
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${basis}<title>${esc(seite.titel)}</title>
<meta name="description" content="${esc(seite.beschreibung)}">
<meta name="robots" content="${seite.robots || ROBOTS}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="${BETRIEB.name}">
<meta property="og:title" content="${esc(seite.titel)}">
<meta property="og:description" content="${esc(seite.beschreibung)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${DOMAIN}bilder/teilen.jpg">
<meta name="theme-color" content="#f7e744">
<link rel="icon" href="${s.u("favicon.svg")}" type="image/svg+xml">
<link rel="icon" href="${s.u("bilder/signet-32.png")}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${s.u("bilder/signet-180.png")}">
<link rel="preload" href="${s.u("schrift/mona-sans.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${s.u("assets/stil.css")}?v=${V_CSS}">
<script src="${s.u("assets/seite.js")}?v=${V_JS}" defer></script>
${schema}
</head>
<body class="${[seite.klasse, seite.fussOhneKontakt && "fuss-schmal"].filter(Boolean).join(" ")}">
<a class="springen" href="#inhalt">Zum Inhalt springen</a>
${kopf(s, seite)}
<main id="inhalt">
${seite.inhalt}
</main>
${fuss(s, seite)}
</body>
</html>
`;
}

/* ---------- Bauen ---------- */
const seiten = alleSeiten(kontext);
const karte = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
for (const seite of seiten) {
  const s = kontext(seite.pfad);
  const datei = seite.datei || path.join(seite.pfad, "index.html");
  const ziel = path.join(REPO, datei);
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, html(s, seite));
  if (!seite.datei) karte.push(`  <url><loc>${DOMAIN}${seite.pfad}</loc></url>`);
  // Doppelte Telefonnummer auf einer Seite ist ein Fehler (siehe README, Regel „keine Doppelungen“)
  const zaehl = (html(s, seite).match(/tel:\+496245995412/g) || []).length;
  console.log(datei.padEnd(46), `Telefon-Links: ${zaehl}`);
}
karte.push("</urlset>");
fs.writeFileSync(path.join(REPO, "sitemap.xml"), karte.join("\n") + "\n");
console.log(`${seiten.length} Seiten gebaut, CSS ${V_CSS}, JS ${V_JS}`);
