import { Res } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  private unauthorized(@Res() res: Response) {
    return res.status(401).json({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    });
  }
  private invalidToken(@Res() res: Response) {
    return res.status(401).json({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid token.',
    });
  }

  private invalidSignature(@Res() res: Response) {
    return res.status(401).json({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid signature.',
    });
  }

  private notFound(@Res() res: Response) {
    return res.status(404).json({
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not found.',
    });
  }

  private forbidden(@Res() res: Response) {
    return res.status(403).json({
      success: false,
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Forbidden.',
    });
  }

  private badRequest(@Res() res: Response) {
    return res.status(400).json({
      success: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Bad request.',
    });
  }

  private serverError(@Res() res: Response) {
    return res.status(500).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Server error.',
    });
  }

  public handleError(@Res() res: Response, message: string) {
    if (message === 'invalid signature') this.invalidSignature(res);
    else if (message === 'invalid signature') this.invalidToken(res);
    else if (message === 'not found') this.notFound(res);
    else if (message === 'forbidden') this.forbidden(res);
    else if (message.startsWith('Cast')) this.badRequest(res);
    else if (message === 'unauthorized') this.unauthorized(res);
    else this.serverError(res);
  }
}
