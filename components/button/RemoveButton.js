
import { RemoveIcon } from '../icons/index';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
/**
 * 
 * @param {RemoveButtonProps} props 
 */
export default function RemoveButton(props) {
    const { onClick = () => {} , style = {}, size = 'medium' } = props;
    return (
        <IconButton aria-label="remove" style={style} onClick={onClick} size={size}>
            <RemoveIcon style={{ color: 'red' }} />
        </IconButton>
    )
}
/**
 * @typedef RemoveButtonProps
 * @property {*} onClick
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 */