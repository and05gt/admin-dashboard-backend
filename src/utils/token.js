import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign({ id: user._id }, getEnvVar('JWT_SECRET'), {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getEnvVar('JWT_SECRET'));
  } catch {
    return { error: 'Unauthorized. Please log in.' };
  }
};
