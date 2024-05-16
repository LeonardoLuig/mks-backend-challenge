export class GenreDITokens {
  // repository
  public static readonly GenreRepository: unique symbol = Symbol('GenreRepository');

  // usecase
  public static readonly GetGenreListUseCase: unique symbol = Symbol('GetGenreListUseCase');

  // typeorm table source
  public static readonly TypeOrmGenreSource: unique symbol = Symbol('TypeOrmGenreSource');
}
