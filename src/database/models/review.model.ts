import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { ReviewInterface } from 'src/review/interface/review.interface';
import { OrderInterface } from 'src/order/interface/order.interface';
import { ProductInterface } from 'src/product/interface/product.interface';

@Injectable()
export class ReviewModel {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewInterface>,
    @InjectModel('Order') private readonly orderModel: Model<OrderInterface>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
  ) {}

  async findProductById(productId: string): Promise<ProductInterface> {
    return await this.productModel.findById(productId);
  }

  async isPurchased(userId: string, productId: string): Promise<boolean> {
    return (await this.orderModel.findOne({ userId, productId }).lean())
      ? true
      : false;
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

  async findReviewById(userId: string) {
    return await this.reviewModel.findById(userId);
  }
}
