export type PricingStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export interface InventoryPricingItem {
    code: string;
    customer: string;
    customerCode: string;
    specialPrice: number;
    minQty: number;
    startDate: string;
    endDate: string;
    status: PricingStatus;
}

export interface InventoryPricingList {
    data: InventoryPricingItem[];
    meta: {
        page: number;
        row: number;
        total: number;
        totalPage: number;
    };
}
