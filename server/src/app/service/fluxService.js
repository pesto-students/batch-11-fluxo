import Flux from '../models/Flux';
import logger from '../../logger';

/**
 *
 * @param {Object} fluxJson - { name,
 *  userId,
 *  eventApp,
 *  actionApp,
 *  eventName,
 *  actionName,
 *  eventDisplayName,
 *  actionDisplayName,
 *  eventAppId,
 *  actionAppId,
 *  eventInputs,
 *  actionInputs,
 *  }
 *
 *  @returns {Boolean}
 */
const addFlux = async (fluxJson) => {
  try {
    await new Flux(fluxJson).save();
  } catch (err) {
    logger.error(err);
    return false;
  }

  return true;
};

/**
 *
 * @param {String} userId
 *
 * @returns {Documents}
 */
const getAllFlux = async (userId) => {
  try {
    const fluxes = await Flux.find({ userId }).select({ __v: 0 }).exec();
    return fluxes;
  } catch (err) {
    logger.error(err);
  }

  return [];
};

/**
 *
 * @param {String} fluxId - Object ID of the flux
 * @param {String} userId
 *
 * @returns {Document}
 */
const getFlux = async (fluxId, userId) => {
  try {
    const flux = await Flux.findOne({ _id: fluxId, userId }).select({ __v: 0 }).exec();
    return flux;
  } catch (err) {
    logger.error(err);
  }

  return {};
};

/**
 *
 * @param {String} appSearchString - Search string for app name
 *
 * @returns {Document}
 */
const searchFlux = async (appSearchString, userId) => {
  try {
    const regex = new RegExp(appSearchString);
    return await Flux.find({ name: regex, userId }).select({ __v: 0 }).exec();
  } catch (err) {
    logger.error(err);
  }

  return [];
};

/**
 *
 * @param {String} fluxId - Search string for app name
 *
 * @returns {Boolean}
 */
const deleteFlux = async (fluxId) => {
  try {
    await Flux.deleteOne({ _id: fluxId }).exec();
  } catch (err) {
    logger.error(err);
    return false;
  }

  return true;
};

/**
 *
 * @param {Object} fluxJson - { name,
 *  eventApp,
 *  actionApp,
 *  eventName,
 *  actionName,
 *  eventDisplayName,
 *  actionDisplayName,
 *  eventAppId,
 *  actionAppId,
 *  eventInputs,
 *  actionInputs,
 *  isEnable,
 *  }
 *
 *  @returns {Boolean}
 */
const updateFlux = async (fluxId, updateJson) => {
  try {
    await Flux.findByIdAndUpdate(fluxId, updateJson);
  } catch (err) {
    logger.error(err);
    return false;
  }

  return true;
};

/**
 *
 * @param {Array<String>} integIds - Array of Object IDs of integrated App ids
 *
 * @returns {Document}
 */
const getFluxesForIntegIDs = async (integIds) => {
  const fluxes = await Flux.find({ eventAppId: { $in: integIds }, isEnable: true }).exec();
  return fluxes;
};

const getEnabledFlux = async (userId) => {
  const fluxes = await Flux.find({ isEnable: true, userId }).exec();
  return fluxes;
};

const getFluxesForQuery = async (query) => Flux.find(query).exec();

export default {
  addFlux,
  getAllFlux,
  getFlux,
  searchFlux,
  deleteFlux,
  updateFlux,
  getFluxesForIntegIDs,
  getEnabledFlux,
  getFluxesForQuery,
};
