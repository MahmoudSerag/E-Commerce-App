import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './../database/schemas/address.schema';
import { AddressModel } from 'src/database/models/address.model';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressModel],
})
export class AddressModule {}
