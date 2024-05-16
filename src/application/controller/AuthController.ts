import { HttpAuthService } from '@application/auth/HttpAuthService';
import { HttpLocal } from '@application/auth/decorators/HttpLocal';
import { HttpLoggedInUser, HttpRequestWithUser } from '@application/auth/types/HttpAuthTypes';
import { HttpApiModelLoginBody } from '@application/controller/doc/auth/HttpApiModelLoginBody';
import { HttpApiResponseLoggedInUser } from '@application/controller/doc/auth/HttpApiResponseLoggedInUser';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: HttpAuthService) {}

  @Post('login')
  @HttpLocal()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: HttpApiModelLoginBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseLoggedInUser })
  async login(@Req() request: HttpRequestWithUser): Promise<CoreApiResponse<HttpLoggedInUser>> {
    return CoreApiResponse.success(this.authService.login(request.user));
  }
}
