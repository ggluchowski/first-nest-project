import { EntityRepository, In, Repository } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserByFirstName(names: string[]): Promise<User[]> {
    return this.find({
      where: {
        firstName: In(names),
      },
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email: email,
      },
    });
  }

  getUserById(id: string): Promise<User> {
    return this.findOne({
      where: {
        id: id,
      },
    });
  }
}
