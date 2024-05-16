import { IUseCase } from '@core/common/usecase/IUseCase';
import { RemoveMoviePort } from '@core/domain/movie/port/usecase/RemoveMoviePort';

export interface IRemoveMovieUseCase extends IUseCase<RemoveMoviePort, void> {}
