import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './../database/schemas/user.schema';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { EmailService } from 'src/helpers/email.helper';
import { AuthModel } from 'src/database/models/auth.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, EmailService, AuthModel],
})
export class AuthModule {}