import { Exclude } from 'class-transformer';
import { User } from 'src/modules/users/shared/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'date' })
  validDate: Date;

  @Column({ default: false })
  received: boolean;

  @Exclude()
  @ManyToOne((type) => User, (user) => user.orders, { eager: true })
  user: User;

  @Column()
  userId: number;
}
