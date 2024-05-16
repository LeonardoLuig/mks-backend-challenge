import { MovieController } from '@application/controller/MovieController';
import { GenreModule } from '@application/di/GenreModule';
import { GenreDITokens } from '@core/domain/genre/di/GenreDITokens';
import { MovieDITokens } from '@core/domain/movie/di/MovieDITokens';
import { CreateMovieService } from '@core/service/movie/CreateMovieService';
import { EditMovieService } from '@core/service/movie/EditMovieService';
import { GetMovieListService } from '@core/service/movie/GetMovieListService';
import { GetMovieService } from '@core/service/movie/GetMovieService';
import { RemoveMovieService } from '@core/service/movie/RemoveMovieService';
import { TypeOrmMovie } from '@infrastructure/adapters/persistence/typeorm/entity/movie/TypeOrmMovie';
import { TypeOrmMovieRepositoryAdapter } from '@infrastructure/adapters/persistence/typeorm/repository/TypeOrmMovieRepositoryAdapter';
import { Module, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

const persistenceProviders: Provider[] = [
  {
    provide: MovieDITokens.TypeOrmMovieSource,
    useFactory: (source: DataSource) => source.getRepository(TypeOrmMovie),
    inject: [DataSource],
  },
  {
    provide: MovieDITokens.MovieRepository,
    useFactory: (source) => new TypeOrmMovieRepositoryAdapter(source),
    inject: [MovieDITokens.TypeOrmMovieSource],
  },
];

const usecaseProviders: Provider[] = [
  {
    provide: MovieDITokens.GetMovieUseCase,
    useFactory: (movieRepository) => new GetMovieService(movieRepository),
    inject: [MovieDITokens.MovieRepository],
  },
  {
    provide: MovieDITokens.GetMovieListUseCase,
    useFactory: (movieRepository) => new GetMovieListService(movieRepository),
    inject: [MovieDITokens.MovieRepository],
  },
  {
    provide: MovieDITokens.CreateMovieUseCase,
    useFactory: (movieRepository, genreRepository) => new CreateMovieService(movieRepository, genreRepository),
    inject: [MovieDITokens.MovieRepository, GenreDITokens.GenreRepository],
  },
  {
    provide: MovieDITokens.EditMovieUseCase,
    useFactory: (movieRepository, genreRepository) => new EditMovieService(movieRepository, genreRepository),
    inject: [MovieDITokens.MovieRepository, GenreDITokens.GenreRepository],
  },
  {
    provide: MovieDITokens.RemoveMovieUseCase,
    useFactory: (movieRepository) => new RemoveMovieService(movieRepository),
    inject: [MovieDITokens.MovieRepository],
  },
];

@Module({
  imports: [GenreModule],
  controllers: [MovieController],
  providers: [...persistenceProviders, ...usecaseProviders],
})
export class MovieModule {}
