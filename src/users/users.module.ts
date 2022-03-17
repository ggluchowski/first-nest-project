import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserValidatorService } from './user-validator.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserValidatorService],
})
export class UsersModule {}
