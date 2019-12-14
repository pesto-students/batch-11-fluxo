import React, { Fragment, useEffect } from 'react';
import CreateFluxBody from './CreateFluxBody/CreateFluxBody';
import { auth } from '../../apis/auth/auth';
import Header from '../Header/Header';

const CreateFlux = () => {
  useEffect(() => {
    const authenticate = async () => {
      const res = await auth();
      if (!res.isAuthorized) {
        window.location.href = '/login';
      }
    };
    authenticate();
  }, []);
  return (
    <Fragment>
      <Header pageName='Create Flux' />
      <CreateFluxBody />
    </Fragment>
  );
};

export default CreateFlux;
