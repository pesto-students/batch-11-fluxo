import mongoose from 'mongoose';
import app from './app';
import { MONGODB_URI, PORT } from './envVariable';
import thirdParty from './thirdparty';
import integrationService from './app/service/integrationService';
import logger from './logger';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Mongo DB Connected');
    app.listen(PORT, () => {
      logger.info(`Server is listening at port ${PORT}`);
    });
    thirdParty.initialize();
    integrationService.start();
  })
  .catch((err) => logger.error(err));

mongoose.set('useFindAndModify', false);

export default app;
