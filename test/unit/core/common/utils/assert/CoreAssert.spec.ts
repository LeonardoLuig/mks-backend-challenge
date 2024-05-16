import { CoreAssert } from '@core/common/utils/assert/CoreAssert';

describe('CoreAssert', () => {
  const assertionError: Error = new Error('AssertionError');

  describe('isTrue', () => {
    test("When input value is true, expect it doesn't throws error", () => {
      expect(CoreAssert.isTrue(true, assertionError)).toBeUndefined();
    });
    test('When input value is false, expect it throws error', () => {
      try {
        CoreAssert.isTrue(false, assertionError);
      } catch (e) {
        expect(e).toEqual(assertionError);
      }
    });
  });
  describe('isFalse', () => {
    test("When input value is false, expect it doesn't throws error", () => {
      expect(CoreAssert.isFalse(false, assertionError)).toBeUndefined();
    });
    test('When input value is true, expect it throws error', () => {
      try {
        CoreAssert.isFalse(true, assertionError);
      } catch (e) {
        expect(e).toEqual(assertionError);
      }
    });
  });
  describe('notEmpty', () => {
    test("When input value is not <NULL|UNDEFINED>, expect it doesn't throws error", () => {
      expect(CoreAssert.notEmpty({}, assertionError)).toEqual({});
    });
    test('When input value is NULL, expect it throws error', () => {
      try {
        CoreAssert.notEmpty(null, assertionError);
      } catch (e) {
        expect(e).toEqual(assertionError);
      }
    });
    test('When input value is UNDEFINED, expect it throws error', () => {
      try {
        CoreAssert.notEmpty(undefined, assertionError);
      } catch (e) {
        expect(e).toEqual(assertionError);
      }
    });
  });
});
