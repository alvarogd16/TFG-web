const fs = require('fs');
const getDataFromVFile = require('../parserVerilog/getDataFromVFile.js')
const crypto = require("crypto");

const VERILOG_BLOCKS_FILES_PATH = './verilog/blocks_files';

module.exports = {
    getFileNames: () => {
        const res = {isError: false, errMsg: '', errContent: {}, content: ''};
        try {
            res.content = fs.readdirSync(VERILOG_BLOCKS_FILES_PATH);
        } catch (err) {
            res.content = '';
            res.isError = true;
            res.errMsg = 'Error trying to read verilog files';
            res.errContent = err;
        }
        return res;
    },
    getFileInfo: (fileName) => {
        const res = {isError: false, errMsg: '', errContent: {}, content: ''};
        const filePath = VERILOG_BLOCKS_FILES_PATH + '/' + fileName;
        try {
            res.content = getDataFromVFile(filePath);
            // Calculate the hash
            const fileBuffer = fs.readFileSync(filePath);
            res.content.hash = crypto.createHash('sha1').update(fileBuffer).digest("base64");
        } catch (err) {
            res.content = '';
            res.isError = true;
            res.errMsg = `Error trying to get info from ${fileName} verilog file`;
            res.errContent = err;
        }
        return res;
    }
}