import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductInterface } from 'src/product/interface/product.interface';

@Injectable()
export class ProductModel {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
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

  async getHomePageProducts(): Promise<{
    inStockProducts: object[];
    outOfStockProducts: object;
    bestSellerProducts: object[];
  }> {
    const inStockProducts = await this.getInStockHighestRatedProducts();
    const outOfStockProducts = await this.getOutOfStockHighestRatedProducts();
    const bestSellerProducts = await this.getBestSellerProducts();

    return { inStockProducts, outOfStockProducts, bestSellerProducts };
  }

  private async countFilteredProducts(query: object): Promise<number> {
    return await this.productModel.count(query).lean();
  }

  async getAlProducts(
    query: {
      page: number;
      outOfStock: string;
      minPrice: number;
      maxPrice: number;
    },
    limit: number,
  ): Promise<{ finalProducts: object; countedProducts: number }> {
    type Product = {
      _id: string;
      name: string;
      price: number;
      outOfStock: boolean;
      img: string;
    };
    const { outOfStock, minPrice, maxPrice } = query;
    const finalProducts: Product[] = [];
    const page = Number(query.page) || 1;
    const queryOptions: any = {};

    if (outOfStock === 'true' || outOfStock === 'false')
      queryOptions.outOfStock = outOfStock;

    if (Number(minPrice) && Number(maxPrice))
      queryOptions.price = { $gte: minPrice, $lte: maxPrice };
    else if (Number(minPrice)) queryOptions.price = { $gte: minPrice };
    else if (Number(maxPrice)) queryOptions.price = { $lte: maxPrice };

    const countedProducts = await this.countFilteredProducts(queryOptions);

    const products = await this.productModel
      .find(queryOptions)
      .lean()
      .select('name price outOfStock imgs')
      .limit(limit)
      .skip((page - 1) * limit);

    products.forEach((el) => {
      const randomImage = Math.floor(Math.random() * el.imgs.length);
      finalProducts.push({
        _id: el._id,
        name: el.name,
        price: el.price,
        outOfStock: el.outOfStock,
        img: el.imgs[randomImage],
      });
    });

    return { finalProducts, countedProducts };
  }

  async searchProduct(
    query: { productName: string; page: string },
    limit: number,
  ): Promise<{ finalProducts: object; countedProducts: number }> {
    type Product = { _id: string; name: string; img: string };
    const productName = query.productName;
    const page = Number(query.page) || 1;
    const finalProducts: Product[] = [];

    const productQuery: any = {};
    if (productName)
      productQuery.name = { $regex: new RegExp(productName, 'i') };

    const countedProducts = await this.countFilteredProducts(productQuery);

    const products = await this.productModel
      .find(productQuery)
      .lean()
      .select('name imgs')
      .limit(limit)
      .skip((page - 1) * limit);

    products.forEach((el) => {
      const randomImage = Math.floor(Math.random() * el.imgs.length);
      finalProducts.push({
        _id: el._id,
        name: el.name,
        img: el.imgs[randomImage],
      });
    });

    return { finalProducts, countedProducts };
  }

  async getProductById(productId: string): Promise<ProductInterface> {
    return await this.productModel
      .findById(productId)
      .select(
        '-numberOfRates -bestSeller -sumOfRates -createdAt -updatedAt -__v',
      )
      .lean();
  }

  async getSuggestedProducts(): Promise<
    { _id: string; name: string; price: number; img: string }[]
  > {
    type Product = { _id: string; name: string; price: number; img: string };
    const finalProducts: Product[] = [];

    const suggestedProducts = await this.productModel
      .find()
      .select('name price imgs')
      .limit(10)
      .lean();

    suggestedProducts.forEach((el) => {
      const randomImage = Math.floor(Math.random() * el.imgs.length);
      finalProducts.push({
        _id: el._id,
        name: el.name,
        price: el.price,
        img: el.imgs[randomImage],
      });
    });

    return finalProducts;
  }
}
