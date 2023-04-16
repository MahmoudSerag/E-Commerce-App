import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Injectable, Res } from '@nestjs/common';
import { EmailService } from 'src/helpers/email.helper';
import { AuthModel } from 'src/database/models/auth.model';
import { JWTService } from 'src/helpers/jwt.helper';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly authQueries: AuthModel,
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
  ) {}
  async login(@Res() res: Response, email: string): Promise<any> {
    try {
      let user = await this.authQueries.findUserByEmail(email);

      const otpCode = this.emailService.generateOTPCode();

      if (!user) user = await this.authQueries.createNewUser(email, otpCode);
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
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async verifyEmail(
    @Res() res: Response,
    otpCode: number,
    userId: string,
  ): Promise<any> {
    try {
      const user = await this.authQueries.findUserById(userId);

      if (!user)
        return this.errorResponse.handleError(res, 404, 'User Not Found.');

      if (!user.otpCreatedAt || !user.otpCode)
        return this.errorResponse.handleError(
          res,
          400,
          'Incorrect or expired Code.',
        );

      const isOtpExpired: boolean =
        (Date.now() - user.otpCreatedAt) / (1000 * 60) >= 15;
      if (user.otpCode !== otpCode || isOtpExpired)
        return this.errorResponse.handleError(
          res,
          400,
          'Incorrect or expired Code.',
        );

      const payload = {
        email: user.email,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const accessToken = this.jwtService.signJWT(payload);

      user.otpCode = null;
      user.otpCreatedAt = null;
      user.save();

      return {
        success: true,
        statusCode: 201,
        message: 'User loggedIn successfully.',
        accessToken,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
