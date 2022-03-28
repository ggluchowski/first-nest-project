import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  addresId: string;

  extraInfo?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderedProductDto)
  orderedProducts: CreateOrderedProductDto[];
}

export class CreateOrderedProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0)
  count: number;
}
