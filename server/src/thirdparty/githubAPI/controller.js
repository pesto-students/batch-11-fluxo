import github from './config';
import { sendSuccessMessage, sendFailureMessage } from '../utils/restUtil';
import service from './service';
import logger from '../../logger';

const authCallBack = async (req, res) => {
  try {
    const { code, state } = req.query;
    if (code === undefined || code === '') {
      sendFailureMessage(res, 'Code is empty', 400);
    } else if (state === undefined || state === '') {
      sendFailureMessage(res, 'User Token is empty', 400);
    } else {
      const authData = await service.generateAuthToken(code);
      const githubUser = await service.getGithubUser(authData);
      const status = await service.addGithubDetailsInDB(authData, githubUser);
      if (status) {
        sendSuccessMessage(res, 'Authorization success');
      } else {
        sendFailureMessage(res, 'Authorization failed');
      }
    }
  } catch (err) {
    logger.error(err);
    sendFailureMessage(res, err.message);
  }
};

const getEvents = (_, res) => {
  sendSuccessMessage(res, github.events);
};

const getActions = (_, res) => {
  sendSuccessMessage(res, github.actions);
};

export {
  getEvents,
  getActions,
  authCallBack,
};
