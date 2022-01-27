import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRoleEnum } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  /*
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  */
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll({ relations: ["score"] });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  find(@GetUser() user: User) {
    return this.usersService.findOne(user.id, { relations: ["score", "books", "adreesses"] });
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id, { relations: ["score"] });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (id === user.id + "" || user.role == UserRoleEnum.admin) {
      let password = updateUserDto.password;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      updateUserDto.password = hashedPassword;
      return this.usersService.update(+id, updateUserDto);
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@GetUser() user: User, @Param('id') id: string) {
    if (id === user.id + "" || user.role == UserRoleEnum.admin)
      return this.usersService.remove(+id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
