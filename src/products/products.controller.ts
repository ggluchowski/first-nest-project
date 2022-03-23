import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { CreateProductDto } from './dto/create-product.dto';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { Product } from './db/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() _product_: CreateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.addProduct(_product_),
    );
  }

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(_id_),
    );
  }

  @Get()
  async getAllProducts(): Promise<ExternalProductDto[]> {
    const allProducts = await this.productRepository.getAllProducts();
    const externalProducts = allProducts.map((i) =>
      this.mapProductToExternal(i),
    );
    return externalProducts;
  }

  @Delete(':id')
  async deleteProducts(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<void> {
    return await this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  async updateProducts(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() _updateProduct_: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    const productToUpdate = await this.productRepository.updateProduct(
      _id_,
      _updateProduct_,
    );

    return this.mapProductToExternal(productToUpdate);
  }
}
