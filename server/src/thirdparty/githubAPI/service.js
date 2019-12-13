import axios from 'axios';
import { githubClientId, githubClientSecret } from '../../envVariable';
import config from './config';
import ThirdPartyApp from '../models/ThirdPartyApp';

const generateAuthToken = async code => {
  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: {
      code,
      client_id: githubClientId,
      client_secret: githubClientSecret
    }
  };
  const result = await axios(options);
  return result.data.access_token;
};

const getGithubUser = async token => {
  const options = {
    url: `${config.api}/user`,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`
    }
  };
  const result = await axios(options);
  return result.data.login;
};

const addGithubDetailsInDB = async (token, accountName) => {
  try {
    const { appName } = config;
    const githubApp = new ThirdPartyApp({ appName, token, accountName });
    await githubApp
      .save()
      .then(console.log('App Details Inserted'))
      .catch(err => console.log(err));

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default {
  generateAuthToken,
  getGithubUser,
  addGithubDetailsInDB
};
