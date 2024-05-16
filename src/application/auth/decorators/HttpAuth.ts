import { HttpJwtAuthGuard } from '@application/auth/guard/HttpJwtAuthGuard';
import { UseGuards, applyDecorators } from '@nestjs/common';

export const HttpAuth = () => {
  return applyDecorators(UseGuards(HttpJwtAuthGuard));
};
