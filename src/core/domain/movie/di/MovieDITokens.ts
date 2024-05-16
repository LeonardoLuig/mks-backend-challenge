export class MovieDITokens {
  // repository
  public static readonly MovieRepository: unique symbol = Symbol('MovieRepository');

  // usecases
  public static readonly GetMovieUseCase: unique symbol = Symbol('GetMovieUseCase');

  public static readonly GetMovieListUseCase: unique symbol = Symbol('GetMovieListUseCase');

  public static readonly CreateMovieUseCase: unique symbol = Symbol('CreateMovieUseCase');

  public static readonly EditMovieUseCase: unique symbol = Symbol('EditMovieUseCase');

  public static readonly RemoveMovieUseCase: unique symbol = Symbol('RemoveMovieUseCase');

  // typeorm table source
  public static readonly TypeOrmMovieSource: unique symbol = Symbol('TypeOrmMovieSource');
}
