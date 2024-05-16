import { HttpApiResponse } from '@application/controller/doc/common/HttpApiResponse';
import { HttpApiModelMovie } from '@application/controller/doc/movie/HttpApiModelMovie';
import { ApiProperty } from '@nestjs/swagger';

export class HttpApiResponseMovie extends HttpApiResponse {
  @ApiProperty({ type: HttpApiModelMovie, nullable: true })
  public data: HttpApiModelMovie;
}
