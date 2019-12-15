import express from 'express';
import controller from '../controllers/integratedAppController';

const router = express.Router();

router.get('/', controller.getApps);

export default router;
