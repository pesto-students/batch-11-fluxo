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

githubRouter.get('/github/getrepo', getRepository);

githubRouter.post('/github/createissue', createIssue);

githubRouter.get('/actions', getActions);

githubRouter.get('/events', getEvents);

export default githubRouter;
