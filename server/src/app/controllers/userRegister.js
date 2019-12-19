import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateJwt from '../constants/generateJwt';
import logger from '../../logger';
import { sendFailureMessage, sendSuccessMessage } from '../../thirdparty/utils/restUtil';

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    sendFailureMessage(res, 'User is already registered', 400);
    return;
  }

  try {
    const newUser = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser
      .save()
      .then(logger.info('User Created'))
      .catch((err) => logger.info(err));

    const token = await generateJwt(newUser._id, email);

    res.cookie('token', token, { maxAge: 86400000, httpOnly: true });

    sendSuccessMessage(res, { token });
  } catch (err) {
    logger.error(err);
    res.send({ error: 'Account cannot be created!', token: null });
  }
};

export { userRegister };
