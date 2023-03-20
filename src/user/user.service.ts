import { Injectable, Res } from '@nestjs/common';
import { JWTService } from 'src/helpers/jwt.helper';
import { UserModel } from 'src/database/models/user.model';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userModel: UserModel,
    private readonly errorResponse: ErrorResponse,
  ) {}

  async getUserBasicInfo(
    accessToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const user = await this.userModel.findUserById(decodedToken.id);

      if (!user) return this.errorResponse.handleError(res, 'not found');

      return {
        email: user.email,
        firstName: user.firstName || null,
        lastName: user.lastName || null,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, error.message);
    }
  }
}
