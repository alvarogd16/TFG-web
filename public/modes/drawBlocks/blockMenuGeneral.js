import { newBlockMenu } from "./newBlockMenu.js";
import { getBlocks } from "../../api/api.js";

import { blocksController } from "../../controllers/blocksController.js"

class BlockMenuGeneral {
    constructor(blocksController) {
        this.blocksController = blocksController;
        this.blockSelected = '';
    }

    renderMenu() {
        this.blocksMenu = document.createElement('div');
        this.blocksMenu.id = "blocks-menu";
        let blocksHeader = document.createElement('div');
        blocksHeader.id = "blocks-menu-header"
        let blocksBody = document.createElement('div');
        blocksBody.id = "blocks-body";
    
        this.blocksMenu.appendChild(blocksHeader);
        this.blocksMenu.appendChild(blocksBody);
        document.body.appendChild(this.blocksMenu);
    }

    renderBlock(block) {
        let that = this;
        let blockElem = document.createElement('button');
        blockElem.id = block.moduleName;
        blockElem.className = "block-item";
        blockElem.innerText = block.label;
        blockElem.onclick = () => { that.selectBlock(block.id)};
        document.getElementById("blocks-body").appendChild(blockElem);
    }

    renderButtons() {
        let that = this;
        this._blocksNew = document.createElement('button');
        this._blocksNew.id = "blocks-new";
        this._blocksNew.innerText = "NEW"
        this._blocksNew.onclick = () => that.loadNewBlockMenu(that);
        this.blocksMenu.appendChild(this._blocksNew);
    }

    loadNewBlockMenu(that) {
        that._blocksNew.disabled = true;
        newBlockMenu.show();
    }

    loadOptionsBlockMenu(blockID) {

    }

    getSelectedBlock() {
        return this.blocksController.getBlock(this.blockSelected);
    }

    setSelected(blockID, selected) {
        if(selected) {
            document.querySelector(`#${blockID}`).className += " block-selected";
            this._blocksNew.disabled = true
        } else {
            document.querySelector(`#${blockID}`).className = "block-item";
            this._blocksNew.disabled = false
        }
    }

    selectBlock(blockID) {
        if(blockID === this.blockSelected) {
            this.unselectBlock(this.blockSelected);
        } else {
            this.unselectBlock(this.blockSelected);
            this.blockSelected = blockID;
            this.setSelected(this.blockSelected, true);
        }
    }

    unselectBlock() {
        if(this.blockSelected) {
            this.setSelected(this.blockSelected, false);
            this.blockSelected = '';
        }
    }

    hide() {
        this.blocksMenu.remove();
    }

    show() {
        this.renderMenu();
        this.blocksController.getBlocks().forEach(block => {
            this.renderBlock(block);
        });
        this.renderButtons();
    }
}

const blockMenuGeneral = new BlockMenuGeneral(blocksController);

export { blockMenuGeneral }