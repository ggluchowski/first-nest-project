import { Order } from 'src/orders/db/order.entity';
import { Roles } from 'src/shared/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfBirth: Date;

  @Column('enum', {
    enum: Roles,
  })
  position: Roles;

  @OneToMany(() => UserAddress, (adress) => adress.user)
  address?: Array<UserAddress>;

  @OneToMany(() => Order, (order) => order.user)
  order: Array<Order>;
}
