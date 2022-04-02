import { EntityRepository, Repository } from 'typeorm';
import { OrderedProducts } from './orderedProducts.entity';

@EntityRepository(OrderedProducts)
export class OrderedProductsRepository extends Repository<OrderedProducts> {
  public async deleteProductOrderByOrderId(orderId: string): Promise<void> {
    const orderProducts = await this.find({
      where: {
        order: orderId,
      },
    });

    await this.remove(orderProducts);
  }
}
