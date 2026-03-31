import { api } from '@/shared/lib';
import { INVENTORY_ENDPOINT } from './inventory.api';
import type { InventorySupplierList } from '../types/Inventory-supplier-list.type';

export const getInventorySuppliers = async (inventoryId: string) => {
    const res = await api.get<InventorySupplierList>(
        `${INVENTORY_ENDPOINT}/${inventoryId}/suppliers`,
    );
    const data = res.data;
    return data;
};
