import { HttpAuth } from '@application/auth/decorators/HttpAuth';
import { HttpApiResponseGenreList } from '@application/controller/doc/genre/HttpApiResponseGenreList';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { GenreDITokens } from '@core/domain/genre/di/GenreDITokens';
import { GenreUseCaseDto } from '@core/domain/genre/dto/usecase/GenreUseCaseDto';
import { IGetGenreListUseCase } from '@core/domain/genre/interfaces/usecase/IGetGenreListUseCase';
import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('genre')
@ApiTags('genres')
export class GenreController {
  constructor(@Inject(GenreDITokens.GetGenreListUseCase) private readonly getGenreListUseCase: IGetGenreListUseCase) {}

  @Get()
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseGenreList })
  async getGenreList(): Promise<CoreApiResponse<GenreUseCaseDto[]>> {
    const genreList: GenreUseCaseDto[] = await this.getGenreListUseCase.execute();

    return CoreApiResponse.success(genreList);
  }
}
