import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtRequest } from '../types';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const handler = context.getHandler();

        const roles = this.reflector.get(Roles, handler);
        const req = ctx.getRequest<JwtRequest>();

        if (!roles) {
            return true;
        }

        const user = req.user;

        if (!user) {
            return false;
        }

        return roles.includes(user.role);
    }
}
