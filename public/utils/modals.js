const createConfirmationModal = (msg, options) => {
    const modalContainer = document.createElement('div')
    modalContainer.className = 'modals-type-confirmation'
    const close = document.createElement('p')
    close.innerText = 'x'
    close.className = "modals-close"
    close.onclick = () => {
        document.querySelector('.modals-type-confirmation').remove()
    }
    const innerMsg = document.createElement('h1')
    innerMsg.className = 'modals-confirmation-text'
    innerMsg.innerText = msg

    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'modals-confirmation-options'
    options.forEach(opt => {
        const option = document.createElement('button')
        option.className = opt.className
        option.innerText = opt.text
        option.onclick = opt.onClick
        optionsContainer.appendChild(option)
    })

    modalContainer.appendChild(close)
    modalContainer.appendChild(innerMsg)
    modalContainer.appendChild(optionsContainer)
    document.querySelector('main').appendChild(modalContainer)
}

const createErrorModal = (msg, config) => {
    const modalContainer = document.createElement('div')
    modalContainer.className = 'modals-type-error'
    const close = document.createElement('p')
    close.innerText = 'x'
    close.className = "modals-close"
    close.onclick = () => {
        document.querySelector('.modals-type-error').remove()
    }
    const innerMsg = document.createElement('h1')
    innerMsg.className = 'modals-error-text'
    innerMsg.innerText = msg || 'Oh no! some error just happend'

    modalContainer.appendChild(close)
    modalContainer.appendChild(innerMsg)
    document.querySelector('main').appendChild(modalContainer)
}

const createDefaultModal = (msg, config) => {
    // TODO
}

export const createModal = (type, msg, config={}) => {
    switch(type) {
        case 'error':
            createErrorModal(msg, config)
            break

        case 'confirmation':
            createConfirmationModal(msg, config.options)
            break

        default:
            createDefaultModal(msg, config)
    }
}

export const closeConfirmationModal = () => {
    document.querySelector('.modals-type-confirmation').remove()
}