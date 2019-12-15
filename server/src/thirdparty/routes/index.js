import express from 'express';
import slackRouter from './slackRouter';
import config from '../config';

const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
  res.send('Welcome to Thirdparty microservice');
});

baseRouter.use('/slack', slackRouter);

baseRouter.get('/apps', (req, res) => {
  res.send(Object.keys(config.apps));
});

export default baseRouter;
