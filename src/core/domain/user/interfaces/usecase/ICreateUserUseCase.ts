import { IUseCase } from '@core/common/usecase/IUseCase';
import { UserUseCaseDto } from '@core/domain/user/dto/usecase/UserUseCaseDto';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';

export interface ICreateUserUseCase extends IUseCase<CreateUserPort, UserUseCaseDto> {}
