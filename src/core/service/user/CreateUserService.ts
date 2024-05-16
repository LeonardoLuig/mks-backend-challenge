import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { UserUseCaseDto } from '@core/domain/user/dto/usecase/UserUseCaseDto';
import { User } from '@core/domain/user/entity/User';
import { IUserRepository } from '@core/domain/user/interfaces/persistence/IUseRepository';
import { ICreateUserUseCase } from '@core/domain/user/interfaces/usecase/ICreateUserUseCase';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const doesUserExist: boolean = !!(await this.userRepository.countUsers({ email: payload.email }));
    CoreAssert.isFalse(doesUserExist, Exception.new({ code: Code.ENTITY_ALREADY_EXISTS_ERROR, overrideMessage: 'user already exists.' }));

    const user: User = await User.new({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    await this.userRepository.addUser(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
