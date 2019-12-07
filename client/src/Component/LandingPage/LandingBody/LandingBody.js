import React from 'react';
import style from './LandingBody.module.scss';
import MyButton from '../../../MaterialUI/Component/Button/Button';
import LandingImage from '../../../Assets/Img/landing.jpg';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const LandingBody = (props) => {
  const signUpButtonHandle = () => {
    props.history.push('/signup');
  };
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
        {props.isAuth ? null : (
          <MyButton
            signUpButton={signUpButtonHandle}
            buttonText='SIGN UP'
            buttonColor='primary'
          />
        )}
      </div>
      <div className={style.RightBox}>
        <img src={LandingImage} alt='about' />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuthenticated,
  };
};
export default connect(mapStateToProps)(withRouter(LandingBody));
