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

      const product = await this.reviewModel.getProductById(productId);

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Not Found.');

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
}
