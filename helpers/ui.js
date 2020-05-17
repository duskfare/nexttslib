import SweetAlert from 'sweetalert2';
export async function alertConfirm({ title = '', text, footer = null }) {
    return await alert('info', { title, text, footer });
}

/**
 *
 * @param {'warning' | 'error' | 'info' | 'success' | 'question'} type
 * @param {*} param1
 * @param {AlertOptions} options
 */
export async function alert(type, { title = '', text, footer }, options = {}) {
    let showCancelButton = true;
    if ('showCancelButton' in options) {
        showCancelButton = options.showCancelButton;
    }
    let confirmButtonText = 'Confirm';
    if ('confirmButtonText' in options) {
        confirmButtonText = options.confirmButtonText;
    }
    let result = await SweetAlert.fire({
        icon: type,
        title,
        text,
        footer,
        showCancelButton,
        confirmButtonText,
        cancelButtonText: 'Cancel',
        confirmButtonColor: options.confirmButtonColor,
    });
    let confirm = true;
    switch (result.dismiss) {
        case SweetAlert.DismissReason.backdrop:
        case SweetAlert.DismissReason.esc:
        case SweetAlert.DismissReason.close:
        case SweetAlert.DismissReason.cancel: {
            confirm = false;
        }
    }
    return confirm;
}

/**
 * @typedef AlertOptions
 * @property {string} [confirmButtonColor]
 * @property {string} [confirmButtonText]
 * @property {boolean} [showCancelButton]
 */
