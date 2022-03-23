import { Roles } from '../../shared/enums/roles.enum';

export interface ExternalUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address?: Array<ExternalUserAddressDto>;
  position: Roles;
}

interface ExternalUserAddressDto {
  country: string;
  city: string;
  street: string;
  buildingNumber: number;
  flatNumber?: number;
}
