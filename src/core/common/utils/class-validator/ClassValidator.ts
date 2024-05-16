import { Optional } from '@core/common/types/CommonTypes';
import { ClassValidatorDetails, ClassValidatorError } from '@core/common/utils/class-validator/types/ClassValidatorTypes';
import { ValidationError, validate } from 'class-validator';

export class ClassValidator {
  public static async validate<TTarget extends object>(target: TTarget, context?: string): Promise<Optional<ClassValidatorDetails>> {
    let details: Optional<ClassValidatorDetails>;
    const errors: ValidationError[] = await validate(target);

    if (!!errors.length) {
      details = {
        context: context || target.constructor.name,
        errors: [],
      };
      details.errors = this.mapErrors(errors) || [];
    }

    return details;
  }

  private static mapErrors(errors: Optional<ValidationError[]> | ValidationError[]): Optional<ClassValidatorError[]> {
    const mappedErrors: ClassValidatorError[] = [];

    if (!!errors?.length)
      for (const error of errors) {
        mappedErrors.push({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
          children: this.mapErrors(error.children),
        });
      }

    return mappedErrors;
  }
}
