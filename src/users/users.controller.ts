import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  /*
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  */
  @Get()
  findAll() {
    return this.usersService.findAll({ relations: ["score"] });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id, { relations: ["score"] });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@GetUser() user: User, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (id === user.id + "")
      return this.usersService.update(+id, updateUserDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@GetUser() user: User, @Param('id') id: string) {
    if (id === user.id + "")
      return this.usersService.remove(+id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
