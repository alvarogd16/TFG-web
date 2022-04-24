let mode = MODES.HALT;

let portSelected = null;
let wireSelected = null;

let canvas;

function setup() {
    canvas = createCanvas(windowWidth - 345, windowHeight - 135);
    canvas.parent("canvas-container");

    frameRate(30);

    mode = MODES.DRAW;

    drawGrid();
}

function draw() {
    // This ckeck is to improve performance
    if(isMouseInCanvas() && mode !== MODES.HALT) {
        reDraw();
        switch (mode) {
            case MODES.DRAW:
                doDraw();
                break;
            
            case MODES.WIRING:
                doWiring();
                break;
        }
    }
}

function reDraw() {
    drawGrid();
    state.inputs.forEach(input => drawBlock(input));
    state.blocks_instances.forEach(obj => drawBlock(obj));
    state.wires.forEach(wire => drawWire(wire));
}

function mouseClicked() {
    if(isMouseInCanvas() && mode !== MODES.HALT) {
        switch (mode) {
            case MODES.DRAW:
                mouseClickedDraw();
                break;
            
            case MODES.WIRING:
                mouseClickedWiring();
                break;
        }
    }
    reDraw();
}

function mousePressed() {
    if(isMouseInCanvas() && mouseButton === LEFT && mode !== MODES.HALT) {
        switch (mode) {
            case MODES.DRAW:
                break;
            
            case MODES.WIRING:
                mousePressedWiring();
                break;
        }
    }
}

function mouseReleased() {
    if(isMouseInCanvas() && mouseButton === LEFT && mode !== MODES.HALT) {
        switch (mode) {
            case MODES.DRAW:
                break;
            
            case MODES.WIRING:
                mouseReleasedWiring();
                break;
        }
    }
}