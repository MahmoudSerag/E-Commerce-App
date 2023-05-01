import { CartService } from './cart.service';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import {
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { cartDto } from './dto/cart.dto';

@Controller('/api/v1/cart/')
@ApiTags('Cart')
@ApiSecurity('JWT-auth')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiParam({
    name: 'productId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Add product to cart.',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Product added successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Post(':productId')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  addToCart(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
    @Body() body: cartDto,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.cartService.addToCart(res, accessToken, productId, body);
  }

  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get()
  getUserCart(
    @Res({ passthrough: true }) res: Response,
    @Query('page') page: string,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.cartService.getUserCart(res, accessToken, Number(page) || 1);
  }
}
