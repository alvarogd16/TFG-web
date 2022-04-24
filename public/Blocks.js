let menuData = [
    {
        category_name: "PUERTAS LÓGICAS",
        blocks: [
            {
                id: 0,
                name: "and",
                label: "AND",
                type: TYPES.RECT,
                pos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 3,
                    height: 4
                },
                ports: [
                    {
                        name: "a",
                        type: PORT.IN,
                        connect: "",
                        direction: DIR.LEFT,
                        draw_index: 1,
                        focus: false
                    },
                    {
                        name: "b",
                        type: PORT.IN,
                        connect: "",
                        direction: DIR.LEFT,
                        draw_index: 3,
                        focus: false
                    },
                    {
                        name: "out",
                        type: PORT.OUT,
                        connect: "",
                        direction: DIR.RIGHT,
                        draw_index: 2,
                        focus: false
                    }
                ]
            },
            {
                id: 0,
                name: "or",
                label: "OR",
                type: TYPES.RECT,
                pos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 3,
                    height: 5
                },
                ports: [
                    {
                        name: "a",
                        type: PORT.IN,
                        connect: "",
                        direction: DIR.LEFT,
                        draw_index: 1
                    },
                    {
                        name: "b",
                        type: PORT.IN,
                        connect: "",
                        direction: DIR.LEFT,
                        draw_index: 3
                    },
                    {
                        name: "out",
                        type: PORT.OUT,
                        connect: "",
                        direction: DIR.RIGHT,
                        draw_index: 2
                    }
                ]
            }
        ]
    },
    {
        category_name: "INPUTS",
        blocks: [
            {
                id: 0,
                name: "switch",
                label: "SWITCH",
                type: TYPES.SWITCH,
                pos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 4,
                    height: 2
                },
                ports: [
                    {
                        name: "out",
                        type: PORT.OUT,
                        connect: "out_and_0",
                        direction: DIR.RIGHT,
                        draw_index: 1
                    }
                ]
            }
        ]
    },
    {
        category_name: "MEMORIAS",
        blocks: [
            {
                id: 0,
                name: "register",
                label: "REG",
                type: TYPES.RECT,
                pos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 4,
                    height: 2
                },
                ports: [
                    {
                        name: "in",
                        type: PORT.IN,
                        connect: "",
                        direction: DIR.LEFT,
                        draw_index: 1
                    },
                    {
                        name: "out",
                        type: PORT.OUT,
                        connect: "out_and_0",
                        direction: DIR.RIGHT,
                        draw_index: 1
                    }
                ]
            },
            {
                name: "OR"
            }
        ]
    },
    {
        category_name: "MÁS CIRCUITOS",
        blocks: [
            {
                name: "ADDER"
            },
            {
                name: "ALU"
            },
            {
                name: "MUX"
            },
            {
                name: "DEMUX"
            }
        ]
    }
];


class Block {
    constructor(data) {
        this.selected = false;
        this.data = data;
    }

    setSelected(selected) {
        this.selected = selected;
        let className = "block-item";
        if(selected) className += " block-selected";
        document.getElementById(this.data.name).className = className;
    }
}

class Blocks {
    constructor(data) {
        this.selected = -1;
        this.blocks = data.map((item) => new Block(item));
        this.blocksBody = document.getElementById("blocks-body");
    }

    hide() {
        while(this.blocksBody.firstChild !== null)
            this.blocksBody.firstChild.remove();
    }

    show() {
        let that = this;
        this.blocks.forEach((block) => {
            const elem = document.createElement("button");
            elem.id = block.data.name;
            elem.className = "block-item";
            elem.innerText = block.data.label;
            elem.onclick = () => { that.selectComponent(block.data.name) };
            this.blocksBody.appendChild(elem);
        });
    }

    getSelectedBlock() {
        return this.selected === -1 ? null : this.blocks[this.selected].data;
    }

    selectComponent(name) {
        if(this.selected !== -1) this.blocks[this.selected].setSelected(false);
        this.blocks.forEach((elem, index) => { 
            if(elem.data.name === name) {
                if(this.selected == index) {
                    elem.setSelected(false);
                    this.selected = -1;
                    return;
                }
                elem.setSelected(true);
                this.selected = index;
            }
        });
    }
}

class Menu {
    constructor(data) {
        this.currentCategory = 0;
        this.categories = data.map((item) => {return {name: item.category_name, blocks: new Blocks(item.blocks)}});
        this.blocksHeaderTitle = document.getElementById("blocks-header-title");

        this.blockHeader = document.getElementById("blocks-header");

        document.getElementById("blocks-arrow-left").onclick = () => {menu.prevCategory()};
        document.getElementById("blocks-arrow-right").onclick = () => {menu.nextCategory()};
        this.refreshCategory();
    }

    refreshCategory() {
        this.blocksHeaderTitle.innerText = this.categories[this.currentCategory].name;
        this.categories[this.currentCategory].blocks.show();
    }

    getCurrentCategory() {
        return this.categories[this.currentCategory];
    }

    getSelectedBlock() {
        return this.categories[this.currentCategory].blocks.getSelectedBlock();
    }

    nextCategory() {
        this.categories[this.currentCategory].blocks.hide();
        this.currentCategory = (this.currentCategory+1) % this.categories.length;
        this.refreshCategory();
    }

    prevCategory() {
        this.categories[this.currentCategory].blocks.hide();
        this.currentCategory = this.currentCategory === 0 ? this.categories.length-1 : this.currentCategory-1;
        this.refreshCategory();
    }

    hide() {
        this.categories[this.currentCategory].blocks.hide();
    }

    show() {
        
    }
}

let menu = new Menu(menuData);