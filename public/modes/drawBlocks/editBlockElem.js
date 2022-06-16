import { GRID_SIZE } from '../../constants.js'

// Block title, verilog module name
const createTitle = (blockInfo) => {
    const title = document.createElement('h1')
    title.innerText = blockInfo.moduleName
    return title
}

// Ej.
// Label: [LABEL]
const createLabelInput = (blockInfo) => {
    const labelTitle = document.createElement('label')
    labelTitle.innerText = 'Label:'

    const labelInput = document.createElement('input')
    labelInput.type = 'text'
    labelInput.id = 'label'
    labelInput.name = 'label'
    // By default label is moduleName in uppercase
    labelInput.value = blockInfo.moduleName.toUpperCase()
    // Its change block dinamically label. Its a cool effect
    labelInput.oninput = (event) => {
        const blockText = document.querySelector('.nbm-size-block-span')
        blockText.innerText = event.target.value
    }

    labelTitle.appendChild(labelInput)
    return labelTitle
}

// Two inputs an a interactive block
// Ej.
// Width: [2] Height: [4]
// ┌─────┐
// │     │
// │LABEL│
// │     │
// └─────┘
const createSizeDiv = (blockInfo) => {
    const size = document.createElement('div')
    size.className = 'nbm-size'
    const widthLabel = document.createElement('label')
    widthLabel.innerText = 'Width:'
    const sizeWidth = document.createElement('input')
    sizeWidth.id = 'size-width'
    sizeWidth.type = 'number'
    sizeWidth.min = '2'
    sizeWidth.max = '10'
    sizeWidth.value = '4'
    sizeWidth.className = 'nbm-size-width'
    sizeWidth.onchange = (event) => {
        const newWidth = event.target.value
        const blockElem = document.querySelector('.nbm-size-block')
        blockElem.style.width = `${GRID_SIZE * newWidth}px`

        const ports = document.querySelectorAll('.nbm-port-container')
        for(let port of ports) {
            const portDir = port.childNodes[1].value
            if(portDir === 'TOP' || portDir === 'BOTTOM') {
                port.childNodes[2].max = newWidth-1
                if(port.childNodes[2].value > newWidth-1)
                    port.childNodes[2].value = newWidth-1
            }
            moveBlockSizePort(port.id, portDir, port.childNodes[2].value)
        }
    }
    const heightLabel = document.createElement('label')
    heightLabel.innerText = 'Height:'
    heightLabel.className = 'nbm-size-label'
    const sizeHeight = document.createElement('input')
    sizeHeight.id = 'size-height'
    sizeHeight.type = 'number'
    sizeHeight.min = '2'
    sizeHeight.max = '10'
    sizeHeight.value = '4'
    sizeHeight.className = 'nbm-size-height'
    sizeHeight.onchange = (event) => {
        const newHeight = event.target.value
        const blockElem = document.querySelector('.nbm-size-block')
        blockElem.style.height = `${GRID_SIZE * newHeight}px`

        const ports = document.querySelectorAll('.nbm-port-container')
        for(let port of ports) {
            const portDir = port.childNodes[1].value
            if(portDir === 'LEFT' || portDir === 'RIGHT') {
                port.childNodes[2].max = newHeight-1
                if(port.childNodes[2].value > newHeight-1)
                    port.childNodes[2].value = newHeight-1
            }
            moveBlockSizePort(port.id, portDir, port.childNodes[2].value)
        }
    }
    size.appendChild(widthLabel)
    size.appendChild(sizeWidth)
    size.appendChild(heightLabel)
    size.appendChild(sizeHeight)

    const block = document.createElement('div')
    block.className = 'nbm-size-block'
    const span = document.createElement('span')
    span.className ='nbm-size-block-span'
    span.innerText = blockInfo.moduleName.toUpperCase()
    block.appendChild(span)

    blockInfo.inputs.forEach(input => {
        const pDiv = document.createElement('div')
        pDiv.className = 'nbm-block-size-port'
        pDiv.id = 'block-size-port-' + input.name
        block.appendChild(pDiv)
    })

    blockInfo.outputs.forEach(output => {
        const pDiv = document.createElement('div')
        pDiv.className = 'nbm-block-size-port'
        pDiv.id = 'block-size-port-' + output.name
        block.appendChild(pDiv)
    })

    size.appendChild(block)
    return size
}

const createParametersDiv = (blockInfo) => {
    const paramsContainer = document.createElement('div')
    const paramsTitle = document.createElement('h2')
    paramsTitle.innerText = 'Parameters'
    paramsContainer.appendChild(paramsTitle)
    blockInfo.parameters.forEach(param => {
        const paramElem = document.createElement('p')
        paramElem.innerText = param.name + ' = ' + param.value.value
        paramsContainer.appendChild(paramElem)
    })

    return paramsContainer
}

