import { IUseCase } from '@core/common/usecase/IUseCase';
import { UserUseCaseDto } from '@core/domain/user/dto/usecase/UserUseCaseDto';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';

export interface IGetUserUseCase extends IUseCase<GetUserPort, UserUseCaseDto> {}
