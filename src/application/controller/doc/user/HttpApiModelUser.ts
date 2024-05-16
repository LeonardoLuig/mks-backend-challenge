import { ApiProperty } from '@nestjs/swagger';

export class HttpApiModelUser {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiProperty({ type: 'number' })
  public createdAt: string;

  @ApiProperty({ type: 'number', required: false })
  public updatedAt: string;

  @ApiProperty({ type: 'number', required: false })
  public removedAt: string;
}
