import { Nullable } from '@core/common/types/CommonTypes';
import { Movie } from '@core/domain/movie/entity/Movie';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class MovieUseCaseDto {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public cast: string[];

  @Expose()
  public genres: { id: number; name: string }[];

  @Expose()
  public director: string;

  @Expose()
  public releaseYear: number;

  @Expose()
  public duration: number;

  @Expose()
  public createdAt: number;

  @Expose()
  public updatedAt: Nullable<number>;

  @Expose()
  public removedAt: Nullable<number>;

  public static newFromMovie(movie: Movie): MovieUseCaseDto {
    const dto: MovieUseCaseDto = plainToClass(MovieUseCaseDto, movie);

    dto.genres = movie.getGenres().map((genre) => {
      return { id: genre.getId(), name: genre.getName() };
    });

    dto.createdAt = movie.getCreatedAt().getTime();
    dto.updatedAt = movie.getUpdatedAt()?.getTime() || null;
    dto.removedAt = movie.getRemovedAt()?.getTime() || null;

    return dto;
  }

  public static newFromMovies(movies: Movie[]): MovieUseCaseDto[] {
    return movies.map((movie) => this.newFromMovie(movie));
  }
}
