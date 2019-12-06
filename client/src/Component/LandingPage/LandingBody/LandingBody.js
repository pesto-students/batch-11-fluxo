import React from 'react';
import style from './LandingBody.module.scss';
import MyButton from '../../../MaterialUI/Component/Button/Button';
import LandingImage from '../../../Assets/Img/landing.jpg';

const LandingBody = () => {
  return (
    <div className={style.LandingBody}>
      <div className={style.LeftBox}>
        <h1>
          Fluxo intergrates your apps and automate<br></br>your workflows.
        </h1>
        <div className={style.Bar}></div>
        <p>
          Easy way to automate for busy people. Fluxo can moves info between
          apps,<br></br>so that you can focus on important things.
        </p>
        <MyButton buttonText='SIGN UP' buttonColor='primary' />
      </div>
      <div className={style.RightBox}>
        <img src={LandingImage} alt='about' />
      </div>
    </div>
  );
};

export default LandingBody;
