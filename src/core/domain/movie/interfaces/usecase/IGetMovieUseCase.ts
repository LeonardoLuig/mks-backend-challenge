import { IUseCase } from '@core/common/usecase/IUseCase';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { GetMoviePort } from '@core/domain/movie/port/usecase/GetMoviePort';

export interface IGetMovieUseCase extends IUseCase<GetMoviePort, MovieUseCaseDto> {}
