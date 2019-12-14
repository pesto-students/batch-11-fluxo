import React from 'react';
import style from './CreateFluxBody.module.scss';
import EventSection from './EventSection/EventSection';
import ActionSection from './ActionSection/ActionSection';
import Button from '../../../MaterialUI/Component/Button/Button';

const CreateFluxBody = () => {
  return (
    <div className={style.MainContainer}>
      <EventSection />
      <ActionSection />
      <div className={style.ButtonGroup}>
        <Button buttonColor='primary' buttonText='Submit' variant='contained' />
        <Button buttonColor='primary' buttonText='Cancel' variant='contained' />
      </div>
    </div>
  );
};

export default CreateFluxBody;
