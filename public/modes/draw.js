const doDraw = () => {
    let selectedBlock = menu.getSelectedBlock();
    // if(selectedBlock !== null) drawPreBlock(selectedBlock);
}

const mouseClickedDraw = () => {
    let selectedBlock = menu.getSelectedBlock();
    if(selectedBlock !== null) {
        if(selectedBlock.type === TYPES.RECT) {
            let newObject = JSON.parse(JSON.stringify(selectedBlock));

            newObject.pos = getTopLeftPointOfBlock(newObject.size.width, newObject.size.height);

            addBlockToState(newObject);
        } else if(selectedBlock.type === TYPES.SWITCH) {
            let newObject = JSON.parse(JSON.stringify(switch_type));

            newObject.pos = getTopLeftPointOfBlock(newObject.size.width, newObject.size.height);

            addInput(newObject);
        }

    } else {
        let input = getInput();
        if(input !== null) {
            input.active = !input.active;
        }
    }
}