import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Nullable, Optional } from '@core/common/types/CommonTypes';
import { Movie } from '@core/domain/movie/entity/Movie';
import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';
import { IMovieRepository } from '@core/domain/movie/interfaces/persistence/IMovieRepository';
import { TypeOrmBaseRepository } from '@infrastructure/adapters/persistence/typeorm/TypeOrmBaseRepository';
import { TypeOrmGenre } from '@infrastructure/adapters/persistence/typeorm/entity/genre/TypeOrmGenre';
import { TypeOrmMovie } from '@infrastructure/adapters/persistence/typeorm/entity/movie/TypeOrmMovie';
import { TypeOrmMovieXGenre } from '@infrastructure/adapters/persistence/typeorm/entity/movie/TypeOrmMovieXGenre';
import { TypeOrmMovieMapper } from '@infrastructure/adapters/persistence/typeorm/entity/movie/mapper/TypeOrmMovieMapper';
import { InsertResult, SelectQueryBuilder } from 'typeorm';

export class TypeOrmMovieRepositoryAdapter extends TypeOrmBaseRepository<TypeOrmMovie> implements IMovieRepository {
  private readonly movieAlias: string = 'movie';

  async findMovie(by: { id: string }): Promise<Optional<Movie>> {
    let domainEntity: Optional<Movie>;

    const query: SelectQueryBuilder<TypeOrmMovie> = this.buildMovieQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const ormEntity: Nullable<TypeOrmMovie> = await query.getOne();

    if (ormEntity) {
      domainEntity = TypeOrmMovieMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  async findMovies(by: { title?: string; artist?: string; genres?: number[] }, options: RepositoryFindOptions = {}): Promise<Movie[]> {
    const query: SelectQueryBuilder<TypeOrmMovie> = this.buildMovieQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    if (options.limit) {
      query.limit(options.limit);
    }

    if (options.offset) {
      query.offset(options.offset);
    }

    const ormEntities: TypeOrmMovie[] = await query.getMany();
    const domainEntities: Movie[] = TypeOrmMovieMapper.toDomainEntities(ormEntities);

    return domainEntities;
  }

  async countMovies(by: { title?: string; artist?: string; genres?: number[] }): Promise<number> {
    const query: SelectQueryBuilder<TypeOrmMovie> = this.buildMovieQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  async addMovie(movie: Movie): Promise<{ id: string }> {
    const ormEntity: TypeOrmMovie = TypeOrmMovieMapper.toOrmEntity(movie);

    const insertResult: InsertResult = await this.client
      .createQueryBuilder(this.movieAlias)
      .insert()
      .into(TypeOrmMovie)
      .values([ormEntity])
      .execute();

    const movieXGenre: TypeOrmMovieXGenre[] = this.handleGenre(movie.getGenres(), ormEntity.id);

    await this.client.createQueryBuilder('movie_x_genre').insert().into(TypeOrmMovieXGenre).values(movieXGenre).execute();

    return {
      id: insertResult.identifiers[0].id,
    };
  }

  async updateMovie(movie: Movie): Promise<void> {
    const ormEntity: TypeOrmMovie = TypeOrmMovieMapper.toOrmEntity(movie);

    await this.client
      .createQueryBuilder('movie_x_genre')
      .delete()
      .where(`"movie_x_genre"."movieId" = '${ormEntity.id}'`)
      .from(TypeOrmMovieXGenre)
      .execute();

    const movieXGenre: TypeOrmMovieXGenre[] = this.handleGenre(movie.getGenres(), ormEntity.id);

    await this.client.createQueryBuilder('movie_x_genre').insert().into(TypeOrmMovieXGenre).values(movieXGenre).execute();

    await this.client.update(ormEntity.id, ormEntity);
  }

  async deleteMovie(movie: Movie): Promise<void> {
    const ormEntity: TypeOrmMovie = TypeOrmMovieMapper.toOrmEntity(movie);
    this.client.update(ormEntity.id, ormEntity);
  }

  private handleGenre(genres: MovieGenre[], ormEntityId: string): TypeOrmMovieXGenre[] {
    return genres.map((genre) => {
      const movieXGenreMapping: TypeOrmMovieXGenre = new TypeOrmMovieXGenre();

      movieXGenreMapping.movieId = ormEntityId;
      movieXGenreMapping.genreId = genre.getId();

      return movieXGenreMapping;
    });
  }

  private buildMovieQueryBuilder(): SelectQueryBuilder<TypeOrmMovie> {
    return this.client
      .createQueryBuilder(this.movieAlias)
      .select()
      .leftJoin(TypeOrmMovieXGenre, `typexgenre`, `${this.movieAlias}."id" = typexgenre."movieId"`)
      .leftJoinAndMapMany(`${this.movieAlias}.genres`, TypeOrmGenre, 'genre', `typexgenre."genreId" = genre.id`)
      .where(`${this.movieAlias}.removedAt is null`);
  }

  private extendQueryWithByProperties(
    by: Partial<{ id?: string; title?: string; artist?: string; genres?: number[]; director: string; releaseYear: number }>,
    query: SelectQueryBuilder<TypeOrmMovie>,
  ): void {
    if (by.id) {
      query.andWhere(`"${this.movieAlias}"."id" = :id`, { id: by.id });
    }

    if (by.title) {
      query.andWhere(`"${this.movieAlias}"."title" like :title`, { title: `%${by.title}%` });
    }

    if (by.artist) {
      query.andWhere(`"${this.movieAlias}"."cast" like :cast`, { cast: `%${by.artist}%` });
    }

    if (by.genres) {
      query.andWhere(`"genre"."id" in(:genreIds)`, { genreIds: by.genres.join(',') });
    }
  }
}
