import { Optional } from '@core/common/types/CommonTypes';
import { Movie } from '@core/domain/movie/entity/Movie';

export interface IMovieRepository {
  findMovie(by: { id: string }): Promise<Optional<Movie>>;
  findMovies(by: { title?: string; artist?: string; genres?: number[] }): Promise<Movie[]>;
  addMovie(movie: Movie): Promise<{ id: string }>;
  updateMovie(movie: Movie): Promise<void>;
  deleteMovie(movie: Movie): Promise<void>;
}
