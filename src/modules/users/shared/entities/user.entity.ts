import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public vegetarian: boolean;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  public active: boolean;

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
