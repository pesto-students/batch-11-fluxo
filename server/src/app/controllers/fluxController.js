import service from '../service/fluxService';
import { sendFailureMessage, sendSuccessMessage } from '../../thirdparty/utils/restUtil';

const getFluxes = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    sendSuccessMessage(res, await service.getAllFlux(userId));
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const getFluxForId = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const { fluxId } = req.params;
    sendSuccessMessage(res, await service.getFlux(fluxId, userId));
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const getFluxHistory = async (req, res) => {
  try {
    const { fluxId } = req.params;
    sendSuccessMessage(res, await service.getFluxHistory(fluxId));
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const searchFlux = async (req, res) => {
  try {
    const { id: userId } = req.userData;
    const { name } = req.query;

    sendSuccessMessage(res, await service.searchFlux(name, userId));
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const addFlux = async (req, res) => {
  try {
    const fluxJson = req.body;
    fluxJson.userId = req.userData.id;
    const status = await service.addFlux(fluxJson);

    if (status) {
      sendSuccessMessage(res, 'Added successfully');
    } else {
      sendFailureMessage(res, 'Error in adding Flux');
    }
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const deleteFlux = async (req, res) => {
  try {
    const { fluxId } = req.params;
    const status = await service.deleteFlux(fluxId) && await service.deleteFluxHistory(fluxId);

    if (status) {
      sendSuccessMessage(res, 'Deleted successfully');
    } else {
      sendFailureMessage(res, 'Error in deleting Flux');
    }
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

const updateFlux = async (req, res) => {
  try {
    const { fluxId } = req.params;
    const updateJson = req.body;
    const status = await service.updateFlux(fluxId, updateJson);

    if (status) {
      sendSuccessMessage(res, 'Updated successfully');
    } else {
      sendFailureMessage(res, 'Error in updating Flux');
    }
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

export default {
  getFluxes,
  addFlux,
  getFluxForId,
  searchFlux,
  deleteFlux,
  updateFlux,
  getFluxHistory,
};
