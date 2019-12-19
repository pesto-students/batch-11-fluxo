import express from 'express';
import { userRegister } from '../controllers/userRegister';
import ensureAuthenticated from '../middlewares/auth';
import { userLogin, getUserDetail } from '../controllers/userLogin';
import { userLogout } from '../controllers/userLogout';
import { sendSuccessMessage } from '../../thirdparty/utils/restUtil';

const router = express.Router();


router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/detail', ensureAuthenticated, getUserDetail);

router.get('/logout', userLogout);

router.get('/auth', (req, res) => {
  sendSuccessMessage(res, 'Auth success');
});

export default router;
