import { get } from 'env-var';

export class DatabaseConfig {
  public static readonly HOST: string = get('DB_HOST').required().asString();

  public static readonly PORT: number = get('DB_PORT').required().asPortNumber();

  public static readonly USERNAME: string = get('DB_USERNAME').required().asString();

  public static readonly PASSWORD: string = get('DB_PASSWORD').required().asString();

  public static readonly NAME: string = get('DB_NAME').required().asString();

  public static readonly LOG_ENABLE: boolean = get('DB_LOG_ENABLE').asBool() || false;

  public static readonly SYNC: boolean = get('DB_SYNC').asBool() || false;
}
