import Button from './Button';
/**
 * @param {ButtonProps} props 
 */
export function SubmitButton (props) {
    return <Button {...props} onClick={withPreventDefault(props.onClick)} />
}

function withPreventDefault(onClick) {
    return (...params) => {
        let e = params[0];
        e.preventDefault();
        if(typeof onClick === 'function') {
            onClick(...params);
        }
    }
}
export default SubmitButton;
/**
 * @typedef {import('./Button').ButtonProps} ButtonProps
 */