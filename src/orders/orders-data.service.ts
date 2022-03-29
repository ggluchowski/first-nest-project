import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { Order } from './db/order.entity';
import { OrderRepository } from './db/order.repository';
import { OrderedProductsRepository } from './db/orderedProducts.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersDataService {
  constructor(
    private orderRepository: OrderRepository,
    private orderedProductRepository: OrderedProductsRepository,
    private connection: Connection,
  ) {}

  // async addOrder(newOrder: CreateOrderDto): Promise<Order> {
  //   return this.connection.transaction(async (manager: EntityManager) => {});
  // }

  // async updateOrder(id: string, dto: UpdateOrderDto): Promise<Order> {
  //   return this.connection.transaction(async (manager: EntityManager) => {

  //   })
  // }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}
