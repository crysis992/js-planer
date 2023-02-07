"use strict"

class Navigationsleiste {

    #header;

    constructor(header) {
        if (!header) {
            console.error("Header is undefined!");
        }
        this.#header = header;
        this.show();
    }

    setHeader(text) {
        this.#header = text;
        document.querySelector("nav").remove();
        this.show();
        console.log("Changing!");
    }

    show() {
        document.querySelector("body").insertAdjacentElement("afterbegin", this.#generate());
    }

    #generate() {
        let nav = document.createElement("nav");
        nav.setAttribute("id", "navigationsleiste");
        nav.innerHTML = `<a href="index.html"><span id="markenname">${this.#header}</span></a>`;
        return nav;
    }
}