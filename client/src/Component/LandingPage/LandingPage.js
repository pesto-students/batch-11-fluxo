import React, { Fragment } from 'react';
import LandingHeader from './LandingHeader/LandingHeader';
import LandingBody from './LandingBody/LandingBody';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  return (
    <Fragment>
      <LandingHeader />
      <LandingBody />
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
