import { GenreUseCaseDto } from '@core/domain/genre/dto/usecase/GenreUseCaseDto';
import { Genre } from '@core/domain/genre/entity/Genre';
import { IGenreRepository } from '@core/domain/genre/interfaces/persistence/IGenreRepository';
import { IGetGenreListUseCase } from '@core/domain/genre/interfaces/usecase/IGetGenreListUseCase';

export class GetGenreListService implements IGetGenreListUseCase {
  constructor(private readonly genreRepository: IGenreRepository) {}

  async execute(payload: void): Promise<GenreUseCaseDto[]> {
    const genres: Genre[] = await this.genreRepository.findGenres();

    return GenreUseCaseDto.newFromGeres(genres);
  }
}
