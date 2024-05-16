import { HealthController } from '@application/controller/HealthController';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
