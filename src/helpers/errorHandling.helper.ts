import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class ErrorResponse {
  public handleError(
    @Res() res: Response,
    statusCode: number,
    message: string,
  ) {
    if (message === 'jwt expired') {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = 'JWT Expired.';
    }

    if (message.startsWith('Cast')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Invalid id.';
    }

    if (message.startsWith('E11000')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = `${message
        .split(':')[2]
        .split('_')[0]
        .trim()} should be unique.`;
    }

    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || 'Internal server error.',
    });
  }
}
