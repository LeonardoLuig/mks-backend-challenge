export type CreateMoviePort = {
  title: string;
  description: string;
  cast: string;
  genres: { id: number; name: string }[];
  director: string;
  releaseYear: number;
  duration: number;
};
