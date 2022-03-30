import { Order } from 'src/orders/db/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_Adresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  country: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  street: string;

  @Column({ type: 'int' })
  buildingNumber: number;

  @Column({ type: 'int' })
  flatNumber?: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToOne(() => Order, (order) => order.address)
  order: Order;
}
