import express from 'express';
import index from './routes/index';
import users from './routes/users';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config({ path: '../.env' });


const port = process.env.PORT || 5000;

const app = express();

//DB Connection 

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('Mongo DB Connected'))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Routes

app.use('/', index);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
