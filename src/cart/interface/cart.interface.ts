import { Document } from 'mongoose';

export interface CartInterface extends Document {
  readonly productPrice: number;
  readonly size: string;
  readonly name: string;
  readonly color: string;
  totalPrice: number;
  quantity: number;
  productId: string;
  userId: string;
}
