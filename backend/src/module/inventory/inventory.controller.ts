import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import type { JwtRequest } from 'src/common/types';
import { GetInventoriesQueryDto } from './dto/getInventoriesQuery.dto';
import { InventoryService } from './inventory.service';

@UseGuards(JwtGuard, RoleGuard)
@Controller('inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    async getAllInventories(
        @Req() req: JwtRequest,
        @Query() query: GetInventoriesQueryDto,
    ) {
        const storeId = req.user.storeId;
        return this.inventoryService.getInventories(storeId, query);
    }
}
