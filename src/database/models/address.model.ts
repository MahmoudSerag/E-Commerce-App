import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { addressDto } from 'src/address/dto/address.dto';
import { Address } from 'src/address/interface/address.interface';

@Injectable()
export class AddressModel {
  constructor(
    @InjectModel('Address') private readonly addressModel: Model<Address>,
  ) {}

  async findUserAddresses({ userId, page, limit }): Promise<any> {
    const numberOfAddresses = await this.addressModel.count({ userId });

    const userAddresses = await this.addressModel
      .find({ userId })
      .select('-userId')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return { userAddresses, numberOfAddresses };
  }

  async addNewAddress(body: addressDto): Promise<Address> {
    return await this.addressModel.create(body);
  }

  async checkPhysicalAddressUniqueness(
    physicalAddress: string,
    userId: string,
  ): Promise<boolean> {
    return (await this.addressModel.findOne({ physicalAddress, userId }).lean())
      ? true
      : false;
  }

  async findAddressById(addressId: string): Promise<{ userId: string }> {
    return await this.addressModel
      .findById(addressId)
      .select('userId -_id')
      .lean();
  }

  async updateAddressById(addressId: string, body: addressDto): Promise<void> {
    await this.addressModel.findByIdAndUpdate(addressId, body);
  }
}
