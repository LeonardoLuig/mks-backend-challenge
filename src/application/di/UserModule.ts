import { UserController } from '@application/controller/UserController';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { CreateUserUseCase } from '@core/service/user/CreateUserService';
import { TypeOrmUser } from '@infrastructure/adapters/persistence/typeorm/entity/user/TypeOrmUser';
import { TypeOrmUserRepositoryAdapter } from '@infrastructure/adapters/persistence/typeorm/repository/TypeOrmUserRepositoryAdapter';
import { Module, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.TypeOrmUserSource,
    useFactory: (source: DataSource) => source.getRepository(TypeOrmUser),
    inject: [DataSource],
  },
  {
    provide: UserDITokens.UserRepository,
    useFactory: (source) => new TypeOrmUserRepositoryAdapter(source),
    inject: [UserDITokens.TypeOrmUserSource],
  },
];

const usecaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserUseCase(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

@Module({
  controllers: [UserController],
  providers: [...persistenceProviders, ...usecaseProviders],
  exports: [UserDITokens.UserRepository],
})
export class UserModule {}
