import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/database/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
})
export class OrderModule {}
