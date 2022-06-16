const createErrorModal = (msg, config) => {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modals-type-error';
    const close = document.createElement('p');
    close.innerText = 'x';
    close.className = "modals-close";
    close.onclick = () => {
        document.querySelector('.modals-type-error').remove();
    }
    const innerMsg = document.createElement('h1');
    innerMsg.className = 'modals-error-text'
    innerMsg.innerText = msg || 'Oh no! some error just happend';

    modalContainer.appendChild(close);
    modalContainer.appendChild(innerMsg);
    document.querySelector('main').appendChild(modalContainer);
}

const createDefaultModal = (msg, config) => {
    // TODO
}

export const createModal = (type, msg, config={}) => {
    switch(type) {
        case 'error':
            createErrorModal(msg, config);
        default:
            createDefaultModal(msg, config);
    }
}