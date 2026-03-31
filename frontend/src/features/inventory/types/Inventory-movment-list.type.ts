export interface InventoryMovementsItem {
    code: string;
    date: string;
    reference: string;
    in: number;
    out: number;
    balance: number;
    description: string;
}

export interface InventoryMovementsList {
    data: InventoryMovementsItem[];
    meta: {
        page: number;
        row: number;
        total: number;
        totalPage: number;
    };
}
