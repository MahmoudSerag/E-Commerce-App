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
}
