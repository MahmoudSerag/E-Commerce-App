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

      const { totalAddressesCount, userAddresses } =
        await this.addressModel.findUserAddresses(queryOptions);

      let maxPages = totalAddressesCount / limit;
      if (maxPages % 1 !== 0) maxPages = Math.floor(maxPages) + 1;

      return {
        success: true,
        statusCode: 200,
        message: 'User addresses',
        totalAddressesCount,
        addressesPerPage: limit,
        maxPages,
        currentPage: page,
        userAddresses: userAddresses || [],
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

      if (
        await this.addressModel.checkPhysicalAddressUniqueness(
          body.physicalAddress,
          decodedToken.id,
        )
      )
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

  async updateAddress(
    @Res() res: Response,
    accessToken: string,
    body: addressDto,
    addressId: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const address = await this.addressModel.findAddressById(addressId);

      if (!address)
        return this.errorResponse.handleError(res, 404, 'Address Not Found.');

      if (address.userId.toString() !== decodedToken.id.toString())
        return this.errorResponse.handleError(res, 403, 'Forbidden.');

      if (
        await this.addressModel.checkPhysicalAddressUniqueness(
          body.physicalAddress,
          decodedToken.id,
        )
      )
        return this.errorResponse.handleError(
          res,
          400,
          'physicalAddress should be unique.',
        );

      await this.addressModel.updateAddressById(addressId, body);

      return {
        success: true,
        statusCode: 200,
        message: 'Address updated successfully.',
        updatedAddress: body,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async deleteAddress(
    @Res() res: Response,
    accessToken: string,
    addressId: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const address = await this.addressModel.findAddressById(addressId);

      if (!address)
        return this.errorResponse.handleError(res, 404, 'Address Not Found.');

      if (address.userId.toString() !== decodedToken.id.toString())
        return this.errorResponse.handleError(res, 403, 'Forbidden.');

      await this.addressModel.deleteAddressById(addressId);
      return {
        success: true,
        statusCode: 200,
        message: 'Address deleted successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
