import { GRID_SIZE, roundToMultiple } from "../constants.js"
import { state } from "../state.js"

const isMouseIn = (x1, x2, y1, y2) => {
    return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
}

const isRoundMouseIn = (x1, x2, y1, y2) => {
    let mouse = getXYFromGrid();
    return mouse.x >= x1 && mouse.x <= x2 && mouse.y >= y1 && mouse.y <= y2;
}

export const isPointInLine = (point, line) => {
    return point.x >= line.x1 && point.x <= line.x2 && point.y >= line.y1 && point.y <= line.y2;
}

export const isMouseInCanvas = () => {
    return isMouseIn(0, width, 0, height);
}

export const isMouseInBlock = () => {
    return state.blocks_instances.some(block => {
        let x2 = block.pos.x + block.size.width * GRID_SIZE;
        let y2 = block.pos.y + block.size.height * GRID_SIZE;
        return isRoundMouseIn(block.pos.x, x2, block.pos.y, y2)
    });
}

export const isMouseInPort = () => {
    const MARGIN = 7;
    return state.blocks_instances.some((block) => {
        return block.ports.some((port) => {
            return port.type === PORT.OUT && isMouseIn(port.pos.x-MARGIN, port.pos.x+MARGIN, port.pos.y-MARGIN, port.pos.y+MARGIN)
        });
    })
}

export const isMouseInWire = () => {
    return state.wires.nodes.some(wire => {
        return isRoundMouseIn(wire.p1.x, wire.p2.x, wire.p1.y, wire.p2.y)
    })
}

export const isWireInBlock = (wireP1, wireP2) => {
    // TODO
    return false
}

export const getXYFromGrid = () => {
    return {
        x: roundToMultiple(mouseX, GRID_SIZE),
        y: roundToMultiple(mouseY, GRID_SIZE)
    }
}

export const getTopLeftPointOfBlock = (width, height) => {
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



export const getPortInMouse = () => {
    const MARGIN = 7;
    let ret_port = null;
    state.blocks_instances.forEach((block) => {
        block.ports.forEach((port) => {
            if(mouseX > port.pos.x-MARGIN && mouseX < port.pos.x+MARGIN && mouseY > port.pos.y-MARGIN && mouseY < port.pos.y+MARGIN)
                ret_port = port; return;
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