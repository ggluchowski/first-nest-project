import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../shared/enums/roles.enum';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  getUser(email: string): void {
    const ifEmail = this.users.find((i) => i.email === email);
    if (ifEmail) {
      throw new UserRequireUniqueEmailException();
    }
  }

  addUser(newUser: CreateUserDto): User {
    const user: User = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: undefined,
      address: [],
      position: Roles.CUSTOMER,
    };
    user.id = uuidv4();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.email = newUser.email;
    user.dateOfBirth = newUser.dateOfBirth;
    user.address = newUser.address;
    user.position = newUser.position;
    this.users.push(user);
    return user;
  }

  deleteUser(id: string): void {
    let index = 0;
    let i = 0;

    for (const item of this.users) {
      if (item.id === id) {
        index = i;
        break;
      }
      i++;
    }
    this.users.splice(index, 1);
  }

  updateUser(id: string, dto: UpdateUserDto): User {
    this.users.map((i) => {
      if (i.id === id) {
        i.firstName = dto.firstName;
        i.lastName = dto.lastName;
        i.email = dto.email;
        i.position = Roles.SELLER;
      }
    });
    return this.getUserById(id);
  }

  getUserById(id: string): User {
    return this.users.find((i) => i.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
