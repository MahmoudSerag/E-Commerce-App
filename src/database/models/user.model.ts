import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/interface/user.interface';

@Injectable()
export class UserModel {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async findUserById(
    userId: string,
  ): Promise<{ email: string; firstName: string; lastName: string }> {
    return await this.userModel
      .findById(userId)
      .select('email firstName lastName -_id')
      .lean();
  }

  async updateUserById(
    userId: string,
    body: { firstName: string; lastName: string },
  ): Promise<{ firstName: string; lastName: string }> {
    await this.userModel.findByIdAndUpdate(userId, body);

    return { firstName: body.firstName, lastName: body.lastName };
  }
}
