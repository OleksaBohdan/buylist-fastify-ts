import { Schema, model, connect } from 'mongoose';

interface ISession {
  user: object;
  token: string;
  lastVisit: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    token: {
      type: String,
      require: true,
    },

    lastVisit: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Session = model<ISession>('Session', sessionSchema);
