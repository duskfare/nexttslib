import MUICard from '@material-ui/core/Card';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
/**
 * @param {CardProps} props
 */
export default function Card(props) {
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
      <div>
        {props.title && <div style={{ fontSize: '1.4em' }}>{props.title}</div>}
        {props.subTitle && <div>{props.subTitle}</div>}
      </div>
      {props.children}
      {props.cardActions && (
        <MUICardActions>{props.cardActions}</MUICardActions>
      )}
    </MUICard>
  );
}
export interface CardProps {
  style: React.CSSProperties;
  title: any;
  subTitle: string;
  className: string;
  children: any;
  cardActions: any;
  variant: 'outlined' | 'elevation';
  onClick: any;
  onMouseOver: any;
}
