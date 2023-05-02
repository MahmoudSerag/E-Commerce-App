import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Injectable, Res } from '@nestjs/common';
import { OrderModel } from 'src/database/models/order.model';
import { Response } from 'express';
import { JWTService } from 'src/helpers/jwt.helper';
import { PaymentService } from 'src/helpers/payment.helper';
import { orderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderModel: OrderModel,
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
    private readonly paymentService: PaymentService,
  ) {}

  async checkout(
    @Res() res: Response,
    accessToken: string,
    body: orderDto,
  ): Promise<any> {
    try {
      const amount = (Math.floor(body.totalPrice) + 1) * 100;

      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const userCart = await this.orderModel.getUserCartItems(decodedToken.id);

      if (!userCart.length)
        return this.errorResponse.handleError(res, 404, 'Cart is empty.');

      for (let i = 0; i < userCart.length; i++)
        if (userCart[i].userId.toString() !== decodedToken.id.toString())
          return this.errorResponse.handleError(res, 403, 'Forbidden.');

      const payment = await this.paymentService.createCharge(amount, body);

      const userPaymentInfo = {
        cardNumber: body.cardNumber,
        expirationMonth: body.expirationMonth,
        expirationYear: body.expirationYear,
        paymentId: payment.id,
        CVC: body.cvc,
        nameOnCard:
          body.nameOnCard ||
          `${decodedToken.firstName} ${decodedToken.lastName}`,
      };

      await this.orderModel.createOrder(userCart, amount, userPaymentInfo);

      return {
        success: true,
        statusCode: 201,
        message: 'Order completed successfully',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getUserOrders(
    @Res() res: Response,
    accessToken: string,
    page: number,
    limit = 10,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const totalOrdersCount = await this.orderModel.countUserOrders(
        decodedToken.id,
      );

      const userOrders = await this.orderModel.findUserOrders(
        decodedToken.id,
        page,
        limit,
      );

      let maxPages = totalOrdersCount / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'User addresses',
        totalOrdersCount,
        addressesPerPage: limit,
        maxPages,
        currentPage: page,
        userOrders: userOrders || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
