import React, { Fragment } from 'react';
import LandingHeader from './LandingHeader/LandingHeader';
import LandingBody from './LandingBody/LandingBody';
import Footer from '../CommonUI/Footer/Footer';
const LandingPage = () => {
  return (
    <Fragment>
      <LandingHeader buttonText= 'Login'/>
      <LandingBody />
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
