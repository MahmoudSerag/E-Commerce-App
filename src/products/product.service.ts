import { Injectable, Res } from '@nestjs/common';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Response } from 'express';
import { ProductModel } from 'src/database/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    private errorResponse: ErrorResponse,
    private productModel: ProductModel,
  ) {}

  async getCardSliderImgs(@Res() res: Response) {
    try {
      const cardSlider = await this.productModel.getCardSliderImgs();

      if (!cardSlider)
        return this.errorResponse.handleError(res, 404, 'Not Found.');

      return {
        success: true,
        statusCode: 200,
        message: 'Card slider imgs',
        cardSlider,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getHomePageProducts(@Res() res: Response): Promise<any> {
    try {
      const homePageProducts = await this.productModel.getHomePageProducts();
      const { inStockProducts, outOfStockProducts, bestSellerProducts } =
        homePageProducts;

      if (!inStockProducts && !outOfStockProducts && !bestSellerProducts)
        return this.errorResponse.handleError(res, 404, 'Not Found.');

      return {
        success: true,
        statusCode: 200,
        message: 'Home page products.',
        inStockHighestRatedProducts: inStockProducts || [],
        outOfStockHighestRatedProducts: outOfStockProducts || {},
        bestSellerProducts: bestSellerProducts || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getAllProducts(
    @Res() res: Response,
    query: any,
    limit = 10,
  ): Promise<any> {
    try {
      const countedFilteredProducts = (
        await this.productModel.getAlProducts(query, limit)
      ).countedProducts;

      const products = (await this.productModel.getAlProducts(query, limit))
        .finalProducts;

      let maxPages = countedFilteredProducts / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'All products',
        countedFilteredProducts,
        productsPerPage: limit,
        currentPage: query.page,
        maxPages,
        products: products || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
