import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    physicalAddress: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    apartmentNumber: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    governorate: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: false,
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
