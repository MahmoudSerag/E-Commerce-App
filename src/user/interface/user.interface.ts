import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly email: string;
  firstName: string;
  lastName: string;
}
