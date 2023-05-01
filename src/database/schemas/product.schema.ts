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
    numberOfRates: {
      type: Number,
      default: 0,
    },
    sumOfRates: {
      type: Number,
      default: 0,
    },
    totalRates: {
      type: Number,
      default: 0,
    },
    bestSeller: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
