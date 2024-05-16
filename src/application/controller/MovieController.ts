import { HttpAuth } from '@application/auth/decorators/HttpAuth';
import { HttpApiModelCreateMovieBody } from '@application/controller/doc/movie/HttpApiModelCreateMovieBody';
import { HttpApiModelEditMovieBody } from '@application/controller/doc/movie/HttpApiModelEditMovieBody';
import { HttpApiModelGetMovieListBody } from '@application/controller/doc/movie/HttpApiModelGetMovieListBody';
import { HttpApiResponseMovie } from '@application/controller/doc/movie/HttpApiResponseMovie';
import { HttpApiResponseMovieList } from '@application/controller/doc/movie/HttpApiResponseMovieList';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { MovieDITokens } from '@core/domain/movie/di/MovieDITokens';
import { MovieUseCaseDto } from '@core/domain/movie/dto/usecase/MovieUseCaseDto';
import { ICreateMovieUseCase } from '@core/domain/movie/interfaces/usecase/ICreateMovieUseCase';
import { IEditMovieUseCase } from '@core/domain/movie/interfaces/usecase/IEditMovieUseCase';
import { IGetMovieListUseCase } from '@core/domain/movie/interfaces/usecase/IGetMovieListUseCase';
import { IGetMovieUseCase } from '@core/domain/movie/interfaces/usecase/IGetMovieUseCase';
import { IRemoveMovieUseCase } from '@core/domain/movie/interfaces/usecase/IRemoveMovieUseCase';
import { CreateMovieAdapter } from '@infrastructure/adapters/usecase/movie/CreateMovieAdapter';
import { EditMovieAdapter } from '@infrastructure/adapters/usecase/movie/EditMovieAdapter';
import { GetMovieListAdapter } from '@infrastructure/adapters/usecase/movie/GetMovieListAdapter';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('movie')
@ApiTags('movie')
export class MovieController {
  constructor(
    @Inject(MovieDITokens.GetMovieUseCase) private readonly getMovieUseCase: IGetMovieUseCase,
    @Inject(MovieDITokens.GetMovieListUseCase) private readonly getMovieListUseCase: IGetMovieListUseCase,
    @Inject(MovieDITokens.CreateMovieUseCase) private readonly createMovieUseCase: ICreateMovieUseCase,
    @Inject(MovieDITokens.EditMovieUseCase) private readonly editMovieUseCase: IEditMovieUseCase,
    @Inject(MovieDITokens.RemoveMovieUseCase) private readonly removeMovieUseCase: IRemoveMovieUseCase,
  ) {}

  @Get(':id')
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseMovie })
  async getMovie(@Param('id') movieId: string): Promise<CoreApiResponse<MovieUseCaseDto>> {
    return CoreApiResponse.success(await this.getMovieUseCase.execute({ movieId }));
  }

  @Post()
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpApiModelGetMovieListBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseMovieList })
  async getMovieList(@Body() body: HttpApiModelGetMovieListBody): Promise<CoreApiResponse<MovieUseCaseDto[]>> {
    const adapter: GetMovieListAdapter = await GetMovieListAdapter.new({
      title: body.title,
      artist: body.artist,
      genres: body.genres,
      limit: body.limit,
      offset: body.offset,
    });

    const movieList: MovieUseCaseDto[] = await this.getMovieListUseCase.execute(adapter);

    return CoreApiResponse.success(movieList);
  }

  @Post('new')
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpApiModelCreateMovieBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseMovie })
  async createMovie(@Body() body: HttpApiModelCreateMovieBody): Promise<CoreApiResponse<MovieUseCaseDto>> {
    const adapter: CreateMovieAdapter = await CreateMovieAdapter.new({
      title: body.title,
      description: body.description,
      cast: body.cast,
      genres: body.genres,
      director: body.director,
      releaseYear: body.releaseYear,
      duration: body.duration,
    });

    const createdMovie: MovieUseCaseDto = await this.createMovieUseCase.execute(adapter);

    return CoreApiResponse.success(createdMovie);
  }

  @Post('edit/:id')
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: HttpApiModelEditMovieBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpApiResponseMovie })
  async editMovie(@Param('id') movieId: string, @Body() body: HttpApiModelEditMovieBody): Promise<CoreApiResponse<MovieUseCaseDto>> {
    const adapter: EditMovieAdapter = await EditMovieAdapter.new({
      movieId,
      title: body.title,
      description: body.description,
      cast: body.cast,
      genres: body.genres,
      director: body.director,
      releaseYear: body.releaseYear,
      duration: body.duration,
    });

    const editedMovie: MovieUseCaseDto = await this.editMovieUseCase.execute(adapter);

    return CoreApiResponse.success(editedMovie);
  }

  @Delete('delete/:id')
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK })
  async removeMovie(@Param('id') movieId: string): Promise<CoreApiResponse<void>> {
    await this.removeMovieUseCase.execute({ movieId });

    return CoreApiResponse.success();
  }
}
