import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUser() user: User, @Body() createRatingDto: CreateRatingDto) {
    createRatingDto.user = user;
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id, {});
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    const rating = await this.ratingsService.findOne(+id, { "relations": ["user"] })
    if (rating.user.id === user.id)
      return this.ratingsService.update(+id, updateRatingDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@GetUser() user: User, @Param('id') id: string) {
    const rating = await this.ratingsService.findOne(+id, { "relations": ["user"] })
    if (rating.user.id === user.id)
      return this.ratingsService.remove(+id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
