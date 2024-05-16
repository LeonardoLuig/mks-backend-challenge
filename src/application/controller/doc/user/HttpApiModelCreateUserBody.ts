import { ApiProperty } from '@nestjs/swagger';

export class HttpApiModelCreateUserBody {
  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiProperty({ type: 'string' })
  public password: string;
}
