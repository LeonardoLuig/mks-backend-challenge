export type CreateUserEntityPayload = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
