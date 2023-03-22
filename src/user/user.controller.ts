import { UserService } from './user.service';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/api/v1/user')
@ApiTags('User')
@ApiSecurity('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: `Note: firstName and lastName properties should be null when user login first time, You can update it with API: <b>api/v1/user/profile/updateName</b>`,
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
  getUserBasicInfo(@Res({ passthrough: true }) res: Response): object {
    const accessToken: any = res.locals;
    return this.userService.getUserBasicInfo(accessToken, res);
  }
}
