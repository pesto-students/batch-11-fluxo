import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../envVariable';

const generateJwt = (id, email) => {
  const token = jwt.sign(
    {
      id,
      email,
    },
    JWT_KEY,
    {
      expiresIn: '24h',
    },
  );
  return token;
};

export default generateJwt;
