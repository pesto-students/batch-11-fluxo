import React, { Fragment } from 'react';
import LandingHeader from './LandingHeader/LandingHeader';
import LandingBody from './LandingBody/LandingBody';
import Footer from '../Footer/Footer';

const LandingPage = (props) => {
  return (
    <Fragment>
      <LandingHeader isAuthorized={props.isAuthorized} />
      <LandingBody isAuthorized={props.isAuthorized} />
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
