import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../users/shared/entities/user.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './shared/dto/create-order.dto';
import { Order } from './shared/entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiUnauthorizedResponse({ description: 'user not found' })
  @ApiCreatedResponse({ description: 'successful creation of an order' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() { user }: { user: User },
  ): Promise<Order[]> {
    return this.ordersService.createOrder(createOrderDto, user);
  }

  @ApiOkResponse({ description: 'returns list of activities' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async getAllOrders(@Req() { user }: { user: User }): Promise<Order[]> {
    return this.ordersService.getAllOrders(user);
  }
}
