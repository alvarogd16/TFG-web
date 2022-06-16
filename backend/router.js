const vFiles = require("./v_files/v_files.js");

module.exports = function(socket) {
    // blocks:load (blocks)

    // blocks:save (blocks)

    // state:load (state)

    // state:save (state)

    // state:to_verilog (state)

    // v_files:get_names (v_files)
    socket.on('v_files:get_names', () => {
        const res = vFiles.getFileNames();
        socket.emit('v_files:get_names:res', res);
    });

    // v_files:get_info (v_file_name)
    socket.on('v_files:get_info', (vFileName) => {
        const res = vFiles.getFileInfo(vFileName);
        socket.emit('v_files:get_info:res', res);
    });
}