import React from 'react';
import { Button } from '../../Import/Import';

const MyButton = (props) => {
  return (
    <div onClick = {props.signUpButton}>
      <Button variant='contained' color={props.buttonColor}>
        {props.buttonText}
      </Button>
    </div>
  );
};

export default MyButton;
