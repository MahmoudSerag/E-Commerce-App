import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  readonly name: string;
  readonly price: number;
  readonly imgs: string[];
  readonly colors: string[];
  readonly description: string;
  readonly sizes: string[];
  numberOfRates: number;
  sumOfRates: number;
  totalRates: number;
  readonly productInfo: string;
  readonly outOfStock: false;
}
