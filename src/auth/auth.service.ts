import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/helpers/email.helper';
import { AuthModel } from 'src/database/models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly authQueries: AuthModel,
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
        statusCode: error.code,
        isOTPSent: false,
        message: error.message,
        userId: '',
      };
    }
  }
}
