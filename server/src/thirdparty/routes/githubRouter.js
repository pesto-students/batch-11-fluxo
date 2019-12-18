import express from 'express';
import {
  authCallBack,
  getRepository,
  getEvents,
  getActions,
  createIssue,
} from '../githubAPI/controller';

const githubRouter = new express.Router();

githubRouter.get('/', (req, res) => res.send('Hello Github'));

githubRouter.get('/oauth/callback', authCallBack);

githubRouter.get('/getrepo', getRepository);

githubRouter.post('/createissue', createIssue);

githubRouter.get('/action', getActions);

githubRouter.get('/event', getEvents);

export default githubRouter;
