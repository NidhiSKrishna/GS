import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  // Bypass authentication for demo mode
  req.user = { _id: '000000000000000000000000' };
  next();
};

export default auth;
