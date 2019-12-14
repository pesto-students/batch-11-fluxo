import React from 'react';
import style from './IntegratedApp.module.scss';

const IntApp = (props) => {
  const rows = props.intAppsInfo.map((i, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{i.accountName}</td>
        <td>{i.appName}</td>
        <td>{i.userId.slice(0, 4).concat(`*****${i.userId.slice(7, 9)}`)}</td>
      </tr>
    );
  });
  return (
    <div className={style.Main}>
      <table>
        <thead>
          <tr>
            <td>Serial</td>
            <td>Account</td>
            <td>App Name</td>
            <td>Token</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default IntApp;
