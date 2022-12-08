import jwt from 'jsonwebtoken';
import { secretJwt } from '../config/config';
import { Session } from '../models/Session';

interface IUser {
  homeName: string;
  email: string;
  profileId: string;
  passwordHash: string;
  salt: string;
  setPassword: (password: string) => string;
  checkPassword: (password: string) => boolean;
}

export async function createSession(user: IUser) {
  const token = jwt.sign({ data: { profileId: user.profileId, homeName: user.homeName } }, secretJwt, {
    expiresIn: 300000000,
  });

  let session = await Session.findOne({ user: user });
  if (!session) {
    session = new Session({ user: user, token: token, lastVisit: new Date() });
    await session.save();
  } else {
    session.token = token;
    session.lastVisit = new Date();
    await session.save();
  }

  return token;
}
