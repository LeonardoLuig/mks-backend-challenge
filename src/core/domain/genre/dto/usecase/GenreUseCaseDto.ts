import { Genre } from '@core/domain/genre/entity/Genre';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GenreUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  public static newFromGenre(genre: Genre): GenreUseCaseDto {
    return plainToClass(GenreUseCaseDto, genre);
  }

  public static newFromGeres(genres: Genre[]): GenreUseCaseDto[] {
    return genres.map((genre) => this.newFromGenre(genre));
  }
}
