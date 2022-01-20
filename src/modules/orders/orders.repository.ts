import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/shared/entities/user.entity';
import { CreateOrderDto } from './shared/dto/create-order.dto';
import { Order } from './shared/entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async createOrder(
    { validDates }: CreateOrderDto,
    userId: number,
  ): Promise<Order[]> {
    const orders: Order[] = [];

    validDates.forEach((date: Date) => {
      let order: Order = new Order();
      order.validDate = date;
      order.userId = userId;
      orders.push(order);
    });

    await this.createQueryBuilder()
      .insert()
      .into(Order)
      .values(orders)
      .execute();

    const response: Order[] = await this.find({ received: false, userId });

    return response;
  }

  public async getAllOrders(user: User): Promise<Order[]> {
    return this.find(
      user.admin
        ? { validDate: new Date(), received: false }
        : { userId: user.id, received: false },
    );
  }
}
