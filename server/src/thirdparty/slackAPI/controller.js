import { sendSuccessMessage, sendFailureMessage } from '../utils/restUtil';
import slackService from './service';
import config from './config';

const authCallBack = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (code === undefined || code === '') {
      res.render('authStatus', { status: false });
    } else if (state === undefined || state === '') {
      res.render('authStatus', { status: false });
    } else {
      const authData = await slackService.generateAuthToken(code);
      const status = await slackService.addOrUpdateIntegration(authData, state);

      res.render('authStatus', { status });
    }
  } catch (err) {
    res.render('authStatus', { status: false });
  }
};

const eventCallBack = (req, res) => {
  try {
    const { team_id: teamId, authed_users: authedUsers, event } = req.body;
    const eventKey = `${event.type}_${event.channel_type}`;

    if (config.event[eventKey] !== undefined) {
      slackService.generateNewEvent(teamId, authedUsers, event);
    }

    sendSuccessMessage(res, 'Event received');
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const integrateSlack = (req, res) => {
  const { code } = req.params;
  if (code === undefined || code === '') {
    sendFailureMessage(res, 'Code should not be empty', 400);
  } else {
    const integUrl = slackService.getIntegUrl(code);
    res.redirect(integUrl);
  }
};

const getEvents = (_, res) => {
  sendSuccessMessage(res, config.event);
};

const getActions = (_, res) => {
  sendSuccessMessage(res, config.action);
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

    const { data } = await slackService.getAccountData(integId, event, input);

    sendSuccessMessage(res, data);
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

export default {
  authCallBack,
  integrateSlack,
  eventCallBack,
  getEvents,
  getActions,
  getAccountData,
};
