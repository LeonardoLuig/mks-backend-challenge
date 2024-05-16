import { HttpJwtPayload, HttpLoggedInUser, HttpUserPayload } from '@application/auth/types/HttpAuthTypes';
import { Nullable, Optional } from '@core/common/types/CommonTypes';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { User } from '@core/domain/user/entity/User';
import { IUserRepository } from '@core/domain/user/interfaces/persistence/IUseRepository';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HttpAuthService {
  constructor(
    @Inject(UserDITokens.UserRepository) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Nullable<HttpUserPayload>> {
    const user: Optional<User> = await this.userRepository.findUser({ email: username });

    if (user) {
      const isPasswordValid: boolean = await user.comparePassword(password);
      if (isPasswordValid) {
        return {
          id: user.getId(),
          email: user.getEmail(),
        };
      }
    }

    return null;
  }

  login(user: HttpUserPayload): HttpLoggedInUser {
    const payload: HttpJwtPayload = { id: user.id };

    return {
      id: payload.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getUser(by: { id: string }): Promise<Optional<User>> {
    return this.userRepository.findUser({ id: by.id });
  }
}
