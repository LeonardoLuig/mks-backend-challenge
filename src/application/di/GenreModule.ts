import { GenreController } from '@application/controller/GenreController';
import { GenreDITokens } from '@core/domain/genre/di/GenreDITokens';
import { GetGenreListService } from '@core/service/genre/GetGenreListService';
import { TypeOrmGenre } from '@infrastructure/adapters/persistence/typeorm/entity/genre/TypeOrmGenre';
import { TypeOrmGenreRepositoryAdapter } from '@infrastructure/adapters/persistence/typeorm/repository/TypeOrmGenreRepositoryAdapter';
import { Module, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

const persistenceProviders: Provider[] = [
  {
    provide: GenreDITokens.TypeOrmGenreSource,
    useFactory: (source: DataSource) => source.getRepository(TypeOrmGenre),
    inject: [DataSource],
  },
  {
    provide: GenreDITokens.GenreRepository,
    useFactory: (source) => new TypeOrmGenreRepositoryAdapter(source),
    inject: [GenreDITokens.TypeOrmGenreSource],
  },
];

const usecaseProviders: Provider[] = [
  {
    provide: GenreDITokens.GetGenreListUseCase,
    useFactory: (genreRepository) => new GetGenreListService(genreRepository),
    inject: [GenreDITokens.GenreRepository],
  },
];

@Module({
  controllers: [GenreController],
  providers: [...persistenceProviders, ...usecaseProviders],
  exports: [GenreDITokens.GenreRepository],
})
export class GenreModule {}
