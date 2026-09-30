// Inhalte aller Seiten. Texte in der Ich-Form, wie Nico sie auf seiner alten Seite geschrieben hat.
import { DOMAIN, BETRIEB, ZEICHEN, PFEIL, HOERER, esc } from "./helfer.mjs";
import { LEISTUNGEN } from "./leistungen.mjs";
import { karte } from "./karte.mjs";

const SCHEMA_BETRIEB = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": DOMAIN + "#betrieb",
  name: BETRIEB.name,
  url: DOMAIN,
  image: DOMAIN + "bilder/teilen.jpg",
  logo: DOMAIN + "bilder/logo.webp",
  telephone: "+49 6245 995412",
  faxNumber: "+49 6245 995988",
  email: BETRIEB.mail,
  address: { "@type": "PostalAddress", streetAddress: BETRIEB.strasse, postalCode: BETRIEB.plz, addressLocality: "Bürstadt", addressRegion: "Hessen", addressCountry: "DE" },
  geo: { "@type": "GeoCoordinates", latitude: BETRIEB.geo.lat, longitude: BETRIEB.geo.lon },
  areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: BETRIEB.geo.lat, longitude: BETRIEB.geo.lon }, geoRadius: 30000 },
  openingHours: BETRIEB.zeitenSchema,
  foundingDate: "2004",
  founder: { "@type": "Person", name: BETRIEB.inhaber, jobTitle: "Elektrotechnikermeister" },
};

const kachel = (zeichen, klein) => `<span class="kachel${klein ? " kachel--klein" : ""}">${ZEICHEN[zeichen]}</span>`;

/* ---------- Startseite ---------- */
function startseite(k) {
  const s = k("");
  const { u } = s;
  const zeilen = LEISTUNGEN.map((l) => `
      <li><a class="legende__zeile" href="${u(`leistungen/${l.slug}/`)}">
        <span class="legende__zeichen">${ZEICHEN[l.zeichen]}</span>
        <span class="legende__name"><span>${l.name}</span></span>
        <span class="legende__text">${l.kurz}</span>
        ${PFEIL}
      </a></li>`).join("");
  return {
    pfad: "",
    titel: "Elektriker in Bürstadt-Bobstadt | Nico Hofmeister Elektrotechnik",
    beschreibung: "Elektrotechnikermeister Nico Hofmeister: Elektroinstallation, Zählerplätze und Zähleranmeldung, Beleuchtung, Sat-, Sprech- und Netzwerktechnik in Bürstadt und rund 30 km Umkreis.",
    klasse: "start",
    schema: [SCHEMA_BETRIEB],
    inhalt: `
<section class="held">
  <div class="rahmen held__innen">
    <div class="held__text">
      <p class="kicker">Elektrotechnik in Bürstadt-Bobstadt</p>
      <h1 class="riesig">Bei mir kommt <br>der Meister selbst.</h1>
      <p class="held__lead">Ich bin Nico Hofmeister, Elektrotechnikermeister, und seit 2004 mit meinem eigenen Betrieb unterwegs. Ob neue Steckdose im Altbau, kompletter Neubau oder Zählerschrank fürs Mehrfamilienhaus: Ich berate Sie, lege selbst Hand an und bleibe danach Ihr Ansprechpartner.</p>
      <a class="knopf knopf--hell" href="${u("kontakt/")}">Anfrage schreiben ${PFEIL}</a>
    </div>
    <figure class="held__bild">
      ${s.bild("portraet", { alt: "Nico Hofmeister vor seinem Firmenwagen", sizes: "(min-width: 900px) 440px, 90vw", prio: true })}
    </figure>
  </div>
</section>

<section class="legende" aria-labelledby="legende-titel">
  <div class="rahmen legende__innen">
    <header class="legende__kopf">
      <p class="kicker">Legende</p>
      <h2 class="gross" id="legende-titel">Was ich für Sie mache</h2>
      <p>Die Zeichen sind Planzeichen aus dem Installationsplan. Genau so stehen diese Arbeiten auch im Grundriss Ihres Hauses.</p>
    </header>
    <ol class="legende__liste">${zeilen}
    </ol>
  </div>
</section>

<section class="gelb" aria-labelledby="gelb-titel">
  <div class="rahmen gelb__innen">
    <div class="gelb__kopf">
      ${ZEICHEN.zaehler}
      <h2 class="gross" id="gelb-titel">Neuer Zähler? Den darf nur ein eingetragener Betrieb anmelden.</h2>
      <p>Netzbetreiber nehmen Anmeldungen nur von Elektrofachbetrieben an, die in ihrem Installateurverzeichnis stehen. Mein Betrieb ist eingetragen. Ich prüfe den Zählerplatz, stelle den Antrag und nehme die Anlage in Betrieb, sobald der Zähler gesetzt ist.</p>
    </div>
    <div class="gelb__text">
      <p class="gelb__fuer">An- und Abmeldung für</p>
      <ul class="gelb__liste"><li>Haushaltsstrom</li><li>Allgemeinstrom</li><li>Baustrom</li><li>Heizstrom für Wärmepumpen</li><li>PV-Anlagen</li></ul>
      <a class="knopf knopf--hell" href="${u("zaehleranmeldung/")}">So läuft die Anmeldung ${PFEIL}</a>
    </div>
  </div>
</section>

<section class="gebiet" aria-labelledby="gebiet-titel">
  <div class="rahmen gebiet__innen">
    <div class="gebiet__text">
      <p class="kicker">Einsatzgebiet</p>
      <h2 class="gross" id="gebiet-titel">Rund 30&nbsp;Kilometer um Bobstadt.</h2>
      <p>Unterwegs bin ich vor allem in Bürstadt und den Nachbarorten, für meine Kunden aber auch deutlich weiter: von Worms bis Weinheim, von Gernsheim bis Mannheim.</p>
      <h3 class="klein-titel">Für wen ich arbeite</h3>
      <ul class="kunden"><li>Private Haushalte</li><li>Hausverwaltungen</li><li>Vereine</li><li>Gewerbe und Industrie</li><li>Öffentliche Träger</li></ul>
      <p class="gebiet__hinweis nur-maus">Fahren Sie mit der Maus über einen Ort, dann sehen Sie die Entfernung.</p>
    </div>
    ${karte()}
  </div>
</section>`,
  };
}

