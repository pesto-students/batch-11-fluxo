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
      const status = await service.addGithubDetailsInDB(authData, githubUser, state);
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

const getRepository = async (req, res) => {
  const { userName } = req.query;
  const repoNames = await service.getRepositoryForUser(userName);
  sendSuccessMessage(res, repoNames);
};

const createIssue = async (req, res) => {
  const {
    userName, repoName, title, body,
  } = req.body;

  const status = await service.createIssueForUser(userName, repoName, title, body);
  sendSuccessMessage(res, `Issue Create with number: ${status}`);
};
const getEvents = (_, res) => {
  sendSuccessMessage(res, github.events);
};

const getActions = (_, res) => {
  sendSuccessMessage(res, github.actions);
};

const webhookPayload = (req, res) => {
  try {
    const { action, repository } = req.body;
    const responseKeys = Object.keys(req.body);
    const eventKey = `${action}_${responseKeys[1]}`;
    repository.login = repository.owner.login;
    if (github.events[eventKey] !== undefined) {
      service.generateNewEvent(eventKey, repository);
    }

    sendSuccessMessage(res, 'Event received');
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

export {
  getEvents, getActions, authCallBack, getRepository, createIssue, webhookPayload,
};
