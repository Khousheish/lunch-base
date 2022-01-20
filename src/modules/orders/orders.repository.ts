import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './shared/dto/create-order.dto';
import { Order } from './shared/entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async createOrder({ validDates }: CreateOrderDto): Promise<Order[]> {
    const orders: Order[] = [];

    validDates.forEach((date: Date) => {
      let order: Order = new Order();
      order.validDate = date;
      order.received = false;
      orders.push(order);
    });

    await this.createQueryBuilder()
      .insert()
      .into(Order)
      .values(orders)
      .execute();

    const response: Order[] = await this.find({ received: false });

    return response;
  }
}
