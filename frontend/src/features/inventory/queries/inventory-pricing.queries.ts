import { useQuery } from '@tanstack/react-query';
import { getInventoryPricings } from '../api/inventory-pricing.api';

export const useInventoryPricings = (inventoryId: string) => {
    return useQuery({
        queryKey: ['INVENTORY', 'PRICINGS', inventoryId],
        queryFn: () => {
            getInventoryPricings(inventoryId);
        },
    });
};
