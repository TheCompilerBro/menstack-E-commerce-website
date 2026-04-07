import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized, token missing' });
    return;
  }

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401).json({ message: 'User no longer exists' });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
