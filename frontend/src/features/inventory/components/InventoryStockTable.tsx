import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import type { StockItem } from '../types/Inventory-movment-list.type';

const InventoryStockTable = ({
    data,
    unit,
    isLoading,
}: {
    data: StockItem[];
    unit: string;
    isLoading: boolean;
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
                            Date
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Reference
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            IN
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            OUT
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Balance
                        </TableHead>

                        <TableHead className="text-left text-slate-500">
                            Description
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
                                    <TableCell className="text-left text-slate-700 pl-4">
                                        {item.code}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {item.date}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {item.reference}
                                    </TableCell>
                                    <TableCell className="text-left  text-green-600">
                                        {item.in ? `${item.in} ${unit}` : '-'}
                                    </TableCell>

                                    <TableCell className="text-left  text-red-600">
                                        {!item.in ? `${item.out} ${unit}` : '-'}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700">
                                        {`${item.balance} ${unit}`}
                                    </TableCell>
                                    <TableCell className="text-left text-slate-700 pr-4">
                                        {item.description}
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

export default InventoryStockTable;
