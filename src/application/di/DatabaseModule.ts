import { databaseProvider } from '@infrastructure/database/database.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
