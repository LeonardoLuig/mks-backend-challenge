import { HttpApiResponse } from '@application/controller/doc/common/HttpApiResponse';
import { HttpApiModelGenre } from '@application/controller/doc/genre/HttpApiModelGenre';
import { ApiProperty } from '@nestjs/swagger';

export class HttpApiResponseGenreList extends HttpApiResponse {
  @ApiProperty({ type: HttpApiModelGenre, isArray: true })
  public data: HttpApiModelGenre[];
}
