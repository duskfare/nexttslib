import * as React from 'react';
import MUIButton from '@material-ui/core/Button';
/**
 * @param {ButtonProps} props 
 */
export function Button(props) {
    let defaults = getDefaultProps();
    return (
        <MUIButton
            variant={props.variant || 'contained'}
            color={props.color || defaults.color}
            onClick={props.onClick || defaults.onClick}
            type={props.type || null}
            disableElevation={props.disableElevation || false}
            className={props.className || ''}
            style={props.style || {}}
        >
            <InnerButtonContent innerIcon={props.innerIcon} label={props.label} />
        </MUIButton>
    )
}
/**
 * Display the inner content of the button
 * @param {{ label: string, innerIcon: * }} props 
 */
export function InnerButtonContent(props) {
    let innerContent = (<span style={{ lineHeight: '2em' }}>{props.label}</span>);
    if (props.innerIcon) {
        innerContent = (
            <div style={{ display: 'flex' }}>
                {props.innerIcon}
                <div style={{ width: '0.5em' }}></div>
                <span style={{ lineHeight: '2em' }}>{props.label}</span>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex' }}>
            {innerContent}
        </div>
    );
}
function getDefaultProps() {
    return {
        color: 'primary',
        onClick: () => { },
    }
}
export default Button;

/**
 * @typedef ButtonProps
 * @property {*} [color]
 * @property {string} label Text to be displayed for button
 * @property {*} [onClick] OnClick handler
 * @property {'contained' | 'text' | 'outlined'} [variant]
 * @property {'submit' | 'button' | 'reset'} [type]
 * @property {JSX.Element} [innerIcon] The inner icon to be 
 * @property {boolean} [disableElevation]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */