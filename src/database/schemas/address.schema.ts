import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    physicalAddress: {
      type: String,
      unique: [true, 'physicalAddress should be unique.'],
      required: [true, 'physicalAddress is required.'],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    apartmentNumber: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    governorate: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
