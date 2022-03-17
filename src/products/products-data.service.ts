import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(newProduct: CreateProductDto): Product {
    const product: Product = {
      id: '',
      name: '',
      price: 0,
      count: 0,
      tags: [],
      createdAt: undefined,
      updatedAt: undefined,
    };
    product.id = uuidv4();
    product.name = newProduct.name;
    product.price = newProduct.price;
    product.count = newProduct.count;
    product.tags = newProduct.tags;
    product.createdAt = new Date();
    product.updatedAt = new Date();
    this.products.push(product);
    return product;
  }

  deleteProduct(id: string): void {
    let index = 0;
    let i = 0;

    for (const item of this.products) {
      if (item.id === id) {
        index = i;
        break;
      }
      i++;
    }
    this.products.splice(index, 1);
  }

  updateProduct(id: string, dto: UpdateProductDto): Product {
    this.products.map((i) => {
      if (i.id === id) {
        i.name = dto.name;
        i.createdAt = i.createdAt;
        i.updatedAt = new Date();
      }
    });
    return this.getProductById(id);
  }

  getProductById(id: string): Product {
    return this.products.find((i) => i.id === id);
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
