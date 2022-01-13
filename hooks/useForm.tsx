import { useState } from "react";
import { FieldProps } from "../components/input/interfaces/FieldProps";
export function useForm(options: FormOptions): [Form] {
  //Init the form state
  const keys =
    options && options.initialState ? Object.keys(options.initialState) : [];
  const [formData, setFormData] = useState<FormData>(
    keys.reduce((state: Record<string, any>, key) => {
      state[key] = options ? options.initialState?.[key].value : null; //Init form data with null values
      return state;
    }, {})
  );

  const [errors, setErrors] = useState<FormErrors>({});
  function setFieldValue(fieldName: string, fieldvalue: any) {
    const { validations } = options;
    //Update form data
    formData[fieldName] = fieldvalue;
    //Update field errors
    if (validations) {
      const validate = validations[fieldName];
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
    const errors: Record<string, any> = {};
    if (!fields && options && options.validations) {
      fields = Object.keys(options.validations); //Validate all fields by default unless otherwise specified
    }
    if (!fields) {
      fields = [];
    }
    const validations = options.validations;
    if (validations) {
      for (const key of fields) {
        const validate = validations[key];
        if (validate) {
          const error = validate(getForm(), formData[key]);
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
    const fields: Record<string, any> = {};
    for (const key in formData) {
      const field = fields[key] || { value: null };
      field.value = formData[key];
      fields[key] = field;
    }
    for (const key in errors) {
      const field = fields[key] || { value: null };
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
    const form: Form = {
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
  validate: (fields?: string[]) => boolean;
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
