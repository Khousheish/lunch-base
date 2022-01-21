import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/shared/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './shared/dto/create-order.dto';
import { Order } from './shared/entities/order.entity';
@Injectable()
export class OrdersService {
  public constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  public async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order[]> {
    const userResponse: User = await this.usersRepository.findOne(user.id);

    if (!userResponse) {
      throw new UnauthorizedException();
    }
    const orders: Order[] = await this.ordersRepository.createOrder(
      createOrderDto,
      user.id,
    );
    return orders;
  }

  public async getAllOrders(user: User): Promise<Order[]> {
    return this.ordersRepository.getAllOrders(user);
  }
}
