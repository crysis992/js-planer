"use strict";

const haushaltsbuch = new Haushaltsbuch();

haushaltsbuch.load();

// haushaltsbuch.debug(5);
// haushaltsbuch.debug(5, 5);

setTimeout(e => haushaltsbuch.save(), 3000);