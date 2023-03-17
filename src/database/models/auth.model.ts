import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Auth } from '../../auth/interface/auth.interface';

@Injectable()
export class AuthModel {
  constructor(@InjectModel('User') private readonly authModel: Model<Auth>) {}
  async findUserByEmail(email: string): Promise<{ _id: string }> {
    return await this.authModel.findOne({ email }).select('_id').lean();
  }

  async createNewUser(email: string, otpCode: number) {
    await this.authModel.create({ email, otpCode, otpCreatedAt: Date.now() });
  }

  async updateUserOTP(email: string, otpCode: number) {
    const otpCreatedAt = new Date(Date.now());
    await this.authModel.findOneAndUpdate({ email }, { otpCode, otpCreatedAt });
  }

  async findUserById(userId: string): Promise<{
    otpCode: number;
    email: string;
    _id: string;
    otpCreatedAt: any;
  }> {
    return await this.authModel
      .findById(userId)
      .select('otpCode email otpCreatedAt')
      .lean();
  }
}
