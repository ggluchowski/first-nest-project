import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/orderStatus.enum';
import { OrderedProducts } from './orderedProducts.entity';

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

  @OneToMany(
    (type) => OrderedProducts,
    (orderdProducts) => orderdProducts.order,
  )
  orderedProducts: OrderedProducts[];

  @OneToOne((type) => User, (user) => user.order)
  user: User;

  @OneToOne((type) => UserAddress, (address) => address.id)
  address: UserAddress;
}
