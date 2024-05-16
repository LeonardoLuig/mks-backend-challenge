import { ApiProperty } from '@nestjs/swagger';

export class HttpApiModelMovie {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'string array' })
  public cast: string[];

  @ApiProperty({ type: 'object array' })
  public genre: { id: number; name: string }[];

  @ApiProperty({ type: 'string' })
  public director: string;

  @ApiProperty({ type: 'number' })
  public releaseYear: number;

  @ApiProperty({ type: 'number' })
  public duration: number;

  @ApiProperty({ type: 'number' })
  public createdAt: number;

  @ApiProperty({ type: 'number', nullable: true })
  public updatedAt: number;

  @ApiProperty({ type: 'number', nullable: true })
  public removedAt: number;
}
