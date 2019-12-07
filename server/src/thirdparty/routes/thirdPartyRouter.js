import express from 'express';
import slackRouter from './slackRouter';

const tpRouter = express.Router();

tpRouter.use('/', (req, res, next) => {
  console.log('Time: ', Date.now(), `Path : ${req.path}`);
  next();
});

tpRouter.get('/', (req, res) => {
  res.send('Welcome to Thirdparty microservice');
});

tpRouter.use('/slack', slackRouter);

export default tpRouter;
