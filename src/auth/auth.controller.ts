import { AuthService } from './auth.service';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { authDto } from './dto/auth.dto';
import { otpCodeDto } from './dto/otp.dto';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() body: authDto): object {
    return this.authService.login(body.email);
  }

  @Post('verify-email/:userId')
  @UsePipes(ValidationPipe)
  verifyEmail(
    @Body() body: otpCodeDto,
    @Param('userId') userId: string,
  ): object {
    return this.authService.verifyEmail(body.otpCode, userId);
  }
}
