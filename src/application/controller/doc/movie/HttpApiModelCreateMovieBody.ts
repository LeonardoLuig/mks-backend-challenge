import { ApiProperty } from '@nestjs/swagger';

class HttpApiModelCreateMovieBodyGenre {
  @ApiProperty({ type: 'number' })
  public id: number;

  @ApiProperty({ type: 'string' })
  public name: string;
}

export class HttpApiModelCreateMovieBody {
  @ApiProperty({ type: 'string', required: true })
  public title: string;

  @ApiProperty({ type: 'string', required: true })
  public description: string;

  @ApiProperty({ type: 'string', required: true })
  public cast: string;

  @ApiProperty({ type: HttpApiModelCreateMovieBodyGenre, required: true, isArray: true })
  public genres: { id: number; name: string }[];

  @ApiProperty({ type: 'string', required: true })
  public director: string;

  @ApiProperty({ type: 'number', required: true })
  public releaseYear: number;

  @ApiProperty({ type: 'number', required: true })
  public duration: number;
}
