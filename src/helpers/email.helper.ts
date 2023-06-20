import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

export class EmailService {
  public generateOTPCode(): number {
    return Math.floor(Math.random() * 999999) + 1;
  }

  private generateHandlebarOptions(): object {
    return {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('src/views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('src/views'),
      extName: '.handlebars',
    };
  }

  private generateMailOptions(userMail: string, otpCode: number): object {
    return {
      from: process.env.EMAIL_SENDER,
      to: userMail,
      subject: 'UnknownSquad Store: 6-digit code',
      text: `Verify you email.`,
      template: 'email',
      context: { otpCode },
    };
  }

  public async sendEmail(userMail: string, otpCode: number): Promise<void> {
    const mailOptions = this.generateMailOptions(userMail, otpCode);
    const handlebarsOptions = this.generateHandlebarOptions();

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transport.use('compile', hbs(handlebarsOptions));

    await transport.sendMail(mailOptions);
  }
}
