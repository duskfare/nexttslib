import MUISelect from '@material-ui/core/Select';
import MUIMenuItem from '@material-ui/core/MenuItem';
import MUIFormControl from '@material-ui/core/FormControl';
import MUIInputLabel from '@material-ui/core/InputLabel';
import MUIFormHelperText from '@material-ui/core/FormHelperText';
/**
 * @param {SelectFieldProps} props;
 */
export default function SelectField(props) {
    let { label, value = '', errorText, options = [] } = props;
    let error = errorText ? true : false;
    //If the value is an actual value, and not contained in the options, set the value to empty
    if(value !== null && value !== undefined && value !== '' && !(options.map(option => option.value).includes(value))) {
        value = '';
        props.onChange(value);
    }
    let default_styles = getDefaultStyles();
    return <MUIFormControl fullWidth={true} style={props.style ? { ...default_styles, ...props.style } : default_styles} error={error}>
        <MUIInputLabel>{label}</MUIInputLabel>
        <MUISelect
            fullWidth={true}
            value={value}
            onChange={formatOnChangeParams(props.onChange)}
            >
            {options.map((option, idx) => {
                return <MUIMenuItem
                    key={idx}
                    value={option.value}
                >{option.text}</MUIMenuItem>
            })}
        </MUISelect>
        <MUIFormHelperText>{errorText}</MUIFormHelperText>
    </MUIFormControl>
}
function getDefaultStyles() {
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
 * @typedef SelectFieldProps
 * @property {string} label
 * @property {string} value
 * @property {string} [errorText]
 * @property {SelectFieldOption[]} options
 * @property {*} onChange
 * @property {React.CSSProperties} [style]
 */
/**
 * @typedef SelectFieldOption
 * @property {*} value
 * @property {string} text
 */