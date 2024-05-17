import { NestHttpExceptionFilter } from '@application/exception-filters/NestHttpExceptionFilter';
import { NestHttpLoggingInterceptor } from '@application/interceptor/NestHttpLoggingInterceptor';
import { TypeOrmDirectory } from '@infrastructure/adapters/persistence/typeorm/TypeOrmDirectory';
import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { ServerApplicationConfig } from '@infrastructure/config/ServerApplicationConfig';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisConfig } from '@infrastructure/config/RedisConfig';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: NestHttpExceptionFilter,
  },
];

if (ServerApplicationConfig.LOG_ENABLE) {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: NestHttpLoggingInterceptor,
  });
}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DatabaseConfig.HOST,
      port: DatabaseConfig.PORT,
      username: DatabaseConfig.USERNAME,
      password: DatabaseConfig.PASSWORD,
      database: DatabaseConfig.NAME,
      entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`],
      migrations: [`${TypeOrmDirectory}/migration/**/*{.ts,.js}`],
      migrationsRun: true,
      synchronize: DatabaseConfig.SYNC,
      logging: DatabaseConfig.LOG_ENABLE,
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore,
        url: RedisConfig.URL,
      }),
    }),
  ],

  providers: [...providers],
})
export class InfrastructureModule {
  constructor(private dataSource: DataSource) {}
}
