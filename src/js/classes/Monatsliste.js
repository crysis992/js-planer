"use strict"

class Monatsliste {

    #year;
    #month;
    #bilanz;
    #date;
    #entries;
    #html;
    #id;


    constructor(jahr, monat, bilanz) {
        this.#year = jahr;
        this.#month = monat;
        this.#bilanz = bilanz;
        this.#entries = [];
        this.#date = new Date(jahr, monat, 1);
        this.#id = "ts" + jahr + monat;
        this.#html = this.#generateHTML();

        document.querySelector("#monatslisten").insertAdjacentElement("afterbegin", this.#generateHTML());
    }

    addEntry(entry) {
        this.#entries.push(entry);
        this.calculateBilanz();
        this.#render_entries();
    }

    removeEntry(entry) {

        for (let i = 0; i < this.#entries.length; i++) {
            if (this.#entries[i].getTimestamp() === entry.getTimestamp()) {
                this.#entries.splice(i, 1);
            }
        }
        this.calculateBilanz();
        this.clearEntryList();

        this.#entries.length > 0 ? this.#render_entries() : this.clear();
        return this.#entries.length;
    }

    getEntries() {
        return this.#entries;
    }

    clearEntryList() {
        let data = document.querySelector("#" + this.#id + "> ul");
        if (data != null) {
            data.remove();
        }
    }

    clear() {
        let data = document.querySelector("#" + this.#id);
        if (data != null) {
            data.remove();
        }
    }

    render() {
        document.querySelector("#monatslisten").insertAdjacentElement("afterbegin", this.#generateHTML());
        this.#render_entries();
    }

    #generateHTML() {
        let article = document.createElement("article");
        article.setAttribute("class", "monatsliste");
        article.setAttribute("id", this.#id);

        let h2 = document.createElement("h2");
        article.insertAdjacentElement("afterbegin", h2);

        let spanDate = document.createElement("span");
        spanDate.setAttribute("class", "monat-jahr");
        spanDate.textContent = this.getDateFormatted();

        let spanBilanz = document.createElement("span");
        spanBilanz.setAttribute("class", "monatsbilanz");
        if (this.#bilanz >= 0) {
            spanBilanz.setAttribute("class", spanBilanz.getAttribute("class") + " positiv");
        } else {
            spanBilanz.setAttribute("class", spanBilanz.getAttribute("class") + " negativ");
        }
        spanBilanz.textContent = (this.#bilanz / 100).toFixed(2) + "€";

        h2.insertAdjacentElement("afterbegin", spanDate);
        h2.insertAdjacentElement("beforeend", spanBilanz);

        return article;
    }

    calculateBilanz() {
        let einnahmen = 0;
        let ausgaben = 0;

        this.#entries.forEach(data => {
            if (data.getType() === "einnahme") {
                einnahmen += data.getAmount(false);
            } else {
                ausgaben += data.getAmount(false);
            }
        });

        let bilanz = document.querySelector(`#${this.#id} > h2 > span.monatsbilanz`);
        this.#bilanz = einnahmen - ausgaben;

        if (bilanz != null) {
            bilanz.setAttribute("class", (this.#bilanz >= 0) ? "monatsbilanz positiv" : "monatsbilanz negativ");
            bilanz.textContent = (this.#bilanz / 100).toFixed(2) + "€";
        }

    }

    #render_entries() {
        this.#sort();
        let check = document.querySelector("#" + this.#id + " > ul");

        if (check != null) {
            check.remove();
        }

        let list = document.createElement("ul");

        this.#entries.forEach(e => {
            list.insertAdjacentElement("beforeend", e.getHTML());
        });

        let test = document.querySelector("#" + this.#id);
        if (test == null) {
            console.error("Something went wrong - Could not render entries because ID is missing!");
            return;
        }

        test.insertAdjacentElement("beforeend", list);
    }

    #sort() {
        this.#entries.sort((a, b) => b.getDate() - a.getDate());
    }

    getHTML() {
        return this.#html;
    }

    getDate() {
        return this.#date;
    }

    getDateFormatted() {
        return this.#date.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
    }

    getYear() {
        return this.#year;
    }

    getMonth() {
        return this.#month;
    }
}