import { UserAddress } from "src/users/db/userAddress.entity";

export class ExternalOrderDto {
  id: string;
  createAt: Array<number>;
  price: number;
  orderStatus: string; //or OrderStatus
  orderedProducts: [
    productListId: string,
    productId: string,
    name: string,
    price: number,
    count: number,
  ];
  // Array<ExternalOrderedProductDto>;
  // eslint-disable-next-line prettier/prettier
  user: [
    firstName: string,
    lastName: string,
    email: string,
    address: UserAddress,
  ];
  // Array<ExternalOrderUserDto>;
}

export class ExternalOrderedProductDto {
  productListId: string;
  productId: string;
  name: string;
  price: string;
  count: number;
}

export class ExternalOrderUserDto {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}
