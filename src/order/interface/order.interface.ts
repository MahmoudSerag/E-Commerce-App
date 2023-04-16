import { Document } from 'mongoose';

export interface OrderInterface extends Document {
  userId: string;
  productIds: string[];
}
