import { MovieUseCasePaginationDto } from '@core/domain/movie/dto/usecase/MovieUseCasePaginationDto';
import { Movie } from '@core/domain/movie/entity/Movie';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { IGetMovieListUseCase } from '@core/domain/movie/interfaces/usecase/IGetMovieListUseCase';
import { GetMovieListPort } from '@core/domain/movie/port/usecase/GetMovieListPort';

export class GetMovieListService implements IGetMovieListUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(payload: GetMovieListPort): Promise<MovieUseCasePaginationDto> {
    const movies: Movie[] = await this.movieRepository.findMovies(
      {
        title: payload.title,
        artist: payload.artist,
        genres: payload.genres,
      },
      { limit: payload.limit, offset: payload.offset },
    );

    const totalCount: number = await this.movieRepository.countMovies({
      title: payload.title,
      artist: payload.artist,
      genres: payload.genres,
    });

    return MovieUseCasePaginationDto.newFromMoviePagination(movies, totalCount);
  }
}
