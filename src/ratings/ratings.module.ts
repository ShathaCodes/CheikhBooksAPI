import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService],
  imports: [TypeOrmModule.forFeature([Rating])],

})
export class RatingsModule {}
