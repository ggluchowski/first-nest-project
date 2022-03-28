export class ExternalOrderDto {
  id: string;
  createAt: Array<number>;
  price: number;
  orderStatus: string; //or OrderStatus
  orderedProducts: Array<ExternalOrderedProductDto>;
  user: Array<ExternalOrderUserDto>;
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
