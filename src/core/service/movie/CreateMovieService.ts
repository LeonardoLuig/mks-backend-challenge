import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { IGenreRepository } from '@core/domain/genre/interfaces/persistence/IGenreRepository';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { Movie } from '@core/domain/movie/entity/Movie';
import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { ICreateMovieUseCase } from '@core/domain/movie/interfaces/usecase/ICreateMovieUseCase';
import { CreateMoviePort } from '@core/domain/movie/port/usecase/CreateMoviePort';

export class CreateMovieService implements ICreateMovieUseCase {
  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly genreRepository: IGenreRepository,
  ) {}

  async execute(payload: CreateMoviePort): Promise<MovieUseCaseDto> {
    const movie: Movie = await Movie.new({
      title: payload.title,
      description: payload.description,
      cast: payload.cast.split(','),
      genres: await this.defineGenres(payload.genres),
      director: payload.director,
      releaseYear: payload.releaseYear,
      duration: payload.duration,
    });

    await this.movieRepository.addMovie(movie);

    return MovieUseCaseDto.newFromMovie(movie);
  }

  private async defineGenres(payload: { id: number; name: string }[]): Promise<MovieGenre[]> {
    const genres: MovieGenre[] = [];

    for await (const genre of payload) {
      const doesGenreExist: boolean = !!(await this.genreRepository.countGenre({ id: genre.id }));
      CoreAssert.isTrue(doesGenreExist, Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: `Genre ID: ${genre.id} not found.` }));

      genres.push(new MovieGenre(genre.id, genre.name));
    }

    return genres;
  }
}
