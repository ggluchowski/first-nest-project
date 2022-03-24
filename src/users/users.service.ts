import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../shared/enums/roles.enum';
import { User } from './db/users.entity';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { UserAddress } from './db/userAddress.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
// import Connection from 'mysql2/typings/mysql/lib/Connection';
// import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository, // private connection: Connection,
  ) {}

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();
      addressToSave.id = uuidv4();
      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.buildingNumber = add.buildingNumber;
      addressToSave.flatNumber = add.flatNumber;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }

  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.userAddressRepository.find({
      where: {
        id: userId, // jaki inny typ
      },
    });

    this.userAddressRepository.remove(usersAddresses);
  }

  async getUser(email: string): Promise<void> {
    const ifEmail = await this.userRepository.getUserByEmail(email); //czy ok
    if (ifEmail) {
      throw new UserRequireUniqueEmailException();
    }
  }

  async addUser(newUser: CreateUserDto): Promise<User> {
    // return this.connection.transaction(async (manager: EntityManager) => {
    const userToSave = new User();

    userToSave.address = await this.prepareUserAddressesToSave(newUser.address);
    // manager.getCustomRepository(UserAddressRepository),
    // );

    userToSave.id = uuidv4();
    userToSave.firstName = newUser.firstName;
    userToSave.lastName = newUser.lastName;
    userToSave.email = newUser.email;
    userToSave.dateOfBirth = newUser.dateOfBirth;
    userToSave.position = newUser.position;
    this.userRepository.save(userToSave);
    return userToSave;
    // await manager.getCustomRepository(UserRepository).save(userToSave);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
    await this.deleteUserAddressesByUserId(id);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    await this.deleteUserAddressesByUserId(id);

    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = dto.firstName;
    userToUpdate.lastName = dto.lastName;
    userToUpdate.email = dto.email;
    userToUpdate.position = Roles.SELLER;

    await this.userRepository.save(userToUpdate);

    return await this.getUserById(id);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    // return await this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
