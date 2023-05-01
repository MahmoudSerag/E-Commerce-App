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
  Delete,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import {
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
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
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { cartDto } from './dto/cart.dto';
import { updatedCartDto } from './dto/updateCart.dto';

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

  @ApiOkResponse({
    status: 200,
    description: 'User cart.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'User cart.',
        totalItemsCount: 14,
        itemsPerPage: 10,
        maxPages: 2,
        currentPage: 1,
        userCartItems: [
          {
            _id: '64501725c793057fac35843d',
            size: 'XX-Large',
            name: 'NEON MOTHERBOARD T-SHIRT',
            productPrice: 19.99,
            totalPrice: 79.96,
            color: 'blue',
            quantity: 4,
            productId: '643417b02e1b398d93b11eef',
          },
          `{ ............. }`,
        ],
      },
    },
  })
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

  @ApiParam({
    name: 'cartId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiOkResponse({
    status: 204,
    description: 'User cart.',
    schema: {
      example: {
        success: true,
        statusCode: 204,
        message: 'Cart item deleted successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Delete(':cartId')
  deleteItemFromCart(
    @Res({ passthrough: true }) res: Response,
    @Param('cartId') cartId: string,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.cartService.deleteCartItem(res, accessToken, cartId);
  }

  @ApiParam({
    name: 'cartId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Update cart item.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Item updated successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Patch(':cartId')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  updateCartItem(
    @Res({ passthrough: true }) res: Response,
    @Param('cartId') cartId: string,
    @Body() body: updatedCartDto,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.cartService.updateCartItem(res, accessToken, cartId, body);
  }
}
