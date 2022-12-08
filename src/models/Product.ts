import { Schema, model, connect } from 'mongoose';

interface IProduct {
  profileId: string;
  productName: string;
  productCount: string;
  isNotDone: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    profileId: { type: String },
    productName: { type: String, required: true, unique: true },
    productCount: { type: String },
    isNotDone: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product', productSchema);
