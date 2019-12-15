import express from 'express';
import bodyParser from 'body-parser';
import thirdPartyRouter from './thirdparty/routes';
import logger from './logger';
import router from './app/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', (req, res, next) => {
  logger.info(`Path : ${req.path}`);
  next();
});

app.use('/', router);
app.use('/tp', thirdPartyRouter);


export default app;
