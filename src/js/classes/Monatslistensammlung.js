import { Monatsliste } from "./Monatsliste.js";

export class Monatslistensammlung {

    /** @type {Map} */
    #monthlists;

    constructor() {
        this.#monthlists = new Map();

        let lists = document.createElement("section");
        lists.setAttribute("id", "monatslisten");
        document.querySelector("#eingabeformular-container").insertAdjacentElement("afterend", lists);
    }

    create(year, month) {
        this.#monthlists.set(year + "-" + month, new Monatsliste(year, month, 0, []));
    }

    contains(year, month) {
        return this.#monthlists.has(year + "-" + month);
    }

    /**
     * 
     * @param {Number} year 
     * @param {Number} month 
     * @returns {Monatsliste}
     */
    getList(year, month) {
        return this.#monthlists.get(year + "-" + month);
    }

    /**
     * 
     * @param {Eintrag} entry
     * @returns {Monatsliste}
     */
    getListForEntry(entry) {
        let year = entry.getDate().getUTCFullYear();
        let month = entry.getDate().getMonth();

        return this.getList(year, month);
    }

    remove(year, month) {
        this.#monthlists.delete(year + "-" + month);
    }

    /**
     * 
     * @returns {Map};
     */
    getAll() {
        return this.#monthlists;
    }

    clearAll() {
        for (let list of this.getAll().values()) {
            list.clear();
        }
    }

    sort() {
        let unsortedArray = [...this.#monthlists];
        this.#monthlists = new Map(unsortedArray.sort(([k1, v1], [k2, v2]) => v1.getDate() - v2.getDate()));
    }

    render() {
        for (let list of this.getAll().values()) {
            list.render();
        }
    }
}