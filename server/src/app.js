import express from 'express';
import bodyParser from 'body-parser';
import thirdPartyRouter from './thirdparty/routes';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/tp', thirdPartyRouter);

app.use((err, req, res) => {
  res.send('Some error occurred');
});

export default app;
