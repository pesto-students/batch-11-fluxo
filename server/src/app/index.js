import express from 'express';
import index from './routes/index';
import users from './routes/users';
import mongoose, { mongo } from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import configPassport from './middlewares/passport';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

configPassport(passport);

const port = process.env.PORT || 5000;

const app = express();

//DB Connection 

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongo DB Connected'))
.catch(err => console.log(err));

//Routes

app.use('/', index);
app.use('/users', users);


//Body Parser

app.use(express.urlencoded({ extended: false}));

//Session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//Passport initialization

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
