import { blocksController } from '../../controllers/blocksController.js'

class ConfigMenu {
    constructor() {
        this.options = [
            {
                headerName: "Files",
                items: [
                    {
                        name: "New",
                        onClick: this.loadNewMenu
                    },
                    {
                        name: "Load",
                        onClick: this.loadLoadMenu
                    },
                    {
                        name: "Save",
                        onClick: this.loadSaveMenu
                    }
                ]
            },
            {
                headerName: "Blocks",
                items: [
                    {
                        name: "Export",
                        onClick: this.loadBlocksExport
                    },
                    {
                        name: "Import",
                        onClick: this.loadBlocksImport
                    }
                ]
            }
        ]

        this.isShow = false;

        this.menuButton = document.querySelector('.config-menu svg')
        this.menuButton.onclick = () => { this.isShow ? this.hide() : this.show() }
    }

    show() {
        this.menuContainer = document.createElement('div')
        this.menuContainer.className = "config-menu-container"

        this.options.forEach(subsection => {
            if(subsection?.headerName) {
                const headerName = document.createElement('h2')
                headerName.className = "config-menu-header-name"
                headerName.innerText = subsection.headerName
                this.menuContainer.appendChild(headerName)
            }
            subsection?.items.forEach(item => {
                const itemElement = document.createElement('p')
                itemElement.className = "config-menu-item"
                itemElement.innerText = item.name
                itemElement.onclick = item.onClick
                this.menuContainer.appendChild(itemElement)
            })
        })
        document.querySelector('main').appendChild(this.menuContainer)
        this.isShow = true
    }

    hide() {
        this.menuContainer?.remove()
        this.isShow = false
    }

    loadNewMenu() {
        console.log("Load new menu")
    }

    loadLoadMenu() {
        console.log("Load load menu")
    }

    loadSaveMenu() {
        console.log("Load save menu")
    }

    loadBlocksExport() {
        console.log(blocksController.getBlocks())
        socket.emit('blocks:save', blocksController.getBlocks())
    }
}

export const configMenu = new ConfigMenu()