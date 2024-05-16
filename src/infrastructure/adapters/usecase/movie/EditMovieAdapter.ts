import { UseCaseAdapterValidator } from '@core/common/adapter-validator/usecase/UseCaseAdapterValidator';
import { EditMoviePort } from '@core/domain/movie/port/usecase/EditMoviePort';
import { Type, plainToClass } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class MovieGenreAdapter {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class EditMovieAdapter extends UseCaseAdapterValidator implements EditMoviePort {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public movieId: string;

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public cast?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovieGenreAdapter)
  public genres?: MovieGenreAdapter[];

  @IsOptional()
  @IsString()
  public director?: string;

  @IsOptional()
  @IsNumber()
  public releaseYear?: number;

  @IsOptional()
  @IsNumber()
  public duration?: number;

  public static async new(payload: EditMoviePort) {
    const adapter: EditMovieAdapter = plainToClass(EditMovieAdapter, payload);

    adapter.genres = payload.genres?.map((genre) => {
      return new MovieGenreAdapter(genre.id, genre.name);
    });

    await adapter.validate();

    return adapter;
  }
}
