import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { Movie } from '@core/domain/movie/entity/Movie';

export class MovieUseCasePaginationDto {
  public totalCount: number;

  public movies: MovieUseCaseDto[];

  public static newFromMoviePagination(movies: Movie[], totalCount: number): MovieUseCasePaginationDto {
    const moviesDto: MovieUseCaseDto[] = MovieUseCaseDto.newFromMovies(movies);

    const dto: MovieUseCasePaginationDto = new MovieUseCasePaginationDto();

    dto.movies = moviesDto;
    dto.totalCount = totalCount;

    return dto;
  }
}
