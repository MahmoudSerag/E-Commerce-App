import { AuthService } from './auth.service';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { authDto } from './dto/auth.dto';
import { otpCodeDto } from './dto/otp.dto';
import {
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiNotFoundResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() body: authDto): object {
    return this.authService.login(body.email);
  }

  @ApiParam({
    name: 'userId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Verify email',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'User loggedIn successfully',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Post('verify-email/:userId')
  @UsePipes(ValidationPipe)
  verifyEmail(
    @Body() body: otpCodeDto,
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): object {
    return this.authService.verifyEmail(body.otpCode, userId, res);
  }
}
