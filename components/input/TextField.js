import MUITextField from '@material-ui/core/TextField';
/**
 * @param {TextFieldProps} props 
 */
export default function TextField(props) {
    let { label, type, 
        value, errorText = '', 
        autocomplete, multiline, rows } = props;
    let error = errorText ? true : false;
    let default_styles = getDefaultStyles();
    return (<MUITextField
        style={props.style ? {...default_styles, ...props.style } : default_styles}
        InputLabelProps={{ shrink: ([null, undefined, ''].indexOf(value) > 0) ? false : true }}
        value={(value == undefined || value == null) ? '' : value}
        error={error}
        label={label}
        onChange={formatOnChangeParams(props.onChange)}
        type={type}
        helperText={errorText}
        autoComplete={autocomplete}
        fullWidth={true}
        multiline={multiline}
        rows={rows}
    />)
}
function getDefaultStyles () {
    /**
     * @type {React.CSSProperties}
     */
    let style = {
        marginTop: '1em'
    };
    return style;
}

function formatOnChangeParams(onChangeNew) {
    let fn = onChangeNew || ((v) => { });
    return ((event) => {
        fn(event.target.value);
    });
}
/**
 * @typedef TextFieldProps
 * @property {string} label
 * @property {*} onChange
 * @property {*} value
 * @property {string} [type]
 * @property {string} [errorText]
 * @property {HTMLAutocompleteTypes} [autocomplete]
 * @property {boolean} [multiline]
 * @property {number} [rows]
 * @property {React.CSSProperties} [style]
 */

 /**
  * @typedef {'username' | 'password' | 'given-name' | 'family-name'} HTMLAutocompleteTypes
  */