/* ---------- Leistungen: Übersicht ---------- */
function leistungenUebersicht(k) {
  const s = k("leistungen/");
  const { u } = s;
  const eintraege = LEISTUNGEN.map((l) => `
    <article class="eintrag">
      <div class="eintrag__kopf">
        <span class="eintrag__zeichen">${ZEICHEN[l.zeichen]}</span>
        <h2 class="mittel"><a href="${u(`leistungen/${l.slug}/`)}">${l.name}</a></h2>
      </div>
      <div class="eintrag__inhalt">
        <p>${l.lead}</p>
        <a class="textlink" href="${u(`leistungen/${l.slug}/`)}">Mehr zu ${l.dativ || l.name} ${PFEIL}</a>
      </div>
    </article>`).join("");
  return {
    pfad: "leistungen/",
    titel: "Leistungen | Nico Hofmeister Elektrotechnik, Bürstadt",
    beschreibung: "Elektroinstallation, Zählerplätze, Verteiler und Schaltanlagen, Beleuchtung, Sat-Anlagen, Sprechanlagen und Netzwerktechnik vom Elektromeister in Bürstadt-Bobstadt.",
    inhalt: `
<section class="seitenkopf">
  <div class="rahmen">
    <h1 class="gross-1">Leistungen</h1>
    <p class="lead">Von der kleinen Reparatur bis zur Schaltanlage für den Betrieb. Hinter jedem Punkt steht eine eigene Seite mit typischen Aufträgen und dem, was man vorher wissen sollte.</p>
  </div>
</section>
<section class="rahmen eintraege">${eintraege}
</section>
<aside class="rahmen"><div class="hinweis-gelb">
  ${ZEICHEN.zaehler}
  <p><strong>Zähler an- oder abmelden?</strong> Das übernehme ich als eingetragener Betrieb direkt beim Netzbetreiber.</p>
  <a class="textlink" href="${u("zaehleranmeldung/")}">Zur Zähleranmeldung ${PFEIL}</a>
</div></aside>`,
  };
}

