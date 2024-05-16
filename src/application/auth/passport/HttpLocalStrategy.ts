import { HttpAuthService } from '@application/auth/HttpAuthService';
import { HttpUserPayload } from '@application/auth/types/HttpAuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Nullable } from '@core/common/types/CommonTypes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpLocalStrategy {
  constructor(private readonly authService: HttpAuthService) {}

  public async validate(email: string, password: string): Promise<HttpUserPayload> {
    const user: Nullable<HttpUserPayload> = await this.authService.validateUser(email, password);
    if (!user) {
      throw Exception.new({ code: Code.WRONG_CREDENTIALS_ERROR });
    }

    return user;
  }
}
