import { JWT_SECRET } from '../config/dotenvConfig.js';
import jwt from 'jsonwebtoken';
import { getUserById } from '../services/userServices.js';
const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.token;
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded.username);
    let user = await getUserById(decoded.username);
    console.log(user);
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' , errorMsg: error.message});
  }
};

export {authMiddleware};