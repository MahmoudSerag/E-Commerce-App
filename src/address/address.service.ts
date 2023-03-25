import { Injectable } from '@nestjs/common';
import { AddressModel } from 'src/database/models/address.model';
import { JWTService } from 'src/helpers/jwt.helper';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressModel: AddressModel,
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
  ) {}

  async getUserAddresses(
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
      return this.errorResponse.handleError(error.message);
    }
  }
}
