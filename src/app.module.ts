import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'mysql2/typings/mysql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

import config from './ormconfig';

import * as cors from 'cors';
import { ProductRepository } from './products/db/product.repository';
import { TagRepository } from './products/db/tag.repository';
import { ProductsDataService } from './products/products-data.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ProductsModule,
    UsersModule,
    OrdersModule,
    TypeOrmModule.forRoot(config as ConnectionOptions),
    // TypeOrmModule.forFeature([ProductRepository]),
    // TypeOrmModule.forFeature([TagRepository]),
  ],
  controllers: [AppController],
  providers: [AppService], //, ProductsDataService
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
