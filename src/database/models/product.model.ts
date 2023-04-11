import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from 'src/products/interface/product.interface';

@Injectable()
export class ProductModel {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getCardSliderImgs(): Promise<{ _id: string; img: string }[]> {
    type Card = { _id: string; img: string };
    const result: Card[] = [];

    const cardSlider = await this.productModel
      .find()
      .select('imgs')
      .limit(5)
      .sort({ _id: -1 })
      .lean();

    cardSlider.forEach((el) => {
      const randomImage = Math.floor(Math.random() * el.imgs.length);
      result.push({ _id: el._id, img: el.imgs[randomImage] });
    });

    return result;
  }

  private async getInStockHighestRatedProducts(): Promise<object[]> {
    type Product = {
      _id: string;
      name: string;
      price: number;
      img: string;
      outOfStock: boolean;
    };
    const inStockHighestRatedProducts: Product[] = [];

    const products = await this.productModel
      .find({ outOfStock: false })
      .limit(2)
      .sort({ totalRates: -1 })
      .select('name price imgs outOfStock')
      .lean();

    products.forEach((el) => {
      const randomImage = Math.floor(Math.random() * el.imgs.length);
      inStockHighestRatedProducts.push({
        _id: el._id,
        name: el.name,
        price: el.price,
        img: el.imgs[randomImage],
        outOfStock: el.outOfStock,
      });
    });

    return inStockHighestRatedProducts;
  }
  private async getOutOfStockHighestRatedProducts(): Promise<object> {
    const outOfStockHighestRatedProducts = {};

    const product = await this.productModel
      .findOne({ outOfStock: true })
      .sort({ totalRates: -1 })
      .select('name price imgs outOfStock')
      .lean();

    const randomImage = Math.floor(Math.random() * product.imgs.length);

    outOfStockHighestRatedProducts['_id'] = product._id;
    outOfStockHighestRatedProducts['name'] = product.name;
    outOfStockHighestRatedProducts['price'] = product.price;
    outOfStockHighestRatedProducts['img'] = product.imgs[randomImage];
    outOfStockHighestRatedProducts['outOfStock'] = product.outOfStock;

    return outOfStockHighestRatedProducts;
  }

  private async getBestSellerProducts(): Promise<object[]> {
    type Product = {
      _id: string;
      name: string;
      price: number;
      img: string;
      outOfStock: boolean;
    };
    const bestSellerProducts: Product[] = [];

    const products = await this.productModel
      .find({ outOfStock: false })
      .limit(6)
      .sort({ bestSeller: -1 })
      .select('name price imgs outOfStock')
      .lean();

    products.forEach((el) => {
      const randomImage = Math.floor(Math.random() * el.imgs.length);
      bestSellerProducts.push({
        _id: el._id,
        name: el.name,
        price: el.price,
        img: el.imgs[randomImage],
        outOfStock: el.outOfStock,
      });
    });

    return bestSellerProducts;
  }

  async getHomePageProducts() {
    const inStockProducts = await this.getInStockHighestRatedProducts();
    const outOfStockProducts = await this.getOutOfStockHighestRatedProducts();
    const bestSellerProducts = await this.getBestSellerProducts();

    return { inStockProducts, outOfStockProducts, bestSellerProducts };
  }
}
