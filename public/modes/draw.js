const doDraw = () => {
    let selectedBlock = menu.getSelectedBlock();
    // if(selectedBlock !== null) drawPreBlock(selectedBlock);
}

const mouseClickedDraw = () => {
    let selectedBlock = menu.getSelectedBlock();
    if(selectedBlock !== null) {
        if(selectedBlock.type === TYPES.RECT) {
            addBlockToState(selectedBlock);
        } else if(selectedBlock.type === TYPES.SWITCH) {
            addInput(switch_type); // Now use switch_type, TO CHANGE
        }
        return
    } 
    
    let input = getInput();
    if(input !== null) {
        input.active = !input.active;
    }
}