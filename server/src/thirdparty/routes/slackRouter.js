import express from 'express';
import slackController from '../slackAPI/controller';

const slackRouter = express.Router();

slackRouter.get('/', (_, res) => {
  res.send('Slack integration');
});

slackRouter.get('/auth/redirect/', (req, res) => {
  slackController.authCallBack(req, res);
});

slackRouter.use('/events', (req, res) => {
  if (req.body !== undefined && req.body.challenge !== undefined) {
    res.send({ challenge: req.body.challenge });
  } else {
    slackController.eventCallBack(req, res);
  }
});

slackRouter.get('/integrate/:code', (req, res) => {
  slackController.integrateSlack(req, res);
});

slackRouter.get('/event', (req, res) => {
  slackController.getEvents(req, res);
});

slackRouter.get('/action', (req, res) => {
  slackController.getActions(req, res);
});

slackRouter.get('/data/:integId/:event/:input', (req, res) => {
  slackController.getAccountData(req, res);
});

export default slackRouter;
