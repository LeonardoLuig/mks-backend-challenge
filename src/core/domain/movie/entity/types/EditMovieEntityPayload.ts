import { MovieGenre } from '@core/domain/movie/entity/MovieGenre';

export type EditMovieEntityPayload = {
  title?: string;
  description?: string;
  cast?: string[];
  genres?: MovieGenre[];
  director?: string;
  releaseYear?: number;
  duration?: number;
};
