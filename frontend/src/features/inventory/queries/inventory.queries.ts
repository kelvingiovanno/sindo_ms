import { useQuery } from '@tanstack/react-query';
import { getInventories } from '../api/inventory.api';

export const useInventories = (
    page: string | null,
    row: string | null,
    brand: string | null,
    model: string | null,
    category: string | null,
    sort: string | null,
    order: string | null,
) => {
    return useQuery({
        queryKey: ['INVENTORIES', page],
        queryFn: () =>
            getInventories(
                page ?? '1',
                row ?? '10',
                brand ?? '',
                model ?? '',
                category ?? '',
                sort ?? 'createdAt',
                order ?? 'asc',
            ),
    });
};
