// ----------------------------------
// All functions to draw in the canvas
// ----------------------------------


/**
 * Draw all the backgroung grid
 */
function drawGrid() {
    // These are colors (TO DO make colors const)
    background(229);
    stroke(175);

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
    if(block?.type === TYPES.RECT) {
        // Change to corner because the preview use the center to draw
        rectMode(CORNER);
        fill('rgb(224, 113, 147)');
        stroke(100);
        strokeWeight(2);
        // First draw the body
        rect(block.pos.x, block.pos.y, GRID_SIZE*block.size.width, GRID_SIZE*block.size.height);

        fill(255);
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

    } else if(block?.type === TYPES.SWITCH) {
        let x = block.pos.x;
        let y = block.pos.y;
        rectMode(CORNER);
        fill('rgb(224, 113, 147)');
        stroke(100);
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
        port.type === PORT.IN ? stroke(175) : stroke(75);
        port.focus ? strokeWeight(10) : strokeWeight(7);
        if(port.pos === undefined) {
            let posX = block.pos.x;
            let posY = block.pos.y;
    
            switch(port.direction) {
                case DIR.RIGHT:
                    posX += GRID_SIZE*block.size.width;
                case DIR.LEFT:
                    posY += GRID_SIZE*port.draw_index;
                break;
    
                case DIR.BOTTOM:
                    posY += GRID_SIZE*block.size.height;
                case DIR.TOP:
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
    stroke(0);
    strokeWeight(4);

    for(let i = 0; i < wire.corners.length-1; i++)
        line(wire.corners[i].x, wire.corners[i].y, wire.corners[i+1].x, wire.corners[i+1].y);
}

/**
 * Draw a preview of an block in the canvas. It's moves with the mouse.
 * Use the center of the mouse. Now only soport rect type.
 */
function drawPreviewBlock(block) {
    if(block?.type === TYPES.RECT) {
        rectMode(CENTER);
        fill('#FFD1DC');
        stroke(175);
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