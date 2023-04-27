import { ReviewService } from './review.service';
import {
  Controller,
  Param,
  Query,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { reviewDto } from './dto/review.dto';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import {
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiTags,
  ApiSecurity,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import {
  apiBadRequestResponse,
  apiUnauthorizedResponse,
  apiNotFoundResponse,
  apiInternalServerErrorResponse,
  apiForbiddenResponse,
} from 'src/helpers/swagger.helper';

@ApiTags('Review')
@ApiSecurity('JWT-auth')
@Controller('/api/v1/reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @ApiParam({
    name: 'productId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Review info.',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Review added successfully.',
        NewReview: {
          _id: '5cabe64dcf0d4447fa60f5e2',
          firstName: 'Mahmoud',
          lastName: 'Serag',
          comment: 'Nice product.',
          rate: 4,
          createdAt: '2023-04-10T23:44:56.289Z',
        },
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Post('addNewReview/:productId')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  addNewReview(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
    @Body() body: reviewDto,
  ): object {
    const accessToken: string = res.locals.accessToken;

    return this.reviewService.addNewReview(res, accessToken, productId, body);
  }

  @ApiParam({
    name: 'reviewId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted Review.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Review deleted successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Delete(':reviewId')
  deleteReview(
    @Res({ passthrough: true }) res: Response,
    @Param('reviewId') reviewId: string,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.reviewService.deleteReview(res, accessToken, reviewId);
  }

  @ApiParam({
    name: 'reviewId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Updated Review.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Review updated successfully.',
        review: {
          _id: '643af0017bd01af6fd240990',
          comment: 'Nice Product',
          rate: 3,
          updatedAt: '2023-04-17T14:34:27.036Z',
        },
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Patch(':reviewId')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  updateReview(
    @Res({ passthrough: true }) res: Response,
    @Param('reviewId') reviewId: string,
    @Body() body: reviewDto,
  ) {
    const accessToken = res.locals.accessToken;
    return this.reviewService.updateReview(res, accessToken, reviewId, body);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Product reviews.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Product reviews',
        totalIReviewsCount: 1,
        reviewsPerPage: 10,
        currentPage: 1,
        maxPages: 1,
        reviews: [
          {
            _id: '643aee5c102c810a7f015ea1',
            userId: {
              firstName: 'Ahmed',
              lastName: 'Serag',
            },
            rate: 3,
            comment: 'This product is amazing',
          },
        ],
      },
    },
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get(':productId')
  getProductReviews(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
    @Query('page') page: string,
  ) {
    return this.reviewService.getProductReviews(
      res,
      productId,
      Number(page) || 1,
    );
  }
}
