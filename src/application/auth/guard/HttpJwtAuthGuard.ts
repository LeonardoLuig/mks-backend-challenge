import { HttpJwtStrategy } from '@application/auth/passport/HttpJwtStrategy';
import { HttpJwtPayload, HttpRequestWithUser, HttpUserPayload } from '@application/auth/types/HttpAuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class HttpJwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtStrategy: HttpJwtStrategy,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: HttpRequestWithUser = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request) as string;

    const canActive: boolean = !token ? false : true;

    if (!canActive) {
      throw Exception.new({ code: Code.UNAUTHORIZED_ERROR });
    }

    const user: HttpUserPayload = await this.decodeAndValidateToken(token);

    request.user = user;

    return canActive;
  }

  private async decodeAndValidateToken(token: string): Promise<HttpUserPayload> {
    const validToken: boolean = await this.jwtService
      .verifyAsync(token)
      .then((): boolean => true)
      .catch((): boolean => false);

    if (!validToken) {
      throw Exception.new({ code: Code.UNAUTHORIZED_ERROR });
    }

    const decodedToken: HttpJwtPayload = this.jwtService.decode(token) as HttpJwtPayload;

    return await this.jwtStrategy.validate(decodedToken);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
