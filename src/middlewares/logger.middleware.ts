import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer') ||
      !req.headers.authorization.split(' ')[1]
    )
      throw new UnauthorizedException({
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized.',
      });

    const accessToken: any = req.headers.authorization.split(' ')[1];
    res.locals.accessToken = accessToken;

    next();
  }
}
