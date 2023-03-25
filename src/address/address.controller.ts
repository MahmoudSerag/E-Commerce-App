import { AddressService } from './address.service';
import { Get, Controller, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import {
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/api/v1/address/')
@ApiTags('Address')
@ApiSecurity('JWT-auth')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOkResponse({
    status: 200,
    description: 'User basic info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'User addresses.',
        totalAddressesCount: 50,
        maxPages: 5,
        currentPage: 3,
        addressesPerPage: 10,
        addresses: [
          {
            _id: '641ee7873cb9a8f2cd158bb4',
            country: 'egypt',
            physicalAddress: 'Egypt - cairo - Shoubra',
            firstName: 'Mahmoud',
            lastName: 'Serag',
            apartmentNumber: 95,
            city: 'cairo',
            governorate: 'cairo',
            postalCode: 11591,
            phoneNumber: '+201064560413',
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get()
  getUserAddresses(
    @Res({ passthrough: true }) res: Response,
    @Query('page') page: string,
  ): object {
    const accessToken: any = res.locals;
    return this.addressService.getUserAddresses(accessToken, Number(page) || 1);
  }
}
