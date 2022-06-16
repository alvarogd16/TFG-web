import { APP_MODES } from "./constants.js"
import { appMode } from "./modes/appModes.js"
import { reDraw, drawGrid } from "./canvas/draw.js"
import { isMouseInCanvas } from "./canvas/logic.js"
import * as drawMode from "./modes/drawBlocks/drawBlocks.js"
import * as wiringMode from "./modes/wiring/wiring.js"
import { configMenu } from "./menus/configMenu/configMenu.js"

let canvas;

window.setup = () => {
    canvas = createCanvas(windowWidth, windowHeight - 50);
    canvas.parent("canvas-container");

    frameRate(30);
    textFont('monospace')

    drawGrid();
}

window.draw = () => {
    // This ckeck is to improve performance
    if(isMouseInCanvas() && !appMode.isMode(APP_MODES.halt) && (movedX !== 0 || movedY !== 0)) {
        reDraw();
        switch (appMode.getMode()) {
            case APP_MODES.draw:
                drawMode.update();
                break;
            
            case APP_MODES.wiring:
                wiringMode.update();
                break;
        }
    }
}

window.mouseClicked = () => {
    if(isMouseInCanvas() && !appMode.isMode(APP_MODES.halt)) {
        switch (appMode.getMode()) {
            case APP_MODES.draw:
                drawMode.mouseClicked();
                break;
            
            case APP_MODES.wiring:
                wiringMode.mouseClicked();
                break;
        }
    }
    reDraw();
}

window.mousePressed = () => {
    if(isMouseInCanvas() && !appMode.isMode(APP_MODES.halt)) {
        switch (appMode.getMode()) {
            case APP_MODES.draw:
                drawMode.mousePressed();
                break;
            
            case APP_MODES.wiring:
                if(mouseButton === LEFT)
                    wiringMode.mousePressed();
                break;
        }
    }
}

window.mouseReleased = () => {
    if(isMouseInCanvas() && mouseButton === LEFT && !appMode.isMode(APP_MODES.halt)) {
        switch (appMode.getMode()) {
            case APP_MODES.draw:
                break;
            
            case APP_MODES.wiring:
                wiringMode.mouseReleased();
                break;
        }
    }
}

// Main menu
document.getElementById("action-draw").onclick = () => {
    appMode.changeMode(APP_MODES.draw);
}

document.getElementById("action-wiring").onclick = () => {
    appMode.changeMode(APP_MODES.wiring);
}

document.getElementById("action-to-verilog").onclick = () => {
    console.log("To verilog");
    socket.emit("sendState", state);
}