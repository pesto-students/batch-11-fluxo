import { sendSuccessMessage } from '../../thirdparty/utils/restUtil';

const userLogout = (req, res) => {
  res.cookie('token', '', { maxAge: 0, httpOnly: true });
  sendSuccessMessage(res, 'You are successfully logout!');
};

export { userLogout };
