import React from 'react';
import { Button } from '../../Import/Import';

const MyButton = (props) => {
  return (
    <div>
      <Button variant='contained' color={props.buttonColor}>
        {props.buttonText}
      </Button>
    </div>
  );
};

export default MyButton;
