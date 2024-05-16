import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/types/CommonTypes';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { UserUseCaseDto } from '@core/domain/user/dto/usecase/UserUseCaseDto';
import { User } from '@core/domain/user/entity/User';
import { IUserRepository } from '@core/domain/user/interfaces/persistence/IUseRepository';
import { IGetUserUseCase } from '@core/domain/user/interfaces/usecase/IGetUserUseCase';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';

export class GetUserService implements IGetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const user: Optional<User> = await this.userRepository.findUser({
      id: payload.userId,
    });

    CoreAssert.notEmpty(user, Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'user not found.' }));

    return UserUseCaseDto.newFromUser(user as User);
  }
}
