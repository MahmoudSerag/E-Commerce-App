import { Document } from 'mongoose';
console.log(Document);
export interface Auth extends Document {
  email: string;
  otpCode: number;
  otpCreatedAt: Date;
}
