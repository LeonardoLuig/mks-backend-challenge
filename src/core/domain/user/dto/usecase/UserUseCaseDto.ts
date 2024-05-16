import { Nullable } from '@core/common/types/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public createdAt: number;

  @Expose()
  public updatedAt: Nullable<number>;

  @Expose()
  public removedAt: Nullable<number>;

  public static newFromUser(user: User): UserUseCaseDto {
    const dto: UserUseCaseDto = plainToClass(UserUseCaseDto, user);

    dto.createdAt = user.getCreatedAt().getTime();
    dto.updatedAt = user.getUpdatedAt()?.getTime() || null;
    dto.removedAt = user.getRemovedAt()?.getTime() || null;

    return dto;
  }
}
