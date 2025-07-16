import { THIRTY_DAYS } from '../constants/index.js';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../services/auth.js';

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
    secure: true,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
    secure: true,
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

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
    secure: true,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
    secure: true,
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
  const user = await getCurrentUser({ sessionId: req.cookies.sessionId });

  res.json({
    status: 200,
    message: 'Successfully retrieved current user!',
    data: {
      name: user.name,
      email: user.email,
    },
  });
};
