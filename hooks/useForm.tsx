import { useState, useEffect } from 'react';
import { FieldProps } from '../components/input/interfaces/FieldProps';
export function useForm(options: FormOptions): [Form] {
  //Init the form state
  let keys =
    options && options.initialState ? Object.keys(options.initialState) : [];
  let [formData, setFormData] = useState<FormData>(
    keys.reduce((state, key) => {
      state[key] = options ? options.initialState[key].value : null; //Init form data with null values
      return state;
    }, {})
  );

  let [errors, setErrors] = useState<FormErrors>({});
  function setFieldValue(fieldName: string, fieldvalue: any) {
    let { validations } = options;
    //Update form data
    formData[fieldName] = fieldvalue;
    //Update field errors
    if (validations) {
      let validate = validations[fieldName];
      if (validate) {
        errors[fieldName] = validate(getForm(), formData[fieldName]);
      }
    }
    setFormData({ ...formData });
  }
  /**
   * Handle change to a field
   * @param fieldName
   */
  function handleChange(fieldName: string) {
    return async (value: any) => {
      await setFieldValue(fieldName, value);
    };
  }
  /**
   * Load form data into the state
   * @param formData
   */
  function loadFormData(formData: { [key: string]: any }) {
    formData = Object.assign({}, formData);
    setFormData({ ...formData });
  }
  /**
   * Validate all selected fields and update errors
   * @param fields
   */
  function validate(fields?: string[]) {
    let errors = {};
    if (!fields && options && options.validations) {
      fields = Object.keys(options.validations); //Validate all fields by default unless otherwise specified
    }
    let validations = options.validations;
    if (validations) {
      for (let key of fields) {
        let validate = validations[key];
        if (validate) {
          let error = validate(getForm(), formData[key]);
          errors[key] = error;
        }
      }
    }
    setErrors(errors);
    return Object.keys(errors).filter((key) => errors[key]).length === 0;
  }
  /**
   * Get value for formData at field name
   * @param fieldName
   */
  function getFieldValue(fieldName: string) {
    return formData[fieldName];
  }

  /**
   * Aggregate form data on field level
   */
  function getFields() {
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

  function getFieldError(fieldName: string) {
    return errors[fieldName];
  }
  /**
   * Get props to be injected into a field component
   * @param fieldName
   */
  function getFieldProps(fieldName: string): FieldProps {
    return {
      onChange: handleChange(fieldName),
      value: formData[fieldName],
      errorText: errors[fieldName],
    };
  }

  function getForm(): Form {
    let form: Form = {
      handleChange,
      loadFormData,
      validate,
      formData,
      errors,
      fields: getFields(),
      getFieldValue,
      getFieldError,
      getFieldProps,
    };
    return form;
  }

  return [getForm()];
}

interface Form {
  handleChange: (fieldName: string) => (fieldValue: any) => Promise<void>;
  loadFormData: (formData: any) => void;
  validate: (fields?: string[]) => void;
  formData: { [key: string]: any };
  errors: { [key: string]: any };
  fields: { [key: string]: Field };
  getFieldValue: (fieldName: string) => any;
  getFieldError: (fieldName: string) => string;
  getFieldProps(fieldName: string): FieldProps;
}

interface FormOptions {
  validations?: { [key: string]: FieldValidation };
  initialState?: { [key: string]: Field };
}

type FormErrors = { [key: string]: string };
type FormData = { [key: string]: any };

type FieldValidation = (form: Form, fieldValue: any) => string;
interface Field {
  value: any;
  errorText: string;
}

type FormState = { [key: string]: string };