/* ---------- Leistungen: Einzelseiten ---------- */
function leistungSeite(k, l, i) {
  const s = k(`leistungen/${l.slug}/`);
  const { u } = s;
  const andere = LEISTUNGEN.filter((x) => x !== l);
  return {
    pfad: `leistungen/${l.slug}/`,
    titel: `${l.titel} | Nico Hofmeister Elektrotechnik`,
    beschreibung: l.beschreibung,
    schema: [{
      "@context": "https://schema.org", "@type": "Service", name: l.name, serviceType: l.name,
      provider: { "@id": DOMAIN + "#betrieb" }, areaServed: "Bürstadt, Kreis Bergstraße und rund 30 km Umkreis",
      url: DOMAIN + `leistungen/${l.slug}/`,
    }],
    inhalt: `
<section class="seitenkopf seitenkopf--leistung">
  <div class="rahmen seitenkopf__innen">
    ${kachel(l.zeichen)}
    <div>
      <nav class="pfad" aria-label="Sie sind hier"><a href="${u("leistungen/")}">Leistungen</a> <span aria-hidden="true">/</span> <span aria-current="page">${l.name}</span></nav>
      <h1 class="gross-1">${l.name}</h1>
      <p class="lead">${l.lead}</p>
    </div>
  </div>
</section>
<section class="rahmen leistung">
  <div class="leistung__auftraege">
    <h2 class="klein-titel">Typische Aufträge</h2>
    <ul class="strichliste">${l.auftraege.map((a) => `<li>${a}</li>`).join("")}</ul>
    <a class="knopf knopf--hell" href="${u(`kontakt/?anliegen=${l.slug}`)}#anfrage">Anfrage zu ${l.dativ || l.name} ${PFEIL}</a>
  </div>
  <aside class="leistung__wissen" aria-label="Gut zu wissen">
    <h2 class="klein-titel">Gut zu wissen</h2>
    ${l.wissen.map(([t, x]) => `<h3>${t}</h3><p>${x}</p>`).join("\n    ")}
  </aside>
</section>
${l.verweis ? `<aside class="rahmen"><div class="hinweis-gelb">
  ${ZEICHEN.zaehler}
  <p><strong>Den Zähler melde ich gleich mit an.</strong> Als eingetragener Betrieb stelle ich den Antrag beim Netzbetreiber selbst.</p>
  <a class="textlink" href="${u("zaehleranmeldung/")}">Zur Zähleranmeldung ${PFEIL}</a>
</div></aside>` : ""}
<nav class="rahmen weitere" aria-labelledby="weitere-titel">
  <h2 class="klein-titel" id="weitere-titel">Weitere Leistungen</h2>
  <ul>${andere.map((x) => `<li><a href="${u(`leistungen/${x.slug}/`)}"><span class="weitere__zeichen">${ZEICHEN[x.zeichen]}</span>${x.name}</a></li>`).join("")}</ul>
</nav>`,
  };
}

