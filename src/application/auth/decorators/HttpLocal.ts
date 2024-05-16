import { HttpLocalAuthGuard } from '@application/auth/guard/HttpLocalAuthGuard';
import { UseGuards, applyDecorators } from '@nestjs/common';

export const HttpLocal = (): ((...args: any) => void) => {
  return applyDecorators(UseGuards(HttpLocalAuthGuard));
};
