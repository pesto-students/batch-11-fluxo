import express from 'express';
import { userRegister } from '../controllers/userRegister';
import { userLogin } from '../controllers/userLogin';
import { userLogout } from '../controllers/userLogout';

const router = express.Router();


router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/logout', userLogout);

export default router;
