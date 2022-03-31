import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './db/order.repository';
import { OrderedProductsRepository } from './db/orderedProducts.repository';
import { ProductRepository } from 'src/products/db/product.repository';
import { TagRepository } from 'src/products/db/tag.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderedProductsRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [OrdersController],
  providers: [OrdersDataService],
})
export class OrdersModule {}
