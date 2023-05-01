import { ProductService } from './product.service';
import { Controller, Res, Get, Query, Param } from '@nestjs/common';
import { Response } from 'express';
import {
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiBadRequestResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiQuery,
  ApiBadRequestResponse,
  ApiParam,
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
  getCardSliderImgs(@Res({ passthrough: true }) res: Response): object {
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
        countedFilteredProducts: 16,
        productsPerPage: 10,
        currentPage: 2,
        maxPages: 2,
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
  getHomePageProducts(@Res({ passthrough: true }) res: Response): object {
    return this.productService.getHomePageProducts(res);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Product search results.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'All products.',
        countedFilteredProducts: 30,
        productsPerPage: 10,
        currentPage: 2,
        maxPages: 3,
        products: [
          {
            _id: '643435e9dd430a8163e979d0',
            name: 'NEON HDD T-SHIRT',
            price: 19.99,
            outOfStock: false,
            img: 'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_GradientHDDShirt_TransparencyFile.png?v=1635878526&width=1100',
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiQuery({
    name: 'outOfStock',
    type: Boolean,
    example: false,
    required: false,
  })
  @ApiQuery({ name: 'maxPrice', type: Number, example: 300, required: false })
  @ApiQuery({ name: 'minPrice', type: Number, example: 50, required: false })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: true })
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('all')
  getAllProducts(
    @Res({ passthrough: true }) res: Response,
    @Query()
    query: {
      page: number;
      outOfStock: boolean;
      minPrice: number;
      maxPrice: number;
    },
  ): object {
    return this.productService.getAllProducts(res, query);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Home page products.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'All products.',
        countedFilteredProducts: 30,
        productsPerPage: 10,
        currentPage: 2,
        maxPages: 3,
        products: [
          {
            _id: '643435e9dd430a8163e979d0',
            name: 'NEON HDD T-SHIRT',
            img: 'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_GradientHDDShirt_TransparencyFile.png?v=1635878526&width=1100',
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: true })
  @ApiQuery({
    name: 'productName',
    type: String,
    example: 'WINDBREAKER',
    required: true,
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('search')
  searchProduct(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { productName: string; page: string },
  ): object {
    return this.productService.searchProduct(res, query);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Product Page info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Product data.',
        products: {
          _id: '6434128729b016ab84333d2d',
          name: 'UNCLE LINUS HOODIE',
          price: 59.99,
          imgs: [
            'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_UncleLinusPotatoSackHoodie_TransparencyFile.png?v=1680287856',
            'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/PotatoSackHoodie2000px-2.jpg?v=1680287856&width=1100',
          ],
          colors: ['red', 'green', 'blue'],
          description:
            "The fast life of YouTube ain't for everybody! If you prefer a slower, farm-grown style, then this is the hoodie for you.With a burlap-esque look",
          sizes: [
            'Small',
            'Medium',
            'Large',
            'X-Large',
            'XX-Large',
            'XXX-Large',
          ],
          productInfo: '100% cotton',
          outOfStock: true,
          totalRates: 3.6,
        },
      },
    },
  })
  @ApiParam({
    name: 'productId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('singleProduct/:productId')
  getProductPage(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
  ): object {
    return this.productService.getProductInfo(res, productId);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Products that related to the retrieved product.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Suggested product.',
        suggestedProducts: [
          {
            _id: '6434128729b016ab84333d2d',
            name: 'UNCLE LINUS HOODIE',
            price: 59.99,
            img: [
              'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_UncleLinusPotatoSackHoodie_TransparencyFile.png?v=1680287856',
            ],
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('suggestedProducts')
  getSuggestedProducts(@Res({ passthrough: true }) res: Response): object {
    return this.productService.getSuggestedProducts(res);
  }
}
