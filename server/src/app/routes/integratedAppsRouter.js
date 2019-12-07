import express from 'express';
import integratedAppsController from '../controllers/integratedAppsController';

const integratedAppsRouter = express.Router();

integratedAppsRouter.get('/', (req, res) => {
  integratedAppsController.getIntegratedApps(req, res);
});

integratedAppsRouter.post('/', (req, res) => {
  integratedAppsController.addApps(req, res);
});

export default integratedAppsRouter;
