import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CartInterface } from 'src/cart/interface/cart.interface';

@Injectable()
export class CartModel {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartInterface>,
  ) {}

  async addToCart(body: object): Promise<void> {
    await this.cartModel.create(body);
  }

  async findCartItem(
    userId: string,
    productId: string,
    size: string,
    color: string,
  ): Promise<CartInterface> {
    return await this.cartModel.findOne({ userId, productId, size, color });
  }
}
