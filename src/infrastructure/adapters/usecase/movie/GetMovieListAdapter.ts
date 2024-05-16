import { UseCaseAdapterValidator } from '@core/common/adapter-validator/usecase/UseCaseAdapterValidator';
import { GetMovieListPort } from '@core/domain/movie/port/usecase/GetMovieListPort';
import { plainToClass } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class GetMovieListAdapter extends UseCaseAdapterValidator implements GetMovieListPort {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  genres?: number[];

  public static async new(payload: GetMovieListPort) {
    const adapter: GetMovieListAdapter = plainToClass(GetMovieListAdapter, payload);

    await adapter.validate();

    return adapter;
  }
}
