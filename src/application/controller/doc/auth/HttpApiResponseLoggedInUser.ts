import { HttpApiModelLoggedInUser } from '@application/controller/doc/auth/HttpApiModelLoggedInUser';
import { HttpApiResponse } from '@application/controller/doc/common/HttpApiResponse';
import { ApiProperty } from '@nestjs/swagger';

export class HttpApiResponseLoggedInUser extends HttpApiResponse {
  @ApiProperty({ type: HttpApiModelLoggedInUser })
  public data: HttpApiModelLoggedInUser;
}
