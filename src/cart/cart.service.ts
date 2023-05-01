import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Injectable, Res } from '@nestjs/common';
import { JWTService } from 'src/helpers/jwt.helper';
import { CartModel } from 'src/database/models/cart.model';
import { ProductModel } from 'src/database/models/product.model';
import { Response } from 'express';
import { cartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartModel: CartModel,
    private readonly productModel: ProductModel,
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
  ) {}

  async addToCart(
    @Res() res: Response,
    accessToken: string,
    productId: string,
    body: cartDto,
  ) {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const product = await this.productModel.getProductById(productId);

      const queryOptions = {
        size: body.size,
        name: product.name,
        price: product.price * body.quantity,
        color: body.color,
        quantity: body.quantity,
        productId,
        userId: decodedToken.id,
      };

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

      const cartItem = await this.cartModel.findCartItem(
        decodedToken.id,
        productId,
        body.size,
        body.color,
      );

      if (!cartItem) this.cartModel.addToCart(queryOptions);
      else {
        cartItem.quantity += body.quantity;
        cartItem.price = product.price * cartItem.quantity;
        cartItem.save();
      }

      return {
        success: true,
        statusCode: 201,
        message: 'Product added successfully.',
      };
    } catch (error) {
      console.log(error);
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
