import { Injectable, Res } from '@nestjs/common';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Response } from 'express';
import { ProductModel } from 'src/database/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    private readonly errorResponse: ErrorResponse,
    private readonly productModel: ProductModel,
  ) {}

  async getCardSliderImgs(@Res() res: Response): Promise<any> {
    try {
      const cardSlider = await this.productModel.getCardSliderImgs();

      if (!cardSlider)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

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
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

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
      const products = await this.productModel.getAlProducts(query, limit);

      let maxPages = products.countedProducts / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'All products',
        totalIProductsCount: products.countedProducts,
        productsPerPage: limit,
        currentPage: query.page,
        maxPages,
        products: products.finalProducts || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async searchProduct(
    @Res() res: Response,
    query: { productName: string; page: string },
    limit = 4,
  ) {
    try {
      if (!query.productName)
        return this.errorResponse.handleError(
          res,
          400,
          'Product name must be provided',
        );

      const products = await this.productModel.searchProduct(query, limit);

      let maxPages = products.countedProducts / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'Searched products',
        totalIProductsCount: products.countedProducts,
        productsPerPage: limit,
        currentPage: query.page,
        maxPages,
        products: products.finalProducts || [],
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getProductInfo(@Res() res: Response, productId: string): Promise<any> {
    try {
      const product = await this.productModel.getProductById(productId);

      if (!product)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

      return {
        success: true,
        statusCode: 200,
        message: 'Product data.',
        product,
      };

      return;
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getSuggestedProducts(@Res() res: Response): Promise<any> {
    try {
      const suggestedProducts = await this.productModel.getSuggestedProducts();

      if (!suggestedProducts)
        return this.errorResponse.handleError(res, 404, 'Product Not Found.');

      return {
        success: true,
        statusCode: true,
        message: 'Suggested products.',
        suggestedProducts,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
