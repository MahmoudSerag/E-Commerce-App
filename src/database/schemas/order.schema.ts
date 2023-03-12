import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  },
);
