"use strict"

class Eintrag {

    title;
    amount;
    type;
    date;
    timestamp;
    #html;
    #hb;

    constructor(title, amount, type, date, instance, timestamp) {

        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.timestamp = Date.now();
        this.#hb = instance;

        if (timestamp) {
            this.timestamp = timestamp;
        }

        this.#html = this.generateHTML();


    }

    /**
     * The Title of the Entry
     * @returns @type{String}
     */
    getTitle() {
        return this.title;
    }

    /**
     * 
     * @param {Boolean} formatted If true it will return the converted cent to euro value
     * @returns @type {Number}
     */
    getAmount(formatted) {
        if (formatted) {
            return (this.amount / 100).toFixed(2);
        } else {
            return this.amount;
        }
    }

    /**
     * 
     * @returns @type{String}
     */
    getType() {
        return this.type;
    }

    /**
     * 
     * @returns @type{Date}
     */
    getDate() {
        return this.date;
    }

    /**
     * 
     * @returns @type{Date}
     */
    getTimestamp() {
        return this.timestamp;
    }

    getHTML() {
        return this.#html;
    }

    generateHTML() {
        let lip = document.createElement("li");

        lip.setAttribute("class", this.type.toLowerCase());
        lip.setAttribute("data-timestamp", this.timestamp);

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = this.date.toLocaleDateString("de-de", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        lip.insertAdjacentElement("afterbegin", datum);

        let title = document.createElement("span");
        title.setAttribute("class", "titel");
        title.textContent = this.title;

        datum.insertAdjacentElement("afterend", title);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = this.getAmount(true) + "€";

        title.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        button.addEventListener("click", e => {
            e.preventDefault();
            this.#hb.remove(this);
        });

        betrag.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);

        return lip;
    }


}