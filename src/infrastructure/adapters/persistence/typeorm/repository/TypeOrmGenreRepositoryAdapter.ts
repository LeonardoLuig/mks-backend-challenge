import { Genre } from '@core/domain/genre/entity/Genre';
import { IGenreRepository } from '@core/domain/genre/interfaces/persistence/IGenreRepository';
import { TypeOrmBaseRepository } from '@infrastructure/adapters/persistence/typeorm/TypeOrmBaseRepository';
import { TypeOrmGenre } from '@infrastructure/adapters/persistence/typeorm/entity/genre/TypeOrmGenre';
import { TypeOrmGenreMapper } from '@infrastructure/adapters/persistence/typeorm/entity/genre/mapper/TypeOrmGenreMapper';
import { SelectQueryBuilder } from 'typeorm';

export class TypeOrmGenreRepositoryAdapter extends TypeOrmBaseRepository<TypeOrmGenre> implements IGenreRepository {
  private readonly genreAlias: string = 'genre';

  async findGenres(): Promise<Genre[]> {
    const query: SelectQueryBuilder<TypeOrmGenre> = this.buildGenreQueryBuilder();

    const ormEntities: TypeOrmGenre[] = await query.getMany();
    const domainEntities: Genre[] = TypeOrmGenreMapper.toDomainEntities(ormEntities);

    return domainEntities;
  }

  countGenre(by: { id: number }): Promise<number> {
    const query: SelectQueryBuilder<TypeOrmGenre> = this.buildGenreQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  private buildGenreQueryBuilder(): SelectQueryBuilder<TypeOrmGenre> {
    return this.client.createQueryBuilder(this.genreAlias).select();
  }

  private extendQueryWithByProperties(by: { id?: number }, query: SelectQueryBuilder<TypeOrmGenre>) {
    if (by.id) {
      query.andWhere(`"${this.genreAlias}"."id" = :id`, { id: by.id });
    }
  }
}
