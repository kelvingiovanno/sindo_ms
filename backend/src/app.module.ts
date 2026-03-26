import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './module/store/store.module';
import { StoreAccessModule } from './module/store-access/store-access.module';
import { InventoryModule } from './module/inventory/inventory.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        StoreModule,
        StoreAccessModule,
        InventoryModule,
    ],
})
export class AppModule {}
