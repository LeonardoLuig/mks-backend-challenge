import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';

export type CreateMovieEntityPayload = {
  id?: string;
  title: string;
  description: string;
  cast: string[];
  genres: MovieGenre[];
  director: string;
  releaseYear: number;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
