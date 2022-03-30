export class ExternalOrderDto {
  id: string;
  createAt: Array<number>;
  price: number;
  orderStatus: string;
  orderedProducts: {
    productListId: string;
    productId: string;
    name: string;
    price: number;
    count: number;
  };
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

// export class ExternalOrderedProductDto {
//   productListId: string;
//   productId: string;
//   name: string;
//   price: string;
//   count: number;
// }

// export class ExternalOrderUserDto {
//   firstName: string;
//   lastName: string;
//   email: string;
//   address: string;
// }
