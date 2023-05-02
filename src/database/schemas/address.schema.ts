import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    physicalAddress: {
      type: String,
      required: true,
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
    phoneNumber: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
