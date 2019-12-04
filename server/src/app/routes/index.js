import express from 'express';
import ensureAuthenticated from '../middlewares/auth';

const router = express.Router();

router.get('/dashboard', ensureAuthenticated, (req, res) => res.send('Welcome to Dashboard'));

export default router;
