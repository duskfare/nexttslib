import * as React from 'react';
import MUITextField from '@material-ui/core/TextField';
/**
 * @extends {React.Component<TextFieldProps>}
 */
export default class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }
    isPropsValueUsed() {
        let keys = Object.keys(this.props);
        if (keys.includes('value')) {
            return true;
        }
        return false;
    }
    async onChange(e) {
        let onChange = this.props.onChange || (() => {});
        let value = e.target.value;
        if (!this.isPropsValueUsed()) {
            await new Promise((resolve, reject) => {
                this.setState({ value }, () => resolve());
            });
        }
        await onChange(value);
    }
    render() {
        let props = this.props;
        let { label, type, value: propValue, errorText = '', autocomplete, multiline, rows, disabled, inject } = props;
        let { value: stateValue } = this.state;
        let value = (this.isPropsValueUsed() ? propValue : stateValue) || '';
        let error = errorText ? true : false;
        let default_styles = getDefaultStyles();

        return (
            <MUITextField
                style={props.style ? { ...default_styles, ...props.style } : default_styles}
                InputLabelProps={{ shrink: [null, undefined, ''].indexOf(value) > 0 ? false : true }}
                value={value == undefined || value == null ? '' : value}
                error={error}
                label={label}
                onChange={this.onChange.bind(this)}
                type={type}
                helperText={errorText}
                autoComplete={autocomplete}
                fullWidth={true}
                multiline={multiline}
                rows={rows}
                disabled={disabled}
                {...(inject || {})}
            />
        );
    }
}
function getDefaultStyles() {
    /**
     * @type {React.CSSProperties}
     */
    let style = {
        marginTop: '1em',
    };
    return style;
}
/**
 * @typedef TextFieldProps
 * @property {string} label
 * @property {boolean} [disabled]
 * @property {*} [onChange]
 * @property {*} [value]
 * @property {string} [type]
 * @property {string} [errorText]
 * @property {HTMLAutocompleteTypes} [autocomplete]
 * @property {boolean} [multiline]
 * @property {number} [rows]
 * @property {React.CSSProperties} [style]
 * @property {*} [inject] Any custom injected props to the component directly
 */

/**
 * @typedef {'email' | 'username' | 'password' | 'given-name' | 'family-name' | 'bday' } HTMLAutocompleteTypes
 */
