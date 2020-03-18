import * as React from 'react';
import MUIButton from '@material-ui/core/Button';
/**
 * @extends {React.Component<ButtonProps>}
 */
export class Button extends React.Component {
    constructor(props) {
        super(props);
        this._mounted = false;
        this.state = {
            isDisabled: false
        }
    }
    async componentDidMount() {
        this._mounted = true;
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    async disableOnClick() {
        if(this._mounted) {
            await new Promise((resolve, reject) => {
                this.setState({ isDisabled: true }, () => resolve());
            });
        }
    }
    async enableOnClick() {
        if(this._mounted) {
            await new Promise((resolve, reject) => {
                this.setState({ isDisabled: false }, () => resolve());
            });
        }
    }
    render() {
        let props = this.props;
        const { preventMultipleClicks } = props;
        let isDisabled = this.state.isDisabled || this.props.disabled;
        let defaults = getDefaultProps();
        return (<MUIButton
            disabled={isDisabled}
            variant={props.variant || 'contained'}
            color={props.color || defaults.color}
            onClick={async (...p) => {
                if(!isDisabled) {
                    try {
                        let onClick = props.onClick || defaults.onClick;
                        if(preventMultipleClicks) {
                            this.disableOnClick();
                        }
                        await onClick(...p);
                    }
                    catch(err) {
                        console.error(err);
                    }
                    await this.enableOnClick();
                }
            }}
            type={props.type || null}
            disableElevation={props.disableElevation || false}
            className={props.className || ''}
            style={props.style || {}}
        >
            <InnerButtonContent innerIcon={props.innerIcon} label={props.label} />
        </MUIButton>);
    }
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
 * @property {boolean} [disabled]
 * @property {React.CSSProperties} [style]
 * @property {boolean} [preventMultipleClicks] Disable the button upon click until the onClick handler promise has been resolved
 */