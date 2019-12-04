import jwt from 'jsonwebtoken';
import JWT_KEY from '../../envVariable';

const ensureAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Authorization Failed',
    });
  }
};

export default ensureAuthenticated;
