import { IsArray, IsNumber, MaxLength, Min, MinLength } from 'class-validator';
import { Tag } from '../db/tag.entity';

export class CreateProductDto {
  @MinLength(0)
  @MaxLength(25)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  count: number;

  @IsArray()
  tags: string[];
}
