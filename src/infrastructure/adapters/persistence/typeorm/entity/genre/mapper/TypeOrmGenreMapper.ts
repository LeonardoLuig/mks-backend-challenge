import { Genre } from '@core/domain/genre/entity/Genre';
import { TypeOrmGenre } from '@infrastructure/adapters/persistence/typeorm/entity/genre/TypeOrmGenre';

export class TypeOrmGenreMapper {
  public static toDomainEntity(ormGenre: TypeOrmGenre): Genre {
    return new Genre(ormGenre.id, ormGenre.name);
  }

  public static toDomainEntities(ormGenres: TypeOrmGenre[]): Genre[] {
    return ormGenres.map((ormGenre) => this.toDomainEntity(ormGenre));
  }
}
