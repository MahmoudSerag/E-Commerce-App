import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

import { ReviewSchema } from 'src/database/schemas/review.schema';
import { ReviewModel } from 'src/database/models/review.model';

import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
    OrderModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewModel],
})
export class ReviewModule {}
