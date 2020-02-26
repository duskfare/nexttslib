import MUISelect from '@material-ui/core/Select';
import MUIMenuItem from '@material-ui/core/MenuItem';
import MUIFormControl from '@material-ui/core/FormControl';
import MUIInputLabel from '@material-ui/core/InputLabel';
/**
 * @param {SelectFieldProps} props;
 */
export default function SelectField(props) {
    let { label, value = '', options = [] } = props;
    let default_styles = getDefaultStyles();
    return <MUIFormControl fullWidth={true} style={props.style ? { ...default_styles, ...props.style } : default_styles}>
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
 * @property {SelectFieldOption[]} options
 * @property {*} onChange
 * @property {React.CSSProperties} [style]
 */
/**
 * @typedef SelectFieldOption
 * @property {*} value
 * @property {string} text
 */