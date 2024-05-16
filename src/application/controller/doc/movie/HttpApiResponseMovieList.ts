import { HttpApiResponse } from '@application/controller/doc/common/HttpApiResponse';
import { HttpApiModelMovie } from '@application/controller/doc/movie/HttpApiModelMovie';
import { ApiProperty } from '@nestjs/swagger';

export class HttpApiResponseMovieList extends HttpApiResponse {
  @ApiProperty({ type: HttpApiModelMovie, isArray: true })
  public data: HttpApiModelMovie[];
}
