"use strict";

const eingabeforumlar = {

    absenden_event_hinzufuegen(form) {
        form.querySelector("#eingabeformular").addEventListener("submit", e => {
            e.preventDefault();
            // Forumlardaten holen
            let data = this.getFormData(e);
            // Forumlardaten validieren
            let errors = this.validate(data);
            this.hideError();

            if (errors.length > 0) {
                console.log("Das Formular hat Fehler!");
                console.log(errors);
                this.showError(errors);
                this.reset();
                this.setDate();
                return;
            }

            // Eintrag zu dem Haushaltsbuch hinzufügen, falls Daten valide sind.ausgabe


            haushaltsbuch.add(data);
            this.reset();
            this.setDate();


            // Wenn die Forumlardaten nicht valide sind, eine Fehlermeldung anzeigen
        });
    },

    getFormData(e) {
        return {
            title: e.target.elements.titel.value.trim(),
            amount: parseFloat(e.target.elements.betrag.value) * 100,
            type: e.target.elements.typ.value,
            date: e.target.elements.datum.valueAsDate
        }
    },

    validate(data) {
        let errors = [];

        if (data.title === "") {
            errors.push("Titel fehlt!");
        }
        if (data.date === null) {
            errors.push("Datum wurde nicht gesetzt!");
        }
        if (isNaN(data.amount)) {
            errors.push("Betrag fehlt!");
        }
        if (data.amount < 0) {
            errors.push("Der Betrag darf nicht 0 oder weniger betragen!");
        }
        return errors;
    },

    /**
     * 
     * @param {Array} errorlist 
     */
    getErrorHTML(errorlist) {
        let box = document.createElement("div");
        box.setAttribute("class", "fehlerbox");
        box.setAttribute("id", "eingabefehler");

        let text = document.createElement("span");
        text.textContent = "Folgende Felder wurden nicht korrekt ausgefüllt:";
        box.insertAdjacentElement("afterbegin", text);

        let list = document.createElement("ul");
        box.insertAdjacentElement("beforeend", list);

        errorlist.forEach(e => {
            let li = document.createElement("li");
            li.textContent = e;
            list.insertAdjacentElement("beforeend", li);
        });

        box.insertAdjacentElement("beforeend", list);
        return box;
    },

    showError(errorlist) {
        let container = document.querySelector("#eingabeformular-container");
        console.log(container);

        container.insertAdjacentElement("afterbegin", this.getErrorHTML(errorlist));
    },

    hideError() {
        let container = document.querySelector("#eingabefehler");
        if (container == undefined) return;
        container.remove();
    },

    html_generieren() {

        let eingabeforumlar = document.createElement("section");
        eingabeforumlar.setAttribute("id", "eingabeformular-container");

        eingabeforumlar.innerHTML = `<form id="eingabeformular" action="#" method="get"></form>
                        <div class="eingabeformular-zeile">
                            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
                        </div>
                        <div class="eingabeformular-zeile">
                            <div class="titel-typ-eingabe-gruppe">
                                <label for="titel">Titel</label>
                                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags" required>
                                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags" required>
                                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label> 
                            </div>
                        </div>
                        <div class="eingabeformular-zeile">
                            <div class="betrag-datum-eingabe-gruppe">
                                <label for="betrag">Betrag</label>
                                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)" required>
                                <label for="datum">Datum</label>
                                <input type="date" id="datum" name="datum" form="eingabeformular" placeholder="jjjj-mm-tt" size="10" title="Datum des Eintrags (Format: jjjj-mm-tt)" required>
                            </div>
                        </div>
                        <div class="eingabeformular-zeile">
                            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
                        </div>`;

        this.absenden_event_hinzufuegen(eingabeforumlar);
        return eingabeforumlar;



    },


    anzeigen() {

        let a = document.querySelector("#navigationsleiste");
        a.insertAdjacentElement("afterend", this.html_generieren());
        this.setDate();

    },

    reset() {
        document.querySelector("#eingabeformular").reset();
    },

    setDate() {
        document.querySelector("#datum").valueAsDate = new Date();
    },


};