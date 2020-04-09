import MUIIconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import CloseIcon from '../icons/Close/CloseIcon';
/**
 *
 * @param {IconButtonProps} props
 */
export default function IconButton(props) {
    const { className, icon, onClick = () => {}, ariaLabel, style = {}, size = 'medium' } = props;
    return (
        <MUIIconButton
            className={className}
            aria-label={ariaLabel}
            style={style}
            onClick={onClick}
            size={size}
        >
            {icon}
        </MUIIconButton>
    );
}
/**
 * @typedef IconButtonProps
 * @property {JSX.Element} icon
 * @property {*} onClick
 * @property {string} className
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 * @property {string} ariaLabel
 */
