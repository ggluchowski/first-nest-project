import { OrderedProducts } from 'src/orders/db/orderedProducts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({ type: 'int', default: 1 })
  count: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // info?: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'products_tags',
    joinColumn: {
      name: 'productId',
    },
    inverseJoinColumn: {
      name: 'tagId',
    },
  })
  tags: Array<Tag>;

  @OneToOne(() => OrderedProducts, (orderedProducts) => orderedProducts.product)
  orderedProducts: OrderedProducts;
}
