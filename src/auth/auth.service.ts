import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { EmailService } from 'src/helpers/email.helper';
import { AuthModel } from 'src/database/models/auth.model';
import { JWTService } from 'src/helpers/jwt.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly authQueries: AuthModel,
    private readonly jwtService: JWTService,
  ) {}
  async login(email: string): Promise<object> {
    try {
      const user = await this.authQueries.findUserByEmail(email);

      const otpCode = this.emailService.generateOTPCode();

      if (!user) await this.authQueries.createNewUser(email, otpCode);
      else await this.authQueries.updateUserOTP(email, otpCode);

      await this.emailService.sendEmail(email, otpCode);

      return {
        success: true,
        statusCode: 201,
        isOTPSent: true,
        message: 'Verify your mail.',
        userId: user._id,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.status || error.code || 500,
        isOTPSent: false,
        message: error.message,
        userId: '',
      };
    }
  }

  async verifyEmail(otpCode: number, userId: string): Promise<object> {
    try {
      const user = await this.authQueries.findUserById(userId);

      // Check if otpCode expired
      const isOtpExpired =
        (Date.now() - user.otpCreatedAt) / (1000 * 60) >
        parseInt(process.env.OTP_CODE_EXPIRES_IN);
      if (user.otpCode !== otpCode || isOtpExpired)
        throw new HttpException(
          'Incorrect or expired code, Try again.',
          HttpStatus.BAD_REQUEST,
        );

      const payload = { email: user.email, id: user._id };
      const accessToken = this.jwtService.signJWT(payload);

      return {
        success: true,
        statusCode: 201,
        message: 'User loggedIn successfully.',
        accessToken,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.status || error.code || 500,
        message: error.message,
        token: '',
      };
    }
  }
}
