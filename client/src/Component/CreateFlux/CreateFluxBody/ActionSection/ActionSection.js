import React, { useState } from 'react';
import SimpleSelect from '../../../../MaterialUI/Component/SimpleSelect/SimpleSelect';
import style from './Action.module.scss';
import {
  triggerEvents,
  accountsList,
  fetchThirdParyInput,
} from '../../../../apis/availableApps/availableApps';
import TextField from '../../../../MaterialUI/Component/TextField/TextField';
import { connect } from 'react-redux';
import Spinner from '../../../../MaterialUI/Component/Spinner/Spinner';
import constants from '../../../../constants/constants';

const ActionSection = (props) => {
  const [loading, setLoading] = useState(false);
  const [accounts, changeAccounts] = useState([]);
  const [triggerActionsList, changeActionsList] = useState({});
  const [triggerValue, changeTriggerValue] = useState('');
  const [accountValue, changeAccountValue] = useState('');
  const [availableAppsValue, changeAvaiableAppsValue] = useState('');
  const [userEventInputs, changeUserEventInputs] = useState({});
  const [thirdPartyData, setThirdPartyData] = useState({});
  const [staticData, setStaticData] = useState({});
  const [withValueDynamic, setWithValueDynamic] = useState('');

  const [selectable, setSelectable] = useState({
    actions: false,
    accounts: false,
  });

  const handleChangeAvailableApps = async (e) => {
    changeAvaiableAppsValue(e.target.value);
    setSelectable({
      ...selectable,
      actions: true,
    });
    const selectedApp = e.target.value;
    props.fluxActionInfo({
      actionApp: selectedApp,
    });
    const url = `${constants.serverURL}/tp/${selectedApp}/action`;
    setLoading(true);
    const actions = await triggerEvents(url);
    changeActionsList(actions.data);
    const accountUrl = `${constants.serverURL}/apps?app=${selectedApp}`;
    const accounts = await accountsList(accountUrl);
    if (accounts && actions) {
      setLoading(false);
    }
    changeAccounts(accounts.data);
  };
  const handleChangeTriggers = async (e) => {
    changeTriggerValue(e.target.value);
    changeUserEventInputs({});
    changeAccountValue('');
    setSelectable({
      ...selectable,
      accounts: true,
    });
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
        actionInputs[i] = { value: e.target.value, userProvided: true };
      }
    });
    props.fluxActionInputs({
      ...props.createFluxInfo.actionInputs,
      ...actionInputs,
    });
  };
  const handleChangeWithStatic = (e, name) => {
    let actionInputs = props.createFluxInfo.actionInputs;
    if (actionInputs === undefined) {
      actionInputs = {};
    }
    actionInputs[name] = { value: e.target.value, userProvided: true }
    props.fluxActionInputs({
      ...props.createFluxInfo.actionInputs,
      ...actionInputs,
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
    props.fluxActionInfo({
      actionAppId: tpAppId,
    });
    const field = triggerActionsList[event].inputs;

    changeUserEventInputs(field);
    const list = Object.keys(field);

    const tempStaticData = {};
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
        tempStaticData[i] = field[i].name;
      }
    });
    setStaticData(tempStaticData);
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
    props.fluxActionInfo({
      actionAppId: tpAppId,
    });
    const field = triggerActionsList[event].inputs;
    changeUserEventInputs(field);
    const list = Object.keys(field);
    list.forEach(async (i) => {
      if (field[i].data) {
        const url = `${constants.serverURL}/tp/${appName}/data/${tpAppId}/${event}/${i}`;
        setLoading(true);
        const res = await fetchThirdParyInput(url);
        setLoading(false);
        setThirdPartyData({
          [i]: res.data.channels,
        });
      } else {
        setStaticData({
          ...staticData,
          [i]: field[i].name,
        });
      }
    });
  };
  return (
    <div className={style.Container}>
      <h2>Then</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className={style.Action}>
          <SimpleSelect
            labelText='App'
            itemList={props.availableApps.map((i) => {
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
            disabled={!selectable.actions}
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
          {Object.keys(thirdPartyData).map((i) => {
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
          {Object.keys(staticData).map((i) => {
            return staticData[i] !== undefined &&
              userEventInputs[i] !== undefined ? (
              <TextField
                variant='outlined'
                label={staticData[i]}
                color='primary'
                name={staticData[i].name}
                inputHandle={(e) => handleChangeWithStatic(e, i)}
              />
            ) : null;
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
    fluxActionInfo: (value) => {
      dispatch({ type: 'ACTION_INFO', value: value });
    },
    fluxActionInputs: (value) => {
      dispatch({ type: 'ACTION_INPUTS', value: value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSection);
