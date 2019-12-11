import React from 'react';
import { TextField, makeStyles } from '../../Import/Import';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const BasicTextFields = (props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      id={props.id}
      name={props.name}
      label={props.label}
      variant={props.variant}
      fullWidth={true}
      autoComplete={true}
      color={props.color}
      error={props.error}
      type={props.type}
      onChange={props.inputHandle}
      helperText={props.helperText}
      required={props.required}
    />
  );
};

export default BasicTextFields;
