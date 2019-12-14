import React from 'react';
import style from './CreateFluxBody.module.scss';
import EventSection from './EventSection/EventSection';
import ActionSection from './ActionSection/ActionSection';
import TextField from '../../../MaterialUI/Component/TextField/TextField';
import Button from '../../../MaterialUI/Component/Button/Button';
import { createFluxApi } from '../../../apis/create-flux/createFlux';
import constants from '../../../constants/constants';
import { connect } from 'react-redux';

const CreateFluxBody = (props) => {
  const fluxNameHandle = (e) => {
    props.fluxName(e.target.value);
  };
  const submitButtonHandle = async () => {
    const url = `${constants.serverURL}/flux`;
    const fluxData = props.createFluxInfo;
    await createFluxApi(url, fluxData);
    window.location.href = '/dashboard';
  };
  return (
    <div className={style.MainContainer}>
      <TextField
        variant='outlined'
        label='Flux Name'
        name='fluxName'
        inputHandle={fluxNameHandle}
      />
      <EventSection />
      <ActionSection />
      <div className={style.ButtonGroup}>
        <Button
          buttonColor='primary'
          buttonText='Submit'
          variant='contained'
          buttonClickHandle={submitButtonHandle}
        />
        <Button buttonColor='primary' buttonText='Cancel' variant='contained' />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    createFluxInfo: state.createFluxInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fluxName: (value) => {
      dispatch({ type: 'FLUX_NAME', value: value });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateFluxBody);
