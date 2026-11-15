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


  /* Versand an kontakt.php – SideTwo-Kontaktformular-Standard (nie über die Mail-App) */
  function stSenden(form, betreff, melden) {
    var daten = new FormData(form);
    if (betreff) daten.set("betreff", betreff);
    var knopf = form.querySelector('[type="submit"]');
    if (knopf) knopf.disabled = true;
    if (!melden) {
      var st = form.querySelector(".st-status");
      if (!st) {
        st = document.createElement("p");
        st.className = "st-status";
        st.setAttribute("role", "status");
        st.setAttribute("aria-live", "polite");
        st.style.marginTop = "12px";
        st.style.fontWeight = "600";
        form.appendChild(st);
      }
      melden = function (ok, text) { st.textContent = text; };
    }
    return fetch(form.getAttribute("action") || "kontakt.php", {
      method: "POST", body: daten, headers: { "X-Requested-With": "fetch" }, credentials: "same-origin"
    })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, text: "Das Formular konnte gerade nicht gesendet werden. Bitte rufen Sie uns kurz an." }; })
      .then(function (a) {
        if (knopf) knopf.disabled = !!a.ok;
        melden(!!a.ok, a.text);
        if (a.ok) form.reset();
        return a;
      });
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
    stSenden(form, betreff);
  });
})();
