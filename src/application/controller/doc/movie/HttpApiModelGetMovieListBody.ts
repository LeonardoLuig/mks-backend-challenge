import { ApiProperty } from '@nestjs/swagger';

export class HttpApiModelGetMovieListBody {
  @ApiProperty({ type: 'string', required: false })
  public title?: string;

  @ApiProperty({ type: 'string', required: false })
  public artist?: string;

  @ApiProperty({ type: 'number', required: false })
  public genres?: number[];
}
