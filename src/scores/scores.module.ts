import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService],
  imports: [TypeOrmModule.forFeature([Score])],
})
export class ScoresModule {}
