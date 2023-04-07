import { Injectable, Res } from '@nestjs/common';
import { AddressModel } from 'src/database/models/address.model';
import { JWTService } from 'src/helpers/jwt.helper';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Response } from 'express';

import { addressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressModel: AddressModel,
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
  ) {}

  async getUserAddresses(
    @Res() res: Response,
    accessToken: string,
    page: number,
    limit = 10,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const queryOptions = { userId: decodedToken.id, page, limit };

      const addresses = await this.addressModel.findUserAddresses(queryOptions);

      return {
        success: true,
        statusCode: 200,
        message: 'User addresses',
        totalAddressesCount: addresses.numberOfAddresses,
        maxPages: Math.floor(addresses.numberOfAddresses / limit) + 1,
        currentPage: page,
        addressesPerPage: limit,
        addresses: addresses.userAddresses || [],
      };
    } catch (error) {
      this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async addNewAddress(
    @Res() res: Response,
    accessToken: string,
    body: addressDto,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const isPhysicalAddressUnique =
        await this.addressModel.checkIfPhysicalAddressUnique(
          body.physicalAddress,
          decodedToken.id,
        );

      if (isPhysicalAddressUnique)
        return this.errorResponse.handleError(
          res,
          400,
          'physicalAddress should be unique.',
        );

      body['userId'] = decodedToken.id;

      const newAddress = await this.addressModel.addNewAddress(body);

      return {
        success: true,
        statusCode: 201,
        message: 'New address created successfully.',
        newAddress,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
