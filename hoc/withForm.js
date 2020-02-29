import * as React from 'react';
/**
 * 
 * @param {*} Component 
 * @param {WithFormOptions} [options] 
 */
export default function withForm(Component, options = {}) {
    /**
     * @extends {React.Component<{onFormDataChanged?: function}, {}>}
     */
    class WrapperComponent extends React.Component {
        constructor(props) {
            super(props);
            let keys = (options && options.validations) ? Object.keys(options.validations): []
            this.state = {
                formData: keys.reduce((state, key) => {
                    state[key] = null; //Init form data with null values
                    return state;
                }, {}),
                errors: {}
            }
        }
        async setFieldValue(field_name, field_value) {
            let { formData, errors } = this.state;
            let { onFormDataChanged = () => {}} = this.props;
            let { validations } = options;
            //Update form data
            formData[field_name] = field_value;
            //Update field errors
            if(validations) {
                let validate = validations[field_name];
                if(validate) {
                    errors[field_name] = validate(formData, field_value);
                }
            }
            await new Promise((resolve, reject) => {
                this.setState({
                    errors,
                    formData
                }, () => resolve())
            });
            await onFormDataChanged(formData);
        }
        async loadFormData(formData) {
            formData = formData || {};
            await new Promise((resolve, reject) => {
                this.setState({ formData }, () => resolve());
            });
        }

        handleChange(field_name) {
            return async (value) => {
                await this.setFieldValue(field_name, value);
            }
        }
        /**
         * Validate all selected fields and update errors
         * @param {string[]?} fields 
         */
        async validate(fields) {
            let errors = {};
            let formData = this.state.formData;
            if(!fields && options && options.validations) {
                fields = Object.keys(options.validations);  //Validate all fields by default unless otherwise specified
            }
            let validations = options.validations;
            if(validations) {
                for(let key of fields) {
                    let validate = validations[key];
                    if(validate) {
                        let error = validate(formData, formData[key]);
                        errors[key] = error;
                    }
                }
            }
            await new Promise((resolve, reject) => {
                this.setState({ errors }, () => resolve());
            });
            return (Object.keys(errors).filter(key => errors[key]).length === 0);
        }
        /**
         * Aggregate form data on field level
         * @returns {Object<string, Field>}
         */
        getFields() {
            let formData = this.state.formData;
            let errors = this.state.errors;
            /** @type {Object<string, Field>} */
            let fields = {};
            for(let key in formData) {
                let field = fields[key] || { value: null };
                field.value = formData[key];
                fields[key] = field;
            }
            for(let key in errors) {
                let field = fields[key] || { value: null };
                field.errorText = errors[key];
                fields[key] = field;
            }
            return fields;
        }
        render() {
            return (<Component
                {...this.props}
                form={{
                    handleChange: this.handleChange.bind(this),
                    loadFormData: this.loadFormData.bind(this),
                    validate: this.validate.bind(this),
                    formData: this.state.formData,
                    errors: this.state.errors,
                    fields: this.getFields()
                }}
            />)
        }
    }
    return WrapperComponent;
}
/**
 * @typedef Field
 * @property {*} value
 * @property {string} [errorText]
 *
 */
/**
 * @typedef WithFormOptions
 * @property {Object<string, FieldValidation>} [validations]
 */
/**
 * @typedef {function(Object<string, any>, any): string} FieldValidation
 */