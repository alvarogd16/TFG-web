// Modulo to give functionality to state

let state = {
    inputs: [],
    outputs: [],
    blocks_instances: [],
    intermediate_signals: [],
    wires: []
};


let objectID = 0;

const addInput = (input) => {
    input.id = objectID + "_" + input.name;
    objectID++;
    state.inputs.push(input);
}

const addBlockToState = (block) => {
    block.id = objectID + "_" + block.name;
    objectID++;
    block.ports.forEach((port) => {
        let wire_name = block.id + "_" + port.name;
        port.id = wire_name;
        if(port.type === PORT.OUT) {
            state.intermediate_signals.push(wire_name);
            port.connect = wire_name;
        }
    });
    state.blocks_instances.push(block);

    console.log(state);
}

const addWireToState = (portFrom, portTo) => {
    let auxWire = {
        from: portFrom.id,
        to: [],
        corners: []
    };

    console.log(portTo);

    if(portTo !== null) auxWire.to.push(portTo.id);

    // For now always the first corner of a wire is a port
    auxWire.corners.push({
        x: portFrom.pos.x,
        y: portFrom.pos.y
    });

    auxWire.corners.push({
        x: roundToMultiple(mouseX, GRID_SIZE),
        y: portFrom.pos.y
    });

    if(mouseY > portFrom.pos.y+GRID_SIZE/2 || mouseY < portFrom.pos.y-GRID_SIZE-5) {
        auxWire.corners.push({
            x: roundToMultiple(mouseX, GRID_SIZE),
            y: roundToMultiple(mouseY, GRID_SIZE)
        });
    }

    state.wires.push(auxWire);
    console.log(state);
}

const addCornersToWire = (wire) => {
    // wire.corners.push({});
    console.log(state);
}

const removeBlockToState = () => {
    
}