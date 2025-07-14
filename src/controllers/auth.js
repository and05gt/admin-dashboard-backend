import createHttpError from 'http-errors';
import { THIRTY_DAYS } from '../constants/index.js';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../services/auth.js';
import { verifyToken } from '../utils/token.js';

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      email: req.body.email,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  } else {
    throw createHttpError(404, 'Session not found');
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.send({
    status: 200,
    message: 'Successfully logged out an user!',
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed user session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const getCurrentUserController = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createHttpError(401, 'Unauthorized. Please log in.');
  }

  const decodedToken = verifyToken(token);

  const user = await getCurrentUser(decodedToken.id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully retrieved current user!',
    data: {
      name: user.name,
      email: user.email,
    },
  });
};
