import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import { formatNumber } from '@/shared/lib';
import { Eye } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import type { InventoryListItem } from '../types/inventory-list.type';
import { useNavigate } from 'react-router';

type Props = {
    inventories: InventoryListItem[];
    isLoading: boolean;
};

const InventoryTable = ({ inventories, isLoading }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            className={`bg-white rounded-sm border border-slate-300 overflow-hidden transition-opacity ${
                isLoading ? 'opacity-70 animate-pulse' : ''
            }`}
        >
            <Table className="w-full border-spacing-0">
                <TableHeader>
                    <TableRow className="bg-slate-200 border-b border-slate-200">
                        <TableHead className="text-xs text-slate-500 font-medium pl-4">
                            SKU
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium">
                            Brand
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium">
                            Model
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium">
                            Category
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium">
                            Part Number
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium">
                            Name
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium text-center">
                            Cost
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium text-center">
                            Price
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium text-center">
                            Status
                        </TableHead>
                        <TableHead className="text-xs text-slate-500 font-medium text-center pr-4">
                            Details
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-slate-200">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <TableCell key={j}>
                                        <div className="h-4 w-full bg-slate-200 rounded" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : inventories.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={10}
                                className="text-center text-xs text-slate-500"
                            >
                                No data available
                            </TableCell>
                        </TableRow>
                    ) : (
                        inventories.map((inventory) => (
                            <TableRow
                                key={inventory.sku}
                                className="hover:bg-slate-100 text-sm text-slate-700"
                            >
                                <TableCell className="pl-4">
                                    {inventory.sku}
                                </TableCell>
                                <TableCell>{inventory.brand}</TableCell>
                                <TableCell>{inventory.model}</TableCell>
                                <TableCell>{inventory.category}</TableCell>
                                <TableCell>{inventory.partnumber}</TableCell>
                                <TableCell>{inventory.name}</TableCell>

                                <TableCell>
                                    <div className="flex justify-between items-center tabular-nums">
                                        <span className="text-slate-500">
                                            Rp
                                        </span>
                                        <span>
                                            {formatNumber(inventory.price)}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-between items-center tabular-nums">
                                        <span className="text-slate-500">
                                            Rp
                                        </span>
                                        <span>
                                            {formatNumber(inventory.cost)}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="pr-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                                        {inventory.status.replace('_', ' ')}
                                    </span>
                                </TableCell>

                                <TableCell className="text-center pr-4">
                                    <Button
                                        variant={'outline'}
                                        size={'xs'}
                                        className="rounded-xs"
                                        disabled={isLoading}
                                        onClick={() => {
                                            if (isLoading) return;
                                            navigate(
                                                `/inventory/${inventory.id}`,
                                            );
                                        }}
                                    >
                                        <Eye className="w-3 h-3" />
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default InventoryTable;
