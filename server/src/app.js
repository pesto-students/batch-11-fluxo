import express from 'express';
import bodyParser from 'body-parser';
import thirdPartyRouter from './thirdparty/routes';
import { users } from './app/constants/packageConfig';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);

app.use('/tp', thirdPartyRouter);

app.use((err, req, res) => {
  res.send('Some error occurred');
});

export default app;
