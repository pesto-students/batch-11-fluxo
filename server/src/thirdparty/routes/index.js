import express from 'express';
import slackRouter from './slackRouter';

const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
  res.send('Welcome to Thirdparty microservice');
});

baseRouter.use('/slack', slackRouter);

export default baseRouter;
