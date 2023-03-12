import * as mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  cardNumber: {
    type: Number,
    required: true,
  },
  careExpireDate: {
    type: Date,
    required: true,
  },
  CVV: {
    type: Number,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: false,
  },
});

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
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
      type: PaymentSchema,
      _id: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
