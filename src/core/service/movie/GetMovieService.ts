import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/types/CommonTypes';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { Movie } from '@core/domain/movie/entity/Movie';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { IGetMovieUseCase } from '@core/domain/movie/interfaces/usecase/IGetMovieUseCase';
import { GetMoviePort } from '@core/domain/movie/port/usecase/GetMoviePort';

export class GetMovieService implements IGetMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(payload: GetMoviePort): Promise<MovieUseCaseDto> {
    const user: Optional<Movie> = await this.movieRepository.findMovie({
      id: payload.movieId,
    });

    CoreAssert.notEmpty(user, Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Movie not found.' }));

    return MovieUseCaseDto.newFromMovie(user as Movie);
  }
}
