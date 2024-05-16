import { HttpLocalStrategy } from '@application/auth/passport/HttpLocalStrategy';
import { HttpLocalUserPayload, HttpRequestWithUser, HttpUserPayload } from '@application/auth/types/HttpAuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpLocalAuthGuard implements CanActivate {
  constructor(private readonly localStrategy: HttpLocalStrategy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: HttpRequestWithUser = context.switchToHttp().getRequest();
    const payload: Partial<(HttpLocalUserPayload & ReadableStream<Uint8Array>) | null> = request.body;

    const canActivate: boolean = !payload?.email || !payload.password ? false : true;

    if (!canActivate) {
      throw Exception.new({ code: Code.BAD_REQUEST_ERROR });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user: HttpUserPayload = await this.localStrategy.validate(payload.email, payload.password);

    request.user = user;

    return canActivate;
  }
}
