import { Repository } from 'typeorm';

export class TypeOrmBaseRepository<TRepository extends object> {
  constructor(protected readonly client: Repository<TRepository>) {}
}
