// Constants
export const GRID_SIZE = 30;

// Enums
export const BLOCK_TYPES = {rect: 'rect', switch: 'switch', inValue: 'inValue'};
export const APP_MODES = {halt: 'halt', draw: 'draw', wiring: 'wiring'};
export const WIRING_MODES = {halt: 'halt', pressed: 'pressed', released: 'released'};
export const DIRECTIONS = {left: 'left', top: 'top', right: 'right', bottom: 'bottom'};
export const PORT_TYPES = {in: 'in', out: 'out'};
export const VALUES_FORMAT = {binary: "b", hex: "h", decimal: "d"}
export const WIRE_DIRECTION = {vertical: 'vertical', horizontal: 'horizontal'}

// Colors 🌈
export const COLORS = {
    bg_canvas: "#DCDCDC",
    points_canvas: "#C0C0C0",
    block_fill: "#E07193",
    prev_block_fill: "#FFD1DC",
    // block_stroke: "#696969",
    block_stroke: '#000000',
    port_in: "#A9A9A9",
    port_out: "#404040",
    labels: "#FFFFFF",
    wire_off: "#000000",
    wire_on: "#ffd700"
}


// Usefull functions
export const roundToMultiple = (n, multiple) => {
    return multiple*Math.round(n/multiple);
}