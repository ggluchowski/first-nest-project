import { EntityRepository, Repository } from 'typeorm';
import { OrderedProducts } from './orderedProducts.entity';

@EntityRepository(OrderedProducts)
export class OrderedProductsRepository extends Repository<OrderedProducts> {}
