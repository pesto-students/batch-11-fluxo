import React from 'react';
import { MenuItem } from '../../MaterialUI/Import/Import';
import appApi from '../../apis/apps';

const IntegrateButton = (props) => {
  const openUrlInPopup = (url, name, statusCallback) => {
    window.open(url, `Integrate ${name}`, 'width=500,height=500');
    let prevCount = null;
    let polledCount = 0;

    const pollData = () => {
      setTimeout(async () => {
        const { data } = await appApi.getApps();
        const count = data.length;
        if (prevCount !== null && count > prevCount) {
          statusCallback(true);
        } else {
          prevCount = count;
          if (polledCount <= 100) {
            pollData();
          } else {
            statusCallback(false);
          }
        }
        polledCount += 1;
      }, 3000);
    };

    pollData();
  };
  return (
    <MenuItem
      key='accountAuth'
      value='I am the new account'
      onClick={() => {
        openUrlInPopup(props.url, props.appName, props.onStatusChange);
      }}
    >
      {props.appName}
    </MenuItem>
  );
};

export default IntegrateButton;
