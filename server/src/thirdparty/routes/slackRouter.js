import express from 'express';
import slackController from '../slackAPI/controller';

const slackRouter = express.Router();

slackRouter.get('/integrate/', (req, res) => {
  const integUrl = slackController.getIntegUrl();
  console.log(integUrl);
  res.render('integ', {
    integUrl,
  });
});


slackRouter.get('/auth/redirect/', (req, res) => {
  slackController.authCallBack(req, res);
});

slackRouter.use('/events', (req, res) => {
  console.log(req.body);
  if (req.body !== undefined && req.body.challenge !== undefined) {
    res.send({ challenge: req.body.challenge });
  } else {
    slackController.eventCallback(req, res);
  }
});

slackRouter.get('/event', (req, res) => {
  slackController.getEvents(req, res);
});

slackRouter.get('/action', (req, res) => {
  slackController.getActions(req, res);
});


export default slackRouter;
