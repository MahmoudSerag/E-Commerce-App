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
    @Res({ passthrough: true }) res: Response,
    accessToken: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const user = await this.userModel.findUserById(decodedToken.id);

      if (!user)
        return this.errorResponse.handleError(res, 404, 'User Not Found.');

      return {
        success: true,
        statusCode: 200,
        message: 'User info sent successfully.',
        userBasicInfo: {
          email: user.email,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
        },
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async updateNameForLoggedInUser(
    @Res() res: Response,
    body: { firstName: string; lastName: string },
    accessToken: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const user = await this.userModel.updateUserById(decodedToken.id, body);

      if (!user)
        return this.errorResponse.handleError(res, 404, 'User Not Found.');

      return {
        success: true,
        statusCode: 200,
        message: 'User updated successfully.',
        userInfo: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
