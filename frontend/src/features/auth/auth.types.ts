import type { Auth } from './auth.entity';

export interface SignInApiResponse {
    userId: string;
    stores: {
        storeName: string;
        storeId: string;
    }[];
}

export interface SelectStoreApiResponse {
    accessToken: string;
    refreshToken: string;
    auth: Auth;
}

export interface RefreshApiResponse {
    accessToken: string;
    auth: Auth;
}

export type StoreAccessApiResponse = {
    storeId: string;
    storeName: string;
}[];
