import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/types/CommonTypes';
import { Movie } from '@core/domain/movie/entity/Movie';

export interface IMovieRepository {
  findMovie(by: { id: string }): Promise<Optional<Movie>>;
  findMovies(by: { title?: string; artist?: string; genres?: number[] }, options?: RepositoryFindOptions): Promise<Movie[]>;
  countMovies(by: { title?: string; artist?: string; genres?: number[] }): Promise<number>;
  addMovie(movie: Movie): Promise<{ id: string }>;
  updateMovie(movie: Movie): Promise<void>;
  deleteMovie(movie: Movie): Promise<void>;
}
