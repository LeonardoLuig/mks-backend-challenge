import { UseCaseAdapterValidator } from '@core/common/adapter-validator/usecase/UseCaseAdapterValidator';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { plainToClass } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserAdapter extends UseCaseAdapterValidator implements CreateUserPort {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  public static async new(payload: CreateUserPort) {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
