import { User } from '@core/domain/user/entity/User';
import { TypeOrmUser } from '@infrastructure/adapters/persistence/typeorm/entity/user/TypeOrmUser';

export class TypeOrmUserMapper {
  public static toOrmEntity(domainUser: User): TypeOrmUser {
    const ormUser: TypeOrmUser = new TypeOrmUser();

    ormUser.id = domainUser.getId();
    ormUser.name = domainUser.getName();
    ormUser.email = domainUser.getEmail();
    ormUser.password = domainUser.getPassword();
    ormUser.createdAt = domainUser.getCreatedAt();
    ormUser.updatedAt = domainUser.getUpdatedAt() as Date;
    ormUser.removedAt = domainUser.getRemovedAt() as Date;

    return ormUser;
  }

  public static toDomainEntity(ormUser: TypeOrmUser): User {
    const domainUser: User = new User({
      id: ormUser.id,
      name: ormUser.name,
      email: ormUser.email,
      password: ormUser.password,
      createdAt: ormUser.createdAt,
      updatedAt: ormUser.updatedAt,
      removedAt: ormUser.removedAt,
    });

    return domainUser;
  }
}
