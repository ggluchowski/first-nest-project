import { Product } from 'src/products/db/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({
  name: 'orderedProducts',
})
export class OrderedProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  count: number;

  @OneToOne((type) => Order, (order) => order.id)
  order: Order;

  @OneToOne((type) => Product, (product) => product.id)
  product: Product;
}
