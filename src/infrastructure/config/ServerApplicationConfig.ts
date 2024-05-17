import { LogLevel } from '@nestjs/common';
import { get } from 'env-var';

export class ServerApplicationConfig {
  public static readonly NODE_ENV: string = get('NODE_ENV').required().asString();

  public static readonly PORT: number = get('API_PORT').required().asPortNumber();

  public static readonly HOST?: string = get('API_HOST').asString();

  public static readonly ACCESS_TOKEN_SECRET: string = get('API_ACCESS_TOKEN_SECRET').required().asString();

  public static readonly ACCESS_TOKEN_TTL_IN_HOURS: number = get('API_ACCESS_TOKEN_TTL_IN_HOURS').required().asPortNumber();

  public static readonly LOG_ENABLE: boolean = get('API_LOG_ENABLE').asBool() || true;

  public static readonly LOG_LEVEL: LogLevel[] = (get('API_LOG_LEVEL').asArray() as LogLevel[]) || ['log'];
}
