const blocks = require('./blocks/blocks.js')
const vFiles = require('./v_files/v_files.js')

module.exports = function(socket) {
    // ---- Blocks ----
    socket.on('blocks:createBlock', (newBlock) => {
        const res = blocks.createBlock(newBlock)
        socket.emit('blocks:createBlock:res', res)
    })

    socket.on('blocks:getBlocks', () => {
        const res = blocks.getBlocks()
        socket.emit('blocks:getBlocks:res', res)
    })

    socket.on('blocks:getBlock', (blockID) => {
        const res = blocks.getBlock(blockID)
        socket.emit('blocks:getBlock:res', res)
    })

    socket.on('blocks:updateBlock', (block) => {
        const res = blocks.updateBlock(block)
        socket.emit('blocks:updateBlocks:res', res)
    })

    socket.on('blocks:deleteBlock', (block) => {
        const res = blocks.deleteBlock(block)
        socket.emit('blocks:deleteBlocks:res', res)
    })

    // state:load (state)

    // state:save (state)

    // state:to_verilog (state)

    // v_files:get_names (v_files)
    socket.on('v_files:get_names', () => {
        const res = vFiles.getFileNames()
        socket.emit('v_files:get_names:res', res)
    })

    // v_files:get_info (v_file_name)
    socket.on('v_files:get_info', (vFileName) => {
        const res = vFiles.getFileInfo(vFileName)
        socket.emit('v_files:get_info:res', res)
    })
}