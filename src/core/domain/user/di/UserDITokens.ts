export class UserDITokens {
  //repository
  public static readonly UserRepository: unique symbol = Symbol('UserRepository');

  // usecases
  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');

  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');

  // typeorm table source
  public static readonly TypeOrmUserSource: unique symbol = Symbol('TypeOrmUserSource');
}
