import { AuthModule } from '@application/di/AuthModule';
import { GenreModule } from '@application/di/GenreModule';
import { HealthModule } from '@application/di/HealthModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { MovieModule } from '@application/di/MovieModule';
import { UserModule } from '@application/di/UserModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, UserModule, AuthModule, MovieModule, GenreModule, HealthModule],
})
export class RootModule {}
