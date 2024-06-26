import { ApiProperty } from '@nestjs/swagger';

export class HttpApiModelLoggedInUser {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public accessToken: string;
}
