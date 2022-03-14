import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UsersService } from './users.service';
import { User } from '../users/interfaces/user.interface';
import { ExternalUserDto } from './dto/external-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersService) {}

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      dateOfBirth: dateToArray(user.dateOfBirth),
    };
  }

  @Post()
  addUser(@Body() _user_: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.addUser(_user_));
  }

  @Get(':id')
  getUserById(@Param('id') _id_: string): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Get()
  getAllUsers(): Array<ExternalUserDto> {
    const allUsers = this.userRepository.getAllUsers();
    const externalUsers = allUsers.map((i) => this.mapUserToExternal(i));
    return externalUsers;
  }

  @Delete(':id')
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id') _id_: string,
    @Body() _updateUser_: UpdateUserDto,
  ): ExternalUserDto {
    const userToUpdate = this.userRepository.updateUser(_id_, _updateUser_);

    return this.mapUserToExternal(userToUpdate);
  }
}
