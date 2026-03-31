import { api } from '@/shared/lib';
import { INVENTORY_ENDPOINT } from './inventory.api';
import type { InventoryPricingList } from '../types/inventory-pricing-list.types';

export const getInventoryPricings = async (inventoryId: string) => {
    const res = await api.get<InventoryPricingList>(
        `${INVENTORY_ENDPOINT}/${inventoryId}/pricings`,
    );
    const data = res.data;
    return data;
};
