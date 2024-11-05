import jwt from 'jsonwebtoken';

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
};

const createToken = (payload, expiresIn = jwtConfig.expiresIn) => {
  return  jwt.sign(payload, jwtConfig.secret, { expiresIn: expiresIn });
}

const verifyToken = (payload) =>{
    return jwt.verify(payload, jwtConfig.secret);
}


export { createToken, verifyToken };