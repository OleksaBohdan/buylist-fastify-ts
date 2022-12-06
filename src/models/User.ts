import { Schema, model, connect } from 'mongoose';
import crypto from 'crypto';
import { length, iterations, digest } from '../config/config';

interface IUser {
  homeName: string;
  email: string;
  profileId: string;
  passwordHash: string;
  salt: string;
  setPassword: (password: string) => string;
  checkPassword: (password: string) => boolean;
}

const userSchema = new Schema<IUser>(
  {
    homeName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profileId: { type: String },
    passwordHash: { type: String },
    salt: { type: String },
  },
  {
    timestamps: true,
  }
);

function generatePassword(salt: any, password: string) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, length, digest, (err, key) => {
      if (err) return reject(err);
      resolve(key.toString('hex'));
    });
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

userSchema.methods.setPassword = async function setPassword(password: string) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function (password: string) {
  if (!password) return false;
  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};

export const User = model<IUser>('User', userSchema);
