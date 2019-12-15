import express from 'express';
import ensureAuthenticated from '../middlewares/auth';
import users from './users';
import apps from './integratedAppRouter';
import fluxes from './fluxRouter';
import integRouter from './integRouter';

const router = express.Router();

router.use('/users', users);
router.use('/apps', ensureAuthenticated, apps);
router.use('/flux', ensureAuthenticated, fluxes);
router.use('/integrate', ensureAuthenticated, integRouter);
router.get('/dashboard', ensureAuthenticated, (req, res) => res.send('Welcome to Dashboard'));

export default router;
