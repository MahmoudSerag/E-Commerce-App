import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/interface/user.interface';

@Injectable()
export class UserModel {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUserById(
    userId: string,
  ): Promise<{ email: string; firstName: string; lastName: string }> {
    return await this.userModel
      .findById(userId)
      .select('email firstName lastName -_id')
      .lean();
  }
}
