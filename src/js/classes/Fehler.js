"use strict"

class Fehler {

    #errorTitle;
    #errorList;
    #html;

    constructor(error, errorlist) {
        this.#errorTitle = error;
        this.#errorList = errorlist;
        this.#html = this.#getErrorHTML();
    }

    #getErrorHTML() {
        let box = document.createElement("div");
        box.setAttribute("class", "fehlerbox");
        box.setAttribute("id", "eingabefehler");

        let text = document.createElement("span");
        text.textContent = this.#errorTitle;
        box.insertAdjacentElement("afterbegin", text);

        let list = document.createElement("ul");
        box.insertAdjacentElement("beforeend", list);

        this.#errorList.forEach(e => {
            let li = document.createElement("li");
            li.textContent = e;
            list.insertAdjacentElement("beforeend", li);
        });

        box.insertAdjacentElement("beforeend", list);
        return box;
    }

    show() {
        this.remove();
        let container = document.querySelector("#eingabeformular-container");
        container.insertAdjacentElement("afterbegin", this.#html);
    }

    #remove() {
        let container = document.querySelector("#eingabefehler");
        if (container == undefined) return;
        container.remove();
    }


}