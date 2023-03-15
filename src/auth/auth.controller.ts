import { AuthService } from './auth.service';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { authDto } from './dto/auth.dto';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: authDto): Promise<object> {
    return this.authService.login(body.email);
  }
}
