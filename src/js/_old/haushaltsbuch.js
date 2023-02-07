"use strict";

const haushaltsbuch = {


    gesamtbilanz: new Map(),

    einträge: [],

    // HTML Eintrag generieren
    eintraege_anzeigen() {
        // überprüfen ob eine <ul> bereits vorhanden ist
        // ul entfernen
        let curEntries = document.querySelectorAll(".monatsliste ul");
        if (curEntries.length > 0) {
            curEntries.forEach(entry => entry.remove());
        }

        let list = document.createElement("ul");

        this.einträge.forEach((entry) => {
            list.insertAdjacentElement("beforeend", this.getHtmlEntry(entry));
        });

        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", list);
    },


    getHtmlEntry(entry) {

        let lip = document.createElement("li");
        lip.setAttribute("class", entry.get("type").toLowerCase());
        lip.setAttribute("data-timestamp", entry.get("timestamp"));

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = entry.get("date").toLocaleDateString("de-de", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        lip.insertAdjacentElement("afterbegin", datum);

        let title = document.createElement("span");
        title.setAttribute("class", "titel");
        title.textContent = entry.get("title");

        datum.insertAdjacentElement("afterend", title);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = centToEuro(entry.get("amount")) + "€";

        title.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        button.addEventListener("click", e => {
            e.preventDefault();
            this.removeEntry(e.target.parentNode.getAttribute("data-timestamp"));
        });

        betrag.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);

        return lip;
    },


    removeEntry(timestamp) {
        this.einträge = this.einträge.filter(obj => obj.get("timestamp") !== parseInt(timestamp));

        this.eintraege_anzeigen();
        this.calculate();
        this.updateBilanzView();
    },


    // Einträge laden


    calculate() {
        let einnahmen = 0;
        let ausgaben = 0;

        this.einträge.forEach(data => {
            if (data.get("type") === "einnahme") {
                einnahmen += data.get("amount");
            } else {
                ausgaben += data.get("amount");
            }
        });

        this.gesamtbilanz.set("einnahmen", einnahmen);
        this.gesamtbilanz.set("ausgaben", ausgaben);
        this.gesamtbilanz.set("bilanz", (einnahmen - ausgaben));
    },

    getBilanz() {
        return this.gesamtbilanz.get("einnahmen") - this.gesamtbilanz.get("ausgaben");
    },


    updateBilanzView() {

        let bw = document.querySelector("#gesamtbilanz");

        let einnahmen = document.querySelector(".einnahmen.gesamtbilanz-zeile > span:nth-of-type(2)");
        einnahmen.textContent = centToEuro(this.gesamtbilanz.get("einnahmen"));

        let ausgaben = document.querySelector(".ausgaben.gesamtbilanz-zeile > span:nth-of-type(2)");
        ausgaben.textContent = centToEuro(this.gesamtbilanz.get("ausgaben"));

        let bilanzVal = document.querySelector(".bilanz.gesamtbilanz-zeile > span:nth-of-type(2)");
        bilanzVal.setAttribute("class", ((this.getBilanz() > 0) ? 'positiv' : 'negativ'));
        bilanzVal.textContent = centToEuro(this.getBilanz()) + "€";
    },

    sort() {
        let sorted = this.einträge.sort(function (a, b) {
            return new Date(a.get("date")) - new Date(b.get("date"));
        });
        this.einträge = sorted;
    },

    add(formdata) {
        let date = new Date();

        let newEntry = new Map();
        newEntry.set("title", formdata.title);
        newEntry.set("amount", formdata.amount);
        newEntry.set("type", formdata.type);
        newEntry.set("date", formdata.date);
        newEntry.set("timestamp", Date.now());
        this.einträge.push(newEntry);

        this.calculate();
        this.sort();
        this.eintraege_anzeigen();
        this.updateBilanzView();
    }
};