import { APP_MODES } from "../constants.js"
import { exit as drawExit, enter as drawEnter} from "./drawBlocks/drawBlocks.js"
import { exit as wiringExit, enter as wiringEnter} from "./wiring/wiring.js"

class AppModes {
    constructor(_appMode) {
        this.appMode = _appMode;
    }

    getMode() {
        return this.appMode;
    }

    isMode(mode) {
        return this.mode === mode;
    }

    changeMode(newMode) {
        if(this.appMode !== newMode) {
            this.exitMode();
            this.appMode = newMode;
            this.enterMode();
        }
    }

    exitMode() {
        switch(this.appMode) {
            case APP_MODES.halt:
                break;
            case APP_MODES.draw:
                drawExit();
                break;
            case APP_MODES.wiring:
                wiringExit();
                break;
        }
    }

    enterMode() {
        switch(this.appMode) {
            case APP_MODES.halt:
                break;
            case APP_MODES.draw:
                drawEnter();
                break;
            case APP_MODES.wiring:
                wiringEnter();
                break;
        }
    }
}

export const appMode = new AppModes();