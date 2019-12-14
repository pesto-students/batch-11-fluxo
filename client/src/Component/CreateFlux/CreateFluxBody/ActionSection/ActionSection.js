import React, { useState, useEffect } from 'react';
import SimpleSelect from '../../../../MaterialUI/Component/SimpleSelect/SimpleSelect';
import style from './Action.module.scss';
import {
  availableApps,
  triggerEvents,
  accountsList,
  fetchThirdParyInput,
} from '../../../../apis/availableApps/availableApps';
import TextField from '../../../../MaterialUI/Component/TextField/TextField';
import { connect } from 'react-redux';
import constants from '../../../../constants/constants';

const ActionSection = (props) => {
  const [availableAppsState, changeAvailableState] = useState([]);
  const [accounts, changeAccounts] = useState([]);
  const [triggerActionsList, changeActionsList] = useState({});
  const [triggerValue, changeTriggerValue] = useState('');
  const [accountValue, changeAccountValue] = useState('');
  const [availableAppsValue, changeAvaiableAppsValue] = useState('');
  // const [withValue, setWithValue] = useState('');
  const [userEventInputs, changeUserEventInputs] = useState({});
  const [thirdPartyData, setThirdPartyData] = useState({});
  const [staticData, setStaticData] = useState({});
  const [withValueDynamic, setWithValueDynamic] = useState('');
  const [withValueStatic, setWithValueStatic] = useState('');

  useEffect(() => {
    const getAvailableApps = async () => {
      const urlApps = `${constants.serverURL}/tp/apps`;
      const api = await availableApps(urlApps);
      changeAvailableState(api.resData);
    };
    getAvailableApps();
  }, []);

  const handleChangeAvailableApps = async (e) => {
    changeAvaiableAppsValue(e.target.value);
    const selectedApp = e.target.value;
    props.fluxActionInfo({
      actionApp: selectedApp,
    });
    const url = `${constants.serverURL}/tp/${selectedApp}/action`;
    const actions = await triggerEvents(url);
    changeActionsList(actions.data);
    const accountUrl = `${constants.serverURL}/apps?app=${selectedApp}`;
    const accounts = await accountsList(accountUrl);
    changeAccounts(accounts.data);
  };
  const handleChangeTriggers = (e) => {
    changeTriggerValue(e.target.value);
    props.fluxActionInfo({
      actionName: e.target.value,
      actionDisplayName: triggerActionsList[e.target.value].name,
    });
  };
  const handleChangeWithDynamic = (e) => {
    setWithValueDynamic(e.target.value);
    const actionInputs = {};
    Object.keys(userEventInputs).forEach((i) => {
      if (userEventInputs[i].data) {
        actionInputs[i] = { value: e.target.value, userProvided: false };
      }
    });
    props.fluxActionInputs({
      ...props.createFluxInfo.actionInputs,
      ...actionInputs,
    });
  };
  const handleChangeWithStatic = (e) => {
    setWithValueStatic(e.target.value);
    const actionInputs = {};
    Object.keys(userEventInputs).forEach((i) => {
      if (!userEventInputs[i].data) {
        actionInputs[i] = { value: e.target.value, userProvided: false };
      }
    });
    props.fluxActionInputs({
      ...props.createFluxInfo.actionInputs,
      ...actionInputs,
    });
  };
  const handleChangeAccount = async (e) => {
    changeAccountValue(e.target.value);
    const appName = accounts[0].appName;
    const tpAppId = accounts[0].tpAppId;
    const event = triggerValue;
    props.fluxActionInfo({
      actionAppId: tpAppId,
    });
    const field = triggerActionsList[event].inputs;
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
  return (
    <div className={style.Container}>
      <h2>Then</h2>
      <div className={style.Action}>
        <SimpleSelect
          labelText='App'
          itemList={availableAppsState.map((i) => {
            return { value: i, displayValue: i };
          })}
          handleChange={handleChangeAvailableApps}
          value={availableAppsValue}
        />
        <SimpleSelect
          labelText='DO'
          itemList={Object.keys(triggerActionsList).map((i) => {
            return { value: i, displayValue: triggerActionsList[i].name };
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
    fluxActionInfo: (value) => {
      dispatch({ type: 'ACTION_INFO', value: value });
    },
    fluxActionInputs: (value) => {
      dispatch({ type: 'ACTION_INPUTS', value: value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSection);
