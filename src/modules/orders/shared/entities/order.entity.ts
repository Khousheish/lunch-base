import { Transform } from 'class-transformer';
import moment from 'moment';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  received: boolean;
}
