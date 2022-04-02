import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/orderStatus.enum';
import { OrderedProducts } from './orderedProducts.entity';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  extraInfo?: string;

  @Column('enum', {
    enum: OrderStatus,
  })
  orderStatus: OrderStatus;

  @Column({ default: 0, type: 'float' })
  price: number;

  @OneToMany(() => OrderedProducts, (orderdProducts) => orderdProducts.order, {
    eager: true,
  })
  orderedProducts: Array<OrderedProducts>;

  @ManyToOne(() => User, (user) => user.order, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => UserAddress, (address) => address.id, {
    eager: true,
  })
  @JoinColumn()
  address: UserAddress;
}
