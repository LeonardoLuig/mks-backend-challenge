import { HttpAuthService } from '@application/auth/HttpAuthService';
import { HttpJwtAuthGuard } from '@application/auth/guard/HttpJwtAuthGuard';
import { HttpJwtStrategy } from '@application/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from '@application/auth/passport/HttpLocalStrategy';
import { AuthController } from '@application/controller/AuthController';
import { UserModule } from '@application/di/UserModule';
import { ServerApplicationConfig } from '@infrastructure/config/ServerApplicationConfig';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ServerApplicationConfig.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: `${ServerApplicationConfig.ACCESS_TOKEN_TTL_IN_HOURS}h` },
    }),
    UserModule,
  ],
  providers: [HttpAuthService, HttpLocalStrategy, HttpJwtStrategy, HttpJwtAuthGuard],
  exports: [HttpAuthService, HttpLocalStrategy, HttpJwtStrategy, HttpJwtAuthGuard, JwtModule],
})
export class AuthModule {}
