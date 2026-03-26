export interface InventoryListItem {
    id: string;
    sku: string;
    brand: string;
    model: string;
    category: string;
    partnumber: string;
    name: string;
    cost: number;
    price: number;
    status: string;
}

export interface InventoryList {
    data: InventoryListItem[];
    meta: {
        pagae: number;
        row: number;
        total: number;
        totalPage: number;
    };
}
