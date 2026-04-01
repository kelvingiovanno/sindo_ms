import { useNavigate, useParams } from 'react-router';
import Pangination from '@/shared/components/common/Pangination';
import { Button } from '@/shared/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { Edit, Settings, Trash2 } from 'lucide-react';
import InventoryStockTable from '../components/InventoryStockTable';
import InventorySupplierTable from '../components/InventorySupplierTable';
import InventoryInformation from '../components/InventoryInformation';
import InventoryItemStats from '../components/InventoryItemStats';
import InventoryImageCarousel from '../components/InventoryImageCarousel';
import InventoryStockChart from '../components/InventoryStockChart';
import InventoryPricingTable from '../components/InventoryPricingTable';

const InventoryDetailPage = () => {
    const { inventoryId } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {/* HEADER */}
            <div className="space-x4">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    Inventory Detail
                </h1>
                <p className="text-sm text-slate-500">INV-001 • PN-001</p>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold text-slate-900">
                        Information
                    </h4>
                    <div className="flex gap-4">
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                navigate(`/inventory/${inventoryId}/edit`);
                            }}
                        >
                            <Edit />
                            Edit
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                navigate(`/inventory/${inventoryId}/edit`);
                            }}
                        >
                            <Settings />
                            Setting
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InventoryImageCarousel
                        urls={['/inventory-dummy.png']}
                        isLoading={false}
                    />

                    {/* RIGHT: Info Card */}
                    <InventoryInformation
                        data={{
                            name: 'Hydraulic Pump',
                            code: 'INV-HP-001',
                            partnumber: 'HPX-2024-A1',
                            brand: 'Bosch Rexroth',
                            category: 'Hydraulics',
                            type: 'Pump',
                            unit: 'PCS',
                            status: 'IN_STOCK',
                            lowStockAlert: '10',
                            location: 'Warehouse A - Rack 3',
                            cost: 1500000,
                            price: 1850000,
                            description:
                                'High-performance hydraulic pump suitable for industrial machinery.',
                            models: ['HPX-2024', 'HPX-2025', 'HPX-Pro'],
                            measurements: ['10x20x15 cm', 'Weight: 5kg'],
                        }}
                        isLoading={false}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <p className="text-xl font-semibold text-slate-900">
                        Stock Movement
                    </p>
                    <Button>
                        Adjust Stock
                    </Button>
                </div>
                <div className="space-y-4">
                    <InventoryItemStats
                        currentStock={0}
                        stockStatus={'DISCONTINUED'}
                        inventoryValue={10000000}
                        isLoading={false}
                    />
                    <InventoryStockChart
                        data={[
                            { label: 'Jan 25', value: 30 },
                            { label: 'Feb 25', value: 45 },
                            { label: 'Mar 25', value: 60 },
                            { label: 'Apr 25', value: 50 },
                            { label: 'May 25', value: 40 },
                            { label: 'Jun 25', value: 35 },
                            { label: 'Jul 25', value: 55 },
                            { label: 'Aug 25', value: 65 },
                            { label: 'Sep 25', value: 70 },
                            { label: 'Oct 25', value: 60 },
                            { label: 'Nov 25', value: 50 },
                            { label: 'Dec 25', value: 75 },
                        ]}
                        isLoading={false}
                    />
                    <InventoryStockTable
                        isLoading={false}
                        data={[
                            {
                                code: 'TXN-001',
                                date: '2026-10-01',
                                reference: 'PO-101',
                                in: 50,
                                out: 0,
                                balance: 50,
                                description: 'Initial stock purchase',
                            },
                            {
                                code: 'TXN-002',
                                date: '2026-10-02',
                                reference: 'SO-201',
                                in: 0,
                                out: 10,
                                balance: 40,
                                description: 'Customer order',
                            },
                            {
                                code: 'TXN-003',
                                date: '2026-10-03',
                                reference: 'PO-102',
                                in: 30,
                                out: 0,
                                balance: 70,
                                description: 'Restock',
                            },
                            {
                                code: 'TXN-004',
                                date: '2026-10-04',
                                reference: 'SO-202',
                                in: 0,
                                out: 15,
                                balance: 55,
                                description: 'Sales order',
                            },
                            {
                                code: 'TXN-005',
                                date: '2026-10-05',
                                reference: 'ADJ-001',
                                in: 0,
                                out: 5,
                                balance: 50,
                                description: 'Damaged items adjustment',
                            },
                            {
                                code: 'TXN-006',
                                date: '2026-10-06',
                                reference: 'PO-103',
                                in: 40,
                                out: 0,
                                balance: 90,
                                description: 'Supplier restock',
                            },
                            {
                                code: 'TXN-007',
                                date: '2026-10-07',
                                reference: 'SO-203',
                                in: 0,
                                out: 20,
                                balance: 70,
                                description: 'Bulk order',
                            },
                            {
                                code: 'TXN-008',
                                date: '2026-10-08',
                                reference: 'TRF-001',
                                in: 10,
                                out: 0,
                                balance: 80,
                                description: 'Transfer from warehouse B',
                            },
                            {
                                code: 'TXN-009',
                                date: '2026-10-09',
                                reference: 'SO-204',
                                in: 0,
                                out: 25,
                                balance: 55,
                                description: 'Customer shipment',
                            },
                            {
                                code: 'TXN-010',
                                date: '2026-10-10',
                                reference: 'PO-104',
                                in: 60,
                                out: 0,
                                balance: 115,
                                description: 'Monthly restock',
                            },
                        ]}
                        unit={'PCS'}
                    />

                    <Pangination
                        page={5}
                        row={20}
                        totalPages={100}
                        onPageChange={function (page: number): void {
                            throw new Error('Function not implemented.');
                        }}
                        onRowChange={function (row: number): void {
                            throw new Error('Function not implemented.');
                        }}
                        isLoading={false}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold text-slate-900">
                        Supplier
                    </p>
                    <Button>Add Supplier</Button>
                </div>
                <InventorySupplierTable
                    isLoading={false}
                    data={[
                        {
                            code: 'SUP-001',
                            supplier: 'PT Sumber Makmur',
                            price: 15000,
                            lastPurchase: '2025-12-01',
                            totalPurchase: 7500000,
                            totalQuantity: '500',
                            preferred: true,
                        },
                        {
                            code: 'SUP-002',
                            supplier: 'CV Jaya Abadi',
                            price: 14500,
                            lastPurchase: '2025-11-20',
                            totalPurchase: 5800000,
                            totalQuantity: '400',
                            preferred: false,
                        },
                        {
                            code: 'SUP-003',
                            supplier: 'UD Berkah Sentosa',
                            price: 15200,
                            lastPurchase: '2025-12-10',
                            totalPurchase: 8200000,
                            totalQuantity: '540',
                            preferred: true,
                        },
                        {
                            code: 'SUP-004',
                            supplier: 'PT Nusantara Supply',
                            price: 14800,
                            lastPurchase: '2025-10-15',
                            totalPurchase: 4300000,
                            totalQuantity: '290',
                            preferred: false,
                        },
                        {
                            code: 'SUP-005',
                            supplier: 'CV Mitra Sejahtera',
                            price: 14950,
                            lastPurchase: '2025-12-05',
                            totalPurchase: 6900000,
                            totalQuantity: '460',
                            preferred: true,
                        },
                    ]}
                    unit={'PCS'}
                />
                <Pangination
                    page={10}
                    row={10}
                    totalPages={100}
                    onPageChange={function (page: number): void {
                        throw new Error('Function not implemented.');
                    }}
                    onRowChange={function (row: number): void {
                        throw new Error('Function not implemented.');
                    }}
                    isLoading={false}
                />
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold text-slate-900">
                        Customer Pricing
                    </p>
                    <Button>Add Customer</Button>
                </div>
                <InventoryPricingTable
                    data={[
                        {
                            code: 'PRC-001',
                            customerCode: 'CUST001',
                            customer: 'PT Sinar Abadi',
                            specialPrice: 10000,
                            minQty: 1,
                            startDate: '2026-01-01',
                            endDate: '2026-12-31',
                            status: 'ACTIVE',
                        },
                        {
                            code: 'PRC-002',
                            customerCode: 'CUST002',
                            customer: 'CV Maju Jaya',
                            specialPrice: 8500,
                            minQty: 5,
                            startDate: '2025-01-01',
                            endDate: '2025-12-31',
                            status: 'EXPIRED',
                        },
                        {
                            code: 'PRC-003',
                            customerCode: 'CUST003',
                            customer: 'UD Berkah Sentosa',
                            specialPrice: 12000,
                            minQty: 2,
                            startDate: '2026-03-01',
                            endDate: '2026-09-30',
                            status: 'ACTIVE',
                        },
                        {
                            code: 'PRC-004',
                            customerCode: 'CUST004',
                            customer: 'PT Nusantara Trading',
                            specialPrice: 9500,
                            minQty: 10,
                            startDate: '2024-06-01',
                            endDate: '2025-06-01',
                            status: 'EXPIRED',
                        },
                        {
                            code: 'PRC-005',
                            customerCode: 'CUST005',
                            customer: 'CV Sejahtera Makmur',
                            specialPrice: 11000,
                            minQty: 3,
                            startDate: '2026-02-15',
                            endDate: '2026-11-30',
                            status: 'ACTIVE',
                        },
                    ]}
                    isLoading={false}
                    unit={'PCS'}
                />
                <Pangination
                    page={10}
                    row={10}
                    totalPages={100}
                    onPageChange={function (page: number): void {
                        throw new Error('Function not implemented.');
                    }}
                    onRowChange={function (row: number): void {
                        throw new Error('Function not implemented.');
                    }}
                    isLoading={false}
                />
            </div>
            {/* SEPARATOR */}
            <hr className="my-10 border-slate-300" />

            {/* DANGER ZONE */}
            <div className="border border-red-200 bg-red-50 rounded-md p-6 space-y-4">
                <div>
                    <p className="text-sm font-semibold text-red-700">
                        Danger Zone
                    </p>
                    <p className="text-xs text-red-600">
                        Deleting this inventory will permanently remove all
                        related data including stock, suppliers, and customer
                        pricing.
                    </p>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 /> Delete Inventory
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete Inventory?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this inventory and all
                                associated data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
};

export default InventoryDetailPage;
