import { HttpRequestWithUser } from '@application/auth/types/HttpAuthTypes';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const HttpUser: () => any = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: HttpRequestWithUser = ctx.switchToHttp().getRequest();
  return request.user;
});
