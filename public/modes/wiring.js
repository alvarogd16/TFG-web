let wiringMode = WIRING_MODES.HALT;

const doWiring = () => {
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

const mouseClickedWiring = () => {
    // let port = getPortClicked();
}

const mousePressedWiring = () => {
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

const mouseReleasedWiring = () => {
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