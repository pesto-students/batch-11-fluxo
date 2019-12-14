import React from 'react';
import { Button, makeStyles } from '../../Import/Import';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
}));
const MyButton = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        style={props.style}
        color={props.buttonColor}
        type={props.type}
        variant={props.variant}
        fullWidth={props.fullWidth}
        onClick={props.buttonClickHandle}
      >
        {props.buttonText}
      </Button>
    </div>
  );
};

export default MyButton;
