import React from 'react';
import style from './Account.module.scss';

const Account = (props) => {
  return (
    <div className={style.Account}>
      <h4>Name : {props.userInfo.name}</h4>
      <h4>Email : {props.userInfo.email}</h4>
    </div>
  );
};

export default Account;
