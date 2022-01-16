import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService extends CrudService<Rating> {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingrepository: Repository<Rating>,
  ) {
    super(ratingrepository);
  }
}