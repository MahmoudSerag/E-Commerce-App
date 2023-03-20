import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers ||
      !req.headers['x-authorization'] ||
      !req.headers['x-authorization'].slice(7)
    )
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized.',
        },
        HttpStatus.UNAUTHORIZED,
      );

    next();
  }
}
