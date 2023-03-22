import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly errorResponse: ErrorResponse) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    )
      return this.errorResponse.handleError(res, 'unauthorized');

    const accessToken: any = req.headers.authorization.split(' ')[1];
    res.locals = accessToken;

    next();
  }
}
