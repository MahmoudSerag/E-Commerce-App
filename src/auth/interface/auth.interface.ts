import { Document } from 'mongoose';

export interface AuthInterface extends Document {
  email: string;
  otpCode: number;
  otpCreatedAt: Date;
}
