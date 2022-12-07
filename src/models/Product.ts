import { Schema, model, connect } from 'mongoose';

interface IProduct {
  user: object;
  productName: string;
  productCount: string;
  isNotDone: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    productName: { type: String, required: true, unique: true },
    productCount: { type: String },
    isNotDone: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product', productSchema);
