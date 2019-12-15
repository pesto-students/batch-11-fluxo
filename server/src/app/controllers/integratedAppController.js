import service from '../service/integratedAppService';
import { sendFailureMessage, sendSuccessMessage } from '../../thirdparty/utils/restUtil';

const getApps = async (req, res) => {
  try {
    const { app } = req.query;
    const { id: userId } = req.userData;
    sendSuccessMessage(res, await service.getApps(app, userId));
  } catch (err) {
    sendFailureMessage(res, err.message);
  }
};

export default {
  getApps,
};
