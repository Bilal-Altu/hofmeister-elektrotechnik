// Menü am Handy, Anfrageformular (öffnet das eigene E-Mail-Programm, nichts wird gespeichert).
(function () {
  "use strict";

  /* ---------- Menü ---------- */
  var knopf = document.querySelector(".kopf__menue");
  var menue = document.getElementById("menue-mobil");
  function setzen(offen) {
    knopf.setAttribute("aria-expanded", String(offen));
    knopf.querySelector(".nur-leser").textContent = offen ? "Menü schließen" : "Menü öffnen";
    menue.hidden = !offen;
    document.body.classList.toggle("menue-offen", offen);
  }
  if (knopf && menue) {
    knopf.addEventListener("click", function () { setzen(knopf.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menue.hidden) { setzen(false); knopf.focus(); } });
    window.matchMedia("(min-width: 1061px)").addEventListener("change", function (m) { if (m.matches) setzen(false); });
  }

  /* ---------- Anfrageformular ---------- */
  var form = document.querySelector(".formular");
  if (!form) return;
  var auswahl = form.elements.anliegen;
  var gewuenscht = new URLSearchParams(location.search).get("anliegen");
  if (gewuenscht && auswahl.querySelector('option[value="' + gewuenscht.replace(/[^a-z-]/g, "") + '"]')) auswahl.value = gewuenscht;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var f = form.elements;
    var thema = auswahl.value ? auswahl.options[auswahl.selectedIndex].text : "Anfrage";
    var zeilen = [
      f.nachricht.value.trim(),
      "",
      "Name: " + f.name.value.trim(),
      "Telefon: " + f.telefon.value.trim(),
    ];
    if (f.email.value.trim()) zeilen.push("E-Mail: " + f.email.value.trim());
    if (f.ort.value.trim()) zeilen.push("Ort: " + f.ort.value.trim());
    var betreff = "Anfrage über die Website: " + thema + (f.ort.value.trim() ? " in " + f.ort.value.trim() : "");
    location.href = "mailto:" + form.dataset.mail + "?subject=" + encodeURIComponent(betreff) + "&body=" + encodeURIComponent(zeilen.join("\n"));
  });
})();
