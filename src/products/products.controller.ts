import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { CreateProductDto } from './dto/create-product.dto';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  @Post()
  addProduct(@Body() _product_: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.addProduct(_product_),
    );
  }

  @Get(':id')
  getProductById(@Param('id') _id_: string): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.getProductById(_id_),
    );
  }

  @Get()
  getAllProducts(): Array<ExternalProductDto> {
    const allProducts = this.productRepository.getAllProducts();
    const externalProducts = allProducts.map((i) =>
      this.mapProductToExternal(i),
    );
    return externalProducts;
  }

  @Delete(':id')
  deleteProducts(@Param('id') _id_: string): void {
    return this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  updateProducts(
    @Param('id') _id_: string,
    @Body() _updateProduct_: UpdateProductDto,
  ): ExternalProductDto {
    const productToUpdate = this.productRepository.updateProduct(
      _id_,
      _updateProduct_,
    );

    return this.mapProductToExternal(productToUpdate);
  }
}
