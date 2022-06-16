// Modulo to give functionality to state

import { BLOCK_TYPES, GRID_SIZE, PORT_TYPES, WIRE_DIRECTION } from "./constants.js";
import { getTopLeftPointOfBlock, isPointInLine } from "./canvas/logic.js"

export const state = {
    inputs: [],
    outputs: [],
    blocks_instances: [],
    intermediate_signals: [],
    wires: {
        adjacency_list: {},
        nodes: []
    }
};


let objectID = 0;
let wiresID = 0;

// TO CHANGE
const switch_type = {
    type: BLOCK_TYPES.switch,
    active: false,
    size: {width: 3, height: 2}
};

export const addInput = (input_) => {
    // Create a new intance of the input block to add it to state
    let input = JSON.parse(JSON.stringify(input_));

    input.pos = getTopLeftPointOfBlock(input.size.width, input.size.height);
    input.id = objectID + "_" + input.name;
    objectID++;
    state.inputs.push(input);

    if(input.type === BLOCK_TYPES.inValue) {
        let sel = createSelect();
        sel.parent("canvas-container");
        sel.size(35, 20);
        sel.position(input.pos.x + 5, input.pos.y + input.size.height * GRID_SIZE /2 - 10);
        for(dtype in DATA_FORMAT)
            sel.option(DATA_FORMAT[dtype]);

        let inp = createInput();
        inp.parent("canvas-container");
        inp.id(input.id);
        inp.size(input.size.width * GRID_SIZE - 55, 20);
        inp.attribute('maxlength', input.bit_width);
        inp.style('border', '0');
        inp.style('padding', '0');
        inp.position(input.pos.x+45, input.pos.y + input.size.height * GRID_SIZE /2 - 10);
        inp.input(printValueInput);
    }
}

function printValueInput() {
    // console.log(this.elt.id);
    // console.log(this.value());

    if(![...this.value()].every(c => c === '0' || c === '1')) {
        // console.log("Numero incorrecto"); 
        return;
    }

    console.log("Numero correcto ", this.value());
    const id = this.elt.id;
    state.inputs.find((inp) => inp.id === id).data = this.value();
}

export const addBlockToState = (block_) => {
    // Create a new intance of the block to add it to state
    let block = JSON.parse(JSON.stringify(block_));

    block.id = objectID + "_" + block.name;
    objectID++;
    block.pos = getTopLeftPointOfBlock(block.size.width, block.size.height);
    block.ports.forEach((port) => {
        let wire_name = block.id + "_" + port.name;
        port.id = wire_name;
        
        // Create a new intermediate signals to connect with others blocks
        if(port.type === PORT_TYPES.out) {
            state.intermediate_signals.push(wire_name);
            port.connect = wire_name;
        }
    });
    state.blocks_instances.push(block);
}


export const addWireToState = (wireP1, wireP2, portInP1 = null, portInP2 = null) => {
    let newWire = {
        id: wiresID,
        direction: wireP1.x === wireP2.x ? WIRE_DIRECTION.horizontal : WIRE_DIRECTION.vertical,
        p1: wireP1,
        p2: wireP2
    }

    let adjacencies = []
    // Check if wireP1 or wireP2 is in other wire
    state.wires.nodes.forEach(wire => {
        let wireLine = {
            x1: wire.p1.x,
            y1: wire.p1.y,
            x2: wire.p2.x,
            y2: wire.p2.y
        }
        if(isPointInLine(wireP1, wireLine) || isPointInLine(wireP2, wireLine)) {
            adjacencies.push(wire.id);
        }
    })

    if(portInP1 !== null) portInP1.wireTo = wiresID;
    if(portInP2 !== null) portInP2.wireTo = wiresID;

    state.wires.nodes.push(newWire);

    // Include my node in the adjacency list
    state.wires.adjacency_list[wiresID] = adjacencies;
    // and update all the other nodes in the adjacency list
    adjacencies.forEach(_wireID => state.wires.adjacency_list[_wireID].push(wiresID));

    console.log(wiresID, adjacencies, state);

    wiresID++;
} 

const removeBlockToState = () => {
    
}