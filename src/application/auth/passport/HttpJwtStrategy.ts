import { HttpAuthService } from '@application/auth/HttpAuthService';
import { HttpJwtPayload, HttpUserPayload } from '@application/auth/types/HttpAuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpJwtStrategy {
  constructor(private readonly authService: HttpAuthService) {}

  public async validate(payload: HttpJwtPayload): Promise<HttpUserPayload> {
    const user: User = CoreAssert.notEmpty(await this.authService.getUser({ id: payload.id }), Exception.new({ code: Code.UNAUTHORIZED_ERROR }));

    return { id: user.getId(), email: user.getEmail() };
  }
}
