import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './db/product.entity';
// import { v4 as uuidv4 } from 'uuid';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { Tag } from './db/tag.entity';
import { Connection } from 'typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private connection: Connection,
  ) {}

  async addProduct(newProduct: CreateProductDto): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await manager
        .getCustomRepository(TagRepository)
        .findTagsByName(newProduct.tags);

      const productToSave = new Product();
      //productToSave.id = uuidv4();
      productToSave.name = newProduct.name;
      productToSave.price = newProduct.price;
      productToSave.count = newProduct.count;
      productToSave.tags = tags;
      productToSave.createdAt = new Date();
      productToSave.updatedAt = new Date();

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToSave);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await manager
        .getCustomRepository(TagRepository)
        .findTagsByName(dto.tags);

      const productToUpdate = await this.getProductById(id);

      productToUpdate.name = dto.name;
      productToUpdate.price = dto.price;
      productToUpdate.count = dto.count;
      productToUpdate.tags = tags;
      productToUpdate.updatedAt = new Date();

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToUpdate);
    });
  }

  async getProductById(id: string): Promise<Product> {
    //czy ok??
    return await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
