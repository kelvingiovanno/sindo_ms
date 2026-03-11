import {
    Body,
    Controller,
    Delete,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { StoreService } from './store.service';
import { Roles } from 'src/common/decorators';
import { UserRole } from 'generated/prisma/enums';
import {
    CreateStoreDto,
    GrantStoreAccessDto,
    RevokeStoreAccessDto,
    UpdateStoreDto,
} from './dto';

@UseGuards(JwtGuard, RoleGuard)
@Controller('stores')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Roles([UserRole.ADMIN])
    @Post('create')
    async createStore(@Body() dto: CreateStoreDto) {
        return this.storeService.createStore(dto.name);
    }

    @Roles([UserRole.ADMIN])
    @Patch('update/:storeId')
    async updateStore(
        @Param('storeId', ParseUUIDPipe) id: string,
        @Body() dto: UpdateStoreDto,
    ) {
        return this.storeService.updateStore(id, dto.name);
    }

    @Roles([UserRole.ADMIN])
    @Post('/:storeId/users')
    async grantStoreAccess(
        @Param('storeId', ParseUUIDPipe) storeId: string,
        @Body() dto: GrantStoreAccessDto,
    ) {
        const action = await this.storeService.grantStoreAccess(
            storeId,
            dto.userIds,
        );

        return {
            affectedCount: action,
        };
    }

    @Roles([UserRole.ADMIN])
    @Delete('/:storeId/users')
    async revokeStoreAccess(
        @Param('storeId', ParseUUIDPipe) storeId: string,
        @Body() dto: RevokeStoreAccessDto,
    ) {
        const action = await this.storeService.revokeStoreAccess(
            storeId,
            dto.userIds,
        );

        return {
            affectedCount: action,
        };
    }
}
