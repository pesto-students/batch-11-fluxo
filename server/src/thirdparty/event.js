import EventEmitter from 'events';

const tpEventEmitter = new EventEmitter();

export const generateAppAddedEvent = (appData, userToken) => {
  if (userToken === undefined) {
    throw new Error('User token should not be empty');
  }
  tpEventEmitter.emit('appAdded', appData, userToken);
};

export const generateAppUpdatedEvent = (appData, userToken) => {
  if (userToken === undefined) {
    throw new Error('User token should not be empty');
  }
  tpEventEmitter.emit('appUpdated', appData, userToken);
};

export const generateActionUpdateEvent = (uniqueId, updateEvent) => {
  const eventJson = { id: uniqueId, data: updateEvent };
  tpEventEmitter.emit('actionUpdate', eventJson);
};

export const generateActionEvent = (appName, integrationId, actionData) => {
  if (appName === undefined || integrationId === undefined) {
    throw new Error('App name and integration ID should not be empty');
  }
  tpEventEmitter.emit(`action_${appName}`, integrationId, actionData);
};

export default tpEventEmitter;
