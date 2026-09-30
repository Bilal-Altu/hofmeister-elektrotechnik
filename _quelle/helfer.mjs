// Stammdaten, Schaltzeichen und kleine Helfer für alle Seiten.

export const DOMAIN = "https://elektrotechnik-hofmeister.de/";

export const BETRIEB = {
  name: "Nico Hofmeister Elektrotechnik",
  inhaber: "Nico Hofmeister",
  strasse: "Frankensteinstraße 5",
  plz: "68642",
  ort: "Bürstadt-Bobstadt",
  telefon: "06245 99 54 12",
  telefonLink: "tel:+496245995412",
  fax: "06245 99 59 88",
  mail: "nh-elektrotechnik@t-online.de",
  // TODO Bilal: Zeiten stammen aus Gelbe Seiten / Das Örtliche, nicht von Nico selbst – bestätigen lassen.
  zeiten: "Mo–Fr 8–17 Uhr",
  zeitenSchema: "Mo-Fr 08:00-17:00",
  geo: { lat: 49.6623216, lon: 8.4479711 },
};

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Planzeichen für Installationspläne (DIN EN 60617-11), so wie sie in jedem Grundriss stehen.
// Rahmen 48 x 48, Linien in currentColor, damit sie auf Weiß und auf Gelb funktionieren.
// Abgeglichen mit dem Symbolverzeichnis von rc-editor.de (Steckdose, SAT-Dose, EDV-Dose, Verteiler).
const Z = (inhalt) => `<svg class="zeichen" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${inhalt}</svg>`;

export const ZEICHEN = {
  // Steckdose (Schutzkontakt): Zuleitung von oben, Querstrich, Halbkreis darunter
  steckdose: Z(`<path d="M24 4v15M11 19h26M12 32a12 12 0 0 1 24 0"/>`),
  // Elektrizitätszähler
  zaehler: Z(`<rect x="6" y="12" width="36" height="24"/><text x="24" y="29" text-anchor="middle">kWh</text>`),
  // Elektroverteiler: Rechteck, zur Hälfte schräg gefüllt
  verteiler: Z(`<rect x="5" y="16" width="38" height="16"/><path class="voll" d="M5 32L43 16v16Z"/>`),
  // Leuchte, allgemein
  leuchte: Z(`<circle cx="24" cy="24" r="14"/><path d="M14.1 14.1l19.8 19.8M33.9 14.1L14.1 33.9"/>`),
  // SAT-Anschlussdose
  sat: Z(`<path d="M24 3v13M11 16h26M11 16v12M37 16v12"/><text x="24" y="43" text-anchor="middle">SAT</text>`),
  // Lautsprecher, steht für die Sprechstelle an Tür und Wohnung
  lautsprecher: Z(`<rect x="8" y="17" width="12" height="14"/><path d="M20 17l15-10v34L20 31"/>`),
  // EDV-Anschlussdose (Netzwerk)
  edv: Z(`<path d="M24 3v12M14 15h20M14 26a10 10 0 0 1 20 0"/><text x="24" y="42" text-anchor="middle">EDV</text>`),
};

export const PFEIL = `<svg class="pfeil" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;
export const HOERER = `<svg class="hoerer" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3.5l2.6-.4 1.6 4.3-1.9 1.3a11 11 0 0 0 5.4 5.4l1.3-1.9 4.3 1.6-.4 2.6c-.2 1.3-1.3 2.2-2.6 2.1C10.7 18 6 13.3 5.5 6.1c-.1-1.3.8-2.4 2.1-2.6Z"/></svg>`;
