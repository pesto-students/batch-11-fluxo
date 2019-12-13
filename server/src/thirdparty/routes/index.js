import express from 'express';
import slackRouter from './slackRouter';
import config from '../config';
import githubRouter from './githubRouter';

const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
  res.send('Welcome to Thirdparty microservice');
});

baseRouter.use('/slack', slackRouter);
baseRouter.use('/github', githubRouter);


baseRouter.get('/apps', (req, res) => {
  res.send(Object.keys(config.apps));
});

export default baseRouter;
