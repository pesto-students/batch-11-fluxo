import express from 'express';
import fluxController from '../controllers/fluxController';

const fluxRouter = express.Router();

fluxRouter.get('/', (req, res) => {
  fluxController.getAllFlux(req, res);
});

fluxRouter.post('/', (req, res) => {
  fluxController.addFlux(req, res);
});

export default fluxRouter;
