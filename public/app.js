let mode = MODES.HALT;
let wiringMode = WIRING_MODES.HALT;

let portSelected = null;
let wireSelected = null;

const GRID_SIZE = 20;
let canvas;


// TO CHANGE
document.getElementById("action-draw").onclick = () => {
    if(mode !== MODES.DRAW) {
        mode = MODES.DRAW;
        menu.refreshCategory();
        console.log("DRAW mode");
    }
}

document.getElementById("action-wiring").onclick = () => {
    if(mode !== MODES.WIRING) {
        mode = MODES.WIRING;
        menu.hide();
        console.log("WIRING mode");
    }
}

document.getElementById("action-to-verilog").onclick = () => {
    socket.emit("sendState", state);
}

function getPortInMouse() {
    let ret_port = null;
    state.blocks_instances.forEach((block) => {
        block.ports.forEach((port) => {
            if(port.type === PORT.OUT) {
                const MARGIN = 7;
                if(mouseX > port.pos.x-MARGIN && mouseX < port.pos.x+MARGIN && mouseY > port.pos.y-MARGIN && mouseY < port.pos.y+MARGIN)
                    ret_port = port; return;
            }
        });
    })

    return ret_port;
}

function getPortEndWire() {
    let ret_port = null;
    state.blocks_instances.forEach((block) => {
        block.ports.forEach((port) => {
            const MARGIN = 10;
            if(mouseX > port.pos.x-MARGIN && mouseX < port.pos.x+MARGIN && mouseY > port.pos.y-MARGIN && mouseY < port.pos.y+MARGIN)
                ret_port = port; return;
        });
    })

    return ret_port;
}

function getWireInMouse() {
    let posX = roundToMultiple(mouseX, GRID_SIZE);
    let posY = roundToMultiple(mouseY, GRID_SIZE);

    let corn_ret = null;
    state.wires.forEach((wire) => {
        if(wire.corners.find(corn => posX === corn.x && posY === corn.y) !== undefined)
            corn_ret = wire; return;
    })

    return corn_ret;
}

function getInput() {
    let input_ret = null;
    state.inputs.forEach(input => {
        let posX1 = input.pos.x+GRID_SIZE/2;
        let posY1 = input.pos.y+GRID_SIZE/2;

        let posX2 = posX1 + 2*GRID_SIZE;
        let posY2 = posY1 + GRID_SIZE;
        if(mouseX > posX1 && mouseX < posX2 && mouseY > posY1 && mouseY < posY2)
            input_ret = input; return;
    });

    return input_ret;
}


const switch_type = {
    type: TYPES.SWITCH,
    active: false,
    size: {width: 3, height: 2}
};

function setup() {
    canvas = createCanvas(windowWidth - 345, windowHeight - 135);
    canvas.parent("canvas-container");

    frameRate(30);

    mode = MODES.DRAW;

    drawGrid();
}

function isMouseInCanvas() {
    return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function draw() {
    if(isMouseInCanvas()) {
        if(mode === MODES.DRAW) {
            reDraw();
            let selectedBlock = menu.getSelectedBlock();
            // if(selectedBlock !== null) drawPreBlock(selectedBlock);
        }
        else if(mode === MODES.WIRING) {
            reDraw();
            if(wiringMode === WIRING_MODES.HALT) {
                let port = getPortInMouse();
                if(port !== null && port.focus === false) {
                    port.focus = true;
                    reDraw();
                    port.focus = false;
                }
            }
            else if(wiringMode === WIRING_MODES.PRESSED) {
                // Only in x to the left now TODO
                stroke(0);
                strokeWeight(4);

                if(portSelected !== null) {
                    let posX = roundToMultiple(mouseX, GRID_SIZE);
                    line(portSelected.pos.x, portSelected.pos.y, posX, portSelected.pos.y);
                    if(mouseY > portSelected.pos.y+GRID_SIZE/2 || mouseY < portSelected.pos.y-GRID_SIZE-5) {
                        let posY = roundToMultiple(mouseY, GRID_SIZE);
                        line(posX, portSelected.pos.y, posX, posY);
                    }
                }
            }
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
    if(isMouseInCanvas()) {
        if(mode === MODES.DRAW) {
            let selectedBlock = menu.getSelectedBlock();
            if(selectedBlock !== null) {
                if(selectedBlock.type === TYPES.RECT) {
                    let newObject = JSON.parse(JSON.stringify(selectedBlock));
                
                    // First get the mid point (get with mouseX)
                    newObject.pos.x = roundToMultiple(mouseX, GRID_SIZE);
                    if(newObject.size.width % 2 !== 0) newObject.pos.x += GRID_SIZE/2;
                    // Second get the left top corner point
                    newObject.pos.x -= newObject.size.width/2 * GRID_SIZE;
        
                    // Same width the y
                    newObject.pos.y = roundToMultiple(mouseY, GRID_SIZE);
                    if(newObject.size.height % 2 !== 0) newObject.pos.y += GRID_SIZE/2;
                    newObject.pos.y -= newObject.size.height/2 * GRID_SIZE;
        
                    addBlockToState(newObject);
                } else if(selectedBlock.type === TYPES.SWITCH) {
                    let newObject = JSON.parse(JSON.stringify(switch_type));

                    newObject.pos = {x: 0, y: 0};

                    // First get the mid point (get with mouseX)
                    newObject.pos.x = roundToMultiple(mouseX, GRID_SIZE);
                    if(newObject.size.width % 2 !== 0) newObject.pos.x += GRID_SIZE/2;
                    // Second get the left top corner point
                    newObject.pos.x -= newObject.size.width/2 * GRID_SIZE;
        
                    // Same width the y
                    newObject.pos.y = roundToMultiple(mouseY, GRID_SIZE);
                    if(newObject.size.height % 2 !== 0) newObject.pos.y += GRID_SIZE/2;
                    newObject.pos.y -= newObject.size.height/2 * GRID_SIZE;

                    addInput(newObject);
                }

            } else {
                let input = getInput();
                if(input !== null) {
                    input.active = !input.active;
                }
            }
        }
        else if(mode === MODES.WIRING) {
            // let port = getPortClicked();
        }
    }
    reDraw();
}

function mousePressed() {
    if(isMouseInCanvas() && mouseButton === LEFT) {
        if(mode === MODES.WIRING) {
            if(wiringMode === WIRING_MODES.HALT) {
                let port = getPortInMouse();
                if(port !== null) {
                    console.log("To pressed port");
                    portSelected = port;
                    wiringMode = WIRING_MODES.PRESSED;
                    return; // We dont wanna check wire if a port is selected
                } 
                
                let wire = getWireInMouse();
                if(wire !== null) {
                    console.log("To pressed wire");
                    wireSelected = wire;
                    wiringMode = WIRING_MODES.PRESSED;
                }
            }
        }
    }
}

function mouseReleased() {
    if(isMouseInCanvas() && mouseButton === LEFT) {
        if(mode === MODES.WIRING) {
            if(wiringMode === WIRING_MODES.PRESSED) {
                console.log("To released");
                wiringMode = WIRING_MODES.RELEASED;

                if(portSelected !== null) {
                    addWireToState(portSelected, getPortEndWire());
                    portSelected = null;
                }
                else if(wireSelected !== null) {
                    addCornersToWire(wireSelected);
                    wireSelected = null;
                }
                

                reDraw();
                
                wiringMode = WIRING_MODES.HALT;
            }
        }
    }
}