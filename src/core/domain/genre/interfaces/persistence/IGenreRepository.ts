import { Genre } from '@core/domain/genre/entity/Genre';

export interface IGenreRepository {
  findGenres(): Promise<Genre[]>;
  countGenre(by: { id: number }): Promise<number>;
}
