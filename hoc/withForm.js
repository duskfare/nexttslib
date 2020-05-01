import * as React from 'react';
/**
 *
 * @param {*} Component
 * @param {WithFormOptions} [options]
 */
export default function withForm(Component, options = {}) {
    /**
     * @extends {React.Component<{onFormDataChanged?: function, onRef?: function}, {}>}
     */
    class WrapperComponent extends React.Component {
        constructor(props) {
            super(props);
            let keys = options && options.initialState ? Object.keys(options.initialState) : [];
            this.state = {
                formData: keys.reduce((state, key) => {
                    state[key] = options ? options.initialState[key].value : null; //Init form data with null values
                    return state;
                }, {}),
                errors: {},
            };
        }
        componentDidMount() {
            let onRef = this.props.onRef || (() => {});
            onRef(this.child);
        }
        async setFieldValue(field_name, field_value) {
            let { formData, errors } = this.state;
            let { onFormDataChanged = () => {} } = this.props;
            let { validations } = options;
            //Update form data
            formData[field_name] = field_value;
            //Update field errors
            if (validations) {
                let validate = validations[field_name];
                if (validate) {
                    errors[field_name] = validate(this.getForm(), field_value);
                }
            }
            await new Promise((resolve, reject) => {
                this.setState(
                    {
                        errors,
                        formData,
                    },
                    () => resolve()
                );
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
            };
        }
        /**
         * Validate all selected fields and update errors
         * @param {string[]?} fields
         */
        async validate(fields) {
            let errors = {};
            let formData = this.state.formData;
            if (!fields && options && options.validations) {
                fields = Object.keys(options.validations); //Validate all fields by default unless otherwise specified
            }
            let validations = options.validations;
            if (validations) {
                for (let key of fields) {
                    let validate = validations[key];
                    if (validate) {
                        let error = validate(this, formData[key]);
                        errors[key] = error;
                    }
                }
            }
            await new Promise((resolve, reject) => {
                this.setState({ errors }, () => resolve());
            });
            return Object.keys(errors).filter((key) => errors[key]).length === 0;
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
            for (let key in formData) {
                let field = fields[key] || { value: null };
                field.value = formData[key];
                fields[key] = field;
            }
            for (let key in errors) {
                let field = fields[key] || { value: null };
                field.errorText = errors[key];
                fields[key] = field;
            }
            return fields;
        }
        getFormData() {
            return this.state.formData;
        }
        getForm() {
            return {
                handleChange: this.handleChange.bind(this),
                loadFormData: this.loadFormData.bind(this),
                validate: this.validate.bind(this),
                setFieldValue: this.setFieldValue.bind(this),
                formData: this.state.formData,
                errors: this.state.errors,
                fields: this.getFields(),
            };
        }
        render() {
            return <Component {...this.props} onRef={(child) => (this.child = child)} form={this.getForm()} />;
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
 * @property {Object<string, Field>} [initialState]
 */
/**
 * @typedef {function(Object<string, any>, any): string} FieldValidation
 */
/**
 * @typedef WithFormHOCProps
 * @property {HOCForm} form
 */
/**
 * @typedef HOCForm
 * @property {function(string):function(*):Promise<void>} handleChange
 * @property {function(any)} loadFormData
 * @property {function():Promise<boolean>} validate
 * @property {function(string, string):Promise<void>} setFieldValue
 * @property {*} formData
 * @property {*} errors
 * @property {*} fields
 */
