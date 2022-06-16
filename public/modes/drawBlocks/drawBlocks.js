import { blockMenuGeneral } from "./blockMenuGeneral.js";
import { reDraw, drawPreviewBlock } from "../../canvas/draw.js"
import { addBlockToState, addInput } from "../../state.js"
import { BLOCK_TYPES } from "../../constants.js";
// import {  } from ""

export const update = () => {
    let selectedBlock = blockMenuGeneral.getSelectedBlock();
    if(selectedBlock !== undefined) drawPreviewBlock(selectedBlock);
}

export const mouseClicked = () => {
    if(!isMouseInDrawMenu()) {
        let selectedBlock = blockMenuGeneral.getSelectedBlock();
        if(selectedBlock !== undefined) {
            switch (selectedBlock.type) {
                case BLOCK_TYPES.rect:
                    addBlockToState(selectedBlock);
                    break;
                
                case BLOCK_TYPES.switch:
                case BLOCK_TYPES.inValue:
                    addInput(selectedBlock);
                    break;
            }
            return
        } 
    }
}

export const mousePressed = () => {
    if(mouseButton === RIGHT) { 
        blockMenuGeneral.unselectBlock()
        reDraw()
    }
}

export const exit = () => {
    blockMenuGeneral.hide();
}

export const enter = () => {
    console.log("To draw")
    blockMenuGeneral.show();
}

const isMouseInDrawMenu = () => {
    let menu = document.getElementById("blocks-menu");

    let x1 = menu.offsetLeft;
    let x2 = menu.offsetLeft + menu.clientWidth;
    let y1 = menu.offsetTop - 50;
    let y2 = menu.offsetTop + menu.clientHeight - 50;

    return mouseX >= x1 && mouseX < x2 && mouseY >= y1 && mouseY < y2;
}