import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authorization Failed',
    });
  }
};

export default ensureAuthenticated;
