import { Optional } from '@core/common/types/CommonTypes';
import { User } from '@core/domain/user/entity/User';

export interface IUserRepository {
  findUser(by: { id?: string; email?: string }): Promise<Optional<User>>;
  addUser(user: User): Promise<{ id: string }>;
  countUsers(by: { id?: string; email?: string }): Promise<number>;
}
