import {
  Global,
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';

import { JWTService } from './helpers/jwt.helper';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';

import { LoggerMiddleware } from './middlewares/logger.middleware';

import { UserController } from './user/user.controller';
import { ReviewController } from './review/review.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    AuthModule,
    UserModule,
    AddressModule,
    ProductModule,
    ReviewModule,
    OrderModule,
  ],
  providers: [JWTService, ErrorResponse],
  exports: [JWTService, ErrorResponse],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UserController,
        { path: 'api/v1/address', method: RequestMethod.ALL },
        { path: 'api/v1/address/:addressId', method: RequestMethod.ALL },
        ReviewController,
      );
  }
}
