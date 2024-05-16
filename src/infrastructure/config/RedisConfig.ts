import { get } from 'env-var';

export class RedisConfig {
  public static readonly PORT: number = get('REDIS_PORT').required().asPortNumber();

  public static readonly HOST: string = get('REDIS_HOST').required().asString();
}
