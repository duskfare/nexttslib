import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '40px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
/**
 * @param {SearchBarProps} props
 */
export default function SearchBar(props) {
  const classes = useStyles(props);
  const onChange = props.onChange || (() => {});
  return (
    <Paper component="form" className={classes.root} variant="outlined">
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(...props) => onChange(props[0].target.value)}
      />
    </Paper>
  );
}
/**
 * @typedef SearchBarProps
 * @property {SearchBarOnChange} onChange
 */
/**
 * @callback SearchBarOnChange
 * @param {string} newValue
 */
