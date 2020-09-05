import React from 'react';
import Button from './Button';
/**
 *
 * @param {import('./Button').ButtonProps} props
 */
export default function RaisedButton(props) {
  return <Button variant="contained" color="primary" {...props} />;
}
