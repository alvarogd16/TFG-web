const isMouseInCanvas = () => {
    return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

const getXYFromGrid = () => {
    return {
        x: roundToMultiple(mouseX, GRID_SIZE),
        y: roundToMultiple(mouseY, GRID_SIZE)
    }
}

const getTopLeftPointOfBlock = (width, height) => {
    // First calculate the middle point from mouseX and mouseY
    let pos = getXYFromGrid();

    // If the block have sides with odds cells, the middle point is between two cells.
    if(width % 2 !== 0) pos.x += GRID_SIZE/2;
    if(height % 2 !== 0) pos.y += GRID_SIZE/2;

    // Second calculate the top left point
    pos.x -= width/2 * GRID_SIZE;
    pos.y -= height/2 * GRID_SIZE;

    return pos;
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