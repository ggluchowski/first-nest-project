import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user' })
  user: User;
}
