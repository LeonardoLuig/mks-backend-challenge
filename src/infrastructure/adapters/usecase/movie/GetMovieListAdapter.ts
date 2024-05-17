import { UseCaseAdapterValidator } from '@core/common/adapter-validator/usecase/UseCaseAdapterValidator';
import { GetMovieListPort } from '@core/domain/movie/port/usecase/GetMovieListPort';
import { Optional } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsArray, IsInt, IsNotIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMovieListAdapter extends UseCaseAdapterValidator implements GetMovieListPort {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public artist?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  public genres?: number[];

  @Optional()
  @IsNumber()
  @IsNotIn([0])
  public limit?: number;

  @Optional()
  @IsNumber()
  @IsNotIn([0])
  public offset?: number;

  public static async new(payload: GetMovieListPort) {
    const adapter: GetMovieListAdapter = plainToClass(GetMovieListAdapter, payload);

    await adapter.validate();

    return adapter;
  }
}
