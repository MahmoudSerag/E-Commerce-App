import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  private invalidSignature() {
    throw new UnauthorizedException({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid signature.',
    });
  }

  private jwtExpired() {
    throw new UnauthorizedException({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Jwt expired.',
    });
  }

  private notFound() {
    throw new NotFoundException({
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not found.',
    });
  }

  private forbidden() {
    throw new ForbiddenException({
      success: false,
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Forbidden.',
    });
  }

  private badRequest() {
    throw new BadRequestException({
      success: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Bad request.',
    });
  }

  private serverError() {
    throw new InternalServerErrorException({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error.',
    });
  }

  public handleError(message: string) {
    if (message === 'invalid signature') return this.invalidSignature();
    if (message === 'Not found.') return this.notFound();
    if (message === 'Forbidden') return this.forbidden();
    if (message === 'jwt expired') return this.jwtExpired();
    if (message.startsWith('Cast') || message === 'Bad request.')
      return this.badRequest();
    this.serverError();
  }
}
