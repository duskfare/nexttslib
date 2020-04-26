import MUICard from '@material-ui/core/Card';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
/**
 * @param {CardProps} props
 */
export default function Card(props) {
    // let classes = useStyles(props);
    return (
        <MUICard className={props.className || ''} style={props.style || {}} variant={props.variant || 'outlined'}>
            <div>
                {props.title && <div style={{ fontSize: '1.4em' }}>{props.title}</div>}
                {props.subTitle && <div>{props.subTitle}</div>}
            </div>
            {props.children}
            {props.cardActions && <MUICardActions>{props.cardActions}</MUICardActions>}
        </MUICard>
    );
}
/**
 * @typedef CardProps
 * @property {React.CSSProperties} [style]
 * @property {*} [title]
 * @property {string} [subTitle]
 * @property {string} [className]
 * @property {*} children
 * @property {*} [cardActions]
 * @property {'outlined' | 'elevation'} [variant]
 */
