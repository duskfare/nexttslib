import * as React from 'react';
export default function withForm(Component) {
    /**
     * @extends {React.Component<{onFormDataChanged?: function}, {}>}
     */
    class WrapperComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                fields: {},
                formData: {}
            }
        }
        async setFieldValue(field_name, field_value) {
            let { fields, formData } = this.state;
            let { onFormDataChanged = () => {}} = this.props;
            //Update field values
            let field = fields[field_name] || { value: null, error: null };
            field.value = field_value;
            fields[field_name] = field;
            //Update form data
            formData[field_name] = field_value;
            await new Promise((resolve, reject) => {
                this.setState({
                    fields, formData
                }, () => resolve())
            });
            await onFormDataChanged(formData);
        }
        async loadFormData(formData) {
            formData = formData || {};
            let fields = {};
            for(let key in formData) {
                let val = formData[key];
                let field = fields[key] || {};
                field.value = val;
                fields[key] = field;
            }
            await new Promise((resolve, reject) => {
                this.setState({ fields, formData }, () => resolve());
            });
        }

        handleChange(field_name) {
            return async (value) => {
                await this.setFieldValue(field_name, value);
            }
        }
        render() {
            return (<Component
                {...this.props}
                form={{
                    handleChange: this.handleChange.bind(this),
                    formData: this.state.formData,
                    loadFormData: this.loadFormData.bind(this)
                }}
            />)
        }
    }
    return WrapperComponent;
}
/**
 * @typedef Field
 * @property {string} console.error
 *
 */