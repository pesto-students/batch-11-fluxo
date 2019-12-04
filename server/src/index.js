import mongoose from 'mongoose';
import app from './app';
import { MONGODB_URI, PORT } from './envVariable';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Mongo DB Connected');
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

export default app;
