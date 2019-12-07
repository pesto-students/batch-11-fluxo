import Flux from '../models/Flux';

const getAllFlux = async (userId) => {
  const fluxes = await Flux.find({ userId }).exec();
  return fluxes;
};

const addFlux = async (userId, fluxObj) => {
  const dbObj = fluxObj;
  dbObj.userId = userId;
  const flux = new Flux(dbObj);
  const result = await flux.save();

  return result;
};

const getAllFluxForEvents = async (tpIds) => {
  const fluxes = await Flux.find({ eventAppId: { $in: tpIds } }).exec();
  return fluxes;
};

export default {
  getAllFlux,
  addFlux,
  getAllFluxForEvents,
};
