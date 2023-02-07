import haushaltsbuch from "./../main.js";

export class Eingabeformular {

    #html;

    constructor() {
        this.#html = this.#html_generieren();
    }


    #absenden_event_hinzufuegen(form) {
        form.querySelector("#eingabeformular").addEventListener("submit", e => {
            e.preventDefault();
            // Forumlardaten holen
            let data = this.#getFormData(e);
            // Forumlardaten validieren
            let errors = this.#validate(data);

            let container = document.querySelector("#eingabefehler");
            if (container != undefined) {
                container.remove();
            }

            if (errors.length > 0) {
                let error = new Fehler("Folgende Felder wurden nicht korrekt ausgefüllt:", errors);
                error.show();

                // this.#showError(errors);
                this.#reset();
                this.#setDate();
                return;
            }
            // Eintrag zu dem Haushaltsbuch hinzufügen, falls Daten valide sind.ausgabe
            haushaltsbuch.add(data);
            this.#reset();
            this.#setDate();


            // Wenn die Forumlardaten nicht valide sind, eine Fehlermeldung anzeigen
        });
    }

    #getFormData(e) {
        return {
            title: e.target.elements.titel.value.trim(),
            amount: parseFloat(e.target.elements.betrag.value) * 100,
            type: e.target.elements.typ.value,
            date: e.target.elements.datum.valueAsDate
        }
    }

    #validate(data) {
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
    }

    #html_generieren() {

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

        this.#absenden_event_hinzufuegen(eingabeforumlar);
        return eingabeforumlar;



    }


    anzeigen() {

        let a = document.querySelector("body");
        a.insertAdjacentElement("afterbegin", this.#html);
        this.#setDate();

    }

    #reset() {
        document.querySelector("#eingabeformular").reset();
    }

    #setDate() {
        document.querySelector("#datum").valueAsDate = new Date();
    }


}