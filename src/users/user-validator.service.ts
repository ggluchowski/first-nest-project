import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UsersService) {}

  validateUniqueEmail(emailToValidate: string): void {
    this.userRepository.getUser(emailToValidate);
  }
}
