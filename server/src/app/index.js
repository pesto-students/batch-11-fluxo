import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import thirdPartyRouter from '../thirdparty/routes/thirdPartyRouter';
import IntegrationService from './service/IntegrationService';
import fluxRouter from './routes/flux';
import integratedAppsRouter from './routes/integratedAppsRouter';
import ensureAuthenticated from './middlewares/auth';
import index from './routes/index';
import users from './routes/users';

dotenv.config({ path: '../.env' });

const port = process.env.PORT || 5000;

const app = express();

// DB Connection

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Mongo DB Connected'))
  .catch((err) => console.log(err));

IntegrationService.initialize();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

console.log(process.env.SLACK_CLIENT_ID);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Routes

app.use('/', index);
app.use('/users', users);
app.use('/flux', ensureAuthenticated, fluxRouter);
app.use('/apps', ensureAuthenticated, integratedAppsRouter);
app.use('/tp', thirdPartyRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening at port ${port}`);
});
