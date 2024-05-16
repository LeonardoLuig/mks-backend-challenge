import { IUseCase } from '@core/common/usecase/IUseCase';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { CreateMoviePort } from '@core/domain/movie/port/usecase/CreateMoviePort';

export interface ICreateMovieUseCase extends IUseCase<CreateMoviePort, MovieUseCaseDto> {}
