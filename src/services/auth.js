import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

export const loginUser = async (payload) => {
  // дописати
  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({
    _id: sessionId,
  });
};
