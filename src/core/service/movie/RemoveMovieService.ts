import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { Movie } from '@core/domain/movie/entity/Movie';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { IRemoveMovieUseCase } from '@core/domain/movie/interfaces/usecase/IRemoveMovieUseCase';
import { RemoveMoviePort } from '@core/domain/movie/port/usecase/RemoveMoviePort';

export class RemoveMovieService implements IRemoveMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(payload: RemoveMoviePort): Promise<void> {
    const movie: Movie = CoreAssert.notEmpty(
      await this.movieRepository.findMovie({ id: payload.movieId }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Movie not found.' }),
    );

    await movie.remove();

    await this.movieRepository.deleteMovie(movie);
  }
}
