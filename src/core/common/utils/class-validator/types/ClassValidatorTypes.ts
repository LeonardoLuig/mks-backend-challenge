import { Optional } from '@core/common/types/CommonTypes';

export type ClassValidatorError = {
  property: string;
  message: string[];
  children: Optional<ClassValidatorError[]>;
};

export type ClassValidatorDetails = {
  context: string;
  errors: ClassValidatorError[];
};
