import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UsersService } from './users.service';
import { User } from '../users/db/users.entity';
import { ExternalUserDto } from './dto/external-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UsersService,
    private emailValidation: UserValidatorService,
  ) {}

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      dateOfBirth: dateToArray(user.dateOfBirth),
    };
  }

  @UseGuards(RoleGuard)
  @Post()
  async addUser(@Body() _user_: CreateUserDto): Promise<ExternalUserDto> {
    this.emailValidation.validateUniqueEmail(_user_.email);
    return this.mapUserToExternal(await this.userRepository.addUser(_user_));
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userRepository.getUserById(_id_));
  }

  @Get()
  async getAllUsers(): Promise<ExternalUserDto[]> {
    const allUsers = await this.userRepository.getAllUsers();
    const externalUsers = allUsers.map((i) => this.mapUserToExternal(i));
    return externalUsers;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<void> {
    return await this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() _updateUser_: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    const userToUpdate = await this.userRepository.updateUser(
      _id_,
      _updateUser_,
    );

    return this.mapUserToExternal(userToUpdate);
  }
}
