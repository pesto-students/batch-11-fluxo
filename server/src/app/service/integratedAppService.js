import IntegratedApps from '../models/IntegratedApps';
import logger from '../../logger';

/**
 *
 * @param {Object} appJson - { userId, tpAppId, appName, accountName };
 *
 * @returns {Boolean}
 */
const addApp = async (appJson) => {
  try {
    await new IntegratedApps(appJson).save();
  } catch (err) {
    logger.error(err);
    return false;
  }
  logger.info(`Added new integration for ${appJson.userId}`);
  return true;
};

/**
 *
 * @param {Object} appJson - {appName, accountName}
 * @param {String} tpAppId - Object ID of thirdparty entry
 *
 *@returns {Boolean}
 */
const updateApp = async (tpAppId, appJson) => {
  try {
    await IntegratedApps.findOneAndUpdate({ tpAppId }, appJson);
  } catch (err) {
    logger.error(err);
    return false;
  }

  return true;
};

/**
 * @param {String} appName - optional
 * @param {String} userID-  user id of the current user
 *
 * @returns {Document}
 */
const getApps = async (appName, userId) => {
  try {
    if (userId === null || userId === undefined) {
      throw new Error('User ID cannot be empty');
    }
    const query = appName !== undefined ? { appName, userId } : { userId };
    return await IntegratedApps.find(query)
      .select({ __v: 0 })
      .exec();
  } catch (err) {
    logger.error(err);
  }
  return null;
};

export default {
  addApp,
  getApps,
  updateApp,
};
