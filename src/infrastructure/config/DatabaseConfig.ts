import { get } from 'env-var';

export class DatabaseConfig {
  public static readonly URL: string = get('DB_URL').required().asString();

  public static readonly LOG_ENABLE: boolean = get('DB_LOG_ENABLE').asBool() || false;

  public static readonly SYNC: boolean = get('DB_SYNC').asBool() || false;
}
