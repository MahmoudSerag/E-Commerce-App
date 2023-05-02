import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  public signJWT(payload: {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
  }): string {
    return this.jwtService.sign(payload);
  }

  public verifyJWT(token: string): {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
  } {
    return this.jwtService.verify(token);
  }
}
