import { Document } from 'mongoose';
console.log(Document);
export interface AuthInterface extends Document {
  email: string;
  otpCode: number;
  otpCreatedAt: Date;
}
