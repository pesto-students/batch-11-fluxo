import React from 'react';
import Button from '../../MaterialUI/Component/Button/Button';
import appApi from '../../apis/apps';

const IntegrateButton = (props) => {


  const openUrlInPopup = (url, name, statusCallback) => {
    window.open(url, `Integrate ${name}`, 'width=0,height=0');
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
    }

    pollData();
  }
  return (
    <Button 
      buttonText={props.name}
      buttonColor='primary'
      variant='contained'
      buttonClickHandle={() => {openUrlInPopup(props.url, props.name, props.onStatusChange)}}
    />
  );
};

export default IntegrateButton;
