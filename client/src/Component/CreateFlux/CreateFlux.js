import React, { Fragment } from 'react';
import CreateFluxHeader from './CreateFluxHeader/CreateFluxHeader';
import CreateFluxBody from './CreateFluxBody/CreateFluxBody';
import Footer from '../../Component/Footer/Footer';

const CreateFlux = () => {
  return (
    <Fragment>
      <CreateFluxHeader />
      <CreateFluxBody />
      <Footer />
    </Fragment>
  );
};

export default CreateFlux;
