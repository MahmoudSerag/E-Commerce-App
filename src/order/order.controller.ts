import { OrderService } from './order.service';
import {
  Controller,
  Res,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import {
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiBadRequestResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiSecurity,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { orderDto } from './dto/order.dto';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';

@Controller('/api/v1/order/')
@ApiTags('Order')
@ApiSecurity('JWT-auth')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Address info.',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Order completed successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Post('checkout')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  checkout(
    @Res({ passthrough: true }) res: Response,
    @Body() body: orderDto,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.orderService.checkout(res, accessToken, body);
  }

  @ApiOkResponse({
    status: 201,
    description: 'Address info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'User addresses',
        totalOrdersCount: 2,
        addressesPerPage: 10,
        maxPages: 1,
        currentPage: 1,
        userOrders: [
          {
            '643417b02e1b398d93b11eef': {
              _id: '643417b02e1b398d93b11eef',
              name: 'NEON MOTHERBOARD T-SHIRT',
              price: 19.99,
              quantity: 3,
              totalPrice: 59.97,
            },
            '64341976cc1c4831f95baf21': {
              _id: '64341976cc1c4831f95baf21',
              name: 'WINDBREAKER',
              price: 119.99,
              quantity: 4,
              totalPrice: 479.96,
            },
          },
          `{ .............. }`,
        ],
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get()
  getUserOrders(
    @Res({ passthrough: true }) res: Response,
    @Query('page') page: string,
  ): object {
    const accessToken = res.locals.accessToken;
    return this.orderService.getUserOrders(res, accessToken, Number(page) || 1);
  }
}
