import { Injectable } from '@nestjs/common';
import { JWTService } from 'src/helpers/jwt.helper';
import { UserModel } from 'src/database/models/user.model';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userModel: UserModel,
    private readonly errorResponse: ErrorResponse,
  ) {}

  async getUserBasicInfo(accessToken: string): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const user = await this.userModel.findUserById(decodedToken.id);

      if (!user) return this.errorResponse.handleError('Not found.');

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
      return this.errorResponse.handleError(error.message);
    }
  }

  async updateNameForLoggedInUser(
    body: { firstName: string; lastName: string },
    accessToken: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verifyJWT(accessToken);

      const user = await this.userModel.updateUserById(decodedToken.id, body);

      if (!user) return new this.errorResponse.handleError('Not found.');

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
      return this.errorResponse.handleError(error.message);
    }
  }
}
