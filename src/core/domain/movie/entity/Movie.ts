import { Entity } from '@core/common/entity/Entity';
import { IRemovableEntity } from '@core/common/entity/IRemovableEntity';
import { Nullable } from '@core/common/types/CommonTypes';
import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';
import { CreateMovieEntityPayload } from '@core/domain/movie/entity/types/CreateMovieEntityPayload';
import { EditMovieEntityPayload } from '@core/domain/movie/entity/types/EditMovieEntityPayload';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { v4 } from 'uuid';

export class Movie extends Entity<string> implements IRemovableEntity {
  @IsString()
  private title: string;

  @IsString()
  private description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  private cast: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MovieGenre)
  private genres: MovieGenre[];

  @IsString()
  private director: string;

  @IsNumber()
  private releaseYear: number;

  @IsNumber()
  private duration: number;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private updatedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: CreateMovieEntityPayload) {
    super();

    this.id = payload.id || v4();
    this.title = payload.title;
    this.description = payload.description;
    this.cast = payload.cast;
    this.genres = payload.genres;
    this.director = payload.director;
    this.releaseYear = payload.releaseYear;
    this.duration = payload.duration;

    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getCast(): string[] {
    return this.cast;
  }

  getGenres(): MovieGenre[] {
    return this.genres;
  }

  getDirector(): string {
    return this.director;
  }

  getReleaseYear(): number {
    return this.releaseYear;
  }

  getDuration(): number {
    return this.duration;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Nullable<Date> {
    return this.updatedAt;
  }

  getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  async edit(payload: EditMovieEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.title) {
      this.title = payload.title;
      this.updatedAt = currentDate;
    }

    if (payload.description) {
      this.description = payload.description;
      this.updatedAt = currentDate;
    }

    if (payload.cast) {
      this.cast = payload.cast;
      this.updatedAt = currentDate;
    }

    if (payload.genres) {
      this.genres = payload.genres;
      this.updatedAt = currentDate;
    }

    if (payload.director) {
      this.director = payload.director;
      this.updatedAt = currentDate;
    }

    if (payload.releaseYear) {
      this.releaseYear = payload.releaseYear;
      this.updatedAt = currentDate;
    }

    if (payload.duration) {
      this.duration = payload.duration;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  static async new(payload: CreateMovieEntityPayload): Promise<Movie> {
    const movie: Movie = new Movie(payload);
    await movie.validate();

    return movie;
  }
}
