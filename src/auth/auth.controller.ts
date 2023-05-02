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
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
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
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/auth/')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Verify email',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Verify your email.',
        userId: '56cb91bdc3464f14678934ca',
      },
    },
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Post('login')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: authDto,
  ): object {
    return this.authService.login(res, body.email);
  }

  @ApiParam({
    name: 'userId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
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
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  verifyEmail(
    @Res({ passthrough: true }) res: Response,
    @Body() body: otpCodeDto,
    @Param('userId') userId: string,
  ): object {
    return this.authService.verifyEmail(res, body.otpCode, userId);
  }
}
