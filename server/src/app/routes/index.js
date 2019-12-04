import express from 'express';
import {ensureAuthenticated} from '../middlewares/auth';

const router = express.Router();

router.get('/', (req,res) => res.send('Welcome to Authentication'));

router.get('/dashboard'), ensureAuthenticated, (req, res) => res.send('Welcome to Dashboard');


module.exports = router;