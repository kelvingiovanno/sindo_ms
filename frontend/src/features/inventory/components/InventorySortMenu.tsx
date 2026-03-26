import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ArrowDownZA, ArrowUpAZ, ArrowUpDown } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';

type Sort = 'cost' | 'price' | 'status' | 'created' | '';
type Order = 'asc' | 'desc' | '';

const InventorySortMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState<Sort>(() => {
        const params = searchParams.get('sort');
        if (params === 'cost' || params === 'price' || params === 'status')
            return params;
        return '';
    });

    const [order, setOrder] = useState<Order>(() => {
        const params = searchParams.get('order');
        if (params === 'asc' || params === 'desc') return params;
        return '';
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (sort) {
            params.set('sort', sort);

            if (!order) {
                params.set('order', 'asc');
            } else {
                params.set('order', order);
            }
        } else {
            params.delete('sort');
            params.delete('order');
        }

        setSearchParams(params);
    }, [sort, order, searchParams, setSearchParams]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={`
                        flex items-center border rounded-sm gap-1 text-sm 
                        hover:bg-slate-100
                        data-[state=open]:bg-slate-200 data-[state=open]:border-slate-400
                        ${sort && 'bg-slate-200 border-slate-400'} 
                    `}
                    variant={'outline'}
                >
                    <ArrowUpDown />
                    Sort
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                asChild
                className="p-0 ring-slate-300 rounded-xs"
            >
                <div className="flex flex-col w-48 gap-2">
                    <div className="p-4 flex flex-col gap-1 border-b">
                        <p className="text-xs text-slate-500">Sort by</p>

                        <div className="flex flex-col ">
                            {['Cost', 'Price', 'Status', 'Created'].map(
                                (field) => (
                                    <button
                                        key={field}
                                        onClick={() => {
                                            setSort(
                                                field.toLowerCase() as Sort,
                                            );

                                            if (!order) {
                                                setOrder('asc');
                                            }
                                        }}
                                        className={`cursor-pointer text-sm text-slate-700 text-left hover:bg-slate-100 px-2 h-9 rounded ${sort === field.toLowerCase() && 'bg-slate-200 text-slate-900'}`}
                                    >
                                        {field}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                    <div className="py-2 px-4 w-full flex flex-col gap-1">
                        <p className="text-xs text-slate-500">Order by</p>
                        <div className="w-full flex flex-col">
                            <button
                                className={`cursor-pointer flex items-center gap-2 text-sm text-slate-700 text-left hover:bg-slate-100 px-2 h-9 rounded ${order === 'asc' && 'bg-slate-200 text-slate-900'}`}
                                onClick={() => setOrder('asc')}
                            >
                                <ArrowUpAZ size={16} />
                                Ascending
                            </button>
                            <button
                                className={`cursor-pointer flex items-center gap-2 text-sm text-slate-700 text-left hover:bg-slate-100 px-2 h-9 rounded ${order === 'desc' && 'bg-slate-200 text-slate-900'}`}
                                onClick={() => setOrder('desc')}
                            >
                                <ArrowDownZA size={16} />
                                Descending
                            </button>
                        </div>
                    </div>
                    <div className="px-4 mb-2 flex justify-end">
                        <button
                            className="cursor-pointer rounded-sm px-2 py-1 text-slate-500 text-xs hover:bg-slate-100"
                            onClick={() => {
                                setSort('');
                                setOrder('');
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default InventorySortMenu;
