import { Product } from 'src/products/db/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn()
  order: Order;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: Product;
}
