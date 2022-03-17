import {
  IsArray,
  IsEnum,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Tags } from '../enums/tags.enum';

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
  @IsEnum(Tags, {
    each: true,
  })
  tags: Array<Tags>;
}
