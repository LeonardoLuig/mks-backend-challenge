import { ApiProperty } from '@nestjs/swagger';

export class HttpApiModelGenre {
  @ApiProperty({ type: 'number' })
  public id: number;

  @ApiProperty({ type: 'string' })
  public name: string;
}
