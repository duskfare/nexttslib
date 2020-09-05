import * as React from 'react';
import TextField from './TextField';
/**
 * @param {TextFieldProps} props
 */
export default function EmailTextField(props) {
  return <TextField {...props} type="email" autocomplete="email" />;
}
/**
 * @typedef {import('./TextField').TextFieldProps} TextFieldProps
 */
