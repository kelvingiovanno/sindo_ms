import type { UserRole } from './User';

export type LoginApiResponse = {
    userId: string;
    stores: {
        storeId: string;
        storeName: string;
    }[];
};

export type RefreshApiResponse = {
    accessToken: string;
};

export type SelecStoreApiResponse = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        username: string;
        role: UserRole;
        storeId: string;
    };
};
