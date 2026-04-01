import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import type { SupplierItem } from '../types/Inventory-supplier-list.type';
import { Edit3, Star, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { formatCurrencyIDR } from '@/shared/utils/number.utils';

const InventorySupplierTable = ({
    data,
    isLoading,
    unit,
}: {
    data: SupplierItem[];
    isLoading: boolean;
    unit: string;
}) => {
    return (
        <div
            className={`bg-white rounded-sm border border-slate-300 overflow-hidden transition-opacity ${
                isLoading ? 'opacity-70 animate-pulse' : ''
            }`}
        >
            <Table>
                <TableHeader>
                    <TableRow className="text-xs bg-slate-200">
                        <TableHead className="pl-4 text-left text-slate-500">
                            Code
                        </TableHead>
                        <TableHead className="text-left text-slate-500">
                            Supplier
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Price
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Last Purchase
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Total Purchase
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Total Qty
                        </TableHead>

                        <TableHead className="text-center text-slate-500">
                            Preferred
                        </TableHead>
                        <TableHead className="pr-4 text-center text-slate-500">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                {Array.from({ length: 6 }).map((_, j) => (
                                    <TableCell key={j}>
                                        <div className="h-4 w-full bg-slate-200 rounded" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={10}
                                className="text-center text-xs text-slate-500"
                            >
                                No data available
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    className="hover:bg-slate-100 text-xs"
                                >
                                    <TableCell className="text-left text-slate-700 pl-4 ">
                                        {item.code}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {item.supplier}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {formatCurrencyIDR(item.price)}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {item.lastPurchase}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {formatCurrencyIDR(item.totalPurchase)}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {`${item.totalQuantity}  ${unit}`}
                                    </TableCell>
                                    <TableCell className="flex justify-center items-center text-slate-700">
                                        {item.preferred && (
                                            <Star
                                                size={16}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="pr-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <Button
                                                variant={'outline'}
                                                size={'icon-xs'}
                                                className="rounded"
                                            >
                                                <Edit3 size={16} />
                                            </Button>
                                            <Button
                                                variant={'destructive'}
                                                size={'icon-xs'}
                                                className="rounded"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default InventorySupplierTable;
