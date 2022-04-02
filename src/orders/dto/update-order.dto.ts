import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '../enums/orderStatus.enum';

export class UpdateOrderDto {
  // @IsNotEmpty()
  // @IsUUID()
  // id: string;

  @IsNotEmpty()
  @IsUUID()
  addresId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  extraInfo?: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateOrderedProductDto)
  orderedProducts: UpdateOrderedProductDto[];

  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}

export class UpdateOrderedProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0)
  count: number;
}
