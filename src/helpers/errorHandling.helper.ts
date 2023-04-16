import { BadRequestException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class ErrorResponse {
  static validateRequestBody(error: object[]) {
    const message: object[] = [];

    error.forEach((el) => {
      message.push(el['constraints']);
    });

    throw new BadRequestException({ success: false, statusCode: 400, message });
  }
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

    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || 'Internal server error.',
    });
  }
}
