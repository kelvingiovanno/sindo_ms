export interface InventorySupplierItem {
    code: string;
    supplier: string;
    price: number;
    lastPurchase: string;
    totalPurchase: number;
    totalQuantity: string;
    preferred: boolean;
}

export interface InventorySupplierList {
    data: InventorySupplierItem[];
    meta: {
        page: number;
        row: number;
        total: number;
        totalPage: number;
    };
}
