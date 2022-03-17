import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = context.switchToHttp().getRequest().headers.role;
    if (role === Roles.ADMIN || role === Roles.SELLER) return true;
    else return false;
  }
}
