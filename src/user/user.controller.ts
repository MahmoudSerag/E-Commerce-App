import { UserService } from './user.service';
import { Controller, Get, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  apiHeader,
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiHeader(apiHeader)
  @ApiOperation({
    description: `Note: firstName and lastName properties should be null when user login first time,  because you don't send it in the login api, Therefore he doesn't has firstName or lastName.`,
  })
  @ApiOkResponse({
    status: 200,
    description: 'User basic info.',
    schema: {
      example: {
        email: 'John@example.com',
        firstName: 'John OR null',
        lastName: 'Doe OR null',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('profile')
  getUserBasicInfo(
    @Headers('x-authorization') authorization: string,
    @Res({ passthrough: true }) res: Response,
  ): object {
    const accessToken = authorization.split(' ')[1];
    return this.userService.getUserBasicInfo(accessToken, res);
  }
}
