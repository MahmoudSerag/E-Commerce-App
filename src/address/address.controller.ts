import { AddressService } from './address.service';
import {
  Get,
  Controller,
  Res,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { addressDto } from './dto/address.dto';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import {
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiNotFoundResponse,
  apiForbiddenResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiParam,
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
        userAddresses: [
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
    const accessToken: any = res.locals.accessToken;
    return this.addressService.getUserAddresses(
      res,
      accessToken,
      Number(page) || 1,
    );
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Address info.',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'New address added.',
        newAddress: {
          country: 'Egypt',
          physicalAddress: 'Cairo - Egypt',
          firstName: 'Mahmoud',
          lastName: 'Serag',
          apartmentNumber: 13,
          city: 'Shoubra',
          governorate: 'Cairo',
          postalCode: 11519,
          phoneNumber: '+201064560413',
        },
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Post()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  addNewAddress(
    @Res({ passthrough: true }) res: Response,
    @Body() body: addressDto,
  ): object {
    const accessToken: any = res.locals.accessToken;
    return this.addressService.addNewAddress(res, accessToken, body);
  }

  @ApiParam({
    name: 'addressId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Updated address info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Address updated successfully.',
        newAddress: {
          country: 'Egypt',
          physicalAddress: 'Cairo - Egypt',
          firstName: 'Mahmoud',
          lastName: 'Serag',
          apartmentNumber: 13,
          city: 'Shoubra',
          governorate: 'Cairo',
          postalCode: 11519,
          phoneNumber: '+201064560413',
        },
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Patch(':addressId')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  updateAddress(
    @Res({ passthrough: true }) res: Response,
    @Body() body: addressDto,
    @Param('addressId') addressId: string,
  ) {
    const accessToken = res.locals.accessToken;
    return this.addressService.updateAddress(res, accessToken, body, addressId);
  }

  @ApiParam({
    name: 'addressId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiOkResponse({
    status: 204,
    description: 'Deleted address info.',
    schema: {
      example: {
        success: true,
        statusCode: 204,
        message: 'Address deleted successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Delete(':addressId')
  deleteAddress(
    @Res({ passthrough: true }) res: Response,
    @Param('addressId') addressId: string,
  ) {
    const accessToken = res.locals.accessToken;
    return this.addressService.deleteAddress(res, accessToken, addressId);
  }
}
