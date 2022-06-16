// ----------------------------------
// All functions to draw in the canvas
// ----------------------------------

import { BLOCK_TYPES, PORT_TYPES, DIRECTIONS, GRID_SIZE, COLORS, roundToMultiple} from "../constants.js"
import { state } from "../state.js"


export function reDraw() {
    drawGrid();
    state.inputs.forEach(input => drawBlock(input));
    state.blocks_instances.forEach(obj => drawBlock(obj));
    state.wires.nodes.forEach(wire => drawWire(wire));
}

/**
 * Draw all the backgroung grid
 */
export function drawGrid() {
    background(COLORS.bg_canvas);
    stroke(COLORS.points_canvas);

    strokeWeight(4); // In px

    // width and height are contants from canvas
    for(let i = 1; i < width/GRID_SIZE; i++)
        for(let j = 1; j < height/GRID_SIZE; j++)
            point(i*GRID_SIZE, j*GRID_SIZE);
}


/**
 * Draw a block in the canvas. Now only soports rect types.
 * You can see block specification in blocks_definition.txt
 */
function drawBlock(block) {
    if(block?.type === BLOCK_TYPES.rect) {
        // Change to corner because the preview use the center to draw
        rectMode(CORNER);
        fill(COLORS.block_fill);
        stroke(COLORS.block_stroke);
        strokeWeight(4);
        // First draw the body
        rect(block.pos.x, block.pos.y, GRID_SIZE*block.size.width, GRID_SIZE*block.size.height);

        fill(COLORS.labels);
        textSize(15);
        textAlign(CENTER, CENTER);
        noStroke();
        // Calculate the center of the block to the label
        let posX = block.pos.x + GRID_SIZE*block.size.width/2;
        let posY = block.pos.y + GRID_SIZE*block.size.height/2;
        // Next the label in the middle
        text(block.label, posX, posY);

        // Last draw the ports
        drawPorts(block);

    } else if(block?.type === BLOCK_TYPES.switch) {
        let x = block.pos.x;
        let y = block.pos.y;
        rectMode(CORNER);
        fill(COLORS.block_fill);
        stroke(COLORS.block_stroke);
        strokeWeight(2);
        rect(x, y, 3*GRID_SIZE, 2*GRID_SIZE);

        let posX = x+GRID_SIZE/2;
        let posY = y+GRID_SIZE/2;

        let colorBg = 0;
        noStroke();
        if(block.active) {
            stroke("#ccac00");
            strokeWeight(1);
            colorBg = "#ffd700";
        }


        fill(colorBg);
        rect(posX, posY, 2*GRID_SIZE, GRID_SIZE);

        if(block.active) posX += GRID_SIZE;

        stroke(0);
        strokeWeight(2);
        fill(175);
        rect(posX, posY, GRID_SIZE, GRID_SIZE);

    } else if(block?.type === BLOCK_TYPES.in_value) {
        // Change to corner because the preview use the center to draw
        rectMode(CORNER);
        fill(COLORS.block_fill);
        stroke(COLORS.block_stroke);
        strokeWeight(2);
        // First draw the body
        rect(block.pos.x, block.pos.y, GRID_SIZE*block.size.width, GRID_SIZE*block.size.height);
    } else {
        console.error("Error dibujando block. No existe el tipo o es incorrecto. f: drawBlock file: canvas-draw.js");
        return;
    }

    // TO DO A tetrahedron block type
    // let posX = 20*4;
    // let posY = 20*4;
    // quad(posX, posY, posX+20*2, posY+20*1, posX+20*2, posY+20*3, posX, posY+20*4);
}

/**
 * Draw all ports of a block
 * You can see port definition in blocks_definition.txt
 * 
 * index 0 ... N
 *          T
 *  0    ┌-----┐
 *  .    |     |
 *  .  L |     | R
 *  .    |     |
 *  N    └-----┘
 *          B
 */
function drawPorts(block) {
    strokeWeight(7);
    block.ports.forEach(port => {
        port.type === PORT_TYPES.in ? stroke(COLORS.port_in) : stroke(COLORS.port_out);
        port.focus ? strokeWeight(10) : strokeWeight(8);
        if(port.pos === undefined) {
            let posX = block.pos.x;
            let posY = block.pos.y;
    
            switch(port.direction) {
                case DIRECTIONS.right:
                    posX += GRID_SIZE*block.size.width;
                case DIRECTIONS.left:
                    posY += GRID_SIZE*port.draw_index;
                break;
    
                case DIRECTIONS.bottom:
                    posY += GRID_SIZE*block.size.height;
                case DIRECTIONS.top:
                    posX += GRID_SIZE*port.draw_index;
                break;
            }
            port.pos = {x: posX, y: posY}
        }
        point(port.pos.x, port.pos.y);
    });
}

/**
 * Draw a wire in the canvas
 * You can see wire definition in state_definition.txt
 */
function drawWire(wire) {
    stroke(COLORS.wire_off);
    strokeWeight(4);

    line(wire.p1.x, wire.p1.y, wire.p2.x, wire.p2.y);

    // for(let i = 0; i < wire.corners.length-1; i++)
    //     line(wire.corners[i].x, wire.corners[i].y, wire.corners[i+1].x, wire.corners[i+1].y);
}

/**
 * Draw a preview of an block in the canvas. It's moves with the mouse.
 * Use the center of the mouse. Now only soport rect type.
 */
export const drawPreviewBlock = (block) => {
    if(block?.type === BLOCK_TYPES.rect) {
        rectMode(CENTER);
        fill(COLORS.prev_block_fill);
        stroke(COLORS.block_fill);
        strokeWeight(2);

        let posX = roundToMultiple(mouseX, GRID_SIZE);
        if(block.size.width % 2 !== 0) posX += GRID_SIZE/2; // When the block size is odd the center is in middle of two grid dots
        let posY = roundToMultiple(mouseY, GRID_SIZE);
        if(block.size.height % 2 !== 0) posY += GRID_SIZE/2; // Same with Y

        rect(posX, posY, GRID_SIZE*block.size.width, GRID_SIZE*block.size.height);
    } else {
        console.error("Error dibujando block. No existe el tipo o es incorrecto. f: drawPreviewBlock file: canvas-draw.js");
        return;
    }
}