import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/types/CommonTypes';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { IGenreRepository } from '@core/domain/genre/interfaces/persistence/IGenreRepository';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { Movie } from '@core/domain/movie/entity/Movie';
import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { IEditMovieUseCase } from '@core/domain/movie/interfaces/usecase/IEditMovieUseCase';
import { EditMoviePort } from '@core/domain/movie/port/usecase/EditMoviePort';

export class EditMovieService implements IEditMovieUseCase {
  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly genreRepository: IGenreRepository,
  ) {}

  async execute(payload: EditMoviePort): Promise<MovieUseCaseDto> {
    const movie: Movie = CoreAssert.notEmpty(
      await this.movieRepository.findMovie({ id: payload.movieId }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Movie not found.' }),
    );

    movie.edit({
      title: payload.title,
      description: payload.description,
      cast: payload.cast?.split(','),
      genres: await this.defineNewGenres(payload.genres),
      director: payload.director,
      releaseYear: payload.releaseYear,
      duration: payload.duration,
    });

    await this.movieRepository.updateMovie(movie);

    return MovieUseCaseDto.newFromMovie(movie);
  }

  private async defineNewGenres(payload?: { id: number; name: string }[]): Promise<Optional<MovieGenre[]>> {
    if (!payload || payload.length == 0) return;

    const genres: MovieGenre[] = [];

    for await (const genre of payload) {
      const doesGenreExist: boolean = !!(await this.genreRepository.countGenre({ id: genre.id }));
      CoreAssert.isTrue(doesGenreExist, Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: `Genre ID: ${genre.id} not found.` }));

      genres.push(new MovieGenre(genre.id, genre.name));
    }

    return genres;
  }
}
