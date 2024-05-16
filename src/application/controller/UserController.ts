import { HttpApiModelCreateUserBody } from '@application/controller/doc/user/HttpApiModelCreateUserBody';
import { HttpApiResponseUser } from '@application/controller/doc/user/HttpApiResponseUser';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { UserUseCaseDto } from '@core/domain/user/dto/usecase/UserUseCaseDto';
import { ICreateUserUseCase } from '@core/domain/user/interfaces/usecase/ICreateUserUseCase';
import { CreateUserAdapter } from '@infrastructure/adapters/usecase/user/CreateUserAdapter';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject(UserDITokens.CreateUserUseCase) private readonly createUserUseCase: ICreateUserUseCase) {}

  @Post('account')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: HttpApiModelCreateUserBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseUser })
  public async createAccount(@Body() body: HttpApiModelCreateUserBody): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(adapter);

    return CoreApiResponse.success(createdUser);
  }
}
