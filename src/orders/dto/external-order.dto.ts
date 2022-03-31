export class ExternalOrderDto {
  id: string;
  createAt: Array<number>;
  price: number;
  orderStatus: string;
  orderedProducts: Array<ExternalOrderedProductDto>;

  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: {
      id: string;
      country: string;
      city: string;
      street: string;
      buildingNumber: number;
      flatNumber: number;
    };
  };
}

export class ExternalOrderedProductDto {
  productListId: string;
  productId: string;
  name: string;
  price: number;
  count: number;
}
