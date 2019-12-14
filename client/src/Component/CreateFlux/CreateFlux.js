import React, { Fragment } from 'react';
import CreateFluxBody from './CreateFluxBody/CreateFluxBody';
import Footer from '../../Component/Footer/Footer';
import Header from '../Header/Header';

const CreateFlux = () => {
  return (
    <Fragment>
      <Header pageName='Create Flux' />
      <CreateFluxBody />
      <Footer />
    </Fragment>
  );
};

export default CreateFlux;
