import { UseCaseAdapterValidator } from '@core/common/adapter-validator/usecase/UseCaseAdapterValidator';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidatorDetails } from '@core/common/utils/class-validator/types/ClassValidatorTypes';
import { IsDate, IsEmail, IsString } from 'class-validator';

class MockUseCaseAdapter extends UseCaseAdapterValidator {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsDate()
  public bornAt: Date;

  constructor(name: string, email: string, bornAt: Date) {
    super();

    this.name = name;
    this.email = email;
    this.bornAt = bornAt;
  }
}

describe('UseCaseAdapterValidator', () => {
  describe('validate', () => {
    test("When MockUseCaseAdapter is valid, expect it does't throws Exception", async () => {
      const mockUseCase: MockUseCaseAdapter = new MockUseCaseAdapter('Username', 'useremail@gmail.com', new Date());
      expect(mockUseCase.validate()).resolves.toBeUndefined();
    });
    test('When MockUseCaseAdapter is invalid, expect it throws Exception', async () => {
      const name: unknown = 1;
      const email: unknown = 'invalid email';
      const bornAt: unknown = new Date();

      const mockUseCase: MockUseCaseAdapter = new MockUseCaseAdapter(name as string, email as string, bornAt as Date);

      try {
        await mockUseCase.validate();
      } catch (ex) {
        const exception: Exception<ClassValidatorDetails> = ex as Exception<ClassValidatorDetails>;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.USE_CASE_PORT_VALIDATION_ERROR.code);
      }
    });
  });
});
