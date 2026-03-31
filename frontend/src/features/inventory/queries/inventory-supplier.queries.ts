import { useQuery } from '@tanstack/react-query';
import { getInventorySuppliers } from '../api/inventory-supplier.api';

export const useInventorySuppliers = (inventoryId: string) => {
    return useQuery({
        queryKey: ['INVENTORY', 'SUPPLIERS', inventoryId],
        queryFn: () => {
            getInventorySuppliers(inventoryId);
        },
    });
};
