import { blocksData } from "../mocks/mockBlock.js"
import { blockMenuGeneral } from "../modes/drawBlocks/blockMenuGeneral.js";

class BlocksController {
    constructor() {
        this.blocks = []

        socket.emit('blocks:getBlocks')
        socket.once('blocks:getBlocks:res', (res) => {
            if(res.isError) {
                console.error(res.errMsg, res.errContent)
                return
            }

            this.blocks = res.content
        })
    }

    loadBlocksFile(fileName) {

    }

    saveBlocksFile(fileName) {
        
    }

    addBlock(blockObject) {
        // console.log("Adding block...", blockObject);
        blockObject.id = blockObject.moduleName;

        socket.emit('blocks:createBlock', blockObject)
        socket.once('blocks:createBlock:res', (res) => {
            if(res.isError) {
                console.error(res.errMsg, res.errContent)
                return
            }

            this.blocks.push(blockObject)
            blockMenuGeneral.renderBlock(blockObject)
        })
    }

    deleteBlock(blockID) {
        console.log('Deleting block...')
        socket.emit('blocks:deleteBlock', blockID)
        socket.once('blocks:deleteBlock:res', (res) => {
            if(res.isError) {
                console.error(res.errMsg, res.errContent)
                return
            }

            const blockIdx = this.blocks.findIndex(b => b.id === blockID)
            this.blocks.splice(blockIdx, 1)
            blockMenuGeneral.renderBlocks()
        })
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