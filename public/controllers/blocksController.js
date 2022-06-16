import { blocksData } from "../mocks/mockBlock.js"
import { blockMenuGeneral } from "../modes/drawBlocks/blockMenuGeneral.js";

class BlocksController {
    constructor() {
        this.blocks = blocksData
    }

    loadBlocksFile(fileName) {

    }

    saveBlocksFile(fileName) {
        
    }

    addBlock(blockObject) {
        console.log("Adding block...", blockObject);
        blockObject.id = blockObject.moduleName;
        this.blocks.push(blockObject);
        console.log(this.blocks);
        blockMenuGeneral.renderBlock(blockObject);
    }

    removeBlock(blockID) {

    }

    modifyBlock(blockID, modifyProperties) {

    }

    getBlocks() {
        return this.blocks;
    }

    getBlock(blockID) {
        return this.blocks.find(block => block.id === blockID);
    }
}

export const blocksController = new BlocksController();