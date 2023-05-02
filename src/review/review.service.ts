import { Injectable, Res } from '@nestjs/common';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { ReviewModel } from 'src/database/models/review.model';
import { JWTService } from 'src/helpers/jwt.helper';
import { Response } from 'express';

@Injectable()
export class ReviewService {
  constructor(
    private readonly errorResponse: ErrorResponse,
    private readonly reviewModel: ReviewModel,
    private readonly jwtService: JWTService,
  ) {}

  async addNewReview(
    @Res() res: Response,
    accessToken: string,
    productId: string,
    body: {
      comment: string;
      rate: number;
      productId?: string;
      userId?: string;
    },
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const userId = decodedToken.id;
      body.userId = userId;
      body.productId = productId;

      const product = await this.reviewModel.findProductById(productId);

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

      const isPurchased = await this.reviewModel.isPurchased(userId, productId);

      if (!isPurchased)
        return this.errorResponse.handleError(
          res,
          400,
          'User must buy this product first before review it.',
        );

      const isReviewed = await this.reviewModel.isReviewed(userId, productId);

      if (isReviewed)
        return this.errorResponse.handleError(
          res,
          400,
          'Review already exist.',
        );

      const newReview = await this.reviewModel.addNewReview(body, product);

      newReview['firstName'] = decodedToken.firstName;
      newReview['lastName'] = decodedToken.lastName;

      return {
        success: true,
        statusCode: 201,
        message: 'Review added successfully.',
        newReview,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async deleteReview(
    @Res() res: Response,
    accessToken: string,
    reviewId: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const review = await this.reviewModel.findReviewById(reviewId);

      if (!review)
        return this.errorResponse.handleError(res, 404, 'Review Not Found.');

      if (review.userId.toString() !== decodedToken.id.toString())
        return this.errorResponse.handleError(res, 403, 'Forbidden');

      const product = await this.reviewModel.findProductById(review.productId);

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found ');

      product.numberOfRates -= 1;
      product.sumOfRates -= review.rate;
      product.totalRates = product.sumOfRates / product.numberOfRates;
      product.save();

      review.delete();

      return {
        success: true,
        statusCode: 200,
        message: 'Review deleted successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async updateReview(
    @Res() res: Response,
    accessToken: string,
    reviewId: string,
    body: { comment: string; rate: number },
  ) {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const review = await this.reviewModel.findReviewById(reviewId);

      if (!review)
        return this.errorResponse.handleError(res, 404, 'Review Not Found.');

      if (review.userId.toString() !== decodedToken.id.toString())
        return this.errorResponse.handleError(res, 403, 'Forbidden');

      const product = await this.reviewModel.findProductById(review.productId);

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

      product.sumOfRates += body.rate - review.rate;
      product.totalRates = product.sumOfRates / product.numberOfRates;
      product.save();

      review.rate = body.rate;
      review.comment = body.comment;
      review.save();

      return {
        success: true,
        statusCode: 200,
        message: 'Review updated successfully.',
        review: {
          _id: review._id,
          comment: review.comment,
          rate: review.rate,
          updatedAt: review['updatedAt'],
        },
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getProductReviews(
    @Res() res: Response,
    productId: string,
    page: number,
    limit = 10,
  ): Promise<any> {
    try {
      const product = await this.reviewModel.findProductById(productId);

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found');

      const countedReviews = await this.reviewModel.countProductReviews(
        productId,
      );

      const productReviews = await this.reviewModel.getProductsReview(
        productId,
        page,
        limit,
      );

      let maxPages = countedReviews / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'Product reviews',
        totalIReviewsCount: countedReviews,
        reviewsPerPage: limit,
        currentPage: page,
        maxPages,
        reviews: productReviews || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