/* ---------- Zähleranmeldung ---------- */
function zaehleranmeldung(k) {
  const s = k("zaehleranmeldung/");
  const { u } = s;
  const faelle = [
    ["Neubau", "Haushaltsstrom für jede Wohnung, im Mehrfamilienhaus zusätzlich Allgemeinstrom für Treppenhaus, Keller und Außenlicht."],
    ["Baustelle", "Baustrom für die Bauzeit. Wenn das Haus fertig ist, melde ich ihn wieder ab."],
    ["Wärmepumpe", "Anschluss der Wärmepumpe, auf Wunsch mit eigenem Zähler für Heizstrom. Seit 2024 wird sie außerdem als steuerbare Verbrauchseinrichtung nach § 14a EnWG angemeldet."],
    ["PV-Anlage", "Anmeldung beim Netzbetreiber, damit ein Zweirichtungszähler gesetzt wird und eingespeister Strom gezählt werden kann."],
    ["Abriss oder Leerstand", "Abmeldung und Ausbau des Zählers, damit keine Grundgebühr weiterläuft."],
  ];
  const ablauf = [
    ["Vor Ort", "Ich sehe mir Zählerplatz und Anlage an und sage Ihnen, ob vorher etwas umgebaut werden muss."],
    ["Antrag", "Ich melde das Vorhaben beim Netzbetreiber an, mit allen Angaben und Unterlagen, die er verlangt."],
    ["Zähler", "Der Netzbetreiber oder Messstellenbetreiber setzt den Zähler. Den Termin stimmen wir gemeinsam ab."],
    ["Inbetriebnahme", "Ich nehme die Anlage in Betrieb, prüfe sie und dokumentiere die Messwerte."],
  ];
  return {
    pfad: "zaehleranmeldung/",
    titel: "Zähler anmelden lassen: Baustrom, Wärmepumpe, PV | Elektromeister Bürstadt",
    beschreibung: "Zähleranmeldung durch einen eingetragenen Elektrofachbetrieb: Haushaltsstrom, Allgemeinstrom, Baustrom, Heizstrom für Wärmepumpen und PV-Anlagen in Bürstadt und Umgebung.",
    inhalt: `
<section class="seitenkopf seitenkopf--leistung">
  <div class="rahmen seitenkopf__innen">
    ${kachel("zaehler")}
    <div>
      <h1 class="gross-1">Zähler anmelden lassen</h1>
      <p class="lead">Neuer Hausanschluss, Baustrom, Wärmepumpe oder PV-Anlage: Den Zähler meldet ein eingetragener Elektrofachbetrieb beim Netzbetreiber an. Ich übernehme das für Sie, vom Blick auf den Zählerplatz bis zur Inbetriebnahme.</p>
    </div>
  </div>
</section>

<section class="rahmen zweispaltig">
  <div>
    <h2 class="mittel">Warum nicht jeder anmelden darf</h2>
  </div>
  <div class="fliesstext">
    <p>An der Anlage hinter dem Hausanschluss dürfen außer dem Netzbetreiber nur Installateure arbeiten, die in einem Installateurverzeichnis eines Netzbetreibers eingetragen sind. So steht es in § 13 der Niederspannungsanschlussverordnung. Deshalb nimmt der Netzbetreiber Anmeldungen auch nur von solchen Betrieben an.</p>
    <p>Mein Betrieb ist eingetragen. Sie brauchen also niemanden zusätzlich, der „nur die Anmeldung macht“.</p>
  </div>
</section>

<section class="rahmen tabelle-block" aria-labelledby="faelle-titel">
  <h2 class="mittel" id="faelle-titel">Wann eine Anmeldung nötig ist</h2>
  <table class="tabelle">
    <thead><tr><th scope="col">Anlass</th><th scope="col">Was angemeldet wird</th></tr></thead>
    <tbody>${faelle.map(([a, b]) => `<tr><th scope="row">${a}</th><td>${b}</td></tr>`).join("")}</tbody>
  </table>
</section>

<section class="rahmen zweispaltig" aria-labelledby="ablauf-titel">
  <div><h2 class="mittel" id="ablauf-titel">So läuft es ab</h2></div>
  <dl class="ablauf">${ablauf.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>
</section>

<section class="rahmen zweispaltig">
  <div><h2 class="klein-titel">Gut zu wissen</h2></div>
  <div class="notizen">
    <div><h3>Balkonkraftwerk</h3><p>Steckersolargeräte müssen seit Mai 2024 nicht mehr beim Netzbetreiber angemeldet werden. Es genügt der Eintrag im Marktstammdatenregister, den Sie selbst online erledigen. Dafür brauchen Sie mich nicht.</p></div>
    <div><h3>Wärmepumpe</h3><p>Als steuerbare Verbrauchseinrichtung darf der Netzbetreiber die Leistung in Ausnahmefällen begrenzen. Dafür zahlen Sie geringere Netzentgelte.</p></div>
  </div>
</section>

<section class="rahmen abschluss">
  <a class="knopf knopf--hell" href="${u("kontakt/?anliegen=zaehleranmeldung")}#anfrage">Zähleranmeldung anfragen ${PFEIL}</a>
</section>`,
  };
}

