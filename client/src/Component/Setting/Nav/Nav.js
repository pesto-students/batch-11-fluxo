import React, { useState } from 'react';
import style from './Nav.module.scss';
import Account from '../Account/Account';
import IntApp from '../IntegratedApp/IntegratedApp';

const Nav = (props) => {
  const [navState, changeNavState] = useState({
    account: true,
    intApp: false,
  });

  const navAccountHandle = () => {
    changeNavState({
      account: true,
      intApp: false,
    });
  };

  const navIntHandle = () => {
    changeNavState({
      account: false,
      intApp: true,
    });
  };

  const content = navState.account ? (
    <Account userInfo={props.userInfo} />
  ) : (
    <IntApp intAppsInfo={props.intAppsInfo} />
  );

  return (
    <nav className={style.Nav}>
      <ul>
        <li
          onClick={navAccountHandle}
          className={navState.account ? style.Active : null}
        >
          Account
        </li>
        <li
          onClick={navIntHandle}
          className={navState.intApp ? style.Active : null}
        >
          Integrated Apps
        </li>
      </ul>
      <div className={style.Content}>{content}</div>
    </nav>
  );
};

export default Nav;