const moveBlockSizePort = (id, dir, drawIdx) => {
    const pElem = document.querySelector('#block-size-port-'+id)
    if(!pElem) return

    const width = document.querySelector('#size-width').value || 4
    const height = document.querySelector('#size-height').value || 4

    let xPos = -7, yPos = -7 // Its like 0, 0 but we have the borders
    const BORDER_SIZE = 4
    switch(dir) {
        case 'BOTTOM':
            yPos += height * GRID_SIZE + BORDER_SIZE
        case 'TOP':
            xPos += drawIdx * GRID_SIZE
            break
        case 'RIGHT':
            xPos += width * GRID_SIZE + BORDER_SIZE
        case 'LEFT':
            yPos += drawIdx * GRID_SIZE
        break
    }

    pElem.style.left = xPos + 'px'
    pElem.style.top = yPos + 'px'
}

const createDirectionPortSelect = (id) => {
    const optionList = ['TOP', 'LEFT', 'RIGHT', 'BOTTOM']
    const select = document.createElement('select')
    select.id = 'select-' + id
    select.className = 'nbm-port-select-dir'

    optionList.forEach(op => {
        const option = document.createElement('option')
        option.value = op
        option.innerText = op
        select.appendChild(option)
    })

    select.onchange = ({target}) => {
        const portDrawIdx = document.querySelector('#input-'+id)
        const portId = id.split('-')[1]
        moveBlockSizePort(portId, target.value, portDrawIdx.value)

        let max
        if(target.value === 'TOP' || target.value === 'BOTTOM')
            max = document.querySelector('#size-width').value
        else
            max = document.querySelector('#size-height').value        

        if(max)  {
            portDrawIdx.max = max-1
            if(portDrawIdx.value > max-1)
                portDrawIdx.value = max-1
        }
        
    }

    return select
}

const createIndexPortInput = (id, max) => {
    const input = document.createElement('input')
    input.id = 'input-' + id
    input.className = 'nbm-port-input-index'
    input.type = 'number'
    input.min = '1'
    input.max = max || '3'
    input.value = '1'

    const portId = id.split('-')[1] 
    input.onchange = ({ target }) =>  {
        const portSelectDir = document.querySelector('#select-'+id).value
        moveBlockSizePort(portId, portSelectDir, target.value)
    }

    return input
}

const createPortDiv = (port, moduleName) => {
    const portContainer = document.createElement('div')
    portContainer.className = 'nbm-port-container'
    portContainer.id = port.name
    portContainer.onmouseover = () => {
        const portPoint = document.querySelector('#block-size-port-'+port.name)
        portPoint.style['background-color'] = 'red'
    }
    portContainer.onmouseout = () => {
        const portPoint = document.querySelector('#block-size-port-'+port.name)
        portPoint.style['background-color'] = ''
    }
    const portName = document.createElement('p')
    portName.innerText = port.type + ' - ' + port.name
    portName.className = 'nbm-port-name'
    const selectPort = createDirectionPortSelect(moduleName+'-'+port.name)
    const indexPort = createIndexPortInput(moduleName+'-'+port.name)
    portContainer.appendChild(portName)
    portContainer.appendChild(selectPort)
    portContainer.appendChild(indexPort)
    return portContainer
}

const createPortsDiv = (blockInfo) => {
    const portsContainer = document.createElement('div')
    const portsTitle = document.createElement('h2')
    portsTitle.innerText = 'Ports'
    portsContainer.appendChild(portsTitle)

    const inputTitle = document.createElement('h3')
    inputTitle.innerText = 'Inputs'
    portsContainer.appendChild(inputTitle)
    blockInfo.inputs.forEach(input => {
        portsContainer.appendChild(createPortDiv(input, blockInfo.moduleName))
    })

    const outputTitle = document.createElement('h3')
    outputTitle.innerText = 'Outputs'
    portsContainer.appendChild(outputTitle)
    blockInfo.outputs.forEach(output => {
        portsContainer.appendChild(createPortDiv(output, blockInfo.moduleName))
    })

    return portsContainer
}

const createConfirmButton = (isCreate, action) => {
    const submitButton = document.createElement('button')
    submitButton.innerText = isCreate ? 'CREATE' : 'EDIT'
    submitButton.className = 'nbm-create-button'
    submitButton.onclick = action
    return submitButton
}

export const removeEditBlockElem = () => {
    const editBlockDiv = document.querySelector('.nbm-container')
    if(editBlockDiv) 
        editBlockDiv.remove()
    }
    

export const getEditBlockElem = (blockInfo, isCreate, action) => {
    const editBlockDiv = document.createElement('div')
    editBlockDiv.className = 'nbm-container'
    editBlockDiv.appendChild(createTitle(blockInfo))
    editBlockDiv.appendChild(createLabelInput(blockInfo))
    editBlockDiv.appendChild(createSizeDiv(blockInfo))
    editBlockDiv.appendChild(createParametersDiv(blockInfo))
    editBlockDiv.appendChild(createPortsDiv(blockInfo))
    editBlockDiv.appendChild(createConfirmButton(isCreate, action))

    return editBlockDiv
}