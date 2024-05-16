import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/types/CommonTypes';
import { ClassValidatorDetails } from '../utils/class-validator/types/ClassValidatorTypes';
import { ClassValidator } from '../utils/class-validator/ClassValidator';

export class Entity<TIdentity extends string | number> {
  protected id: Optional<TIdentity>;

  public getId(): TIdentity {
    if (this.id === undefined)
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: ID is empty.`,
      });

    return this.id;
  }

  public setId(id: TIdentity): void {
    this.id = id;
  }

  public async validate(): Promise<void> {
    const details: Optional<ClassValidatorDetails> = await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
