"use strict";

/**
 * Converts the Input with "," to a Float
 * @param {String} value 
 * @returns {Number, Boolean}
 */
function inputToFloat(value) {
    if (validateAmount(value)) {
        return Number.parseFloat(value.replace(",", ".")) * 100;
    } else {
        return false;
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

/**
 * 
 * @param {String} value
 * @returns {Boolean}
 */
function validateAmount(value) {
    if (value.match(/^\d+(?:(?:,|\.)\d\d?)?$/) != null) {
        return true;
    } else {
        console.log("Ungültiger Betrag!");
        return false;
    }
}

/**
 * 
 * @param {String} value
 * @returns {Boolean}
 */
function validateDate(value) {
    if (value.match(/^\d{4}-\d{2}-\d{2}/) != null) {
        return true;
    } else {
        return false;
    }
}

function d(message) {
    if (!debug) return;
    console.log(message);
}