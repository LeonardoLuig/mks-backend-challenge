import { Movie } from '@core/domain/movie/entity/Movie';
import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';
import { TypeOrmMovie } from '@infrastructure/adapters/persistence/typeorm/entity/movie/TypeOrmMovie';

export class TypeOrmMovieMapper {
  public static toOrmEntity(domainMovie: Movie): TypeOrmMovie {
    const ormMovie: TypeOrmMovie = new TypeOrmMovie();

    ormMovie.id = domainMovie.getId();
    ormMovie.title = domainMovie.getTitle();
    ormMovie.description = domainMovie.getDescription();
    ormMovie.cast = domainMovie.getCast().join(',');
    ormMovie.director = domainMovie.getDirector();
    ormMovie.releaseYear = domainMovie.getReleaseYear();
    ormMovie.duration = domainMovie.getDuration();
    ormMovie.createdAt = domainMovie.getCreatedAt();
    ormMovie.updatedAt = domainMovie.getUpdatedAt() as Date;
    ormMovie.removedAt = domainMovie.getRemovedAt() as Date;

    return ormMovie;
  }

  public static toOrmEntities(domainMovies: Movie[]): TypeOrmMovie[] {
    return domainMovies.map((domainMovie) => this.toOrmEntity(domainMovie));
  }

  public static toDomainEntity(ormMovie: TypeOrmMovie): Movie {
    const domainMovie: Movie = new Movie({
      id: ormMovie.id,
      title: ormMovie.title,
      description: ormMovie.description,
      cast: ormMovie.cast.split(','),
      genres: ormMovie.genres.map((genre) => new MovieGenre(genre.id, genre.name)),
      director: ormMovie.director,
      releaseYear: ormMovie.releaseYear,
      duration: ormMovie.duration,
      createdAt: ormMovie.createdAt,
      updatedAt: ormMovie.updatedAt,
      removedAt: ormMovie.removedAt || null,
    });

    return domainMovie;
  }

  public static toDomainEntities(ormMovies: TypeOrmMovie[]): Movie[] {
    return ormMovies.map((ormMovie) => this.toDomainEntity(ormMovie));
  }
}
