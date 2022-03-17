import { Roles } from '../../shared/enums/roles.enum';
import { Transform, Type } from 'class-transformer';
import { arrayToDate } from 'src/shared/helpers/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => arrayToDate(value))
  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  address?: Array<UpdateUserAddressDto>;

  @IsEnum(Roles)
  position: Roles;
}

export class UpdateUserAddressDto {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  buildingNumber: number;
  @IsNumber()
  flatNumber?: number;
}
