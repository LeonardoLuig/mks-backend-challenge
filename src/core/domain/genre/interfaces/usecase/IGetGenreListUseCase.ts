import { IUseCase } from '@core/common/usecase/IUseCase';
import { GenreUseCaseDto } from '@core/domain/genre/dto/usecase/GenreUseCaseDto';

export interface IGetGenreListUseCase extends IUseCase<void, GenreUseCaseDto[]> {}
