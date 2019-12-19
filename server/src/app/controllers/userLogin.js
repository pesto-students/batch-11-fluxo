import bcrypt from 'bcryptjs';
import User from '../models/User';
import logger from '../../logger';
import generateJwt from '../constants/generateJwt';
import { sendFailureMessage, sendSuccessMessage } from '../../thirdparty/utils/restUtil';

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      sendFailureMessage(res, 'Email Not Found, User doesn\'t Exist!');
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      const token = await generateJwt(user._id, email);

      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      sendSuccessMessage(res, { token });
    } else {
      sendFailureMessage(res, 'Password is incorrect, Please Try Again!', 400);
    }
  } catch (err) {
    logger.info(err);
    sendFailureMessage(res, 'Some error occurred!');
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { userData } = req;
    const user = await User.findOne({ _id: userData.id }).select({ name: 1, email: 1, _id: 0 });
    sendSuccessMessage(res, user);
  } catch (err) {
    logger.info(err);
    sendFailureMessage(res, 'Some error occurred!');
  }
};

export { userLogin, getUserDetail };
