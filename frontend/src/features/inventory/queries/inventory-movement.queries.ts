import { useQuery } from '@tanstack/react-query';
import { getInventoryMovements } from '../api/inventory-movement.api';

export const useInventoryMovements = (inventoryId: string) => {
    return useQuery({
        queryKey: ['INVENTORY', 'MOVEMENTS', inventoryId],
        queryFn: () => {
            getInventoryMovements(inventoryId);
        },
    });
};
