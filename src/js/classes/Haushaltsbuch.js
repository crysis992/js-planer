"use strict"

class Haushaltsbuch {

    #monatslistensammlung;
    #gesamtbilanz;

    constructor() {
        new Navigationsleiste("Crytec - Planer");
        new Eingabeformular().anzeigen();
        this.#gesamtbilanz = new Gesamtbilanz();
        this.#monatslistensammlung = new Monatslistensammlung();
        Eintrag.hb = this;
    }

    render() {
        this.#monatslistensammlung.render();
    }

    /**
     * 
     * @returns {Monatslistensammlung}
     */
    getMonthList() {
        return this.#monatslistensammlung;
    }

    remove(entry) {
        let list = this.getMonthList().getListForEntry(entry);
        let remaining = list.removeEntry(entry);
        if (remaining == 0) {
            this.getMonthList().remove(list.getYear(), list.getMonth());
            this.getMonthList().clearAll();
            this.getMonthList().render();
        }
        this.#gesamtbilanz.calculate(this.#monatslistensammlung.getAll());
        this.#gesamtbilanz.updateRender();
        this.save();
    }

    add(formdata) {
        let date = new Date();
        let entry;

        if (formdata.timestamp) {
            entry = new Eintrag(formdata.title, formdata.amount, formdata.type, formdata.date, this, formdata.timestamp);
        } else {
            entry = new Eintrag(formdata.title, formdata.amount, formdata.type, formdata.date, this);
        }


        let year = formdata.date.getUTCFullYear();
        let month = formdata.date.getMonth();


        if (!this.#monatslistensammlung.contains(year, month)) {
            this.#monatslistensammlung.create(year, month);
            this.#monatslistensammlung.clearAll();
            this.#monatslistensammlung.sort();
            this.#monatslistensammlung.render();
        }

        this.#monatslistensammlung.getList(year, month).addEntry(entry);

        this.#gesamtbilanz.calculate(this.#monatslistensammlung.getAll());
        this.#gesamtbilanz.updateRender();
        this.save();
    }


    save() {
        let temp = [];
        let test = this.getMonthList().getAll();
        // console.log(test);

        for (const [key, value] of test.entries()) {
            // console.log(value.getEntries());

            for (const e of value.getEntries()) {
                temp.push(JSON.stringify(e));
            }
        }

        let json = JSON.stringify(temp);
        localStorage.setItem("entries", json);
    }

    load() {
        let entryJson = localStorage.getItem("entries");
        if (entryJson == null) {
            return;
        }

        let obj = JSON.parse(entryJson);

        obj.forEach(element => {
            let entry = JSON.parse(element);
            this.add({
                title: entry.title,
                amount: entry.amount,
                date: new Date(entry.date),
                type: entry.type,
                timestamp: entry.timestamp
            });
        });

    }

























    debug(einträge, month) {
        let tmp = 0;

        const id = setInterval(() => {
            if (tmp >= einträge) {
                clearInterval(id);
                return;
            }
            tmp++;
            this.add(this.getDebugData(month));

        }, 350);
    }


    getDebugData(month) {
        let titles = ["Netflix", "Amazon Prime ", "Urlaub", "Gehalt", "Einkaufen", "Monitor", "LostArk", "Ebay"];
        let types = ["einnahme", "ausgabe"];

        return {
            title: titles[this.getRandom(0, titles.length - 1)].trim(),
            amount: parseFloat(this.getRandom(1, 1000) + "." + this.getRandom(0, 99)) * 100,
            type: types[this.getRandom(0, 1)],
            date: this.getRandomDateInMonth(month)
        }
    }

    getRandomDateInMonth(month) {
        if (month == undefined) {
            return new Date(2023, this.getRandom(0, 11), this.getRandom(0, 30), 3, 18, 0);
        }
        return new Date(2023, month, this.getRandom(0, 30), 3, 18, 0);
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}