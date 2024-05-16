export interface IUseCase<UseCasePort, UseCaseResult> {
  execute(payload: UseCasePort): Promise<UseCaseResult>;
}