/* ---------- Über mich ---------- */
function ueberMich(k) {
  const s = k("ueber-mich/");
  const { u } = s;
  const lauf = [
    ["1993", "Beginn der Ausbildung zum Elektriker in einem kleinen Betrieb in Lampertheim"],
    ["1997", "Ausbildung erfolgreich abgeschlossen"],
    ["2003", "Meisterbrief im Elektrotechniker-Handwerk, Handwerkskammer Rhein-Main in Darmstadt"],
    ["2004", "Selbstständig als Elektrotechnikermeister"],
  ];
  return {
    pfad: "ueber-mich/",
    titel: "Über mich | Nico Hofmeister, Elektrotechnikermeister in Bürstadt",
    beschreibung: "Nico Hofmeister, Jahrgang 1976: Ausbildung in Lampertheim, Meisterbrief 2003, seit 2004 selbstständig. Konzessionierter Elektrofachbetrieb in Bürstadt-Bobstadt.",
    inhalt: `
<section class="seitenkopf">
  <div class="rahmen">
    <h1 class="gross-1">Nico Hofmeister</h1>
    <p class="lead">Elektrotechnikermeister, Jahrgang 1976, geboren in Worms.</p>
  </div>
</section>

<section class="rahmen zweispaltig">
  <div>
    <h2 class="klein-titel">Werdegang</h2>
    <dl class="lauf">${lauf.map(([j, t]) => `<div><dt>${j}</dt><dd>${t}</dd></div>`).join("")}</dl>
  </div>
  <div class="fliesstext">
    <p>Mein Schwerpunkt ist die Gebäudeinstallation, ob klein oder groß: von der Renovierung einer Wohnung bis zur kompletten Anlage mit Zählerplatz, Verteilung, Licht, Sat-, Sprech- und Netzwerktechnik.</p>
    <p>Ich verbaue überwiegend Produkte namhafter Hersteller, die ich über den Elektrogroßhandel beziehe. So weiß ich, was in Ihrer Wand steckt, und bekomme auch Jahre später noch Ersatz.</p>
    <p>Zu meinen Kunden gehören private Haushalte, Hausverwaltungen, Vereine, Gewerbe- und Industriebetriebe und öffentliche Träger. Termine vereinbare ich nach telefonischer Absprache, dann weiß ich vorher, worum es geht, und habe das passende Material dabei.</p>
  </div>
</section>

<figure class="rahmen bus">
  ${s.bild("bus", { alt: "Grauer Firmenwagen mit Hofmeister-Beschriftung vor dem Haus Frankensteinstraße 5", sizes: "(min-width: 1100px) 820px, 92vw" })}
  <figcaption>Auf dem Bus steht, was ich anbiete: Beratung, Verkauf, Montage und Service.</figcaption>
</figure>`,
  };
}

