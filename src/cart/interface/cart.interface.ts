import { Document } from 'mongoose';

export interface CartInterface extends Document {
  readonly size: string;
  readonly name: string;
  price: number;
  readonly color: string;
  quantity: number;
  productId: string;
  userId: string;
}
