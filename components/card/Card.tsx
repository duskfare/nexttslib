import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import styles from './Card.module.css';
import * as React from 'react';
export default function Card(props: CardProps) {
  const onClick = props.onClick || (() => {});
  const onMouseOver = props.onMouseOver || (() => {});
  return (
    <MUICard
      className={props.className || ''}
      style={props.style || {}}
      variant={props.variant || 'outlined'}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      <div className={styles['card-content-wrapper']}>
        <div>
          {props.title && (
            <div className={styles['card-title']}>{props.title}</div>
          )}
          {props.subTitle && <div>{props.subTitle}</div>}
        </div>
        <div className={styles['card-content']}>{props.children}</div>
        {props.cardActions && (
          <MUICardActions>{props.cardActions}</MUICardActions>
        )}
      </div>
    </MUICard>
  );
}
export interface CardProps {
  style?: React.CSSProperties;
  title?: any;
  subTitle?: string;
  className?: string;
  children?: any;
  cardActions?: any;
  variant?: 'outlined' | 'elevation';
  onClick?: any;
  onMouseOver?: any;
}
