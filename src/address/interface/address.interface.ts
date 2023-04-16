import { Document } from 'mongoose';

export interface AddressInterface extends Document {
  country: string;
  physicalAddress?: string;
  firstName?: string;
  lastName?: string;
  apartmentNumber?: number;
  city?: string;
  governorate: string;
  postalCode?: number;
  phoneNumber?: string;
  userId: string;
}
