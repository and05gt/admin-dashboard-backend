import { getCurrentUser } from '../services/auth.js';
import { verifyToken } from '../utils/token.js';

export const checkRole = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  const decodedToken = verifyToken(token);

  if (decodedToken.error) {
    return res.status(403).json({ error: decodedToken.error });
  }

  const user = await getCurrentUser(decodedToken.id);

  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Admins only.' });
  }

  next();
};
