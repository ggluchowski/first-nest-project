import { EntityRepository, In, Repository } from 'typeorm';
import { UserAddress } from './userAddress.entity';

@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {
  findUserByCity(cities: string[]): Promise<UserAddress[]> {
    return this.find({
      where: {
        city: In(cities),
      },
    });
  }
}
