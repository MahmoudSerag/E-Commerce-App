import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from 'src/cart/cart.module';
import { AuthModule } from 'src/auth/auth.module';

import { OrderSchema } from 'src/database/schemas/order.schema';
import { OrderModel } from 'src/database/models/order.model';
import { CartModel } from 'src/database/models/cart.model';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaymentService } from 'src/helpers/payment.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    CartModule,
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderModel, CartModel, PaymentService],
  exports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
})
export class OrderModule {}
