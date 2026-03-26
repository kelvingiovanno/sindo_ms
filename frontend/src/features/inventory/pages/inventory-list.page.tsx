import { Button } from '@/shared/components/ui/button';
import SearchBar from '@/shared/components/common/SearchBar';
import Pangination from '@/shared/components/common/Pangination';
import InventoryFilterMenu from '../components/InventoryFilterMenu';
import InventoryTable from '../components/InventoryTable';
import InventorySortMenu from '../components/InventorySortMenu';
import InventoryStats from '../components/InventoryStats';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useInventoryList } from '../queries/inventory-list.query';

const InventoryListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState<string | null>(searchParams.get('page'));
    const [row, setRow] = useState<string | null>(searchParams.get('row'));
    const [categoies] = useState<string | null>(searchParams.get('category'));
    const [brands] = useState<string | null>(searchParams.get('brand'));
    const [models] = useState<string | null>(searchParams.get('model'));
    const [sort] = useState<string | null>(searchParams.get('sort'));
    const [order] = useState<string | null>(searchParams.get('order'));

    const { data, isLoading } = useInventoryList(
        page,
        row,
        brands,
        models,
        categoies,
        sort,
        order,
    );

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Invetory
                    </h1>
                    <p className="text-sm text-slate-500">
                        Add, edit, and organize your products
                    </p>
                </div>
            </div>

            <InventoryStats />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center sm:flex-wrap">
                    <div className="w-full sm:w-auto">
                        <SearchBar placeholder="Search inventory" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                        <InventoryFilterMenu />
                        <InventorySortMenu />

                        <div className="ml-auto sm:hidden">
                            <Button variant="default">Add Inventory</Button>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:flex shrink-0">
                    <Button variant="default">Add Inventory</Button>
                </div>
            </div>

            <InventoryTable
                inventories={data?.data ?? []}
                isLoading={isLoading}
            />

            <Pangination
                page={Number(page)}
                row={Number(row)}
                totalPages={data?.meta.totalPage ?? 0}
                onPageChange={function (page: number): void {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', page.toString());
                    setPage(page.toString());
                    setSearchParams(params);
                }}
                onRowChange={(row: number, page: number = 1) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('row', row.toString());
                    params.set('page', page.toString());

                    setRow(row.toString());
                    setPage(page.toString());
                    setSearchParams(params);
                }}
                isLoading={isLoading}
            />
        </>
    );
};

export default InventoryListPage;
