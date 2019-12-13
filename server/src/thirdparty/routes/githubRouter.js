import express from 'express';
import {
  authCallBack,
  getEvents,
  getActions,
} from '../githubAPI/controller';

const githubRouter = new express.Router();

githubRouter.get('/', (req, res) => res.send('Hello Github'));

githubRouter.get('/oauth/callback', authCallBack);

githubRouter.get('/actions', getActions);

githubRouter.get('/events', getEvents);

export default githubRouter;
