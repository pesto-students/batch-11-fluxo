import express from 'express';
import controller from '../controllers/fluxController';

const router = express.Router();

router.get('/', controller.getFluxes);

router.get('/search', controller.searchFlux);

router.get('/:fluxId', controller.getFluxForId);

router.get('/history/:fluxId', controller.getFluxHistory);

router.post('/', controller.addFlux);

router.delete('/:fluxId', controller.deleteFlux);

router.put('/:fluxId', controller.updateFlux);


export default router;
