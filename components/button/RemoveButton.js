import React from 'react;';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '../icons/Remove/RemoveIcon';
/**
 *
 * @param {RemoveButtonProps} props
 */
export default function RemoveButton(props) {
  const { onClick = () => {}, style = {}, size = 'medium' } = props;
  return (
    <IconButton aria-label="remove" style={style} onClick={onClick} size={size}>
      <RemoveIcon style={{ color: 'red' }} />
    </IconButton>
  );
}
/**
 * @typedef RemoveButtonProps
 * @property {*} onClick
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 */
