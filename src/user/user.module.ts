import { UserModel } from './../database/models/user.model';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';

// import { ErrorResponse } from 'src/helpers/errorHandling.helper';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserModel],
})
export class UserModule {}
