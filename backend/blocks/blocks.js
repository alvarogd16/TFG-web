const fs = require('fs');

const BLOCKS_FILE = './backend/blocks/blocks.json'

const checkBlock = (block) => {
    let isCorrectBlock = true
    // TODO
    return isCorrectBlock
}

module.exports = {
    createBlock: (newBlock) => {
        const res = { isError: false, errMsg: '', errContent: {}, content: undefined }

        if(!checkBlock(newBlock)) {
            res.isError = true
            res.errMsg = 'Error block is not correct'
            return res
        }

        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            blocks.push(newBlock)
            fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 4))
        } catch (e) {
            res.content = undefined
            res.isError = true
            res.errMsg = 'Error trying to create a new block'
            res.errContent = err
        }
        return res
    },
    getBlocks: () => {
        const res = { isError: false, errMsg: '', errContent: {}, content: undefined }
        try {
            res.content = JSON.parse(fs.readFileSync(BLOCKS_FILE))
        } catch (e) {
            res.content = undefined
            res.isError = true
            res.errMsg = 'Error trying to get all blocks'
            res.errContent = err
        }
        return res
    },
    getBlock: (blockID) => {
        const res = { isError: false, errMsg: '', errContent: {}, content: undefined }
        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            res.content = blocks.find(b => b.id === blockID)

            if(!res.content) {
                res.isError = true
                res.errMsg = 'Error trying to getBlock. Block doesnt exit'
            }
        } catch (e) {
            res.content = ''
            res.isError = true
            res.errMsg = 'Error trying to get a block'
            res.errContent = err
        }
        return res
    },
    updateBlock: (block) => {
        const res = { isError: false, errMsg: '', errContent: {}, content: undefined }

        if(!checkBlock(block)) {
            res.isError = true
            res.errMsg = 'Error block is not correct'
            return res
        }

        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            const blockIdx = blocks.findIndex(b => b.id === block.id)

            if(blockIdx === -1) {
                res.isError = true
                res.errMsg = 'Error trying to update block. Block doesnt exit'
            }

            blocks[blockIdx] = block
            fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 4))
        } catch (e) {
            res.content = ''
            res.isError = true
            res.errMsg = 'Error trying to update a block'
            res.errContent = err
        }
        return res
    },
    deleteBlock: (blockID) => {
        const res = { isError: false, errMsg: '', errContent: {}, content: undefined }
        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            const blockIdx = blocks.findIndex(b => b.id === blockID)

            if(blockIdx === -1) {
                res.isError = true
                res.errMsg = 'Error trying to delete block. Block doesnt exit'
            }

            blocks.splice(blockIdx, 1)
            fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 4))
        } catch (e) {
            res.content = ''
            res.isError = true
            res.errMsg = 'Error trying to delete a block'
            res.errContent = err
        }
        return res
    }
}