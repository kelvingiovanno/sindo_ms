import {
    IsOptional,
    IsInt,
    IsArray,
    IsString,
    IsEnum,
    IsIn,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { InventoryStatus } from 'generated/prisma/enums';

export class GetInventoriesQueryDto {
    @Type(() => Number)
    @IsInt()
    page: number = 1;

    @Type(() => Number)
    @IsInt()
    row: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string | string[] | undefined }) => {
        if (typeof value === 'string') {
            return value.split(',');
        }
        return value ?? [];
    })
    category?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string | string[] | undefined }) => {
        if (typeof value === 'string') {
            return value.split(',');
        }
        return value ?? [];
    })
    brand?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string | string[] | undefined }) => {
        if (typeof value === 'string') {
            return value.split(',');
        }
        return value ?? [];
    })
    model?: string[];

    @IsOptional()
    @IsArray()
    @IsEnum(InventoryStatus, { each: true })
    @Transform(({ value }: { value: string | string[] | undefined }) => {
        if (typeof value === 'string') {
            return value.split(',');
        }
        return value ?? [];
    })
    status?: InventoryStatus[];

    @IsOptional()
    @IsString()
    sort: string = 'createdAt';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order: 'asc' | 'desc' = 'desc';
}
