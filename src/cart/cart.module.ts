import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { ProductModel } from 'src/database/models/product.model';

import { CartSchema } from 'src/database/schemas/cart.schema';
import { CartModel } from 'src/database/models/cart.model';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartModel, ProductModel],
  exports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
})
export class CartModule {}
