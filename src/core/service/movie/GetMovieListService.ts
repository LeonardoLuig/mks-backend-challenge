import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { Movie } from '@core/domain/movie/entity/Movie';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { IGetMovieListUseCase } from '@core/domain/movie/interfaces/usecase/IGetMovieListUseCase';
import { GetMovieListPort } from '@core/domain/movie/port/usecase/GetMovieListPort';

export class GetMovieListService implements IGetMovieListUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(payload: GetMovieListPort): Promise<MovieUseCaseDto[]> {
    const movies: Movie[] = await this.movieRepository.findMovies({
      title: payload.title,
      artist: payload.artist,
      genres: payload.genres,
    });

    return MovieUseCaseDto.newFromMovies(movies);
  }
}
