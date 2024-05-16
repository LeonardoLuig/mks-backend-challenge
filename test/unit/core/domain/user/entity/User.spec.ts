import { User } from '@core/domain/user/entity/User';
import { CreateUserEntityPayload } from '@core/domain/user/entity/types/CreateUserEntityPayload';
import { v4 } from 'uuid';

describe('User', () => {
  describe('new', () => {
    test('when custom parameters are empty, expect it creates User instance with default parameters', async () => {
      const currentDate: number = Date.now();

      const createUserEntityPayload: CreateUserEntityPayload = {
        name: v4(),
        email: 'useremail@gmail.com',
        password: v4(),
      };

      const user: User = await User.new(createUserEntityPayload);

      expect(typeof user.getId() === 'string').toBeTruthy();
      expect(user.getName()).toBe(createUserEntityPayload.name);
      expect(user.getEmail()).toBe(createUserEntityPayload.email);
      expect(user.getPassword).not.toBe(createUserEntityPayload.password);
      expect(user.getCreatedAt().getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(user.getUpdatedAt()).toBeNull();
      expect(user.getRemovedAt()).toBeNull();
    });
    test('when custom parameters are set, expect it creates User instance with custom parameters', async () => {
      const customId: string = v4();
      const customCreatedAt: Date = new Date(Date.now() - 3000);
      const customUpdatedAt: Date = new Date(Date.now() - 2000);
      const customRemovedAt: Date = new Date(Date.now() - 1000);

      const createUserEntityPayload: CreateUserEntityPayload = {
        id: customId,
        name: v4(),
        email: 'useremail@gmail.com',
        password: v4(),
        createdAt: customCreatedAt,
        updatedAt: customUpdatedAt,
        removedAt: customRemovedAt,
      };

      const user: User = await User.new(createUserEntityPayload);

      expect(typeof user.getId() === 'string').toBeTruthy();
      expect(user.getName()).toBe(createUserEntityPayload.name);
      expect(user.getEmail()).toBe(createUserEntityPayload.email);
      expect(user.getPassword).not.toBe(createUserEntityPayload.password);
      expect(user.getCreatedAt()).toBe(customCreatedAt);
      expect(user.getUpdatedAt()).toBe(customUpdatedAt);
      expect(user.getRemovedAt()).toBe(customRemovedAt);
    });
  });
  describe('remove', () => {
    test('Expect it marks User instance as removed', async () => {
      const currentDate: number = Date.now();

      const user: User = await User.new({
        name: v4(),
        email: 'useremail@gmail.com',
        password: v4(),
      });

      await user.remove();

      expect(user.getRemovedAt()!.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });
  });
  describe('comparePassword', () => {
    test('When password is correct, expect it returns TRUE', async () => {
      const password: string = v4();

      const user: User = await User.new({
        name: v4(),
        email: 'guest@email.com',
        password: password,
      });

      await expect(user.comparePassword(password)).resolves.toBeTruthy();
    });

    test('When password is not correct, expect it returns FALSE', async () => {
      const password: string = v4();
      const incorrectPassword: string = password + v4();

      const user: User = await User.new({
        name: v4(),
        email: 'useremail@email.com',
        password: password,
      });

      await expect(user.comparePassword(incorrectPassword)).resolves.toBeFalsy();
    });
  });
});
