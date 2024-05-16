import { HttpApiResponse } from '@application/controller/doc/common/HttpApiResponse';
import { HttpApiModelUser } from '@application/controller/doc/user/HttpApiModelUser';
import { ApiProperty } from '@nestjs/swagger';

export class HttpApiResponseUser extends HttpApiResponse {
  @ApiProperty({ type: HttpApiModelUser })
  public data: HttpApiModelUser;
}
