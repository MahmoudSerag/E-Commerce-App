import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    otpCode: {
      type: Number,
      default: null,
    },
    otpCreatedAt: {
      type: Date,
      default: null,
    },
    paymentInfo: {
      cardNumber: {
        type: Number,
        required: true,
      },
      expirationMonth: {
        type: Number,
        required: true,
      },
      expirationYear: {
        type: Number,
        required: true,
      },
      paymentId: {
        type: String,
        required: true,
      },
      CVC: {
        type: String,
        required: true,
      },
      nameOnCard: {
        type: String,
        required: false,
      },
      _id: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
