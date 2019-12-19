import axios from 'axios';
import config from './config';
import logger from '../../logger';
import baseUri from '../../envVariable';

const createWebHook = async (token, owner, repo) => {
  const url = config.webhook_url.replace('/repos/:owner/:repo/hooks', `/repos/${owner}/${repo}/hooks`);
  const fullUrl = `${config.api}${url}`;
  axios({
    url: fullUrl,
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': owner,
    },
    data: {
      name: 'web',
      events: ['*'],
      active: true,
      config: {
        url: `${baseUri}/tp/github/gitwebhook`,
        content_type: 'json',
        insecure_ssl: '0',
      },
    },
  })
    .then((response) => logger.info(response))
    .catch((err) => logger.info(err));
};

const getWebHook = async (token, owner, repo) => {
  const url = config.webhook_url.replace('/repos/:owner/:repo/hooks', `/repos/${owner}/${repo}/hooks`);
  const fullUrl = `${config.api}${url}`;
  const getData = await axios({
    url: fullUrl,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return getData;
};

export {
  createWebHook,
  getWebHook,
};
