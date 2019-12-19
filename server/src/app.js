import express from 'express';
import bodyParser from 'body-parser';
import thirdPartyRouter from './thirdparty/routes';
import logger from './logger';
import router from './app/routes';
import githubRouter from './thirdparty/routes/githubRouter';

const app = express();

app.use((req, res, next) => {
  if (req.headers.origin !== undefined) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, *');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', (req, res, next) => {
  logger.info(`Path : ${req.path}`);
  next();
});

app.use('/', router);
app.use('/tp', thirdPartyRouter);

app.use('/git', githubRouter);

export default app;
