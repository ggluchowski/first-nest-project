import { Roles } from '../enums/roles.enum';

export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address: Array<UserAddress>;
  position: Roles;
}

interface UserAddress {
  country: string;
  city: string;
  street: string;
  buildingNumber: string;
  flatNumber?: string;
}
