import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '../icons/Publish/PublishIcon';
/**
 * 
 * @param {PublishButtonProps} props 
 */
export default function PublishButton(props) {
    const { onClick = () => {} , style = {}, size = 'medium' } = props;
    return (
        <IconButton aria-label="close" style={style} onClick={onClick} size={size}>
            <PublishIcon />
        </IconButton>
    )
}
/**
 * @typedef PublishButtonProps
 * @property {*} onClick
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 */