import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUser() user: User, @Body() createAddressDto: CreateAddressDto) {
    createAddressDto.user = user;
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetUser() user: User) {
    return this.addressesService.findAll({
      where: {
        user: user.id
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id, {});
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const address = await this.addressesService.findOne(+id, { "relations": ["user"] })
    if (address.user.id === user.id)
      return this.addressesService.update(+id, updateAddressDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@GetUser() user: User, @Param('id') id: string) {
    const address = await this.addressesService.findOne(+id, { "relations": ["user"] })
    if (address.user.id === user.id)
      return this.addressesService.remove(+id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
