import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUser() user: User, @Body() createReviewDto: CreateReviewDto) {
    createReviewDto.user = user;
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id, {});
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewsService.findOne(+id, { "relations": ["user"] })
    if (review.user.id === user.id)
      return this.reviewsService.update(+id, updateReviewDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@GetUser() user: User, @Param('id') id: string) {
    const review = await this.reviewsService.findOne(+id, { "relations": ["user"] })
    if (review.user.id === user.id)
      return this.reviewsService.remove(+id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

  }
}
