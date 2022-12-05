import { Schema, model, connect } from 'mongoose';

interface IProduct {
  productName: string;
  productCount: string;
  isBuyed: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    productCount: { type: String },
    isBuyed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product', productSchema);
