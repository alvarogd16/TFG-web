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
    bg_canvas: "",
    points_canvas: "",
    block_fill: "",
    block_stroke: "",
    port_in: "",
    port_out: "",
    labels: "",
    wire_off: "",
    wire_on: ""
}


// Usefull functions
const roundToMultiple = (n, multiple) => {
    return multiple*Math.round(n/multiple);
}