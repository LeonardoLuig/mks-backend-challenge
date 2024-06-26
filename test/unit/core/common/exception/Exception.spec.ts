import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';

describe('Exception', () => {
  describe('new', () => {
    test('When input data & overrideMessage are empty, expect it creates Exception instance with default parameters', () => {
      const exception: Exception<void> = Exception.new({ code: Code.BAD_REQUEST_ERROR });

      expect(exception.code).toBe(Code.BAD_REQUEST_ERROR.code);
      expect(exception.message).toBe(Code.BAD_REQUEST_ERROR.message);
      expect(exception.data).toBeUndefined();
    });
    test('When input data && overrideMessage are set, expect it creates Exception instance with custom parameters', () => {
      const customMessage: string = 'custom bad request error.';
      const customData: Record<string, unknown> = {
        result: 'Custom Bad Request Error!',
      };

      const exception: Exception<Record<string, unknown>> = Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: customMessage,
        data: customData,
      });

      expect(exception.code).toBe(Code.BAD_REQUEST_ERROR.code);
      expect(exception.message).toBe(customMessage);
      expect(exception.data).toBe(customData);
    });
  });
});
