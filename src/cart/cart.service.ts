import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Injectable, Res } from '@nestjs/common';
import { JWTService } from 'src/helpers/jwt.helper';
import { CartModel } from 'src/database/models/cart.model';
import { ProductModel } from 'src/database/models/product.model';
import { Response } from 'express';
import { cartDto } from './dto/cart.dto';
import { updatedCartDto } from './dto/updateCart.dto';

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
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const product = await this.productModel.getProductById(productId);

      const queryOptions = {
        size: body.size,
        name: product.name,
        totalPrice: product.price * body.quantity,
        productPrice: product.price,
        color: body.color,
        quantity: body.quantity,
        productId,
        userId: decodedToken.id,
      };

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

      const cartItem = await this.cartModel.findSingleCartItem(
        decodedToken.id,
        productId,
        body.size,
        body.color,
      );

      if (!cartItem) this.cartModel.addToCart(queryOptions);
      else {
        cartItem.quantity += body.quantity;
        cartItem.totalPrice = product.price * cartItem.quantity;
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

  async getUserCart(
    @Res() res: Response,
    accessToken: string,
    page: number,
    limit = 10,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const countedCartItems = await this.cartModel.countUserCartItems(
        decodedToken.id,
      );

      const userCartItems = await this.cartModel.getUserCart(
        decodedToken.id,
        page,
        limit,
      );

      let maxPages = countedCartItems / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'User cart.',
        totalItemsCount: countedCartItems,
        itemsPerPage: limit,
        maxPages,
        currentPage: page,
        userCartItems: userCartItems || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async deleteCartItem(
    @Res() res: Response,
    accessToken: string,
    cartId: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const cartItem = await this.cartModel.getCartItemById(cartId);

      if (!cartItem)
        return this.errorResponse.handleError(res, 404, 'Item Not Found.');

      if (cartItem.userId.toString() !== decodedToken.id)
        return this.errorResponse.handleError(res, 403, 'Forbidden.');

      await this.cartModel.deleteCartItemById(cartId);

      return {
        success: true,
        statusCode: 204,
        message: 'Cart item deleted successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async updateCartItem(
    @Res() res: Response,
    accessToken: string,
    cartId: string,
    body: updatedCartDto,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const cartItem = await this.cartModel.getCartItemById(cartId);

      if (!cartItem)
        return this.errorResponse.handleError(res, 404, 'Item Not Found.');

      if (cartItem.userId.toString() !== decodedToken.id)
        return this.errorResponse.handleError(res, 403, 'Forbidden.');

      if (body.quantity === 0)
        return await this.cartModel.deleteCartItemById(cartItem._id);

      await this.cartModel.updateCartItem(cartItem, body.quantity);

      return {
        success: true,
        statusCode: 200,
        message: 'Item updated successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
