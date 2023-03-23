import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  private unauthorized() {
    throw new UnauthorizedException({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized.',
    });
  }
  private invalidToken() {
    throw new UnauthorizedException({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid token.',
    });
  }

  private invalidSignature() {
    throw new UnauthorizedException({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid signature.',
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

  private jwtExpired() {
    throw new UnauthorizedException({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Jwt expired.',
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
    if (message === 'invalid signature') this.invalidSignature();
    else if (message === 'invalid token') this.invalidToken();
    else if (message === 'unauthorized') this.unauthorized();
    else if (message === 'Not found.') this.notFound();
    else if (message === 'forbidden') this.forbidden();
    else if (message === 'jwt expired') this.jwtExpired();
    else if (message.startsWith('Cast') || message === 'Bad request.')
      this.badRequest();
    else this.serverError();
  }
}
