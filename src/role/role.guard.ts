import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user?.roles);
  }

  private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    if (!userRoles) {
      return false;
    }
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
