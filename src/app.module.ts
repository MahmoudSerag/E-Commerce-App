import { Global, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './helpers/jwt.helper';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserController } from './user/user.controller';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
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
  ],
  providers: [JWTService, ErrorResponse],
  exports: [JWTService, ErrorResponse],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
