/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));
/**
 * @param {SelectFieldMultipleProps<any>} props
 */
export default function SelectFieldMultiple(props) {
  const {
    label,
    placeholder,
    variant = 'outlined',
    options,
    onChange,
    value,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            label={label}
            placeholder={placeholder}
          />
        )}
        value={value}
        onChange={(e, new_vals) => onChange(new_vals)}
      />
    </div>
  );
}
/**
 * @template T
 * @typedef SelectFieldMultipleProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {T[]} options
 * @property {T} value
 * @property {'outlined' | 'filled' | 'standard'} [variant]
 * @property {function(T[]): void} [onChange]
 */
