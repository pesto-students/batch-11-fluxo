import express from 'express';
import { ensureAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Authentication'));

router.get('/api/dashboard', ensureAuthenticated, (req, res) => {
  res.send();
});

module.exports = router;
