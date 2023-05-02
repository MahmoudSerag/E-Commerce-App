import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { ReviewInterface } from 'src/review/interface/review.interface';
import { OrderInterface } from 'src/order/interface/order.interface';
import { ProductInterface } from 'src/product/interface/product.interface';
import { UserInterface } from 'src/user/interface/user.interface';

@Injectable()
export class ReviewModel {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewInterface>,
    @InjectModel('Order') private readonly orderModel: Model<OrderInterface>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async findProductById(productId: string): Promise<ProductInterface> {
    return await this.productModel.findById(productId);
  }

  async isPurchased(userId: string, productId: string): Promise<boolean> {
    const userOrders = await this.orderModel
      .find({ userId })
      .select('productIds -_id')
      .lean();

    for (let i = 0; i < userOrders.length; i++) {
      for (let j = 0; j < userOrders[i].productIds.length; j++) {
        if (userOrders[i].productIds[j].toString() === productId.toString())
          return true;
      }
    }

    return false;
  }

  async isReviewed(userId: string, productId: string): Promise<boolean> {
    return (await this.reviewModel.findOne({ userId, productId }).lean())
      ? true
      : false;
  }

  async addNewReview(
    body: {
      comment: string;
      rate: number;
      productId?: string;
      userId?: string;
    },
    product: ProductInterface,
  ): Promise<{ _id: string; comment: string; rate: number; createdAt: Date }> {
    const newReview = await this.reviewModel.create(body);

    if (newReview) {
      product.numberOfRates += 1;
      product.sumOfRates += body.rate;
      product.totalRates = product.sumOfRates / product.numberOfRates;

      product.save();
    }

    return {
      _id: newReview._id,
      comment: newReview.comment,
      rate: newReview.rate,
      createdAt: newReview['createdAt'],
    };
  }

  async findReviewById(userId: string): Promise<ReviewInterface> {
    return await this.reviewModel.findById(userId);
  }

  async countProductReviews(productId: string): Promise<number> {
    return await this.reviewModel.count({ productId }).lean();
  }

  async getProductsReview(
    productId: string,
    page: number,
    limit: number,
  ): Promise<any> {
    return await this.reviewModel
      .find({ productId })
      .select('userId rate comment')
      .populate({
        path: 'userId',
        select: 'firstName lastName -_id',
        model: this.userModel,
      })
      .skip((page - 1) * limit)
      .lean();
  }
}
