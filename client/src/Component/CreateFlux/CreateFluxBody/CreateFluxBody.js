import React, { useState, useEffect } from 'react';
import style from './CreateFluxBody.module.scss';
import EventSection from './EventSection/EventSection';
import ActionSection from './ActionSection/ActionSection';
import TextField from '../../../MaterialUI/Component/TextField/TextField';
import Button from '../../../MaterialUI/Component/Button/Button';
import { createFluxApi } from '../../../apis/create-flux/createFlux';
import constants from '../../../constants/constants';
import Error from '../../../MaterialUI/Component/Error/Error';
import { availableApps } from '../../../apis/availableApps/availableApps';
import Spinner from '../../../MaterialUI/Component/Spinner/Spinner';
import { connect } from 'react-redux';

const CreateFluxBody = (props) => {
  const [fluxValidity, setFluxValidity] = useState(true);
  const [availableAppsState, setAvailableAppsState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAvailableApps = async () => {
      setLoading(true);
      const urlApps = `${constants.serverURL}/tp/apps`;
      const apps = await availableApps(urlApps);
      if (apps) {
        setLoading(false);
      }
      setAvailableAppsState(apps.resData);
    };
    getAvailableApps();
  }, []);

  const fluxNameHandle = (e) => {
    props.fluxName(e.target.value);
  };

  const submitButtonHandle = async () => {
    const url = `${constants.serverURL}/flux`;
    const fluxData = props.createFluxInfo;
    setLoading(true);
    const res = await createFluxApi(url, fluxData);
    setLoading(false);
    if (res.status === 'failure') {
      setFluxValidity(false);
      setTimeout(() => {
        setFluxValidity(true);
      }, 4000);
    } else {
      setFluxValidity(true);
      window.location.href = '/dashboard';
    }
  };

  const cancelButtonHandle = () => {
    window.location.href = '/dashboard';
  };
  return (
    <div className={style.MainContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {fluxValidity ? null : <Error errorText='All fields are mandatory' />}
          <TextField
            variant='outlined'
            label='Flux Name'
            name='fluxName'
            required={true}
            inputHandle={fluxNameHandle}
          />
          <EventSection availableApps={availableAppsState} />
          <ActionSection availableApps={availableAppsState} />
          <div className={style.ButtonGroup}>
            <Button
              buttonColor='primary'
              buttonText='Submit'
              variant='contained'
              buttonClickHandle={submitButtonHandle}
            />
            <Button
              buttonColor='primary'
              buttonText='Cancel'
              variant='contained'
              buttonClickHandle={cancelButtonHandle}
            />
          </div>
        </>
      )}
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
