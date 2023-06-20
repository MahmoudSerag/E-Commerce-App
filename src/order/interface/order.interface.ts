import { Document } from 'mongoose';

export interface OrderInterface extends Document {
  readonly price: number;
  readonly userId: string;
  readonly productIds: object[];
}
