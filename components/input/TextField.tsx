import * as React from 'react';
import MUITextField from '@material-ui/core/TextField';
import { FieldProps } from './interfaces/FieldProps';
import { HTMLAutocompleteTypes } from './interfaces/HTMLAutocompleteTypes';
export default class TextField extends React.Component<
  TextFieldProps,
  { value: any }
> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  isPropsValueUsed() {
    const keys = Object.keys(this.props);
    if (keys.includes('value')) {
      return true;
    }
    return false;
  }
  async onChange(e) {
    const onChange = this.props.onChange || (() => {});
    const value = e.target.value;
    if (!this.isPropsValueUsed()) {
      await new Promise((resolve, reject) => {
        this.setState({ value }, () => resolve());
      });
    }
    await onChange(value);
  }
  render() {
    const props = this.props;
    const {
      label,
      type,
      value: propValue,
      errorText = '',
      autocomplete,
      multiline,
      rows,
      disabled,
      inject,
    } = props;
    const { value: stateValue } = this.state;
    const value = (this.isPropsValueUsed() ? propValue : stateValue) || '';
    const error = errorText ? true : false;
    const default_styles = getDefaultStyles();

    return (
      <MUITextField
        style={
          props.style ? { ...default_styles, ...props.style } : default_styles
        }
        InputLabelProps={{
          shrink: [null, undefined, ''].indexOf(value) > 0 ? false : true,
        }}
        value={value == undefined || value == null ? '' : value}
        error={error}
        label={label}
        onChange={this.onChange.bind(this)}
        type={type}
        helperText={errorText}
        autoComplete={autocomplete}
        fullWidth={true}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        {...(inject || {})}
      />
    );
  }
}
function getDefaultStyles() {
  /**
   * @type {React.CSSProperties}
   */
  const style = {
    marginTop: '1em',
  };
  return style;
}
export interface TextFieldProps extends FieldProps {
  label: string;
  disabled?: boolean;
  value: any;
  type?: any;
  errorText?: string;
  autocomplete?: HTMLAutocompleteTypes;
  multiline?: boolean;
  rows?: number;
  style?: React.CSSProperties;
  //Any custom injected props to the component directly
  inject?: any;
}
