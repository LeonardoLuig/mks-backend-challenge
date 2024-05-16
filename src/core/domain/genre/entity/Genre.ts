import { Entity } from '@core/common/entity/Entity';
import { IsString } from 'class-validator';

export class Genre extends Entity<number> {
  @IsString()
  private name: string;

  constructor(id: number, name: string) {
    super();

    this.id = id;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
