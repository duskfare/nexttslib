import SweetAlert from 'sweetalert2';
export async function alertConfirm({ title = '', text, footer = null}) {
    return await alert('info', { title, text, footer });
}

/**
 * 
 * @param {*} type 
 * @param {*} param1 
 * @param {{ confirmButtonColor?: string }} options
 */
export async function alert (type, { title = '', text, footer }, options = {}) {
    let result = await SweetAlert.fire({
        icon: type,
        title,
        text,
        footer,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: options.confirmButtonColor,
    });
    let confirm = true;
    switch(result.dismiss) {
        case SweetAlert.DismissReason.backdrop:
        case SweetAlert.DismissReason.esc:
        case SweetAlert.DismissReason.close:
        case SweetAlert.DismissReason.cancel: {
            confirm = false;
        }
    }
    return confirm;
}