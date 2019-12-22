import github from './config';
import { sendSuccessMessage, sendFailureMessage } from '../utils/restUtil';
import service from './service';

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
      res.render('authStatus', { status });
    }
  } catch (err) {
    res.render('authStatus', { status: false });
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

const getAccountData = async (req, res) => {
  try {
    const { integId, event, input } = req.params;

    if (integId === undefined || integId === '') {
      sendFailureMessage(res, 'IntegId is empty', 400);
    } else if (event === undefined || event === '') {
      sendFailureMessage(res, 'Event is empty', 400);
    } else if (input === undefined || input === '') {
      sendFailureMessage(res, 'Input is empty', 400);
    }

    const { data } = await service.getAccountData(integId, event, input);

    sendSuccessMessage(res, data);
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

export {
  getEvents, getActions, authCallBack, getRepository, createIssue, webhookPayload, getAccountData,
};
