import React from 'react';
import style from './Error.module.scss';

const Error = (props) => {
  return <p className={style.Error}>{props.errorText}</p>;
};

export default Error;