/* ---------- Kontakt ---------- */
function kontakt(k) {
  const s = k("kontakt/");
  const optionen = [["", "Bitte wählen"], ...LEISTUNGEN.map((l) => [l.slug, l.name]), ["zaehleranmeldung", "Zähleranmeldung"], ["sonstiges", "Etwas anderes"]];
  return {
    pfad: "kontakt/",
    titel: "Kontakt | Nico Hofmeister Elektrotechnik, Bürstadt-Bobstadt",
    beschreibung: `Nico Hofmeister Elektrotechnik, ${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}. Telefon ${BETRIEB.telefon}, E-Mail ${BETRIEB.mail}.`,
    klasse: "kontakt-seite",
    ohneKopfTelefon: true,
    fussOhneKontakt: true,
    schema: [SCHEMA_BETRIEB],
    inhalt: `
<section class="seitenkopf">
  <div class="rahmen">
    <h1 class="gross-1">Am schnellsten geht es am Telefon.</h1>
    <a class="gross-telefon" href="${BETRIEB.telefonLink}">${HOERER}${BETRIEB.telefon}</a>
    <p class="lead">Erreichbar ${BETRIEB.zeiten}. Termine und Aufträge bespreche ich am liebsten persönlich am Telefon.</p>
  </div>
</section>

<section class="rahmen kontaktdaten" aria-label="Weitere Kontaktwege">
  <dl>
    <div><dt>E-Mail</dt><dd><a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></dd></div>
    <div><dt>Fax</dt><dd>${BETRIEB.fax}</dd></div>
    <div><dt>Adresse</dt><dd>${BETRIEB.strasse}<br>${BETRIEB.plz} ${BETRIEB.ort}</dd></div>
  </dl>
</section>

<section class="rahmen anfrage" id="anfrage" aria-labelledby="anfrage-titel">
  <div class="anfrage__kopf">
    <h2 class="mittel" id="anfrage-titel">Oder schreiben Sie mir</h2>
    <p>Beim Absenden öffnet sich Ihr E-Mail-Programm mit der fertigen Nachricht. Über diese Website wird nichts gespeichert.</p>
  </div>
  <form class="formular" data-mail="${BETRIEB.mail}">
    <label>Ihr Name<input name="name" autocomplete="name" required></label>
    <label>Telefon<input name="telefon" type="tel" autocomplete="tel" required></label>
    <label><span>E-Mail <span class="optional">(freiwillig)</span></span><input name="email" type="email" autocomplete="email"></label>
    <label>Ort<input name="ort" autocomplete="address-level2" placeholder="z. B. Biblis"></label>
    <label class="breit">Worum geht es?<select name="anliegen">${optionen.map(([w, t]) => `<option value="${w}">${t}</option>`).join("")}</select></label>
    <label class="breit">Ihre Nachricht<textarea name="nachricht" rows="6" required placeholder="Was soll gemacht werden, und bis wann?"></textarea></label>
    <div class="breit formular__fuss">
      <button class="knopf knopf--hell" type="submit">Nachricht vorbereiten ${PFEIL}</button>
      <p class="klein">Hinweise zum Datenschutz finden Sie in der <a href="${s.u("datenschutz/")}">Datenschutzerklärung</a>.</p>
    </div>
  </form>
</section>`,
  };
}

/* ---------- Impressum ---------- */
function impressum(k) {
  const s = k("impressum/");
  return {
    pfad: "impressum/",
    titel: "Impressum | Nico Hofmeister Elektrotechnik",
    beschreibung: "Impressum von Nico Hofmeister Elektrotechnik, Bürstadt-Bobstadt.",
    robots: "noindex, follow",
    fussOhneKontakt: true,
    inhalt: `
<section class="seitenkopf"><div class="rahmen"><h1 class="gross-1">Impressum</h1></div></section>
<section class="rahmen recht">
  <h2>Angaben gemäß § 5 DDG</h2>
  <p>${BETRIEB.name}<br>Inhaber: ${BETRIEB.inhaber}<br>${BETRIEB.strasse}<br>${BETRIEB.plz} Bürstadt</p>
  <h2>Kontakt</h2>
  <p>Telefon: +49 6245 995412<br>Fax: +49 6245 995988<br>E-Mail: <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>
  <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
  <!-- TODO Bilal: Kammer und Handwerksrolle von Nico bestätigen lassen. Bürstadt gehört zur Handwerkskammer Frankfurt-Rhein-Main. -->
  <p>Berufsbezeichnung: Elektrotechnikermeister (verliehen in der Bundesrepublik Deutschland)<br>
  Zuständige Kammer: Handwerkskammer Frankfurt-Rhein-Main, Bockenheimer Landstraße 21, 60325 Frankfurt am Main<br>
  Eingetragen in die Handwerksrolle.<br>
  Es gilt die Handwerksordnung (HwO), nachzulesen unter <a href="https://www.gesetze-im-internet.de/hwo/" rel="noopener">gesetze-im-internet.de/hwo</a>.</p>
  <h2>Umsatzsteuer</h2>
  <!-- TODO Bilal: USt-IdNr. fehlt, auf der alten Seite stand nur „DE“. -->
  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: <span class="luecke">wird ergänzt</span></p>
  <h2>Verbraucherstreitbeilegung</h2>
  <p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  <h2>Bildnachweis</h2>
  <!-- TODO Bilal: Urheber der beiden Fotos bestätigen (stammen von der alten Seite). -->
  <p>Fotos: ${BETRIEB.inhaber}. Kartendaten: © OpenStreetMap-Mitwirkende, Lizenz ODbL.</p>
</section>`,
  };
}

