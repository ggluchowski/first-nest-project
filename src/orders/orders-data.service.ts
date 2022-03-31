import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/db/product.entity';
import { ProductRepository } from 'src/products/db/product.repository';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { Connection, EntityManager, getRepository } from 'typeorm';
import { Order } from './db/order.entity';
import { OrderRepository } from './db/order.repository';
import { OrderedProducts } from './db/orderedProducts.entity';
import { OrderedProductsRepository } from './db/orderedProducts.repository';
import {
  CreateOrderDto,
  CreateOrderedProductDto,
} from './dto/create-order.dto';
import {
  UpdateOrderDto,
  UpdateOrderedProductDto,
} from './dto/update-order.dto';
import { OrderStatus } from './enums/orderStatus.enum';

@Injectable()
export class OrdersDataService {
  constructor(
    // private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private orderedProductRepository: OrderedProductsRepository,
    private connection: Connection,
  ) {}

  async saveOrderedProducts(
    productsTab:
      | Array<CreateOrderedProductDto>
      | Array<UpdateOrderedProductDto>,
    productRepository,
  ): Promise<OrderedProducts[]> {
    const orderedProductsArr: OrderedProducts[] = [];
    const idsArr = [];
    const countArr = [];

    for (const item of productsTab) {
      idsArr.push(item.productId);
      countArr.push(item.count);
    }

    const findProducts = await productRepository.findByIds(idsArr);

    for (let i; i < findProducts.length; i++) {
      const productToSave = new OrderedProducts();
      productToSave.createdAt = new Date();
      productToSave.updatedAt = new Date();
      productToSave.count = countArr[i];
      productToSave.price = findProducts[i].price * countArr[i];
      productToSave.product = findProducts[i];

      orderedProductsArr.push(productToSave);
      await this.orderedProductRepository.save(productToSave);
    }
    return orderedProductsArr;
  }

  sumPrices(productsArr: OrderedProducts[]): number {
    let sum = 0;

    for (const item of productsArr) {
      sum += item.price;
    }
    return sum;
  }

  async addOrder(newOrder: CreateOrderDto): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToSave = new Order();
      const productRepository = await getRepository(Product).find();
      const orderedProducts = await this.saveOrderedProducts(
        newOrder.orderedProducts,
        productRepository,
      );

      orderToSave.createdAt = new Date();
      orderToSave.updatedAt = new Date();
      orderToSave.orderStatus = OrderStatus.NEW_ORDER;
      orderToSave.price = this.sumPrices(orderedProducts);
      orderToSave.orderedProducts = orderedProducts;
      orderToSave.user = new User();
      orderToSave.user.id = newOrder.userId;
      orderToSave.address = new UserAddress();
      orderToSave.address.id = newOrder.addresId;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToSave);
    });
  }

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
