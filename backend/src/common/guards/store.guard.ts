import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { StoreAccessService } from 'src/module/store-access/store-access.service';
import { type JwtRequest } from '../types';

@Injectable()
export class StoreGuard implements CanActivate {
    constructor(private readonly storeAccessService: StoreAccessService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<JwtRequest>();
        const payload = req.user;

        const storeAccess = await this.storeAccessService.validateStoreAccess(
            payload.storeId,
            payload.id,
        );

        if (!storeAccess) throw new ForbiddenException('Store access denied');

        return true;
    }
}
