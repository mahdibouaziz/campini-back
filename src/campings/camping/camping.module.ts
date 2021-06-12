import { Module } from '@nestjs/common';
import { CampingService } from './camping.service';
import { CampingController } from './camping.controller';

@Module({
  controllers: [CampingController],
  providers: [CampingService],
})
export class CampingModule {}
