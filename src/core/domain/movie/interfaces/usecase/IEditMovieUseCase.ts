import { IUseCase } from '@core/common/usecase/IUseCase';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { EditMoviePort } from '@core/domain/movie/port/usecase/EditMoviePort';

export interface IEditMovieUseCase extends IUseCase<EditMoviePort, MovieUseCaseDto> {}
