import MUIIconButton from '@material-ui/core/IconButton';
import * as React from 'react';
/**
 *
 * @param {IconButtonProps} props
 */
export default function IconButton(props) {
  const {
    className,
    icon,
    onClick = () => {},
    ariaLabel,
    style = {},
    size = 'medium',
  } = props;
  return (
    <MUIIconButton
      className={className}
      aria-label={ariaLabel}
      style={{ outline: 'none', ...style }}
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
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 * @property {string} ariaLabel
 */
