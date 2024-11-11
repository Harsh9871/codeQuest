import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenvConfig.js';
const jwtConfig = {
  secret: JWT_SECRET,
  expiresIn: '7d',
};

const createToken = (payload, expiresIn = jwtConfig.expiresIn) => {
  return  jwt.sign(payload, jwtConfig.secret, { expiresIn: expiresIn });
}

const getDataFromToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    return null;
  }
}


export { createToken, getDataFromToken };