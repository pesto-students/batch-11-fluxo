import axios from 'axios';
import { githubClientId, githubClientSecret } from '../../envVariable';
import config from './config';
import ThirdPartyApp from '../models/ThirdPartyApp';
import tpEventEmitter, {
  generateAppAddedEvent,
  generateActionUpdateEvent,
} from '../event';
import logger from '../../logger';

const generateAuthToken = async (code) => {
  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: {
      code,
      client_id: githubClientId,
      client_secret: githubClientSecret,
    },
  };
  const result = await axios(options);
  return result.data.access_token;
};

const getGithubUser = async (token) => {
  const options = {
    url: `${config.api}/user`,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
    },
  };
  const result = await axios(options);
  return result.data.login;
};

const addGithubDetailsInDB = async (token, accountName, userToken) => {
  try {
    const { appName } = config;
    const githubApp = new ThirdPartyApp({ appName, token, accountName });
    const githubDoc = await githubApp
      .save()
      .then(console.log('App Details Inserted'))
      .catch((err) => console.log(err));
    generateAppAddedEvent(githubDoc, userToken);

    return true;
  } catch (err) {
    return false;
  }
};

const getRepositoryForUser = async (userName) => {
  try {
    const { token } = await ThirdPartyApp.findOne({
      accountName: userName,
    }).select({ token: 1, _id: 0 });

    const options = {
      url: `${config.api}/users/${userName}/repos`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    };
    const result = await axios(options);
    const repoNames = {};
    result.data.forEach((data, idx) => {
      repoNames[idx] = data.full_name;
    });
    return repoNames;
  } catch (err) {
    return err;
  }
};

const createIssueForUser = async (token, fullRepo, title, body) => {
  try {
    const options = {
      url: `${config.api}/repos/${fullRepo}/issues`,
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        title,
        body,
      },
    };
    const result = await axios(options);
    return result.data.number;
  } catch (err) {
    return err;
  }
};

const listenActionEvent = () => {
  logger.info('Listening to github action event');
  tpEventEmitter.on('action_github', async (integrationId, actionData) => {
    try {
      logger.info('Going to perform action on github: ', actionData);
      logger.info(integrationId);
      const { token } = await ThirdPartyApp.findOne({
        _id: integrationId,
      }).select({ token: 1, _id: 0 });
      const statusJson = await createIssueForUser(
        token,
        actionData.fullRepo,
        actionData.title,
        actionData.body,
      );
      logger.info(statusJson);
      logger.info('Action successful');
    } catch (err) {
      generateActionUpdateEvent(actionData.id, {
        status: false,
        message: err.message,
      });
    }
  });
};

const initialize = () => {
  listenActionEvent();
};

export default {
  generateAuthToken,
  getGithubUser,
  addGithubDetailsInDB,
  getRepositoryForUser,
  createIssueForUser,
  initialize,
};
