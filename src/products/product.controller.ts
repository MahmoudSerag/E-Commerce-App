import { ProductService } from './product.service';
import { Controller, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import {
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/api/v1/products/')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse({
    status: 200,
    description: 'Card slider info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Card slider imgs.',
        cardSlider: [
          {
            _id: '6434363bdd430a8163e979d5',
            img: 'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_MysteryHoodie_ProductPhoto_1.png?v=1669657563&width=1100',
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('slider')
  getCardSliderImgs(@Res({ passthrough: true }) res: Response) {
    return this.productService.getCardSliderImgs(res);
  }
}