/* ---------- Datenschutz ---------- */
function datenschutz(k) {
  const s = k("datenschutz/");
  return {
    pfad: "datenschutz/",
    titel: "Datenschutzerklärung | Nico Hofmeister Elektrotechnik",
    beschreibung: "Datenschutzerklärung von Nico Hofmeister Elektrotechnik, Bürstadt-Bobstadt.",
    robots: "noindex, follow",
    fussOhneKontakt: true,
    inhalt: `
<section class="seitenkopf"><div class="rahmen"><h1 class="gross-1">Datenschutz&shy;erklärung</h1></div></section>
<section class="rahmen recht">
  <h2>Verantwortlicher</h2>
  <p>${BETRIEB.inhaber}, ${BETRIEB.name}<br>${BETRIEB.strasse}, ${BETRIEB.plz} Bürstadt<br>Telefon +49 6245 995412, E-Mail <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>

  <h2>Das Wichtigste vorab</h2>
  <p>Diese Website setzt keine Cookies, bindet keine Analyse- oder Werbedienste ein und lädt keine Inhalte von fremden Servern. Schrift und Karte liegen auf demselben Server wie die Seite selbst. Die Karte ist eine eigene Zeichnung auf Grundlage von OpenStreetMap-Daten, es wird dabei nichts von OpenStreetMap nachgeladen.</p>

  <h2>Hosting und Server-Protokolle</h2>
  <!-- TODO Bilal: Hoster eintragen (geplant ALL-INKL, Neue Medien Münnich, Hauptstraße 68, 02742 Friedersdorf) und AV-Vertrag abschließen. -->
  <p>Die Website wird bei einem Hosting-Anbieter in Deutschland betrieben. Beim Aufruf speichert der Server automatisch Angaben, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Das ist nötig, um die Seite sicher und fehlerfrei auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Die Protokolle werden gelöscht, sobald sie dafür nicht mehr gebraucht werden. Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung.</p>

  <h2>Kontakt per Telefon, E-Mail oder Formular</h2>
  <p>Wenn Sie mich anrufen oder mir schreiben, verarbeite ich Ihre Angaben, um Ihre Anfrage zu beantworten und gegebenenfalls einen Auftrag vorzubereiten (Art. 6 Abs. 1 lit. b DSGVO). Das Formular auf der Kontaktseite verschickt selbst nichts: Es öffnet Ihr eigenes E-Mail-Programm mit der fertigen Nachricht, und Sie entscheiden, ob Sie sie absenden. Ich lösche Anfragen, wenn sie erledigt sind und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>

  <h2>Ihre Rechte</h2>
  <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine formlose Nachricht an die oben genannte Adresse genügt.</p>
  <p>Sie können sich außerdem bei einer Aufsichtsbehörde beschweren, zum Beispiel beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden.</p>
  <p class="klein">Stand: September 2026</p>
</section>`,
  };
}

/* ---------- 404 ---------- */
function fehlerseite(k) {
  const s = k("");
  const { u } = s;
  return {
    pfad: "404.html",
    datei: "404.html",
    titel: "Seite nicht gefunden | Nico Hofmeister Elektrotechnik",
    beschreibung: "Diese Seite gibt es nicht.",
    robots: "noindex, follow",
    inhalt: `
<section class="seitenkopf fehler">
  <div class="rahmen">
    <h1 class="gross-1">Hier kommt kein Strom an.</h1>
    <p class="lead">Diese Seite gibt es nicht oder nicht mehr. Weiter geht es hier:</p>
    <ul class="fehler__wege">
      <li><a class="textlink" href="${u()}">Startseite ${PFEIL}</a></li>
      <li><a class="textlink" href="${u("leistungen/")}">Leistungen ${PFEIL}</a></li>
      <li><a class="textlink" href="${u("kontakt/")}">Kontakt ${PFEIL}</a></li>
    </ul>
  </div>
</section>`,
  };
}

export function alleSeiten(k) {
  return [
    startseite(k),
    leistungenUebersicht(k),
    ...LEISTUNGEN.map((l, i) => leistungSeite(k, l, i)),
    zaehleranmeldung(k),
    ueberMich(k),
    kontakt(k),
    impressum(k),
    datenschutz(k),
    fehlerseite(k),
  ];
}
