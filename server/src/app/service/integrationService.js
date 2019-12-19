/* eslint-disable no-restricted-syntax */
import tpEvent, { generateActionEvent } from '../../thirdparty/event';
import integratedAppService from './integratedAppService';
import fluxService from './fluxService';
import logger from '../../logger';

const getEventFluxes = async (eventData) => {
  const { event, integratedApps } = eventData;
  const fluxQuery = {
    eventAppId: { $in: integratedApps },
    isEnable: true,
    eventName: event,
  };
  const fluxes = await fluxService.getFluxesForQuery(fluxQuery);

  return fluxes;
};

const constructActionJson = (flux, eventData) => {
  const { _id: id, actionName, actionInputs } = flux;
  const actionJson = { id, action: actionName };

  for (const key of actionInputs.keys()) {
    if (actionInputs.get(key).userProvided === true) {
      actionJson[key] = actionInputs.get(key).value;
    } else {
      actionJson[key] = eventData[actionInputs.get(key).value];
    }
  }

  return actionJson;
};

const isValidEvent = (flux, eventData) => {
  const { eventInputs } = flux;

  for (const key of eventInputs.keys()) {
    if (eventData[key] !== eventInputs.get(key).value) {
      return false;
    }
  }

  return true;
};

const processEvent = async (event) => {
  const fluxes = await getEventFluxes(event);
  for (const flux of fluxes) {
    const { actionApp, actionAppId } = flux;
    if (isValidEvent(flux, event.eventData)) {
      const actionJson = constructActionJson(flux, event.eventData);
      generateActionEvent(actionApp, actionAppId, actionJson);
    }
  }
};

const listenToAppAdded = () => {
  tpEvent.on('appAdded', (appData, userToken) => {
    const { _id: tpAppId, accountName, appName } = appData;

    integratedAppService.addApp({
      tpAppId,
      accountName,
      appName,
      userId: userToken,
    });
  });

  logger.info('Listening to AppAdded event');
};

const listenToAppUpdated = () => {
  tpEvent.on('appUpdated', (appData) => {
    const { _id: tpAppId, accountName, appName } = appData;

    integratedAppService.updateApp(tpAppId, {
      accountName,
      appName,
    });
  });

  logger.info('Listening to App updated event');
};

const listenToNewEvents = () => {
  tpEvent.on('newEvent', (eventData) => {
    logger.info(eventData);
    processEvent(eventData);
  });

  logger.info('Listening to new incoming  event');
};

const listenToActionUpdates = () => {
  tpEvent.on('actionUpdate', (eventData) => {
    logger.info(eventData);
    const { id, data } = eventData;
    fluxService.addFluxHistory(id, data.status);
  });

  logger.info('Listening to new incoming  action updated');
};


const start = () => {
  listenToAppAdded();
  listenToNewEvents();
  listenToAppUpdated();
  listenToActionUpdates();
};

export default { start };
