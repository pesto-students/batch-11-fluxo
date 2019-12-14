import React, { useState, useEffect } from 'react';
import SimpleSelect from '../../../../MaterialUI/Component/SimpleSelect/SimpleSelect';
import {
  availableApps,
  triggerEvents,
  accountsList,
  fetchThirdParyInput,
} from '../../../../apis/availableApps/availableApps';
import constants from '../../../../constants/constants';
import TextField from '../../../../MaterialUI/Component/TextField/TextField';
import { connect } from 'react-redux';
import style from './Event.module.scss';

const EventSection = (props) => {
  const [availableAppsState, changeAvailableState] = useState([]);
  const [triggerEventsList, changeTriggerEventsList] = useState({});
  const [accounts, changeAccounts] = useState([]);
  const [availableAppsValue, changeAvaiableAppsValue] = useState('');
  const [triggerValue, changeTriggerValue] = useState('');
  const [accountValue, changeAccountValue] = useState('');
  const [userEventInputs, changeUserEventInputs] = useState({});
  const [userSelectedInput, setUserSelectedInput] = useState('');
  const [thirdPartyData, setThirdPartyData] = useState({});
  const [staticData, setStaticData] = useState({});
  const [withValueDynamic, setWithValueDynamic] = useState('');
  const [withValueStatic, setWithValueStatic] = useState('');

  useEffect(() => {
    const getAvailableApps = async () => {
      const urlApps = `${constants.serverURL}/tp/apps`;
      const api = await availableApps(urlApps);
      console.log(api);
      // if (api.httpStatus === '') {
      //   window.location.href = '/login';
      // }
      changeAvailableState(api.resData);
    };
    getAvailableApps();
  }, []);

  const handleChangeAvailableApps = async (e) => {
    changeAvaiableAppsValue(e.target.value);
    const selectedApp = e.target.value;
    props.fluxEventInfo({
      eventApp: selectedApp,
    });
    const url = `${constants.serverURL}/tp/${selectedApp}/event`;
    const events = await triggerEvents(url);
    changeTriggerEventsList(events.data);
    const accountUrl = `${constants.serverURL}/apps`;
    const accounts = await accountsList(accountUrl);
    changeAccounts(accounts.data);
  };
  const handleChangeTriggers = (e) => {
    changeTriggerValue(e.target.value);
    props.fluxEventInfo({
      eventName: e.target.value,
      eventDisplayName: triggerEventsList[e.target.value].name,
    });
  };
  const handleChangeAccount = async (e) => {
    changeAccountValue(e.target.value);
    const appName = accounts[0].appName;
    const tpAppId = accounts[0].tpAppId;
    const event = triggerValue;
    props.fluxEventInfo({
      eventAppId: tpAppId,
    });
    const field = triggerEventsList[event].inputs;
    changeUserEventInputs(field);
    const list = Object.keys(field);
    list.forEach(async (i) => {
      if (field[i].data) {
        const url = `${constants.serverURL}/tp/${appName}/data/${tpAppId}/${event}/${i}`;
        const res = await fetchThirdParyInput(url);
        setThirdPartyData({
          [i]: res.data.channels,
        });
      } else {
        setStaticData({
          [i]: field[i].name,
        });
      }
    });
  };
  const handleChangeWithDynamic = (e) => {
    setWithValueDynamic(e.target.value);
    const eventInputs = {};
    Object.keys(userEventInputs).forEach((i) => {
      if (userEventInputs[i].data) {
        eventInputs[i] = { value: e.target.value, userProvided: false };
      }
    });
    props.fluxEventInputs({
      ...props.createFluxInfo.eventInputs,
      ...eventInputs,
    });
  };
  const handleChangeWithStatic = (e) => {
    setWithValueStatic(e.target.value);
    const eventInputs = {};
    Object.keys(userEventInputs).forEach((i) => {
      if (!userEventInputs[i].data) {
        eventInputs[i] = { value: e.target.value, userProvided: false };
      }
    });
    props.fluxEventInputs({
      ...props.createFluxInfo.eventInputs,
      ...eventInputs,
    });
  };
  return (
    <div className={style.Container}>
      <h2>When</h2>
      <div className={style.Event}>
        <SimpleSelect
          labelText='App'
          itemList={availableAppsState.map((i) => {
            return { value: i, displayValue: i };
          })}
          handleChange={handleChangeAvailableApps}
          value={availableAppsValue}
        />
        <SimpleSelect
          labelText='Triggers'
          itemList={Object.keys(triggerEventsList).map((i) => {
            return { value: i, displayValue: triggerEventsList[i].name };
          })}
          handleChange={handleChangeTriggers}
          value={triggerValue}
        />
        <SimpleSelect
          labelText='In Account'
          itemList={accounts.map((i) => {
            return {
              value: i.accountName,
              displayValue: i.accountName,
            };
          })}
          handleChange={handleChangeAccount}
          value={accountValue}
        />
        {Object.keys(userEventInputs).map((i) => {
          return thirdPartyData[i] !== undefined ? (
            <SimpleSelect
              labelText={userEventInputs[i].name}
              itemList={thirdPartyData[i].map((j) => {
                return {
                  value: j.id,
                  displayValue: j.name,
                };
              })}
              handleChange={handleChangeWithDynamic}
              value={withValueDynamic}
            />
          ) : null;
        })}
        {Object.keys(userEventInputs).map((i) => {
          return staticData[i] !== undefined
            ? Object.keys(staticData).map((i) => {
                return (
                  <TextField
                    variant='outlined'
                    label={staticData[i]}
                    color='primary'
                    name={staticData[i].name}
                    inputHandle={handleChangeWithStatic}
                  />
                );
              })
            : null;
        })}
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
    fluxEventInfo: (value) => {
      dispatch({ type: 'EVENT_INFO', value: value });
    },
    fluxEventInputs: (value) => {
      dispatch({ type: 'EVENT_INPUTS', value: value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventSection);
