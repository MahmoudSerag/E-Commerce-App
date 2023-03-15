import { Document } from 'mongoose';
console.log(Document);
export interface Auth extends Document {
  email: string;
  fullName: string;
  otpCode: number;
  otpCreatedAt: Date;
}
