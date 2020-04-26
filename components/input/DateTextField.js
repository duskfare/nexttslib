import TextField from './TextField';
/**
 * @param {TextFieldProps} props
 */
export default function DateTextField(props) {
    return (
        <TextField
            {...props}
            type="date"
            inject={{
                InputLabelProps: {
                    shrink: true,
                },
            }}
        />
    );
}
/**
 * @typedef {import('./TextField').TextFieldProps} TextFieldProps
 */
