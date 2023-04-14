import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly price: number;
  readonly imgs: string[];
  readonly colors: string[];
  readonly description: string;
  readonly sizes: string[];
  readonly numberOfRates: number;
  readonly sumOfRates: number;
  readonly totalRates: number;
  readonly productInfo: string;
  readonly outOfStock: false;
}
