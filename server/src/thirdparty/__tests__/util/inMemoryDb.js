import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const opts = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
let mongoServer;

const createConnection = async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const closeConnection = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const cleanup = async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  return Promise.all(
    collections
      .map(({ name }) => name)
      .map((collection) => mongoose.connection.db.collection(collection).drop()),
  );
};

export default {
  createConnection,
  closeConnection,
  cleanup,
};
