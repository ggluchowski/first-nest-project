import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsDataService],
  exports: [ProductsDataService, TypeOrmModule],
  // https://stackoverflow.com/questions/65934094/how-to-create-service-with-repository-exports
})
export class ProductsModule {}
