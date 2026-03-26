import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    brandOptions,
    modelOptions,
    categoryOptions,
    statusOptions,
} from '../dummy';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import { Badge } from '@/shared/components/ui/badge';
import { useSearchParams } from 'react-router';
import { Button } from '@/shared/components/ui/button';

type ActiveFilter = 'brand' | 'model' | 'category' | 'status';

const InventoryFilterMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [active, setActive] = useState<ActiveFilter>('brand');
    const [search, setSearch] = useState<string>('');

    const [selectedBrand, setSelectedBrand] = useState<string[]>(() => {
        const params = searchParams.get('brand')?.split(',') || [];

        return brandOptions
            .filter((item) => params.includes(item.label))
            .map((item) => item.label);
    });

    const [selectedModel, setSelectedModel] = useState<string[]>(() => {
        const params = searchParams.get('model')?.split(',') || [];

        return modelOptions
            .filter((item) => params.includes(item.label))
            .map((item) => item.label);
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        () => {
            const params = searchParams.get('category')?.split(',') || [];

            return categoryOptions
                .filter((item) => params.includes(item.label))
                .map((item) => item.label);
        },
    );

    const [selectedStatus, setSelectedStatus] = useState<string[]>(() => {
        const params = searchParams.get('status')?.split(',') || [];

        return statusOptions
            .filter((item) => params.includes(item.label))
            .map((item) => item.label);
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (selectedBrand.length > 0) {
            params.set('brand', selectedBrand.join(','));
        }

        if (selectedModel.length > 0) {
            params.set('model', selectedModel.join(','));
        }

        if (selectedCategories.length > 0) {
            params.set('category', selectedCategories.join(','));
        }

        if (selectedStatus.length > 0) {
            params.set('status', selectedStatus.join(','));
        }

        setSearchParams(params);
    }, [
        selectedBrand,
        selectedModel,
        selectedCategories,
        selectedStatus,
        setSearchParams,
        searchParams,
    ]);

    const map = {
        brand: [selectedBrand, setSelectedBrand],
        model: [selectedModel, setSelectedModel],
        category: [selectedCategories, setSelectedCategories],
        status: [selectedStatus, setSelectedStatus],
    } as const;

    const data = () => {
        switch (active) {
            case 'brand':
                return brandOptions;
            case 'model':
                return modelOptions;
            case 'category':
                return categoryOptions;
            case 'status':
                return statusOptions;
            default:
                return [];
        }
    };

    const filter = data().filter((item) =>
        item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );

    const toggleSelect = (label: string) => {
        const [selected, setSelected] = map[active];

        if (selected.includes(label)) {
            setSelected((prev) => prev.filter((item) => item !== label));
        } else {
            setSelected([...selected, label]);
        }
    };

    const check = (label: string) => {
        const [selected] = map[active];

        return selected.includes(label) ? true : false;
    };

    const clearSelected = () => {
        const [, setSelected] = map[active];
        setSelected([]);
        searchParams.delete(active);
    };

    const clearAllSelected = () => {
        setSelectedBrand([]);
        setSelectedModel([]);
        setSelectedCategories([]);
        setSelectedStatus([]);
        searchParams.delete('brand');
        searchParams.delete('model');
        searchParams.delete('category');
        searchParams.delete('status');
    };

    const filterCount = () => {
        return (
            selectedBrand.length +
            selectedModel.length +
            selectedCategories.length +
            selectedStatus.length
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={`
                        flex items-center border rounded-sm gap-1 text-sm 
                        hover:bg-slate-100
                        data-[state=open]:bg-slate-200 data-[state=open]:border-slate-400
                        
                        ${
                            filterCount() > 0
                                ? 'bg-slate-200 border-slate-400 text-slate-700'
                                : ' border-slate-300 text-slate-700'
                        }
                    `}
                    variant={'outline'}
                >
                    <Filter size={16} />
                    Filter
                    {filterCount() > 0 && <Badge>{filterCount()}</Badge>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                asChild
                className="p-0 ring-slate-300 rounded-xs"
            >
                <div className="flex w-126 h-100">
                    <div className="p-4 flex-1 flex flex-col justify-between items-start border-r border-slate-300">
                        <div className="flex flex-col w-full ">
                            <p className="text-xs text-slate-500 px-2 mb-1">
                                Filter by
                            </p>
                            {[
                                { key: 'brand', label: 'Brand' },
                                { key: 'model', label: 'Model' },
                                { key: 'category', label: 'Category' },
                                { key: 'status', label: 'Status' },
                            ].map((item) => (
                                <button
                                    key={item.key}
                                    className={`rounded-xs cursor-pointer flex justify-between items-center px-3 h-9 text-left text-sm text-slate-700 hover:bg-slate-100 ${active === item.key ? ' bg-slate-200 text-slate-900' : ''}`}
                                    onClick={() =>
                                        setActive(item.key as ActiveFilter)
                                    }
                                >
                                    {item.label}

                                    {map[item.key as ActiveFilter][0].length >
                                        0 && (
                                        <Badge>
                                            {
                                                map[item.key as ActiveFilter][0]
                                                    .length
                                            }
                                        </Badge>
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            className="text-xs text-slate-700 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded-sm"
                            onClick={() => {
                                clearAllSelected();
                            }}
                        >
                            Clear all
                        </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col gap-3">
                        <div className="relative flex items-center border border-slate-300 rounded px-3 h-9">
                            <input
                                className="w-full outline-none text-sm text-slate-700 pr-6 placeholder:text-sm placeholder:text-slate-500"
                                placeholder={`Search ${active}...`}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <Search
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={14}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto text-sm text-slate-700">
                            {filter.map((item) => (
                                <div
                                    key={item.value}
                                    className="flex items-center gap-3 pl-2 hover:bg-slate-100 h-8"
                                >
                                    <Checkbox
                                        id={item.label}
                                        checked={check(item.label)}
                                        onCheckedChange={() => {
                                            toggleSelect(item.label);
                                        }}
                                    />
                                    <Label
                                        className="w-full h-full text-slate-700 font-normal"
                                        htmlFor={item.label}
                                    >
                                        {item.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                className="text-xs text-slate-700 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded-sm"
                                onClick={() => {
                                    clearSelected();
                                }}
                            >
                                Clear
                            </button>
                            <p className="text-xs text-slate-500">{`${map[active][0].length} of ${data().length} selected`}</p>
                        </div>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default InventoryFilterMenu;
