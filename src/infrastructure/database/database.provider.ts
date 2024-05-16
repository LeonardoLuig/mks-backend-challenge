import { TypeOrmDirectory } from '@infrastructure/adapters/persistence/typeorm/TypeOrmDirectory';
import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { DatabaseDITokens } from '@infrastructure/database/di/DatabaseDITokens';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const databaseProvider: Provider[] = [
  {
    provide: DatabaseDITokens.DataSource,
    useFactory: async () => {
      const dataSource: DataSource = new DataSource({
        type: 'postgres',
        host: DatabaseConfig.HOST,
        port: DatabaseConfig.PORT,
        username: DatabaseConfig.USERNAME,
        password: DatabaseConfig.PASSWORD,
        database: DatabaseConfig.NAME,
        entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`],
        migrations: [`${TypeOrmDirectory}/migration/**/*{.ts,.js}`],
        synchronize: DatabaseConfig.SYNC,
        logging: DatabaseConfig.LOG_ENABLE,
      });

      return dataSource.initialize();
    },
  },
];
