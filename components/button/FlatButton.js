import React from 'react';
import Button from './Button';
/**
 *
 * @param {import('./Button').ButtonProps} props
 */
export default function FlatButton(props) {
  return <Button {...props} disableElevation />;
}
