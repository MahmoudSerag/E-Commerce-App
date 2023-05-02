import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { OrderInterface } from 'src/order/interface/order.interface';
import { CartInterface } from 'src/cart/interface/cart.interface';
import { UserInterface } from 'src/user/interface/user.interface';

@Injectable()
export class OrderModel {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderInterface>,
    @InjectModel('Cart') private readonly cartModel: Model<CartInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async getUserCartItems(userId: string): Promise<CartInterface[]> {
    return await this.cartModel
      .find({ userId })
      .select('userId productId -_id')
      .lean();
  }

  async deleteAllUserCartItems(userId: string): Promise<void> {
    await this.cartModel.deleteMany({ userId });
  }

  async updateUserPaymentInfo(userId: string, paymentInfo: any): Promise<any> {
    return await this.userModel.findByIdAndUpdate(userId, { paymentInfo });
  }

  async createOrder(
    userCart: { userId: string; productId: string }[],
    price: number,
    paymentInfo: any,
  ) {
    const userId = userCart[0].userId;
    const productIds: string[] = [];

    userCart.forEach((el) => productIds.push(el.productId));

    await this.orderModel.create({ userId, productIds, price });

    await this.updateUserPaymentInfo(userId, paymentInfo);

    await this.deleteAllUserCartItems(userId);
  }

  async findUserOrders(
    userId: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const finalOrders = [];
    const userOrders = await this.orderModel
      .find({ userId })
      .select('price userId productIds -_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: 'productIds', select: 'name  price' })
      .lean();

    userOrders.forEach((el) => {
      const uniqueProducts: any = {};
      el.productIds.forEach((product: any) => {
        const { _id, name, price } = product;
        if (!uniqueProducts[_id]) {
          uniqueProducts[_id] = {
            _id,
            name,
            price,
            quantity: 1,
            totalPrice: price,
          };
        } else {
          uniqueProducts[_id].quantity++;
          uniqueProducts[_id].totalPrice = uniqueProducts[_id].quantity * price;
        }
      });

      uniqueProducts.orderPrice = el.price / 100;
      uniqueProducts.userId = el.userId;

      finalOrders.push(uniqueProducts);
    });

    return finalOrders;
  }

  async countUserOrders(userId: string): Promise<number> {
    return await this.orderModel.count({ userId }).lean();
  }
}
