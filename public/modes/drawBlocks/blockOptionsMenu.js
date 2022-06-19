import { createModal, closeConfirmationModal } from '../../utils/modals.js'
import { blocksController } from '../../controllers/blocksController.js'

const deleteBlock = (blockID) => {
    const options = [
        {
            text: 'Si',
            className: '', // TODO Add className
            onClick: () => { 
                blocksController.deleteBlock(blockID)
                closeConfirmationModal()
            }
        },
        {
            text: 'No',
            className: '',
            onClick: () => { closeConfirmationModal() }
        }
    ]

    createModal('confirmation', '¿Seguro que quieres borrar el bloque?', { options: options })
}

class BlockOptionsMenu {
    constructor() {

    }

    editBlock(blockID) {
        console.log('Edit block...', blockID)
    }

    deleteBlock(blockID) {
        console.log('Deleting block...', blockID)
    }

    createMenu(blockID) {
        const that = this
        const menuOptions = [
            {
                name: 'Edit block',
                onSelect: this.editBlock
            },
            {
                name: 'Delete block',
                onSelect: deleteBlock
            }
        ]

        const blockContainer = document.querySelector(`#${blockID}`)
        const rect = blockContainer.getBoundingClientRect()

        const menuContainer = document.createElement('div')
        menuContainer.className = 'block-opt-menu-container'
        menuContainer.style.top = rect.top + rect.height + 5 + 'px'
        menuContainer.style.left = rect.left + rect.width - 20 + 'px'

        const closeElem = document.createElement('p')
        closeElem.className = 'new-block-close'
        closeElem.innerText = 'x'
        closeElem.onclick = _ => this.close()

        menuOptions.forEach(opt => {
            const optionP = document.createElement('p')
            optionP.innerText = opt.name
            optionP.className = 'block-opt-menu-options'
            optionP.onclick = _ => {
                that.close() 
                opt.onSelect(blockID) 
            }
            menuContainer.appendChild(optionP)
        })

        menuContainer.appendChild(closeElem)
        document.body.appendChild(menuContainer)
    }

    show(blockID) {
        this.createMenu(blockID)
    }

    close() {
        document.querySelector('.block-opt-menu-container').remove()
    }
}

const blockOptionMenu = new BlockOptionsMenu()
export default blockOptionMenu