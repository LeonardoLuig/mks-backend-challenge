import { Nullable, Optional } from '@core/common/types/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { IUserRepository } from '@core/domain/user/interfaces/persistence/IUseRepository';
import { TypeOrmBaseRepository } from '@infrastructure/adapters/persistence/typeorm/TypeOrmBaseRepository';
import { TypeOrmUser } from '@infrastructure/adapters/persistence/typeorm/entity/user/TypeOrmUser';
import { TypeOrmUserMapper } from '@infrastructure/adapters/persistence/typeorm/entity/user/mapper/TypeOrmUserMapper';
import { InsertResult, SelectQueryBuilder } from 'typeorm';

export class TypeOrmUserRepositoryAdapter extends TypeOrmBaseRepository<TypeOrmUser> implements IUserRepository {
  private readonly userAlias: string = 'user';

  async findUser(by: { id?: string; email?: string }): Promise<Optional<User>> {
    let domainEntity: Optional<User>;

    const query: SelectQueryBuilder<TypeOrmUser> = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const ormEntity: Nullable<TypeOrmUser> = await query.getOne();

    if (ormEntity) {
      domainEntity = TypeOrmUserMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  async addUser(user: User): Promise<{ id: string }> {
    const ormEntity: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user);

    const insertResult: InsertResult = await this.client.createQueryBuilder(this.userAlias).insert().into(TypeOrmUser).values([ormEntity]).execute();

    return {
      id: insertResult.identifiers[0].id,
    };
  }

  async countUsers(by: { id?: string; email?: string }): Promise<number> {
    const query: SelectQueryBuilder<TypeOrmUser> = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  private buildUserQueryBuilder(): SelectQueryBuilder<TypeOrmUser> {
    return this.client.createQueryBuilder(this.userAlias).select();
  }

  private extendQueryWithByProperties(by: { id?: string; email?: string }, query: SelectQueryBuilder<TypeOrmUser>): void {
    if (by.id) {
      query.andWhere(`"${this.userAlias}"."id" = :id`, { id: by.id });
    }
    if (by.email) {
      query.andWhere(`"${this.userAlias}"."email" = :email`, { email: by.email });
    }
  }
}
