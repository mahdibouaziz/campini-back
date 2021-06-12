import { Module } from '@nestjs/common';
import { CampingService } from './camping.service';
import { CampingController } from './camping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camping } from './entities/camping.entity';
import { User } from 'src/users/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camping, User])],
  controllers: [CampingController],
  providers: [CampingService],
})
export class CampingModule {}
