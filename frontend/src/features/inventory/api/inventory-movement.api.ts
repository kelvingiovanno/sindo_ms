import { api } from '@/shared/lib';
import { INVENTORY_ENDPOINT } from './inventory.api';
import type { InventoryMovementsList } from '../types/Inventory-movment-list.type';

export const getInventoryMovements = async (inventoryId: string) => {
    const res = await api.get<InventoryMovementsList>(
        `${INVENTORY_ENDPOINT}/${inventoryId}/movements`,
    );
    const data = res.data;
    return data;
};
