import IconButton from '@material-ui/core/IconButton';
import * as React from 'react';
import CloseIcon from '../icons/Close/CloseIcon';
/**
 *
 * @param {CloseButtonProps} props
 */
export default function CloseButton(props) {
  const { onClick = () => {}, style = {}, size = 'medium' } = props;
  return (
    <IconButton aria-label="close" style={style} onClick={onClick} size={size}>
      <CloseIcon />
    </IconButton>
  );
}
/**
 * @typedef CloseButtonProps
 * @property {*} onClick
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 */
