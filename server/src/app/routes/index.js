import express from 'express';
import { ensureAuthenticated } from '../middlewares/auth';
import Flux from '../models/Flux';

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Authentication'));

router.get('/api/dashboard', ensureAuthenticated, (req, res) => {
  res.send();
});

router.get('/api/myflux', ensureAuthenticated, async (req, res) => {
  const { id } = req.userData;
  try{
  const myFlux = await Flux.find({ userId: id });
  res.send(myFlux);
  }
  catch(err){
    console.log(err);
  }
});


module.exports = router;
