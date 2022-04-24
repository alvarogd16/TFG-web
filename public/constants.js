// Constants
const GRID_SIZE = 20;

// Enums
const TYPES = {RECT: 0, SWITCH: 1};
const MODES = {HALT: 0, DRAW: 1, WIRING: 2};
const WIRING_MODES = {HALT: 0, PRESSED: 1, RELEASED: 2};
const DIR = {LEFT: 0, TOP: 1, RIGHT: 2, BOTTOM: 3};
const PORT = {IN: 0, OUT: 1};

// Colors 🌈
const COLORS = {
    bg_canvas: "#DCDCDC",
    points_canvas: "#C0C0C0",
    block_fill: "#E07193",
    prev_block_fill: "#FFD1DC",
    block_stroke: "#696969",
    port_in: "#A9A9A9",
    port_out: "#404040",
    labels: "#FFFFFF",
    wire_off: "#000000",
    wire_on: "#ffd700"
}


// Usefull functions
const roundToMultiple = (n, multiple) => {
    return multiple*Math.round(n/multiple);
}