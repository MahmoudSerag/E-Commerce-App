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

  @ApiOkResponse({
    status: 200,
    description: 'Home page products.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Home page products.',
        inStockHighestRatedProducts: [
          {
            _id: '64343450f12b4bff9ed4f33a',
            name: 'TECHQUICKIE COLOR BLOCK HOODIE',
            price: 49.99,
            img: 'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/ColorBlockHoodie2000px-24_3919b3c4-7619-4437-9fee-1c8c9f91e411.jpg?v=1679093670&width=1100',
            outOfStock: false,
          },
          `{ ............ }`,
        ],
        outOfStockHighestRatedProducts: {
          _id: '64341f00c44bd43e6c192eb8',
          name: 'NEON HDD T-SHIRT',
          price: 19.99,
          img: 'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/HDDBlueandPurpleShirt-2000pxForWeb-23.jpg?v=1635798763&width=1100',
          outOfStock: true,
        },
        bestSellerProducts: [
          {
            _id: '643435d1dd430a8163e979cd',
            name: 'NEON MOTHERBOARD T-SHIRT',
            price: 19.99,
            img: 'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/NeonMotherboardTShirt2000px-1.jpg?v=1680888977&width=1100',
            outOfStock: false,
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('home')
  getProductsForHomePage(@Res({ passthrough: true }) res: Response) {
    return this.productService.getHomePageProducts(res);
  }
}
