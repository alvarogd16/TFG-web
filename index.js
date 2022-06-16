const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

const { Server } = require("socket.io");
const io = new Server(server);

const router = require('./backend/router.js');

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`Someone connected ${socket.id}`);
    router(socket);
    
//   socket.on("getBlocksFiles", () => {
//     let blocksFiles = fs.readdirSync("./verilog/blocks");
//     socket.emit("blocksFiles", blocksFiles);
//   });

//   socket.on("selectFile", (fileName) => {
//     let fileData = getDataFromVFile('./verilog/blocks/' + fileName);
//     socket.emit("fileData", fileData);
//   })

//   socket.on("sendState", (state) => {
//     console.log("Getted state");
//     backVerilog.stateToVerilog(state);
//   });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})