import React from 'react';
import Button from '../../../MaterialUI/Component/Button/Button';
import Emoji from '../../../Assets/Img/emoji.png';
import style from './NoFluxView.module.scss';

const NoFluxView = () => {
  const buttonClickHandle = () => {
    window.location.href = '/fluxing';
  };
  return (
    <div className={style.NoFlux}>
      <img src={Emoji} alt='icon' />
      <div className={style.Inner}>
        <h3>Oops! You have no flux.</h3>
        <Button
          variant='contained'
          buttonText='Create One From Here'
          buttonColor='primary'
          buttonClickHandle={buttonClickHandle}
        />
      </div>
    </div>
  );
};

export default NoFluxView;
