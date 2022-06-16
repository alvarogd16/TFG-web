import { PORT_TYPES, BLOCK_TYPES, GRID_SIZE } from '../../constants.js'
import { createModal } from '../../utils/modals.js'
import { getEditBlockElem, removeEditBlockElem } from './editBlockElem.js'
import { blocksController } from '../../controllers/blocksController.js'

class NewBlockMenu {
    constructor() {
        this.selectedFile = undefined;
        this.blockContainer = undefined;

        socket.on('v_files:get_names:res', (files) => {
            if(files.isError) {
                // this.addFilesError(files.errMsg); // TODO
                console.error(files.errMsg)
                return
            }
            this.showFiles(files.content)
        })

        socket.on('v_files:get_info:res', (data) => {
            if(data.isError) {
                // this.selectFileError(data.errMsg); // TODO
                console.error(data.errMsg)
                return
            }
            this.showFileInfo(data.content)
        })
    }

    createMenuContainer() {
        const container = document.createElement('div')
        container.className = 'new-block-menu'

        const closeElem = document.createElement('p')
        closeElem.className = 'new-block-close'
        closeElem.innerText = 'x'
        closeElem.onclick = _ => this.close()

        container.appendChild(closeElem)
        return container
    }

    getFiles() {
        socket.emit("v_files:get_names");
    }

    showFiles(files) {
        const filesContainer = document.createElement('div')
        filesContainer.className = 'nbm-files-container'

        const title = document.createElement('h1')
        title.innerText = 'Escoge un fichero verilog para crear tu bloque'
        title.className = 'nbm-title'

        filesContainer.appendChild(title)
        files.forEach(fileName => {
            const fileElem = document.createElement('p')
            fileElem.innerText = fileName
            fileElem.className = 'nbm-file-name'
            fileElem.onclick = (elem) => { this.selectFile(elem.originalTarget.innerText) }

            filesContainer.appendChild(fileElem)
        })
        this.blockContainer.appendChild(filesContainer)
    }

    selectFile(fileName) {
        this.selectedFile = fileName
        socket.emit('v_files:get_info', fileName)
    }

    checkPorts(ports, width, height) {
        const portsInfo = ports.map(pInfo => {
            return {
                id: pInfo.id,
                dir: pInfo.childNodes[1].value,
                drawIndex: pInfo.childNodes[2].value
            }
        })

        if(portsInfo.length > (width-1 + height-1)*2) {
            createModal('error', 'Error Not enough ports space in block. Extend block width or height')
            console.error('Error newBlockMenu.js Not enough ports space in block. Extend block width or height')
            return
        }

        // Check if two ports has the same direction and draw index.
        for(let i = 0; i < portsInfo.length-1; i++) {
            for(let j = i+1; j < portsInfo.length; j++) {
                if(portsInfo[i].dir === portsInfo[j].dir
                    && portsInfo[i].drawIndex === portsInfo[j].drawIndex) {
                        createModal('error', `Error Ports ${portsInfo[i].id} and ${portsInfo[j].id} in the same port slot. Change one of them.`)
                        console.error(`Error newBlockMenu.js Ports ${portsInfo[i].id} and ${portsInfo[j].id} in the same port slot. Change one of them.`)
                        return
                    }
            }
        }
        return portsInfo
    }

    createBlock() {
        console.log('Creating block...')
        const label = document.querySelector('#label').value
        const width = parseInt(document.querySelector('#size-width').value)
        const height = parseInt(document.querySelector('#size-height').value)

        const ports =  Array.from(document.querySelectorAll('.nbm-port-container'))
        const portsInfo = this.checkPorts(ports, width, height)
        if(portsInfo) {
            this.newBlock.label = label
            this.newBlock.size = {
                width: width,
                height: height
            }
            this.newBlock.type = BLOCK_TYPES.rect

            this.newBlock.ports = []

            this.newBlock.inputs.forEach(input => {
                input.type = PORT_TYPES.in
                const pInfo = portsInfo.find(p => p.id === input.name)
                if(!pInfo) {
                    console.error('Error newBlockMenu.js Not found port')
                    return
                }
                input.direction = pInfo.dir.toLowerCase()
                input.draw_index = pInfo.drawIndex
                this.newBlock.ports.push(input)
            })
            delete this.newBlock.inputs

            this.newBlock.outputs.forEach(output => {
                output.type = PORT_TYPES.out
                const pInfo = portsInfo.find(p => p.id === output.name)
                if(!pInfo) {
                    console.error('Error newBlockMenu.js Not found port')
                    return
                }
                output.direction = pInfo.dir.toLowerCase()
                output.draw_index = pInfo.drawIndex
                this.newBlock.ports.push(output)
            })
            delete this.newBlock.outputs

            blocksController.addBlock(this.newBlock)
            this.close()
        }
    }

    isHashAlreadyUsed(hash) {
        return blocksController.getBlocks().some((block) => { return block.hash === hash })
    }

    showFileInfo(fileInfo) {
        if(this.isHashAlreadyUsed(fileInfo.hash)) {
            createModal('error', `Error File ${fileInfo.moduleName} has already a block asociated.`)
            return
        }

        this.blockContainer.removeChild(document.querySelector('.nbm-files-container'))
        this.newBlock = {...fileInfo}

        const isCreate = true
        const that = this
        const action = () => { that.createBlock() }
        this.blockContainer.appendChild(getEditBlockElem(this.newBlock, isCreate, action))
    }

    show() {
        const blocksItems = document.querySelectorAll('.block-item');
        for(let blockItem of blocksItems)
            blockItem.disabled = true

        const container = this.createMenuContainer()
        document.body.appendChild(container)

        this.blockContainer = document.querySelector('.new-block-menu')

        this.getFiles()
    }

    close() {
        removeEditBlockElem()
        this.blockContainer.remove();
        document.querySelector('#blocks-new').disabled = false;

        const blocksItems = document.querySelectorAll('.block-item');
        for(let blockItem of blocksItems)
            blockItem.disabled = false
    }
}

const newBlockMenu = new NewBlockMenu()
export { newBlockMenu }
