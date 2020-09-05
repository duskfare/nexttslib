import * as React from 'react';
import TextField from './TextField';
/**
 *
 * @param {TextFieldProps} props
 */
export default function TextArea(props) {
  return <TextField {...props} multiline rows={props.rows} />;
}
/**
 * @typedef {import('./TextField').TextFieldProps} TextFieldProps
 */
