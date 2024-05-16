import { IUseCase } from '@core/common/usecase/IUseCase';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { GetMovieListPort } from '@core/domain/movie/port/usecase/GetMovieListPort';

export interface IGetMovieListUseCase extends IUseCase<GetMovieListPort, MovieUseCaseDto[]> {}
