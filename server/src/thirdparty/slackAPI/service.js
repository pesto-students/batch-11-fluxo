import axios from 'axios';
import env from '../../env';
import config from './config';
import ThirdPartyApp from '../models/ThirdPartyApp';
import tpEventEmitter, { generateActionUpdateEvent, generateAppAddedEvent, generateAppUpdatedEvent } from '../event';

const getAuthUrl = (code) => `${config.api}/api/oauth.access?client_id=${env.slackClientId}&client_secret=${env.slackClientSecret}&code=${code}&redirect_uri=${encodeURIComponent(`${env.baseUri}/tp/slack/auth/redirect`)}`;

const getIntegUrl = (state) => `${config.api}/oauth/authorize?scope=bot,channels:history,channels:read,chat:write:bot&client_id=${env.slackClientId}&redirect_uri=${encodeURIComponent(`${env.baseUri}/tp/slack/auth/redirect`)}&state=${state}`;

const generateAuthToken = async (code) => {
  const { data } = await axios.get(getAuthUrl(code));
  return data;
};

const getIntegrationId = async (userId, teamId) => {
  const result = await ThirdPartyApp
    .findOne({
      'userDetails.team_id': teamId,
      'userDetails.user_id': userId,
    })
    .select({ _id: 1 }).exec();

  return result === null || !result._id ? null : result._id;
};

const getToken = async (integrationId) => {
  const { token } = await ThirdPartyApp
    .findOne({
      _id: integrationId,
    })
    .select({ token: 1, _id: 0 })
    .exec();

  return token;
};

const generateNewEvent = async (teamId, authedUsers, event) => {
  const eventJson = { eventData: event };
  eventJson.appName = config.appName;
  eventJson.event = `${event.type}_${event.channel_type}`;
  ThirdPartyApp
    .find({
      'userDetails.team_id': teamId,
      'userDetails.user_id': { $in: authedUsers },
    })
    .select({ _id: 1 })
    .exec((err, apps) => {
      eventJson.integratedApps = apps.map((app) => app._id);
      if (apps.length !== 0) {
        tpEventEmitter.emit('newEvent', eventJson);
      }
    });
};

const addToDBandGenerateEvent = async (integId, userToken, appConfig) => {
  try {
    let resultDoc;

    if (integId !== null) {
      resultDoc = await ThirdPartyApp.findOneAndUpdate({ _id: integId }, appConfig).exec();
      generateAppUpdatedEvent(resultDoc, userToken);
    } else {
      resultDoc = await new ThirdPartyApp(appConfig).save();
      generateAppAddedEvent(resultDoc, userToken);
    }

    return true;
  } catch (err) {
    return false;
  }
};

const addOrUpdateIntegration = async (authData, userToken) => {
  if (authData.ok === false) {
    throw new Error('Access token generation failed');
  }
  const {
    team_name: teamName,
    access_token: accessToken,
    user_id: userId,
    team_id: teamId,
  } = authData;

  const integrationId = await getIntegrationId(userId, teamId);
  const slackApp = {
    appName: config.appName,
    accountName: teamName,
    token: accessToken,
    userDetails: { user_id: userId, team_id: teamId },
  };
  const status = await addToDBandGenerateEvent(integrationId, userToken, slackApp);

  return status;
};

const deleteIntegration = async (integId) => ThirdPartyApp.findByIdAndDelete(integId).exec();

const getAccountData = async (integId, event, input) => {
  const token = await getToken(integId);
  let eventData = config.event[event];

  if (eventData === undefined) {
    eventData = config.action[event];
  }
  const { endpoint } = eventData.inputs[input];

  if (token !== undefined && token !== null && endpoint !== undefined) {
    return axios.get(`${config.api}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return Promise.reject(new Error('Invalid inputs'));
};

const requestToSlack = async (apiUrl, body, token) => {
  const requestPromise = new Promise((resolve) => {
    axios.post(apiUrl, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { data } = response;
        if (data.ok) {
          resolve({ status: true });
        } else {
          resolve({ status: false, message: data.error });
        }
      })
      .catch((e) => resolve({ status: false, message: e.message }));
  });

  return requestPromise;
};

const listenActionEvent = () => {
  tpEventEmitter.on('action_slack', async (integrationId, actionData) => {
    try {
      const { inputs, endpoint } = config.action[actionData.action];
      const actionId = actionData.id;
      const token = await getToken(integrationId);

      const body = Object.keys(inputs).reduce((acc, input) => {
        if (actionData[input] !== undefined) {
          acc[input] = actionData[input];
        }
        return acc;
      }, {});

      const statusJson = await requestToSlack(`${config.api}${endpoint}`, body, token);
      generateActionUpdateEvent(actionId, statusJson);
    } catch (err) {
      generateActionUpdateEvent(actionData.id, { status: false, message: err.message });
    }
  });
};

const initialize = () => {
  listenActionEvent();
};

export default {
  generateAuthToken,
  addOrUpdateIntegration,
  getIntegUrl,
  generateNewEvent,
  getAccountData,
  initialize,
  getAuthUrl,
  deleteIntegration,
  getToken,
};
