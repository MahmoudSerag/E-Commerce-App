import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgs: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    productInfo: {
      type: String,
      required: true,
    },
    outOfStock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
