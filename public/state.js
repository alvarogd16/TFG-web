// Modulo to give functionality to state

let state = {
    inputs: [],
    outputs: [],
    blocks_instances: [],
    intermediate_signals: [],
    wires: []
};


let objectID = 0;

// TO CHANGE
const switch_type = {
    type: TYPES.SWITCH,
    active: false,
    size: {width: 3, height: 2}
};

const addInput = (input_) => {
    // Create a new intance of the input block to add it to state
    let input = JSON.parse(JSON.stringify(input_));

    input.pos = getTopLeftPointOfBlock(input.size.width, input.size.height);
    input.id = objectID + "_" + input.name;
    objectID++;
    state.inputs.push(input);
}

const addBlockToState = (block_) => {
    // Create a new intance of the block to add it to state
    let block = JSON.parse(JSON.stringify(block_));

    block.id = objectID + "_" + block.name;
    objectID++;
    block.pos = getTopLeftPointOfBlock(block.size.width, block.size.height);
    block.ports.forEach((port) => {
        let wire_name = block.id + "_" + port.name;
        port.id = wire_name;
        
        // Create a new intermediate signals to connect with others blocks
        if(port.type === PORT.OUT) {
            state.intermediate_signals.push(wire_name);
            port.connect = wire_name;
        }
    });
    state.blocks_instances.push(block);
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