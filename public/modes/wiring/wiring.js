import { WIRING_MODES } from "../../constants.js"
import {    getPortInMouse, 
            getXYFromGrid, 
            isWireInBlock, 
            isMouseInWire,
            isMouseInPort,
            isMouseInBlock } from "../../canvas/logic.js"
import { reDraw } from "../../canvas/draw.js"
import { addWireToState } from "../../state.js"

let wiringMode = WIRING_MODES.halt;

let wireP1 = {};
let wireP2 = {};
let portSelected = null;

export const update = () => {
    if(wiringMode === WIRING_MODES.halt) {
        let port = getPortInMouse();
        if(port !== null && port.focus === false) {
            port.focus = true;
            reDraw();
            port.focus = false;
        }
    }
    else if(wiringMode === WIRING_MODES.pressed) {
        stroke(0);
        strokeWeight(4);

        // We only want to draw a vertical o an horizontal wire
        wireP2 = getXYFromGrid();
        if(Math.abs(wireP2.x - wireP1.x) > Math.abs(wireP2.y - wireP1.y))
            wireP2.y = wireP1.y
        else
            wireP2.x = wireP1.x
            
        if(!isWireInBlock(wireP1, wireP2)) 
            line(wireP1.x, wireP1.y, wireP2.x, wireP2.y);

        

        // if(portSelected !== null) {
        //     let posX = roundToMultiple(mouseX, GRID_SIZE);
        //     line(portSelected.pos.x, portSelected.pos.y, posX, portSelected.pos.y);
        //     if(mouseY > portSelected.pos.y+GRID_SIZE/2 || mouseY < portSelected.pos.y-GRID_SIZE-5) {
        //         let posY = roundToMultiple(mouseY, GRID_SIZE);
        //         line(posX, portSelected.pos.y, posX, posY);
        //     }
        // }
    }
}

export const mouseClicked = () => {

}

export const mousePressed = () => {
    if(wiringMode === WIRING_MODES.halt) {
        if(!isMouseInBlock()) {
            if(isMouseInWire())
                pressedWire()
            else
                pressedCanvas();
        } else if(isMouseInPort()) {
            pressedPort()
        }

        // let port = getPortInMouse();
        // if(port !== null) {
        //     console.log("To pressed port");
        //     portSelected = port;
        //     wiringMode = WIRING_MODES.PRESSED;
        //     return; // We dont wanna check wire if a port is selected
        // } 
        
        // let wire = getWireInMouse();
        // if(wire !== null) {
        //     console.log("To pressed wire");
        //     wireSelected = wire;
        //     wiringMode = WIRING_MODES.PRESSED;
        // }
    }
}

export const mouseReleased = () => {
    if(wiringMode === WIRING_MODES.pressed) {
        console.log("To released");
        //wiringMode = WIRING_MODES.RELEASED;

        if(wireP2.x !== undefined && (wireP1.x !== wireP2.x || wireP1.y !== wireP2.y))
            addWireToState(wireP1, wireP2, portSelected, getPortInMouse());

        portSelected = null;
        wiringMode = WIRING_MODES.halt;
    }
}

export const exit = () => {

}

export const enter = () => {
    console.log("To wiring")
}


const pressedCanvas = () => {
    wireP1 = getXYFromGrid();
    wiringMode = WIRING_MODES.pressed;
}

const pressedWire = () => {
    wireP1 = getXYFromGrid();
    wiringMode = WIRING_MODES.pressed;
}

const pressedPort = () => {
    portSelected = getPortInMouse();
    wireP1 = getXYFromGrid();
    wiringMode = WIRING_MODES.pressed;
}