import { ReviewService } from './review.service';
import {
  Controller,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
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
}
