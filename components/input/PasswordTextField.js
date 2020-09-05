import * as React from 'react';
import TextField from './TextField';
/**
 * @param {TextFieldProps} props
 */
export default function PasswordTextField(props) {
  return <TextField {...props} type="password" />;
}
/**
 * @typedef {import('./TextField').TextFieldProps} TextFieldProps
 */
