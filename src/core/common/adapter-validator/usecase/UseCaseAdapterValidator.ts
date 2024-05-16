import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/types/CommonTypes';
import { ClassValidator } from '@core/common/utils/class-validator/ClassValidator';
import { ClassValidatorDetails } from '@core/common/utils/class-validator/types/ClassValidatorTypes';

export class UseCaseAdapterValidator {
  public async validate() {
    const details: Optional<ClassValidatorDetails> = await ClassValidator.validate(this);
    if (details)
      throw Exception.new({
        code: Code.USE_CASE_PORT_VALIDATION_ERROR,
        data: details,
      });
  }
}
