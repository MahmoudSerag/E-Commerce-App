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
}
