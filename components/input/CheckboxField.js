import * as React from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';
/**
 * @extends {React.Component<CheckboxFieldProps>}
 */
class CheckboxField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const props = this.props;
        const { value, onChange, ariaLabel } = (() => ({
            ...props,
            onChange: props.onChange || (() => {}),
        }))();
        return <MUICheckbox checked={value} onChange={() => onChange(!value)} inputProps={{ 'aria-label': ariaLabel }} />;
    }
}
export default CheckboxField;
/**
 * @typedef CheckboxFieldProps
 * @property {boolean} [value]
 * @property {function(boolean)} [onChange]
 * @property {string} [ariaLabel]
 */
