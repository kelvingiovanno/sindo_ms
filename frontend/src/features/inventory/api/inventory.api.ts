import { api } from '@/shared/lib';
import type { InventoryList } from '../types/inventory-list.type';
import type { Inventory } from '../types/inventory.type';

export const INVENTORY_ENDPOINT = 'inventories';

export const getInventories = async (
    page: string,
    row: string,
    brand: string,
    model: string,
    category: string,
    sort: string,
    order: string,
) => {
    const res = await api.get<InventoryList>(
        `${INVENTORY_ENDPOINT}?page=${page}&row=${row}&brand=${brand}&model=${model}&category=${category}&sort=${sort}&order=${order}`,
    );
    const data = res.data;
    return data;
};

export const getInventory = async (inventoryId: string) => {
    const res = await api.get<Inventory>(
        `${INVENTORY_ENDPOINT}/${inventoryId}`,
    );
    const data = res.data;
    return data;
};
