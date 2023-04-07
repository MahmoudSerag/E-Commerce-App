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
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { addressDto } from './dto/address.dto';
import {
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
    return this.addressService.getUserAddresses(
      res,
      accessToken,
      Number(page) || 1,
    );
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'User basic info.',
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
      exceptionFactory() {
        throw new BadRequestException({
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Bad request',
        });
      },
    }),
  )
  addNewAddress(
    @Res({ passthrough: true }) res: Response,
    @Body() body: addressDto,
  ): object {
    const accessToken: any = res.locals;
    return this.addressService.addNewAddress(res, accessToken, body);
  }
}
