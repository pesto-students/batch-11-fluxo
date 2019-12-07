import IntegratedApps from '../models/IntegratedApps';

const getIntegratedApps = async (userId) => {
  const apps = await IntegratedApps.find({ userId }).exec();
  return apps;
};

const isAppAvailable = async (userId, tpAppId) => {
  const app = await IntegratedApps.findOne({
    userId,
    tpAppId,
  }).exec();

  return !(app === undefined || app === null);
};

const addApp = async (userId, tpAppId, appName, accountName) => {
  if (!await isAppAvailable(userId, tpAppId)) {
    const app = new IntegratedApps({
      userId,
      tpAppId,
      appName,
      accountName,
    });
    const result = await app.save();

    return result;
  }
  return {};
};

export default {
  getIntegratedApps,
  addApp,
};
