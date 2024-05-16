import { Entity } from '@core/common/entity/Entity';
import { IRemovableEntity } from '@core/common/entity/IRemovableEntity';
import { Nullable } from '@core/common/types/CommonTypes';
import { CreateUserEntityPayload } from '@core/domain/user/entity/types/CreateUserEntityPayload';
import { compare, genSalt, hash } from 'bcryptjs';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';

export class User extends Entity<string> implements IRemovableEntity {
  @IsString()
  public name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  private password: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private updatedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: CreateUserEntityPayload) {
    super();

    this.id = payload.id || v4();
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;

    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || null;
    this.removedAt = payload.removedAt || null;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Nullable<Date> {
    return this.updatedAt;
  }

  public getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  private async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user: User = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }
}
