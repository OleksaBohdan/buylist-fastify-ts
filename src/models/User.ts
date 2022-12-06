import { Schema, model, connect } from 'mongoose';
import crypto from 'crypto';

interface IUser {
  homeName: string;
  email: string;
  passwordHash: string;
  salt: string;
}

const productSchema = new Schema<IUser>(
  {
    homeName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    salt: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('Product', productSchema);
