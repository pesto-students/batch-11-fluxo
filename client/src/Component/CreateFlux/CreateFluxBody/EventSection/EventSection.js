import React, { useState } from 'react';
import SimpleSelect from '../../../../MaterialUI/Component/SimpleSelect/SimpleSelect';
import {
  triggerEvents,
  accountsList,
  fetchThirdParyInput,
} from '../../../../apis/availableApps/availableApps';
import constants from '../../../../constants/constants';
import TextField from '../../../../MaterialUI/Component/TextField/TextField';
import { connect } from 'react-redux';

// import IntegrateButton from '../../../IntegrateButton/IntegrateButton';
import Spinner from '../../../../MaterialUI/Component/Spinner/Spinner';
import style from './Event.module.scss';

const EventSection = (props) => {
  const [triggerEventsList, changeTriggerEventsList] = useState({});
  const [accounts, changeAccounts] = useState([]);
  const [availableAppsValue, changeAvaiableAppsValue] = useState('');
  const [triggerValue, changeTriggerValue] = useState('');
  const [accountValue, changeAccountValue] = useState('');
  const [userEventInputs, changeUserEventInputs] = useState({});
  const [thirdPartyData, setThirdPartyData] = useState({});
  const [staticData, setStaticData] = useState({});
  const [withValueDynamic, setWithValueDynamic] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectable, setSelectable] = useState({
    events: false,
    accounts: false,
  });

  const handleChangeAvailableApps = async (e) => {
    changeAvaiableAppsValue(e.target.value);
    setSelectable({
      ...selectable,
      events: true,
    });
    const selectedApp = e.target.value;
    props.fluxEventInfo({
      eventApp: selectedApp,
    });
    const url = `${constants.serverURL}/tp/${selectedApp}/event`;
    setLoading(true);
    const events = await triggerEvents(url);
    changeTriggerEventsList(events.data);
    const accountUrl = `${constants.serverURL}/apps?app=${selectedApp}`;
    const accounts = await accountsList(accountUrl);
    if (accounts && events) {
      setLoading(false);
    }
    changeAccounts(accounts.data);
  };
  const handleChangeTriggers = (e) => {
    changeTriggerValue(e.target.value);
    changeTriggerValue(e.target.value);
    changeUserEventInputs({});
    changeAccountValue('');
    setSelectable({
      ...selectable,
      accounts: true,
    });
    props.fluxEventInfo({
      eventName: e.target.value,
      eventDisplayName: triggerEventsList[e.target.value].name,
    });
  };

  const handleChangeAccount = async (e, newAccount, value) => {
    changeAccountValue(newAccount ? value : e.target.value);
    const appObj = accounts.find(
      (i) => i.accountName === (newAccount ? value : e.target.value),
    );
    const appName = appObj.appName;
    const tpAppId = appObj.tpAppId;
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
        setLoading(true);
        const res = await fetchThirdParyInput(url);
        if (res) {
          setLoading(false);
        }
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
  const authAppButtonHandle = async () => {
    setLoading(true);
    const accountUrl = `${constants.serverURL}/apps?app=${availableAppsValue}`;
    const accounts = await accountsList(accountUrl);
    if (accounts) {
      setLoading(false);
    }

    changeAccounts(accounts.data);
    const appObj = accounts.data[accounts.data.length - 1];
    changeAccountValue(appObj.accountName);
    const appName = appObj.appName;
    const tpAppId = appObj.tpAppId;
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
        setLoading(true);
        const res = await fetchThirdParyInput(url);
        if (res) {
          setLoading(false);
        }
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
  return (
    <div className={style.Container}>
      <h2>When</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className={style.Event}>
          <SimpleSelect
            labelText='App'
            itemList={props.availableApps.map((i) => {
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
            disabled={!selectable.events}
          />
          <SimpleSelect
            labelText='In Account'
            itemList={accounts.map((i) => {
              return {
                value: i.accountName,
                displayValue: i.accountName,
              };
            })}
            disabled={!selectable.accounts}
            handleChange={(e) => handleChangeAccount(e, null, null)}
            value={accountValue}
            showAddAccount={true}
            appName={
              accounts.length === 0
                ? `Connect your ${availableAppsValue} Account`
                : `Connect your New ${availableAppsValue} Account`
            }
            url={`${constants.serverURL}/integrate/${availableAppsValue}`}
            onStatusChange={authAppButtonHandle}
          />
          {Object.keys(userEventInputs).map((i) => {
            return thirdPartyData[i] !== undefined &&
              userEventInputs[i] !== undefined ? (
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
            return staticData[i] !== undefined &&
              userEventInputs[i] !== undefined
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
    fluxEventInfo: (value) => {
      dispatch({ type: 'EVENT_INFO', value: value });
    },
    fluxEventInputs: (value) => {
      dispatch({ type: 'EVENT_INPUTS', value: value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventSection);
