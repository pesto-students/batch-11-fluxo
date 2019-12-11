import mongoose from 'mongoose';
import app from './app';
import env from './env';

mongoose
  .connect(env.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Mongo DB Connected');
    app.listen(env.port, () => {
      console.log(`Server is listening at port ${env.port}`);
    });
  })
  .catch((err) => console.log(err));
