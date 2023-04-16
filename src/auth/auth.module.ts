import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './../database/schemas/user.schema';
import { AuthModel } from 'src/database/models/auth.model';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { EmailService } from 'src/helpers/email.helper';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, EmailService, AuthModel],
  exports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class AuthModule {}
