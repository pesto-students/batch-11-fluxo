import integratedAppsUtil from '../dbutils/IntegratedApps';

const getIntegratedApps = async (req, res) => {
  const apps = await integratedAppsUtil.getIntegratedApps(req.userData.id);
  res.send(apps);
};

const addApps = async (req, res) => {
  const { tpAppId, appName, accountName } = req.body;
  const app = await integratedAppsUtil.addApp(req.userData.id, tpAppId, appName, accountName);
  res.send(app);
};

export default {
  getIntegratedApps,
  addApps,
};
