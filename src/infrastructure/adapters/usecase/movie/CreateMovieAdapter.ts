import { UseCaseAdapterValidator } from '@core/common/adapter-validator/usecase/UseCaseAdapterValidator';
import { CreateMoviePort } from '@core/domain/movie/port/usecase/CreateMoviePort';
import { Type, plainToClass } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

class MovieGenreAdapter {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class CreateMovieAdapter extends UseCaseAdapterValidator implements CreateMoviePort {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public cast: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovieGenreAdapter)
  public genres: MovieGenreAdapter[];

  @IsString()
  @IsNotEmpty()
  public director: string;

  @IsNumber()
  @IsNotEmpty()
  public releaseYear: number;

  @IsNumber()
  @IsNotEmpty()
  public duration: number;

  public static async new(payload: CreateMoviePort) {
    const adapter: CreateMovieAdapter = plainToClass(CreateMovieAdapter, payload);

    payload.genres.forEach((genre) => {
      adapter.genres.push(new MovieGenreAdapter(genre.id, genre.name));
    });

    await adapter.validate();

    return adapter;
  }
}
