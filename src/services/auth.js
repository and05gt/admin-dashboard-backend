import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
// import { generateTokens } from '../utils/token.js';
import { randomBytes } from 'node:crypto';

export const loginUser = async (payload) => {
  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  await Session.deleteOne({
    userId: user._id,
  });

  // const { accessToken, refreshToken } = generateTokens(user);

  return await Session.create({
    userId: user._id,
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({
    _id: sessionId,
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({
    _id: sessionId,
    refreshToken,
  });

  // const user = await User.findOne({
  //   _id: session.userId,
  // });

  // const token = generateTokens(user);

  return await Session.create({
    userId: session.userId,
    // accessToken: token.accessToken,
    // refreshToken: token.refreshToken,
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const getCurrentUser = async (payload) => {
  const user = await User.findById(payload);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};
