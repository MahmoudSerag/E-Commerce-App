import { Document } from 'mongoose';

export interface ReviewInterface extends Document {
  userId: string;
  productId: string;
  rate: number;
  comment: string;
}
