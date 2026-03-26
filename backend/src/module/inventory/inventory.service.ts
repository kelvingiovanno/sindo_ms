import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetInventoriesQueryDto } from './dto/getInventoriesQuery.dto';

@Injectable()
export class InventoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async getInventories(storeId: string, query: GetInventoriesQueryDto) {
        const { page, row, category, brand, model, status, sort, order } =
            query;

        const where = {
            storeId,

            category: category?.length
                ? {
                      name: { in: category },
                  }
                : undefined,

            brand: brand?.length
                ? {
                      name: { in: brand },
                  }
                : undefined,

            model: model?.length
                ? {
                      name: { in: model },
                  }
                : undefined,

            status: status?.length ? { in: status } : undefined,
        };

        const [data, total] = await Promise.all([
            this.prismaService.inventory.findMany({
                where,
                select: {
                    id: true,
                    sku: true,
                    brand: true,
                    model: true,
                    category: true,
                    partnumber: true,
                    name: true,
                    cost: true,
                    price: true,
                    status: true,
                },
                orderBy: {
                    [sort]: order,
                },
                skip: (page - 1) * row,
                take: row,
            }),

            this.prismaService.inventory.count({ where }),
        ]);

        return {
            data: data.map((inventory) => ({
                id: inventory.id,
                sku: inventory.sku,
                brand: inventory.brand.name,
                model: inventory.model.name,
                category: inventory.category.name,
                partnumber: inventory.partnumber,
                name: inventory.name,
                cost: inventory.cost,
                price: inventory.price,
                status: inventory.status,
            })),
            meta: {
                total,
                page,
                row,
                totalPage: Math.ceil(total / row),
            },
        };
    }
}
