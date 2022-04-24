// Enums

const TYPES = {RECT: 0, SWITCH: 1};
const MODES = {HALT: 0, DRAW: 1, WIRING: 2};
const WIRING_MODES = {HALT: 0, PRESSED: 1, RELEASED: 2};
const DIR = {LEFT: 0, TOP: 1, RIGHT: 2, BOTTOM: 3};
const PORT = {IN: 0, OUT: 1};

// Colors 🌈


// Usefull functions
const roundToMultiple = (n, multiple) => {
    return multiple*Math.round(n/multiple);
}