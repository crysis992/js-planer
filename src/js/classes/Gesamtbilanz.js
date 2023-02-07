"use strict"

class Gesamtbilanz {

    #einnahmen;
    #ausgaben;

    constructor() {
        this.#einnahmen = 0;
        this.#ausgaben = 0;
        this.updateRender();
    }

    /**
     * 
     * @param {@Map} monatslisten 
     */
    calculate(monatslisten) {
        this.#einnahmen = 0;
        this.#ausgaben = 0;

        for (let list of monatslisten.values()) {
            list.getEntries().forEach(data => {
                if (data.getType() === "einnahme") {
                    this.#einnahmen += data.getAmount(false);
                } else {
                    this.#ausgaben += data.getAmount(false);
                }
            });
        }
    }

    getBilanz() {
        return this.#einnahmen - this.#ausgaben;
    }

    updateRender() {
        let bw = document.querySelector("#gesamtbilanz");

        let einnahmen = document.querySelector(".einnahmen.gesamtbilanz-zeile > span:nth-of-type(2)");
        einnahmen.textContent = centToEuro(this.#einnahmen);

        let ausgaben = document.querySelector(".ausgaben.gesamtbilanz-zeile > span:nth-of-type(2)");
        ausgaben.textContent = centToEuro(this.#ausgaben);

        let bilanzVal = document.querySelector(".bilanz.gesamtbilanz-zeile > span:nth-of-type(2)");
        bilanzVal.setAttribute("class", ((this.getBilanz() >= 0) ? 'positiv' : 'negativ'));
        bilanzVal.textContent = centToEuro(this.getBilanz()) + "€";
    }
}

/**
 * Converts the input in cent into Euro format
 * @param {Number} value Input in cent
 * @returns {Number}
 */

function centToEuro(value) {
    return (value / 100).toFixed(2);
}