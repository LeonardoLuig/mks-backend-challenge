import { IUseCase } from '@core/common/usecase/IUseCase';
import { MovieUseCasePaginationDto } from '@core/domain/movie/dto/usecase/MovieUseCasePaginationDto';
import { GetMovieListPort } from '@core/domain/movie/port/usecase/GetMovieListPort';

export interface IGetMovieListUseCase extends IUseCase<GetMovieListPort, MovieUseCasePaginationDto> {}
