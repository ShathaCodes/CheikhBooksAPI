import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRoleEnum } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    createOrderDto.user = user;
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetUser() user: User) {
    return this.ordersService.findAll({
      where: {
        user: user.id
      },
    });
  }

  @Get("all")
  @UseGuards(AuthGuard('jwt'))
  findAllOrders(@GetUser() user: User) {
    if (user.role == UserRoleEnum.admin)
      return this.ordersService.findAll({});
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id, {});
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersService.findOne(+id, { "relations": ["user"] })
    if (order.user.id === user.id || user.role == UserRoleEnum.admin)
      return this.ordersService.update(+id, updateOrderDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@GetUser() user: User, @Param('id') id: string) {
    const order = await this.ordersService.findOne(+id, { "relations": ["user"] })
    if (order.user.id === user.id || user.role == UserRoleEnum.admin)
      return this.ordersService.remove(+id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

  }
}
